import { IModule } from "../types";
import createActions from "./actions";
import createReducer from "./reducer";
import createSaga from "./saga";
import createSelectors from "./selectors";

export default function create(mountPoint: string): IModule {
  const actions = createActions(mountPoint);
  const selectors = createSelectors(mountPoint);
  const reducer = createReducer(actions, null);
  const saga = createSaga(actions);

  return {
    actions,
    mountPoint,
    reducer,
    saga,
    selectors,
  };
}
