import cn from 'classnames'
import React, { FC } from 'react'
import { setOperator } from '../../../store/calculator/slice'
import { Operator } from '../../../store/calculator/types'
import { useAppDispatch } from '../../../store/store'
import commonStyle from '../DesignElements.module.scss'
import { DesignElementProps } from '../DesignElements.types'
import styles from './OperationsBlock.module.scss'

const operationsData: Operator[] = ['/', 'x', '-', '+']

interface OperationsBlockProps extends DesignElementProps {
  movable: boolean
  isInactive: boolean
}
export type Ref = React.RefObject<HTMLDivElement>
export const OperationsBlock: FC<OperationsBlockProps> = React.forwardRef<
  Ref,
  OperationsBlockProps
>(({ movable: disabled, isInactive }, ref) => {
  const dispatch = useAppDispatch()

  const onOperationClick = (value: Operator) => {
    dispatch(setOperator(value))
  }

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
            {operationsData.map((tdValue) => (
              <td key={tdValue}>
                <button
                  onClick={() => onOperationClick(tdValue)}
                  disabled={disabled}
                  type="button"
                >
                  {tdValue}
                </button>
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  )
})
