import {mount, shallow} from "enzyme";
import React from "react";
import Pager from "./Pager";

describe("Pager", () => {
  it("renders dots", () => {
    const pager = shallow(<Pager pages={5} active={0} />);
    const pages = pager.find(".Pager__page");

    expect(pages).toHaveLength(5);
  });

  it("selects one dot", () => {
    const pager = shallow(<Pager pages={5} active={3} />);
    const allPages = pager.find(".Pager__page");
    const exactPage = allPages.at(3).find(".Pager__page--active");

    expect(allPages).toHaveLength(5);
    expect(exactPage.length).toEqual(1);
  });

  it("calls onClick", () => {
    const onChange = jest.fn();
    const pager = mount(<Pager pages={5} active={3} onChange={onChange}/>);
    const page = pager.find(".Pager__page").at(2);
    page.simulate("click");

    expect(onChange.mock.calls).toHaveLength(1);
    expect(onChange.mock.calls[0]).toEqual([2]);
  });

  it("round down active", () => {
    const pager = mount(<Pager pages={3} active={5} />);
    const allPages = pager.find(".Pager__page");
    const exactPage = allPages.at(2).find(".Pager__page--active");

    expect(exactPage).toHaveLength(1);
  });

  it("round up active", () => {
    const pager = mount(<Pager pages={3} active={-5} />);
    const allPages = pager.find(".Pager__page");
    const exactPage = allPages.at(0).find(".Pager__page--active");

    expect(exactPage).toHaveLength(1);
  });
});
