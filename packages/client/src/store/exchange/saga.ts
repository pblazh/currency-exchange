import { exchange } from "@api";
import { delay } from "redux-saga";
import { all, call, put, takeLatest } from "redux-saga/effects";

const createFetchActionType = (mountPoint: string) =>
  `revolute.exchange.${mountPoint}.fetchOne`;

const createFetchAction = (mountPoint: string) => ({
  type: createFetchActionType(mountPoint),
});

const createFetchOne = (actions: any) =>
  function* fetchExchangeRates() {
    const rates = yield call(exchange);
    if (rates) { yield put(actions.set(rates)); }
  };

const createFetch = (actions: any) =>
  function* fetchExchangeRates(action: { payload?: number }) {
    if (action.payload) {
      while (true) {
        yield put(actions.fetchOne());
        yield delay(action.payload);
      }
    } else {
        yield put(actions.fetchOne());
    }
  };

export default (actions: any, selectors: any) =>
  function* saga() {
    yield all([
      takeLatest(actions.fetch.type, createFetch(actions)),
      takeLatest(actions.fetchOne.type, createFetchOne(actions)),
    ]);
  };
