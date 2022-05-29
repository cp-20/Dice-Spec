import { Button, Checkbox, FormControl, FormErrorMessage, Heading, Input } from '@chakra-ui/react';
import type { NextPage } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { useExpectedValue } from '@/components/functional/useExpectedValue';
import { IndexLayout } from '@/components/layout/IndexLayout';
import { ExpectResult } from '@/components/model/ExpectResult';

const Home: NextPage = () => {
  const [t] = useTranslation('expect');
  const { inputVal, onInputChange, isAutoCalc, onAutoCalcChange, onSubmit, result } = useExpectedValue();

  return (
    <>
      <IndexLayout>
        <div className="px-4">
          <Heading as="h1" className="py-4">
            {t('title')}
          </Heading>

          <p className="mb-8">{t('description')}</p>

          <form onSubmit={onSubmit}>
            <FormControl isInvalid={result ? result.error : false}>
              <div className="flex space-x-2">
                <Input size="lg" placeholder={t('form.placeholder')} value={inputVal} onChange={onInputChange} />
                <Button type="submit" size="lg" colorScheme="teal">
                  {t('form.submit')}
                </Button>
              </div>
              <FormErrorMessage>{t('form.helptext.error')}</FormErrorMessage>
            </FormControl>
            <Checkbox isChecked={isAutoCalc} onChange={onAutoCalcChange} className="my-2">
              {t('form.autoCalc')}
            </Checkbox>
          </form>

          <div className="my-8">
            <Heading as="h2" size="lg" className="mb-4">
              {t('result.title')}
            </Heading>
            <ExpectResult result={result} />
          </div>

          <div className="my-8 border-l-4 pl-2 text-gray-500">
            <Heading as="h2" size="md" className="py-2">
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
