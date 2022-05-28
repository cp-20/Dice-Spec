import type { FC, ReactNode } from 'react';

import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';

export const IndexLayout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <>
      <div className="flex h-screen flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </>
  );
};
