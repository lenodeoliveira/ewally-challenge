import { Controller, HttpRequest, HttpResponse, LoadBankPayment, CodeValidator } from './load-bank-payment-controller-protocols'
import { serverError, badRequest } from '../../../helpers/http/http-helper'
export class LoadBankPaymentController implements Controller {
  constructor (
    private readonly loadBankPayment: LoadBankPayment,
    private readonly validation: CodeValidator
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.params.barCode)
      if (error) {
        return badRequest(error)
      }
      await this.loadBankPayment.load(httpRequest.params.barCode)
      return null
    } catch (error: any) {
      return serverError(error)
    }
  }
}
