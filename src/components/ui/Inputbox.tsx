import { Button, FormControl, FormErrorMessage, Input } from '@chakra-ui/react';
import type { ChangeEventHandler, FC, FormEventHandler, ReactNode } from 'react';

export type InputboxProps = {
  children?: ReactNode;
  onSubmit: FormEventHandler<HTMLFormElement>;
  onChange: ChangeEventHandler<HTMLInputElement>;
  isInvalid?: boolean;
  inputVal: string;
  placeholder?: string;
  submitText: string;
  errorText?: string;
};

export const Inputbox: FC<InputboxProps> = ({
  children,
  onSubmit,
  onChange,
  isInvalid,
  inputVal,
  placeholder,
  submitText,
  errorText,
}) => (
  <>
    <form onSubmit={onSubmit}>
      <FormControl isInvalid={isInvalid}>
        <div className="flex space-x-2">
          <Input size="lg" placeholder={placeholder} value={inputVal} onChange={onChange} />
          <Button type="submit" size="lg" colorScheme="blue">
            {submitText}
          </Button>
        </div>
        <FormErrorMessage>{errorText}</FormErrorMessage>
      </FormControl>
      {children}
    </form>
  </>
);
