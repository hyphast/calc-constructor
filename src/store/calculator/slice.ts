import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ICalculator, Operator } from './types'

const initialState: ICalculator = {
  firstOperand: 0,
  secondOperand: 0,
  operator: null,
  result: 0,
}

const slice = createSlice({
  name: 'calculator',
  initialState,
  reducers: {
    setFirstOperand(state, action: PayloadAction<number>) {
      state.firstOperand = action.payload
    },
    setSecondOperand(state, action: PayloadAction<number>) {
      state.secondOperand = action.payload
    },
    setOperator(state, action: PayloadAction<Operator>) {
      state.operator = action.payload
    },
    calc(state, action: PayloadAction<Operator>) {
      state.operator = action.payload
    },
  },
})

export const { setFirstOperand, setSecondOperand, setOperator, calc } =
  slice.actions

export default slice.reducer
