import { AddBankPayment, Controller, HttpResponse, Validation, HttpRequest } from './bank-payment-slip-protocols'
import { serverError, badRequest, ok } from '../../../helpers/http/http-helper'

export class BankPaymentController implements Controller {
  constructor (
    private readonly addBankPayment: AddBankPayment,
    private readonly validation: Validation
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }
      const { barCode, amount, expirationDate } = httpRequest.body

      const bankPayment = await this.addBankPayment.add({
        barCode,
        amount,
        expirationDate
      })
      return ok(bankPayment)
    } catch (error: any) {
      return serverError(error)
    }
  }
}
