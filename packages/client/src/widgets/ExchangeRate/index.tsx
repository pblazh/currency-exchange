import React, { Component } from "react";
import { connect } from "react-redux";
import { ActionT, AppStoreT } from "../../store/types";
import { SampleT } from "../../../../types";
import { exchange } from "../../store/modules";
import { Loading } from "./components";
import Main from "./Main";

interface ExchangeRateProps {
  exchangeRates: SampleT;
  fetch: any;
}

class ExchangeRate extends Component<ExchangeRateProps> {
  componentDidMount() {
    this.props.fetch();
  }
  render() {
    const { exchangeRates } = this.props;
    return exchangeRates ? <Main /> : <Loading />;
  }
}

const mapStateToProps = (state: AppStoreT) => ({
  exchangeRates: state.exchange,
});

const mapDispatchToProps = (dispatch: (action: ActionT<any>) => void) => ({
  fetch: () => dispatch(exchange.actions.fetch())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ExchangeRate);
