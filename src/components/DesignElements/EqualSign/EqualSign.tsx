import React, { FC, useRef } from 'react'
import cn from 'classnames'
import type { Identifier, XYCoord } from 'dnd-core'
import { useDispatch } from 'react-redux'
import { useDrag, useDrop } from 'react-dnd'
import { ElementType } from '../../../store/app/types'
import commonStyle from '../DesignElements.module.scss'
import { useDragArgs } from '../../../hooks/useDragArgs'
import { ItemTypes } from '../../../hooks/types'
import { moveElements } from '../../../store/app/slice'
import { DesignElementProps } from '../DesignElements.types'
import styles from './EqualSign.module.scss'

interface EqualSignProps extends DesignElementProps {
  movable: boolean
  isInactive: boolean
}
export type Ref = React.RefObject<HTMLDivElement>
export const EqualSign: FC<EqualSignProps> = React.forwardRef<
  Ref,
  EqualSignProps
>(({ stage, movable: disabled, isInactive }, ref) => {
  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={cn(commonStyle.elementContainer, {
        [commonStyle.movable]: disabled,
        [commonStyle.inactive]: isInactive,
      })}
    >
      <button disabled={disabled} className={styles.equalSign} type="button">
        =
      </button>
    </div>
  )
})
