import cx from "classnames";
import React, { MouseEvent, PureComponent } from "react";

import "./Pager.scss";

interface IProps {
  pages: number;
  active: number;
  onChange?: (page: number) => void;
}

export default class Pager extends PureComponent<IProps> {

  public render() {
    const { pages } = this.props;
    const active = Math.min(pages - 1, Math.max(0, this.props.active));
    return (
      <div className= "Pager" >
        {new Array(pages).fill(1).map((_, i) => (
          <div
            key={i}
            data-id={i}
            onClick={this.onClick}
            className={cx("Pager__page", { "Pager__page--active": active === i })}
          />
        ))}
      </div>
    );
  }

  private onClick = (ev: MouseEvent<HTMLElement>) => {
    if (this.props.onChange) {
      this.props.onChange(parseInt(String(ev.currentTarget.dataset.id), 10));
    }
  }
}
