import { useTranslation } from 'next-i18next';
import type { ChangeEventHandler, FC, FormEventHandler } from 'react';
import { useState } from 'react';

import { useDiceRoll } from '@/components/features/dice/useDiceRoll';
import { Inputbox } from '@/components/ui/Inputbox';

export const DiceRollInput: FC = () => {
  const [t] = useTranslation('dice');

  const [inputVal, setInputVal] = useState('');
  const [isInvalid, setIsInvalid] = useState(false);
  const { diceRoll, pushResult, validator } = useDiceRoll();

  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setIsInvalid(validator(e.target.value) === false);
    setInputVal(e.target.value);
  };

  const onSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    try {
      const result = await diceRoll(inputVal);
      if (result.success) {
        setInputVal('');
        pushResult(result);
      } else {
        setIsInvalid(true);
      }
    } catch (err) {
      setIsInvalid(true);
    }
  };

  return (
    <Inputbox
      onSubmit={onSubmit}
      onChange={onChange}
      inputVal={inputVal}
      isInvalid={isInvalid}
      placeholder={t('form.placeholder')}
      submitText={t('form.submit')}
      errorText={t('form.error')}
    />
  );
};
