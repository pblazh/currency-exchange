import { accounts } from "@store/modules";
import { IAction } from "@store/types";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Exchange } from "../widgets";

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
        <Exchange />
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
