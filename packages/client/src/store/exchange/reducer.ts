import { SampleT } from '../../../../types';
import { makeReplaceReducer } from "../utils";
import { ReducersT } from "./types";
import { composeReducers } from "../utils";

export default function({ set }: ReducersT, initial: SampleT | null) {
  return composeReducers<SampleT | null>(
    makeReplaceReducer(set, initial),
  );
}
