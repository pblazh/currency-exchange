import { ISample } from "revolute-common";
import { makeReplaceReducer } from "../utils";
import { composeReducers } from "../utils";
import { IReducers } from "./types";

export default function({ set }: IReducers, initial: ISample | null) {
  return composeReducers<ISample | null>(makeReplaceReducer(set, initial));
}
