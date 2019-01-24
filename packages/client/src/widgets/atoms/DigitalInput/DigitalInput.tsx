import React, { PureComponent } from "react";
import { ChangeEvent } from "react";

interface IProps {
  className?: string;
  active?: boolean;
  onChange?: (n: number) => void;
}

interface IState {
  value: string;
}

export default class DigitalInput extends PureComponent<IProps, IState> {
   public state = {
    value: "0",
  };

  public componentWillReceiveProps(props: IProps) {
    if (props.active && !this.props.active) {
      this.notify();
    }
  }

  public componentDidMount() {
    if (this.props.active) {
      this.notify();
    }
  }

  public render() {
    return (
      <input
        className={this.props.className}
        type="text"
        value={ this.formatValue(this.state.value) }
        onChange={this.onChange}
      />
    );
  }

  private notify() {
    if (this.props.onChange) {
      const nValue = parseString(this.state.value);
      this.props.onChange(nValue);
    }
  }

  private onChange = (ev: ChangeEvent<HTMLInputElement>) => {
    const value = cleanString(ev.currentTarget.value);
    const nValue = parseString(value);

    this.setState({ value });
    if (this.props.onChange) {
       this.props.onChange(nValue);
    }
  }

  private formatValue = (stateValue: string) => {
    if (!stateValue || stateValue === "0") { return stateValue; }
    return `-${stateValue}`;
  }
}

const parseString = (value: string) => {
  const [left, right = "00"] = value.split(".");
  const leftN = parseInt(left, 10);
  const rightN = parseInt((right + "00").substr(0, 2), 10);
  const numberValue = leftN * 100 + rightN;
  return isNaN(numberValue) ? 0 : numberValue;
};

const cleanString = (value: string) => {
  const cleaned = value
    .replace(/[^0-9.]/g, "")
    .replace(/^0{1,}/, "0")
    .replace(/^0([1-9])/, "$1");

  const trimmed = (/\d*(\.\d{0,2})?/).exec(cleaned);

  return trimmed ? trimmed[0] : "0";
};
