import {mount, shallow} from "enzyme";
import React, { SFC } from "react";
import { ErrorBoundary } from "./withErrorBoundary";

describe("ErrorBoundary", () => {
  it("renders passed child", () => {
    const errorBoundary = shallow(<ErrorBoundary>passed child</ErrorBoundary>);

    expect(errorBoundary.text()).toEqual("passed child");
  });

  it("renders fallback component", () => {
    interface IProps {
      componentStack: string;
      error: Error;
    }
    const fallback: SFC<IProps> = ({ error, componentStack }) => (<div>fallback component</div>);

    const errorBoundary = mount(<ErrorBoundary FallbackComponent={fallback}>passed child</ErrorBoundary>);
    errorBoundary.setState({
        componentStack: "error stack",
        error: new Error("error message"),
     });

    expect(errorBoundary.text()).toEqual("fallback component");
  });

  it("pass error message", () => {
    interface IProps {
      componentStack: string;
      error: Error;
    }
    const fallback: SFC<IProps> = ({ error, componentStack }) => (<div>{error.message}{componentStack}</div>);

    const errorBoundary = mount(<ErrorBoundary FallbackComponent={fallback}>passed child</ErrorBoundary>);
    errorBoundary.setState({
        componentStack: "error stack",
        error: new Error("error message"),
     });

    expect(errorBoundary.text()).toEqual("error message");
  });
});
