import { ISample } from "revolute-common";
import { makeAction } from "../utils";

export default function(mountPoint: string) {
  const actions = {
    set: makeAction<ISample | null>(`revolute.simple.${mountPoint}.set`),
  };

  return actions;
}
