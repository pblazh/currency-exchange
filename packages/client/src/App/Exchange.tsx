
import { accounts as accountsModule, exchange as exchangeModule } from "@store/modules";
import { IAction } from "@store/types";
import ExchangeWidget from "@widgets/Exchange";
import { connect } from "react-redux";
import { IAppStore, IMoney } from "revolute-common";

const mapStateToProps = (state: IAppStore) => ({
  accounts: state.accounts,
  exchange: state.exchange,
});

const mapDispatchToProps = (dispatch: (action: IAction<any>) => void) => ({
  fetchRates: (timeout?: number) => dispatch(exchangeModule.actions.fetch(timeout)),
  process: (what: IMoney, to: string) => dispatch(accountsModule.actions.fetch()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExchangeWidget);
