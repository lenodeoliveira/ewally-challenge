import request from 'supertest'
import app from '../config/app'

describe('Register payment Routes', () => {
  test('Should return a bank payment in case of success as per this typeable line 836200000021292600481009143530930013001904210760', async () => {
    await request(app)
      .get('/boleto/836200000021292600481009143530930013001904210760')
      .send({
        barCode: '836200000021292600481009143530930013001904210760',
        amount: 229.26
      })
      .expect(200)
  })

  test('Should return a bank payment in case of success as per this typeable line 21290001192110001210904475617405975870000002000', async () => {
    await request(app)
      .get('/boleto/21290001192110001210904475617405975870000002000')
      .send({
        barCode: '21299758700000020000001121100012100447561740',
        amount: 20,
        expirationDate: '2018-07-16'
      })
      .expect(200)
  })
  test('Should return an error if the typeable line is longer than 48 digits', async () => {
    await request(app)
      .get('/boleto/212900011921100012109044756174059758700000020005555')
      .send({
        error: 'Invalid param: The typeable line must be between 47 and 48 characters'
      })
      .expect(400)
  })

  test('Should return an error if the typeable line is less than 47 digits', async () => {
    await request(app)
      .get('/boleto/212900011921100012109044756174059758700000020005555')
      .send({
        error: 'Invalid param: The typeable line must be between 47 and 48 characters'
      })
      .expect(400)
  })

  test('Should an error if check digits fail for the following typed 21290001192110001210904475617405975870000002007', async () => {
    await request(app)
      .get('/boleto/21290001192110001210904475617405975870000002007')
      .send({
        error: 'Invalid param: Invalid verification digit'
      })
      .expect(400)
  })

  test('Should an error if check digits fail for the following typed line 817700000000010936599702411310797039001433708319', async () => {
    await request(app)
      .get('/boleto/817700000000010936599702411310797039001433708319')
      .send({
        error: 'Invalid param: Invalid verification digit'
      })
      .expect(400)
  })

  test('Should return an error if a string is passed as a parameter', async () => {
    await request(app)
      .get('/boleto/81770000000001093659970241131079703900143370831a')
      .send({
        error: 'Invalid param: only numbers are allowed'
      })
      .expect(400)
  })
})
