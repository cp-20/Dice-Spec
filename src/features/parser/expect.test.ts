import { calcExpectedValue } from '@/features/parser/expect';

describe('calcExpectedValue', () => {
  it('should return expected value', () => {
    expect(calcExpectedValue('1d6')).toEqual(
      expect.objectContaining({
        range: {
          min: 1,
          max: 6,
        },
        CI: {
          min: 1,
          max: 6,
        },
      })
    );

    expect(calcExpectedValue('1d6-1')).toEqual(
      expect.objectContaining({
        range: {
          min: 0,
          max: 5,
        },
        CI: {
          min: 0,
          max: 5,
        },
      })
    );
  });
});
