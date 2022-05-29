import { Heading } from '@chakra-ui/react';
import type { FC, ReactNode } from 'react';

export const H1: FC<{ children: ReactNode }> = ({ children }) => (
  <Heading as="h1" className="inline-flex items-center space-x-2 py-4">
    {children}
  </Heading>
);

export const H2: FC<{ children: ReactNode }> = ({ children }) => (
  <Heading as="h2" size="lg" className="my-4 border-b-2 border-gray-200 pb-1">
    {children}
  </Heading>
);
