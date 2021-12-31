import { dateToString, calculateDayDifference } from '.';
import { Entries, DateRange } from '../types';

const parseHourlyPrices = (prices: Entries) => {
  if (!prices) {
    return null;
  }

  const parsedPriceList: Entries = [prices[0]];

  for (let i = 1; i < prices.length; i += 1) {
    const prevDate = dateToString(prices[i - 1][0]);
    const nextDate = dateToString(prices[i][0]);

    if (prevDate !== nextDate) {
      parsedPriceList.push(prices[i]);
    }
  }

  return parsedPriceList;
};

const parsePrices = (prices: Entries, dateRange: DateRange) => {
  /*
    Minutely data will be used for duration within 1 day,
    Hourly data will be used for duration between 1 day and 90 days,
    Daily data will be used for duration above 90 days.
  */
  if (!prices) {
    return null;
  }

  const dayDifference = calculateDayDifference(dateRange.from, dateRange.to);

  if (dayDifference < 1) {
    return [prices[prices.length - 1]];
  }
  if (dayDifference <= 90) {
    return parseHourlyPrices(prices);
  }
  return prices;
};

export default parsePrices;
