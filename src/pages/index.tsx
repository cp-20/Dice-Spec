import type { NextPage } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { BsDice5 } from 'react-icons/bs';
import { FaFileExport, FaSearch } from 'react-icons/fa';

import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { LandingCard } from '@/components/model/LandingCard';

const Home: NextPage = () => {
  const [t] = useTranslation(['index', 'common']);

  return (
    <>
      <Header isDesktop={true} />
      <div className="min-h-[calc(100vh-5.5rem)] px-4">
        <h1 className="py-8 text-center font-ZenKaku text-4xl sm:text-5xl md:text-6xl">{t('common:title')}</h1>
        <p className="text-center">{t('description')}</p>

        <div className="my-8 flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
          <LandingCard
            title={t('features.1.title')}
            content={t('features.1.description')}
            href="/expect"
            icon={<FaSearch />}
          />
          <LandingCard
            title={t('features.2.title')}
            content={t('features.2.description')}
            href="/dice"
            icon={<BsDice5 />}
          />
          <LandingCard
            title={t('features.3.title')}
            content={t('features.3.description')}
            href="/ccfolia"
            icon={<FaFileExport />}
          />
        </div>
      </div>
      <Footer />
    </>
  );
};

type contextType = {
  locale: string;
};
export const getStaticProps = async (context: contextType) => {
  return {
    props: {
      ...(await serverSideTranslations(context.locale, ['common', 'index'])),
    },
  };
};

export default Home;
