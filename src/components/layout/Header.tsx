import { Box, IconButton, Tooltip, useColorMode, useDisclosure } from '@chakra-ui/react';
import { Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import type { FC } from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';
import { FaBars, FaDiscord, FaMoon, FaSun, FaTwitter } from 'react-icons/fa';

import { Navigation } from '@/components/layout/Navigation';
import { LanguageSelect } from '@/components/model/LanguageSelect';
import { StyledLink } from '@/components/ui/StyledLink';
import { DICESPEC_VERSION } from '@/const/version';

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
          <div className="flex flex-col items-center justify-center sm:flex-row sm:space-x-2">
            <StyledLink href="/" className="font-ZenKaku text-lg transition-all hover:opacity-60 dark:hover:opacity-70">
              {t('title')}
            </StyledLink>
            <p>v{DICESPEC_VERSION}</p>
          </div>

          <div className="ml-auto flex flex-col-reverse sm:flex-row sm:items-center sm:space-x-4">
            <div className="mt-2 sm:mt-0">
              {/* change languages */}

              <LanguageSelect />
            </div>

            <div className="flex justify-end space-x-4">
              {/* Support Community */}
              <Tooltip label={t('header.discord')}>
                <IconButton
                  size="sm"
                  icon={<FaDiscord title={t('header.discord')} />}
                  onClick={() => window.open('https://discord.gg/YQ7negGTUK', '_blank')}
                  aria-label={t('header.discord')}
                />
              </Tooltip>

              {/* Developer's Twitter */}
              <Tooltip label={t('header.twitter')}>
                <IconButton
                  size="sm"
                  icon={<FaTwitter title={t('header.twitter')} />}
                  onClick={() => window.open('https://twitter.com/__cp20__', '_blank')}
                  aria-label={t('header.twitter')}
                />
              </Tooltip>

              {/* toggleColorMode Button */}
              <Tooltip label={t('header.toggleColorMode')}>
                <IconButton
                  size="sm"
                  icon={colorMode === 'light' ? <FaSun /> : <FaMoon />}
                  onClick={() => toggleColorMode()}
                  aria-label={t('header.toggleColorMode')}
                />
              </Tooltip>

              {/* navigation menu */}
              {isDesktop || (
                <>
                  <Tooltip label={t('header.navigation')}>
                    <IconButton
                      size="sm"
                      icon={<FaBars />}
                      aria-label={t('header.navigation')}
                      ref={btnRef}
                      onClick={onOpen}
                    />
                  </Tooltip>
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
          </div>
        </header>
      </Box>
    </>
  );
};
