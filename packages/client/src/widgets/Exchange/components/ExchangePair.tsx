import React, { Component } from "react";
import { exchange, IMoney, ISample } from "revolute-common";
import CurrencyList from "./CurrencyList";

interface IProps {
  accounts: IMoney[];
  exchange: ISample;
}
interface IState {
  amount: number;
  from: IMoney;
}
export default class ExchangePair extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    const rate = exchange(
      { ...this.props.accounts[0], amount: 1 },
      this.props.accounts[1],
      this.props.exchange,
    );

    if (!(rate instanceof Error)) {
      this.state = {
        amount: 0,
        from: props.accounts[0],
      };
    }
  }

  public render() {
    const { accounts } = this.props;
    const { amount, from } = this.state;
    const { currency } = from;

    const accountsFrom = accounts.map(account => ({
      ...account,
      outcome: amount,
    }));

    const accountsTo = accounts
      .map(account => {
        const rate = exchange(
          { ...account, amount: 1 },
          from,
          this.props.exchange,
        );

        const income = exchange(
          { currency, amount },
          account,
          this.props.exchange,
        );

        return {
          ...account,
          from,
          income: income instanceof Error ? null : income.amount,
          rate: {...rate, currency },
        };
      })
      .filter(
        account => account.income !== null,
      ) as IMoney[];

    return (
      <>
        <CurrencyList
          value={this.state.amount}
          accounts={accountsFrom}
          defaultPage={0}
          onChange={this.onChange}
          onPage={this.onPage}
        />
        <CurrencyList value={this.state.amount} accounts={accountsTo} defaultPage={1} />
      </>
    );
  }

  private onChange = (value: number) => {
    this.setState({ amount: value });
  }

  private onPage = (page: number) => {
    this.setState({
      from: this.props.accounts[page],
    });
  }
}
