import peggy from 'peggy';

import parserCode from '@/features/parser/expect.pegjs';
import { formatInput } from '@/features/utils/formatInput';
import { generate2DArray } from '@/features/utils/init2DArray';
import type { diceAST, expectedValue, operator, resolvedDiceAST } from '@/typings/ast';

const parser = peggy.generate(parserCode);

const calcOperator: { [key in operator]: (left: number, right: number) => number } = {
  '+': (left, right) => left + right,
  '-': (left, right) => left - right,
  '*': (left, right) => left * right,
  '/': (left, right) => left / right,
};

const semanticAnalysis = async (
  AST: diceAST,
  target: number | null = null,
  isBigger: boolean | null = null
): Promise<expectedValue> => {
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
            // V(X-Y)=V(X)+V(Y)
            return LV + RV;
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
          const minmax = [
            calcOperator[AST.operator](left.range.min, right.range.min),
            calcOperator[AST.operator](left.range.min, right.range.max),
            calcOperator[AST.operator](left.range.max, right.range.min),
            calcOperator[AST.operator](left.range.max, right.range.max),
          ];
          return {
            min: Math.min(...minmax),
            max: Math.max(...minmax),
          };
        })(),
      };
    } else if (AST.type === 'dice') {
      if (AST.dice <= 0 || AST.sides <= 0) {
        throw new Error('invalid dice roll');
      }
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

  const searchAllWays = (AST: diceAST): Record<string, number> => {
    if (AST.type === 'operator') {
      const left = searchAllWays(AST.left);
      const right = searchAllWays(AST.right);

      const result: Record<string, number> = {};

      const leftVals = Object.keys(left);
      for (let i = 0; i < leftVals.length; i++) {
        const rightVals = Object.keys(right);
        for (let j = 0; j < rightVals.length; j++) {
          const valL = leftVals[i];
          const valR = rightVals[j];

          const value = calcOperator[AST.operator](Number(valL), Number(valR));
          const chance = Number(left[valL]) * Number(right[valR]);

          result[`${value}`] = (result[`${value}`] ?? 0) + chance;
        }
      }

      return result;
    } else if (AST.type === 'dice') {
      const { dice, sides } = AST;

      // O(dice^2 * sides)

      const dp = generate2DArray(dice, sides * dice, 0.0);
      for (let i = 0; i < sides; i++) {
        dp[0][i] = 1.0 / sides;
      }
      for (let i = 1; i < dice; i++) {
        let sum = 0.0;
        for (let j = 0; j < dice * sides; j++) {
          if (j < sides) {
            sum += dp[i - 1][j];
          } else {
            sum = sum - dp[i - 1][j - sides] + dp[i - 1][j];
          }
          dp[i][j] += sum / sides;
        }
      }

      return new Array(dice * sides - dice + 1)
        .fill(0)
        .map((_, i) => ({ [i + dice]: dp[dice - 1][i] }))
        .reduce((acc, cur) => ({ ...acc, ...cur }), {});
    } else if (AST.type === 'number') {
      return { [AST.value]: 1 };
    } else {
      throw new Error('unknown AST type');
    }
  };

  const result = resolveNode(AST);

  const { mean, variance, range } = result;
  const SD = Math.sqrt(variance);

  const { CI, chance, dist } = (() => {
    const rollResult = (() => {
      return searchAllWays(AST);
    })();

    const step = Math.max(0.1 / Math.max(mean - range.min, range.max - mean), 1e-5);

    const CI = (() => {
      for (let d = 1; d >= 0; d -= step) {
        const chance = Object.keys(rollResult)
          .filter((val) => Number(val) >= mean - (mean - range.min) * d && Number(val) <= mean + (range.max - mean) * d)
          .reduce((acc, cur) => acc + rollResult[cur], 0);

        if (chance < 0.95) {
          return {
            max: mean + (range.max - mean) * d,
            min: mean - (mean - range.min) * d,
          };
        }
      }
      return range;
    })();

    const chance =
      target !== null
        ? Object.keys(rollResult)
            .filter((val) => (isBigger ? Number(val) >= target : Number(val) <= target))
            .reduce((acc, cur) => acc + rollResult[cur], 0)
        : undefined;

    return {
      CI,
      chance,
      dist: rollResult,
    };
  })();

  return {
    input: {
      isBigger,
      target,
    },
    mean,
    variance,
    range,
    SD,
    CI,
    dist,
    ...(chance !== undefined ? { chance } : {}),
  };
};

export const calcExpectedValue = (input: string): Promise<expectedValue> => {
  const formattedInput = formatInput(input);

  const match = formattedInput.match(/^([0-9d+-\\*/\s]+)\s*([<>])=\s*([0-9\s]+)$/i);
  if (match) {
    const AST = parser.parse(match[1].trim());
    return semanticAnalysis(AST, parseInt(match[3], 10), match[2] === '>');
  } else {
    const AST = parser.parse(formattedInput);
    return semanticAnalysis(AST);
  }
};
