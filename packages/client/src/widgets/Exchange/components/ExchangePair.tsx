import React, { Component } from "react";
import { exchange, IMoney, ISample } from "revolute-common";
import { IIncome } from "../types";
import { makeIncomes } from "../utils";
import CurrencyList from "./CurrencyList";
import Header from "./Header";

interface IProps {
  accounts: IMoney[];
  exchange: ISample;
  transfer: (what: IMoney, to: string) => void;
}
interface IState {
  amount: number;
  from: IMoney;
  to: IMoney;
}
export default class ExchangePair extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      amount: 0,
      from: props.accounts[0],
      to: props.accounts[1],
    };
  }

  public render() {
    const { accounts } = this.props;
    const { amount, from: {currency}, to } = this.state;
    const one = { currency, amount: 100 };

    const currentRate = exchange(
      one,
      to.currency,
      this.props.exchange,
    );

    const accountsTo: IIncome[] = makeIncomes(
      { currency, amount },
      this.props.exchange,
      accounts,
    );

    return (
      <>
        <Header
          from={ one }
          to={currentRate as IMoney}
          onExchange={this.onExchange}
        />

        <CurrencyList
          value={this.state.amount}
          accounts={accounts}
          defaultPage={0}
          onChange={this.onChange}
          onPage={this.onPage}
        />

        <CurrencyList
          value={this.state.amount}
          accounts={accountsTo}
          defaultPage={1}
          onPage={this.onPageTo}
        />
      </>
    );
  }

  private onExchange = () => {
    const {
      from: { currency },
      to: { currency: to },
      amount,
    } = this.state;

    const what: IMoney = { currency, amount};
    this.props.transfer(what, to);
  }

  private onChange = (amount: number) => {
    this.setState({ amount });
  }

  private onPage = (page: number) => {
    this.setState({
      from: this.props.accounts[page],
    });
  }

  private onPageTo = (page: number) => {
    this.setState({
      to: this.props.accounts[page],
    });
  }
}
