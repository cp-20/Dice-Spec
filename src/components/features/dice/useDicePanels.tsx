import { useDiceResult } from '@/components/features/dice/diceResultAtom';
import { useFavoriteDices } from '@/components/features/dice/FavoriteDices';

const uniqueArray = <T,>(arr: T[]): T[] => Array.from(new Set(arr));

export type dicePanel = {
  input: string;
  favorite: boolean;
};

export const useDicePanels = () => {
  const [favoriteDices] = useFavoriteDices();
  const [diceResult] = useDiceResult();

  const dicePanels: dicePanel[] = uniqueArray(favoriteDices)
    .map((input) => ({ input, favorite: true }))
    .concat(
      uniqueArray(
        [...diceResult]
          .reverse()
          .filter((result) => !favoriteDices.includes(result.input))
          .map((result) => result.input)
      ).map((input) => ({ input, favorite: false }))
    );

  return dicePanels;
};
