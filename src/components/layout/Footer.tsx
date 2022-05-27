import { useTranslation } from 'next-i18next';
import type { FC } from 'react';

import { StyledLink } from '@/components/ui/StyledLink';

export const Footer: FC = () => {
  const [t] = useTranslation('common');

  return (
    <>
      <footer className="h-8 bg-gray-400">
        <StyledLink href="https://twitter.com/__cp20__">{t('footer.twitter')}</StyledLink>
      </footer>
    </>
  );
};
