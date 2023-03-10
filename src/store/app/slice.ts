import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ElementType, IApp, IMoveElements } from './types'

const initialState: IApp = {
  previewItems: [],
  runtime: false,
}

const slice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    addElement(state, action: PayloadAction<ElementType>) {
      if (action.payload === ElementType.TEXT_BOX) {
        state.previewItems.unshift(action.payload)
      } else {
        state.previewItems.push(action.payload)
      }
      return state
    },
    removeElement(state, action: PayloadAction<ElementType>) {
      state.previewItems = state.previewItems.filter(
        (item) => item !== action.payload
      )
    },
    moveElements(state, action: PayloadAction<IMoveElements>) {
      const { dragIndex, hoverIndex } = action.payload

      const temp = state.previewItems[dragIndex]
      state.previewItems[dragIndex] = state.previewItems[hoverIndex]
      state.previewItems[hoverIndex] = temp
    },
    setRuntime(state, action: PayloadAction<boolean>) {
      state.runtime = action.payload
    },
  },
})

export const { addElement, removeElement, moveElements, setRuntime } =
  slice.actions

export default slice.reducer
