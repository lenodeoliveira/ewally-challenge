import { DbAddBankPaymentSlip } from './db-add-bank-payment-slip'
import { BankPaymentModel, AddBankPaymentRepository, AddBankPaymentModel } from './db-add-bank-protocols'

const makeAddBankPaymentRepositoryStub = (): AddBankPaymentRepository => {
  class AddBankPaymentRepositoryStub implements AddBankPaymentRepository {
    async add (bankPayment: AddBankPaymentModel): Promise<BankPaymentModel> {
      return await new Promise(resolve => resolve(makeFakeBankPayment()))
    }
  }

  return new AddBankPaymentRepositoryStub()
}

const makeFakeBankPayment = (): BankPaymentModel => ({
  id: 'valid_id',
  barCode: 89898,
  amount: 3000,
  expirationDate: '02/02/2020'
})

const makeFakeBankPaymentData = (): AddBankPaymentModel => ({
  barCode: 89898,
  amount: 3000,
  expirationDate: '02/02/2020'
})

interface SutTypes {
  sut: DbAddBankPaymentSlip
  addBankPaymentRepositoryStub: AddBankPaymentRepository
}

const makeSut = (): SutTypes => {
  const addBankPaymentRepositoryStub = makeAddBankPaymentRepositoryStub()
  const sut = new DbAddBankPaymentSlip(addBankPaymentRepositoryStub)
  return {
    sut,
    addBankPaymentRepositoryStub
  }
}

describe('DbAddBankPaymentSlip UseCase', () => {
  test('Should call AddBankPaymentRepository with correct values', async () => {
    const { sut, addBankPaymentRepositoryStub } = makeSut()

    const addSpy = jest.spyOn(addBankPaymentRepositoryStub, 'add')
    await sut.add(makeFakeBankPaymentData())
    expect(addSpy).toBeCalledWith({
      barCode: 89898,
      amount: 3000,
      expirationDate: '02/02/2020'
    })
  })

  test('Should return an bank payment slip on success', async () => {
    const { sut } = makeSut()
    const bankPayment = await sut.add(makeFakeBankPaymentData())
    expect(bankPayment).toEqual(makeFakeBankPayment())
  })
})
