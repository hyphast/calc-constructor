import React, { FC } from 'react'
import cn from 'classnames'
import { setOperatorWithCalculation } from '../../../store/calculator/asyncActions'
import { Operator } from '../../../store/calculator/types'
import { useAppDispatch } from '../../../store/store'
import { DesignElementProps, Ref } from '../DesignElements.types'
import { Dropzone } from '../Dropzone'
import commonStyle from '../DesignElements.module.scss'
import styles from './OperationsBlock.module.scss'

const operationsData: Operator[] = ['/', 'x', '-', '+']

interface OperationsBlockProps extends DesignElementProps {}
export const OperationsBlock: FC<OperationsBlockProps> = React.forwardRef<
  Ref,
  OperationsBlockProps
>(({ stage, movable: disabled, isInactive, isOver }, ref) => {
  const dispatch = useAppDispatch()

  const onOperationClick = (value: Operator) => {
    dispatch(setOperatorWithCalculation(value))
  }

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={cn(commonStyle.elementContainer, {
        [commonStyle.movable]: disabled,
        [commonStyle.inactive]: isInactive,
        [commonStyle.designElement]: stage === 'design',
      })}
    >
      <Dropzone isOver={isOver} />
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
