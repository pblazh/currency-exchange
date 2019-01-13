import { makeReplaceReducer } from "../utils";
import { IReducers } from "./types";

export default function({ set }: IReducers, initial: any) {
  return makeReplaceReducer(set, initial);
}
