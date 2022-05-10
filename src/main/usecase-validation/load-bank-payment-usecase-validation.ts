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
    const threeFields = this.returnThreeField(transformBar)
    const digits: number[] = []

    const calculateModuleTenTitulo = new CalculateModuleTen()

    Object.entries(threeFields).forEach(
      ([key, value]) => {
        const vd = calculateModuleTenTitulo.calculationModuleTen(value)
        digits.push(vd)
      }
    )
    const er = calculateModuleTenTitulo.checkVerifiableDigitsTitle(line, digits)

    if (er) {
      return er
    }

    const calculateModuleElevenTitulo = new CalculateModuleEleven()
    const getPositions = this.getPositionsTitleForModuleEleven(transformBar)

    const codeVerification = this.getCodeVerificationTitleForModuleEleven(transformBar)
    const erCodeEleven = calculateModuleElevenTitulo.calculationModuleEleven(getPositions, codeVerification, 47)
    if (erCodeEleven) {
      return erCodeEleven
    }

    const price = transformBar.slice(10, 19) // valor

    const fieldDate = transformBar.slice(5, 9) // date

    const baseDate = new Date('10-07-1997')

    const getInvoice = new GetInvoice()
    const amount = getInvoice.calculateValue(price)
    const instanceCalculateDate = new CalculationDueDateFactor(baseDate)
    const barCode = transformBar
    const expirationDate = instanceCalculateDate.validateDate(Number(fieldDate))

    return {
      barCode,
      amount,
      expirationDate
    }
  }

  getPositionsTitleForModuleEleven (barCode: string): number[] {
    const field = barCode.slice(0, 4) + barCode.slice(5)
    const reverseArray = Array.from(field).reverse()
    const numbers = reverseArray.map(Number)
    return numbers
  }

  getCodeVerificationTitleForModuleEleven (barCode: string): number {
    const numberCodeVerification = parseInt(barCode[4])
    return numberCodeVerification
  }

  validationCovenant (line: string): Object {
    const code = new TransformBarCode(line.length)

    const barCode = code.getBarCode(line)
    const identificadordeValor = barCode[2] // verificador para calculo modulo 10 ou 11
    const digitoVerificador = line[3] // codigo verificador do codigo de barras

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
    } else if (identificadordeValor === '8' || identificadordeValor === '9') {
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

    const digit = this.verifyBarCodeDac(barCode)

    if (digit !== Number(digitoVerificador)) {
      return new InvalidParamError('Invalid verification digit')
    }

    const getInvoice = new GetInvoice()
    const amount = getInvoice.calculateValue(barCode.slice(4, 15))

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
