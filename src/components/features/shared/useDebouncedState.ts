import type { Dispatch, SetStateAction } from 'react';
import { useEffect, useState } from 'react';

export const useDebouncedState = <T>(defaultValue: T, delay: number): [T, Dispatch<SetStateAction<T>>] => {
  const [value, setValue] = useState(defaultValue);
  const [debounced, setDebounced] = useState(defaultValue);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebounced(value);
    }, delay);
    return () => {
      clearTimeout(timeout);
    };
  }, [delay, value]);

  return [debounced, setValue];
};
