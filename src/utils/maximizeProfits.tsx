import { useContext } from 'react';
import { AppContext } from '../context';
import {
  Entries, Entry, ResultObject, MaximizeProfits,
} from '../types';
import { longestDownwardTrend } from './longestDownwardTrend';
import { formatDateString } from '.';

const maximizeProfits = (prices: Entries): MaximizeProfits => {
  /*
    Expected output: A pair of days: The day to BUY and they day to SELL.
    In the case when one should neither BUY nor SELL, RETURN an indicative output of your choice.

    Restraints:
      If the price only decreases in the date range, one should not simply buy nor sell.

    prices comes in a form of an nested array i.e: [[unix timestamp, price], ...]
  */

  const badDayPair = {
    buyDate: '0',
    buyPrice: 0,
    sellDate: '0',
    sellPrice: 0,
  };

  if (!prices || prices.length === 0) {
    return badDayPair;
  }

  if (prices[0].length === 1) {
    return badDayPair;
  }

  const longestTrendData = longestDownwardTrend(prices);

  if (!longestTrendData) {
    return badDayPair;
  }

  if (longestTrendData.longestTrend === prices.length - 1) {
    return badDayPair;
  }

  // Create a deep copy of prices
  const pricesCopy: Entry[] = JSON.parse(JSON.stringify(prices));

  // Sort by price in ascending order
  const sortedPrices = pricesCopy.sort((a, b) => b[1] - a[1]);

  const buyDate = formatDateString(sortedPrices[sortedPrices.length - 1][0]);
  const buyPrice = Math.floor(sortedPrices[sortedPrices.length - 1][1]);
  const sellDate = formatDateString(sortedPrices[0][0]);
  const sellPrice = Math.floor(sortedPrices[0][1]);

  const profitDayPair = {
    buyDate,
    buyPrice,
    sellDate,
    sellPrice,
  };

  return profitDayPair;
};

const getMaximizeProfitsEntry = (): ResultObject => {
  const { priceList } = useContext(AppContext);

  if (!priceList) {
    return { title: '', textArray: [] };
  }

  const {
    buyDate, buyPrice, sellDate, sellPrice,
  } = maximizeProfits(priceList);

  const doNotBuyOrSell = buyDate === '0';

  const maximizeProfitEntry = {
    title: 'Best Days To Maximize Profits',
    textArray: doNotBuyOrSell ? ['There are no good days to buy nor sell.'] : ['Found two excellent days to maximize profit on the given date range!', `You should buy bitcoin at ${buyDate} for ${buyPrice} eur.`, `You should sell bitcoin at ${sellDate} for ${sellPrice} eur.`],
  };

  return maximizeProfitEntry;
};

export { maximizeProfits, getMaximizeProfitsEntry };
