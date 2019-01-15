import { IError, ISample } from "revolute-common";

import {
  IActionCreator,
  ISelectors as AbstractSelectors,
  IStore,
} from "../types";

export interface ISelectors extends AbstractSelectors {
  all: (s: IStore) => ISample;
}

export interface IReducers {
  set: IActionCreator<ISample | IError | null>;
}

export type IReducer = (r: IReducers, initial: ISample | null) => any;
