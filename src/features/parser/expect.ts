import peggy from 'peggy';

import parserCode from '@/features/parser/expect.pegjs';
import { formatInput } from '@/features/utils/formatInput';
import type { diceAST, expectedValue, operator, resolvedDiceAST } from '@/typings/ast';

const parser = peggy.generate(parserCode);

const calcOperator: { [key in operator]: (left: number, right: number) => number } = {
  '+': (left, right) => left + right,
  '-': (left, right) => left - right,
  '*': (left, right) => left * right,
  '/': (left, right) => left / right,
};

const semanticAnalysis = async (AST: diceAST): Promise<expectedValue> => {
  const resolveNode = (AST: diceAST): resolvedDiceAST => {
    if (AST.type === 'operator') {
      const left = resolveNode(AST.left);
      const right = resolveNode(AST.right);

      return {
        type: 'resolved',
        mean: calcOperator[AST.operator](left.mean, right.mean),
        variance: (() => {
          const LV = left.variance;
          const RV = right.variance;
          if (['+', '-'].includes(AST.operator)) {
            // V(X+Y)=V(X)+V(Y)
            return calcOperator[AST.operator](LV, RV);
          } else if (AST.operator === '*') {
            // V(X*Y)=V(X)*V(Y)+E(X)^2*E(Y)+E(Y)^2*E(X)
            return LV * RV + left.mean ** 2 * RV + right.mean ** 2 * LV;
          } else {
            if (LV * RV === 0) {
              return LV || RV;
            } else {
              throw new Error('cannot divide by dice roll');
            }
          }
        })(),
        range: (() => {
          if (['+', '*'].includes(AST.operator)) {
            // max(X+Y)=max(X)+max(Y)
            // min(X+Y)=min(X)+min(Y)
            return {
              min: calcOperator[AST.operator](left.range.min, right.range.min),
              max: calcOperator[AST.operator](left.range.max, right.range.max),
            };
          } else {
            // min(X-Y)=min(X)-max(Y)
            // max(X-Y)=max(X)-min(Y)
            return {
              min: calcOperator[AST.operator](left.range.min, right.range.max),
              max: calcOperator[AST.operator](left.range.max, right.range.min),
            };
          }
        })(),
      };
    } else if (AST.type === 'dice') {
      const mean = (AST.dice * (AST.sides + 1)) / 2;
      const variance = (AST.dice * (AST.sides ** 2 - 1)) / 12;
      const range = {
        min: AST.dice,
        max: AST.dice * AST.sides,
      };
      return {
        type: 'resolved',
        mean,
        variance,
        range,
      };
    } else if (AST.type === 'number') {
      return {
        type: 'resolved',
        mean: AST.value,
        variance: 0,
        range: {
          min: AST.value,
          max: AST.value,
        },
      };
    } else {
      throw new Error('unknown AST type');
    }
  };

  const diceCombination = (AST: diceAST): number => {
    if (AST.type === 'operator') {
      return diceCombination(AST.left) * diceCombination(AST.right);
    } else if (AST.type === 'dice') {
      return AST.sides ** AST.dice;
    } else {
      return 1;
    }
  };

  const rollDiceAST = (AST: diceAST): number => {
    if (AST.type === 'operator') {
      const left = rollDiceAST(AST.left);
      const right = rollDiceAST(AST.right);
      return calcOperator[AST.operator](left, right);
    } else if (AST.type === 'dice') {
      return new Array(AST.dice)
        .fill(0)
        .map(() => Math.floor(Math.random() * AST.sides) + 1)
        .reduce((acc, cur) => acc + cur, 0);
    } else if (AST.type === 'number') {
      return AST.value;
    } else {
      throw new Error('unknown AST type');
    }
  };

  const searchAllWays = (AST: diceAST): number[] => {
    if (AST.type === 'operator') {
      const left = searchAllWays(AST.left);
      const right = searchAllWays(AST.right);
      return left
        .map((l) => right.map((r) => calcOperator[AST.operator](l, r)))
        .reduce((acc, cur) => acc.concat(cur), []);
    } else if (AST.type === 'dice') {
      const result: number[] = [];

      for (let indexes = new Array(AST.dice + 1).fill(0); indexes[AST.dice] <= 0; ) {
        result.push(indexes.reduce((acc, cur) => acc + cur + 1, -1));
        indexes[0]++;
        indexes.forEach((val, i) => {
          if (val === AST.sides) {
            indexes[i] = 0;
            indexes[i + 1]++;
          }
        });
      }

      return result;
    } else if (AST.type === 'number') {
      return [AST.value];
    } else {
      throw new Error('unknown AST type');
    }
  };

  const result = resolveNode(AST);

  const { mean, variance, range } = result;
  const SD = Math.sqrt(variance);

  const CI = (() => {
    const rollResult = (() => {
      if (diceCombination(AST) > 10000) {
        return new Array(1000).fill(0).map(() => rollDiceAST(AST));
      } else {
        return searchAllWays(AST);
      }
    })();

    const expectedLength = rollResult.length * 0.95;
    const step = Math.max(0.1 / Math.max(mean - range.min, range.max - mean), 1e-5);

    for (let d = 1; d >= 0; d -= step) {
      const dist = rollResult.filter((r) => r >= mean - (mean - range.min) * d && r <= mean + (range.max - mean) * d);
      if (dist.length <= expectedLength) {
        return {
          max: mean + (range.max - mean) * d,
          min: mean - (mean - range.min) * d,
        };
      }
    }

    return range;
  })();

  return {
    mean,
    variance,
    range,
    SD,
    CI,
  };
};

export const calcExpectedValue = (input: string): Promise<expectedValue> => {
  const formattedInput = formatInput(input);
  const AST = parser.parse(formattedInput);
  return semanticAnalysis(AST);
};
