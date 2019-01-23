
import { exchange, IMoney, ISample } from "revolute-common";
import { IIncome } from "./types";

export const makeOutcomes = (accounts: IMoney[], outcome: number) =>
  accounts.map(account => ({
    ...account,
    outcome,
  }));

export const makeIncomes = (from: IMoney, rates: ISample, accounts: IMoney[]) =>
  accounts.reduce((processed: IIncome[], account: IMoney) => {
    const rate = exchange({ ...account, amount: 100 }, from.currency, rates);
    const income = exchange(from, account.currency, rates);

    return income instanceof Error
      ? processed
      : [
          ...processed,
          {
            ...account,
            from,
            income: income.amount,
            rate: { amount: (rate  as IMoney).amount, currency: from.currency } as IMoney,
          },
        ];
  }, []);
