import { SampleT } from "../../../../types";
import { makeAction } from "../utils";

export default function(mountPoint: string) {
  const actions = {
    set: makeAction<SampleT | null>(`revolute.simple.${mountPoint}.set`)
  };

  return actions;
}
