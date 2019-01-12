import { SampleT } from '../../../../types';
import { makeAction } from "../utils";

export default function(mountPoint: string) {
  const actions = {
    fetch: makeAction<SampleT | null>(`rss.list.${mountPoint}.fetch`),
    set:  makeAction<SampleT | null>(`rss.list.${mountPoint}.set`),
  };

  return actions;
}
