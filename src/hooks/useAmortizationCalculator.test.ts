// src/hooks/useAmortizationCalculator.test.ts
import { renderHook } from '@testing-library/react';
import { useAmortizationCalculator } from './useAmortizationCalculator';

describe('useAmortizationCalculator', () => {
  it('calculates correct results for basic inputs', () => {
    const { result } = renderHook(() => useAmortizationCalculator({
      loanAmount: 100000,
      interestRate: 4,
      loanTerm: 5,
      paymentFrequency: 'monthly',
      extraPayment: 100,
      investmentRate: 7,
      investLastPaymentRemainder: true
    }));
    
    // Check monthly payment calculation
    expect(result.current.monthlyPayment).toBeGreaterThan(0);
    
    // Check that prepayment schedule is calculated
    expect(result.current.prepaymentDetailedSchedule.length).toBe(5 * 12); // 5 years * 12 months
    
    // Check investment schedule is calculated
    expect(result.current.investmentDetailedSchedule.length).toBe(5 * 12);
    
    // Check prepayment scenario should have less total interest
    expect(result.current.comparison_prepaymentTotalInterest).toBeLessThan(
      result.current.comparison_investmentTotalInterest
    );
  });

  it('handles edge case of 0 loan term', () => {
    const { result } = renderHook(() => useAmortizationCalculator({
      loanAmount: 100000,
      interestRate: 4,
      loanTerm: 0,
      paymentFrequency: 'monthly',
      extraPayment: 100,
      investmentRate: 7,
      investLastPaymentRemainder: true
    }));
    
    // All calculated values should be 0
    expect(result.current.monthlyPayment).toBe(0);
    expect(result.current.prepaymentDetailedSchedule.length).toBe(0);
    expect(result.current.comparison_prepaymentTotalInterest).toBe(0);
  });

  it('calculates earlier payoff for prepayment scenario', () => {
    const { result } = renderHook(() => useAmortizationCalculator({
      loanAmount: 100000,
      interestRate: 4,
      loanTerm: 10,
      paymentFrequency: 'monthly',
      extraPayment: 200,
      investmentRate: 7,
      investLastPaymentRemainder: true
    }));
    
    // Prepayment should result in earlier payoff
    expect(result.current.comparison_prepaymentPayoffPeriod).toBeLessThan(10 * 12);
    expect(result.current.comparison_prepaymentYearsSaved).toBeGreaterThan(0);
  });
});
