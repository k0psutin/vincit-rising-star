import { longestDownwardTrend } from '../utils/longestDownwardTrend';
import parsedPrices from '../utils/parsePrices';
import { prices } from './testData';

describe('Longest downward trend tests', () => {
  test('longestDownwardTrend returns 0 if price list is null', () => {
    expect(longestDownwardTrend(null)).toBe(null);
  });

  test('longestDownwardTrend returns 0 if price list is empty', () => {
    expect(longestDownwardTrend([])).toBe(null);
  });

  test('longestDownwardTrend returns 0 if price list is wrong size', () => {
    expect(longestDownwardTrend([[0], [1]])).toBe(null);
  });

  test('longestDownwardTrend returns 7 days for correct data', () => {
    const dateRange = {
      from: '2020-03-01',
      to: '2020-08-01',
    };

    const result = longestDownwardTrend(parsedPrices(prices, dateRange));

    const expectedResult = {
      longestTrend: 7,
    };

    expect(result).toStrictEqual(expectedResult);
  });
});

export {};
