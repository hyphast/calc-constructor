import React, { FC, useRef } from 'react'
import cn from 'classnames'
import { useDrop } from 'react-dnd'
import { useSelector } from 'react-redux'
import AddNewElementIcon from '../../assets/add-new-element.svg'
import { withDisplayInfo } from '../../hoc/withDisplayInfo'
import { withMovable } from '../../hoc/withMovable'
import { selectIsRuntime, selectPreviewItems } from '../../store/app/selectors'
import { moveElements, removeElement } from '../../store/app/slice'
import { ElementType } from '../../store/app/types'
import { useAppDispatch } from '../../store/store'
import { Item, ItemTypes } from '../../types/types'
import {
  EqualSign,
  NumbersBlock,
  OperationsBlock,
  TextBox,
} from '../DesignElements'
import styles from './CalculatorPreview.module.scss'

const calculatorElements = {
  [ElementType.TEXT_BOX]: TextBox,
  [ElementType.OPERATIONS]: OperationsBlock,
  [ElementType.NUMBERS]: NumbersBlock,
  [ElementType.EQUAL]: EqualSign,
}

export const CalculatorPreview: FC = () => {
  const dispatch = useAppDispatch()
  const previewItems = useSelector(selectPreviewItems)
  const isRuntime = useSelector(selectIsRuntime)
  const itemsNumber = previewItems.length
  const refDrop = useRef<HTMLDivElement>(null)

  const [, drop] = useDrop(
    () => ({
      accept: ItemTypes.MOVE,
      canDrop: (item: Item) =>
        !previewItems.some((elem) => elem === item.elemType),
      drop: (item, monitor) => {
        if (!refDrop.current || !monitor.isOver({ shallow: true })) return

        dispatch(
          moveElements({
            dragIndex: itemsNumber,
            hoverIndex: itemsNumber,
            dragElemType: item.elemType,
          })
        )
      },
    }),
    [previewItems, itemsNumber]
  )

  const onElementDoubleClick = (type: ElementType) => {
    if (isRuntime) return

    dispatch(removeElement(type))
  }

  drop(refDrop)

  return (
    <div
      ref={refDrop}
      className={cn(styles.root, {
        [styles.layout]: itemsNumber || (!itemsNumber && isRuntime),
      })}
    >
      {!itemsNumber && !isRuntime ? (
        <>
          <img
            className={styles.addLogo}
            src={AddNewElementIcon}
            alt="add new element icon"
          />
          <h3 className={styles.heading}>Перетащите сюда</h3>
          <p className={styles.desc}>любой элемент из левой панели</p>
        </>
      ) : (
        <>
          {Object.values(previewItems).map((type, index) => {
            const ComponentWithDisplayInfo = withDisplayInfo(
              calculatorElements[type] as React.FC<any>
            )
            const Component = withMovable(ComponentWithDisplayInfo, {
              index,
              elemType: type,
            })

            return (
              <div onDoubleClick={() => onElementDoubleClick(type)} key={type}>
                <Component stage={isRuntime ? 'active' : 'preview'} />
              </div>
            )
          })}
        </>
      )}
    </div>
  )
}
