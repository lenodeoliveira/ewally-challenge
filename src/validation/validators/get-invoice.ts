export class GetInvoice {
  constructor (
    private readonly barcodesnippet: string
  ) {}

  calculateValue (): number {
    const numbBarCode = Number(this.barcodesnippet)
    const result = numbBarCode / 100
    return result
  }
}
