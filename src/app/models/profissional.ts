import {Cidade} from './cidade';
import {Grupo} from './grupo';
import {FotoPerfil} from "./foto-perfil";

export class Profissional {
  id?: number;
  nome?: string;
  email?: string;
  senha?: string;
  grupos?: Grupo[] = [];
  cpf?: string;
  sexo?: string;
  profissao?: string;
  formacaoAcademica?: string;
  conselho?: string;
  registroConselho?: string;
  telefone?: string;
  celular?: string;
  dtNascimento?: Date;
  cep?: string;
  logradouro?: string;
  numero?: string;
  complemento?: string;
  bairro?: string;
  cidade?: Cidade;
  clinicaId?: number;
  fotoPerfil?: FotoPerfil;
}
