import React, { useState, FC } from 'react'
import cn from 'classnames'
import { useDispatch, useSelector } from 'react-redux'
import { ReactComponent as CodeBracketsLogo } from '../../assets/code-brackets.svg'
import { ReactComponent as EyeLogo } from '../../assets/eye.svg'
import { selectIsRuntime } from '../../store/app/selectors'
import styles from './ModeSwitch.module.scss'
import { setRuntime } from '../../store/app/slice'

type ModeSwitchProps = {
  className?: string
}
export const ModeSwitch: FC<ModeSwitchProps> = ({ className }) => {
  const isRuntime = useSelector(selectIsRuntime)
  const dispatch = useDispatch()

  return (
    <div className={cn(className, styles.switchContainer)}>
      <div className={styles.switch}>
        <input
          type="checkbox"
          className={styles.switchInput}
          id="runtime"
          onClick={() => dispatch(setRuntime(true))}
        />
        <label
          htmlFor="runtime"
          className={cn(styles.switchLabel, styles.switchLabelOff)}
        >
          <EyeLogo className={cn({ [styles.activeMode]: isRuntime })} />
          Runtime
        </label>
        <input
          type="checkbox"
          className={styles.switchInput}
          id="constructor"
          onClick={() => dispatch(setRuntime(false))}
        />
        <label
          htmlFor="constructor"
          className={cn(styles.switchLabel, styles.switchLabelOn)}
        >
          <CodeBracketsLogo
            className={cn({ [styles.activeMode]: !isRuntime })}
          />
          Constructor
        </label>
        <span
          className={cn(styles.slider, { [styles.sliderRight]: !isRuntime })}
        />
      </div>
    </div>
  )
}
ModeSwitch.defaultProps = {
  className: '',
}
