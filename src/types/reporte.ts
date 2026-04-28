
//types/reporte.ts

import type {Linea} from './linea';
import type { Maquina } from './maquina';
import type {Herramental} from './herramental';
import type {Modelo} from './modelo';


export interface Reporte{

    linea: Linea | null;
    maquina: Maquina | null;
    herramental:  Herramental | null;
    modelo: Modelo | null;

    descripcionFalla: string;
    causaRaiz: string;
    accionCorrectiva: string;

    fecha: string;
    tieneFotos: boolean;

}

