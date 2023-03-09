import React, { useRef, useState } from 'react'
import type { Identifier, XYCoord } from 'dnd-core'
import { DragSourceMonitor, useDrag, useDrop } from 'react-dnd'
import { useDispatch, useSelector } from 'react-redux'
import { ItemTypes } from '../hooks/types'
import { moveElements } from '../store/app/slice'
import { useDragArgs } from '../hooks/useDragArgs'
import { ElementType } from '../store/app/types'
import { selectPreviewItems } from '../store/app/selectors'

interface WithMoveDnDProps {
  index: number
  elemType: ElementType
}
export function withMoveDnD<T>(
  WrappedComponent: React.ComponentType<T>,
  hocProps: WithMoveDnDProps
) {
  const { index, elemType } = hocProps

  return (props: Omit<T, 'data-handler-id'>) => {
    const dispatch = useDispatch()
    const ref = useRef<HTMLDivElement | null>(null)
    const elementTypes = useSelector(selectPreviewItems)

    // const dragArgs = useDragArgs(ElementType.TEXT_BOX, index)
    const [{ isDragging }, drag] = useDrag(() => ({
      type: ItemTypes.MOVE,
      item: { index, elemType },
      canDrag: () => elemType !== ElementType.TEXT_BOX,
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
    }))

    const [{ handlerId }, drop] = useDrop<
      WithMoveDnDProps,
      void,
      { handlerId?: Identifier | null }
    >({
      accept: ItemTypes.MOVE,
      collect(monitor) {
        return {
          handlerId: monitor.getHandlerId(),
          isOver: monitor.isOver(),
        }
      },
      hover(item: WithMoveDnDProps, monitor) {
        // if (!elementTypes.some((elem) => elem === item.elemType)) {
        //   return
        // }
        if (!ref.current) {
          return
        }
        const dragIndex = item.index
        const hoverIndex = index

        // Don't replace items with themselves
        if (dragIndex === hoverIndex) {
          return
        }

        // Don't replace items with themselves
        if (elementTypes[hoverIndex] === ElementType.TEXT_BOX) {
          return
        }

        // Determine rectangle on screen
        const hoverBoundingRect = ref.current?.getBoundingClientRect()

        // Get vertical middle
        const hoverMiddleY =
          (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2

        // Determine mouse position
        const clientOffset = monitor.getClientOffset()

        // Get pixels to the top
        const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top

        // Only perform the move when the mouse has crossed half of the items height
        // When dragging downwards, only move when the cursor is below 50%
        // When dragging upwards, only move when the cursor is above 50%

        // Dragging downwards
        if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
          // setLinePreview('bottom')
          return
        }

        // Dragging upwards
        if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
          // setLinePreview('top')
          return
        }

        // Time to actually perform the action
        dispatch(moveElements({ dragIndex, hoverIndex }))

        // Note: we're mutating the monitor item here!
        // Generally it's better to avoid mutations,
        // but it's good here for the sake of performance
        // to avoid expensive index searches.
        item.index = hoverIndex
      },
    })

    drag(drop(ref))

    // props comes afterwards so the can override the default ones.
    return (
      <WrappedComponent
        ref={ref}
        data-handler-id={handlerId}
        elemType={elemType}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...(props as T)}
      />
    )
  }
}