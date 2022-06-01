import useSound from 'use-sound';

import type { diceConfig } from '@/typings/diceConfig';

export const useDiceSound = (config: diceConfig) => {
  const [play] = useSound('/audio/dice.wav', { volume: config.volume / 100 });

  return {
    play: () => {
      if (config.sound) {
        play();
      }
    },
  };
};
