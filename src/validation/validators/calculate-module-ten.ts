import { InvalidParamError } from '../../presentation/errors'

export class CalculateModuleTen {
  calculationModuleTen (field: number[]): number {
    let multiplier = 2
    let sum = 0
    let total = 0
    for (let i = 0; i < field.length; i++) {
      if (multiplier % 2 === 0) {
        sum = multiplier * field[i]
        if (sum > 9) {
          const result = sum.toString().split('')
          const numbers = result.map(Number)
          total += numbers[0] + numbers[1]
        } else {
          total += sum
        }
        multiplier = 1
      } else {
        multiplier = 1
        total += multiplier * field[i]
        multiplier = 2
      }
    }

    const module = total % 10
    let digitVerification = 10 - module

    if (digitVerification === 10) {
      digitVerification = 0
    }

    return digitVerification
  }

  checkVerifiableDigits (digitline: string, digitsVerify: number[]): Error {
    const vdsDigitableLine = digitline[9] + digitline[20] + digitline[31]
    const result = vdsDigitableLine.toString().split('')
    const numbers = result.map(Number)

    if (!this.arrayEquals(numbers, digitsVerify)) {
      return new InvalidParamError('Invalid verification digit')
    }
  }

  checkVerifiableDigitsConvenio (digitline: string, digitsVerify: number[]): Error {
    const correctsVds = digitline.slice(11, 12) + digitline.slice(23, 24) + digitline.slice(35, 36) + digitline.slice(47, 48)
    const result = correctsVds.toString().split('')
    const numbers = result.map(Number)

    if (!this.arrayEquals(numbers, digitsVerify)) {
      return new InvalidParamError('Invalid verification digit')
    }
  }

  arrayEquals (arrayA: number[], arrayB: number[]): boolean {
    return Array.isArray(arrayA) &&
    Array.isArray(arrayB) &&
    arrayA.length === arrayB.length &&
    arrayA.every((val, index) => val === arrayB[index])
  }
}
