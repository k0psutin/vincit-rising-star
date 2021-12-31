export const dateToString = (date: number) => {
  const dateString = new Date(date).toISOString().substring(0, 10);
  const [year, month, day] = dateString.split('-');
  const dayMonthYear = [day, month, year].join('.');

  return dayMonthYear;
};

export const convertToUnixTime = (date: string): number => new Date(`${date}`).getTime() / 1000;

const stringToTime = (time: string) => new Date(time).getTime();
// eslint-disable-next-line
export const calculateDayDifference = (toString: string, fromString: string) => {
  const millisecondsPerDay = 1000 * 3600 * 24;
  const to = stringToTime(toString);
  const from = stringToTime(fromString);

  const dayDifference = Math.ceil(Math.abs(to - from) / millisecondsPerDay);

  return dayDifference;
};
