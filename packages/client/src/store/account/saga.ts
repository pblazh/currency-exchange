import { account } from "@api";
import { call, put, takeLatest } from "redux-saga/effects";

const fetchData = (actions: any) =>
  function*(action: { payload: string }) {
    const data = yield call(account);

    if (data) { yield put(actions.set(data)); }
  };

export default (actions: any) =>
  function* saga() {
    yield takeLatest(actions.fetch.type, fetchData(actions));
  };
