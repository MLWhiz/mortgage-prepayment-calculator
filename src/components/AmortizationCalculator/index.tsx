// src/components/AmortizationCalculator/index.tsx
import React, { useState } from 'react';
import InputForm from './InputForm';
import ResultsComparison from './ResultsComparison';
import AmortizationTable from './AmortizationTable'; // Ensure this import is correct
import { useAmortizationCalculator } from '@/hooks/useAmortizationCalculator';

const AmortizationCalculator: React.FC = () => {
  // Input State Variables
  const [loanAmount, setLoanAmount] = useState(450000);
  const [interestRate, setInterestRate] = useState(4.18);
  const [loanTerm, setLoanTerm] = useState(30);
  const [paymentFrequency, setPaymentFrequency] = useState('monthly');
  const [extraPayment, setExtraPayment] = useState(200);
  const [investmentRate, setInvestmentRate] = useState(7);
  const [investLastPaymentRemainder, setInvestLastPaymentRemainder] = useState(true);

  // Use the custom hook to calculate all values
  const calculationResults = useAmortizationCalculator({
    loanAmount,
    interestRate,
    loanTerm,
    paymentFrequency,
    extraPayment,
    investmentRate,
    investLastPaymentRemainder
  });

  // Find the final payment remainder for display
  const remainderInvested = calculationResults.prepaymentDetailedSchedule.find(
    row => row.isFinalPayment
  )?.remainderInvested || 0;

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">Loan Prepayment vs. Investment Comparison</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <InputForm
          loanAmount={loanAmount}
          interestRate={interestRate}
          loanTerm={loanTerm}
          extraPayment={extraPayment}
          investmentRate={investmentRate}
          paymentFrequency={paymentFrequency}
          investLastPaymentRemainder={investLastPaymentRemainder}
          monthlyPayment={calculationResults.monthlyPayment}
          prepaymentPayoffPeriod={calculationResults.comparison_prepaymentPayoffPeriod}
          remainderInvested={remainderInvested}
          onLoanAmountChange={setLoanAmount}
          onInterestRateChange={setInterestRate}
          onLoanTermChange={setLoanTerm}
          onExtraPaymentChange={setExtraPayment}
          onInvestmentRateChange={setInvestmentRate}
          onPaymentFrequencyChange={setPaymentFrequency}
          onInvestLastPaymentRemainderChange={setInvestLastPaymentRemainder}
        />

        <ResultsComparison
          loanTerm={loanTerm}
          monthlyPayment={calculationResults.monthlyPayment}
          extraPayment={extraPayment}
          comparison_prepaymentTotalInterest={calculationResults.comparison_prepaymentTotalInterest}
          comparison_investmentTotalInterest={calculationResults.comparison_investmentTotalInterest}
          comparison_prepaymentPayoffPeriod={calculationResults.comparison_prepaymentPayoffPeriod}
          comparison_prepaymentYearsSaved={calculationResults.comparison_prepaymentYearsSaved}
          comparison_prepaymentEquityAtPayoff={calculationResults.comparison_prepaymentEquityAtPayoff}
          comparison_investmentEquityAtPrepaymentPayoff={calculationResults.comparison_investmentEquityAtPrepaymentPayoff}
          comparison_prepaymentFinalEquity={calculationResults.comparison_prepaymentFinalEquity}
          comparison_investmentFinalEquity={calculationResults.comparison_investmentFinalEquity}
          comparison_prepaymentFinalInvestmentValue={calculationResults.comparison_prepaymentFinalInvestmentValue}
          comparison_investmentFinalInvestmentValue={calculationResults.comparison_investmentFinalInvestmentValue}
          paymentFrequency={paymentFrequency}
          remainderInvested={remainderInvested}
        />
      </div>

      <AmortizationTable
        prepaymentDetailedSchedule={calculationResults.prepaymentDetailedSchedule}
        investmentDetailedSchedule={calculationResults.investmentDetailedSchedule}
      />

      <div className="mt-6 text-sm text-gray-600">
        <p><strong>Note:</strong> This calculator is for illustrative purposes only and may not reflect the exact terms of your loan. Please consult with a financial professional for personalized advice.</p>
      </div>
    </div>
  );
};

export default AmortizationCalculator;
