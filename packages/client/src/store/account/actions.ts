import { ISample } from "revolute-common";
import { makeAction } from "../utils";

export default function(mountPoint: string) {
  const actions = {
    fetch: makeAction<void>(`revolute.account.${mountPoint}.fetch`),
    set: makeAction<ISample | null>(`revolute.account.${mountPoint}.set`),
  };

  return actions;
}
