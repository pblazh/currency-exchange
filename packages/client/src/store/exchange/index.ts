import { ModuleT } from "../types";
import createActions from "./actions";
import createReducer from "./reducer";
import createSelectors from "./selectors";
import createSaga from "./saga";

export default function create(mountPoint: string): ModuleT {
  const actions = createActions(mountPoint);
  const selectors = createSelectors(mountPoint);
  const reducer = createReducer(actions, null);
  const saga = createSaga(actions, selectors);

  return {
    mountPoint,
    actions,
    reducer,
    selectors,
    saga,
  };
}
