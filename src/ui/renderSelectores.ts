// src/ui/renderSelectores.ts
import { enviarAWhatsApp, reporteToWhatsApp } from '../utils/toWhatsApp';
import type { Reporte } from '../types/reporte';
import type { Linea } from '../types/linea';
import type { Maquina } from '../types/maquina';
import type { Herramental } from '../types/herramental';
import type { Modelo } from '../types/modelo';

// DATOS DE EJEMPLO (después los reemplazas con localStorage)
const lineas: Linea[] = [
  { id: "1", nombre: "Línea 1" },
  { id: "2", nombre: "Línea 2" },
];

const modelos: Modelo[] = [
  { id: "mod1", nombre: "4xx6", tipo: "Bottom" },
  { id: "mod2", nombre: "xxx8", tipo: "Top" },
];

const maquinas: Maquina[] = [
  { id: "m1", lineaId: "1", nombre: "Ekra" },
  { id: "m2", lineaId: "1", nombre: "Pick&Place" },
];

const herramentales: Herramental[] = [
  { id: "h1", maquinaId: "m1", nombre: "Stencil", codigo: "5xx7" },
];

function populateSelect(selectId: string, items: { id: string; nombre: string }[], defaultText: string) {
  const select = document.getElementById(selectId) as HTMLSelectElement;
  if (!select) return;
  
  select.innerHTML = `<option value="">${defaultText}</option>`;
  items.forEach(item => {
    const option = document.createElement('option');
    option.value = item.id;
    option.textContent = item.nombre;
    select.appendChild(option);
  });
}

function updateMaquinasByLinea(lineaId: string) {
  const maquinaSelect = document.getElementById('maquinaSelect') as HTMLSelectElement;
  const herramentalSelect = document.getElementById('herramentalSelect') as HTMLSelectElement;
  
  if (!lineaId) {
    maquinaSelect.disabled = true;
    maquinaSelect.innerHTML = '<option value="">Primero selecciona línea</option>';
    herramentalSelect.disabled = true;
    herramentalSelect.innerHTML = '<option value="">No aplica / Seleccionar</option>';
    return;
  }
  
  const maquinasFiltradas = maquinas.filter(m => m.lineaId === lineaId);
  maquinaSelect.disabled = false;
  maquinaSelect.innerHTML = '<option value="">Seleccionar máquina</option>';
  
  maquinasFiltradas.forEach(m => {
    const option = document.createElement('option');
    option.value = m.id;
    option.textContent = m.nombre;
    maquinaSelect.appendChild(option);
  });
  
  herramentalSelect.disabled = true;
  herramentalSelect.innerHTML = '<option value="">No aplica / Seleccionar</option>';
}

function updateHerramentalesByMaquina(maquinaId: string) {
  const herramentalSelect = document.getElementById('herramentalSelect') as HTMLSelectElement;
  
  if (!maquinaId) {
    herramentalSelect.disabled = true;
    herramentalSelect.innerHTML = '<option value="">No aplica / Seleccionar</option>';
    return;
  }
  
  const herramentalesFiltrados = herramentales.filter(h => h.maquinaId === maquinaId);
  
  if (herramentalesFiltrados.length === 0) {
    herramentalSelect.disabled = false;
    herramentalSelect.innerHTML = '<option value="">No aplica (sin herramentales)</option>';
    return;
  }
  
  herramentalSelect.disabled = false;
  herramentalSelect.innerHTML = '<option value="">Seleccionar herramental</option>';
  
  herramentalesFiltrados.forEach(h => {
    const option = document.createElement('option');
    option.value = h.id;
    option.textContent = h.codigo ? `${h.nombre} ${h.codigo}` : h.nombre;
    herramentalSelect.appendChild(option);
  });
}

function updatePreview() {
  const previewDiv = document.getElementById('preview');
  if (!previewDiv) return;
  
  const reporteActual: Reporte = {
    linea: lineas.find(l => l.id === (document.getElementById('lineaSelect') as HTMLSelectElement)?.value) || null,
    modelo: modelos.find(m => m.id === (document.getElementById('modeloSelect') as HTMLSelectElement)?.value) || null,
    maquina: maquinas.find(m => m.id === (document.getElementById('maquinaSelect') as HTMLSelectElement)?.value) || null,
    herramental: herramentales.find(h => h.id === (document.getElementById('herramentalSelect') as HTMLSelectElement)?.value) || null,
    descripcionFalla: (document.getElementById('descripcionFalla') as HTMLTextAreaElement)?.value || '',
    causaRaiz: (document.getElementById('causaRaiz') as HTMLTextAreaElement)?.value || '',
    accionCorrectiva: (document.getElementById('accionCorrectiva') as HTMLTextAreaElement)?.value || '',
    fecha: new Date().toISOString(),
    tieneFotos: false,
  };
  
  previewDiv.textContent = reporteToWhatsApp(reporteActual);
}

function handleSubmit(e: Event) {
  e.preventDefault();
  
  const lineaSelect = document.getElementById('lineaSelect') as HTMLSelectElement;
  const modeloSelect = document.getElementById('modeloSelect') as HTMLSelectElement;
  const maquinaSelect = document.getElementById('maquinaSelect') as HTMLSelectElement;
  const descripcion = (document.getElementById('descripcionFalla') as HTMLTextAreaElement)?.value;
  const accionCorrectiva = (document.getElementById('accionCorrectiva') as HTMLTextAreaElement)?.value;
  
  if (!lineaSelect.value || !modeloSelect.value || !maquinaSelect.value || !descripcion.trim() || !accionCorrectiva.trim()) {
    alert('Faltan campos obligatorios: Línea, Modelo, Máquina, Descripción y Acción Correctiva');
    return;
  }
  
  const reporteEnviar: Reporte = {
    linea: lineas.find(l => l.id === lineaSelect.value) || null,
    modelo: modelos.find(m => m.id === modeloSelect.value) || null,
    maquina: maquinas.find(m => m.id === maquinaSelect.value) || null,
    herramental: herramentales.find(h => h.id === (document.getElementById('herramentalSelect') as HTMLSelectElement)?.value) || null,
    descripcionFalla: descripcion,
    causaRaiz: (document.getElementById('causaRaiz') as HTMLTextAreaElement)?.value || '',
    accionCorrectiva: accionCorrectiva,
    fecha: new Date().toISOString(),
    tieneFotos: false,
  };
  
  enviarAWhatsApp(reporteEnviar);
}

export function setupFormulario() {
  populateSelect('lineaSelect', lineas, 'Seleccionar línea');
  populateSelect('modeloSelect', modelos, 'Seleccionar modelo');
  
  const lineaSelect = document.getElementById('lineaSelect') as HTMLSelectElement;
  const maquinaSelect = document.getElementById('maquinaSelect') as HTMLSelectElement;
  const herramentalSelect = document.getElementById('herramentalSelect') as HTMLSelectElement;
  const form = document.getElementById('reporteForm') as HTMLFormElement;
  
  lineaSelect.addEventListener('change', (e) => {
    updateMaquinasByLinea((e.target as HTMLSelectElement).value);
    updatePreview();
  });
  
  maquinaSelect.addEventListener('change', (e) => {
    updateHerramentalesByMaquina((e.target as HTMLSelectElement).value);
    updatePreview();
  });
  
  [herramentalSelect, document.getElementById('descripcionFalla'), document.getElementById('causaRaiz'), document.getElementById('accionCorrectiva'), document.getElementById('modeloSelect')].forEach(el => {
    if (el) el.addEventListener('input', updatePreview);
    if (el) el.addEventListener('change', updatePreview);
  });
  
  form.addEventListener('submit', handleSubmit);
  updatePreview();
}