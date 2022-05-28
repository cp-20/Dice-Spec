import { useTranslation } from 'next-i18next';
import type { FC } from 'react';

export const Footer: FC = () => {
  const [t] = useTranslation('common');

  return (
    <>
      <footer className="flex justify-center bg-gray-500/20 py-2 px-4">
        <p className="text-gray-700 dark:text-gray-400">{t('copyright')}</p>
      </footer>
    </>
  );
};
