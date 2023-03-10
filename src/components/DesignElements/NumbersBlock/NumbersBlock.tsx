import cn from 'classnames'
import React, { FC } from 'react'
import { setOperand } from '../../../store/calculator/slice'
import { useAppDispatch } from '../../../store/store'
import commonStyle from '../DesignElements.module.scss'
import { DesignElementProps } from '../DesignElements.types'
import styles from './NumbersBlock.module.scss'

const numbersData = [
  ['7', '8', '9'],
  ['4', '5', '6'],
  ['1', '2', '3'],
  ['0', ','],
]

interface NumbersBlockProps extends DesignElementProps {
  movable: boolean
  isInactive: boolean
}
type Ref = React.RefObject<HTMLDivElement>
export const NumbersBlock: FC<NumbersBlockProps> = React.forwardRef<
  Ref,
  NumbersBlockProps
>(({ movable: disabled, isInactive }, ref) => {
  const dispatch = useAppDispatch()

  const onNumberClick = (value: string) => {
    dispatch(setOperand(value))
  }

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
