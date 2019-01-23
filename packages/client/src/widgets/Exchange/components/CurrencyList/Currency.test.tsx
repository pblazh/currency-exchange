/* tslint:disable no-empty */
import { mount, shallow } from "enzyme";
import React, { SFC } from "react";
import Currency from "./Currency";

const props = {
  account: {
    amount: 66600,
    currency: "XXX",
  },
  value: 777,
};

describe("Currency", () => {
  it("renders", () => {
    const currency = shallow(<Currency {...props} />);
    expect(currency.find(".Currency")).toHaveLength(1);
  });

  it("has input with a negative value", () => {
    const currency = shallow(<Currency {...props} />);
    expect(currency.find("input").prop("value")).toEqual("-777");
  });

  it("displays the provided account information", () => {
    const currency = shallow(<Currency {...props} />);
    expect(currency.html()).toContain("XXX");
    expect(currency.html()).toContain("666");
  });

  it("displays positive value if incoming", () => {
    const inProps = {
      account: {
        amount: 66600,
        currency: "XXX",
        rate: {
          amount: 88800,
          currency: "YYY",
        },
      },
      value: 777,
    };
    const currency = shallow(<Currency {...inProps} />);
    expect(currency.find("input").prop("value")).toEqual("+777.00");
  });

  it("displays positive value if incoming", () => {
    const inProps = {
      account: {
        amount: 66600,
        currency: "XXX",
        rate: {
          amount: 88800,
          currency: "YYY",
        },
      },
      value: 777,
    };
    const currency = shallow(<Currency {...inProps} />);
    expect(currency.html()).toContain("YYY888");
  });
});
