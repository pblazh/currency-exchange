import cx from "classnames";
import React from "react";
import "./Pager.scss";

interface IProps {
  pages: number;
  active: number;
}

export default ({ pages, active }: IProps) => (
  <div className="Pager">
    {new Array(pages).fill(1).map((_, i) => (
      <div
        key={i}
        className={cx("Pager__page", { "Pager__page--active": active === i })}
      />
    ))}
  </div>
);
