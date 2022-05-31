import type { FormLabelProps } from '@chakra-ui/react';
import { FormLabel as ChakraFormLabel } from '@chakra-ui/react';
import type { FC } from 'react';

import { cx } from '@/features/utils/cx';

export const FormLabel: FC<FormLabelProps> = ({ className, ...props }) => (
  <>
    <ChakraFormLabel
      className={cx('!font-bold text-gray-700 dark:text-gray-300', className)}
      {...props}
    ></ChakraFormLabel>
  </>
);
