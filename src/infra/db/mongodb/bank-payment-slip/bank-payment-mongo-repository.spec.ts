import { MongoHelper } from '../helpers/mongo-helper'
import { BankPaymentMongoRepository } from './bank-payment-mongo-repository'

describe('BankPayment Mongo Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  test('Should return an bank payment on success', async () => {
    const sut = new BankPaymentMongoRepository()
    const bankPayment = await sut.add({
      barCode: 888,
      amount: 777,
      expirationDate: '03/09/2020'
    })

    expect(bankPayment).toBeTruthy()
    expect(bankPayment.id).toBeTruthy()
    expect(bankPayment.barCode).toBe(888)
    expect(bankPayment.amount).toBe(777)
    expect(bankPayment.expirationDate).toBe('03/09/2020')
  })
})
