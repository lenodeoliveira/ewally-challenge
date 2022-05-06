import { Controller, HttpRequest, HttpResponse, LoadBankPayment } from './load-bank-payment-controller-protocols'

export class LoadBankPaymentController implements Controller {
  constructor (private readonly loadBankPayment: LoadBankPayment) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    await this.loadBankPayment.load()
    return null
  }
}
