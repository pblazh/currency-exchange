import { IModule } from "../types";
import createActions from "./actions";
import createReducer from "./reducer";
import createSelectors from "./selectors";

export default function create(mountPoint: string): IModule {
  const actions = createActions(mountPoint);
  const selectors = createSelectors(mountPoint);
  const reducer = createReducer(actions, null);

  return {
    actions,
    mountPoint,
    reducer,
    selectors,
  };
}
