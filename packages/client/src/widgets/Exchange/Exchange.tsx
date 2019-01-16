import { withErrorBoundary } from "@atoms/ErrorBoundary";
import Message from "@atoms/Message";
import { accounts as accountsModule, exchange as exchangeModule } from "@store/modules";
import { IAction } from "@store/types";
import ErrorScreen from "@widgets/ErrorScreen";
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
      return <Message>{exchange.message}</Message>;
    }

    if (isError(accounts)) {
      return <Message>{accounts.message}</Message>;
    }

    if (!accounts || !exchange) {
      return <Message>Loading...</Message>;
    }

    if (!accounts.length) {
      return <Message>You have no accounts!</Message>;
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

export default withErrorBoundary(
  connect(mapStateToProps, mapDispatchToProps)(Exchange),
  ErrorScreen,
);
