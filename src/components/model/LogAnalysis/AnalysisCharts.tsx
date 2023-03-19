import { Button } from '@chakra-ui/react';
import type { ChartOptions } from 'chart.js';
import { BarController, BarElement, CategoryScale, Chart as ChartJS, LinearScale } from 'chart.js';
import merge from 'deepmerge';
import { useTranslation } from 'next-i18next';
import type { FC } from 'react';
import { useRef } from 'react';
import { Bar } from 'react-chartjs-2';
import type { ChartJSOrUndefined } from 'react-chartjs-2/dist/types';
import { FaTwitter } from 'react-icons/fa';

import { useChartOptions } from '@/components/functional/useChartOptions';
import { useFirebase } from '@/features/firebase';

ChartJS.register(BarController, CategoryScale, LinearScale, BarElement);

export type analysisChartsProps = {
  mean: string;
  compiledDiceResultNumber: number[];
  compiledDiceResult: Map<string, number>;
};

export const AnalysisCharts: FC<analysisChartsProps> = ({ mean, compiledDiceResultNumber, compiledDiceResult }) => {
  const [t] = useTranslation('analyze');
  const resultNumberChartRef = useRef<ChartJSOrUndefined<'bar', number[], string>>(null);
  const commonOptions = useChartOptions();

  const { uploadImage } = useFirebase();

  const handleClickShareButton = () => {
    const base64ImageUrl = resultNumberChartRef.current?.toBase64Image('image/png');
    if (base64ImageUrl === undefined) {
      const url = encodeURIComponent(`https://dicespec.vercel.app/analyze-logs`);
      const href = `https://twitter.com/intent/tweet?url=${url}&text=▼あなたのダイス結果を分析した結果▼\n平均: ${mean}&hashtags=ダイススペック`;
      window.open(href, '_blank');
      return;
    }

    uploadImage(base64ImageUrl).then((imageUrl) => {
      const url = encodeURIComponent(`https://dicespec.vercel.app/analyze-logs/og?ogp=${encodeURIComponent(imageUrl)}`);
      const href = `https://twitter.com/intent/tweet?url=${url}&text=▼あなたのダイス結果を分析した結果▼\n平均: ${mean}&hashtags=ダイススペック`;
      window.open(href, '_blank');
    });
  };

  return (
    <>
      <div className="my-8 flex justify-center">
        <Button size="sm" leftIcon={<FaTwitter />} onClick={handleClickShareButton}>
          {t('share_on_twitter')}
        </Button>
      </div>
      <div className="flex max-w-full flex-col gap-4 lg:flex-row">
        <div className="fixed -top-full -left-full">
          <Bar
            data={{
              labels: new Array(10).fill(null).map((_, i) => `${i * 10 + 1}-${i * 10 + 10}`),
              datasets: [
                {
                  type: 'bar',
                  label: 'dice counting',
                  data: compiledDiceResultNumber,
                  backgroundColor: 'rgba(43, 108, 176, 0.3)',
                  yAxisID: 'y',
                },
              ],
            }}
            height={630}
            width={1200}
            options={
              merge(commonOptions, {
                scales: { x: { ticks: { font: { size: 30 } } }, y: { ticks: { font: { size: 30 } } } },
                layout: {
                  padding: 32,
                },
              }) as ChartOptions<'bar'>
            }
            ref={resultNumberChartRef}
          />
        </div>
        <div className="min-w-0 flex-1">
          <Bar
            data={{
              labels: new Array(10).fill(null).map((_, i) => `${i * 10 + 1}-${i * 10 + 10}`),
              datasets: [
                {
                  type: 'bar',
                  label: 'dice counting',
                  data: compiledDiceResultNumber,
                  backgroundColor: 'rgba(43, 108, 176, 0.3)',
                  yAxisID: 'y',
                },
              ],
            }}
            height={300}
            options={commonOptions as ChartOptions<'bar'>}
          />
        </div>
        <div className="min-w-0 flex-1">
          <Bar
            data={{
              labels: Array.from(compiledDiceResult.keys()),
              datasets: [
                {
                  label: 'data1',
                  data: Array.from(compiledDiceResult.values()),
                  backgroundColor: 'rgba(43, 108, 176, 0.3)',
                },
              ],
            }}
            height={300}
            options={merge(commonOptions, { indexAxis: 'y' }) as ChartOptions<'bar'>}
          />
        </div>
      </div>
    </>
  );
};
