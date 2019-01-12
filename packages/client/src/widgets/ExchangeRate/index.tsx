import React, { Component } from "react";
import { connect } from 'react-redux';
import { ActionT, AppStoreT } from "../../store/types";
import { SampleT } from '../../../../types';
import { exchange } from '../../store/modules';
import { DateBadge, Loading } from './components';

interface ExchangeRateProps {
  exchangeRates: SampleT;
  fetch: any;
}

class ExchangeRate extends Component<ExchangeRateProps> {
  componentDidMount(){
    this.props.fetch();
  }
  render() {
    const { exchangeRates } = this.props;
    return (
      <div>
          { 
            exchangeRates 
              ? <DateBadge date={new Date(exchangeRates.updated)} /> 
              : <Loading />
          }
      </div>
    );
  }
}

const mapStateToProps = (state: AppStoreT) => ({
  exchangeRates: state.current,
});

const mapDispatchToProps = (dispatch: (action: ActionT<any>) => void) => ({
  fetch: () => dispatch(exchange.actions.fetch(null)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ExchangeRate);
