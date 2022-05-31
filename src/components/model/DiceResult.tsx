import type { FC } from 'react';

import type { calcResult } from '../functional/useCalculation';

export const DiceResult: FC<{ result: calcResult<string> }> = ({ result }) => (
  <>
    <div>{result?.error || result}</div>
  </>
);
