// src/components/AmortizationCalculator/AmortizationTable.tsx
import React, { useState } from 'react';
import { formatCurrency } from '@/utils/formatters';
import { PaymentPeriod } from '@/utils/calculationHelpers';

interface AmortizationTableProps {
  prepaymentDetailedSchedule: PaymentPeriod[];
  investmentDetailedSchedule: PaymentPeriod[];
}

const AmortizationTable: React.FC<AmortizationTableProps> = ({
  prepaymentDetailedSchedule,
  investmentDetailedSchedule
}) => {
  const [showFullTable, setShowFullTable] = useState(false);
  const [activeTab, setActiveTab] = useState('prepayment');

  const displayedAmortizationTable = activeTab === 'prepayment' 
    ? prepaymentDetailedSchedule 
    : investmentDetailedSchedule;

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden mb-6">
      <div className="border-b border-gray-200">
        <nav className="flex">
          <button
            className={`px-6 py-4 text-sm font-medium ${activeTab === 'prepayment' ? 'bg-blue-50 text-blue-700 border-b-2 border-blue-500' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('prepayment')}
          >
            Prepayment Scenario
          </button>
          <button
            className={`px-6 py-4 text-sm font-medium ${activeTab === 'investment' ? 'bg-green-50 text-green-700 border-b-2 border-green-500' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('investment')}
          >
            Investment Scenario
          </button>
        </nav>
      </div>

      <div className="flex justify-between items-center p-4 bg-gray-100">
        <h3 className="text-lg font-semibold">
          {activeTab === 'prepayment' ? 'Prepayment Amortization Schedule' : 'Investment Comparison Schedule'}
        </h3>
        <button
          onClick={() => setShowFullTable(!showFullTable)}
          className="text-blue-600 hover:text-blue-800"
        >
          {showFullTable ? 'Show Less' : 'Show Full Table'}
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Period
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Payment
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Principal
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Interest
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total Interest
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Remaining Balance
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Investment Value
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total Equity
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {displayedAmortizationTable
              .slice(0, showFullTable ? displayedAmortizationTable.length : 12)
              .map((row) => (
              <tr key={row.period} className={`hover:bg-gray-50 ${row.isFinalPayment ? 'bg-blue-50' : ''}`}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {row.period} {row.isFinalPayment && <span className="text-xs bg-blue-200 px-1 rounded">Final Loan Payment</span>}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {formatCurrency(row.payment)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {formatCurrency(row.principalPayment)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {formatCurrency(row.interestPayment)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {formatCurrency(row.totalInterest)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {formatCurrency(row.remainingBalance)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 font-medium">
                  {formatCurrency(row.investmentBalance || 0)}
                  {activeTab === 'prepayment' && row.isFinalPayment && row.remainderInvested && row.remainderInvested > 0 && (
                    <span className="block text-xs text-green-800">
                      (includes +{formatCurrency(row.remainderInvested)} remaining from payment)
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 font-medium">
                  {formatCurrency(row.equity || 0)}
                </td>
              </tr>
            ))}

            {!showFullTable && displayedAmortizationTable.length > 12 && (
              <tr>
                <td colSpan={8} className="px-6 py-4 text-center text-sm text-gray-500">
                  ... {displayedAmortizationTable.length - 12} more payment periods ...
                </td>
              </tr>
            )}

            {showFullTable && displayedAmortizationTable.length > 0 && (
              <tr className="bg-gray-50 font-medium">
                <td className="px-6 py-4 whitespace-nowrap text-sm">Summary</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  {formatCurrency(displayedAmortizationTable.reduce((sum, row) => sum + row.payment, 0))}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  {formatCurrency(displayedAmortizationTable.reduce((sum, row) => sum + row.principalPayment, 0))}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  {formatCurrency(displayedAmortizationTable[displayedAmortizationTable.length - 1]?.totalInterest || 0)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  {formatCurrency(displayedAmortizationTable[displayedAmortizationTable.length - 1]?.totalInterest || 0)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  {formatCurrency(displayedAmortizationTable[displayedAmortizationTable.length - 1]?.remainingBalance || 0)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 font-medium">
                  {formatCurrency(displayedAmortizationTable[displayedAmortizationTable.length - 1]?.investmentBalance || 0)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 font-medium">
                  {formatCurrency(displayedAmortizationTable[displayedAmortizationTable.length - 1]?.equity || 0)}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AmortizationTable;
