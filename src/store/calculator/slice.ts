import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ICalculator, Operand, Operator } from './types'

const initialState: ICalculator = {
  firstOperand: '0',
  secondOperand: '0',
  operator: null,
  result: null,
  meta: {
    stage: 0,
  },
}

const slice = createSlice({
  name: 'calculator',
  initialState,
  reducers: {
    setOperand(state, action: PayloadAction<Operand>) {
      const char = action.payload
      const stage = state.meta.stage

      let operandName: 'firstOperand' | 'secondOperand' =
        stage === 0 ? 'firstOperand' : 'secondOperand'
      let operand = state.result ? '0' : state[operandName]

      if (stage === 1) state.meta.stage = 2

      if (
        operand.length > 15 ||
        (char === ',' && operand.includes(',')) ||
        (operand === '0' && char === '0' && !state.result)
      ) {
        return
      }

      if (operand === '0' && char !== ',') {
        state[operandName] = char
      } else if (operand === '0' && char === ',' && state.result) {
        state[operandName] = operand + char
      } else {
        state[operandName] += char
      }

      if (state.result) state.result = null
    },
    setOperator(state, action: PayloadAction<Operator>) {
      state.operator = action.payload
      state.meta.stage = 1
    },
    calculate(state) {
      const stage = state.meta.stage

      if (stage === 0) return

      let firstOperand = parseFloat(state.firstOperand.replace(',', '.'))
      let secondOperand = parseFloat(state.secondOperand.replace(',', '.'))
      if (stage === 1) secondOperand = firstOperand

      let result
      switch (state.operator) {
        case '+':
          result = firstOperand + secondOperand
          break
        case '-':
          result = firstOperand - secondOperand
          break
        case 'x':
          result = firstOperand * secondOperand
          break
        case '/':
          result = firstOperand / secondOperand
          break
        default:
          return state
      }

      if (!Number.isFinite(result)) {
        state.result = 'Не определено'
        state.firstOperand = '0'
      } else {
        let fixedNum = result.toFixed(15) // maybe loss of precision

        if (fixedNum.includes('e')) {
          fixedNum = parseFloat(fixedNum).toExponential(12)
        }

        const resultWithoutTrailingZeros = String(parseFloat(fixedNum)).replace(
          '.',
          ','
        )

        state.result = resultWithoutTrailingZeros
        state.firstOperand = resultWithoutTrailingZeros
      }

      state.meta.stage = 0
      state.secondOperand = '0'
      state.operator = null
    },
    resetCalculator(state) {
      state.firstOperand = '0'
      state.secondOperand = '0'
      state.operator = null
      state.result = null
      state.meta.stage = 0
    },
  },
})

export const { setOperand, setOperator, calculate, resetCalculator } =
  slice.actions

export default slice.reducer
