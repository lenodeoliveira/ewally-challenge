export class GetInvoice {
  constructor (
    private readonly barCodeSnippet: string
  ) {}

  calculateValue (): number {
    const numbBarCode = Number(this.barCodeSnippet)
    const result = numbBarCode / 100
    return result
  }
}
