import { IconButton, useColorMode } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import type { FC } from 'react';
import { useEffect } from 'react';
import { FaMoon, FaSun } from 'react-icons/fa';

import { StyledLink } from '@/components/ui/StyledLink';

export const Header: FC = () => {
  const [t] = useTranslation('common');
  const { colorMode, toggleColorMode } = useColorMode();

  useEffect(() => {
    document.documentElement.classList.add(colorMode);
    document.documentElement.classList.remove(colorMode === 'light' ? 'dark' : 'light');
  }, [colorMode]);

  return (
    <>
      <header className="h-8">
        <StyledLink href="/">{t('header.backToTop')}</StyledLink>
        <IconButton
          icon={colorMode === 'light' ? <FaSun /> : <FaMoon />}
          onClick={() => toggleColorMode()}
          aria-label={t('header.toggleColorMode')}
        />
      </header>
    </>
  );
};
