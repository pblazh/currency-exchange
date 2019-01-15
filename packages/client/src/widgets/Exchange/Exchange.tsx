import { Loading } from "@atoms";
import { accounts as accountsModule, exchange as exchangeModule } from "@store/modules";
import { IAction } from "@store/types";
import React, { Component } from "react";
import { connect } from "react-redux";
import { IAppStore, IError, IMoney, ISample, isError } from "revolute-common";
import { ExchangePair } from "./components";

import "./Exchange.scss";

interface IProps {
  exchange: ISample | IError | null;
  accounts: IMoney[] | null;
  fetchRates: (timeout?: number) => void;
  process: (what: IMoney, to: string) => void;
}

class Exchange extends Component<IProps> {
  public componentDidMount() {
    this.props.fetchRates(5000);
  }
  public render() {
    const { exchange, accounts } = this.props;

    if (isError(exchange)) {
      return <Loading>{exchange.message}</Loading>;
    }

    if (isError(accounts)) {
      return <Loading>{accounts.message}</Loading>;
    }

    if (!accounts || !exchange) {
      return <Loading>Loading...</Loading>;
    }

    if (!accounts.length) {
      return <Loading>You have no accounts!</Loading>;
    }

    return (
      <div className="Exchange">
          <ExchangePair
            accounts={accounts}
            exchange={exchange}
            process={this.props.process}
          />
      </div>
    );
  }
}

const mapStateToProps = (state: IAppStore) => ({
  accounts: state.accounts,
  exchange: state.exchange,
});

const mapDispatchToProps = (dispatch: (action: IAction<any>) => void) => ({
  fetchRates: (timeout?: number) => dispatch(exchangeModule.actions.fetch(timeout)),
  process: (what: IMoney, to: string) => dispatch(accountsModule.actions.fetch()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Exchange);
