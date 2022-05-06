
import { ValidationComposite, RequiredFieldValidation } from '../../../../validation/validators'
import { makeRegisterBankPaymentController } from './register-bank-payment-controller-factory'
import { Validation } from '../../../../presentation/protocols/validation'

jest.mock('../../../../validation/validators/validation-composite')

describe('SignUpValidation Factory', () => {
  test('Should call ValidationComposite with all validation', () => {
    makeRegisterBankPaymentController()
    const validations: Validation[] = []
    for (const field of ['barCode', 'amount', 'expirationDate']) {
      validations.push(new RequiredFieldValidation(field))
    }
    expect(ValidationComposite).toHaveBeenLastCalledWith(validations)
  })
})
