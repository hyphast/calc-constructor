import React, { FC, useRef, useState } from 'react'
import cn from 'classnames'
import type { Identifier, XYCoord } from 'dnd-core'
import { useDispatch, useSelector } from 'react-redux'
import { useDrag, useDrop } from 'react-dnd'
import { NumberFormatValues, NumericFormat } from 'react-number-format'
import { ElementType } from '../../../store/app/types'
import commonStyle from '../DesignElements.module.scss'
import { useDragArgs } from '../../../hooks/useDragArgs'
import { ItemTypes } from '../../../hooks/types'
import { moveElements } from '../../../store/app/slice'
import {
  selectIsElementInPreview,
  selectPreviewItems,
} from '../../../store/app/selectors'
import { DesignElementProps } from '../DesignElements.types'
import styles from './TextBox.module.scss'
import { RootState } from '../../../store/store'

interface TextBoxProps extends DesignElementProps {
  isInactive: boolean
  movable: boolean
  notAllowed: boolean
}
export type Ref = React.RefObject<HTMLDivElement>
export const TextBox: FC<TextBoxProps> = React.forwardRef<Ref, TextBoxProps>(
  ({ stage, isInactive, movable, notAllowed }, ref) => {
    // const index = 0
    const [value, setValue] = useState(0)
    const onValueChange = (values: NumberFormatValues) => {
      const { floatValue, formattedValue } = values

      if (!floatValue) return

      setValue(floatValue)
    }

    // const notAllowed = stage === 'preview' || (stage === 'design' && isInactive)

    return (
      <div
        ref={ref as React.RefObject<HTMLDivElement>}
        // style={{
        //   opacity: isDragging ? 1 : 1,
        // }}
        // data-handler-id={handlerId}
        className={cn(commonStyle.elementContainer, {
          [commonStyle.movable]: movable,
          [styles.notAllowed]: notAllowed,
          [commonStyle.inactive]: isInactive,
        })}
      >
        <NumericFormat
          disabled
          value={value}
          onValueChange={onValueChange}
          className={cn(styles.textBox, {
            [commonStyle.movable]: movable,
            [styles.notAllowed]: notAllowed,
            [styles.inputWidth]: String(value).length > 8,
          })}
          isAllowed={() => stage === 'active'}
          // onBlur={onBlurInput}
          // onKeyDown={onPressEnter}
          thousandSeparator=" "
          allowNegative={false}
          decimalScale={16}
          decimalSeparator=","
        />
      </div>
    )
  }
)
