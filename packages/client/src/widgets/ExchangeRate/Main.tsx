import React, { Component } from "react";
import { connect } from "react-redux";
import { IMoney, ISample } from "revolute-common";
import { IAppStore } from "../../store/types";
import { ExchangePair, Header } from "./components";

import "./Main.scss";

interface IMainProps {
  exchange: ISample;
  accounts: IMoney[];
}

class Main extends Component<IMainProps> {
  public render() {
    const { exchange, accounts } = this.props;
    return (
      <div className="ExchangeRate">
        <Header />
        {accounts && accounts.length > 1 && (
          <ExchangePair accounts={accounts} exchange={exchange} />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state: IAppStore) => ({
  accounts: state.accounts,
  exchange: state.exchange,
  exchangeRates: state.exchange,
});

export default connect(mapStateToProps)(Main);
