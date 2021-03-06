import { InvalidParamError } from '../../presentation/errors'

export class CalculateModuleTen {
  calculationModuleTen (field: number[]): number {
    let multiplier = 2 // multiplicador começando sempre em 2
    let sum = 0
    let total = 0
    for (let i = 0; i < field.length; i++) {
      if (multiplier % 2 === 0) {
        sum = multiplier * field[i]
        if (sum > 9) { // caso o resultado seja maior que nove
          const result = sum.toString().split('') // transforma em array [1, 7]
          const numbers = result.map(Number) // array de numeros
          total += numbers[0] + numbers[1] // 1 + 7
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

    const rest = total % 10
    let digitVerification = 10 - rest

    if (digitVerification === 10) {
      digitVerification = 0
    }

    return digitVerification
  }

  checkVerifiableDigitsTitle (digitline: string, digitsVerify: number[]): Error {
    const vdsDigitableLine = digitline[9] + digitline[20] + digitline[31] // pengando os digitos verificáveis da linha digitável
    const result = vdsDigitableLine.toString().split('')
    const numbers = result.map(Number)

    if (!this.arrayEquals(numbers, digitsVerify)) {
      return new InvalidParamError('Invalid verification digit')
    }
  }

  checkVerifiableDigitsConvenio (digitline: string, digitsVerify: number[]): Error {
    // pegando somente os digitos verificadores da linha digitavel de convenio  para fazer comparação comparacao com resultado
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
