import React, { Component } from "react";
import { MoneyT, SampleT } from "../../../../../types";
import Currency from "./Currency";
import { accounts } from "../../../store/modules";

interface ExchangePairProps {
  accounts: MoneyT[];
  exchange: SampleT;
}
interface ExchangePairState {
  from: MoneyT;
  to: MoneyT;
}
const exchange = (from: MoneyT, to: MoneyT, rates: SampleT) => ({
  ...to,
  amount: from.amount * 2,
});

export default class ExchangePair extends Component<
  ExchangePairProps,
  ExchangePairState
> {
  constructor(props: ExchangePairProps) {
    super(props);
    this.state = {
      from: { currency: props.accounts[0].currency, amount: 0 },
      to: { currency: props.accounts[2].currency, amount: 0 }
    };
  }
  _onChange = (n: number) => {
    const from = { currency: this.state.from.currency, amount: n };
    this.setState({
      from,
      to: exchange(from, this.state.to, this.props.exchange),
    });
  };

  render() {
    const { accounts } = this.props;
    return (
      <>
        <Currency accounts={accounts} n={0} onChange={this._onChange} />
        <Currency
          accounts={accounts}
          n={2}
          from={accounts[0]}
          value={this.state.to.amount}
        />
      </>
    );
  }
}
