import { useTranslation } from 'next-i18next';
import type { FC } from 'react';
import { FaTwitter } from 'react-icons/fa';

import { StyledLink } from '@/components/ui/StyledLink';

export const Footer: FC = () => {
  const [t] = useTranslation('common');

  return (
    <>
      <footer className="bg-gray-500/20 py-2 px-4">
        <div>
          <StyledLink href="https://twitter.com/__cp20__" icon="none">
            <FaTwitter title={t('footer.twitter')} />
          </StyledLink>
          <p>{t('copyright')}</p>
        </div>
      </footer>
    </>
  );
};
