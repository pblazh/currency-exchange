import Money from "@atoms/Money";
import React, { ChangeEvent, PureComponent } from "react";
import { IMoney } from "revolute-common";
import { IIncome } from "../../types";

import "./Currency.scss";

const formatValue = (input: boolean, n: number) => {
  if (n === 0 ) {
    return "0";
  }
  return input ? `+${n.toFixed(2)}` : `-${n}`;
};

interface IProps {
  account: IIncome;
  value: number;
  onChange?: (value: number) => void;
}

export default class Currency extends PureComponent<IProps> {
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
              You have <Money money={account}/>
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
              { account.rate && renderRate(account) }
            </div>
          </div>
      </div>
    );
  }
}

const renderRate = (income: IIncome) => (
  <>
    <Money money={{...income, amount: 1}} />
    = <Money fractions money={{...income.rate as IMoney}} />
  </>
);
