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
    await sut.handle(makeFakeRequest().params.code)
    expect(loadSpy).toHaveBeenCalledWith('21290001192110001210904475617405975870000002000')
  })
})
