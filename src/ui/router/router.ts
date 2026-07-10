type Router = "manual" | "chatBot";
type PageRender  = () => string;

import { ReporteManual, initReporteManual} from "../pages/reporteManual";
import { chatBot, initChatBot } from "../pages/chatBot/chatBot";



const routes = {
    manual: {
        render :  ReporteManual,
        init: initReporteManual
    },
    chatBot: {
        render: chatBot,
        init: initChatBot,
    }
};

export function navigate(router: Router) {
    const app = document.querySelector<HTMLElement>("#app");
    
    if (!app){
        console.error("No se encontro el contenedor #app");
        return;
    }

    app.innerHTML = routes[router].render();
    routes[router].init();

    document.querySelectorAll<HTMLButtonElement>("[data-router]").forEach((btn) => {
        btn.classList.toggle("active", btn.dataset.router === router);
    });
}

export function initRouter(){
    document.querySelectorAll<HTMLButtonElement>("[data-router]").forEach((btn) => {
        btn.addEventListener("click", () => {
            const router = btn.dataset.router as Router;
            navigate(router);
        });
    });

    navigate("manual");
}
