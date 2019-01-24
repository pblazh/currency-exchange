import { IMoney } from "revolute-common";

export interface IIncome extends IMoney {
  income?: number;
  rate?: IMoney;
}
