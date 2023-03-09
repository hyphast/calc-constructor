import React, { ComponentType } from 'react'
import { DragSourceMonitor, useDrag } from 'react-dnd'
import { useSelector } from 'react-redux'
import { Stage } from '../components/DesignElements/DesignElements.types'
import { ItemTypes } from '../hooks/types'
import { selectIsElementInPreview } from '../store/app/selectors'
import { ElementType } from '../store/app/types'
import { RootState } from '../store/store'

type Ref = HTMLDivElement

export function withDisplayInfo<T>(WrappedComponent: React.ComponentType<T>) {
  type WrappedComponentProps = Omit<
    T,
    'movable' | 'isInactive' | 'notAllowed'
  > & {
    elemType: ElementType
    stage: Stage
  }

  return React.forwardRef<Ref, WrappedComponentProps>((props, ref) => {
    const isInPreview = useSelector((state: RootState) =>
      selectIsElementInPreview(state, props.elemType)
    )

    const { stage } = props

    const movable = stage === 'design' || stage === 'preview'
    const isInactive = isInPreview && stage === 'design'
    const notAllowed =
      stage === 'preview' && props.elemType === ElementType.TEXT_BOX

    return (
      <WrappedComponent
        ref={ref}
        movable={movable}
        isInactive={isInactive}
        notAllowed={notAllowed}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...(props as T)}
      />
    )
  })
}
