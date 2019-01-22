import { IAppStore } from "revolute-common";
import accounts from "./fixtures/fakeAccounts";

const store: IAppStore = {
  accounts,
  exchange: null,
  history: [],
};

export default store;
