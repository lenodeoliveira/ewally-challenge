import { AddBankPaymentModel } from '../../../../domain/usecases/add-bank-payment'
import { BankPaymentModel } from '../../../../domain/models/bank-payment-slip'

export interface AddBankPaymentRepository {
  add: (bankPaymentData: AddBankPaymentModel) => Promise<BankPaymentModel>
}
