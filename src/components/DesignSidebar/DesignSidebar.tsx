import cn from 'classnames'
import { FC } from 'react'
import { useSelector } from 'react-redux'
import { withAddDnD } from '../../hoc/withAddDnd'
import { withDisplayInfo } from '../../hoc/withDisplayInfo'
import { selectIsRuntime } from '../../store/app/selectors'
import { ElementType } from '../../store/app/types'
import {
  EqualSign,
  NumbersBlock,
  OperationsBlock,
  TextBox,
} from '../DesignElements'
import styles from './DesignSidebar.module.scss'

type DesignSidebarProps = {
  className?: string
}

const TextBoxWithDnD = withAddDnD(
  withDisplayInfo(TextBox),
  ElementType.TEXT_BOX
)
const OperationsBlockWithDnD = withAddDnD(
  withDisplayInfo(OperationsBlock),
  ElementType.OPERATIONS
)
const NumbersBlockWithDnD = withAddDnD(
  withDisplayInfo(NumbersBlock),
  ElementType.NUMBERS
)
const EqualSignWithDnD = withAddDnD(
  withDisplayInfo(EqualSign),
  ElementType.EQUAL
)

export const DesignSidebar: FC<DesignSidebarProps> = ({ className }) => {
  const isRuntime = useSelector(selectIsRuntime)

  return (
    <div className={styles.designContainer}>
      {!isRuntime && (
        <div className={cn(className, styles.root)}>
          <TextBoxWithDnD stage="design" />
          <OperationsBlockWithDnD stage="design" />
          <NumbersBlockWithDnD stage="design" />
          <EqualSignWithDnD stage="design" />
        </div>
      )}
    </div>
  )
}
DesignSidebar.defaultProps = {
  className: '',
}
