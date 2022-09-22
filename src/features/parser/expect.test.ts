import { expect } from '@jest/globals';

import { calcExpectedValue } from '@/features/parser/expect';

describe('Dice Expecter', () => {
  it('calcExpectedValue', async () => {
    const DiceV = 35 / 12;

    expect(await calcExpectedValue('1d6')).toEqual({
      mean: 3.5,
      variance: expect.closeTo(DiceV, 1),
      SD: expect.closeTo(Math.sqrt(DiceV), 1),
      range: {
        min: 1,
        max: 6,
      },
      CI: {
        min: expect.closeTo(1.1, 1),
        max: expect.closeTo(5.9, 1),
      },
      dist: {
        1: expect.closeTo(1 / 6, 3),
        2: expect.closeTo(1 / 6, 3),
        3: expect.closeTo(1 / 6, 3),
        4: expect.closeTo(1 / 6, 3),
        5: expect.closeTo(1 / 6, 3),
        6: expect.closeTo(1 / 6, 3),
      },
      input: {
        isBigger: null,
        target: null,
      },
    });
    expect(await calcExpectedValue('1d6 + 1d6 - 3')).toEqual({
      mean: 4,
      variance: expect.closeTo(DiceV * 2, 1),
      SD: expect.closeTo(Math.sqrt(DiceV * 2), 1),
      range: {
        min: -1,
        max: 9,
      },
      CI: {
        min: expect.closeTo(-0.9, 1),
        max: expect.closeTo(8.9, 1),
      },
      dist: {
        [-1]: expect.closeTo(1 / 36, 3),
        0: expect.closeTo(2 / 36, 3),
        1: expect.closeTo(3 / 36, 3),
        2: expect.closeTo(4 / 36, 3),
        3: expect.closeTo(5 / 36, 3),
        4: expect.closeTo(6 / 36, 3),
        5: expect.closeTo(5 / 36, 3),
        6: expect.closeTo(4 / 36, 3),
        7: expect.closeTo(3 / 36, 3),
        8: expect.closeTo(2 / 36, 3),
        9: expect.closeTo(1 / 36, 3),
      },
      input: {
        isBigger: null,
        target: null,
      },
    });
    expect(await calcExpectedValue('1d6 * 1d6 * 2 + 5')).toEqual({
      mean: 3.5 ** 2 * 2 + 5,
      variance: expect.closeTo((((3.5 ** 2 * 2 + DiceV) * 35) / 12) * 4, 1),
      SD: expect.closeTo(Math.sqrt((((3.5 ** 2 * 2 + DiceV) * 35) / 12) * 4), 1),
      range: {
        min: 7,
        max: 77,
      },
      CI: {
        min: expect.closeTo(7, 1),
        max: expect.closeTo(76.9, 1),
      },
      dist: {
        7: expect.closeTo(1 / 36, 3),
        9: expect.closeTo(2 / 36, 3),
        11: expect.closeTo(2 / 36, 3),
        13: expect.closeTo(3 / 36, 3),
        15: expect.closeTo(2 / 36, 3),
        17: expect.closeTo(4 / 36, 3),
        21: expect.closeTo(2 / 36, 3),
        23: expect.closeTo(1 / 36, 3),
        25: expect.closeTo(2 / 36, 3),
        29: expect.closeTo(4 / 36, 3),
        35: expect.closeTo(2 / 36, 3),
        37: expect.closeTo(1 / 36, 3),
        41: expect.closeTo(2 / 36, 3),
        45: expect.closeTo(2 / 36, 3),
        53: expect.closeTo(2 / 36, 3),
        55: expect.closeTo(1 / 36, 3),
        65: expect.closeTo(2 / 36, 3),
        77: expect.closeTo(1 / 36, 3),
      },
      input: {
        isBigger: null,
        target: null,
      },
    });
    expect(await calcExpectedValue('3d6 + 1d100 + 1')).toEqual({
      mean: 3.5 * 3 + 50.5 + 1,
      variance: expect.closeTo(DiceV * 3 + (100 ** 2 - 1) / 12, 1),
      SD: expect.closeTo(Math.sqrt(DiceV * 3 + (100 ** 2 - 1) / 12), 1),
      range: {
        min: 5,
        max: 119,
      },
      CI: {
        min: expect.closeTo(14, 1),
        max: expect.closeTo(110, 1),
      },
      dist: expect.anything(),
      input: {
        isBigger: null,
        target: null,
      },
    });
    expect(await calcExpectedValue('6-1d6')).toEqual({
      mean: 6 - 3.5,
      variance: expect.closeTo(DiceV, 1),
      SD: expect.closeTo(Math.sqrt(DiceV), 1),
      range: {
        min: 0,
        max: 5,
      },
      CI: {
        min: expect.closeTo(0.1, 1),
        max: expect.closeTo(4.9, 1),
      },
      dist: {
        0: expect.closeTo(1 / 6, 3),
        1: expect.closeTo(1 / 6, 3),
        2: expect.closeTo(1 / 6, 3),
        3: expect.closeTo(1 / 6, 3),
        4: expect.closeTo(1 / 6, 3),
        5: expect.closeTo(1 / 6, 3),
      },
      input: {
        isBigger: null,
        target: null,
      },
    });
    expect(await calcExpectedValue('3 + 5d >= 15')).toEqual({
      mean: 3 + 3.5 * 5,
      variance: expect.closeTo(DiceV * 5, 1),
      SD: expect.closeTo(Math.sqrt(DiceV * 5), 1),
      range: {
        min: 8,
        max: 33,
      },
      CI: {
        min: expect.closeTo(13, 1),
        max: expect.closeTo(28, 1),
      },
      chance: expect.closeTo(0.941, 3),
      dist: expect.anything(),
      input: {
        isBigger: true,
        target: 15,
      },
    });
    expect(await calcExpectedValue('3 + 5d <= 14')).toEqual({
      mean: 3 + 3.5 * 5,
      variance: expect.closeTo(DiceV * 5, 1),
      SD: expect.closeTo(Math.sqrt(DiceV * 5), 1),
      range: {
        min: 8,
        max: 33,
      },
      CI: {
        min: expect.closeTo(13, 1),
        max: expect.closeTo(28, 1),
      },
      chance: expect.closeTo(1 - 0.941, 3),
      dist: expect.anything(),
      input: {
        isBigger: false,
        target: 14,
      },
    });
    expect(await calcExpectedValue('1d6 >= 8')).toEqual({
      mean: 3.5,
      variance: expect.closeTo(DiceV, 1),
      SD: expect.closeTo(Math.sqrt(DiceV), 1),
      range: {
        min: 1,
        max: 6,
      },
      CI: {
        min: expect.closeTo(1.1, 1),
        max: expect.closeTo(5.9, 1),
      },
      chance: expect.closeTo(0, 3),
      dist: {
        1: expect.closeTo(1 / 6, 3),
        2: expect.closeTo(1 / 6, 3),
        3: expect.closeTo(1 / 6, 3),
        4: expect.closeTo(1 / 6, 3),
        5: expect.closeTo(1 / 6, 3),
        6: expect.closeTo(1 / 6, 3),
      },
      input: {
        isBigger: true,
        target: 8,
      },
    });
  });
});
