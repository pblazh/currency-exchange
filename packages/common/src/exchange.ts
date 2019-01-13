import { IMoney, ISample } from "./types";

const where = (money: IMoney, rates: ISample) => {
  if (money.currency === "EUR") {
    return {
      currency: "EUR",
      rate: 1,
    };
  } else {
    return rates.currencies
      .filter((rate) => rate.currency === money.currency)
      .pop();
  }
};

export const exchange = (from: IMoney, to: IMoney, rates: ISample) => {
  if (from.amount === 0) {
    return {
      ...to,
      amount: 0,
    };
  }
  const rateFrom = where(from, rates);
  const rateTo = where(to, rates);

  if (!rateFrom || !rateTo) { return new Error("Exchange rate does not exists"); }

  const rate: number = rateFrom.rate / rateTo.rate;
  return {
    ...to,
    amount: from.amount / rate,
  };
};
