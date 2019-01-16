import {shallow} from "enzyme";
import React from "react";
import Message from "./Message";

describe("Message", () => {
  it("renders passed child", () => {
    const loading = shallow(<Message>passed child</Message>);

    expect(loading.text()).toEqual("passed child");
  });
});
