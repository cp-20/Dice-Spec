import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { DiceRoll } from '@/components/features/dice';

type contextType = {
  locale: string;
};
export const getStaticProps = async (context: contextType) => {
  return {
    props: {
      ...(await serverSideTranslations(context.locale ?? 'ja', ['common', 'dice'])),
    },
  };
};

export default DiceRoll;
