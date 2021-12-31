import { highestTradingVolume } from '../utils/highestTradingVolume';
import { total_volumes } from './testData';

describe('Highest trading volume tests', () => {
  const badVolume = {
    date: '', eur: 0,
  };
  test('highestTradingVolume returns bad volume if total volumes is null', () => {
    expect(highestTradingVolume(null)).toStrictEqual(badVolume);
  });

  test('highestTradingVolume returns bad volume if total volumes is empty', () => {
    expect(highestTradingVolume([])).toStrictEqual(badVolume);
  });

  test('highestTradingVolume returns bad volume if total volumes is wrong size', () => {
    expect(highestTradingVolume([[0], [1]])).toStrictEqual(badVolume);
  });

  test('highestTradingVolume returns the correct highest trading volume', () => {
    const highestVolume = highestTradingVolume(total_volumes);

    expect(highestVolume).toStrictEqual({ date: '11.02.2020', eur: 74607356578.95918 });
  });
});

export {};
