import { ISelectors } from "./types";

export default function(key: string): ISelectors {
  return {
    all: (store) => store[key],
  };
}
