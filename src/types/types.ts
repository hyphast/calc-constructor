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
