import { Controller, HttpRequest, HttpResponse } from './load-bank-payment-controller-protocols'
import { badRequest, ok, serverError } from '../../../helpers/http/http-helper'
import { LoadBankPaymentUseCaseValidation } from '../../../../main/usecase-validation/load-bank-payment-usecase-validation'
export class LoadBankPaymentController implements Controller {
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const loadBankPayment: LoadBankPaymentUseCaseValidation = new LoadBankPaymentUseCaseValidation()

      const result = await loadBankPayment.load(httpRequest.params.code)
      if (result instanceof Error) {
        return badRequest(result)
      }
      return ok(result)
    } catch (error: any) {
      return serverError(error)
    }
  }
}
