import { IError, IMoney } from "revolute-common";

import {
  IActionCreator,
  ISelectors as AbstractSelectors,
  IStore,
} from "../types";

export interface ISelectors extends AbstractSelectors {
  all: (s: IStore) => IMoney[];
}

export interface IReducers {
  set: IActionCreator<IMoney[] | IError | null>;
}

export type IReducer = (r: IReducers, initial: any) => any;
