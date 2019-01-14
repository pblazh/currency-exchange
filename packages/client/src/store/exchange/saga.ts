import { all, call, put, takeLatest } from "redux-saga/effects";
import { exchange } from "../../api/api";

const fetchRSS = (actions: any, selectors: any) =>
  function*(action: { payload: string }) {
    const rss = yield call(exchange);

    if (rss) { yield put(actions.set(rss)); }
  };

export default (actions: any, selectors: any) =>
  function* saga() {
    yield all([takeLatest(actions.fetch.type, fetchRSS(actions, selectors))]);
  };
