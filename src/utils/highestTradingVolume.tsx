import { useContext } from 'react';
import { AppContext } from '../context';
import {
  Entries, Entry, HighestTradingVolume, ResultObject,
} from '../types';
import { dateToString } from '.';

const highestTradingVolume = (total_volumes: Entries): HighestTradingVolume => {
  /*
    Expected output: The date with the highest trading volume and the volume on that day in euros

    total_volumes comes in a form of an nested arrays i.e. [[unix timestamp, volume], ...]
  */
  if (!total_volumes || total_volumes.length === 0) {
    return { date: '', eur: 0 };
  }

  if (total_volumes[0].length === 1) {
    return { date: '', eur: 0 };
  }

  // Create a deep copy of total_volumes
  const volumesCopy: Entry[] = JSON.parse(JSON.stringify(total_volumes));

  // Sort by volume in ascending order
  const sortedVolumes = volumesCopy.sort((a, b) => b[1] - a[1]);

  const date = dateToString(sortedVolumes[0][0]);
  const eur = sortedVolumes[0][1];

  const tradingVolume = {
    date,
    eur,
  };

  return tradingVolume;
};

const getHighestTradingVolumeEntry = (): ResultObject => {
  const { volumeList } = useContext(AppContext);

  if (!volumeList) {
    return { title: '', textArray: [] };
  }

  const { date, eur } = highestTradingVolume(volumeList);
  const volumeEur = Math.floor(eur);

  const highestTradingEntry = {
    title: 'Highest Trading Volume',
    textArray: [`Date: ${date}`, `Volume: ${volumeEur} eur.`],
  };

  return highestTradingEntry;
};

export { highestTradingVolume, getHighestTradingVolumeEntry };
