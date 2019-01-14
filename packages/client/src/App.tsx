import React, { Component } from "react";
import { connect } from "react-redux";
import { accounts } from "./store/modules";
import { IAction } from "./store/types";
import { ExchangeRate } from "./widgets";

import "./App.css";

interface IProps {
  fetch: any;
}
class App extends Component<IProps> {
  public componentDidMount() {
    this.props.fetch();
  }
  public render() {
    return (
      <div className="App">
        <ExchangeRate />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch: (action: IAction<any>) => void) => ({
  fetch: () => dispatch(accounts.actions.fetch()),
});

export default connect(
  null,
  mapDispatchToProps,
)(App);
