import React, { ReactNode } from "react";

import "./Select.scss";

interface IProps {
  children?: ReactNode;
}

export default ({children}: IProps) => (
  <div className="Select">
    <div className="Select__value">{ children }</div>
    <div className="Select__arrow" />
  </div>
);
