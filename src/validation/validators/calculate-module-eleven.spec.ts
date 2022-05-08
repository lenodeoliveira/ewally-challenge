import { InvalidParamError } from '../../presentation/errors'
import { CalculateModuleEleven } from './calculate-module-eleven'

describe('CalculateModuleEleven', () => {
  test('Should return the correct values', () => {
    const barCode = '00193373700000001000500940144816060680935031'
    const sut = new CalculateModuleEleven()
    const getPositions = sut.getPositions(barCode)
    const codeVerification = sut.getCodeVerification(barCode)
    const returnCodeVerification = sut.calculationModuleEleven(getPositions, codeVerification)
    expect(codeVerification).toBe(returnCodeVerification)
  })

  test('Should return an error if the check digit is incorrect', () => {
    const barCode = '00193373700000001000500940144816060680935031'
    const sut = new CalculateModuleEleven()
    const getPositions = sut.getPositions(barCode)
    const error = sut.calculationModuleEleven(getPositions, 8)
    expect(error).toEqual(new InvalidParamError('Invalid verification digit'))
  })
})
