// import { LoadBankPaymentModel } from '../../../../domain/models/load-bank-payment-model'

import { InvalidParamError } from '../../presentation/errors'
import { CalculateModuleEleven, CalculateModuleTen, CalculationDueDateFactor, GetInvoice, TransformBarCode, ValidateTypeable } from '../../validation/validators'

export class LoadBankPaymentUseCaseValidation {
  load (line: string): any {
    const verifyCode = new ValidateTypeable()
    const error = verifyCode.validate(line)
    if (error) {
      return error
    }

    if (line.length === 47) {
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
    } else {
      console.log('48 gitis')

      if (Number(line[0]) !== 8) {
        return new InvalidParamError('Is not Eight in first element')
      }
      const returnCode48 = new TransformBarCode(line.length)
      const barCode = returnCode48.getBarCode(line)
      const identificadordeValor = barCode[2]
      const digitoVerificador = barCode[3]
      const composicaoConveio = barCode.slice(0, 3) + barCode.slice(4)

      const composicaoRevert = Array.from(composicaoConveio).reverse()
      const numbersComposicaoRevert = composicaoRevert.map(Number)

      if (Number(identificadordeValor) === 6 || Number(identificadordeValor) === 7) {
        const calculateModule = new CalculateModuleTen()
        const dv = calculateModule.calculationModuleTen(numbersComposicaoRevert)

        const errorDigit = calculateModule.checkVerifiableDigitsConvenio(Number(digitoVerificador), Number(dv))

        if (errorDigit) {
          return errorDigit
        }
      } else if (Number(identificadordeValor) === 8 || Number(identificadordeValor) === 9) {
        const calculateModuleEleven = new CalculateModuleEleven()
        const codeVerification = calculateModuleEleven.getCodeVerification(barCode)
        const err = calculateModuleEleven.calculationModuleEleven(numbersComposicaoRevert, Number(codeVerification), 48)
        if (err) {
          return err
        }
      }
      const getInvoice = new GetInvoice(barCode.slice(4, 15))
      const amount = getInvoice.calculateValue()

      return {
        barCode,
        amount
      }
    }
  }
}
