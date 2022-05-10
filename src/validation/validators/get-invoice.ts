export class GetInvoice {
  calculateValue (barCodeSnippet: string): number {
    const numbBarCode = Number(barCodeSnippet)
    const result = numbBarCode / 100
    return result
  }
}
