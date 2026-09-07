import BotSvg from "lucide-static/icons/bot.svg?raw";
import ClipboardPenSvg from "lucide-static/icons/clipboard-pen.svg?raw";
import DogSvg from "lucide-static/icons/dog.svg?raw";
import PrinterSvg from "lucide-static/icons/printer.svg?raw";
import FlagSvg from "lucide-static/icons/flag-off.svg?raw";
import AlarmCheck from "lucide-static/icons/alarm-check.svg?raw";
import Send from "lucide-static/icons/send.svg?raw";


type IconProps = {
    size?: number;
    color?: string;
    strokeWidth?: number;
    className?: string;
};

function createIcon(svg: string) {
    return ({
        size = 20,
        color = "currentColor",
        strokeWidth = 2,
        className = "",
    }: IconProps = {}) => {

        return svg
            .replace("<svg", `<svg class="${className}"`)
            .replace(/width="[^"]*"/, `width="${size}"`)
            .replace(/height="[^"]*"/, `height="${size}"`)
            .replace(/stroke="[^"]*"/, `stroke="${color}"`)
            .replace(/stroke-width="[^"]*"/, `stroke-width="${strokeWidth}"`);
    };
}

export const Icons = {
    Bot: createIcon(BotSvg),
    Clipboard: createIcon(ClipboardPenSvg),
    Dog: createIcon(DogSvg),
    Printer: createIcon(PrinterSvg),
    Flag: createIcon(FlagSvg),
    AlarmCheck: createIcon(AlarmCheck),
    Send: createIcon(Send),
};