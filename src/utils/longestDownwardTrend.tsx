import { useContext } from 'react';
import { AppContext } from '../context';
import {
  Entries, LongestTrendingDays, ResultObject,
} from '../types';

const longestDownwardTrend = (prices: Entries): LongestTrendingDays | null => {
  /*
    Price of day N is lower than price of day N-1
    Expected output: The maximum amount of days bitcoin's price was decreasing in a row

    prices comes in a form of an nested arrays i.e: [[unix timestamp, price], ...]
  */

  if (!prices || prices.length === 0) {
    return null;
  }

  if (prices[0].length === 1) {
    return null;
  }

  let currentTrend = 0;
  let longestTrend = 0;

  for (let i = 1; i < prices.length; i += 1) {
    const currentPrice = prices[i][1];
    const previousPrice = prices[i - 1][1];

    if (previousPrice > currentPrice) {
      currentTrend += 1;
    } else {
      currentTrend = 0;
    }

    longestTrend = Math.max(currentTrend, longestTrend);
  }

  const longestTrendingDays = {
    longestTrend,
  };

  return longestTrendingDays;
};

const getLongestDownwardTrendEntry = (): ResultObject => {
  const { priceList } = useContext(AppContext);

  if (!priceList) {
    return { title: '', textArray: [] };
  }

  const longestDownwardTrenResult = longestDownwardTrend(priceList);

  const longestEntry = {
    title: 'Longest Downward Trend',
    textArray: [`Longest downward trend with the current date range is: ${longestDownwardTrenResult?.longestTrend}`],
  };

  return longestEntry;
};

export { longestDownwardTrend, getLongestDownwardTrendEntry };
