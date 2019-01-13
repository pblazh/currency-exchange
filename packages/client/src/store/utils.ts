import { ActionT, ActionCreatorT, StoreT, ReducerT } from "./types";

export function makeReplaceReducer<T>(
  actionCreator: ActionCreatorT<T>,
  initialState: T
) {
  return (state: T = initialState, action: ActionT<T>) =>
    actionCreator.type === action.type ? action.payload : state;
}

export function makeAction<T>(type: string) {
  const action: ActionCreatorT<T> = payload => ({ type, payload });
  action.type = type;
  return action;
}

export function composeReducers<T>(...reducers: ReducerT<any>[]) {
  return (store: T, action: ActionT<any>) =>
    reducers.reduce(
      (processedStore, reducer) => reducer(processedStore, action),
      store
    );
}
