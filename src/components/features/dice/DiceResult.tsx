import { useTranslation } from 'next-i18next';
import type { FC } from 'react';
import { Fragment } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';

import { useDiceResult } from '@/components/features/dice/diceResultAtom';
import { MultiLineBody } from '@/components/functional/MuliLineBody';
import { cx } from '@/features/utils/cx';
import { zeroPadding } from '@/features/utils/zeroPadding';

const formatTime = (date: Date) => `${zeroPadding(date.getHours(), 2)}:${zeroPadding(date.getMinutes(), 2)}`;

export const DiceResult: FC = () => {
  const [t] = useTranslation('dice');
  const [result] = useDiceResult();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [result.length]);

  return (
    <>
      <div
        ref={containerRef}
        className="my-4 flex h-40 flex-col space-y-1 overflow-y-auto rounded-md border-2 border-gray-500/10 px-4 py-2 text-sm"
      >
        <p className="text-md font-bold text-gray-600 dark:text-gray-300">{t('output')}</p>
        {result.map((item, index) => (
          <Fragment key={index}>
            <div className="hidden space-x-2 lg:flex">
              <p className="text-gray-500 dark:text-gray-400">{item.system}</p>
              <p
                className={cx(
                  'flex-1',
                  item.success && 'text-blue-700 dark:text-blue-500',
                  item.failure && 'text-red-700 dark:text-red-500'
                )}
              >
                <MultiLineBody body={item.text} />
              </p>
              <p className="text-gray-500 dark:text-gray-400">{formatTime(item.date)}</p>
            </div>
            <div className="flex flex-col lg:hidden">
              <div className="flex">
                <p className="text-gray-500 dark:text-gray-400">{item.system}</p>
                <p className="ml-auto text-gray-500 dark:text-gray-400">{formatTime(item.date)}</p>
              </div>
              <p
                className={cx(
                  'flex-1',
                  item.success && 'text-blue-700 dark:text-blue-500',
                  item.failure && 'text-red-700 dark:text-red-500'
                )}
              >
                <MultiLineBody body={item.text} />
              </p>
            </div>
          </Fragment>
        ))}
      </div>
    </>
  );
};
