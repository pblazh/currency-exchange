import React, { Component } from "react";
import { exchange, IMoney, ISample } from "revolute-common";
import Currency from "./Currency";

interface IProps {
  accounts: IMoney[];
  exchange: ISample;
}
interface IState {
  from: IMoney;
  to: IMoney;
  rate: number;
}
export default class ExchangePair extends Component<
  IProps,
  IState
> {
  constructor(props: IProps) {
    super(props);
    const rate = exchange(
      { ...this.props.accounts[0], amount: 1 },
      this.props.accounts[2],
      this.props.exchange,
    );
    if (!(rate instanceof Error)) {
      this.state = {
        from: { currency: props.accounts[0].currency, amount: 0 },
        rate: rate.amount,
        to: { currency: props.accounts[2].currency, amount: 0 },
      };
    }
  }
  public onChange = (n: number) => {
    const from = { currency: this.state.from.currency, amount: n };
    const to = exchange(from, this.state.to, this.props.exchange);
    if (!(to instanceof Error)) {
      this.setState({
        from,
        to,
      });
    }
  }

  public render() {
    const { accounts } = this.props;
    return (
      <>
        <Currency accounts={accounts} n={0} onChange={this.onChange} />
        <Currency
          accounts={accounts}
          n={2}
          from={accounts[0]}
          rate={this.state.rate}
          value={this.state.to.amount}
        />
      </>
    );
  }
}
