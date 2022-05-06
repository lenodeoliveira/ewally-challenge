
import { ValidationComposite, RequiredFieldValidation } from '../../../../validation/validators'
import { makeSignUpController } from './register-bank-payment-controller-factory'
import { Validation } from '../../../../presentation/protocols/validation'

jest.mock('../../../../validation/validators/validation-composite')

describe('SignUpValidation Factory', () => {
  test('Should call ValidationComposite with all validation', () => {
    makeSignUpController()
    const validations: Validation[] = []
    for (const field of ['barCode', 'amount', 'expirationDate']) {
      validations.push(new RequiredFieldValidation(field))
    }
    expect(ValidationComposite).toHaveBeenLastCalledWith(validations)
  })
})
