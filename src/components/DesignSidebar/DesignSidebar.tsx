import { FC } from 'react'
import cn from 'classnames'
import { useSelector } from 'react-redux'
import { withDraggable } from '../../hoc/withDraggable'
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

const TextBoxWithDnD = withDraggable(
  withDisplayInfo(TextBox),
  ElementType.TEXT_BOX
)
const OperationsBlockWithDnD = withDraggable(
  withDisplayInfo(OperationsBlock),
  ElementType.OPERATIONS
)
const NumbersBlockWithDnD = withDraggable(
  withDisplayInfo(NumbersBlock),
  ElementType.NUMBERS
)
const EqualSignWithDnD = withDraggable(
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
