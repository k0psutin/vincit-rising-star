import { dateToString, calculateDayDifference } from '.';
import { Entries, DateRange } from '../types';

const parseHourlyPrices = (prices: Entries) => {
  if (!prices) {
    return null;
  }

  let previousDate = '';
  const parsedPriceList: Entries = [];

  for (let i = 0; i < prices.length; i += 1) {
    const currentDate = dateToString(prices[i][0]);

    if (currentDate !== previousDate) {
      parsedPriceList.push(prices[i]);
    }

    previousDate = currentDate;
  }

  parsedPriceList.push(prices[prices.length - 1]);

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
