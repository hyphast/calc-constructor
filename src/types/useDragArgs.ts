import { useMemo } from 'react'
// import { DragSourceMonitor } from 'react-dnd'
// import { ElementType } from '../store/app/types'
// import { Item, ItemTypes, UseDragArgsReturn } from './types'

// export const useDragArgs = (
//   elemType: ElementType,
//   index: number
// ): UseDragArgsReturn => {
//   const dragArgs = useMemo(
//     () => ({
//       type: ItemTypes.ELEM,
//       item: { elemType, index },
//       collect: (monitor: DragSourceMonitor<Item, unknown>) => ({
//         isDragging: !!monitor.isDragging(),
//       }),
//     }),
//     [elemType, index]
//   )

//   return dragArgs
// }
