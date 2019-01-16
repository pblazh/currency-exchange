import {shallow} from "enzyme";
import React from "react";
import ErrorScreen from "./ErrorScreen";

describe("ErrorScreen", () => {
  it("renders error message", () => {
    const loading = shallow(
      <ErrorScreen
        componentStack="error stack"
        error={new Error("error message")}
      />,
    );

    expect(loading.html()).toContain("error message");
  });

  it("does not render error stack", () => {
    const loading = shallow(
      <ErrorScreen
        componentStack="error stack"
        error={new Error("error message")}
      />,
    );

    expect(loading.html()).not.toContain("error stack");
  });
});
