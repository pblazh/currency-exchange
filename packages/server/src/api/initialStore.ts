import { IAppStore } from "revolute-common";
import accounts from "./fixtures/fakeAccounts";

// https://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml?ba50b885e07979c75ae8cbe7b527c6ba

const store: IAppStore = {
  accounts,
  exchange: null,
  history: [],
};

export default store;
