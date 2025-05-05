import { useState, useEffect } from 'react';
import { calculatePeriodsPerYear, PaymentPeriod, CalculationResult } from '@/utils/calculationHelpers';

interface AmortizationInputs {
  loanAmount: number;
  interestRate: number;
  loanTerm: number;
  paymentFrequency: string;
  extraPayment: number;
  investmentRate: number;
  investLastPaymentRemainder: boolean;
}

export function useAmortizationCalculator(inputs: AmortizationInputs): CalculationResult {
  const [result, setResult] = useState<CalculationResult>({
    monthlyPayment: 0,
    prepaymentDetailedSchedule: [],
    investmentDetailedSchedule: [],
    comparison_prepaymentTotalInterest: 0,
    comparison_investmentTotalInterest: 0,
    comparison_prepaymentPayoffPeriod: 0,
    comparison_prepaymentYearsSaved: 0,
    comparison_prepaymentEquityAtPayoff: 0,
    comparison_investmentEquityAtPrepaymentPayoff: 0,
    comparison_prepaymentFinalEquity: 0,
    comparison_investmentFinalEquity: 0,
    comparison_prepaymentFinalInvestmentValue: 0,
    comparison_investmentFinalInvestmentValue: 0,
  });

  useEffect(() => {
    const calculateAmortizationSchedule = () => {
      const { 
        loanAmount, 
        interestRate, 
        loanTerm, 
        paymentFrequency, 
        extraPayment, 
        investmentRate, 
        investLastPaymentRemainder 
      } = inputs;

      // Convert annual rates to period rates
      const periodsPerYear = calculatePeriodsPerYear(paymentFrequency);
      const totalPeriods = loanTerm * periodsPerYear;

      // Handle edge case where loanTerm is 0 or less
      if (loanTerm <= 0) {
        setResult({
          monthlyPayment: 0,
          prepaymentDetailedSchedule: [],
          investmentDetailedSchedule: [],
          comparison_prepaymentTotalInterest: 0,
          comparison_investmentTotalInterest: 0,
          comparison_prepaymentPayoffPeriod: 0,
          comparison_prepaymentYearsSaved: 0,
          comparison_prepaymentEquityAtPayoff: 0,
          comparison_investmentEquityAtPrepaymentPayoff: 0,
          comparison_prepaymentFinalEquity: 0,
          comparison_investmentFinalEquity: 0,
          comparison_prepaymentFinalInvestmentValue: 0,
          comparison_investmentFinalInvestmentValue: 0,
        });
        return;
      }

      const periodInterestRate = (interestRate / 100) / periodsPerYear;
      const periodInvestmentRate = (investmentRate / 100) / periodsPerYear;

      // Calculate regular periodic payment
      const regularPayment = interestRate === 0
        ? loanAmount / totalPeriods
        : loanAmount *
          (periodInterestRate * Math.pow(1 + periodInterestRate, totalPeriods)) /
          (Math.pow(1 + periodInterestRate, totalPeriods) - 1);

      // --- Scenario 1: Regular payments + extra payment to principal ---
      let prepayBalance = loanAmount;
      let prepayTotalInterestPaid = 0;
      const prepayScheduleData: PaymentPeriod[] = [];
      let prepayFullPaymentAmount = regularPayment + extraPayment;
      let prepaymentPayoffPeriodFound = 0;
      let prepayInvestmentBalance = 0;

      for (let period = 1; period <= totalPeriods; period++) {
        let interestPayment = 0;
        let principalPayment = 0;
        let actualPrincipalPayment = 0;
        let remainderForInvestment = 0;
        let isFinalLoanPayment = false;
        let paymentThisPeriod = regularPayment + extraPayment;

        if (prepayBalance > 0) {
          interestPayment = prepayBalance * periodInterestRate;
          principalPayment = regularPayment - interestPayment;
          const totalPrincipalAttempt = principalPayment + extraPayment;
          actualPrincipalPayment = Math.min(prepayBalance, totalPrincipalAttempt);

          if (prepayBalance <= actualPrincipalPayment && prepaymentPayoffPeriodFound === 0) {
            isFinalLoanPayment = true;
            prepaymentPayoffPeriodFound = period;
            paymentThisPeriod = prepayBalance + interestPayment;
            
            if (investLastPaymentRemainder) {
              remainderForInvestment = (regularPayment + extraPayment) - paymentThisPeriod;
              if (remainderForInvestment < 0) remainderForInvestment = 0;
            }
          } else if (prepayBalance <= actualPrincipalPayment && prepaymentPayoffPeriodFound > 0) {
            actualPrincipalPayment = prepayBalance;
            paymentThisPeriod = prepayBalance + interestPayment;
            
            if (investLastPaymentRemainder) {
              remainderForInvestment = (regularPayment + extraPayment) - paymentThisPeriod;
              if (remainderForInvestment < 0) remainderForInvestment = 0;
            }
          }

          prepayBalance -= actualPrincipalPayment;
          prepayTotalInterestPaid += interestPayment;

          if (isFinalLoanPayment && remainderForInvestment > 0) {
            prepayInvestmentBalance += remainderForInvestment;
          }
        } else {
          prepayInvestmentBalance = prepayInvestmentBalance * (1 + periodInvestmentRate) + prepayFullPaymentAmount;
          paymentThisPeriod = prepayFullPaymentAmount;
        }

        prepayScheduleData.push({
          period,
          payment: paymentThisPeriod,
          principalPayment: actualPrincipalPayment,
          interestPayment,
          totalInterest: prepayTotalInterestPaid,
          remainingBalance: prepayBalance > 0 ? prepayBalance : 0,
          investmentBalance: prepayInvestmentBalance,
          equity: loanAmount - (prepayBalance > 0 ? prepayBalance : 0) + prepayInvestmentBalance,
          isFinalPayment: isFinalLoanPayment,
          remainderInvested: remainderForInvestment
        });
      }

      // --- Scenario 2: Regular payments + investing the extra payment ---
      let regBalance = loanAmount;
      let regTotalInterestPaid = 0;
      let investmentBalance = 0;
      const investScheduleData: PaymentPeriod[] = [];
      let investmentEquityAtPrepaymentPayoffFound = 0;

      for (let period = 1; period <= totalPeriods; period++) {
        let interestPayment = 0;
        let principalPayment = 0;
        let remainingBalance = 0;

        if (regBalance > 0) {
          interestPayment = regBalance * periodInterestRate;
          principalPayment = regularPayment - interestPayment;
          regBalance -= principalPayment;
          regTotalInterestPaid += interestPayment;
          remainingBalance = regBalance > 0 ? regBalance : 0;
        } else {
          interestPayment = 0;
          principalPayment = 0;
          remainingBalance = 0;
        }

        investmentBalance = investmentBalance * (1 + periodInvestmentRate) + extraPayment;
        const currentEquityInScenario2 = loanAmount - remainingBalance + investmentBalance;

        if (period === prepaymentPayoffPeriodFound) {
          investmentEquityAtPrepaymentPayoffFound = currentEquityInScenario2;
        }

        investScheduleData.push({
          period,
          payment: regularPayment,
          principalPayment,
          interestPayment,
          totalInterest: regTotalInterestPaid,
          remainingBalance,
          investmentBalance,
          equity: currentEquityInScenario2
        });
      }

      // Calculate Comparison Metrics
      const yearsSaved = prepaymentPayoffPeriodFound > 0 ? (totalPeriods - prepaymentPayoffPeriodFound) / periodsPerYear : 0;

      setResult({
        monthlyPayment: regularPayment,
        prepaymentDetailedSchedule: prepayScheduleData,
        investmentDetailedSchedule: investScheduleData,
        comparison_prepaymentTotalInterest: prepayTotalInterestPaid,
        comparison_investmentTotalInterest: regTotalInterestPaid,
        comparison_prepaymentPayoffPeriod: prepaymentPayoffPeriodFound,
        comparison_prepaymentYearsSaved: yearsSaved,
        comparison_prepaymentEquityAtPayoff: loanAmount,
        comparison_investmentEquityAtPrepaymentPayoff: investmentEquityAtPrepaymentPayoffFound,
        comparison_prepaymentFinalEquity: prepayScheduleData.length > 0 ? prepayScheduleData[totalPeriods - 1]?.equity || 0 : 0,
        comparison_investmentFinalEquity: investScheduleData.length > 0 ? investScheduleData[totalPeriods - 1]?.equity || 0 : 0,
        comparison_prepaymentFinalInvestmentValue: prepayScheduleData.length > 0 ? prepayScheduleData[totalPeriods - 1]?.investmentBalance || 0 : 0,
        comparison_investmentFinalInvestmentValue: investScheduleData.length > 0 ? investScheduleData[totalPeriods - 1]?.investmentBalance || 0 : 0,
      });
    };

    calculateAmortizationSchedule();
    
    // Fixed dependency array to avoid infinite re-renders
  }, [
    inputs.loanAmount, 
    inputs.interestRate, 
    inputs.loanTerm, 
    inputs.paymentFrequency, 
    inputs.extraPayment, 
    inputs.investmentRate, 
    inputs.investLastPaymentRemainder
  ]);

  return result;
}