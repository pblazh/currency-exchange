import { ISample } from "revolute-common";
import { makeAction } from "../utils";

export default function(mountPoint: string) {
  const actions = {
    fetch: makeAction<number | undefined>(`revolute.exchange.${mountPoint}.fetch`),
    fetchOne: makeAction(`revolute.exchange.${mountPoint}.fetchOne`),
    set: makeAction<ISample | null>(`revolute.exchange.${mountPoint}.set`),
  };

  return actions;
}
