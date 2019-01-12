import { SampleT } from '../../../../types';

import {
  ActionCreatorT,
  SelectorsT as AbstractSelectors,
  StoreT
} from "../types";

export interface SelectorsT extends AbstractSelectors {
  all: (s: StoreT) => SampleT;
}

export interface ReducersT {
  set: ActionCreatorT<SampleT | null>;
}

export interface ReducerT {
  (r: ReducersT, initial: SampleT | null): any;
}
