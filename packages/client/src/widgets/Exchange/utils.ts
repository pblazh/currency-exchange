
import { exchange, IMoney, ISample } from "revolute-common";
import { IIncome } from "./types";

export const makeIncomes = (from: IMoney, rates: ISample, accounts: IMoney[]) =>
  accounts.reduce((processed: IIncome[], account: IMoney) => {

    const rate = exchange({ ...account, amount: 100 }, from.currency, rates);
    const income = exchange(from, account.currency, rates);

    return income instanceof Error || rate instanceof Error
      ? processed
      : [
          ...processed,
          {
            ...account,
            from,
            income: income.amount,
            rate: { amount: rate.amount, currency: from.currency },
          },
        ];
  }, []);
