import { AppStoreT } from './types';
import { CurrencyT, SampleT } from "../../../types";

//https://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml?ba50b885e07979c75ae8cbe7b527c6ba

const store: AppStoreT = {
  current: null,
  history: [],
};

export default store;
