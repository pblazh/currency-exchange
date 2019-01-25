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

const transferMoney = (url: string) => (from: string, to: string, amount: number) =>
  fetch(url, {
      body: JSON.stringify({from, to, amount}),
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
          "Content-Type": "application/json",
      },
      method: "POST",
      mode: "cors",
    })
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
export const transfer = transferMoney(config.transfer);
