import { FC } from 'react'
import commonStyle from './DesignElements.module.scss'

type DropzoneProps = {
  isOver: boolean | undefined
}
export const Dropzone: FC<DropzoneProps> = ({ isOver }) => {
  return (
    <>
      {isOver && (
        <div className={commonStyle.dropzone}>
          <hr />
        </div>
      )}
    </>
  )
}
