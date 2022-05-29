import { Stat, StatHelpText, StatLabel, StatNumber } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import type { FC } from 'react';

import type { expectResult, successResult } from '../functional/useExpectedValue';

const round = (value: number) => Math.round(value * 10) / 10;

export const ExpectResult: FC<{ result: expectResult }> = ({ result }) => {
  const [t] = useTranslation('expect');

  const isSuccess = (result: expectResult): result is successResult => (result ? !result.error : false);
  const fallback = result ? result.error ? '-' : <></> : '-';

  const mean = isSuccess(result) ? round(result.mean) : fallback;
  const CI = isSuccess(result) ? `${round(result.CI.min)} - ${round(result.CI.max)}` : fallback;
  const range = isSuccess(result)
    ? `(${t('result.range')} :  ${round(result.range.min)} - ${round(result.range.max)})`
    : '';
  const SD = isSuccess(result) ? round(result.SD) : fallback;
  const variance = isSuccess(result) ? round(result.variance) : fallback;

  return (
    <>
      <div className="flex min-h-[6rem]">
        <Stat>
          <StatLabel>{t('result.mean')}</StatLabel>
          <StatNumber>{mean}</StatNumber>
        </Stat>
        <Stat>
          <StatLabel>{t('result.CI')}</StatLabel>
          <StatNumber>{CI}</StatNumber>
          <StatHelpText>{range}</StatHelpText>
        </Stat>
      </div>
      <div className="flex">
        <Stat>
          <StatLabel>{t('result.SD')}</StatLabel>
          <StatNumber>{SD}</StatNumber>
        </Stat>
        <Stat>
          <StatLabel>{t('result.variance')}</StatLabel>
          <StatNumber>{variance}</StatNumber>
        </Stat>
      </div>
    </>
  );
};
