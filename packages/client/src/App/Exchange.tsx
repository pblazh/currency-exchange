
import { accounts as accountsModule, exchange as exchangeModule } from "@store/modules";
import ExchangeWidget from "@widgets/Exchange";
import { connect } from "react-redux";
import { AnyAction, bindActionCreators, Dispatch } from "redux";
import { IAppStore, IMoney } from "revolute-common";

const mapStateToProps = (state: IAppStore) => ({
  accounts: state.accounts,
  exchange: state.exchange,
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) =>
    bindActionCreators({
            fetch: exchangeModule.actions.fetch,
            stop:  exchangeModule.actions.stop,
            transfer: (what: IMoney, to: string) => accountsModule.actions.transfer([what, to]),
        },
        dispatch,
    );

export default connect(mapStateToProps, mapDispatchToProps)(ExchangeWidget);
