import { BankPaymentModel, AddBankPayment, AddBankPaymentRepository, AddBankPaymentModel } from './db-add-bank-protocols'

export class DbAddBankPaymentSlip implements AddBankPayment {
  constructor (
    private readonly addBankPaymentRepository: AddBankPaymentRepository
  ) {}

  async add (bankPayment: AddBankPaymentModel): Promise<BankPaymentModel> {
    const newBankPayment = await this.addBankPaymentRepository.add(Object.assign({}, bankPayment))
    return newBankPayment
  }
}
