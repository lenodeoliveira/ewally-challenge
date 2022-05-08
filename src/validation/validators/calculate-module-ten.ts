import { InvalidParamError } from '../../presentation/errors'

export class CalculateModuleTen {
  returnThreeField (barCode: string): Object {
    const fieldOne = barCode.slice(0, 4) + barCode.slice(19, 24)
    const fieldTwo = barCode.slice(24, 34)
    const fieldThree = barCode.slice(34, 44)

    const fieldOneToArrayRev = Array.from(fieldOne).reverse()
    const fieldTwoToArrayRev = Array.from(fieldTwo).reverse()
    const fieldThreeToArrayRev = Array.from(fieldThree).reverse()
    return {
      fieldOneToArrayRev,
      fieldTwoToArrayRev,
      fieldThreeToArrayRev
    }
  }

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

  arrayEquals (arrayA: number[], arrayB: number[]): boolean {
    return Array.isArray(arrayA) &&
    Array.isArray(arrayB) &&
    arrayA.length === arrayB.length &&
    arrayA.every((val, index) => val === arrayB[index])
  }
}
