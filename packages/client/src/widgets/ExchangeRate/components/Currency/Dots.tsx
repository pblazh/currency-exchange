import cx from "classnames";
import React from "react";
import "./Dots.scss";

interface IProps {
  n: number;
  active: number;
}

export default ({ n, active }: IProps) => (
  <div className="Dots">
    {new Array(n).fill(1).map((_, i) => (
      <div
        key={i}
        className={cx("Dots__dot", { "Dots__dot--active": active === i })}
      />
    ))}
  </div>
);
