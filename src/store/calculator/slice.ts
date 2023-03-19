import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
  getCalculationResult,
  getNextChar,
  isResultCorrect,
  shouldSkipUpdate,
  toFormattedString,
} from './service'
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

      if (shouldSkipUpdate({ operand, char, result: state.result })) {
        return state
      }

      const currentOperand = state[operandName]
      const nextChar = getNextChar({
        operand,
        char,
        result: state.result,
        currentOperand,
      })

      state[operandName] = nextChar

      if (state.result) state.result = null
    },
    setOperator(state, action: PayloadAction<Operator>) {
      state.operator = action.payload
      state.meta.stage = 1
    },
    calculate(state) {
      const stage = state.meta.stage

      if (stage === 0) return state

      let result = getCalculationResult(
        state.firstOperand,
        stage === 1 ? state.firstOperand : state.secondOperand,
        state.operator
      )

      if (!isResultCorrect(result)) {
        state.result = 'Не определено'
        state.firstOperand = '0'
      } else {
        const formattedResult = toFormattedString(result)

        state.result = formattedResult
        state.firstOperand = formattedResult
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
