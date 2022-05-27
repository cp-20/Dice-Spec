import { useTranslation } from 'next-i18next';
import type { FC } from 'react';

import { StyledLink } from '@/components/ui/StyledLink';

export const Header: FC = () => {
  const [t] = useTranslation('common');

  return (
    <>
      <header className="h-8">
        <StyledLink href="/">{t('header.backToTop')}</StyledLink>
      </header>
    </>
  );
};
