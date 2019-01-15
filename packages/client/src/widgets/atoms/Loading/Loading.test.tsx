import {shallow} from "enzyme";
import React from "react";
import Loading from "./Loading";

describe("Loading", () => {
  it("renders passed child", () => {
    const loading = shallow(<Loading>passed child</Loading>);

    expect(loading.text()).toEqual("passed child");
  });
});
