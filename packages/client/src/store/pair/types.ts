export type PairT = [string, string];

import {
  ActionCreatorT,
  SelectorsT as AbstractSelectors,
  StoreT
} from "../types";

export interface SelectorsT extends AbstractSelectors {
  all: (s: StoreT) => PairT;
}

export interface ActionsT {
  set: ActionCreatorT<PairT>;
  swap: ActionCreatorT<any>;
}

export interface ReducerT {
  (r: ActionsT, initial: PairT): any;
}
