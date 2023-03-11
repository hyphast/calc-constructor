import React, { useRef } from 'react'
import type { Identifier } from 'dnd-core'
import { useDrag, useDrop } from 'react-dnd'
import { useSelector } from 'react-redux'
import { selectIsRuntime } from '../store/app/selectors'
import { moveElements } from '../store/app/slice'
import { ElementType } from '../store/app/types'
import { useAppDispatch } from '../store/store'
import { ItemTypes } from '../types/types'

interface WithMovableProps {
  index: number
  elemType: ElementType
}
export function withMovable<T>(
  WrappedComponent: React.ComponentType<T>,
  hocProps: WithMovableProps
) {
  const { index, elemType } = hocProps

  return (props: Omit<T, 'data-handler-id' | 'isOver'>) => {
    const dispatch = useAppDispatch()
    const ref = useRef<HTMLDivElement | null>(null)
    const isRuntime = useSelector(selectIsRuntime)

    const [, drag] = useDrag(
      () => ({
        type: ItemTypes.MOVE,
        item: { index, elemType },
        canDrag: () => elemType !== ElementType.TEXT_BOX && !isRuntime,
      }),
      [isRuntime]
    )

    const [{ handlerId, isOver }, drop] = useDrop<
      Pick<WithMovableProps, 'elemType'> & { index: number | null },
      void,
      { handlerId?: Identifier | null; isOver: boolean }
    >({
      accept: ItemTypes.MOVE,
      collect(monitor) {
        return {
          handlerId: monitor.getHandlerId(),
          isOver: monitor.isOver(),
        }
      },
      canDrop: () => !isRuntime && elemType !== ElementType.TEXT_BOX,
      drop(item) {
        if (!ref.current) return

        const dragIndex = item.index
        const hoverIndex = index

        dispatch(
          moveElements({ dragIndex, hoverIndex, dragElemType: item.elemType })
        )

        // Note: we're mutating the monitor item here!
        // Generally it's better to avoid mutations,
        // but it's good here for the sake of performance
        // to avoid expensive index searches.
        item.index = hoverIndex
      },
    })

    drag(drop(ref))

    return (
      <WrappedComponent
        ref={ref}
        data-handler-id={handlerId}
        elemType={elemType}
        isOver={isOver}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...(props as T)}
      />
    )
  }
}
