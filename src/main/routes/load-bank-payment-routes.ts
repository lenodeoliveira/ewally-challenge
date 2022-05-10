import { Router } from 'express'
import { adaptRoute } from '../adapter/express/express-route-adapter'
import { LoadBankPaymentController } from '../../presentation/controllers/bank-payment-slip/load-bank-payment/load-bank-payment-controller'

const loadBankPaymentController: LoadBankPaymentController = new LoadBankPaymentController()

export default (router: Router): void => {
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  router.get('/boleto/:code', adaptRoute(loadBankPaymentController))
}
