import { highestTradingVolume } from '../utils/highestTradingVolume';
import { total_volumes } from './testData';

describe('Highest trading volume tests', () => {
  test('highestTradingVolume returns 0 if total volumes is null', () => {
    expect(highestTradingVolume(null)).toBe(null);
  });

  test('highestTradingVolume returns 0 if total volumes is empty', () => {
    expect(highestTradingVolume([])).toBe(null);
  });

  test('highestTradingVolume returns 0 if total volumes is wrong size', () => {
    expect(highestTradingVolume([[0], [1]])).toBe(null);
  });

  test('highestTradingVolume returns the correct highest trading volume', () => {
    const highestVolume = highestTradingVolume(total_volumes);

    expect(highestVolume).toEqual({ date: '11.02.2020', eur: 74607356578.95918 });
  });
});

export {};
