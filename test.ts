// test.ts (temporal, en la raíz)
import { enviarAWhatsApp } from './src/utils/toWhatsApp';
import type { Reporte } from './src/types/reporte';
import type { Linea } from './src/types/linea';
import type { Maquina } from './src/types/maquina';
import type { Herramental } from './src/types/herramental';
import type { Modelo } from './src/types/modelo';

// Datos de prueba
const lineaTest: Linea = { id: "1", nombre: "Línea 1" };
const maquinaTest: Maquina = { id: "m1", lineaId: "1", nombre: "Ekra" };
const herramentalTest: Herramental = { id: "h1", maquinaId: "m1", nombre: "Stencil", codigo: "5xx7" };
const modeloTest: Modelo = { id: "mod1", nombre: "4xx6", tipo: 'bot' };

const reporteTest: Reporte = {
  linea: lineaTest,
  maquina: maquinaTest,
  herramental: herramentalTest,
  modelo: modeloTest,
  descripcionFalla: "Se presentaron multiples fallas en la ekra",
  causaRaiz: "Stencil tapado",
  accionCorrectiva: "Se cambio el stencil y las navajas",
  fecha: new Date().toISOString(),
  tieneFotos: false
};

// Enviar
enviarAWhatsApp(reporteTest);