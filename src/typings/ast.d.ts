// abstract syntax tree of the user input
export type diceAST = numberNode | diceNode | operatorNode;

export type numberNode = {
  type: 'number';
  value: number;
};

export type diceNode = {
  type: 'dice';
  dice: number;
  sides: number;
};

export type operator = '+' | '-' | '*' | '/';

export type operatorNode = {
  type: 'operator';
  operator: operator;
  left: diceAST;
  right: diceAST;
};

export type resolvedDiceAST = Omit<
  {
    type: 'resolved';
  } & expectedValue,
  'CI' | 'SD'
>;

export type expectedValue = {
  // 期待値 (expected value)
  mean: number;
  // 標準偏差 (standard deviation)
  SD: number;
  // 分散 (variance)
  variance: number;
  // 範囲 (range)
  range: {
    min: number;
    max: number;
  };
  // 信頼区間 (confidence interval)
  CI: {
    min: number;
    max: number;
  };
};
