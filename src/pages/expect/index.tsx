import { Checkbox } from '@chakra-ui/react';
import type { NextPage } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { FaSearch } from 'react-icons/fa';

import { Descriptions } from '@/components/functional/Descriptions';
import { useCalculation } from '@/components/functional/useCalculation';
import { IndexLayout } from '@/components/layout/IndexLayout';
import { ExpectResult } from '@/components/model/ExpectResult';
import { InputExamples } from '@/components/model/InputExamples';
import { H1, H2 } from '@/components/ui/Heading';
import { Inputbox } from '@/components/ui/Inputbox';
import { calcExpectedValue } from '@/features/parser/expect';

const Home: NextPage = () => {
  const [t] = useTranslation(['expect', 'common']);
  const { inputVal, onInputChange, isAutoCalc, onAutoCalcChange, onSubmit, result } = useCalculation(calcExpectedValue);

  return (
    <>
      <Descriptions title={`${t('title')} - ${t('common:title')}`} description={t('description')} />

      <IndexLayout>
        <div className="px-4">
          <H1>
            <FaSearch className="inline" />
            <span>{t('title')}</span>
          </H1>

          <p className="mb-2">{t('description')}</p>
          <p className="mb-8">
            さらに<code className="mx-1 bg-slate-100 px-1">1D100&lt;=10</code>や
            <code className="mx-1 bg-slate-100 px-1">2D6&gt;=10</code>
            と入力することで、その確率も知ることができます。
          </p>

          <Inputbox
            onSubmit={onSubmit}
            onChange={onInputChange}
            inputVal={inputVal}
            isInvalid={result ? result.error : false}
            placeholder={t('form.placeholder')}
            submitText={t('form.submit')}
            errorText={t('form.helptext.error')}
          >
            <Checkbox isChecked={isAutoCalc} onChange={onAutoCalcChange} className="my-2">
              {t('form.autoCalc')}
            </Checkbox>
          </Inputbox>

          <div className="my-8">
            <H2>{t('result.title')}</H2>
            <ExpectResult result={result} />
          </div>

          <H2>{t('usage.title')}</H2>
          <p>{t('usage.description')}</p>
          <InputExamples />
        </div>
      </IndexLayout>
    </>
  );
};

type contextType = {
  locale: string;
};
export const getStaticProps = async (context: contextType) => {
  return {
    props: {
      ...(await serverSideTranslations(context.locale ?? 'ja', ['common', 'expect'])),
    },
  };
};

export default Home;
