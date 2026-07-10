// src/main.ts
import { setupFormulario } from './ui/pages/renderSelectores';
import formHTML from './ui/index.html?raw';  // <-- Importa como string
import {initRouter} from "./ui/router/router";
import { Layout } from "./ui/layout/layout";
import './style.css';

const root = document.querySelector<HTMLDivElement>("#root");
if(root){
  root.innerHTML = Layout();
}

initRouter();
// document.addEventListener('DOMContentLoaded', () => {
//   const app = document.getElementById('app');
//   if (app) {
//     app.innerHTML = formHTML;
//     console.log('HTML inyectado', app.innerHTML.substring(0, 200));
//     setupFormulario();
//   }
// });