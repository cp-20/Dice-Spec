import { useDiceConfig } from '@/components/features/dice/diceConfigAtom';
import type { diceResult } from '@/components/features/dice/diceResultAtom';
import { useDiceResult } from '@/components/features/dice/diceResultAtom';
import { useDiceRoll } from '@/components/features/dice/useDiceRoll';

export const useDiceRollInputSubmit = () => {
  const { diceRoll } = useDiceRoll();
  const [config] = useDiceConfig();
  const [diceResult, setDiceResult] = useDiceResult();

  const handleSubmit = (inputVal: string) => {
    diceRoll(inputVal).result.then((result) => {
      if (result.success) {
        play();
        const rollResult: diceResult = {
          date: new Date(),
          system: config.system.name,
          success: result.result.success || result.result.critical,
          failure: result.result.failure || result.result.fumble,
          text: result.result.text,
        };
        setDiceResult([...diceResult, rollResult]);
      } else {
        setIsInvalid(true);
      }
    });
  };

  return { handleSubmit };
};
