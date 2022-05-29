import type { ChangeEventHandler, FormEventHandler } from 'react';
import { useState } from 'react';

export type successResult<T> = T & { error: false };

export type calcResult<T> = { error: true } | successResult<T> | null;

export type parser<T> = (input: string) => T;

const calculation = <T,>(input: string, parser: parser<T>): calcResult<T> => {
  if (input.length === 0) {
    return null;
  }
  try {
    const result = parser(input);
    return {
      ...result,
      error: false,
    };
  } catch (error) {
    return {
      error: true,
    };
  }
};

let timeout: NodeJS.Timeout | null = null;

export const useCalculation = <T,>(parser: parser<T>) => {
  const [inputVal, setInputVal] = useState('');
  const [isAutoCalc, setIsAutoCalc] = useState(true);
  const [result, setResult] = useState<calcResult<T>>(null);

  const onSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    setResult(calculation(inputVal, parser));
  };

  const onInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setInputVal(e.target.value);
    if (isAutoCalc) {
      if (timeout) {
        clearTimeout(timeout);
      }
      timeout = setTimeout(() => {
        setResult(calculation(e.target.value, parser));
      }, 500);
    }
  };

  const onAutoCalcChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setIsAutoCalc(e.target.checked);
  };

  return {
    inputVal,
    onInputChange,
    isAutoCalc,
    onAutoCalcChange,
    onSubmit,
    result,
  };
};
