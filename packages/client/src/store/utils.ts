import { IAction, IActionCreator, IReducer } from "./types";

export function makeReplaceReducer<T>(
  actionCreator: IActionCreator<T>,
  initialState: T,
) {
  return (state: T = initialState, action: IAction<T>) =>
    actionCreator.type === action.type ? action.payload : state;
}

export function makeAction<T>(type: string) {
  const action: IActionCreator<T> = (payload) => ({ type, payload });
  action.type = type;
  return action;
}

export function composeReducers<T>(...reducers: Array<IReducer<any>>) {
  return (store: T, action: IAction<any>) =>
    reducers.reduce(
      (processedStore, reducer) => reducer(processedStore, action),
      store,
    );
}
