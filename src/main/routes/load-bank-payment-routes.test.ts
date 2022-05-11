import request from 'supertest'
import app from '../config/app'

describe('Register payment Routes', () => {
  test('Should return a bank payment in case of success as per this typeable line 836200000021292600481009143530930013001904210760', async () => {
    await request(app)
      .get('/boleto/836200000021292600481009143530930013001904210760')
      .expect(200)
  })

  test('Should return a bank payment in case of success as per this typeable line 21290001192110001210904475617405975870000002000', async () => {
    await request(app)
      .get('/boleto/21290001192110001210904475617405975870000002000')
      .expect(200)
  })
  test('Should return an error if the typeable line is longer than 48 digits', async () => {
    await request(app)
      .get('/boleto/212900011921100012109044756174059758700000020005555')
      .expect(400)
  })

  test('Should return an error if the typeable line is less than 47 digits', async () => {
    await request(app)
      .get('/boleto/212900011921100012109044756174059758700000020005555')
      .expect(400)
  })

  test('Should an error if check digits fail for the following typed 21290001192110001210904475617405975870000002007', async () => {
    await request(app)
      .get('/boleto/21290001192110001210904475617405975870000002007')
      .expect(400)
  })

  test('Should an error if check digits fail for the following typed line 817700000000010936599702411310797039001433708319', async () => {
    await request(app)
      .get('/boleto/817700000000010936599702411310797039001433708319')
      .expect(400)
  })

  test('Should return an error if a string is passed as a parameter', async () => {
    await request(app)
      .get('/boleto/81770000000001093659970241131079703900143370831a')
      .expect(400)
  })
})
