import { RootState } from '../store'
import { ElementType } from './types'

export const selectPreviewItems = (state: RootState) => state.app.previewItems

export const selectIsElementInPreview = (state: RootState, elem: ElementType) =>
  selectPreviewItems(state).some((item) => elem === item)

export const selectIsRuntime = (state: RootState) => state.app.runtime
