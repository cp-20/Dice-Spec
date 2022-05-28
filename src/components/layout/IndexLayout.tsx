import type { FC, ReactNode } from 'react';

import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { Navigation } from '@/components/layout/Navigation';

export const IndexLayout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <>
      <div className="flex h-screen flex-col">
        <Header />
        <main className="flex flex-1">
          <div className="w-60">
            <Navigation />
          </div>
          <div className="flex-1 p-2">{children}</div>
        </main>
        <Footer />
      </div>
    </>
  );
};
