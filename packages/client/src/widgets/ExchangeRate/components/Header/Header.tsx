import React from "react";
import Select from "./Select";
import './Header.scss';

export default () => (
    <div className="ExchangeRate__Header">
        <button>Cancel</button>
        <Select />
        <button>Exchange</button>
    </div>
);
