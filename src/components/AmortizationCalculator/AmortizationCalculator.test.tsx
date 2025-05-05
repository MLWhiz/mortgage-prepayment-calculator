// src/components/AmortizationCalculator/AmortizationCalculator.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import AmortizationCalculator from '.';

describe('AmortizationCalculator', () => {
  it('renders the calculator with default values', () => {
    render(<AmortizationCalculator />);
    
    // Check if key elements are rendered
    expect(screen.getByText('Loan Prepayment vs. Investment Comparison')).toBeInTheDocument();
    expect(screen.getByText('Loan Information')).toBeInTheDocument();
    expect(screen.getByText('Comparison Results (30 Years)')).toBeInTheDocument();
    expect(screen.getByText('SCENARIO 1: LOAN PREPAYMENT')).toBeInTheDocument();
    expect(screen.getByText('SCENARIO 2: INVESTING THE EXTRA')).toBeInTheDocument();
  });

  it('allows changing input values', () => {
    render(<AmortizationCalculator />);
    
    // Find inputs by type or by closest label text
    const inputs = screen.getAllByRole('spinbutton');
    const loanAmountInput = inputs[0]; // The first number input is Loan Amount
    const interestRateInput = inputs[1]; // The second number input is Interest Rate
    
    // Change values
    fireEvent.change(loanAmountInput, { target: { value: '300000' } });
    fireEvent.change(interestRateInput, { target: { value: '3.5' } });
    
    // Check if values are updated
    expect(loanAmountInput).toHaveValue(300000);
    expect(interestRateInput).toHaveValue(3.5);
  });

  it('switches between prepayment and investment tabs', () => {
    render(<AmortizationCalculator />);
    
    // Check if the prepayment tab is active by default
    expect(screen.getByText('Prepayment Amortization Schedule')).toBeInTheDocument();
    
    // Click on the investment tab
    const investmentTabButton = screen.getByText('Investment Scenario');
    fireEvent.click(investmentTabButton);
    
    // Check if the investment schedule is now displayed
    expect(screen.getByText('Investment Comparison Schedule')).toBeInTheDocument();
  });
});
