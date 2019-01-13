import React, {
  Component,
  SyntheticEvent,
  ChangeEvent,
  InputHTMLAttributes
} from "react";
import "./Currency.scss";
import Dots from "./Dots";
import { MoneyT } from "../../../../../../types";

const formatCurrency = (currency: string, n: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency }).format(n);

const formatValue = (n: number) => (n ? `+${n}` : "0");

interface CurrencyProps {
  accounts: MoneyT[];
  n: number;
  value?: number;
  from?: MoneyT;
  onChange?: (value: number) => void;
}
interface CurrencyState {
  n: number;
  value: number;
}

export default class Currency extends Component<CurrencyProps, CurrencyState> {
  state = {
    value: 0,
    n: 0
  };
  _onChange = (ev: ChangeEvent<HTMLInputElement>) => {
    const val = ev.currentTarget.value;
    let value = val === "+" ? 0 : parseFloat(val);
    if (isNaN(value)) value = this.state.value;

    this.setState({ value });
    this.props.onChange && this.props.onChange(value);
  };

  render() {
    const { accounts, n, from, value } = this.props;
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
            value={value ? `-${value}` : formatValue(this.state.value)}
            onChange={this._onChange}
          />
          <div className="Currency__total">
            {from &&
              `${formatCurrency(accounts[n].currency, 1)} = ${formatCurrency(
                from.currency,
                1
              )}`}
          </div>
        </div>
        <Dots active={n} n={accounts.length} />

        <div className="Currency__triangle" />
      </div>
    );
  }
}
