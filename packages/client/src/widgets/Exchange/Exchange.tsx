import React, { Component } from "react";
import { connect } from "react-redux";
import { IAppStore, IMoney, ISample } from "revolute-common";
import { ExchangePair, Header } from "./components";

import "./Exchange.scss";

interface IProps {
  exchange: ISample | null;
  accounts: IMoney[] | null;
}

class Exchange extends Component<IProps> {
  public render() {
    const { exchange, accounts } = this.props;
    return (
      <div className="Exchange">
        <Header />
        {accounts && accounts.length > 1 && exchange && (
          <ExchangePair accounts={accounts} exchange={exchange} />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state: IAppStore) => ({
  accounts: state.accounts,
  exchange: state.exchange,
});

export default connect(mapStateToProps)(Exchange);
