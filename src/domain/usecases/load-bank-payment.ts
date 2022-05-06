import { LoadBankPaymentModel } from '../models/load-bank-payment-model'

export interface LoadBankPayment {
  load: () => Promise<LoadBankPaymentModel>
}
