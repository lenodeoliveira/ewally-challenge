import { LoadBankPaymentModel } from '../models/load-bank-payment-model'

export interface LoadBankPayment {
  load: (codeBar: string) => Promise<LoadBankPaymentModel>
}
