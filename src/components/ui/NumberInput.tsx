import type { NumberInputProps } from '@chakra-ui/react';
import {
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput as ChakraNumberInput,
  NumberInputField,
  NumberInputStepper,
} from '@chakra-ui/react';
import type { FC } from 'react';

export const NumberInput: FC<NumberInputProps> = (props) => (
  <ChakraNumberInput {...props}>
    <NumberInputField />
    <NumberInputStepper>
      <NumberIncrementStepper />
      <NumberDecrementStepper />
    </NumberInputStepper>
  </ChakraNumberInput>
);
