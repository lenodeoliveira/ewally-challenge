import { AddBankPaymentRepository } from '../../../../data/protocols/db/bank-payment-slip/bank-payment-slip'
import { BankPaymentModel } from '../../../../domain/models/bank-payment-slip'
import { AddBankPaymentModel } from '../../../../domain/usecases/add-bank-payment'
import { MongoHelper } from '../helpers/mongo-helper'

export class BankPaymentMongoRepository implements AddBankPaymentRepository {
  async add (bankPayment: AddBankPaymentModel): Promise<BankPaymentModel> {
    const bankPaymentCollection = await MongoHelper.getCollection('bank-payments')
    const { insertedId } = await bankPaymentCollection.insertOne(bankPayment)

    const findById = await bankPaymentCollection.findOne(insertedId)
    return MongoHelper.map(findById)
  }
}
