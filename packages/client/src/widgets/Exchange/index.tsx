import { Loading } from "@atoms";
import { exchange as exchangeModule } from "@store/modules";
import { IAction } from "@store/types";
import React, { Component } from "react";
import { connect } from "react-redux";
import { IAppStore, ISample } from "revolute-common";
import Exchange from "./Exchange";

interface IProps {
  exchange: ISample | null;
  fetch: () => void;
}

class ExchangeRate extends Component<IProps> {
  public componentDidMount() {
    this.props.fetch();
  }
  public render() {
    const { exchange } = this.props;
    return exchange ? <Exchange /> : <Loading />;
  }
}

const mapStateToProps = (state: IAppStore) => ({
  exchange: state.exchange,
});

const mapDispatchToProps = (dispatch: (action: IAction<any>) => void) => ({
  fetch: () => dispatch(exchangeModule.actions.fetch()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ExchangeRate);
