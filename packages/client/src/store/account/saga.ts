import { account } from "@api";
import { all, call, put, takeLatest } from "redux-saga/effects";

const fetchRSS = (actions: any) =>
  function*(action: { payload: string }) {
    const data = yield call(account);

    if (data) { yield put(actions.set(data)); }
  };

export default (actions: any) =>
  function* saga() {
    yield all([takeLatest(actions.fetch.type, fetchRSS(actions))]);
  };
