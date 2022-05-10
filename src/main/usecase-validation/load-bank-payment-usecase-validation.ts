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
    const calculateModuleTenTitulo = new CalculateModuleTen()
    const threeFields = calculateModuleTenTitulo.returnThreeField(transformBar)
    const digits: number[] = []
    Object.entries(threeFields).forEach(
      ([key, value]) => {
        const vd = calculateModuleTenTitulo.calculationModuleTen(value)
        digits.push(vd)
      }
    )
    const er = calculateModuleTenTitulo.checkVerifiableDigits(line, digits)
    if (er) {
      return er
    }
    const calculateModuleElevenTitulo = new CalculateModuleEleven()
    const getPositions = calculateModuleElevenTitulo.getPositions(transformBar)

    const codeVerification = calculateModuleElevenTitulo.getCodeVerification(transformBar)
    const erCodeEleven = calculateModuleElevenTitulo.calculationModuleEleven(getPositions, codeVerification, 47)
    if (erCodeEleven) {
      return erCodeEleven
    }

    const price = transformBar.slice(10, 19) // valor

    const fieldDate = transformBar.slice(5, 9) // date

    const baseDate = new Date('10-07-1997')

    const getInvoice = new GetInvoice(price)
    const amount = getInvoice.calculateValue()
    const instanceCalculateDate = new CalculationDueDateFactor(baseDate)
    const barCode = transformBar
    const expirationDate = instanceCalculateDate.validateDate(Number(fieldDate))

    return {
      barCode,
      amount,
      expirationDate
    }
  }

  validationCovenant (line: string): Object {
    const returnCode48 = new TransformBarCode(line.length)

    const barCode = returnCode48.getBarCode(line)
    const identificadordeValor = barCode[2] // verificador para calculo modulo 10 ou 11
    const digitoVerificador = line[3] // codigo verificador do codigo de barras
    console.log(digitoVerificador)
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
    }

    const digit = this.verifyBarCodeDac(barCode)

    if (digit !== Number(digitoVerificador)) {
      return new InvalidParamError('Invalid verification digit')
    }

    const getInvoice = new GetInvoice(barCode.slice(4, 15))
    const amount = getInvoice.calculateValue()

    return {
      barCode,
      amount
    }
  }

  verifyBarCodeDac (barCode: string): Object {
    const cut = barCode.slice(0, 3) + barCode.slice(4)
    const arrayFromBarCode = cut.split('')
    const arrayReverse = arrayFromBarCode.reverse()
    const identificadordeValor = barCode[2] // verificador para calculo modulo 10 ou 11
    const digitoVerificador = barCode[3] // codigo verificador do codigo de barras
    const arrayNumbers = arrayReverse.map(Number)

    if (identificadordeValor === '6' || identificadordeValor === '7') {
      const calculateModule = new CalculateModuleTen()
      const dv = calculateModule.calculationModuleTen(arrayNumbers)
      return Number(dv)
    } else if (identificadordeValor === '8' || identificadordeValor === '9') {
      const calculateModuleEleven = new CalculateModuleEleven()
      const err = calculateModuleEleven.calculationModuleEleven(arrayNumbers, Number(digitoVerificador), 48)
      if (err) {
        return err
      }
    }
  }

  returnFourFields (barCode: string): Object {
    const fieldOne = barCode.slice(0, 11)
    const fieldTwo = barCode.slice(12, 23)
    const fieldThree = barCode.slice(24, 35)
    const fieldFour = barCode.slice(36, 47)

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
}
