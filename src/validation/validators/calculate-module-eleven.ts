import { InvalidParamError } from '../../presentation/errors'

export class CalculateModuleEleven {
  getPositions (barCode: string): number[] {
    const field = barCode.slice(0, 4) + barCode.slice(5)
    const reverseArray = Array.from(field).reverse()
    this.getCodeVerification(barCode[4])
    const numbers = reverseArray.map(Number)
    return numbers
  }

  getCodeVerification (barCode: string): number {
    const numberCodeVerification = parseInt(barCode[4])
    return numberCodeVerification
  }

  calculationModuleEleven (field: number[], vdCode: number, type: number): number | Error {
    const module = 11
    let multiplier = 2
    let total = 0
    for (let i = 0; i < field.length; i++) {
      if (multiplier > 9) {
        multiplier = 2
      }
      if (multiplier % 2 === 0) {
        total += multiplier * field[i]
        multiplier += 1
      } else {
        total += multiplier * field[i]
        multiplier += 1
      }
    }

    const rest = total % module
    let verificationCode = module - rest

    if (type === 47) {
      if (verificationCode === 0 || verificationCode === 10 || verificationCode === 11) {
        verificationCode = 1
      }
    } else if (type === 48) {
      if (verificationCode === 0 || verificationCode === 1) {
        verificationCode = 0
      } else if (verificationCode === 0) {
        verificationCode = 1
      }
    }

    if (verificationCode !== vdCode) {
      return new InvalidParamError('Invalid verification digit')
    }
  }
}
