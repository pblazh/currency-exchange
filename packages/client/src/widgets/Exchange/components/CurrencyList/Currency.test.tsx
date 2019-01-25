/* tslint:disable no-empty */
import { mount, shallow } from "enzyme";
import React from "react";
import Currency from "./Currency";

const props = {
  account: {
    amount: 600,
    currency: "XXX",
  },
  value: 700,
};

describe("Currency", () => {
  it("renders", () => {
    const currency = shallow(<Currency {...props} />);
    expect(currency.find(".Currency")).toHaveLength(1);
  });

  it("displays the provided account information", () => {
    const currency = shallow(<Currency {...props} />);
    expect(currency.html()).toContain("XXX");
    expect(currency.html()).toContain("6");
  });

  it("displays positive value if incoming", () => {
    const inProps = {
      account: {
        amount: 600,
        currency: "XXX",
        rate: {
          amount: 800,
          currency: "YYY",
        },
      },
      value: 700,
    };
    const currency = mount(<Currency {...inProps} />);
    expect(currency.find("input").prop("value")).toEqual("+7.00");
  });

  it("displays positive value if incoming", () => {
    const inProps = {
      account: {
        amount: 600,
        currency: "XXX",
        rate: {
          amount: 800,
          currency: "YYY",
        },
      },
      value: 700,
    };
    const currency = shallow(<Currency {...inProps} />);
    expect(currency.html()).toContain("YYY8");
  });
});
