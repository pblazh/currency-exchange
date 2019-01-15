import { Pager } from "@atoms";
import React, { ChangeEvent, Component } from "react";
import { IMoney } from "revolute-common";
import Currency from "./Currency";

import "./CurrencyList.scss";

interface IIncomeAccount extends IMoney {
  income?: number;
  rate?: IMoney;
}

interface IProps {
  accounts: IIncomeAccount[];
  defaultPage: number;
  value: number;
  onChange?: (value: number) => void;
  onPage?: (page: number) => void;
}

interface IState {
  page: number;
}

export default class CurrencyList extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      page: props.defaultPage,
    };
  }

  public render() {
    const { accounts, onChange } = this.props;
    const { page } = this.state;
    return (
      <div className="CurrencyList">
        <div className={`CurrencyList__carousel CurrencyList__carousel--${page} `}>
            {
              accounts.map(account => (
                <Currency
                  key={account.currency}
                  account={account}
                  onChange={onChange}
                  value={account.income || this.props.value }
                />
              ))
            }
        </div>

        <Pager active={page} pages={accounts.length} onChange={this.onPage}/>

        <div className="CurrencyList__triangle" />
      </div>
    );
  }
  private onPage = (page: number) => {
    if (this.props.onPage) {
      this.props.onPage(page);
    }
    this.setState({page});
  }
}
