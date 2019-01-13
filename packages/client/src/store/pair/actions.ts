import { PairT } from "./types";
import { makeAction } from "../utils";

export default function(mountPoint: string) {
  const actions = {
    swap: makeAction<PairT>(`revolute.pair.${mountPoint}.swap`),
    set: makeAction<PairT>(`revolute.pair.${mountPoint}.set`)
  };

  return actions;
}
