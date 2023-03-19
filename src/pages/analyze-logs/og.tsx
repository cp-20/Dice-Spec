import { Spinner } from '@chakra-ui/react';
import type { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { Descriptions } from '@/components/functional/Descriptions';

const AnalyzeLogsOG: NextPage = () => {
  const { locale, replace } = useRouter();

  useEffect(() => {
    replace('/analyze-logs');
  }, [replace]);

  return (
    <>
      <Descriptions
        title={`${locale === 'en' ? 'Log Analysis - Dice Spec' : 'ログ解析 - ダイススペック'}`}
        description={
          locale === 'en'
            ? 'Analyzes logs output from Cocoforia to extract and analyze rolls of the dice.  (Only CoC6th and CoC7th are supported.)'
            : 'ココフォリアから出力されたログを解析して、ダイスの出目を抽出・分析します。 (クトゥルフ神話TRPG・新クトゥルフ神話TRPGのみ対応)'
        }
      />

      <div className="grid h-screen place-content-center">
        <Spinner size="xl" />
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {},
  };
};

export default AnalyzeLogsOG;
