import React from 'react'
import { useDrag } from 'react-dnd'
import { ItemTypes } from '../types/types'
import { ElementType } from '../store/app/types'

export function withAddDnD<T>(
  WrappedComponent: React.ComponentType<T>,
  elemType: ElementType
) {
  return (props: Omit<T, 'elemType'>) => {
    const [{ isDragging }, drag] = useDrag(() => ({
      type: ItemTypes.ELEM,
      item: { elemType },
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
    }))

    return <WrappedComponent ref={drag} elemType={elemType} {...(props as T)} />
  }
}
