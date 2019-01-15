import React, { Component } from "react";
import { exchange, IMoney, ISample } from "revolute-common";
import { IIncome, IOutcome } from "../types";
import { makeIncomes, makeOutcomes } from "../utils";
import CurrencyList from "./CurrencyList";
import Header from "./Header";

interface IProps {
  accounts: IMoney[];
  exchange: ISample;
  process: (what: IMoney, to: string) => void;
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
    const { amount, from, to } = this.state;

    const currentRate = exchange(
      { ...from, amount: 1 },
      to,
      this.props.exchange,
    );

    const accountsFrom: IOutcome[] = makeOutcomes(accounts, amount);
    const accountsTo: IIncome[] = makeIncomes(
      { ...from, amount },
      this.props.exchange,
      accounts,
    );

    return (
      <>
        <Header
          from={{ ...from, amount: 1 }}
          to={currentRate as IMoney}
          onExchange={this.onExchange}
        />

        <CurrencyList
          value={this.state.amount}
          accounts={accountsFrom}
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
    const what: IMoney = {...this.state.from, amount: this.state.amount};
    const to = this.state.to.currency;
    this.props.process(what, to);
  }

  private onChange = (value: number) => {
    this.setState({ amount: value });
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
