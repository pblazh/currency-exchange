import React, { Component } from "react";
import { connect } from "react-redux";
import { ISample } from "revolute-common";
import { exchange } from "../../store/modules";
import { IAction, IAppStore } from "../../store/types";
import { Loading } from "./components";
import Main from "./Main";

interface IExchangeRateProps {
  exchangeRates: ISample;
  fetch: any;
}

class ExchangeRate extends Component<IExchangeRateProps> {
  public componentDidMount() {
    this.props.fetch();
  }
  public render() {
    const { exchangeRates } = this.props;
    return exchangeRates ? <Main /> : <Loading />;
  }
}

const mapStateToProps = (state: IAppStore) => ({
  exchangeRates: state.exchange,
});

const mapDispatchToProps = (dispatch: (action: IAction<any>) => void) => ({
  fetch: () => dispatch(exchange.actions.fetch()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ExchangeRate);
