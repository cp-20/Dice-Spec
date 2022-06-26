import { useMediaQuery } from '@chakra-ui/react';
import { Chart, registerables } from 'chart.js';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import type { FC } from 'react';
import { Line } from 'react-chartjs-2';

import type { expectedValue } from '@/typings/ast';

export const DistChart: FC<{ result: expectedValue }> = ({ result }) => {
  const { locale } = useRouter();
  const [t] = useTranslation('exepct');

  const media = useMediaQuery('(min-width: 500px)');

  Chart.register(...registerables);

  return (
    <>
      <div className="!mt-4">
        <Line
          data={{
            labels: Object.keys(result.dist),
            datasets: [
              {
                label: t('result.chance'),
                data: Object.values(result.dist),
                backgroundColor: 'rgba(43, 108, 176, 0.2)',
                fill: true,
              },
            ],
          }}
          width={100}
          height={media[0] ? 30 : 50}
          options={{
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
              yAxes: {
                min: 0,
              },
            },
            locale,
          }}
        />
      </div>
    </>
  );
};
