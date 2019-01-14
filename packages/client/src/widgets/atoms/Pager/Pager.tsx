import cx from "classnames";
import React, { Component, MouseEvent } from "react";
import "./Pager.scss";

interface IProps {
  pages: number;
  active: number;
  onChange?: (page: number) => void;
}

// export default ({ pages, active, onChange }: IProps) => (
export default class Pager extends Component<IProps> {

  public render() {
    const {pages, active, onChange } = this.props;
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
