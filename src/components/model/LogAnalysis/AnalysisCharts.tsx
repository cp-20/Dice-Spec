import type { ChartOptions } from 'chart.js';
import { BarController, BarElement, CategoryScale, Chart as ChartJS, LinearScale } from 'chart.js';
import type { FC } from 'react';
import { Bar, Chart } from 'react-chartjs-2';

import { useChartOptions } from '@/components/functional/useChartOptions';

ChartJS.register(BarController, CategoryScale, LinearScale, BarElement);

export type analysisChartsProps = {
  compiledDiceResultNumber: number[];
  compiledDiceResult: Map<string, number>;
};

export const AnalysisCharts: FC<analysisChartsProps> = ({ compiledDiceResultNumber, compiledDiceResult }) => {
  const commonOptions = useChartOptions();

  return (
    <div className="flex flex-col gap-4">
      <div>
        <Chart
          type="bar"
          data={{
            labels: new Array(10).fill(null).map((_, i) => `${i * 10 + 1}-${i * 10 + 10}`),
            datasets: [
              {
                type: 'bar',
                label: 'dice counting',
                data: compiledDiceResultNumber,
                backgroundColor: 'rgba(43, 108, 176, 0.3)',
                yAxisID: 'y1',
              },
            ],
          }}
          height={300}
          options={{ ...commonOptions }}
        />
      </div>
      <div>
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
          options={{ ...commonOptions, indexAxis: 'y' } as ChartOptions<'bar'>}
        />
      </div>
    </div>
  );
};
