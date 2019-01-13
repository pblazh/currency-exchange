import { makeReplaceReducer } from "../utils";
import { ActionsT, PairT } from "./types";
import { ActionT, ActionCreatorT } from "../types";
import { composeReducers } from "../utils";

const swapPair = (actionCreator: ActionCreatorT<any>) => (
  store: PairT | undefined,
  action: ActionT<any>
) =>
  action.type === actionCreator.type && store
    ? ([...store].reverse() as PairT)
    : store || null;

export default function({ set, swap }: ActionsT, initial: PairT) {
  return composeReducers<PairT>(
    makeReplaceReducer(set, initial),
    swapPair(swap)
  );
}
