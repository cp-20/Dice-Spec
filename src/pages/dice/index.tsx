import { FormControl } from '@chakra-ui/react';
import type { NextPage } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import type { ChangeEvent, Dispatch, SetStateAction } from 'react';
import { createContext, useState } from 'react';
import { BsDice5 } from 'react-icons/bs';

import { useCalculation } from '@/components/functional/useCalculation';
import { useDiceRoll } from '@/components/functional/useDiceRoll';
import { IndexLayout } from '@/components/layout/IndexLayout';
import { AdvancedSettings } from '@/components/model/AdvancedSettings';
import { SystemSelect } from '@/components/model/SystemSelect';
import { FormLabel } from '@/components/ui/FormLabel';
import { H1, H2 } from '@/components/ui/Heading';
import { Inputbox } from '@/components/ui/Inputbox';
import type { diceConfig } from '@/typings/diceConfig';

const initialConfig: diceConfig = {
  apiServer: 'https://bcdice.onlinesession.app',
  system: {
    id: 'DiceBot',
    name: 'DiceBot',
    command_pattern:
      /^S?([+\-(]*\d+|\d+B\d+|\d+T[YZ]\d+|C[+\-(]*\d+|choice|D66|(repeat|rep|x)\d+|\d+R\d+|\d+U\d+|BCDiceVersion)/,
    help_message:
      '3D6+1>=9 ：3d6+1で目標値9以上かの判定 1D100<=50 ：D100で50％目標の下方ロールの例 3U6[5] ：3d6のダイス目が5以上の場合に振り足しして合計する(上方無限) 3B6 ：3d6のダイス目をバラバラのまま出力する（合計しない） 10B6>=4 ：10d6を振り4以上のダイス目の個数を数える 2R6[>3]>=5 ：2D6のダイス目が3より大きい場合に振り足して、5以上のダイス目の個数を数える (8/2)D(4+6)<=(5*3)：個数・ダイス・達成値には四則演算も使用可能 c(10-4*3/2+2)：c(計算式）で計算だけの実行も可能 choice[a,b,c]：列挙した要素から一つを選択表示。ランダム攻撃対象決定などに S3d6 ： 各コマンドの先頭に「S」を付けると他人結果の見えないシークレットロール 3d6/2 ： ダイス出目を割り算（端数処理はゲームシステム依存）。切り上げは /2C、四捨五入は /2R、切り捨ては /2F D66 ： D66ダイス。順序はゲームに依存。D66N：そのまま、D66A：昇順、D66D：降順 詳細は下記URLのコマンドガイドを参照 https://docs.bcdice.org/ ',
  },
  help: true,
  sound: true,
  volume: 50,
};

export const configContext = createContext<{
  config: diceConfig;
  setConfig: Dispatch<SetStateAction<diceConfig>> | null;
}>({
  config: initialConfig,
  setConfig: null,
});

const Home: NextPage = () => {
  const [t] = useTranslation('dice');
  const { diceRoll } = useDiceRoll();
  const { inputVal, onInputChange, onSubmit } = useCalculation(diceRoll, false);
  const [config, setConfig] = useState(initialConfig);
  const [error, setError] = useState(false);
  const validate = (input: string) => {
    if (input.length === 0) {
      setError(false);
    } else {
      setError(!input.match(config.system.command_pattern));
    }
  };

  return (
    <>
      <configContext.Provider value={{ config, setConfig }}>
        <IndexLayout>
          <div className="px-4">
            <H1>
              <BsDice5 className="inline" />
              <span>{t('title')}</span>
            </H1>

            <p className="mb-8">{t('description')}</p>

            <FormControl className="mt-4 mb-8">
              <FormLabel>{t('form.system')}</FormLabel>
              <SystemSelect />
            </FormControl>

            <Inputbox
              onSubmit={onSubmit}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                validate(e.target.value);
                onInputChange(e);
              }}
              inputVal={inputVal}
              isInvalid={error}
              placeholder={t('form.placeholder')}
              submitText={t('form.submit')}
              errorText={t('form.error')}
            />
            <AdvancedSettings />

            <H2>{t('usage.title')}</H2>
            <p>{t('usage.description')}</p>
          </div>
        </IndexLayout>
      </configContext.Provider>
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
