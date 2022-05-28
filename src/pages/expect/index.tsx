import type { NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { IndexLayout } from '@/components/layout/IndexLayout';

const Home: NextPage = () => {
  return (
    <>
      <IndexLayout>
        <div>/expect</div>
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
