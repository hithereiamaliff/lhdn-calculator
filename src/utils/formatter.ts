export const formatCurrency = (amount: number): string => {
  const hasDecimals = amount % 1 !== 0;
  return new Intl.NumberFormat('en-MY', {
    style: 'currency',
    currency: 'MYR',
    minimumFractionDigits: hasDecimals ? 2 : 0,
    maximumFractionDigits: 2,
  }).format(amount);
};
