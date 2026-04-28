import type { Reporte } from "../types/reporte";

export const reporteToWhatsApp = (reporte: Reporte): string => {

    const lineaNombre = reporte.linea?.nombre || 'Linea  ';
    const modeloNombre = reporte.modelo?.nombre || ' Modelo: ';
    const maquinaNombre = reporte.maquina?.nombre || 'Maquina: ';

    let herramentalText = ' ... ';
    if(reporte.herramental){
        const { nombre, codigo} = reporte.herramental;
        herramentalText = codigo ? `${nombre} ${codigo}` : nombre;
    }

    const  causaRaizText = reporte.causaRaiz.trim() || 'No se encontro causa raiz aparente';

    const fecha = new Date(reporte.fecha).toLocaleString('es-MX');

    let mensaje = '';
    // 
    mensaje += `................\n`;
    mensaje += `*${fecha}* ────`;
    mensaje += `${lineaNombre}\n`;
    mensaje += `*Modelo: *${modeloNombre}\n`;
    mensaje += `${maquinaNombre}\n`;
    mensaje += `${herramentalText}\n`;
    mensaje += `...................\n\n`;
    mensaje += `Se encontro, \n`;
    mensaje += `${reporte.descripcionFalla}\n\n`;
    mensaje += `Buscando una causa raiz, ${causaRaizText}\n\n`;
    mensaje += `Se comenzo con, ${reporte.accionCorrectiva}\n\n`;

    if(reporte.tieneFotos){
        mensaje += `*Evidencia: *`
    }

    mensaje += `- © KCC`;
    return mensaje;
};

export const enviarAWhatsApp = (reporte: Reporte): void => {
    const texto = reporteToWhatsApp(reporte);
    const url = `https://wa.me/?text=${encodeURIComponent(texto)}`;
    window.open(url, '_blank');
};