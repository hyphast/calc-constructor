import React, { FC, useRef } from 'react'
import cn from 'classnames'
import type { Identifier, XYCoord } from 'dnd-core'
import { useDispatch } from 'react-redux'
import { useDrag, useDrop } from 'react-dnd'
import { ElementType } from '../../../store/app/types'
import { moveElements } from '../../../store/app/slice'
import commonStyle from '../DesignElements.module.scss'
import { useDragArgs } from '../../../hooks/useDragArgs'
import { ItemTypes } from '../../../hooks/types'
import { DesignElementProps } from '../DesignElements.types'
import styles from './NumbersBlock.module.scss'

interface NumbersBlockProps extends DesignElementProps {
  movable: boolean
  isInactive: boolean
}
export type Ref = React.RefObject<HTMLDivElement>
export const NumbersBlock: FC<NumbersBlockProps> = React.forwardRef<
  Ref,
  NumbersBlockProps
>(({ stage, movable: disabled, isInactive }, ref) => {
  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={cn(commonStyle.elementContainer, {
        [commonStyle.movable]: disabled,
        [commonStyle.inactive]: isInactive,
      })}
    >
      <table className={styles.numbers}>
        <tbody>
          <tr>
            <td>
              <button disabled={disabled} type="button">
                7
              </button>
            </td>
            <td>
              <button disabled={disabled} type="button">
                8
              </button>
            </td>
            <td>
              <button disabled={disabled} type="button">
                9
              </button>
            </td>
          </tr>
          <tr>
            <td>
              <button disabled={disabled} type="button">
                4
              </button>
            </td>
            <td>
              <button disabled={disabled} type="button">
                5
              </button>
            </td>
            <td>
              <button disabled={disabled} type="button">
                6
              </button>
            </td>
          </tr>
          <tr>
            <td>
              <button disabled={disabled} type="button">
                1
              </button>
            </td>
            <td>
              <button disabled={disabled} type="button">
                2
              </button>
            </td>
            <td>
              <button disabled={disabled} type="button">
                3
              </button>
            </td>
          </tr>
          <tr>
            <td>
              <button disabled={disabled} className={styles.zero} type="button">
                0
              </button>
            </td>
            <td>
              <button disabled={disabled} type="button">
                ,
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
})
