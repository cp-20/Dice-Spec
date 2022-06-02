export const zeroPadding = (input: number, digit: number): string => {
  const zero = '0'.repeat(digit);
  return (zero + input).slice(-digit);
};
