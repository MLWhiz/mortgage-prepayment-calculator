export interface PaymentPeriod {
    period: number;
    payment: number;
    principalPayment: number;
    interestPayment: number;
    totalInterest: number;
    remainingBalance: number;
    investmentBalance: number;
    equity: number;
    isFinalPayment?: boolean;
    remainderInvested?: number;
  }
  
  export interface CalculationResult {
    monthlyPayment: number;
    prepaymentDetailedSchedule: PaymentPeriod[];
    investmentDetailedSchedule: PaymentPeriod[];
    comparison_prepaymentTotalInterest: number;
    comparison_investmentTotalInterest: number;
    comparison_prepaymentPayoffPeriod: number;
    comparison_prepaymentYearsSaved: number;
    comparison_prepaymentEquityAtPayoff: number;
    comparison_investmentEquityAtPrepaymentPayoff: number;
    comparison_prepaymentFinalEquity: number;
    comparison_investmentFinalEquity: number;
    comparison_prepaymentFinalInvestmentValue: number;
    comparison_investmentFinalInvestmentValue: number;
  }
  
  export const calculatePeriodsPerYear = (paymentFrequency: string): number => {
    return paymentFrequency === 'monthly' ? 12 :
           paymentFrequency === 'bi-weekly' ? 26 :
           paymentFrequency === 'weekly' ? 52 : 12;
  };
  