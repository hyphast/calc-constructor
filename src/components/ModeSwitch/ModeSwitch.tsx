import cn from 'classnames'
import { FC } from 'react'
import { useSelector } from 'react-redux'
import { ReactComponent as CodeBracketsLogo } from '../../assets/code-brackets.svg'
import { ReactComponent as EyeLogo } from '../../assets/eye.svg'
import { selectIsRuntime } from '../../store/app/selectors'
import { setRuntime } from '../../store/app/slice'
import { resetCalculator } from '../../store/calculator/slice'
import { useAppDispatch } from '../../store/store'
import styles from './ModeSwitch.module.scss'

type ModeSwitchProps = {
  className?: string
}
export const ModeSwitch: FC<ModeSwitchProps> = ({ className }) => {
  const isRuntime = useSelector(selectIsRuntime)
  const dispatch = useAppDispatch()

  const toggleOn = () => {
    dispatch(setRuntime(true))
  }
  const toggleOff = () => {
    dispatch(setRuntime(false))
    dispatch(resetCalculator())
  }

  return (
    <div className={cn(className, styles.switchContainer)}>
      <div className={styles.switch}>
        <input
          type="checkbox"
          className={styles.switchInput}
          id="runtime"
          onClick={toggleOn}
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
          onClick={toggleOff}
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
