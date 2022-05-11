import { TransformBarCode } from './transform-bar-code'

describe('TransformBarCode', () => {
  test('Should return the correct barcode for a title', () => {
    const sut = new TransformBarCode(47)
    const code = sut.getBarCode('21290001192110001210904475617405975870000002000')
    expect(code).toBe('21299758700000020000001121100012100447561740')
  })

  test('Should return the correct barcode for a contract', () => {
    const sut = new TransformBarCode(48)
    const code = sut.getBarCode('836200000021292600481009143530930013001904210760')
    expect(code).toBe('83620000002292600481001435309300100190421076')
  })
})
