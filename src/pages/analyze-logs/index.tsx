import type { GetServerSideProps, NextPage } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { IoAnalytics } from 'react-icons/io5';

import { Descriptions } from '@/components/functional/Descriptions';
import { IndexLayout } from '@/components/layout/IndexLayout';
import { LogAnalysis } from '@/components/model/LogAnalysis';
import { H1 } from '@/components/ui/Heading';

const AnalyzeLogs: NextPage = () => {
  const [t, i18n] = useTranslation(['analyze', 'common']);

  console.log(JSON.stringify(i18n.getDataByLanguage('ja'), null, '  '));

  return (
    <>
      <Descriptions title={`${t('title')} - ${t('common:title')}`} description={t('description')} />

      <IndexLayout>
        <div className="px-4">
          <H1>
            <IoAnalytics className="inline" />
            <span>{t('title')}</span>
          </H1>

          <p className="mb-8">{t('description')}</p>

          <LogAnalysis />
        </div>
      </IndexLayout>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  console.log(JSON.stringify(await serverSideTranslations(locale ?? 'ja', ['common', 'analyze']), null, '  '));

  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'ja', ['common', 'analyze'])),
    },
  };
};

export const config = {
  runtime: 'nodejs',
};

export default AnalyzeLogs;
