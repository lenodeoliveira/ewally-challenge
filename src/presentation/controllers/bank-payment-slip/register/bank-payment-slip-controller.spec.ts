import { BankPaymentController } from './bank-payment-slip-controller'
import { MissingParamError, ServerError } from '../../../errors'
import { HttpRequest, Validation, BankPaymentModel, AddBankPaymentModel, AddBankPayment } from './bank-payment-slip-protocols'
import { serverError, badRequest, ok } from '../../../helpers/http/http-helper'

const makeAddBankPayment = (): AddBankPayment => {
  class AddBankPaymentStub implements AddBankPayment {
    async add (bankPayment: AddBankPaymentModel): Promise<BankPaymentModel> {
      return await new Promise(resolve => resolve(makeFakeBankPayment()))
    }
  }
  return new AddBankPaymentStub()
}

const makeValidation = (): Validation => {
  class ValidationStub implements Validation {
    validate (input: any): Error {
      return null
    }
  }
  return new ValidationStub()
}

const makeFakeBankPayment = (): BankPaymentModel => ({
  id: 'valid_id',
  barCode: 89898,
  amount: 3000,
  expirationDate: '02/02/2020'
})

const makeFakeRequest = (): HttpRequest => ({
  body: {
    barCode: 89898,
    amount: 3000,
    expirationDate: '02/02/2020'
  }
})

interface SutTypes {
  sut: BankPaymentController
  addBankPaymentStub: AddBankPayment
  validationStub: Validation
}

const makeSut = (): SutTypes => {
  const addBankPaymentStub = makeAddBankPayment()
  const validationStub = makeValidation()
  const sut = new BankPaymentController(addBankPaymentStub, validationStub)
  return {
    sut,
    addBankPaymentStub,
    validationStub
  }
}

describe('Bank Payment Controller', () => {
  test('Should return 500 if AddBankPayment throws', async () => {
    const { sut, addBankPaymentStub } = makeSut()

    jest.spyOn(addBankPaymentStub, 'add').mockImplementationOnce(async () => {
      return await new Promise((_resolve, reject) => reject(new Error()))
    })
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(serverError(new ServerError(null)))
  })

  test('Should return 400 if Validation returns an error', async () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new MissingParamError('any_field'))
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(badRequest(new MissingParamError('any_field')))
  })

  test('Should call AddBankPayment with correct values', async () => {
    const { sut, addBankPaymentStub } = makeSut()

    const addSpy = jest.spyOn(addBankPaymentStub, 'add')
    await sut.handle(makeFakeRequest())
    expect(addSpy).toHaveBeenCalledWith({
      barCode: 89898,
      amount: 3000,
      expirationDate: '02/02/2020'
    })
  })

  test('Should return 200 if valid data is provided', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(ok({
      id: 'valid_id',
      barCode: 89898,
      amount: 3000,
      expirationDate: '02/02/2020'
    }))
  })

  test('Should call Validation with correct value', async () => {
    const { sut, validationStub } = makeSut()

    const validateSpy = jest.spyOn(validationStub, 'validate')
    const httpRequest = makeFakeRequest()
    await sut.handle(makeFakeRequest())
    expect(validateSpy).toHaveBeenCalledWith(httpRequest.body)
  })

  test('Should return 400 if Validation returns an error', async () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new MissingParamError('any_field'))
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(badRequest(new MissingParamError('any_field')))
  })
})
