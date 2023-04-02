import { FormControl, FormLabel } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import type { FC } from 'react';
import { BsDice5 } from 'react-icons/bs';

import { AdvancedSettings } from '@/components/features/dice/AdvancedSettings';
import { DiceResult } from '@/components/features/dice/DiceResult';
import { DiceRollHelp } from '@/components/features/dice/DiceRollHelp';
import { DiceRollInput } from '@/components/features/dice/DiceRollInput';
import { SystemSelect } from '@/components/features/dice/SystemSelect';
import { Descriptions } from '@/components/functional/Descriptions';
import { IndexLayout } from '@/components/layout/IndexLayout';
import { H1 } from '@/components/ui/Heading';

export const DiceRoll: FC = () => {
  const [t] = useTranslation(['dice', 'common']);

  return (
    <>
      <Descriptions title={`${t('title')} - ${t('common:title')}`} description={t('description')} />

      <IndexLayout>
        <div className="px-4">
          <H1>
            <BsDice5 className="inline" />
            <span>{t('title')}</span>
          </H1>

          <p className="mb-8">{t('description')}</p>

          <FormControl className="mt-4 mb-8">
            <FormLabel>{t('form.system')}</FormLabel>
            <SystemSelect />
          </FormControl>

          <DiceResult />
          <DiceRollInput />

          <DiceRollHelp />

          <AdvancedSettings />
        </div>
      </IndexLayout>
    </>
  );
};
