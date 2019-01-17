import { account } from "@api";
import { call, put, takeLatest } from "redux-saga/effects";
import { IActions } from "./types";

const fetchData = (actions: IActions) =>
  function*() {
    const data = yield call(account);

    if (data) { yield put(actions.set(data)); }
  };

export default (actions: IActions) =>
  function* saga() {
    yield takeLatest(actions.fetch.type, fetchData(actions));
  };
