import { exchange } from "@api";
import { delay } from "redux-saga";
import { all, call, put, takeLatest } from "redux-saga/effects";

const createFetch = (actions: any, selectors: any) =>
  function* fetchExchangeRates(action: { payload?: number }) {
    const rss = yield call(exchange);

    if (rss) { yield put(actions.set(rss)); }
    if (action.payload) {
      yield delay(action.payload);
      console.log("-->timeout", action.payload);
    }

  };

export default (actions: any, selectors: any) =>
  function* saga() {
    yield all([takeLatest(actions.fetch.type, createFetch(actions, selectors))]);
  };
