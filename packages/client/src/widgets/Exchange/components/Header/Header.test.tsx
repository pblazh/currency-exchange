// Link.react.test.js
import { shallow } from "enzyme";
import React from "react";
import Header from "./Header";

describe("Header", () => {
  it("renders passed money", () => {
    const from = {amount: 666, currency: "USD"};
    const to = {amount: 777, currency: "USD"};
    const header = shallow(<Header from={from} to={to} onExchange={() => 1} />);

    expect(header.html()).toContain("666");
    expect(header.html()).toContain("777");
  });

  it("calls onExchange", () => {
    const money = {amount: 777, currency: "USD"};
    const onExchange = jest.fn();
    const header = shallow(<Header from={money} to={money} onExchange={onExchange} />);
    const button = header.find("button[data-test=\"button-exchange\"]");

    expect(button).toHaveLength(1);
  });
});
