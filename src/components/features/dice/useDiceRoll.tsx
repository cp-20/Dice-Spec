import { useToast } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';

import { useDiceConfig } from '@/components/features/dice/diceConfigAtom';
import type { diceResult } from '@/components/features/dice/diceResultAtom';
import { useDiceResult } from '@/components/features/dice/diceResultAtom';
import { useDiceSound } from '@/components/features/dice/useDiceSound';
import type { diceRollResult, errorResult } from '@/components/functional/useDiceRoll';
import { formatInput } from '@/features/utils/formatInput';
import type { BCDice } from '@/typings/bcdice';

export const useDiceRoll = () => {
  const [t] = useTranslation('dice');
  const { play } = useDiceSound();
  const [config] = useDiceConfig();
  const toast = useToast();

  const [diceResult, setDiceResult] = useDiceResult();

  const diceRoll = async (input: string): Promise<diceRollResult | errorResult> => {
    const formattedInput = formatInput(input);

    try {
      const res = await fetch(
        `${config.apiServer}/v2/game_system/${config.system.id}/roll?command=${encodeURI(formattedInput)}`
      );
      const jsonRes = (await res.json()) as BCDice.DiceRollResponse;

      if (jsonRes.ok) {
        return {
          success: true,
          result: jsonRes,
        };
      } else {
        return {
          success: false,
        };
      }
    } catch (err) {
      console.error(err);

      toast({
        title: t('errors.notFound'),
        status: 'error',
        isClosable: true,
      });

      return {
        success: false,
      };
    }
  };

  const pushResult = (input: string, result: diceRollResult) => {
    play();
    const rollResult: diceResult = {
      date: new Date(),
      system: config.system.name,
      success: result.result.success || result.result.critical,
      failure: result.result.failure || result.result.fumble,
      text: result.result.text,
      input,
    };
    setDiceResult([...diceResult, rollResult]);
  };

  const validator = (input: string) => {
    const formattedInput = formatInput(input);

    if (formattedInput.length === 0) {
      return null;
    } else {
      return config.system.command_pattern.test(formattedInput);
    }
  };

  return {
    diceRoll,
    pushResult,
    validator,
  };
};
