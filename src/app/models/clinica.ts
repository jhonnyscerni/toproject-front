import { Cidade } from './cidade';
import { Grupo } from './grupo';

export class Clinica {
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
    cep?: string;
    logradouro?: string;
    numero?: string;
    complemento?: string;
    bairro?: string;
    cidade?: Cidade;
}