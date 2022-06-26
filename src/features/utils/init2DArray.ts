export const generate2DArray = (m: number, n: number, val = 0): number[][] => {
  return [...Array(m)].map((_) => Array(n).fill(val));
};
