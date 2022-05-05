import { MongoHelper } from '../helpers/mongo-helper'
import { BankPaymentMongoRepository } from './bank-payment-mongo-repository'
import { Collection } from 'mongodb'

let bankPaymentCollection: Collection

describe('BankPayment Mongo Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    bankPaymentCollection = await MongoHelper.getCollection('bank-payments')
    await bankPaymentCollection.deleteMany({})
  })

  const makeSut = (): BankPaymentMongoRepository => {
    return new BankPaymentMongoRepository()
  }

  test('Should return an bank payment on success', async () => {
    const sut = makeSut()
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
