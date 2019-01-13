import exchangeModule from "./exchange";
import pairModule from "./pair";
import accountModule from "./account";

export const pair = pairModule("pair");
export const exchange = exchangeModule("exchange");
export const history = exchangeModule("history");
export const accounts = accountModule("accounts");
