// src/ui/layout/Layout.ts

export function Layout() {
  return `
    <div id="center">
      <div class="container" style="background-color: rgba(255, 255, 255, 0.06);">
        <header class="app-header">
          <h1>Reporte de Fallas</h1>
          <p>Centro de soporte y escalamiento por WhatsApp</p>
        </header>

        <nav class="tabs">
          <button class="tab active" data-router="manual" type="button">Reporte manual</button>
          <button class="tab" data-router="chatBot" type="button">Chatbot</button>
        </nav>

        <main id="app"></main>
      </div>
    </div>
  `;
}