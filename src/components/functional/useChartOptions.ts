import { useColorMode } from '@chakra-ui/react';
import type { ChartOptions } from 'chart.js';
import { useRouter } from 'next/router';

export const useChartOptions = (): ChartOptions => {
  const { locale } = useRouter();
  const { colorMode } = useColorMode();
  const color = <T, K>(valueWithLight: T, valueWithDark: K): T | K =>
    colorMode === 'light' ? valueWithLight : valueWithDark;

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
    scales: {
      x: {
        ticks: {
          color: color('#747474', '#9ca3af'),
        },
        grid: {
          color: color('#e5e5e5', '#262f40'),
        },
      },
      y: {
        ticks: {
          color: color('#747474', '#9ca3af'),
        },
        grid: {
          color: color('#e5e5e5', '#262f40'),
        },
      },
    },
    locale,
  };

  return options;
};
