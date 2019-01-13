import {
  IActionCreator,
  ISelectors as AbstractSelectors,
  IStore,
} from "../types";

export interface ISelectors extends AbstractSelectors {
  all: (s: IStore) => any;
}

export interface IReducers {
  set: IActionCreator<any>;
}

export type IReducer = (r: IReducers, initial: any) => any;
