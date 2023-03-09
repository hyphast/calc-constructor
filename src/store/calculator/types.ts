export enum Operator {
  PLUS,
  MINUS,
  DIVISION,
  MULTIPLICATION,
}

export interface ICalculator {
  firstOperand: number
  secondOperand: number
  operator: Operator | null
  result: number
}
