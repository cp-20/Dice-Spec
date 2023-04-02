import useSound from 'use-sound';

import { useDiceConfig } from '@/components/features/dice/diceConfigAtom';

export const useDiceSound = () => {
  const [config] = useDiceConfig();
  const [play] = useSound('/audio/dice.wav', { volume: config.volume / 100 });

  return {
    play: () => {
      if (config.sound) {
        play();
      }
    },
  };
};
