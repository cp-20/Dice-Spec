import type { ChangeEventHandler, FormEventHandler } from 'react';
import { useState } from 'react';

export type successResult<T> = T & { error: false };

export type calcResult<T> = { error: true } | successResult<T> | null;

export type parser<T> = (input: string) => T | Promise<T>;

const calculation = async <T,>(input: string, parser: parser<T>): Promise<calcResult<T>> => {
  if (input.length === 0) {
    return null;
  }
  try {
    const result = await parser(input);
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

export const useCalculation = <T,>(parser: parser<T>, defaultAutoCalc = true) => {
  const [inputVal, setInputVal] = useState('');
  const [isAutoCalc, setIsAutoCalc] = useState(defaultAutoCalc);
  const [result, setResult] = useState<calcResult<T>>(null);

  const onSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    calculation(inputVal, parser).then((result) => {
      setResult(result);
    });
  };

  const onInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setInputVal(e.target.value);
    if (isAutoCalc) {
      if (timeout) {
        clearTimeout(timeout);
      }
      timeout = setTimeout(() => {
        calculation(e.target.value, parser).then(setResult);
      }, 500);
    }
  };

  const onAutoCalcChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setIsAutoCalc(e.target.checked);
  };

  return {
    inputVal,
    setInputVal,
    onInputChange,
    isAutoCalc,
    onAutoCalcChange,
    onSubmit,
    result,
    setResult,
  };
};
