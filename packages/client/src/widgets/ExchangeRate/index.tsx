import React, { Component } from "react";
import { connect } from "react-redux";
import { IAppStore, ISample } from "revolute-common";
import { exchange as exchangeModule } from "../../store/modules";
import { IAction } from "../../store/types";
import { Loading } from "./components";
import Main from "./Main";

interface IProps {
  exchange: ISample | null;
  fetch: () => void;
}

class ExchangeRate extends Component<IProps> {
  public componentDidMount() {
    this.props.fetch();
  }
  public render() {
    const { exchange } = this.props;
    return exchange ? <Main /> : <Loading />;
  }
}

const mapStateToProps = (state: IAppStore) => ({
  exchange: state.exchange,
});

const mapDispatchToProps = (dispatch: (action: IAction<any>) => void) => ({
  fetch: () => dispatch(exchangeModule.actions.fetch()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ExchangeRate);
