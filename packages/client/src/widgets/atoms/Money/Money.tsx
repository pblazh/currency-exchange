import React from "react";
import { IMoney } from "revolute-common";

const formatCurrency = (money: IMoney, fractions: boolean = false) =>
  new Intl.NumberFormat(
    "en-US",
    {
      currency: money.currency,
      style: "currency",
      ...fractions ? {} : { minimumFractionDigits: 0, maximumFractionDigits: 0 },
    },
  ).format(money.amount / 100);

interface IProps {
  money: IMoney;
  fractions?: boolean;
}

export default ({money, fractions}: IProps) => (
    <span>{formatCurrency(money, fractions)}</span>
);
