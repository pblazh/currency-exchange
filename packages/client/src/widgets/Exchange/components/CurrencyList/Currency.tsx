import { isIP } from "net";
import React, { ChangeEvent, Component } from "react";
import { IMoney } from "revolute-common";
import "./Currency.scss";

const formatCurrency = (currency: string, n: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency }).format(n);

const formatValue = (input: boolean, n: number) => {
  if (n === 0 ) {
    return "0";
  }
  return input ? `+${n.toFixed(2)}` : `-${n}`;
};

interface IIncomeAccount extends IMoney {
  income?: number;
  rate?: IMoney;
}

interface IProps {
  account: IIncomeAccount;
  value: number;
  onChange?: (value: number) => void;
}

export default class Currency extends Component<IProps> {
  public onChange = (ev: ChangeEvent<HTMLInputElement>) => {
    const value = Math.abs(parseFloat(ev.currentTarget.value));

    if (this.props.onChange) {
      this.props.onChange(isNaN(value) ? 0 : value);
    }
  }

  public render() {
    const { account, value } = this.props;
    const isOutput = Boolean(account.rate);
    return (
        <div className="Currency">
          <div className="Currency__base">
            <div className="Currency__code">{account.currency}</div>
            <div className="Currency__total">
              You have {formatCurrency(account.currency, account.amount)}
            </div>
          </div>
          <div className="Currency__base">
            <input
              className="Currency__value"
              type="text"
              readOnly={isOutput}
              value={formatValue(isOutput, value)}
              onChange={this.onChange}
            />
            <div className="Currency__total">
              {account.rate &&
                `${formatCurrency(account.currency, 1)} = ${formatCurrency(
                  account.rate.currency,
                  account.rate.amount,
                )}`}
            </div>
          </div>
      </div>
    );
  }
}
