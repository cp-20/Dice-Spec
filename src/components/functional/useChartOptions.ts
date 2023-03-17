import type { ChartOptions } from 'chart.js';
import { useRouter } from 'next/router';

export const useChartOptions = (): ChartOptions => {
  const { locale } = useRouter();

  const options: ChartOptions = {
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

  return options;
};
