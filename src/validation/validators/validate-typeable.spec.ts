
import { InvalidParamError } from '../../presentation/errors'
import { ValidateTypeable } from './validate-typeable'

const makeSut = (): ValidateTypeable => {
  return new ValidateTypeable()
}

describe('', () => {
  test('Should return InvalidParamError when passed a number in the editable line', () => {
    const sut = makeSut()
    const error = sut.validate('2129000119211000121090447561740597587000000200A')
    expect(error).toEqual(new InvalidParamError('only numbers are allowed'))
  })

  test('Should return InvalidParamError when passing an editable line less than 47', () => {
    const sut = makeSut()
    const error = sut.validate('2323232344')
    expect(error).toEqual(new InvalidParamError('The typeable line must be between 47 and 48 characters'))
  })

  test('Should returnInvalidParamError when passing an editable line greater than 48', () => {
    const sut = makeSut()
    const error = sut.validate('2129000119211000121090447561740597587000000200056565')
    expect(error).toEqual(new InvalidParamError('The typeable line must be between 47 and 48 characters'))
  })

  test('Should not return if validation succeeds', () => {
    const sut = makeSut()
    const error = sut.validate('21290001192110001210904475617405975870000002000')
    expect(error).toBeFalsy()
  })
})
