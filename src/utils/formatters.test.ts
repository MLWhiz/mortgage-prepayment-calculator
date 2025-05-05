import { formatCurrency, formatYears } from './formatters';

describe('formatCurrency', () => {
  it('should format numbers as GBP currency', () => {
    expect(formatCurrency(1000)).toBe('£1,000.00');
    expect(formatCurrency(1234.56)).toBe('£1,234.56');
    expect(formatCurrency(0)).toBe('£0.00');
    expect(formatCurrency(-500)).toBe('-£500.00');
  });
});

describe('formatYears', () => {
  it('should format years and months correctly', () => {
    expect(formatYears(1)).toBe('1 year');
    expect(formatYears(2)).toBe('2 years');
    expect(formatYears(0.5)).toBe('6 months');
    expect(formatYears(1.5)).toBe('1 year and 6 months');
    expect(formatYears(2.25)).toBe('2 years and 3 months');
    expect(formatYears(0)).toBe('0 months');
  });
});
