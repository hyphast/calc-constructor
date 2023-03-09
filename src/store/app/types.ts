export enum ElementType {
  'TEXT_BOX' = 'textBox',
  'OPERATIONS' = 'operationsBlock',
  'NUMBERS' = 'numbersBlock',
  'EQUAL' = 'equalSign',
}

export interface IApp {
  previewItems: ElementType[]
  runtime: boolean
}

export interface IMoveElements {
  dragIndex: number
  hoverIndex: number
}
