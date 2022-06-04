import type { NextPage } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { FaFileExport } from 'react-icons/fa';

import { IndexLayout } from '@/components/layout/IndexLayout';
import { ExportForm } from '@/components/model/ExportForm';
import { H1 } from '@/components/ui/Heading';

const Home: NextPage = () => {
  const [t] = useTranslation('ccfolia');

  return (
    <>
      <IndexLayout>
        <div className="px-4">
          <H1>
            <FaFileExport className="inline" />
            <span>{t('title')}</span>
          </H1>

          <p className="mb-8">{t('description')}</p>

          <ExportForm />
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
      ...(await serverSideTranslations(context.locale, ['common', 'ccfolia'])),
    },
  };
};

export default Home;
