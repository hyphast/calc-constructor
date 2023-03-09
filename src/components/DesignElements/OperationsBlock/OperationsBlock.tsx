import React, { FC, useRef } from 'react'
import cn from 'classnames'
import { useDispatch } from 'react-redux'
import type { Identifier, XYCoord } from 'dnd-core'
import { useDrag, useDrop } from 'react-dnd'
import { ElementType } from '../../../store/app/types'
import commonStyle from '../DesignElements.module.scss'
import { useDragArgs } from '../../../hooks/useDragArgs'
import { ItemTypes } from '../../../hooks/types'
import { moveElements } from '../../../store/app/slice'
import { DesignElementProps } from '../DesignElements.types'
import styles from './OperationsBlock.module.scss'

interface OperationsBlockProps extends DesignElementProps {
  movable: boolean
  isInactive: boolean
}
export type Ref = React.RefObject<HTMLDivElement>
export const OperationsBlock: FC<OperationsBlockProps> = React.forwardRef<
  Ref,
  OperationsBlockProps
>(({ stage, movable: disabled, isInactive }, ref) => {
  return (
    <div
      draggable
      ref={ref as React.RefObject<HTMLDivElement>}
      className={cn(commonStyle.elementContainer, {
        [commonStyle.movable]: disabled,
        [commonStyle.inactive]: isInactive,
      })}
    >
      <table className={styles.operations}>
        <tbody>
          <tr>
            <td>
              <button disabled={disabled} type="button">
                /
              </button>
            </td>
            <td>
              <button disabled={disabled} type="button">
                x
              </button>
            </td>
            <td>
              <button disabled={disabled} type="button">
                -
              </button>
            </td>
            <td>
              <button disabled={disabled} type="button">
                +
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
})
