import { all, call, put, takeLatest } from "redux-saga/effects";
import { account } from "../../api";

const fetchRSS = (actions: any) =>
  function*(action: { payload: string }) {
    const rss = yield call(account);

    if (rss) { yield put(actions.set(rss)); }
  };

export default (actions: any) =>
  function* saga() {
    yield all([takeLatest(actions.fetch.type, fetchRSS(actions))]);
  };
