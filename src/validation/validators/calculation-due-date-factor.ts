// import { MissingParamError } from '../../presentation/errors'

export class CalculationDueDateFactor {
  constructor (private readonly date: Date) {}

  validateDate (days: number): string {
    const result = new Date(this.date.setDate(this.date.getDate() + days))
    const month = (result.getMonth() + 1).toString().padStart(2, '0')
    const day = result.getDate().toString().padStart(2, '0')
    const year = result.getFullYear()
    return [year, month, day].join('-')
  }
}
