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
    removeElement(state, action: PayloadAction<ElementType>) {
      state.previewItems = state.previewItems.filter(
        (item) => item !== action.payload
      )
    },
    moveElements(state, action: PayloadAction<IMoveElements>) {
      const { dragIndex, hoverIndex, dragElemType } = action.payload

      const elementInPreview = state.previewItems.find(
        (item) => item === dragElemType
      )

      if (dragElemType === ElementType.TEXT_BOX && !elementInPreview) {
        state.previewItems.unshift(dragElemType)
        return
      }

      if (elementInPreview && dragIndex) {
        state.previewItems.splice(dragIndex, 1)
      }
      state.previewItems.splice(hoverIndex, 0, dragElemType)
    },
    setRuntime(state, action: PayloadAction<boolean>) {
      state.runtime = action.payload
    },
  },
})

export const { removeElement, moveElements, setRuntime } = slice.actions

export default slice.reducer
