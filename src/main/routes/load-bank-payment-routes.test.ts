import request from 'supertest'
import app from '../config/app'

describe('Register payment Routes', () => {
  test('Should return an bank payment on success', async () => {
    await request(app)
      .get('/boleto/836200000021292600481009143530930013001904210760')
      .send({
        barCode: '836200000021292600481009143530930013001904210760',
        amount: 229.26
      })
      .expect(200)
  })
})
