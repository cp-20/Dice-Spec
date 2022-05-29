import type { ChangeEventHandler, FormEventHandler } from 'react';
import { useState } from 'react';

import { calcExpectedValue } from '@/features/parser/expect';
import type { expectedValue } from '@/typings/ast';

export type successResult = expectedValue & { error: false };

export type expectResult = { error: true } | successResult | null;

const calculation = (input: string): expectResult => {
  if (input.length === 0) {
    return null;
  }
  try {
    const result = calcExpectedValue(input);
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

export const useExpectedValue = () => {
  const [inputVal, setInputVal] = useState('');
  const [isAutoCalc, setIsAutoCalc] = useState(true);
  const [result, setResult] = useState<expectResult>(null);

  const onSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    setResult(calculation(inputVal));
  };

  const onInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setInputVal(e.target.value);
    if (isAutoCalc) {
      if (timeout) {
        clearTimeout(timeout);
      }
      timeout = setTimeout(() => {
        setResult(calculation(e.target.value));
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
