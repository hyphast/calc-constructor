export type Operator = '+' | '-' | 'x' | '/' | null
export type Operand =
  | '0'
  | '1'
  | '2'
  | '3'
  | '4'
  | '5'
  | '6'
  | '7'
  | '8'
  | '9'
  | ','
  | '-'

export type CalcStage = 0 | 1 | 2

export interface ICalculator {
  firstOperand: string
  secondOperand: string
  operator: Operator | null
  result: number | null | 'Не определено'
  meta: {
    stage: CalcStage
  }
}
