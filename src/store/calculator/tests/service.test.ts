import { getCalculationResult, toFormattedString } from '../service'

describe('Calculator service: getCalculationResult', () => {
  test('correct plus', () => {
    expect(getCalculationResult('14', '2,42', '+')).toBe(16.42)
  })
  test('correct minus', () => {
    expect(getCalculationResult('5,2', '848,7', '-')).toBe(-843.5)
  })
  test('correct mul', () => {
    expect(getCalculationResult('4', '4', 'x')).toBe(16)
  })
  test('correct division', () => {
    expect(getCalculationResult('20', '4', '/')).toBe(5)
  })
  test('incorrect', () => {
    expect(getCalculationResult('', '', '/')).toBe(NaN)
  })
})

describe('Calculator service: toFormattedString', () => {
  test('correct case', () => {
    expect(toFormattedString(-843.5)).toBe('-843,5')
  })
  test('correct case', () => {
    expect(toFormattedString(6.35)).toBe('6,35')
  })
})
