import { NumericLiteral } from "@babel/types";

export interface Item {
  id?: string;
  name: string;
  description?: string;
  qty: number;
}