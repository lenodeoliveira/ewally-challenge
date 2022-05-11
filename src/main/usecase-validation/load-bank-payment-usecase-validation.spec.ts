import { InvalidParamError } from '../../presentation/errors'
import { LoadBankPaymentUseCaseValidation } from '../usecase-validation/load-bank-payment-usecase-validation'

const makeSut = (): LoadBankPaymentUseCaseValidation => {
  return new LoadBankPaymentUseCaseValidation()
}

const makeTitleResponse = ({
  barCode: '83620000002292600481001435309300100190421076',
  amount: 229.26
})

const makeAgreement = ({
  barCode: '21299758700000020000001121100012100447561740',
  amount: 20,
  expirationDate: '2018-07-16'
})

describe('LoadBankPaymentUseCaseValidation', () => {
  test('Should return a bank payment in case of success as per this typeable line 836200000021292600481009143530930013001904210760', () => {
    const loadBankPaymentUseCaseValidation = makeSut()
    const result = loadBankPaymentUseCaseValidation.load('836200000021292600481009143530930013001904210760')
    expect(result).toEqual(makeTitleResponse)
  })

  test('Should return a bank payment in case of success as per this typeable line 21290001192110001210904475617405975870000002000', async () => {
    const loadBankPaymentUseCaseValidation = makeSut()
    const result = loadBankPaymentUseCaseValidation.load('21290001192110001210904475617405975870000002000')
    expect(result).toEqual(makeAgreement)
  })

  test('Should return an error if the typeable line is longer than 48 digits', async () => {
    const loadBankPaymentUseCaseValidation = makeSut()
    const error = loadBankPaymentUseCaseValidation.load('212900011921100012109044756174059758700000020005555')
    expect(error).toEqual(new InvalidParamError('The typeable line must be between 47 and 48 characters'))
  })

  test('Should return an error if the typeable line is less than 47 digits', async () => {
    const loadBankPaymentUseCaseValidation = makeSut()
    const error = loadBankPaymentUseCaseValidation.load('212900011921100012109044756174059758700000020005555')
    expect(error).toEqual(new InvalidParamError('The typeable line must be between 47 and 48 characters'))
  })

  test('Should an error if check digits fail for the following typed 21290001192110001210904475617405975870000002000', async () => {
    const loadBankPaymentUseCaseValidation = makeSut()
    const error = loadBankPaymentUseCaseValidation.load('21290001192110001210904475617405975870000002001')
    expect(error).toEqual(new InvalidParamError('Invalid verification digit'))
  })

  test('Should an error if check digits fail for the following typed line 817700000000010936599702411310797039001433708319', async () => {
    const loadBankPaymentUseCaseValidation = makeSut()
    const error = loadBankPaymentUseCaseValidation.load('817700000000010936599702411310797039001433708319')
    expect(error).toEqual(new InvalidParamError('Invalid verification digit'))
  })

  test('Should return an error if a string is passed as a parameter', async () => {
    const loadBankPaymentUseCaseValidation = makeSut()
    const error = loadBankPaymentUseCaseValidation.load('81770000000001093659970241131079703900143370831a')
    expect(error).toEqual(new InvalidParamError('only numbers are allowed'))
  })
})
