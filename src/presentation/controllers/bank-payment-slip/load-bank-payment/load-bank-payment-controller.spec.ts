import { serverError } from '../../../helpers/http/http-helper'
import { LoadBankPaymentController } from './load-bank-payment-controller'
import { HttpRequest } from './load-bank-payment-controller-protocols'

const makeFakeRequest = (): HttpRequest => ({
  params: {
    code: '21290001192110001210904475617405975870000002000'
  }
})

describe('LoadBankPaymentController', () => {
  test('Should calls LoadBankPayment with correct value', async () => {
    const sut = new LoadBankPaymentController()
    const loadSpy = jest.spyOn(sut, 'handle')
    sut.handle(makeFakeRequest().params.code)
    expect(loadSpy).toHaveBeenCalledWith('21290001192110001210904475617405975870000002000')
  })

  test('Should return 500 if throws', async () => {
    const sut = new LoadBankPaymentController()
    const httpResponse = sut.handle(makeFakeRequest().params.fieldNotExists)
    expect(httpResponse).toEqual(serverError(new Error()))
  })
})
