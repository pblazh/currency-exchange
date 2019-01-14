import { Select } from "@atoms";
import React from "react";
import "./Header.scss";

export default () => (
    <div className="Exchange__Header">
        <button>Cancel</button>
        <Select />
        <button>Exchange</button>
    </div>
);
