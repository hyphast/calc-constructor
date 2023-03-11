import React from 'react'
import { useDrag } from 'react-dnd'
import { ItemTypes } from '../types/types'
import { ElementType } from '../store/app/types'
import { useSelector } from 'react-redux'
import { selectIsElementInPreview } from '../store/app/selectors'
import { RootState } from '../store/store'

export function withDraggable<T>(
  WrappedComponent: React.ComponentType<T>,
  elemType: ElementType
) {
  return (props: Omit<T, 'elemType' | 'isOver'>) => {
    const isInPreview = useSelector((state: RootState) =>
      selectIsElementInPreview(state, elemType)
    )

    const [, drag] = useDrag(
      () => ({
        type: ItemTypes.MOVE,
        item: { index: null, elemType },
        canDrag: () => !isInPreview,
      }),
      [isInPreview]
    )

    return <WrappedComponent ref={drag} elemType={elemType} {...(props as T)} />
  }
}
