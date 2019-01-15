import { IError } from "revolute-common";
import config from "./config";

const fetchJSON = (url: string) => () =>
  fetch(url)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(`Network error at ${url}`);
    })
    .catch((err) => {
      return {
        error: true,
        message: err.message,
      } as IError;
    });

export const account = fetchJSON(config.account);
export const exchange = fetchJSON(config.exchange);
export const history = fetchJSON(config.history);
export const store = fetchJSON(config.store);
