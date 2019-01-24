import * as Dinero from "dinero.js";
import { ICurrency, IMoney, ISample } from "./types";

const where = (currency: string, rates: ISample): ICurrency | undefined => {
  if (currency === "EUR") {
    return { currency: "EUR", rate: "1"};
  } else {
    return rates.currencies
      .filter(rate => rate.currency === currency)
      .pop();
  }
};

export const getRate = (from: string, to: string, rates: ISample) => {
  if (from === to ) {
     return 1;
  }

  const rateFrom = where(from, rates);
  const rateTo = where(to, rates);
  if (!rateFrom || !rateTo) { return new Error("Exchange rate does not exists"); }
  const commonRate: number = parseFloat(rateFrom.rate) / parseFloat(rateTo.rate);
  return commonRate;
};

export const exchange = (from: IMoney, currency: string, rates: ISample) => {
  if (from.amount === 0) {
    return {
      amount: 0,
      currency,
    };
  }

  const rate = getRate(from.currency, currency, rates);

  if (typeof rate === "number") {
    return {
      amount: Dinero({currency, amount: from.amount}).divide(rate).getAmount(),
      currency,
    };
  } else {
    return rate;
  }
};
