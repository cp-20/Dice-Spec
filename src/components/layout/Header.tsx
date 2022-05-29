import { Box, IconButton, useColorMode, useDisclosure } from '@chakra-ui/react';
import { Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import type { FC } from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';
import { FaBars, FaMoon, FaSun } from 'react-icons/fa';
import { FaTwitter } from 'react-icons/fa';

import { Navigation } from '@/components/layout/Navigation';
import { StyledLink } from '@/components/ui/StyledLink';

export const Header: FC<{ isDesktop: boolean }> = ({ isDesktop }) => {
  const [t] = useTranslation('common');
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef(null);

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
            <IconButton
              size="sm"
              icon={<FaTwitter title={t('header.twitter')} />}
              onClick={() => window.open('https://twitter.com/__cp20__', '_blank')}
              aria-label={t('header.twitter')}
              title={t('header.twitter')}
            />

            {/* toggleColorMode Button */}
            <IconButton
              size="sm"
              icon={colorMode === 'light' ? <FaSun /> : <FaMoon />}
              onClick={() => toggleColorMode()}
              aria-label={t('header.toggleColorMode')}
              title={t('header.toggleColorMode')}
            />

            {/* navigation menu */}
            {isDesktop || (
              <>
                <IconButton
                  size="sm"
                  icon={<FaBars />}
                  aria-label={t('header.navigation')}
                  title={t('header.navigation')}
                  ref={btnRef}
                  onClick={onOpen}
                />
                <Drawer isOpen={isOpen} placement="right" onClose={onClose} finalFocusRef={btnRef}>
                  <DrawerOverlay />
                  <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>{t('header.navigation')}</DrawerHeader>

                    <DrawerBody>
                      <Navigation />
                    </DrawerBody>
                  </DrawerContent>
                </Drawer>
              </>
            )}
          </div>
        </header>
      </Box>
    </>
  );
};
