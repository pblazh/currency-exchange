import { makeReplaceReducer } from "../utils";
import { IActions, StoredT } from "./types";

export default ({ set }: IActions, initial: StoredT) =>
  makeReplaceReducer(set, initial);
