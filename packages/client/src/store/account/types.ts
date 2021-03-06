import { IError, IMoney } from "revolute-common";

import {
  IActionCreator,
  IActions as GenericActions,
  ISelectors as GenericSelectors,
  IStore,
} from "../types";

export type StoredT = IMoney[] | IError | null;

export interface ISelectors extends GenericSelectors {
  all: (s: IStore) => StoredT;
}

export interface IReducers {
  set: IActionCreator<StoredT>;
}

export type IReducer = (r: IReducers, initial: StoredT) => StoredT;

export interface IActions extends GenericActions {
  fetch: IActionCreator<void>;
  set: IActionCreator<StoredT>;
  transfer: IActionCreator<[IMoney, string]>;
}
