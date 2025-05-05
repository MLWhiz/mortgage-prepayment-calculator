import React from 'react';
import { formatCurrency, formatYears } from '@/utils/formatters';

interface ResultsComparisonProps {
  loanTerm: number;
  monthlyPayment: number;
  extraPayment: number;
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
  paymentFrequency: string;
  remainderInvested: number;
}

const ResultsComparison: React.FC<ResultsComparisonProps> = ({
  loanTerm,
  monthlyPayment,
  extraPayment,
  comparison_prepaymentTotalInterest,
  comparison_investmentTotalInterest,
  comparison_prepaymentPayoffPeriod,
  comparison_prepaymentYearsSaved,
  comparison_prepaymentEquityAtPayoff,
  comparison_investmentEquityAtPrepaymentPayoff,
  comparison_prepaymentFinalEquity,
  comparison_investmentFinalEquity,
  comparison_prepaymentFinalInvestmentValue,
  comparison_investmentFinalInvestmentValue,
  paymentFrequency,
  remainderInvested
}) => {
  const getPeriodsPerYear = () => {
    return paymentFrequency === 'monthly' ? 12 : 
           paymentFrequency === 'bi-weekly' ? 26 : 52;
  };

  return (
    <div className="bg-gray-50 p-6 rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-4">Comparison Results ({loanTerm} Years)</h3>

      <div className="grid grid-cols-1 gap-4">
        <div className="border-b pb-2">
          <p className="text-sm text-gray-600">Regular Periodic Payment:</p>
          <p className="text-xl font-bold">{formatCurrency(monthlyPayment)}</p>
        </div>

        <div className="border-b pb-2 bg-blue-50 p-2 rounded">
          <p className="text-sm font-medium text-blue-800">SCENARIO 1: LOAN PREPAYMENT</p>
          <p className="text-sm text-gray-600">Periodic Payment + Extra:</p>
          <p className="text-lg font-bold">{formatCurrency(monthlyPayment + extraPayment)}</p>
          <p className="text-sm text-gray-600 mt-2">Total Interest Paid:</p>
          <p className="text-lg font-bold">{formatCurrency(comparison_prepaymentTotalInterest)}</p>
          <p className="text-sm text-gray-600 mt-2">Loan Payoff Period:</p>
          <p className="text-lg font-bold">
            {comparison_prepaymentPayoffPeriod > 0
              ? `Period #${comparison_prepaymentPayoffPeriod} (${formatYears(comparison_prepaymentPayoffPeriod / getPeriodsPerYear())})`
              : `Not paid off within ${loanTerm} years`}
          </p>
          {comparison_prepaymentPayoffPeriod > 0 && (
            <>
              <p className="text-sm text-gray-600 mt-2">Total Equity at Loan Payoff:</p>
              <p className="text-lg font-bold">{formatCurrency(comparison_prepaymentEquityAtPayoff)}</p>
            </>
          )}
          <p className="text-sm text-gray-600 mt-2">{`Total Equity at ${loanTerm} Years:`}</p>
          <p className="text-lg font-bold">{formatCurrency(comparison_prepaymentFinalEquity)}</p>
          <p className="text-sm text-gray-600 mt-2">{`Investment Value at ${loanTerm} Years:`}</p>
          <p className="text-lg font-bold text-blue-600">{formatCurrency(comparison_prepaymentFinalInvestmentValue)}</p>

          {comparison_prepaymentPayoffPeriod > 0 && remainderInvested > 0 && (
            <>
              <p className="text-sm text-gray-600 mt-2">Final Payment Remainder Invested:</p>
              <p className="text-lg font-bold text-blue-600">
                {formatCurrency(remainderInvested)}
              </p>
            </>
          )}
          <p className="text-sm text-gray-600 mt-2">{`Final Total Value (at ${loanTerm} Years):`}</p>
          <p className="text-lg font-bold text-blue-600">
            {formatCurrency(comparison_prepaymentFinalEquity)}
          </p>
        </div>

        <div className="border-b pb-2 bg-green-50 p-2 rounded">
          <p className="text-sm font-medium text-green-800">SCENARIO 2: INVESTING THE EXTRA</p>
          <p className="text-sm text-gray-600">Periodic Payment:</p>
          <p className="text-lg font-bold">{formatCurrency(monthlyPayment)}</p>
          <p className="text-sm text-gray-600 mt-2">Periodic Investment:</p>
          <p className="text-lg font-bold">{formatCurrency(extraPayment)}</p>
          <p className="text-sm text-gray-600 mt-2">Total Interest Paid ({loanTerm} Years):</p>
          <p className="text-lg font-bold">{formatCurrency(comparison_investmentTotalInterest)}</p>
          {comparison_prepaymentPayoffPeriod > 0 && (
            <>
              <p className="text-sm text-gray-600 mt-2">Total Equity at Prepayment Payoff Period ({comparison_prepaymentPayoffPeriod}):</p>
              <p className="text-lg font-bold">{formatCurrency(comparison_investmentEquityAtPrepaymentPayoff)}</p>
            </>
          )}
          <p className="text-sm text-gray-600 mt-2">{`Investment Value at ${loanTerm} Years:`}</p>
          <p className="text-lg font-bold">{formatCurrency(comparison_investmentFinalInvestmentValue)}</p>
          <p className="text-sm text-gray-600 mt-2">{`Final Total Value (at ${loanTerm} Years):`}</p>
          <p className="text-lg font-bold text-green-600">{formatCurrency(comparison_investmentFinalEquity)}</p>
        </div>

        <div className="pt-2 grid grid-cols-1 gap-2">
          <div className="border-b pb-2">
            <p className="text-sm font-medium">{`FINANCIAL COMPARISON AT ${loanTerm} YEARS:`}</p>
            <p className="text-lg font-bold text-purple-600">
              {comparison_investmentFinalEquity > comparison_prepaymentFinalEquity ?
                `Investing is better by ${formatCurrency(comparison_investmentFinalEquity - comparison_prepaymentFinalEquity)}` :
                `Prepayment is better by ${formatCurrency(comparison_prepaymentFinalEquity - comparison_investmentFinalEquity)}`}
            </p>
          </div>

          <div>
            <p className="text-sm font-medium">NON-FINANCIAL BENEFITS:</p>
            <p className="text-sm text-gray-600">
              Prepayment: Debt-free {comparison_prepaymentYearsSaved > 0 
                ? formatYears(comparison_prepaymentYearsSaved) + ' earlier' 
                : `within the ${loanTerm} year term`}
            </p>
            <p className="text-sm text-gray-600">Investment: More flexibility with your assets</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsComparison;
