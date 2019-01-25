// import Money from "@atoms/Money";
import React, { PureComponent } from "react";
import { IMoney } from "revolute-common";
import DigitalInput from "../../../atoms/DigitalInput";
import DigitalOutput from "../../../atoms/DigitalOutput";
import Money from "../../../atoms/Money";
import { IIncome } from "../../types";

import "./Currency.scss";

interface IProps {
  account: IIncome;
  value: number;
  active?: boolean;
  onChange?: (value: number) => void;
}
interface IState {
  value: string;
}

export default class Currency extends PureComponent<IProps, IState> {
   public state = {
    value: "0",
  };
  public render() {
    const { account, value, active = false } = this.props;
    const isInput = !Boolean(account.rate);

    return (
        <div className="Currency">
          <div className="Currency__base">
            <div className="Currency__code">{account.currency}</div>
            <div className="Currency__total">
              You have <Money money={account} fractions/>
            </div>
          </div>
          <div className="Currency__base">
            { isInput
             ? <DigitalInput
                className="Currency__value"
                active={active}
                onChange={this.props.onChange}
              />
             : <DigitalOutput className="Currency__value" value={ value } />
            }
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
