export type Entry = Array<number>;
export type Entries = Array<Entry> | null;
export interface CoinGeckoObject {
  prices: Entries,
  total_volumes: Entries
}
export interface DateRange {
  from: string,
  to: string
}

export type LongestTrendingDays = {
  longestTrend: number
};

export type HighestTradingVolume = {
  date: string,
  eur: number,
};

export type MaximizeProfits = {
  buyDate: string,
  buyPrice: number,
  sellDate: string,
  sellPrice: number,
};

export type ResultObject = {
  title: string,
  textArray: string[]
};

export type ResultObjects = ResultObject[];
