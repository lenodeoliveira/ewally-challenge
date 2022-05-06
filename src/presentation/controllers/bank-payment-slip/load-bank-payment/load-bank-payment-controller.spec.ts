import { LoadBankPaymentController } from './load-bank-payment-controller'
import { LoadBankPaymentModel, LoadBankPayment } from './load-bank-payment-controller-protocols'

const makeFakeBankPayment = (): LoadBankPaymentModel => ({
  amount: '20.00',
  expirationDate: '2018-07-16',
  barCode: '21299758700000020000001121100012100447561740'
})

interface SutTypes {
  sut: LoadBankPaymentController
  loadBankPaymentStub: LoadBankPayment
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
  const sut = new LoadBankPaymentController(loadBankPaymentStub)
  return {
    sut,
    loadBankPaymentStub
  }
}

describe('LoadBankPaymentController', () => {
  test('Should calls LoadBankPayment', async () => {
    const { sut, loadBankPaymentStub } = makeSut()
    const loadSpy = jest.spyOn(loadBankPaymentStub, 'load')
    await sut.handle({})
    expect(loadSpy).toHaveBeenCalled()
  })
})
