import { Heading } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import type { FC } from 'react';

export const InputExamples: FC = () => {
  const [t] = useTranslation('common');

  return (
    <>
      <div className="my-8 border-l-4 pl-2 text-gray-500 dark:text-gray-300">
        <Heading as="h3" size="md" className="py-2">
          {t('inputExample')}
        </Heading>
        <ul className="pl-2">
          <li>1+3D (1+3d6)</li>
          <li>3*2*4D (3*2*4d6)</li>
          <li>5 + 1d10</li>
          <li>1d100*1d100</li>
          <li>(1d100 + 10) * 3 + 1D</li>
        </ul>
      </div>
    </>
  );
};
