import { Cidade } from './cidade';
import { Grupo } from './grupo';

export class Paciente {
  id?: number;
  nome?: string;
  email?: string;
  senha?: string;
  grupos?: Grupo[] = [];
  cpf?: string;
  sexo?: string;
  telefone?: string;
  celular?: string;
  dtNascimento?: Date;
  logradouro: string;
  numero: string;
  complemento: string;
  bairro: string;
  cep: string;
  cidade?: Cidade;
  nomeMae?: string;
  nomePai?: string;
  cpfResponsavel?: string;
  idPaciente?: number;
  ativado?: boolean;
  clinicaId?: number;
}
