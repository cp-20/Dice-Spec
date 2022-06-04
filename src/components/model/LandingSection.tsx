import type { FC, ReactNode } from 'react';

export const LandingSection: FC<{ label: string; children: ReactNode }> = ({ label, children }) => (
  <>
    <h2 className="mt-16 mb-4 text-center text-xl font-bold">{label}</h2>
    <div className="mx-auto mt-4 mb-8 flex max-w-4xl flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
      {children}
    </div>
  </>
);
