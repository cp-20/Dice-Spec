import type { NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { IndexLayout } from '@/components/layout/IndexLayout';

const Home: NextPage = () => {
  return (
    <>
      <IndexLayout>
        <div>/dice</div>
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
      ...(await serverSideTranslations(context.locale, ['common', 'dice'])),
    },
  };
};

export default Home;
