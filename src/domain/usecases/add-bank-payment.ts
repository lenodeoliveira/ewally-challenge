import { BankPaymentModel } from '../models/bank-payment-slip'

export interface AddBankPaymentModel {
  barCode: number
  amount: number
  expirationDate: string
}

export interface AddBankPayment {
  add: (bankPayment: AddBankPaymentModel) => Promise<BankPaymentModel>
}
