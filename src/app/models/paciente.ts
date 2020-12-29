import { Cidade } from './cidade';
import { Grupo } from './grupo';
import { Profissional } from './profissional';

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
    cep?: string;
    logradouro?: string;
    numero?: string;
    complemento?: string;
    bairro?: string;
    cidade?: Cidade;
    nomeMae?: string;
    nomePai?: string;
    cpfResponsavel?: string;
    profissional?: Profissional;
}