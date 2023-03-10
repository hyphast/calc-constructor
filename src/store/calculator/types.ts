export type Operator = '+' | '-' | 'x' | '/' | null

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
