(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=e=>{let t=e.linea?.nombre||`Linea  `,n=e.modelo?.nombre||` Modelo: `,r=e.maquina?.nombre||`Maquina: `,i=` ... `;if(e.herramental){let{nombre:t,codigo:n}=e.herramental;i=n?`${t} ${n}`:t}let a=e.causaRaiz.trim()||`No se encontro causa raiz aparente`,o=new Date(e.fecha).toLocaleString(`es-MX`),s=``;return s+=`................
`,s+=`*${o}* ────`,s+=`${t}\n`,s+=`*Modelo: *${n}\n`,s+=`${r}\n`,s+=`${i}\n`,s+=`...................

`,s+=`Se encontro, 
`,s+=`${e.descripcionFalla}\n\n`,s+=`Buscando una causa raiz, ${a}\n\n`,s+=`Se comenzo con, ${e.accionCorrectiva}\n\n`,e.tieneFotos&&(s+=`*Evidencia: *`),s+=`- © KCC`,s},t=t=>{let n=e(t),r=`https://wa.me/?text=${encodeURIComponent(n)}`;window.open(r,`_blank`)},n=[{id:`1`,nombre:`Línea 1`},{id:`2`,nombre:`Línea 2`}],r=[{id:`mod1`,nombre:`4xx6`,tipo:`Bottom`},{id:`mod2`,nombre:`xxx8`,tipo:`Top`}],i=[{id:`m1`,lineaId:`1`,nombre:`Ekra`},{id:`m2`,lineaId:`1`,nombre:`Pick&Place`}],a=[{id:`h1`,maquinaId:`m1`,nombre:`Stencil`,codigo:`5xx7`}];function o(e,t,n){let r=document.getElementById(e);r&&(r.innerHTML=`<option value="">${n}</option>`,t.forEach(e=>{let t=document.createElement(`option`);t.value=e.id,t.textContent=e.nombre,r.appendChild(t)}))}function s(e){let t=document.getElementById(`maquinaSelect`),n=document.getElementById(`herramentalSelect`);if(!e){t.disabled=!0,t.innerHTML=`<option value="">Primero selecciona línea</option>`,n.disabled=!0,n.innerHTML=`<option value="">No aplica / Seleccionar</option>`;return}let r=i.filter(t=>t.lineaId===e);t.disabled=!1,t.innerHTML=`<option value="">Seleccionar máquina</option>`,r.forEach(e=>{let n=document.createElement(`option`);n.value=e.id,n.textContent=e.nombre,t.appendChild(n)}),n.disabled=!0,n.innerHTML=`<option value="">No aplica / Seleccionar</option>`}function c(e){let t=document.getElementById(`herramentalSelect`);if(!e){t.disabled=!0,t.innerHTML=`<option value="">No aplica / Seleccionar</option>`;return}let n=a.filter(t=>t.maquinaId===e);if(n.length===0){t.disabled=!1,t.innerHTML=`<option value="">No aplica (sin herramentales)</option>`;return}t.disabled=!1,t.innerHTML=`<option value="">Seleccionar herramental</option>`,n.forEach(e=>{let n=document.createElement(`option`);n.value=e.id,n.textContent=e.codigo?`${e.nombre} ${e.codigo}`:e.nombre,t.appendChild(n)})}function l(){let t=document.getElementById(`preview`);t&&(t.textContent=e({linea:n.find(e=>e.id===document.getElementById(`lineaSelect`)?.value)||null,modelo:r.find(e=>e.id===document.getElementById(`modeloSelect`)?.value)||null,maquina:i.find(e=>e.id===document.getElementById(`maquinaSelect`)?.value)||null,herramental:a.find(e=>e.id===document.getElementById(`herramentalSelect`)?.value)||null,descripcionFalla:document.getElementById(`descripcionFalla`)?.value||``,causaRaiz:document.getElementById(`causaRaiz`)?.value||``,accionCorrectiva:document.getElementById(`accionCorrectiva`)?.value||``,fecha:new Date().toISOString(),tieneFotos:!1}))}function u(e){e.preventDefault();let o=document.getElementById(`lineaSelect`),s=document.getElementById(`modeloSelect`),c=document.getElementById(`maquinaSelect`),l=document.getElementById(`descripcionFalla`)?.value,u=document.getElementById(`accionCorrectiva`)?.value;if(!o.value||!s.value||!c.value||!l.trim()||!u.trim()){alert(`Faltan campos obligatorios: Línea, Modelo, Máquina, Descripción y Acción Correctiva`);return}t({linea:n.find(e=>e.id===o.value)||null,modelo:r.find(e=>e.id===s.value)||null,maquina:i.find(e=>e.id===c.value)||null,herramental:a.find(e=>e.id===document.getElementById(`herramentalSelect`)?.value)||null,descripcionFalla:l,causaRaiz:document.getElementById(`causaRaiz`)?.value||``,accionCorrectiva:u,fecha:new Date().toISOString(),tieneFotos:!1})}function d(){o(`lineaSelect`,n,`Seleccionar línea`),o(`modeloSelect`,r,`Seleccionar modelo`);let e=document.getElementById(`lineaSelect`),t=document.getElementById(`maquinaSelect`),i=document.getElementById(`herramentalSelect`),a=document.getElementById(`reporteForm`);e.addEventListener(`change`,e=>{s(e.target.value),l()}),t.addEventListener(`change`,e=>{c(e.target.value),l()}),[i,document.getElementById(`descripcionFalla`),document.getElementById(`causaRaiz`),document.getElementById(`accionCorrectiva`),document.getElementById(`modeloSelect`)].forEach(e=>{e&&e.addEventListener(`input`,l),e&&e.addEventListener(`change`,l)}),a.addEventListener(`submit`,u),l()}var f=`<!-- src/ui/index.html -->\r
\r
\r
<div id="center">\r
  <div class="container">\r
    <h1>📋 Reporte de Falla</h1>\r
\r
    <form id="reporteForm">\r
      <div class="form-group">\r
        <label>📍 Línea</label>\r
        <select id="lineaSelect" required>\r
          <option value="">Seleccionar línea</option>\r
        </select>\r
      </div>\r
\r
      <div class="form-group">\r
        <label>🔢 Modelo</label>\r
        <select id="modeloSelect" required>\r
          <option value="">Seleccionar modelo</option>\r
        </select>\r
      </div>\r
\r
      <div class="form-group">\r
        <label>🖨️ Máquina</label>\r
        <select id="maquinaSelect" required disabled>\r
          <option value="">Primero selecciona línea</option>\r
        </select>\r
      </div>\r
\r
      <div class="form-group">\r
        <label>🔧 Herramental</label>\r
        <select id="herramentalSelect" disabled>\r
          <option value="">No aplica / Seleccionar</option>\r
        </select>\r
      </div>\r
\r
      <div class="form-group">\r
        <label>📝 Descripción de la falla *</label>\r
        <textarea id="descripcionFalla" rows="3" required placeholder="Ej: Se presentaron multiples fallas en la ekra..."></textarea>\r
      </div>\r
\r
      <div class="form-group">\r
        <label>🔍 Causa raíz</label>\r
        <textarea id="causaRaiz" rows="2" placeholder="Opcional: dejar vacío para 'no se encontró causa raíz aparente'"></textarea>\r
      </div>\r
\r
      <div class="form-group">\r
        <label>✅ Acción correctiva *</label>\r
        <textarea id="accionCorrectiva" rows="2" required placeholder="Ej: Se cambio el stencil 5xx7 y las navajas..."></textarea>\r
      </div>\r
\r
      <button type="submit" id="enviarBtn">📤 Enviar a WhatsApp</button>\r
    </form>\r
\r
    <div class="preview">\r
      <h3>Vista previa del mensaje:</h3>\r
      <div id="preview" class="message-preview"></div>\r
    </div>\r
  </div>\r
</div>`;document.addEventListener(`DOMContentLoaded`,()=>{let e=document.getElementById(`app`);e&&(e.innerHTML=f,console.log(`HTML inyectado`,e.innerHTML.substring(0,200)),d())});