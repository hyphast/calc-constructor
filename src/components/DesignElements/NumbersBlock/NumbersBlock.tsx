import React, { FC } from 'react'
import cn from 'classnames'
import { setOperand } from '../../../store/calculator/slice'
import { Operand } from '../../../store/calculator/types'
import { useAppDispatch } from '../../../store/store'
import { DesignElementProps, Ref } from '../DesignElements.types'
import { Dropzone } from '../Dropzone'
import commonStyle from '../DesignElements.module.scss'
import styles from './NumbersBlock.module.scss'

const numbersData: Operand[][] = [
  ['7', '8', '9'],
  ['4', '5', '6'],
  ['1', '2', '3'],
  ['0', ','],
]

interface NumbersBlockProps extends DesignElementProps {}
export const NumbersBlock: FC<NumbersBlockProps> = React.forwardRef<
  Ref,
  NumbersBlockProps
>(({ stage, movable: disabled, isInactive, isOver }, ref) => {
  const dispatch = useAppDispatch()

  const onNumberClick = (value: Operand) => {
    dispatch(setOperand(value))
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
      <table className={styles.numbers}>
        <tbody>
          {numbersData.map((tableRow, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <tr key={index}>
              {tableRow.map((tdValue) => (
                <td key={tdValue}>
                  <button
                    onClick={() => onNumberClick(tdValue)}
                    className={cn({ [styles.zero]: Number(tdValue) === 0 })}
                    disabled={disabled}
                    type="button"
                  >
                    {tdValue}
                  </button>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
})
