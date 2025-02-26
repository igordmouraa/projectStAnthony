export interface Missa {
    id: string;
    data: string;
    hora: string;
    diaSemana: string;
    tipo: "Pré-definida" | "Especial";
    escala: string[];
    escalaNomes?: string[];
}