import { useMediaQuery } from '@chakra-ui/react';
import type { FC, ReactNode } from 'react';

import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { Navigation } from '@/components/layout/Navigation';

export const IndexLayout: FC<{ children: ReactNode }> = ({ children }) => {
  const [isDesktop] = useMediaQuery('(min-width: 576px)');

  return (
    <>
      <div className="flex h-screen flex-col">
        <Header isDesktop={isDesktop} />
        <main className="flex min-h-0 flex-1">
          {isDesktop && (
            <div className="w-60 border-r-2 border-gray-100 dark:border-gray-700/50">
              <Navigation />
            </div>
          )}
          <div className="flex-1 overflow-auto p-2">{children}</div>
        </main>
        <Footer />
      </div>
    </>
  );
};
