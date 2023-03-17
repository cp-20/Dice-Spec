import { Stat, StatLabel, StatNumber } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import type { FC } from 'react';

import { AnalysisCharts } from '@/components/model/LogAnalysis/AnalysisCharts';
import type { log } from '@/components/model/LogAnalysis/useUploadArea';

export type logAnalysisPreviewProps = {
  logs?: log[];
};

const takeAvg = (numbers: number[]) => numbers.reduce((sum, cur) => sum + cur, 0) / numbers.length;
const takeVariance = (numbers: number[]) => takeAvg(numbers.map((num) => num ** 2)) - takeAvg(numbers) ** 2;

export const LogAnalysisPreview: FC<logAnalysisPreviewProps> = ({ logs }) => {
  const [t] = useTranslation('analyze');

  const diceResultNumbers = logs?.filter((log) => log.diceResultNumber).map((log) => log.diceResultNumber as number);
  const diceResults = logs?.map((log) => log.diceResult);

  const mean = diceResultNumbers ? takeAvg(diceResultNumbers).toFixed(1) : '-';
  const variance = diceResultNumbers ? takeVariance(diceResultNumbers).toFixed(1) : '-';
  const SD = diceResultNumbers ? Math.sqrt(takeVariance(diceResultNumbers)).toFixed(1) : '-';

  const compiledDiceResultNumber: number[] = diceResultNumbers
    ? (() => {
        const results: number[] = new Array(10).fill(0);
        diceResultNumbers.forEach((num) => {
          results[Math.floor((num - 1) / 10)]++;
        });
        return results;
      })()
    : new Array(10).fill(0);

  const compiledDiceResult = diceResults
    ? (() => {
        const results = new Map<string, number>([
          ['ファンブル', 0],
          ['失敗', 0],
          ['成功', 0],
          ['レギュラー成功', 0],
          ['ハード成功', 0],
          ['イクストリーム成功', 0],
          ['クリティカル', 0],
        ]);
        diceResults.forEach((result) => {
          results.set(result, (results.get(result) ?? 0) + 1);
        });
        return results;
      })()
    : new Map<string, number>([
        ['ファンブル', 0],
        ['失敗', 0],
        ['成功', 0],
        ['レギュラー成功', 0],
        ['ハード成功', 0],
        ['イクストリーム成功', 0],
        ['クリティカル', 0],
      ]);

  return (
    <>
      <div className="my-8">
        <div className="my-4 flex flex-col gap-4 sm:flex-row">
          <Stat>
            <StatLabel textAlign="center">{t('result.mean')}</StatLabel>
            <StatNumber textAlign="center">{mean}</StatNumber>
          </Stat>

          <Stat>
            <StatLabel textAlign="center">{t('result.variance')}</StatLabel>
            <StatNumber textAlign="center">{variance}</StatNumber>
          </Stat>

          <Stat>
            <StatLabel textAlign="center">{t('result.SD')}</StatLabel>
            <StatNumber textAlign="center">{SD}</StatNumber>
          </Stat>
        </div>

        <AnalysisCharts compiledDiceResultNumber={compiledDiceResultNumber} compiledDiceResult={compiledDiceResult} />
      </div>
    </>
  );
};
