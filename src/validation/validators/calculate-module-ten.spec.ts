import { InvalidParamError } from '../../presentation/errors'
import { CalculateModuleTen } from './calculate-module-ten'

describe('CalculateModuleTen', () => {
  test('Should retornar dígitos de verificação corretos para este código de barras 21299758700000020000001121100012100447561740', () => {
    const sut = new CalculateModuleTen()

    const line = '21290001192110001210904475617405975870000002000'
    const vdsDigitableLine = line[9] + line[20] + line[31]
    const result = vdsDigitableLine.toString().split('')
    const numbers = result.map(Number)

    const theThreeFields = sut.returnThreeField('21299758700000020000001121100012100447561740')
    const digits: number[] = []
    Object.entries(theThreeFields).forEach(
      ([key, value]) => {
        const vd = sut.calculationModuleTen(value)
        digits.push(vd)
      }
    )
    expect(digits).toEqual(numbers)
  })

  test('Should retornar dígitos de verificação corretos para este código de barras 10498921915400010004700069786002189860000011990', () => {
    const sut = new CalculateModuleTen()

    const line = '10498921915400010004700069786002189860000011990'
    const vdsDigitableLine = line[9] + line[20] + line[31]
    const result = vdsDigitableLine.toString().split('')
    const numbers = result.map(Number)

    const theThreeFields = sut.returnThreeField('10491898600000119908921954000100040006978600')
    const digits: number[] = []
    Object.entries(theThreeFields).forEach(
      ([key, value]) => {
        const vd = sut.calculationModuleTen(value)
        digits.push(vd)
      }
    )
    expect(digits).toEqual(numbers)
  })

  test('Should return a InvalidParamError when check digits are not equal', () => {
    const sut = new CalculateModuleTen()
    const line = '10498921915400010004700069786002189860000011990'

    const theThreeFields = sut.returnThreeField('10491898600000119908921954000100040006978600')
    const digits: number[] = []
    Object.entries(theThreeFields).forEach(
      ([key, value]) => {
        const vd = sut.calculationModuleTen(value)
        digits.push(vd)
      }
    )
    const error = sut.checkVerifiableDigits(line, [9, 9, 9])
    expect(error).toEqual(new InvalidParamError('Invalid verification digit'))
  })
})
