import { Pager } from "@atoms";
import React, { ChangeEvent, Component } from "react";
import { IMoney } from "revolute-common";
import "./Currency.scss";

const formatCurrency = (currency: string, n: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency }).format(n);

const formatValue = (n: number) => (n === 0 ? "0" : `-${n}`);

interface ICurrencyProps {
  accounts: IMoney[];
  n: number;
  rate?: number;
  value?: number;
  from?: IMoney;
  onChange?: (value: number) => void;
}
interface ICurrencyState {
  n: number;
  value: number;
}

export default class Currency extends Component<ICurrencyProps, ICurrencyState> {
  public state = {
    n: 0,
    value: 0,
  };
  public onChange = (ev: ChangeEvent<HTMLInputElement>) => {
    const val = ev.currentTarget.value;
    let value = val === "-" ? 0 : Math.abs(parseFloat(val));
    if (isNaN(value)) { value = this.state.value; }

    this.setState({ value });
    if (this.props.onChange) {
      this.props.onChange(value);
    }
  }

  public render() {
    const { accounts, n, from, value, rate } = this.props;
    return (
      <div className="Currency">
        <div className="Currency__base">
          <div className="Currency__code">{accounts[n].currency}</div>
          <div className="Currency__total">
            You have {formatCurrency(accounts[n].currency, accounts[n].amount)}
          </div>
        </div>
        <div className="Currency__base">
          <input
            className="Currency__value"
            type="text"
            readOnly={Boolean(from)}
            value={
              value ? `+${value.toFixed(2)}` : formatValue(this.state.value)
            }
            onChange={this.onChange}
          />
          <div className="Currency__total">
            {from &&
              rate &&
              `${formatCurrency(accounts[n].currency, 1)} = ${formatCurrency(
                from.currency,
                rate,
              )}`}
          </div>
        </div>
        <Pager active={n} pages={accounts.length} />

        <div className="Currency__triangle" />
      </div>
    );
  }
}
