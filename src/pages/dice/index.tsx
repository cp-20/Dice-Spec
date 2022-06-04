import { FormControl, Text } from '@chakra-ui/react';
import type { NextPage } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import type { ChangeEvent, Dispatch, SetStateAction } from 'react';
import { useEffect } from 'react';
import { createContext, useState } from 'react';
import { BsDice5 } from 'react-icons/bs';

import { Descriptions } from '@/components/functional/Descriptions';
import { MultiLineBody } from '@/components/functional/MuliLineBody';
import type { calcResult, successResult } from '@/components/functional/useCalculation';
import { useCalculation } from '@/components/functional/useCalculation';
import type { diceRollResult, errorResult } from '@/components/functional/useDiceRoll';
import { useDiceRoll } from '@/components/functional/useDiceRoll';
import { useDiceSound } from '@/components/functional/useDiceSound';
import { IndexLayout } from '@/components/layout/IndexLayout';
import { AdvancedSettings } from '@/components/model/AdvancedSettings';
import type { diceResult } from '@/components/model/DiceResult';
import { DiceResult } from '@/components/model/DiceResult';
import { SystemSelect } from '@/components/model/SystemSelect';
import { FormLabel } from '@/components/ui/FormLabel';
import { H1 } from '@/components/ui/Heading';
import { Inputbox } from '@/components/ui/Inputbox';
import type { diceConfig, jsonDiceConfig } from '@/typings/diceConfig';

const initialConfig: diceConfig = {
  apiServer: 'https://bcdice.onlinesession.app',
  system: {
    id: 'DiceBot',
    name: 'DiceBot',
    command_pattern:
      /^S?([+\-(]*\d+|\d+B\d+|\d+T[YZ]\d+|C[+\-(]*\d+|choice|D66|(repeat|rep|x)\d+|\d+R\d+|\d+U\d+|BCDiceVersion)/,
    help_message: `3D6+1>=9 ：3d6+1で目標値9以上かの判定
1D100<=50 ：D100で50％目標の下方ロールの例
3U6[5] ：3d6のダイス目が5以上の場合に振り足しして合計する(上方無限)
3B6 ：3d6のダイス目をバラバラのまま出力する（合計しない）
10B6>=4 ：10d6を振り4以上のダイス目の個数を数える
2R6[>3]>=5 ：2D6のダイス目が3より大きい場合に振り足して、5以上のダイス目の個数を数える
(8/2)D(4+6)<=(5*3)：個数・ダイス・達成値には四則演算も使用可能
c(10-4*3/2+2)：c(計算式）で計算だけの実行も可能
choice[a,b,c]：列挙した要素から一つを選択表示。ランダム攻撃対象決定などに
S3d6 ： 各コマンドの先頭に「S」を付けると他人結果の見えないシークレットロール
3d6/2 ： ダイス出目を割り算（端数処理はゲームシステム依存）。切り上げは /2C、四捨五入は /2R、切り捨ては /2F
D66 ： D66ダイス。順序はゲームに依存。D66N：そのまま、D66A：昇順、D66D：降順

詳細は下記URLのコマンドガイドを参照
https://docs.bcdice.org/`,
  },
  help: true,
  sound: true,
  volume: 50,
  loaded: false,
};

export const configContext = createContext<{
  config: diceConfig;
  setConfig: Dispatch<SetStateAction<diceConfig>> | null;
}>({
  config: initialConfig,
  setConfig: null,
});

type PromiseResult = successResult<{ result: Promise<errorResult | diceRollResult> }>;

const isPromiseResult = (result: calcResult<PromiseResult | errorResult>): result is PromiseResult =>
  result ? Object.hasOwn(result, 'result') : false;

const Home: NextPage = () => {
  const [t] = useTranslation(['dice', 'common']);
  const [config, setConfig] = useState(initialConfig);
  const { diceRoll, validator } = useDiceRoll(config);
  const { inputVal, setInputVal, onInputChange, onSubmit, result, setResult } = useCalculation(diceRoll, false);
  const [isInvalid, setIsInvalid] = useState(false);
  const [diceResult, setDiceResult] = useState<diceResult[]>([]);
  const { play } = useDiceSound(config);

  useEffect(() => {
    if (result) {
      if (isPromiseResult(result)) {
        Promise.resolve(result.result).then((result) => {
          if (result.success) {
            play();
            setInputVal('');
            const rollResult: diceResult = {
              date: new Date(),
              system: config.system.name,
              success: result.result.success || result.result.critiacl,
              failure: result.result.failure || result.result.fumble,
              text: result.result.text,
            };
            setDiceResult([...diceResult, rollResult]);
            setResult(null);
          } else {
            setIsInvalid(true);
          }
        });
      } else if (result.error) {
        setIsInvalid(true);
      }
    }
  }, [config.system.name, diceResult, play, result, setInputVal, setResult]);

  useEffect(() => {
    if (config.loaded) {
      const raw_command_pattern = String(config.system.command_pattern);
      const command_pattern = raw_command_pattern.slice(1).substring(0, raw_command_pattern.lastIndexOf('/'));
      localStorage.setItem('diceConfig', JSON.stringify({ ...config, system: { ...config.system, command_pattern } }));
    } else {
      const localConfig = localStorage.getItem('diceConfig');
      if (localConfig) {
        const parsedConfig = JSON.parse(localConfig) as jsonDiceConfig;
        const command_pattern = new RegExp(parsedConfig.system.command_pattern);
        setConfig({ ...parsedConfig, system: { ...parsedConfig.system, command_pattern }, loaded: true });
      } else {
        setConfig({ ...initialConfig, loaded: true });
      }
    }
  }, [config]);

  return (
    <>
      <Descriptions title={`${t('title')} - ${t('common:title')}`} description={t('description')} />
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
              <SystemSelect config={config} />
            </FormControl>

            <DiceResult result={diceResult} />

            <Inputbox
              onSubmit={onSubmit}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setIsInvalid(validator(e.target.value) === false);
                onInputChange(e);
              }}
              inputVal={inputVal}
              isInvalid={isInvalid}
              placeholder={t('form.placeholder')}
              submitText={t('form.submit')}
              errorText={t('form.error')}
            />

            {config.help && (
              <div className="my-4 rounded-md border-2 border-gray-500/10 py-2 px-4">
                <p className="mb-2 font-bold text-gray-600 dark:text-gray-300">{config.system.name}</p>
                <Text fontSize="sm">
                  <MultiLineBody body={config.system.help_message} />
                </Text>
              </div>
            )}

            <AdvancedSettings config={config} />
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
