import { Operand, Operator } from './types'

export const getCalculationResult = (
  firstOperand: string,
  secondOperand: string,
  operator: Operator
) => {
  const parsedFirstOperand = parseFloat(firstOperand.replace(',', '.'))
  const parsedSecondOperand = parseFloat(secondOperand.replace(',', '.'))

  let result
  switch (operator) {
    case '+':
      result = parsedFirstOperand + parsedSecondOperand
      break
    case '-':
      result = parsedFirstOperand - parsedSecondOperand
      break
    case 'x':
      result = parsedFirstOperand * parsedSecondOperand
      break
    case '/':
      result = parsedFirstOperand / parsedSecondOperand
      break
    default:
      return null
  }

  return result
}

export const isResultCorrect = (value: unknown): value is number => {
  return Number.isFinite(value) && value !== null
}

export const toFormattedString = (value: number) => {
  let fixedNum = value.toFixed(15) // maybe loss of precision

  if (fixedNum.includes('e')) {
    fixedNum = parseFloat(fixedNum).toExponential(12)
  }

  const resultWithoutTrailingZeros = String(parseFloat(fixedNum)).replace(
    '.',
    ','
  )

  return resultWithoutTrailingZeros
}

type SetOperandType = {
  operand: string
  char: Operand
  result: string | null
}
export const shouldSkipUpdate = ({ operand, char, result }: SetOperandType) => {
  const hasResultBeenShown = !result

  return (
    operand.length > 15 ||
    (char === ',' && operand.includes(',')) ||
    (operand === '0' && char === '0' && hasResultBeenShown)
  )
}

type GetNextCharType = SetOperandType & { currentOperand: string }
export const getNextChar = ({
  operand,
  char,
  result,
  currentOperand,
}: GetNextCharType) => {
  const hasResultBeenShown = result

  if (operand === '0' && char !== ',') {
    return char
  } else if (operand === '0' && char === ',' && hasResultBeenShown) {
    return operand + char
  } else {
    return currentOperand + char
  }
}
