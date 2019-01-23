// import Money from "@atoms/Money";
import React, { ChangeEvent, PureComponent } from "react";
import { IMoney } from "revolute-common";
import Money from "../../../atoms/Money";
import { IIncome } from "../../types";

import "./Currency.scss";

const formatValue = (input: boolean, n: number) => {
  if (n === 0 ) {
    return "0";
  }
  return input ? `+${(n / 100).toFixed(2)}` : `-${n / 100}`;
};

interface IProps {
  account: IIncome;
  value: number;
  onChange?: (value: number) => void;
}
const parseString = (value: string) => {
  const parsed = parseInt(value.replace(/[^0-9]/g, ""), 10);
  return isNaN(parsed) ? 0 : parsed * 100;
};

export default class Currency extends PureComponent<IProps> {
  public onChange = (ev: ChangeEvent<HTMLInputElement>) => {
    const value = parseString(ev.currentTarget.value);

    if (this.props.onChange) {
      this.props.onChange(value);
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
    <Money money={{...income, amount: 100}} />
    = <Money fractions money={{...income.rate as IMoney}} />
  </>
);
