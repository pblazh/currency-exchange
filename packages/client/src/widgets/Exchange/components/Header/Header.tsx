import { Money, Select } from "@atoms";
import React from "react";
import { IMoney } from "revolute-common";

import "./Header.scss";

interface IProps {
  from: IMoney;
  to: IMoney;
}

export default ({from, to}: IProps) => (
    <div className="Exchange__Header">
        <button>Cancel</button>
        <Select>
            <Money money={from}/> = <Money fractions money={to}/>
        </Select>
        <button>Exchange</button>
    </div>
);
