import { useColorMode } from '@chakra-ui/react';
import type { ChartOptions } from 'chart.js';
import { Chart as ChartJS } from 'chart.js';
import { useRouter } from 'next/router';

ChartJS.register({
  id: 'customCanvasBackgroundColor',
  beforeDraw: (chart, args, options) => {
    const { ctx } = chart;
    ctx.save();
    ctx.globalCompositeOperation = 'destination-over';
    ctx.fillStyle = (options.color as string) || '#99ffff';
    ctx.fillRect(0, 0, chart.width, chart.height);
    ctx.restore();
  },
});

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
      // for custom plugin
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      customCanvasBackgroundColor: {
        color: color('white', '#1a202c'),
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
