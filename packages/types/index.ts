export interface CurrencyT{
    currency: string;
    rate: number;
}

export type CurrencyListT = CurrencyT[];

export interface SampleT{
    updated: number;
    currencies: CurrencyListT;
}

export interface AppStoreT {
    current: SampleT | null;
    history: SampleT[];
};
export interface MoneyT {
    currency: string;
    amount: number;
};
