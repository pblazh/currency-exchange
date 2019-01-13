import React from "react";
import cx from "classnames";
import "./Dots.scss";

interface ThisProps {
  n: number;
  active: number;
}

export default ({ n, active }: ThisProps) => (
  <div className="Dots">
    {new Array(n).fill(1).map((n, i) => (
      <div
        key={i}
        className={cx("Dots__dot", { "Dots__dot--active": active === i })}
      />
    ))}
  </div>
);
