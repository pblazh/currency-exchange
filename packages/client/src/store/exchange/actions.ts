import { makeAction } from "../utils";
import { IActions, StoredT } from "./types";

export default (mountPoint: string): IActions => ({
    fetch: makeAction<void>(`revolute.exchange.${mountPoint}.fetch`),
    set: makeAction<StoredT>(`revolute.exchange.${mountPoint}.set`),
    stop: makeAction<void>(`revolute.exchange.${mountPoint}.stop`),
});
