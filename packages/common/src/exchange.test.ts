import { exchange } from "./exchange";
import { IMoney, ISample } from "./types";

describe("exchange", () => {
  it("return error if rate does not exist", () => {
    const from: IMoney = { currency: "XXX", amount: 2 };
    const to: IMoney = { currency: "YYY", amount: 3 };
    const rates: ISample = { updated: Date.now(), currencies: [] };
    const result: IMoney | Error = exchange(from, to, rates);

    expect(result).toBeInstanceOf(Error);
  });

  it("converts 0 to 0 even if rate does not exists", () => {
    const from: IMoney = { currency: "XXX", amount: 0 };
    const to: IMoney = { currency: "YYY", amount: 10 };
    const expected: IMoney = { ...to, amount: 0 };
    const rates: ISample = { updated: Date.now(), currencies: [] };
    const result = exchange(from, to, rates);

    expect(result).toEqual(expected);
  });

  it("does not change a value if rate is 1", () => {
    const from: IMoney = { currency: "XXX", amount: 666 };
    const to: IMoney = { currency: "YYY", amount: 0 };
    const rates: ISample = {
      currencies: [{ currency: "XXX", rate: 1 }, { currency: "YYY", rate: 1 }],
      updated: Date.now(),
    };

    const expected: IMoney = { ...to, amount: 666 };
    const result = exchange(from, to, rates);

    expect(result).toEqual(expected);
  });

  it("converts value using an exchange rate from EUR", () => {
    const from: IMoney = { currency: "EUR", amount: 2 };
    const to: IMoney = { currency: "YYY", amount: 30 };
    const rates: ISample = {
      currencies: [{ currency: "YYY", rate: 3 }],
      updated: Date.now(),
    };

    const expected: IMoney = { ...to, amount: 6 };
    const result = exchange(from, to, rates);

    expect(result).toEqual(expected);
  });

  it("converts value using an exchange rate to EUR", () => {
    const from: IMoney = { currency: "YYY", amount: 3 };
    const to: IMoney = { currency: "EUR", amount: 30 };
    const rates: ISample = {
      currencies: [{ currency: "YYY", rate: 2 }],
      updated: Date.now(),
    };

    const expected: IMoney = { ...to, amount: 1.5 };
    const result = exchange(from, to, rates);

    expect(result).toEqual(expected);
  });

  it("converts value using an exchange rate", () => {
    const from: IMoney = { currency: "XXX", amount: 2 };
    const to: IMoney = { currency: "YYY", amount: 30 };
    const rates: ISample = {
      currencies: [{ currency: "XXX", rate: 4 }, { currency: "YYY", rate: 30 }],
      updated: Date.now(),
    };

    const expected: IMoney = { ...to, amount: 15 };
    const result = exchange(from, to, rates);

    expect(result).toEqual(expected);
  });

  it("converts value in the same currency without a change", () => {
    const from: IMoney = { currency: "XXX", amount: 2 };
    const to: IMoney = { currency: "XXX", amount: 30 };
    const rates: ISample = {
      currencies: [{ currency: "XXX", rate: 4 }],
      updated: Date.now(),
    };

    const expected: IMoney = { ...to, amount: 2 };
    const result = exchange(from, to, rates);

    expect(result).toEqual(expected);
  });

  it("converts value back and forth without a change", () => {
    const from: IMoney = { currency: "XXX", amount: 2 };
    const to: IMoney = { currency: "YYY", amount: 30 };
    const rates: ISample = {
      currencies: [{ currency: "XXX", rate: 4 }, { currency: "YYY", rate: 30 }],
      updated: Date.now(),
    };

    const result = exchange(exchange(from, to, rates) as IMoney, from, rates);

    expect(result).toEqual(from);
  });
});
