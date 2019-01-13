import { SelectorsT } from "./types";

export default function(key: string): SelectorsT {
  return {
    all: store => store[key]
  };
}
