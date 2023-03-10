import React from 'react'
import cn from 'classnames'
import { useDrop } from 'react-dnd'
import { useSelector } from 'react-redux'
import AddNewElementIcon from '../../assets/add-new-element.svg'
import { selectIsRuntime, selectPreviewItems } from '../../store/app/selectors'
import { addElement, removeElement } from '../../store/app/slice'
import { ElementType } from '../../store/app/types'
import {
  EqualSign,
  NumbersBlock,
  OperationsBlock,
  TextBox,
} from '../DesignElements'
import { useAppDispatch } from '../../store/store'
import { Item, ItemTypes } from '../../types/types'
import { withMoveDnD } from '../../hoc/withMoveDnD'
import { withDisplayInfo } from '../../hoc/withDisplayInfo'
import styles from './CalculatorPreview.module.scss'

const calculatorElements = {
  [ElementType.TEXT_BOX]: TextBox,
  [ElementType.OPERATIONS]: OperationsBlock,
  [ElementType.NUMBERS]: NumbersBlock,
  [ElementType.EQUAL]: EqualSign,
}

export const CalculatorPreview = () => {
  const dispatch = useAppDispatch()
  const elementTypes = useSelector(selectPreviewItems)
  const isRuntime = useSelector(selectIsRuntime)
  const itemsNumber = elementTypes.length

  const [{ isOver, canDrop }, drop] = useDrop(
    () => ({
      accept: ItemTypes.ELEM,
      canDrop: (item: Item) =>
        !elementTypes.some((elem) => elem === item.elemType), // TODO selector
      drop: (item: Item) => {
        dispatch(addElement(item.elemType))
      },
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
        canDrop: !!monitor.canDrop(),
      }),
    }),
    [elementTypes]
  )

  const onElementDoubleClick = (type: ElementType) => {
    console.log('double cli')

    dispatch(removeElement(type))
  }

  return (
    <div
      ref={drop}
      className={cn(styles.root, {
        [styles.preview]: itemsNumber || (!itemsNumber && isRuntime),
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
          {Object.values(elementTypes).map((type, index) => {
            const ComponentWithDisplayInfo = withDisplayInfo(
              calculatorElements[type] as React.FC<any>
            )
            const Component = withMoveDnD(ComponentWithDisplayInfo, {
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
