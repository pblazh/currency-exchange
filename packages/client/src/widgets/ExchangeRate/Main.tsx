import React, { Component } from "react";
import { connect } from "react-redux";
import { ActionT, AppStoreT } from "../../store/types";
import { SampleT, MoneyT } from "../../../../types";
import { PairT } from "../../store/pair/types";
import { ExchangePair, Header } from "./components";
import { pair, exchange } from "../../store/modules";

import "./Main.scss";

interface MainProps {
  exchange: SampleT;
  accounts: MoneyT[];
}

class Main extends Component<MainProps> {
  render() {
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

const mapStateToProps = (state: AppStoreT) => ({
  exchangeRates: state.exchange,
  accounts: state.accounts,
  exchange: state.exchange
});

const mapDispatchToProps = (dispatch: (action: ActionT<any>) => void) => ({
  swap: () => dispatch(pair.actions.swap(null))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main);
