import { CalculationDueDateFactor } from './calculation-due-date-factor'

describe('Calculation the due date factor', () => {
  test('should return 2000-07-03 according to the data factorial', () => {
    const baseDate = new Date('10-07-1997')
    const sut = new CalculationDueDateFactor(baseDate)
    const result = sut.validateDate(1000)
    expect(result).toBe('2000-07-03')
  })
})
