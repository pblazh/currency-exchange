import { exchange } from "./exchange";
import { IMoney, ISample } from "./types";

describe("exchange", () => {
  it("return error if rate does not exist", () => {
    const from: IMoney = { currency: "XXX", amount: 200 };
    const currency = "YYY";
    const rates: ISample = { updated: Date.now(), currencies: [] };
    const result: IMoney | Error = exchange(from, currency, rates);

    expect(result).toBeInstanceOf(Error);
  });

  it("converts 0 to 0 even if rate does not exists", () => {
    const from: IMoney = { currency: "XXX", amount: 0 };
    const currency = "YYY";
    const expected: IMoney = { currency, amount: 0 };
    const rates: ISample = { updated: Date.now(), currencies: [] };
    const result = exchange(from, currency, rates);

    expect(result).toEqual(expected);
  });

  it("does not change a value if rate is 1", () => {
    const from: IMoney = { currency: "XXX", amount: 200 };
    const currency = "YYY";
    const rates: ISample = {
      currencies: [{ currency: "XXX", rate: "1" }, { currency: "YYY", rate: "1" }],
      updated: Date.now(),
    };

    const expected: IMoney = { currency, amount: from.amount };
    const result = exchange(from, currency, rates);

    expect(result).toEqual(expected);
  });

  it("converts value using an exchange rate from EUR", () => {
    const from: IMoney = { currency: "EUR", amount: 200 };
    const currency = "YYY";
    const rates: ISample = {
      currencies: [{ currency: "YYY", rate: "3" }],
      updated: Date.now(),
    };

    const expected: IMoney = { currency, amount: 600 };
    const result = exchange(from, currency, rates);

    expect(result).toEqual(expected);
  });

  it("converts value using an exchange rate to EUR", () => {
    const from: IMoney = { currency: "YYY", amount: 300 };
    const currency = "EUR";
    const rates: ISample = {
      currencies: [{ currency: "YYY", rate: "2" }],
      updated: Date.now(),
    };

    const expected: IMoney = { currency, amount: 150 };
    const result = exchange(from, currency, rates);

    expect(result).toEqual(expected);
  });

  it("converts value using an exchange rate", () => {
    const from: IMoney = { currency: "XXX", amount: 200 };
    const currency = "YYY";
    const rates: ISample = {
      currencies: [{ currency: "XXX", rate: "4" }, { currency: "YYY", rate: "30" }],
      updated: Date.now(),
    };

    const expected: IMoney = { currency, amount: 1500 };
    const result = exchange(from, currency, rates);

    expect(result).toEqual(expected);
  });

  it("converts value in the same currency without a change", () => {
    const from: IMoney = { currency: "XXX", amount: 200 };
    const currency = "XXX";
    const rates: ISample = {
      currencies: [{ currency: "XXX", rate: "4" }],
      updated: Date.now(),
    };

    const expected: IMoney = { currency, amount: 200 };
    const result = exchange(from, currency, rates);

    expect(result).toEqual(expected);
  });

  it("converts value back and forth without a change", () => {
    const from: IMoney = { currency: "XXX", amount: 200 };
    const currency = "YYY";
    const rates: ISample = {
      currencies: [{ currency: "XXX", rate: "4.4" }, { currency: "YYY", rate: "30" }],
      updated: Date.now(),
    };

    const result = exchange(exchange(from, currency, rates) as IMoney, from.currency, rates);

    expect(result).toEqual(from);
  });
});
