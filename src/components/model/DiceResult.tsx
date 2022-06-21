import { useTranslation } from 'next-i18next';
import type { FC } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';

import { MultiLineBody } from '@/components/functional/MuliLineBody';
import { cx } from '@/features/utils/cx';
import { zeroPadding } from '@/features/utils/zeroPadding';

export type diceResult = {
  system: string;
  date: Date;
  success: boolean;
  failure: boolean;
  text: string;
};

const getTime = (date: Date) => `${zeroPadding(date.getHours(), 2)}:${zeroPadding(date.getMinutes(), 2)}`;

export const DiceResult: FC<{ result: diceResult[] }> = ({ result }) => {
  const [t] = useTranslation('dice');
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  });

  return (
    <>
      <div
        ref={containerRef}
        className="my-4 flex max-h-[10rem] flex-col space-y-1 overflow-y-auto rounded-md border-2 border-gray-500/10 px-4 py-2 text-sm"
      >
        <p className="text-md font-bold text-gray-600 dark:text-gray-300">{t('output')}</p>
        {result.map((item, index) => (
          <div key={index} className="flex space-x-2">
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
            <p className="text-gray-500 dark:text-gray-400">{getTime(item.date)}</p>
          </div>
        ))}
      </div>
    </>
  );
};
