import { useMemo } from 'react'
import { DragSourceMonitor } from 'react-dnd'
import { useSelector } from 'react-redux'
import { Item, ItemTypes, UseDragArgsReturn } from './types'
import { selectPreviewItems } from '../store/app/selectors'
import { ElementType } from '../store/app/types'

export const useDragArgs = (
  elemType: ElementType,
  index: number
): UseDragArgsReturn => {
  const elementTypes = useSelector(selectPreviewItems)

  const dragArgs = useMemo(
    () => ({
      type: ItemTypes.ELEM,
      item: { elemType, index },
      // canDrag: (item: Item) =>
      //   !elementTypes.some((elem) => elem === item.elemType),
      collect: (monitor: DragSourceMonitor<Item, unknown>) => ({
        isDragging: !!monitor.isDragging(),
      }),
    }),
    [elemType, index]
  )

  return dragArgs
}
