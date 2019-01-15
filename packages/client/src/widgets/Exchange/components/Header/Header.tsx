// import { Money, Select } from "@atoms";
import React from "react";
import { IMoney } from "revolute-common";
import { Money, Select } from "../../../atoms";

import "./Header.scss";

interface IProps {
  from: IMoney;
  to: IMoney;
  onExchange: () => void;
}

export default ({from, to, onExchange}: IProps) => (
    <div className="Exchange__Header">
        <button>Cancel</button>
        <Select>
            <Money money={from}/> = <Money fractions money={to}/>
        </Select>
        <button data-test="button-exchange" onClick={onExchange}>Exchange</button>
    </div>
);
