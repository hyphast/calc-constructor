import cn from 'classnames'
import React, { FC } from 'react'
import { calculate } from '../../../store/calculator/slice'
import { useAppDispatch } from '../../../store/store'
import commonStyle from '../DesignElements.module.scss'
import { DesignElementProps } from '../DesignElements.types'
import styles from './EqualSign.module.scss'

interface EqualSignProps extends DesignElementProps {
  movable: boolean
  isInactive: boolean
}
type Ref = React.RefObject<HTMLDivElement>
export const EqualSign: FC<EqualSignProps> = React.forwardRef<
  Ref,
  EqualSignProps
>(({ movable: disabled, isInactive }, ref) => {
  const dispatch = useAppDispatch()

  const onEqualClick = () => {
    dispatch(calculate())
  }

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={cn(commonStyle.elementContainer, {
        [commonStyle.movable]: disabled,
        [commonStyle.inactive]: isInactive,
      })}
    >
      <button
        onClick={onEqualClick}
        disabled={disabled}
        className={styles.equalSign}
        type="button"
      >
        =
      </button>
    </div>
  )
})
