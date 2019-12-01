import { NumericLiteral } from "@babel/types";

export interface User {
  id?: string;
  username: string;
  password: string;
  reg_time: Date;
}