//storage/catalogoStore

import type { Linea } from "../types/linea";
import type { Maquina } from "../types/maquina";
import type { Modelo } from "../types/modelo";
import type { Herramental } from "../types/herramental";

// ===== LÍNEAS =====
const getLineasKey = () => 'catalogo_lineas';

export const getLineas = (): Linea[] => {
  return JSON.parse(localStorage.getItem(getLineasKey()) || '[]');
};

export const saveLineas = (lineas: Linea[]): void => {
  localStorage.setItem(getLineasKey(), JSON.stringify(lineas));
};

export const addLinea = (linea: Linea): void => {
  const lineas = getLineas();
  lineas.push(linea);
  saveLineas(lineas);
};

export const updateLinea = (id: string, nombre: string): void => {
  const lineas = getLineas();
  const index = lineas.findIndex(l => l.id === id);
  if (index !== -1) {
    lineas[index].nombre = nombre;
    saveLineas(lineas);
  }
};

export const deleteLinea = (id: string): void => {
  const lineas = getLineas().filter(l => l.id !== id);
  saveLineas(lineas);
};

// ===== MÁQUINAS =====
const getMaquinasKey = () => 'catalogo_maquinas';

export const getMaquinas = (): Maquina[] => {
  return JSON.parse(localStorage.getItem(getMaquinasKey()) || '[]');
};

export const getMaquinasByLinea = (lineaId: string): Maquina[] => {
  return getMaquinas().filter(m => m.lineaId === lineaId);
};

export const saveMaquinas = (maquinas: Maquina[]): void => {
  localStorage.setItem(getMaquinasKey(), JSON.stringify(maquinas));
};

export const addMaquina = (maquina: Maquina): void => {
  const maquinas = getMaquinas();
  maquinas.push(maquina);
  saveMaquinas(maquinas);
};

export const updateMaquina = (id: string, nombre: string): void => {
  const maquinas = getMaquinas();
  const index = maquinas.findIndex(m => m.id === id);
  if (index !== -1) {
    maquinas[index].nombre = nombre;
    saveMaquinas(maquinas);
  }
};

export const deleteMaquina = (id: string): void => {
  const maquinas = getMaquinas().filter(m => m.id !== id);
  saveMaquinas(maquinas);
};

// ===== HERRAMENTALES =====
const getHerramentalesKey = () => 'catalogo_herramentales';

export const getHerramentales = (): Herramental[] => {
  return JSON.parse(localStorage.getItem(getHerramentalesKey()) || '[]');
};

export const getHerramentalesByMaquina = (maquinaId: string): Herramental[] => {
  return getHerramentales().filter(h => h.maquinaId === maquinaId);
};

export const saveHerramentales = (herramentales: Herramental[]): void => {
  localStorage.setItem(getHerramentalesKey(), JSON.stringify(herramentales));
};

export const addHerramental = (herramental: Herramental): void => {
  const herramentales = getHerramentales();
  herramentales.push(herramental);
  saveHerramentales(herramentales);
};

export const updateHerramental = (id: string, nombre: string, codigo?: string): void => {
  const herramentales = getHerramentales();
  const index = herramentales.findIndex(h => h.id === id);
  if (index !== -1) {
    herramentales[index].nombre = nombre;
    if (codigo !== undefined) herramentales[index].codigo = codigo;
    saveHerramentales(herramentales);
  }
};

export const deleteHerramental = (id: string): void => {
  const herramentales = getHerramentales().filter(h => h.id !== id);
  saveHerramentales(herramentales);
};

// ===== MODELOS =====
const getModelosKey = () => 'catalogo_modelos';

export const getModelos = (): Modelo[] => {
  return JSON.parse(localStorage.getItem(getModelosKey()) || '[]');
};

export const saveModelos = (modelos: Modelo[]): void => {
  localStorage.setItem(getModelosKey(), JSON.stringify(modelos));
};

export const addModelo = (modelo: Modelo): void => {
  const modelos = getModelos();
  modelos.push(modelo);
  saveModelos(modelos);
};

export const updateModelo = (id: string, nombre: string): void => {
  const modelos = getModelos();
  const index = modelos.findIndex(m => m.id === id);
  if (index !== -1) {
    modelos[index].nombre = nombre;
    saveModelos(modelos);
  }
};

export const deleteModelo = (id: string): void => {
  const modelos = getModelos().filter(m => m.id !== id);
  saveModelos(modelos);
};