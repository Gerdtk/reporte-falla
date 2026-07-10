import { Icons } from "../../../utils/icons";
import "./Bot.css";

type BotField = "tiempo" | "linea" | "soporte" | "falla";
type OptionLayout = "chips" | "grid";

interface BotOption {
  label: string;
  value: string;
}

interface BotStep {
  question: string;
  field: BotField;
  layout?: OptionLayout;
  options: BotOption[] | null;
}

interface BotState {
  tiempo: string;
  linea: string;
  soporte: string;
  falla: string;
  step: number;
}

export function chatBot() {
  return `
    <section class="bot-card">

      <div class="bot-header">
        <div class="bot-header-icon">
          ${Icons.Bot({
            size: 22,
            color: "currentColor",
          })}
        </div>

        <div>
          <h2>Asistente de soporte</h2>
          <p>Te ayudaré a generar y clasificar el reporte.</p>
        </div>
      </div>

      <div
        id="botMessages"
        class="bot-messages"
        aria-live="polite"
      ></div>

      <div
        id="botOptions"
        class="bot-options"
      ></div>

      <form id="botForm" class="bot-form is-hidden">
        <input
          id="botInput"
          type="text"
          placeholder="Describe brevemente la falla..."
          autocomplete="off"
          maxlength="500"
        />

        <button type="submit" class="bot-send-button">
          ${Icons.Send({
            size: 18,
            color: "currentColor",
          })}
          Enviar
        </button>
      </form>

    </section>
  `;
}

export function initChatBot() {
  const messages = document.querySelector<HTMLDivElement>("#botMessages");
  const options = document.querySelector<HTMLDivElement>("#botOptions");
  const form = document.querySelector<HTMLFormElement>("#botForm");
  const input = document.querySelector<HTMLInputElement>("#botInput");

  if (!messages || !options || !form || !input) {
    console.error("No se encontraron los elementos del chatbot.");
    return;
  }

  const state: BotState = {
    tiempo: "",
    linea: "",
    soporte: "",
    falla: "",
    step: 0,
  };

  const steps: BotStep[] = [
    {
      question: "¿Cuánto tiempo tiene activa la falla?",
      field: "tiempo",
      layout: "chips",
      options: [
        {
          label: "Menos de 15 min",
          value: "Menos de 15 min",
        },
        {
          label: "15 a 60 min",
          value: "15 a 60 min",
        },
        {
          label: "Más de 1 hora",
          value: "Más de 1 hora",
        },
      ],
    },
    {
      question: "¿En qué línea está ocurriendo?",
      field: "linea",
      layout: "grid",
      options: [
        { label: "L7", value: "Línea 7" },
        { label: "L10", value: "Línea 10" },
        { label: "L11", value: "Línea 11" },
        { label: "L12", value: "Línea 12" },
        { label: "L16", value: "Línea 16" },
        { label: "L17", value: "Línea 17" },
        { label: "L19", value: "Línea 19" },
        { label: "L21", value: "Línea 21" },
        { label: "L22", value: "Línea 22" },
        { label: "L23", value: "Línea 23" },
        { label: "L24", value: "Línea 24" },
        { label: "L25", value: "Línea 25" },
        { label: "L27", value: "Línea 27" },
        { label: "L28", value: "Línea 28" },
        { label: "L29", value: "Línea 29" },
        { label: "L30", value: "Línea 30" },
        { label: "L31", value: "Línea 31" },
        { label: "L32", value: "Línea 32" },
      ],
    },
    {
      question: "¿Necesitas que soporte intervenga?",
      field: "soporte",
      layout: "chips",
      options: [
        { label: "Sí, necesito soporte", value: "Sí" },
        { label: "No por el momento", value: "No" },
      ],
    },
    {
      question: "Por último, describe brevemente la falla.",
      field: "falla",
      options: null,
    },
  ];

  function scrollToBottom() {
    messages.scrollTop = messages.scrollHeight;
  }

  function addMessage(
    content: string,
    type: "bot" | "user" = "bot",
    allowHtml = false,
  ) {
    const message = document.createElement("div");

    message.className = `bot-message ${type}`;

    if (allowHtml) {
      message.innerHTML = content;
    } else {
      message.textContent = content;
    }

    messages.appendChild(message);
    scrollToBottom();
  }

  function calcularNivel(tiempo: string) {
    if (tiempo === "Menos de 15 min") {
      return "Nivel 1";
    }

    if (tiempo === "15 a 60 min") {
      return "Nivel 2";
    }

    return "Nivel 3";
  }

  function selectOption(
    field: BotField,
    option: BotOption,
  ) {
    addMessage(option.value, "user");

    state[field] = option.value;
    state.step += 1;

    next();
  }

  function renderOptions(
    currentOptions: BotOption[],
    field: BotField,
    layout: OptionLayout = "chips",
  ) {
    options.innerHTML = "";
    options.className = `bot-options bot-options--${layout}`;

    currentOptions.forEach((option) => {
      const button = document.createElement("button");

      button.type = "button";
      button.className = "bot-option";
      button.textContent = option.label;

      button.addEventListener("click", () => {
        selectOption(field, option);
      });

      options.appendChild(button);
    });
  }

  function renderStep() {
    options.innerHTML = "";
    options.className = "bot-options";

    input.value = "";

    const current = steps[state.step];

    if (!current) {
      finalizar();
      return;
    }

    addMessage(current.question);

    if (current.options) {
      form.classList.add("is-hidden");

      renderOptions(
        current.options,
        current.field,
        current.layout,
      );

      return;
    }

    form.classList.remove("is-hidden");

    window.setTimeout(() => {
      input.focus();
    }, 100);
  }

  function finalizar() {
    options.innerHTML = "";
    form.classList.add("is-hidden");

    const nivel = calcularNivel(state.tiempo);

    const soporteTexto =
      state.soporte === "Sí"
        ? "se requiere soporte"
        : "no se requiere soporte inmediato";

    const mensaje = `
      <div class="bot-result">
        <div class="bot-result-title">
          ${Icons.AlarmCheck({
            size: 20,
            color: "currentColor",
          })}

          <strong>Falla ${nivel}</strong>
        </div>

        <p>
          En <strong>${state.linea}</strong>,
          ${soporteTexto} por una falla activa.
        </p>

        <p>
          <strong>Tiempo activo:</strong>
          ${state.tiempo}
        </p>

        <p>
          <strong>Descripción:</strong><br>
          ${state.falla}
        </p>
      </div>
    `;

    addMessage("Listo. Este es el mensaje que se generó:");
    addMessage(mensaje, "bot", true);

    console.log({
      nivel,
      tiempo: state.tiempo,
      linea: state.linea,
      soporte: state.soporte,
      falla: state.falla,
    });
  }

  function next() {
    if (state.step >= steps.length) {
      finalizar();
      return;
    }

    renderStep();
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const value = input.value.trim();

    if (!value) {
      input.focus();
      return;
    }

    addMessage(value, "user");

    state.falla = value;
    state.step += 1;

    next();
  });

  addMessage("Hola. Voy a ayudarte a crear tu reporte de soporte.");
  renderStep();
}