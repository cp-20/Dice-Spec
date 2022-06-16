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
    });
  });
});
