import { createAsyncThunk } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { calculate, setOperator } from './slice'
import { Operator } from './types'

export const setOperatorWithCalculation = createAsyncThunk<
  void,
  Operator,
  { state: RootState }
>(
  'calculator/setOperatorWithCalculation',
  async (operator, { dispatch, getState }) => {
    const stage = getState().calculator.meta.stage

    if (stage === 2) {
      dispatch(calculate())
    }

    dispatch(setOperator(operator))
  }
)
