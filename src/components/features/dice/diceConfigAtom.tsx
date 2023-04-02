import { atom, useAtom } from 'jotai';
import { useEffect } from 'react';

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
  sound: false,
  volume: 50,
  loaded: false,
};

const diceConfigAtom = atom<diceConfig>(initialConfig);

export const useDiceConfig = () => {
  const [config, setConfig] = useAtom(diceConfigAtom);

  useEffect(() => {
    if (config.loaded) {
      const raw_command_pattern = String(config.system.command_pattern);
      const command_pattern = raw_command_pattern.slice(1).substring(0, raw_command_pattern.lastIndexOf('/') - 1);
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
  }, [config, setConfig]);

  return [config, setConfig] as const;
};
