import { Router } from 'express'
// import { adaptRoute } from '../adapters/express/express-route-adapter'
// import { makeRegisterBankPaymentController } from '../factories/controller/signup/register-payment-controller-factory'

export default (router: Router): void => {
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  // router.post('/boleto', adaptRoute(makeRegisterBankPaymentController()))

  router.post('/boleto', (req, res) => {
    res.json({ ok: 'ok' })
  })
}
