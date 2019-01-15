import { Loading } from "@atoms";
import { accounts } from "@store/modules";
import { IAction } from "@store/types";
import { Exchange } from "@widgets";
import React, { Component } from "react";
import { connect } from "react-redux";

import "./App.css";

interface IProps {
  fetchAccount: any;
}
class App extends Component<IProps> {
  public componentDidMount() {
    this.props.fetchAccount();
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
  fetchAccount: () => dispatch(accounts.actions.fetch()),
});

export default connect(
  null,
  mapDispatchToProps,
)(App);
