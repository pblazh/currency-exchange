import { ISelectors } from "./types";

export default (key: string): ISelectors => ({
  all: store => store[key],
});
