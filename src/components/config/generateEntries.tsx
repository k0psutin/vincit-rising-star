import { ResultObjects } from '../../types';
import { getHighestTradingVolumeEntry } from '../../utils/highestTradingVolume';
import { getLongestDownwardTrendEntry } from '../../utils/longestDownwardTrend';
import { getMaximizeProfitsEntry } from '../../utils/maximizeProfits';

const generateEntries = (): ResultObjects => {
  const longestEntry = getLongestDownwardTrendEntry();
  const highestTradingEntry = getHighestTradingVolumeEntry();
  const maximizeProfitEntry = getMaximizeProfitsEntry();

  const entries = [
    longestEntry,
    highestTradingEntry,
    maximizeProfitEntry,
  ];

  return entries;
};

export default generateEntries;
