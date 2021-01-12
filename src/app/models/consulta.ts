import { Profissional } from './profissional';
import { Paciente } from './paciente';
export class Consulta {
    id?: number;
    paciente?: Paciente;
    profissional?: Profissional;
    dataHora?: Date;
    localDeAtendimento?: string;
    procedimentoEnum?: string;
    statusConsultaEnum?: string;
    convenioEnum?: string;
    observacoes?: string;
    // Integração com FullCalendar
    start: Date;
    title: string;
    className: string;

    constructor() {
        this.start = this.dataHora
    }
}