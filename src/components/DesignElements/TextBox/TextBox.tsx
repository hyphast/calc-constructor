import React, { FC } from 'react'
import cn from 'classnames'
import { NumericFormat } from 'react-number-format'
import { useSelector } from 'react-redux'
import { selectCalculatorOperand } from '../../../store/calculator/selectors'
import { DesignElementProps, Ref } from '../DesignElements.types'
import commonStyle from '../DesignElements.module.scss'
import styles from './TextBox.module.scss'

interface TextBoxProps extends DesignElementProps {}
export const TextBox: FC<TextBoxProps> = React.forwardRef<Ref, TextBoxProps>(
  ({ stage, isInactive, movable, notAllowed }, ref) => {
    const value = useSelector(selectCalculatorOperand)

    return (
      <div
        ref={ref as React.RefObject<HTMLDivElement>}
        className={cn(commonStyle.elementContainer, {
          [commonStyle.movable]: movable,
          [styles.notAllowed]: notAllowed,
          [commonStyle.inactive]: isInactive,
        })}
      >
        {value === 'Не определено' ? (
          <input
            disabled
            className={cn(styles.textBox, styles.NaN)}
            defaultValue={value}
            type="text"
          />
        ) : (
          <NumericFormat
            disabled
            value={value}
            className={cn(styles.textBox, {
              [commonStyle.movable]: movable,
              [styles.notAllowed]: notAllowed,
              [styles.inputWidth]: String(value).length > 8,
            })}
            isAllowed={() => stage === 'active'}
            thousandSeparator=" "
            decimalScale={16}
            decimalSeparator=","
          />
        )}
      </div>
    )
  }
)
