import request from 'supertest'
import app from '../config/app'

describe('Register payment Routes', () => {
  test('Should return an bank payment on success', async () => {
    await request(app)
      .post('/api/boleto')
      .send({
        barCode: 8888,
        amount: 7777,
        expirationDate: '09/04/2020'
      })
      .expect(200)
  })
})
