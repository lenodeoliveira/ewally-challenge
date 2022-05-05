import request from 'supertest'
import app from '../config/app'
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper'
import { Collection } from 'mongodb'

let bankPaymentCollection: Collection

describe('Register payment Routes', () => {
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

  test('Should return an bank payment on success', async () => {
    await request(app)
      .post('/api/boleto')
      .send({
        barCode: 8888,
        amount: 7777,
        expirationDate: '09/04/2020'
      })
      .expect(200)
  })
})
