export interface IError {
    error: true;
    message: string;
}

export const isError = (some: IError | any): some is IError => some && some.error;

export interface ICurrency {
    currency: string;
    rate: string;
}

export type CurrencyListT = ICurrency[];

export interface ISample {
    updated: number;
    currencies: CurrencyListT;
}

export interface IAppStore {
    accounts: IMoney[] | null;
    exchange: ISample | null;
    history: ISample[];
}
export interface IMoney {
    currency: string;
    amount: number;
}
