import { BarController, BarElement, CategoryScale, Chart as ChartJS, LinearScale } from 'chart.js';
import { useRouter } from 'next/router';
import type { ComponentProps, FC } from 'react';
import { Bar, Chart } from 'react-chartjs-2';

ChartJS.register(BarController, CategoryScale, LinearScale, BarElement);

export type analysisChartsProps = {
  compiledDiceResultNumber: number[];
  compiledDiceResult: Map<string, number>;
};

export const AnalysisCharts: FC<analysisChartsProps> = ({ compiledDiceResultNumber, compiledDiceResult }) => {
  const { locale } = useRouter();

  const commonOptions: ComponentProps<typeof Bar>['options'] = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
    },
    locale,
  };

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
          options={{ ...commonOptions, indexAxis: 'y' }}
        />
      </div>
    </div>
  );
};
