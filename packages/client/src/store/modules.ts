import accountModule from "./account";
import exchangeModule from "./exchange";

export const exchange = exchangeModule("exchange");
export const history = exchangeModule("history");
export const accounts = accountModule("accounts");
