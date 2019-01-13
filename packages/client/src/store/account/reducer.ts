import { makeReplaceReducer } from "../utils";
import { ReducersT } from "./types";

export default function({ set }: ReducersT, initial: any) {
  return makeReplaceReducer(set, initial);
}
