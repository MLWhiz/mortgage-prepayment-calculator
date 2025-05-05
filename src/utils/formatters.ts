export const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  };
  
  export const formatYears = (years: number): string => {
    const wholeYears = Math.floor(years);
    const months = Math.round((years - wholeYears) * 12);
  
    if (wholeYears === 0) {
      return `${months} month${months !== 1 ? 's' : ''}`;
    } else if (months === 0) {
      return `${wholeYears} year${wholeYears !== 1 ? 's' : ''}`;
    } else {
      return `${wholeYears} year${wholeYears !== 1 ? 's' : ''} and ${months} month${months !== 1 ? 's' : ''}`;
    }
  };
  