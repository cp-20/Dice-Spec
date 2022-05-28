import { useTranslation } from 'next-i18next';
import type { FC } from 'react';

export const Footer: FC = () => {
  const [t] = useTranslation('common');

  return (
    <>
      <footer className="bg-gray-500/20 py-2 px-4">
        <div>
          <p>{t('copyright')}</p>
        </div>
      </footer>
    </>
  );
};
