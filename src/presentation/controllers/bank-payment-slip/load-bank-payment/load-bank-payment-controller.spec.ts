import { LoadBankPaymentController } from './load-bank-payment-controller'
import { LoadBankPaymentModel, LoadBankPayment, CodeValidator, HttpRequest } from './load-bank-payment-controller-protocols'
import { badRequest, ok, serverError } from '../../../helpers/http/http-helper'
import { InvalidParamError, ServerError } from '../../../errors'

const makeFakeBankPayment = (): LoadBankPaymentModel => ({
  amount: '20.00',
  expirationDate: '2018-07-16',
  barCode: '21299758700000020000001121100012100447561740'
})

const makeFakeRequest = (): HttpRequest => ({
  params: {
    barCode: '21290001192110001210904475617405975870000002000'
  }
})

const makeValidation = (): CodeValidator => {
  class ValidationStub implements CodeValidator {
    validate (code: string): Error {
      return null
    }
  }
  return new ValidationStub()
}
interface SutTypes {
  sut: LoadBankPaymentController
  loadBankPaymentStub: LoadBankPayment
  validationStub: CodeValidator
}

const makeLoadBankPaymentStub = (): LoadBankPayment => {
  class LoadBankPaymentStub implements LoadBankPayment {
    async load (): Promise<LoadBankPaymentModel> {
      return await new Promise(resolve => resolve(makeFakeBankPayment()))
    }
  }
  return new LoadBankPaymentStub()
}

const makeSut = (): SutTypes => {
  const loadBankPaymentStub = makeLoadBankPaymentStub()
  const validationStub = makeValidation()
  const sut = new LoadBankPaymentController(loadBankPaymentStub, validationStub)
  return {
    sut,
    loadBankPaymentStub,
    validationStub
  }
}

describe('LoadBankPaymentController', () => {
  test('Should calls LoadBankPayment with correct value', async () => {
    const { sut, loadBankPaymentStub } = makeSut()
    const loadSpy = jest.spyOn(loadBankPaymentStub, 'load')
    await sut.handle(makeFakeRequest())
    expect(loadSpy).toHaveBeenCalledWith('21290001192110001210904475617405975870000002000')
  })
  test('Should return 400 if Validation returns an error', async () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new InvalidParamError('676776'))
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(badRequest(new InvalidParamError('676776')))
  })

  test('Should return 200 if valid codeBar is provided', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(ok({
      amount: '20.00',
      expirationDate: '2018-07-16',
      barCode: '21299758700000020000001121100012100447561740'
    }))
  })

  test('Should return 500 if LoadBankPayment throws', async () => {
    const { sut, loadBankPaymentStub } = makeSut()

    jest.spyOn(loadBankPaymentStub, 'load').mockImplementationOnce(async () => {
      return await new Promise((_resolve, reject) => reject(new Error()))
    })
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(serverError(new ServerError(null)))
  })
})
