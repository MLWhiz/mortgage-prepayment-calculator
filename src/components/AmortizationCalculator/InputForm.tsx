import React from 'react';
import FormInput from '@/components/ui/FormInput';
import FormSelect from '@/components/ui/FormSelect';
import { formatCurrency } from '@/utils/formatters';

interface InputFormProps {
  loanAmount: number;
  interestRate: number;
  loanTerm: number;
  extraPayment: number;
  investmentRate: number;
  paymentFrequency: string;
  investLastPaymentRemainder: boolean;
  monthlyPayment: number;
  prepaymentPayoffPeriod: number;
  remainderInvested: number;
  onLoanAmountChange: (value: number) => void;
  onInterestRateChange: (value: number) => void;
  onLoanTermChange: (value: number) => void;
  onExtraPaymentChange: (value: number) => void;
  onInvestmentRateChange: (value: number) => void;
  onPaymentFrequencyChange: (value: string) => void;
  onInvestLastPaymentRemainderChange: (value: boolean) => void;
}

const InputForm: React.FC<InputFormProps> = ({
  loanAmount,
  interestRate,
  loanTerm,
  extraPayment,
  investmentRate,
  paymentFrequency,
  investLastPaymentRemainder,
  monthlyPayment,
  prepaymentPayoffPeriod,
  remainderInvested,
  onLoanAmountChange,
  onInterestRateChange,
  onLoanTermChange,
  onExtraPaymentChange,
  onInvestmentRateChange,
  onPaymentFrequencyChange,
  onInvestLastPaymentRemainderChange
}) => {
  const paymentFrequencyOptions = [
    { value: 'monthly', label: 'Monthly' },
    { value: 'bi-weekly', label: 'Bi-Weekly' },
    { value: 'weekly', label: 'Weekly' }
  ];

  return (
    <div className="bg-gray-50 p-6 rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-4">Loan Information</h3>

      <FormInput
        label="Loan Amount"
        type="number"
        value={loanAmount}
        onChange={onLoanAmountChange}
        prefix="£"
      />

      <FormInput
        label="Loan Interest Rate (%)"
        type="number"
        value={interestRate}
        onChange={onInterestRateChange}
        min={0}
        max={100}
        step="0.01"
      />

      <FormInput
        label="Loan Term (Years)"
        type="number"
        value={loanTerm}
        onChange={onLoanTermChange}
        min={1}
        max={50}
      />

      <FormInput
        label="Extra Amount per Period (£)"
        type="number"
        value={extraPayment}
        onChange={onExtraPaymentChange}
        min={0}
        step={10}
      />

      <FormInput
        label="Investment Return Rate (%)"
        type="number"
        value={investmentRate}
        onChange={onInvestmentRateChange}
        min={0}
        max={100}
        step="0.1"
      />

      <FormSelect
        label="Payment Frequency"
        value={paymentFrequency}
        onChange={onPaymentFrequencyChange}
        options={paymentFrequencyOptions}
      />

      <div className="mt-6 border-t pt-4">
        <div className="flex items-center mb-3">
          <input
            type="checkbox"
            id="investLastPaymentRemainder"
            checked={investLastPaymentRemainder}
            onChange={(e) => onInvestLastPaymentRemainderChange(e.target.checked)}
            className="mr-2"
          />
          <label htmlFor="investLastPaymentRemainder" className="text-sm">
            Invest remaining amount from final loan payment
          </label>
        </div>

        {investLastPaymentRemainder && prepaymentPayoffPeriod > 0 && remainderInvested > 0 && (
          <div className="bg-blue-50 p-3 rounded text-sm">
            <p className="mb-1">In the final loan payment ({prepaymentPayoffPeriod}) of your loan:</p>
            <p>1. You'll make your regular payment of {formatCurrency(monthlyPayment + extraPayment)}</p>
            <p>2. Only part of this will be needed to pay off the remaining loan balance.</p>
            <p>3. The leftover {formatCurrency(remainderInvested)} will be invested.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default InputForm;
