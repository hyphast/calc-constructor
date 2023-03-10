import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ICalculator, Operator } from './types'

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
    setOperand(state, action: PayloadAction<string>) {
      const char = action.payload
      const stage = state.meta.stage

      let operandName: 'firstOperand' | 'secondOperand' =
        stage === 0 ? 'firstOperand' : 'secondOperand'
      let operand = state.result ? '0' : state[operandName]

      if (stage === 1) state.meta.stage = 2

      if (operand.length > 16) return

      if (char === ',' && operand.includes(',')) return

      if (operand === '0' && char === '0' && !state.result) return

      if (state.result) state.result = null

      if (operand === '0' && char !== ',') {
        state[operandName] = char
      } else {
        state[operandName] += char
      }
    },
    setOperator(state, action: PayloadAction<Operator>) {
      const stage = state.meta.stage

      if (stage === 2) {
        const result = state.firstOperand
        state.firstOperand = result
        state.meta.stage = 0
      }

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
        const fixedNum = result.toFixed(15).replace(',', '.') // maybe loss of precision
        state.result = parseFloat(fixedNum)
        state.firstOperand = String(result).replace('.', ',')
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
