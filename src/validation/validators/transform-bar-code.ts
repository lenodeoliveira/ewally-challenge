/* Barcode 47:

01 a 03 03 9(03) Código do Banco na Câmara de Compensação = '001'
04 a 04 01 9(01) Código da Moeda = 9 (Real)
05 a 05 01 9(01) Digito Verificador (DV) do código de Barras\*
06 a 09 04 9(04) Fator de Vencimento **
10 a 19 10 9(08)V(2) Preco
20 a 44 03 9(03) Campo Livre
*/

/* Barcode 48
01 – 01 1 Identificação do Produto
02 – 02 1 Identificação do Segmento
03 – 03 1 Identificação do valor real ou referência
04 – 04 1 Dígito verificador geral (módulo 10 ou 11)
05 – 15 11 Valor
16 – 19 4 Identificação da Empresa/Órgão
20 – 44 25 Campo livre de utilização da Empresa/Órgão
16 – 23 8 CNPJ / MF
24 – 44 21 Campo livre de utilização da Empresa/Órgão
*/

export class TransformBarCode {
  constructor (private readonly type: number) {}
  getBarCode (code: string): string {
    const barCode = this.type === 47
      ? code.slice(0, 4) +
                    code[32] +
                    code.slice(33, 47) +
                    code.slice(4, 9) +
                    code.slice(10, 20) +
                    code.slice(21, 31)
      : code.slice(0, 11) +
                    code.slice(12, 23) +
                    code.slice(24, 35) +
                    code.slice(36, 47)
    return barCode
  }
}
