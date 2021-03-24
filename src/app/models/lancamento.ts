import {FormaPagamento} from "./forma-pagamento";
import {CategoriaLancamento} from "./categoria-lancamento";
import {Consulta} from "./consulta";

export class Lancamento {

  id?: number;
  valorTotal?: number;
  descricao?: string;
  formaPagamento?: FormaPagamento;
  categoria?: CategoriaLancamento;
  dtLancamento?: Date;
  consulta?: Consulta;
  profissionalId?: number;
  clinicaId?: number;

}
