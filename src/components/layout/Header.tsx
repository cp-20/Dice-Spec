import { Box, IconButton, useColorMode } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import type { FC } from 'react';
import { useEffect } from 'react';
import { FaMoon, FaSun } from 'react-icons/fa';
import { FaTwitter } from 'react-icons/fa';

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
      <Box shadow="sm" _dark={{ shadow: 'dark-lg' }}>
        <header className="flex py-2 px-4">
          <StyledLink href="/">{t('header.backToTop')}</StyledLink>

          <div className="ml-auto flex items-center space-x-4">
            {/* Developer's Twitter */}
            <StyledLink href="https://twitter.com/__cp20__" icon="none">
              <FaTwitter title={t('footer.twitter')} />
            </StyledLink>

            {/* toggleColorMode Button */}
            <IconButton
              size="sm"
              icon={colorMode === 'light' ? <FaSun /> : <FaMoon />}
              onClick={() => toggleColorMode()}
              aria-label={t('header.toggleColorMode')}
            />
          </div>
        </header>
      </Box>
    </>
  );
};
