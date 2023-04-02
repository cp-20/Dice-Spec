import { atom, useAtom } from 'jotai';

export type diceResult = {
  system: string;
  date: Date;
  success: boolean;
  failure: boolean;
  text: string;
  input: string;
};

const diceResultAtom = atom<diceResult[]>([]);

export const useDiceResult = () => {
  return useAtom(diceResultAtom);
};
