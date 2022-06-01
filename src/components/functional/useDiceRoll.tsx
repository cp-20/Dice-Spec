import { useToast } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';

import type { parser } from '@/components/functional/useCalculation';
import type { BCDice } from '@/typings/bcdice';
import type { diceConfig } from '@/typings/diceConfig';

export type diceRollResult = { success: true; result: BCDice.DiceRollSuccessResponse };
export type errorResult = { success: false };

export const useDiceRoll = (config: diceConfig) => {
  const [t] = useTranslation('dice');
  const toast = useToast();

  const diceRoll: parser<{ result: Promise<diceRollResult | errorResult> }> = (input: string) => {
    return {
      result: fetch(`${config.apiServer}/v2/game_system/${config.system.id}/roll?command=${encodeURI(input)}`)
        .then((res) => res.json())
        .then((res: BCDice.DiceRollResponse): diceRollResult | errorResult => {
          if (res.ok) {
            return {
              success: true,
              result: res,
            };
          } else {
            return {
              success: false,
            };
          }
        })
        .catch((err) => {
          console.error(err);

          toast({
            title: t('errors.notFound'),
            status: 'error',
            isClosable: true,
          });
          return {
            success: false,
          };
        }),
    };
  };

  const validator = (input: string) => {
    if (input.length === 0) {
      return null;
    } else {
      return config.system.command_pattern.test(input);
    }
  };

  return {
    diceRoll,
    validator,
  };
};
