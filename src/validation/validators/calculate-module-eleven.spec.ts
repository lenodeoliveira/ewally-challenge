import { InvalidParamError } from '../../presentation/errors'
import { CalculateModuleEleven } from './calculate-module-eleven'

function getPositionsTitleForModuleEleven (barCode: string): number[] {
  const field = barCode.slice(0, 4) + barCode.slice(5)
  const reverseArray = Array.from(field).reverse()
  const numbers = reverseArray.map(Number)
  return numbers
}

function getCodeVerificationTitleForModuleEleven (barCode: string): number {
  const numberCodeVerification = parseInt(barCode[4])
  return numberCodeVerification
}

describe('CalculateModuleEleven', () => {
  test('Should return the correct values', () => {
    const barCode = '00193373700000001000500940144816060680935031'
    const sut = new CalculateModuleEleven()
    const getPositions = getPositionsTitleForModuleEleven(barCode)
    const codeVerification = getCodeVerificationTitleForModuleEleven(barCode)
    const error = sut.calculationModuleEleven(getPositions, codeVerification, 47)
    expect(error).toBeFalsy()
  })

  test('Should return an error if the check digit is incorrect', () => {
    const barCode = '00193373700000001000500940144816060680935031'
    const sut = new CalculateModuleEleven()
    const getPositions = getPositionsTitleForModuleEleven(barCode)
    const error = sut.calculationModuleEleven(getPositions, 8, 47)
    expect(error).toEqual(new InvalidParamError('Invalid verification digit'))
  })
})
