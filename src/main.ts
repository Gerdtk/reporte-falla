// src/main.ts
import { setupFormulario } from './ui/renderSelectores';

// Cargar el HTML del formulario
fetch('/src/ui/index.html')
  .then(response => response.text())
  .then(html => {
    document.getElementById('app')!.innerHTML = html;
    setupFormulario();  // Inicializar eventos después de inyectar el HTML
  });