import {
  ActionCreatorT,
  SelectorsT as AbstractSelectors,
  StoreT
} from "../types";

export interface SelectorsT extends AbstractSelectors {
  all: (s: StoreT) => any;
}

export interface ReducersT {
  set: ActionCreatorT<any>;
}

export interface ReducerT {
  (r: ReducersT, initial: any): any;
}
