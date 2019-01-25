import { IError, IMoney } from "revolute-common";
import { makeAction } from "../utils";
import { IActions } from "./types";

export default (mountPoint: string): IActions => ({
    fetch: makeAction<void>(`revolute.account.${mountPoint}.fetch`),
    set: makeAction<IMoney[] | IError | null>(`revolute.account.${mountPoint}.set`),
    transfer: makeAction<[IMoney, string]>(`revolute.account.${mountPoint}.transfer`),
});
