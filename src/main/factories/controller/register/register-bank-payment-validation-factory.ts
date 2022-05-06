import { ValidationComposite, RequiredFieldValidation } from '../../../../validation/validators'
import { Validation } from '../../../../presentation/protocols/validation'

export const makeRegisterBankPaymentValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['barCode', 'amount', 'expirationDate']) {
    validations.push(new RequiredFieldValidation(field))
  }
  return new ValidationComposite(validations)
}
