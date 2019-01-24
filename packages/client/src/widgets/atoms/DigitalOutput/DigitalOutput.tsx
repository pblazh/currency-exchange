import React from "react";

interface IProps {
  className?: string;
  value: number;
}

const formatValue = (propsValue: number) => {
  return `+${(propsValue / 100).toFixed(2)}`;
};

export default ({ value, className }: IProps) => (
  <input
    className={className}
    type="text"
    readOnly={true}
    value={formatValue(value)}
  />
);
