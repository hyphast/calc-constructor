import { RootState } from '../store'

export const selectCalculatorOperand = (state: RootState) => {
  const { firstOperand, secondOperand, meta, result } = state.calculator

  return result ? result : meta.stage === 2 ? secondOperand : firstOperand
}
