import React, { Component } from "react";
import { exchange, IMoney, ISample } from "revolute-common";
import { Header } from "../components";
import { IIncome, IOutcome } from "../types";
import CurrencyList from "./CurrencyList";

interface IProps {
  accounts: IMoney[];
  exchange: ISample;
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
        <Header from={{ ...from, amount: 1 }} to={currentRate as IMoney} />

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

const makeOutcomes = (accounts: IMoney[], outcome: number) =>
  accounts.map(account => ({
    ...account,
    outcome,
  }));

const makeIncomes = (from: IMoney, rates: ISample, accounts: IMoney[]) =>
  accounts.reduce((processed: IIncome[], account: IMoney) => {
    const rate = exchange({ ...account, amount: 1 }, from, rates);
    const income = exchange(from, account, rates);

    return income instanceof Error
      ? processed
      : [
          ...processed,
          {
            ...account,
            from,
            income: income.amount,
            rate: { ...rate, currency: from.currency } as IMoney,
          },
        ];
  }, []);
