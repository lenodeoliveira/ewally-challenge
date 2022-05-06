
import { BankPaymentController } from '../../../../presentation/controllers/bank-payment-slip/register/bank-payment-slip-controller'
import { Controller } from '../../../../presentation/protocols'
import { makeRegisterBankPaymentValidation } from './register-bank-payment-validation-factory'
import { makeDbAddBankPayment } from '../../usecases/add-bank-payment/db-add-bank-payment-factory'
import { makeLogControllerDecorator } from '../../decorators/log-controller-decorator-factory'

export const makeRegisterBankPaymentController = (): Controller => {
  const controller = new BankPaymentController(makeDbAddBankPayment(), makeRegisterBankPaymentValidation())
  return makeLogControllerDecorator(controller)
}
