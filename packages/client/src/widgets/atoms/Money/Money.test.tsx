import {shallow} from "enzyme";
import React from "react";
import Money from "./Money";

describe("Money", () => {
  it("renders dollars", () => {
    const money = shallow(<Money money={{amount: 100, currency: "USD"}} />);
    expect(money.text()).toEqual("$1");
  });

  it("renders euros", () => {
    const money = shallow(<Money money={{amount: 100, currency: "EUR"}} />);
    expect(money.text()).toEqual("€1");
  });

  it("formats big sums", () => {
    const money = shallow(<Money money={{amount: 10000000, currency: "GBP"}} />);
    expect(money.text()).toEqual("£100,000");
  });

  it("leave unknown currency as is", () => {
    const money = shallow(<Money money={{amount: 100, currency: "XYZ"}} />);
    expect(money.text()).toEqual("XYZ1");
  });

  it("does not render fractions by default", () => {
    const money = shallow(<Money money={{amount: 123, currency: "USD"}} />);
    expect(money.text()).toEqual("$1");
  });

  it("renders fractions is asked", () => {
    const money = shallow(<Money fractions money={{amount: 123, currency: "USD"}} />);
    expect(money.text()).toEqual("$1.23");
  });
});
