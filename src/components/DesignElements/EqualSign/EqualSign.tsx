import React, { FC } from 'react'
import cn from 'classnames'
import { calculate } from '../../../store/calculator/slice'
import { useAppDispatch } from '../../../store/store'
import { DesignElementProps, Ref } from '../DesignElements.types'
import { Dropzone } from '../Dropzone'
import commonStyle from '../DesignElements.module.scss'
import styles from './EqualSign.module.scss'

interface EqualSignProps extends DesignElementProps {}
export const EqualSign: FC<EqualSignProps> = React.forwardRef<
  Ref,
  EqualSignProps
>(({ stage, movable: disabled, isInactive, isOver }, ref) => {
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
        [commonStyle.designElement]: stage === 'design',
      })}
    >
      <Dropzone isOver={isOver} />
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
