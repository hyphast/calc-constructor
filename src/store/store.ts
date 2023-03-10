import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import calculatorReducer from './calculator/slice'
import appReducer from './app/slice'

export const store = configureStore({
  reducer: {
    app: appReducer,
    calculator: calculatorReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>

type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
