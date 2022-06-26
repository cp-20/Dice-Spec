import { useToast } from '@chakra-ui/react';
import type { DynamicLoader } from 'bcdice';
import type Result from 'bcdice/lib/result';
import { useTranslation } from 'next-i18next';
import { useEffect, useState } from 'react';

import type { parser } from '@/components/functional/useCalculation';
import { formatInput } from '@/features/utils/formatInput';
import type { diceConfig } from '@/typings/diceConfig';

export type diceRollResult = { success: true; result: Result };
export type errorResult = { success: false };

export type parserResult = { result: Promise<diceRollResult | errorResult> };

export type diceAPI =
  | {
      loaded: false;
    }
  | {
      loaded: true;
      loader: DynamicLoader;
      version: string;
    };

export const useDiceRoll = (config: diceConfig) => {
  const [t] = useTranslation('dice');
  const toast = useToast();
  const [diceAPI, setDiceAPI] = useState<diceAPI>({ loaded: false });

  useEffect(() => {
    import('bcdice').then((dice) => {
      console.log('bcdice loaded');
      setDiceAPI({
        loaded: true,
        loader: new dice.DynamicLoader(),
        version: dice.Version,
      });
    });
  }, []);

  const diceRoll: parser<parserResult> = (input) => {
    const formattedInput = formatInput(input);

    if (diceAPI.loaded) {
      console.time('diceRoll');
      return {
        result: diceAPI.loader
          .dynamicLoad(config.system.id)
          .then((system) => {
            const result = system.eval(formattedInput);

            console.timeEnd('diceRoll');
            if (result === null) {
              toast({
                title: t('errors.other'),
                status: 'error',
                isClosable: true,
              });
              return { success: false } as errorResult;
            } else {
              return { success: true, result };
            }
          })
          .catch((err) => {
            console.error(err);
            toast({
              title: t('errors.other'),
              status: 'error',
              isClosable: true,
            });
            return { success: false };
          }),
      };
    } else {
      toast({
        title: t('errors.notLoaded'),
        status: 'error',
        isClosable: true,
      });
      return { result: Promise.resolve({ success: false }) };
    }
  };

  const validator = (input: string) => {
    const formatedInput = formatInput(input);

    if (formatedInput.length === 0) {
      return null;
    } else {
      return config.system.command_pattern.test(formatedInput);
    }
  };

  return {
    diceRoll,
    validator,
    diceAPI,
  };
};
