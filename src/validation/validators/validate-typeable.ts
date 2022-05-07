import { InvalidParamError } from '../../presentation/errors'
import { CodeValidator } from '../../presentation/protocols'

export class ValidateTypeable implements CodeValidator {
  validate (code: string): Error {
    const reg = /^\d+$/
    if (!reg.test(code)) {
      return new InvalidParamError('only numbers are allowed')
    }

    if (code.length < 47 || code.length > 48) {
      return new InvalidParamError('The typeable line must be between 47 and 48 characters')
    }
  }
}
