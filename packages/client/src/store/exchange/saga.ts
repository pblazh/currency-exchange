import { all, call, put, takeLatest } from "redux-saga/effects";
import { current } from "../../api";

const fetchRSS = (actions: any, selectors: any) =>
  function*(action: { payload: string }) {
    const rss = yield call(current);

    if (rss) { yield put(actions.set(rss)); }
  };

export default (actions: any, selectors: any) =>
  function* saga() {
    yield all([takeLatest(actions.fetch.type, fetchRSS(actions, selectors))]);
  };
