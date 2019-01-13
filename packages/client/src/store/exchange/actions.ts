import { SampleT } from "../../../../types";
import { makeAction } from "../utils";

export default function(mountPoint: string) {
  const actions = {
    fetch: makeAction<void>(`revolute.exchange.${mountPoint}.fetch`),
    set: makeAction<SampleT | null>(`revolute.exchange.${mountPoint}.set`)
  };

  return actions;
}
