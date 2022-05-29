import { Checkbox, Heading } from '@chakra-ui/react';
import type { NextPage } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { FaSearch } from 'react-icons/fa';

import { useExpectedValue } from '@/components/functional/useExpectedValue';
import { IndexLayout } from '@/components/layout/IndexLayout';
import { ExpectResult } from '@/components/model/ExpectResult';
import { H1, H2 } from '@/components/ui/Heading';
import { Inputbox } from '@/components/ui/Inputbox';

const Home: NextPage = () => {
  const [t] = useTranslation('expect');
  const { inputVal, onInputChange, isAutoCalc, onAutoCalcChange, onSubmit, result } = useExpectedValue();

  return (
    <>
      <IndexLayout>
        <div className="px-4">
          <H1>
            <FaSearch className="inline" />
            <span>{t('title')}</span>
          </H1>

          <p className="mb-8">{t('description')}</p>

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
          <div className="my-8 border-l-4 pl-2 text-gray-500 dark:text-gray-300">
            <Heading as="h3" size="md" className="py-2">
              {t('inputExample')}
            </Heading>
            <ul className="pl-2">
              <li>1+3D (1+3d6)</li>
              <li>3*2*4D (3*2*4d6)</li>
              <li>5 + 1d10</li>
              <li>1d100*1d100</li>
              <li>(1d100 + 10) * 3 + 1D</li>
            </ul>
          </div>
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
      ...(await serverSideTranslations(context.locale, ['common', 'expect'])),
    },
  };
};

export default Home;
