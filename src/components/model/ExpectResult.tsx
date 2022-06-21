import { Stat, StatHelpText, StatLabel, StatNumber, Tooltip } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import type { FC } from 'react';
import { FaInfoCircle } from 'react-icons/fa';

import type { calcResult, successResult } from '@/components/functional/useCalculation';
import type { expectedValue } from '@/typings/ast';

const round = (value: number, digit = 1) => Math.round(value * 10 ** digit) / 10 ** digit;

export const ExpectResult: FC<{ result: calcResult<expectedValue> }> = ({ result }) => {
  const [t] = useTranslation('expect');

  const isSuccess = (result: calcResult<expectedValue>): result is successResult<expectedValue> =>
    result ? !result.error : false;
  const fallback = result ? result.error ? '-' : <></> : '-';

  const chance = isSuccess(result)
    ? result.chance !== undefined
      ? `${round(result.chance * 100, 2)}%`
      : '-'
    : fallback;
  const mean = isSuccess(result) ? round(result.mean) : fallback;
  const CI = isSuccess(result) ? `${round(result.CI.min)} - ${round(result.CI.max)}` : fallback;
  const range = isSuccess(result)
    ? `(${t('result.range')} :  ${round(result.range.min)} - ${round(result.range.max)})`
    : '';
  const SD = isSuccess(result) ? round(result.SD) : fallback;
  const variance = isSuccess(result) ? round(result.variance) : fallback;

  return (
    <>
      <div className="space-y-2">
        <div className="flex min-h-[4rem]">
          <Stat>
            <StatLabel>{t('result.chance')}</StatLabel>
            <StatNumber>{chance}</StatNumber>
          </Stat>
        </div>

        <div className="flex min-h-[6rem]">
          <Stat>
            <StatLabel>{t('result.mean')}</StatLabel>
            <StatNumber>{mean}</StatNumber>
          </Stat>
          <Stat>
            <StatLabel>
              <Tooltip label={t('result.CI_tips')}>
                <span className="space-x-1">
                  <span>{t('result.CI')}</span>
                  <FaInfoCircle className="inline" />
                </span>
              </Tooltip>
            </StatLabel>
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
      </div>
    </>
  );
};
