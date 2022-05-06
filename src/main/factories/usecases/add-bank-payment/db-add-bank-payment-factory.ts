import { BankPaymentMongoRepository } from '../../../../infra/db/mongodb/bank-payment-slip/bank-payment-mongo-repository'
import { AddBankPayment } from '../../../../domain/usecases/add-bank-payment'
import { DbAddBankPaymentSlip } from '../../../../data/usecases/add-bank-payment-slip/db-add-bank-payment-slip'

export const makeDbAddBankPayment = (): AddBankPayment => {
  const bankPaymentMongoRepository = new BankPaymentMongoRepository()
  return new DbAddBankPaymentSlip(bankPaymentMongoRepository)
}
