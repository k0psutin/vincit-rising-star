import { dateToString } from '../utils';
import { maximizeProfits } from '../utils/maximizeProfits';
import { prices } from './testData';

describe('Maximize profits tests', () => {
  test('maximizeProfits returns 0 if price list is null', () => {
    expect(maximizeProfits(null)).toBe(null);
  });

  test('maximizeProfits returns 0 if price list is empty', () => {
    expect(maximizeProfits([])).toBe(null);
  });

  test('maximizeProfits returns 0 if price list is wrong size', () => {
    expect(maximizeProfits([[0], [1]])).toBe(null);
  });

  test('maximizeProfits returns the correct pair if all prices are ascending', () => {
    const startDate = new Date().getTime();
    const length = 500;

    const buyDate = dateToString(startDate + 1000000);
    const sellDate = dateToString(startDate + ((length - 1) * 1000000));

    const increasingPrices: Array<Array<number>> = [];

    for (let i = 0; i < length; i += 1) {
      increasingPrices.push([+new Date(startDate + (i * 1000000)), 8000 + i]);
    }

    const goodPair = {
      buyDate,
      sellDate,
    };

    const profitDayPair = maximizeProfits(increasingPrices);

    expect(profitDayPair).toEqual(goodPair);
  });

  test('maximizeProfits returns bad pair if all prices are descending', () => {
    const increasingPrices = [];

    for (let i = 0; i < 500; i += 1) {
      increasingPrices.push([i, 8000 - i]);
    }

    const profitDayPair = maximizeProfits(increasingPrices);

    expect(profitDayPair).toEqual({ buyDate: '0', sellDate: '0' });
  });

  test('Return correct buy and sell date', () => {
    const profitDayPair = maximizeProfits(prices);

    expect(profitDayPair).toEqual({ buyDate: '17.03.2020', sellDate: '31.12.2020' });
  });
});

export {};
