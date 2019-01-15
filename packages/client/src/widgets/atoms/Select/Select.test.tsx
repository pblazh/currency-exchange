import {shallow} from "enzyme";
import React from "react";
import Select from "./Select";

describe("Select", () => {
  it("renders passed child", () => {
    const select = shallow(<Select>passed child</Select>);

    expect(select.html()).toContain("passed child");
  });
});
