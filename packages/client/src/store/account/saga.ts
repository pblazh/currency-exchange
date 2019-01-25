import { account, transfer } from "@api";
import { IAction } from "@store/types";
import { all, call, put, takeLatest } from "redux-saga/effects";
import { IMoney } from "revolute-common";
import { IActions } from "./types";

const fetchData = (actions: IActions) =>
  function*() {
    const data = yield call(account);

    if (data) { yield put(actions.set(data)); }
  };

const transferMoney = (actions: IActions) =>
  function*(action: IAction<[IMoney, string]>) {
    const [from, to] = action.payload as [IMoney, string];
    const data = yield call(transfer, from.currency, to, from.amount);

    if (data) { yield put(actions.set(data)); }
  };

export default (actions: IActions) =>
  function* saga() {
    yield all([
      takeLatest(actions.fetch.type, fetchData(actions)),
      takeLatest(actions.transfer.type, transferMoney(actions)),
    ]);
  };
