import { withErrorBoundary } from "@atoms/ErrorBoundary";
import Message from "@atoms/Message";
import ErrorScreen from "@widgets/ErrorScreen";
import React, { PureComponent } from "react";
import { IError, IMoney, ISample, isError } from "revolute-common";
import { ExchangePair } from "./components";

import "./Exchange.scss";

interface IProps {
  exchange: ISample | IError | null;
  accounts: IMoney[] | null;
  fetchRates: (timeout?: number) => void;
  process: (what: IMoney, to: string) => void;
}

class Exchange extends PureComponent<IProps> {
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

export default withErrorBoundary(Exchange, ErrorScreen);
