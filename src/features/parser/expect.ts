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

const semanticAnalysis = (AST: diceAST): expectedValue => {
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
              max: calcOperator[AST.operator](left.range.min, right.range.max),
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

  const result = resolveNode(AST);

  const { mean, variance, range } = result;
  const SD = Math.sqrt(variance);
  const CI = {
    min: mean - 1.96 * SD,
    max: mean + 1.96 * SD,
  };

  return {
    mean,
    variance,
    range,
    SD,
    CI,
  };
};

export const calcExpectedValue = (input: string): expectedValue => {
  const formattedInput = formatInput(input);
  const AST = parser.parse(formattedInput);
  return semanticAnalysis(AST);
};
