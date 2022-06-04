import type { NextPage } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { BsDice5 } from 'react-icons/bs';
import { FaFileExport, FaGithub, FaSearch, FaTwitter } from 'react-icons/fa';

import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { LandingCard, LandingCardLink, LandingLink } from '@/components/model/LandingCard';
import { LandingSection } from '@/components/model/LandingSection';

const Home: NextPage = () => {
  const [t] = useTranslation(['index', 'common']);

  return (
    <>
      <Header isDesktop={true} />
      <div className="min-h-[calc(100vh-5.5rem)] px-4">
        <h1 className="py-8 text-center font-ZenKaku text-4xl sm:text-5xl md:text-6xl">{t('common:title')}</h1>
        <p className="text-center">{t('description')}</p>

        <LandingSection label={t('functions.title')}>
          <LandingCardLink
            title={t('functions.1.title')}
            content={t('functions.1.description')}
            href="/expect"
            icon={<FaSearch />}
          />
          <LandingCardLink
            title={t('functions.2.title')}
            content={t('functions.2.description')}
            href="/dice"
            icon={<BsDice5 />}
          />
          <LandingCardLink
            title={t('functions.3.title')}
            content={t('functions.3.description')}
            href="/ccfolia"
            icon={<FaFileExport />}
          />
        </LandingSection>

        <LandingSection label={t('features.title')}>
          <LandingCard title={t('features.1.title')} content={t('features.1.description')} />
          <LandingCard title={t('features.2.title')} content={t('features.2.description')} />
          <LandingCard title={t('features.3.title')} content={t('features.3.description')} />
        </LandingSection>

        <LandingSection label={t('links.title')}>
          <LandingLink href="https://twitter.com/__cp20__" icon={<FaTwitter />} label={t('links.twitter')} />
          <LandingLink href="https://github.com/cp-20/Dice-Spec" icon={<FaGithub />} label={t('links.github')} />
        </LandingSection>
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
