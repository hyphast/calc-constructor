import { DragSourceMonitor } from 'react-dnd'
import { ElementType } from '../store/app/types'

export const ItemTypes = {
  ELEM: 'add',
  MOVE: 'move',
}

export type Item = {
  elemType: ElementType
  index: number
}

export type UseDragArgsReturn = {
  type: string
  item: Item
  collect: (monitor: DragSourceMonitor<Item, unknown>) => {
    isDragging: boolean
  }
}
