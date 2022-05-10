import { InvalidParamError } from '../../presentation/errors'

export class CalculateModuleEleven {
  calculationModuleEleven (field: number[], vdCode: number, type: number): number | Error {
    const module = 11
    let multiplier = 2 // inicia a multiplicacao de cada algarismo pelo numero 2
    let total = 0
    for (let i = 0; i < field.length; i++) {
      if (multiplier > 9) { // se for igual a 9 ele volta a ser 2
        multiplier = 2
      }
      if (multiplier % 2 === 0) { // multiplicarndo por 2, 4, 6, 8
        total += multiplier * field[i]
        multiplier += 1
      } else { // multiplica por 1, 3, 5, 7
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
      } else if (verificationCode === 10) {
        verificationCode = 1
      }
    }

    if (verificationCode !== vdCode) {
      return new InvalidParamError('Invalid verification digit')
    }
  }
}
