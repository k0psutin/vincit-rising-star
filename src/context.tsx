import React, { useState, createContext, useMemo } from 'react';

import { DateRange, Entries } from './types';

interface AppContextInterface {
  priceList: Entries,
  setPriceList: React.Dispatch<React.SetStateAction<Entries>>,
  volumeList: Entries,
  setVolumeList: React.Dispatch<React.SetStateAction<Entries>>,
  dateRange: DateRange,
  setDateRange: React.Dispatch<React.SetStateAction<DateRange>>
}

const initialAppContext: AppContextInterface = {
  priceList: null,
  setPriceList: (): void => {
    throw new Error('setPriceList method must be overridden.');
  },
  volumeList: null,
  setVolumeList: (): void => {
    throw new Error('setVolumeList method must be overridden.');
  },
  dateRange: {
    from: '',
    to: '',
  },
  setDateRange: (): void => {
    throw new Error('setDateRange method must be overridden.');
  },
};

export const AppContext = createContext<AppContextInterface>(initialAppContext);

interface AppDataProviderProps {
  children: React.ReactNode
}

const AppDataProvider = ({ children }: AppDataProviderProps): React.ReactElement => {
  const [priceList, setPriceList] = useState<Entries>(null);
  const [volumeList, setVolumeList] = useState<Entries>(null);
  const currentDate = {
    from: new Date().toISOString().substring(0, 10),
    to: new Date().toISOString().substring(0, 10),
  };

  const [dateRange, setDateRange] = useState(currentDate);

  const value = useMemo(() => ({
    priceList, setPriceList, volumeList, setVolumeList, dateRange, setDateRange,
  }), [priceList, volumeList, dateRange]);

  return (
    <AppContext.Provider value={value}>
      { children }
    </AppContext.Provider>
  );
};

export default AppDataProvider;
