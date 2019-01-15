import { Loading } from "@atoms";
import { exchange as exchangeModule } from "@store/modules";
import { IAction } from "@store/types";
import React, { Component } from "react";
import { connect } from "react-redux";
import { IAppStore, IMoney, ISample } from "revolute-common";
import { ExchangePair, Header } from "./components";

import "./Exchange.scss";

interface IProps {
  exchange: ISample | null;
  accounts: IMoney[] | null;
  fetchRates: (timeout?: number) => void;
}

class Exchange extends Component<IProps> {
  public componentDidMount() {
    this.props.fetchRates(3000);
  }
  public render() {
    const { exchange, accounts } = this.props;
    return (
    exchange
     ? (
    <div className="Exchange">
        <Header />
        {accounts && accounts.length > 1 && exchange && (
          <ExchangePair accounts={accounts} exchange={exchange} />
        )}
     </div> )
    : (<Loading />)
    );
  }
}

const mapStateToProps = (state: IAppStore) => ({
  accounts: state.accounts,
  exchange: state.exchange,
});

const mapDispatchToProps = (dispatch: (action: IAction<any>) => void) => ({
  fetchRates: (timeout?: number) => dispatch(exchangeModule.actions.fetch(timeout)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Exchange);
