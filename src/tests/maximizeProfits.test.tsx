import { formatDateString } from '../utils';
import { maximizeProfits } from '../utils/maximizeProfits';
import { prices } from './testData';

describe('Maximize profits tests', () => {
  const badPair = {
    buyDate: '0', buyPrice: 0, sellDate: '0', sellPrice: 0,
  };

  test('maximizeProfits returns bad pair if price list is null', () => {
    expect(maximizeProfits(null)).toStrictEqual(badPair);
  });

  test('maximizeProfits returns bad pair if price list is empty', () => {
    expect(maximizeProfits([])).toStrictEqual(badPair);
  });

  test('maximizeProfits returns bad pair if price list is wrong size', () => {
    expect(maximizeProfits([[0], [1]])).toStrictEqual(badPair);
  });

  test('maximizeProfits returns the correct pair if all prices are ascending', () => {
    const startDate = new Date().getTime();
    const length = 500;

    const buyDate = formatDateString(startDate + 1000000);
    const buyPrice = 8000;
    const sellDate = formatDateString(startDate + ((length - 1) * 1000000));
    const sellPrice = 8000 + length - 1;

    const increasingPrices: Array<Array<number>> = [];

    for (let i = 0; i < length; i += 1) {
      increasingPrices.push([+new Date(startDate + (i * 1000000)), 8000 + i]);
    }

    const goodPair = {
      buyDate,
      buyPrice,
      sellDate,
      sellPrice,
    };

    const profitDayPair = maximizeProfits(increasingPrices);

    expect(profitDayPair).toStrictEqual(goodPair);
  });

  test('maximizeProfits returns bad pair if all prices are descending', () => {
    const increasingPrices = [];

    for (let i = 0; i < 500; i += 1) {
      increasingPrices.push([i, 8000 - i]);
    }

    const profitDayPair = maximizeProfits(increasingPrices);

    expect(profitDayPair).toEqual(badPair);
  });

  test('Return correct buy and sell date', () => {
    const profitDayPair = maximizeProfits(prices);

    expect(profitDayPair).toStrictEqual({
      buyDate: '17.03.2020', buyPrice: 4509, sellDate: '31.12.2020', sellPrice: 23445,
    });
  });
});

export {};
