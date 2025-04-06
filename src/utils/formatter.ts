export const formatCurrency = (amount: number): string => {
  // Check if number has decimals
  const hasDecimals = amount % 1 !== 0;
  return new Intl.NumberFormat('en-MY', {
    style: 'currency',
    currency: 'MYR',
    minimumFractionDigits: hasDecimals ? 2 : 0, // Show 2 decimals only if cents exist
    maximumFractionDigits: hasDecimals ? 2 : 0, // Show 2 decimals only if cents exist
  }).format(amount); // Use exact amount, no rounding
};
