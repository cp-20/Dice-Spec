import { Text } from '@chakra-ui/react';
import type { FC } from 'react';

import { useDiceConfig } from '@/components/features/dice/diceConfigAtom';
import { MultiLineBody } from '@/components/functional/MuliLineBody';

export const DiceRollHelp: FC = () => {
  const [config] = useDiceConfig();

  if (!config.help) return <></>;

  return (
    <div className="my-4 rounded-md border-2 border-gray-500/10 py-2 px-4">
      <p className="mb-2 font-bold text-gray-600 dark:text-gray-300">{config.system.name}</p>
      <Text fontSize="sm">
        <MultiLineBody body={config.system.help_message} />
      </Text>
    </div>
  );
};
