import { GetInvoice } from './get-invoice'

describe('GetInvoice', () => {
  test('should return 20 when putting code snippet 000002000', () => {
    const barcodesnippet = '000002000'
    const sut = new GetInvoice()
    const result = sut.calculateValue(barcodesnippet)
    expect(result).toBe(20)
  })
})
