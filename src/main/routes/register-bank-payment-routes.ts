import { Router } from 'express'
import { adaptRoute } from '../adapter/express/express-route-adapter'
import { makeRegisterBankPaymentController } from '../factories/controller/register/register-bank-payment-controller-factory'

export default (router: Router): void => {
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  router.post('/boleto', adaptRoute(makeRegisterBankPaymentController()))
}
