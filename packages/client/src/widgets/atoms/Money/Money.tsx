import Dinero from "dinero.js";
import React from "react";
import { IMoney } from "revolute-common";

import "./Money.scss";

const formatCurrency = (money: IMoney, fractions: boolean = false) =>
  Dinero(money).toFormat(fractions ? "$0,0.00" : "$0,0");

interface IProps {
  money: IMoney;
  fractions?: boolean;
}

export default ({money, fractions}: IProps) => (
    <span className="Money">{formatCurrency(money, fractions)}</span>
);
