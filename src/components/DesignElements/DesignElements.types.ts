export type Stage = 'design' | 'preview' | 'active'

export interface DesignElementProps {
  stage: Stage
  movable: boolean
  isInactive: boolean
  notAllowed: boolean
  isOver?: boolean
}

export type Ref = React.RefObject<HTMLDivElement>
