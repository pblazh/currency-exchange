import { IMoney } from "revolute-common";

export interface IIncome extends IMoney {
  income?: number;
  rate?: IMoney;
}
export interface IOutcome extends IMoney {
  outcome: number;
}
