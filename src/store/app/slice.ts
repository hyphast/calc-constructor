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
        // state = { ...state, items: [...state.items, action.payload] }
        state.previewItems.push(action.payload)
      }
      return state
    },
    moveElements(state, action: PayloadAction<IMoveElements>) {
      const { dragIndex, hoverIndex } = action.payload

      const temp = state.previewItems[dragIndex]
      state.previewItems[dragIndex] = state.previewItems[hoverIndex]
      state.previewItems[hoverIndex] = temp

      // const temp = state.previewItems[dragIndex]

      // state.previewItems.splice(dragIndex, 1)
      // state.previewItems.splice(hoverIndex, 0, temp)
    },
    setRuntime(state, action: PayloadAction<boolean>) {
      state.runtime = action.payload
    },
  },
})

export const { addElement, moveElements, setRuntime } = slice.actions

export default slice.reducer
