import { Grupo } from './grupo';
export class Usuario {
    id?: number;
    nome?: string;
    email?: string;
    senha?: string;
    grupos?: Grupo[] = []
}