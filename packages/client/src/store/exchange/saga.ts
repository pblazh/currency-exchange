import { exchange } from "@api";
import { delay } from "redux-saga";
import { call, cancel, fork, put, take } from "redux-saga/effects";

export default  (actions: any) => {
  function* backgroundFetch() {
      while (true) {
        const rates = yield call(exchange);
        yield put(actions.set(rates));
        yield delay(5000);
      }
  }

  return function* main() {
    while ( yield take(actions.fetch.type) ) {
        const backgroundTask = yield fork(backgroundFetch);

        yield take(actions.stop.type);
        yield cancel(backgroundTask);
      }
    };
};
