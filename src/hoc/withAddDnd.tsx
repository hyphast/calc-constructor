import React, { ComponentType } from 'react'
import { DragSourceMonitor, useDrag } from 'react-dnd'
import { Stage } from '../components/DesignElements/DesignElements.types'
import { ItemTypes } from '../hooks/types'
import { ElementType } from '../store/app/types'

export function withAddDnD<T>(
  WrappedComponent: React.ComponentType<T>,
  elemType: ElementType
) {
  return (props: Omit<T, 'elemType'>) => {
    const [{ isDragging }, drag] = useDrag(() => ({
      type: ItemTypes.ELEM,
      item: { elemType },
      // canDrag: (item: Item) =>
      //   !elementTypes.some((elem) => elem === item.elemType),
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
    }))

    return <WrappedComponent ref={drag} elemType={elemType} {...(props as T)} />
  }
}
