import { IError, ISample } from "revolute-common";
import { makeAction } from "../utils";

export default function(mountPoint: string) {
  const actions = {
    fetch: makeAction<number | undefined>(`revolute.exchange.${mountPoint}.fetch`),
    set: makeAction<ISample | IError | null>(`revolute.exchange.${mountPoint}.set`),
    stop: makeAction<void>(`revolute.exchange.${mountPoint}.stop`),
  };

  return actions;
}
