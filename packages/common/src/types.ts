export interface ICurrency {
    currency: string;
    rate: number;
}

export type CurrencyListT = ICurrency[];

export interface ISample {
    updated: number;
    currencies: CurrencyListT;
}

export interface IAppStore {
    accounts: IMoney | null;
    exchange: ISample | null;
    history: ISample[];
}
export interface IMoney {
    currency: string;
    amount: number;
}
