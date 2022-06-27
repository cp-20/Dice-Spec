import { Chart, registerables } from 'chart.js';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import type { FC } from 'react';
import { Line } from 'react-chartjs-2';

import type { expectedValue } from '@/typings/ast';

export const DistChart: FC<{ result: expectedValue }> = ({ result }) => {
  const { locale } = useRouter();
  const [t] = useTranslation('exepct');

  Chart.register(...registerables);

  const { values, chances, chancesCI, chancesTarget } = (() => {
    const values = Object.keys(result.dist);
    values.sort((a, b) => Number(a) - Number(b));
    const chances: (number | null)[] = [];
    const chancesCI: (number | null)[] = [];
    const chancesTarget: (number | null)[] = [];

    let beforeChance: (number | null)[] = [null, null, null];
    values.forEach((value) => {
      const chance = result.dist[value];
      const isUseCurrentChance = (() => {
        if (
          result.input.target &&
          (result.input.isBigger ? result.input.target <= Number(value) : Number(value) <= result.input.target)
        ) {
          return [false, false, true];
        } else if (result.CI.min <= Number(value) && Number(value) <= result.CI.max) {
          return [false, true, false];
        } else {
          return [true, false, false];
        }
      })();

      const current = isUseCurrentChance.map((isUse, i) => {
        if (isUse || beforeChance[i] !== null) {
          return chance;
        } else {
          return null;
        }
      });
      beforeChance = isUseCurrentChance.map((isUse) => (isUse ? chance : null));

      chances.push(current[0]);
      chancesCI.push(current[1]);
      chancesTarget.push(current[2]);
    });

    return { values, chances, chancesCI, chancesTarget };
  })();

  return (
    <>
      <div className="!mt-4">
        <Line
          data={{
            labels: values,
            datasets: [
              {
                label: t('result.chance'),
                data: chances,
                backgroundColor: 'rgba(43, 108, 176, 0.3)',
                fill: true,
              },
              {
                label: t('result.CI'),
                data: chancesCI,
                backgroundColor: 'rgba(43, 108, 176, 0.5)',
                fill: true,
              },
              {
                label: t('result.chance'),
                data: chancesTarget,
                backgroundColor: 'rgba(255, 0, 0, 0.2)',
                fill: true,
              },
            ],
          }}
          height={300}
          options={{
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
