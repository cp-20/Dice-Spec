import type { parser } from '@/components/functional/useCalculation';

export const useDiceRoll = () => {
  const diceRoll: parser<void> = (_: string) => void 0;

  return {
    diceRoll,
  };
};
