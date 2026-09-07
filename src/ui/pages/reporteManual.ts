//reporteManual.ts

import { setupFormulario} from "./renderSelectores";
import { Icons} from "../../utils/icons";
import {cifrarTelefono} from "../../types/telefono";

const CLAVE_CIFRADO = "clave-secreta-para-cifrado";

export async function obtenerTelefonoCifrado(): Promise<string | null>{
    const telefonoInput = document.querySelector<HTMLTextAreaElement>("#telefonoInput");
    if (!telefonoInput){
        console.error("No se encontro el telefono de entrada");
        return null;
    }
    const telefono = telefonoInput.value.trim();
    if(!telefono){
        return null;
    }

    return cifrarTelefono(telefono, CLAVE_CIFRADO);
}




export function ReporteManual() {
  return `
    <h1> Reporte Manual </h1>
    <form id="reporteForm">
        <div id="center">
            <div class="container">
                    <h1> Reporte de Falla</h1>

                    <form id="reporteForm">
                    <div class="form-group">
                        <label>${Icons.Flag({ size: 20, color: "antiquewhite" })} Línea</label>
                        <select id="lineaSelect" required>
                        <option value="">Seleccionar línea</option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label>${Icons.Printer({ size: 20, color: "antiquewhite"})}
                        Modelo</label>
                        <select id="modeloSelect" required>
                        <option value="">Seleccionar modelo</option>
                        </select>
                    </div>

                    <div class="from-group">
                    <label>${Icons.Dog({size: 20, color:"white"})} numero de Telefono</label>
                    <textarea id="telefonoInput" placeholder="Ingresa tu numero de telefono para cifrado"></textarea>
                    </div>

                    <div class="form-group">
                        <label><img src="/node_modules/lucide-static/icons/printer.svg" alt="Maquina"/> Máquina</label>
                        <select id="maquinaSelect" required disabled>
                        <option value="">Primero selecciona línea</option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label> <img src="/node_modules/lucide-static/icons/wrench.svg" alt="Herramental"/> Herramental</label>
                        <select id="herramentalSelect" disabled>
                        <option value="">No aplica / Seleccionar</option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label> Descripción de la falla *</label>
                        <textarea id="descripcionFalla" rows="3" required placeholder="Ej: Se presentaron multiples fallas en la ekra..."></textarea>
                    </div>

                    <div class="form-group">
                        <label> Causa raíz</label>
                        <textarea id="causaRaiz" rows="2" placeholder="Opcional: dejar vacío para 'no se encontró causa raíz aparente'"></textarea>
                    </div>

                    <div class="form-group">
                        <label> Acción correctiva *</label>
                        <textarea id="accionCorrectiva" rows="2" required placeholder="Ej: Se cambio el stencil 5xx7 y las navajas..."></textarea>
                    </div>

                    <button type="submit" id="enviarBtn"> Enviar a WhatsApp</button>
                    </form>

                    <div class="preview">
                        <h3>Vista previa del mensaje:</h3>
                        <div id="preview" class="message-preview"></div>
                    </div>
            </div>
        </div>
    </form>
  `;
}

export function initReporteManual(){ 
    setupFormulario();
}