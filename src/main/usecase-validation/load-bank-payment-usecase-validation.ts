import { InvalidParamError } from '../../presentation/errors'
import { CalculateModuleEleven, CalculateModuleTen, CalculationDueDateFactor, GetInvoice, TransformBarCode, ValidateTypeable } from '../../validation/validators'

export class LoadBankPaymentUseCaseValidation {
  load (line: string): Object {
    const verifyCode = new ValidateTypeable()
    const error = verifyCode.validate(line)
    if (error) {
      return error
    }

    if (line.length === 47) {
      return this.validationTitle(line)
    } else {
      return this.validationCovenant(line)
    }
  }

  validationTitle (line: string): Object {
    const returnCode = new TransformBarCode(line.length)
    const transformBar = returnCode.getBarCode(line)

    // pegando tres arrays com os dados do codigo de barras para calcular e encontrar o DV
    const threeFields = this.returnThreeField(transformBar)
    const digits: number[] = []

    // instancia a classe que calcula o modulo 10
    const calculateModuleTenTitulo = new CalculateModuleTen()

    // passando cada array para o modulo 10
    Object.entries(threeFields).forEach(
      ([key, value]) => {
        // efetua o calculo do módulo 10
        const vd = calculateModuleTenTitulo.calculationModuleTen(value)
        // digitos verificadores
        digits.push(vd)
      }
    )
    const er = calculateModuleTenTitulo.checkVerifiableDigitsTitle(line, digits)

    if (er) {
      return er
    }

    // retorna para o calculo da posicao 1 a 4 e da posicao 6 a 44 do código de barras, menos posicao 5 (dígito verificador)
    const getPositions = this.getPositionsTitleForModuleEleven(transformBar)

    // dígito verificador
    const codeVerification = this.getCodeVerificationTitleForModuleEleven(transformBar)

    // instancia modulo 11
    const calculateModuleElevenTitulo = new CalculateModuleEleven()

    const erCodeEleven = calculateModuleElevenTitulo.calculationModuleEleven(getPositions, codeVerification, 47)
    // verifica erro modulo 11
    if (erCodeEleven) {
      return erCodeEleven
    }

    const price = transformBar.slice(10, 19) // valor

    const fieldDate = transformBar.slice(5, 9) // date

    const baseDate = new Date('10-07-1997')

    // calculo de valores a pagar
    const getInvoice = new GetInvoice()
    const amount = getInvoice.calculateValue(price)

    // calculo de fator de vencimento
    const instanceCalculateDate = new CalculationDueDateFactor(baseDate)
    const expirationDate = instanceCalculateDate.validateDate(Number(fieldDate))

    // obtem codigo de barras
    const barCode = transformBar
    return {
      barCode,
      amount,
      expirationDate
    }
  }

  getPositionsTitleForModuleEleven (barCode: string): number[] {
    const field = barCode.slice(0, 4) + barCode.slice(5) // posicoes 1 a 4 e 6 a 44
    const reverseArray = Array.from(field).reverse()
    const numbers = reverseArray.map(Number)
    return numbers
  }

  getCodeVerificationTitleForModuleEleven (barCode: string): number {
    const numberCodeVerification = parseInt(barCode[4]) // pega o dígito verificador da posicao 5
    return numberCodeVerification
  }

  validationCovenant (line: string): Object {
    // transforma em codigo de barras
    const code = new TransformBarCode(line.length)
    const barCode = code.getBarCode(line)

    const identificadordeValor = barCode[2] // verificador para calculo modulo 10 ou 11 (valor real ou referencia)
    const digitoVerificador = line[3] // digito verificador do codigo de barras

    // obtendo os 4 campos da linha digitável para calcular digitos verificadores
    // Convênio necessario verificar 4 dígitos (um pra cada campo) e pro código de barras verifica 1
    const forFields = this.returnFourFields(line)

    const calculateModuleTenCovenant = new CalculateModuleTen()
    const digits: number[] = []

    if (Number(identificadordeValor) === 6 || Number(identificadordeValor) === 7) {
      Object.entries(forFields).forEach(
        ([key, value]) => {
          const vd = calculateModuleTenCovenant.calculationModuleTen(value)
          digits.push(vd)
        }
      )
      const er = calculateModuleTenCovenant.checkVerifiableDigitsConvenio(line, digits)

      if (er) {
        return new InvalidParamError('Invalid verification digit')
      }
    } else if (Number(identificadordeValor) === 7 || Number(identificadordeValor) === 9) {
      // define a area de 43 posicoes não pegando o valor da posicao 4 que é dígito verificador
      const cut = barCode.slice(0, 3) + barCode.slice(4)
      const arrayFromBarCode = cut.split('')
      const arrayReverse = arrayFromBarCode.reverse()
      const arrayNumbers = arrayReverse.map(Number)
      const calculateModuleEleven = new CalculateModuleEleven()
      const err = calculateModuleEleven.calculationModuleEleven(arrayNumbers, Number(digitoVerificador), 48)
      if (err) {
        return err
      }
    }

    const getInvoice = new GetInvoice()
    const amount = getInvoice.calculateValue(barCode.slice(4, 15))

    return {
      barCode,
      amount
    }
  }

  returnFourFields (line: string): Object {
    const fieldOne = line.slice(0, 11)
    const fieldTwo = line.slice(12, 23)
    const fieldThree = line.slice(24, 35)
    const fieldFour = line.slice(36, 47)

    const fieldOneToArrayRev = Array.from(fieldOne).reverse()
    const fieldTwoToArrayRev = Array.from(fieldTwo).reverse()
    const fieldThreeToArrayRev = Array.from(fieldThree).reverse()
    const fieldFourToArrayRev = Array.from(fieldFour).reverse()
    return {
      fieldOneToArrayRev,
      fieldTwoToArrayRev,
      fieldThreeToArrayRev,
      fieldFourToArrayRev
    }
  }

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
}
