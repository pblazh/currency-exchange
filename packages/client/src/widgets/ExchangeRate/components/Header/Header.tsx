import React from "react";
import "./Header.scss";
import Select from "./Select";

export default () => (
    <div className="ExchangeRate__Header">
        <button>Cancel</button>
        <Select />
        <button>Exchange</button>
    </div>
);
