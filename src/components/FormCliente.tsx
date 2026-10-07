import { useState, type FormEvent } from "react";
import { getFormApiEndpoint, submitLeadForm } from "./leadFormApi";

const CLIENT_FORM_API_URL = getFormApiEndpoint("eventos");
const fieldClassName =
  "min-h-12 w-full rounded-lg border border-[#dedde3] bg-white px-4 py-3 text-sm text-[#242128] outline-none transition focus:border-[#6000cf] focus:ring-2 focus:ring-[#6000cf]/15";

export default function FormCliente({ onClose }: { onClose: () => void }) {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    setStatus("sending");
    setErrorMessage("");

    try {
      await submitLeadForm(CLIENT_FORM_API_URL, {
        nombre: String(data.get("nombre") ?? ""),
        correo: String(data.get("correo") ?? ""),
        telefono: String(data.get("telefono") ?? ""),
        servicio_interes: String(data.get("servicio") ?? ""),
        mensaje: String(data.get("observaciones") ?? ""),
      });
      form.reset();
      setStatus("success");
    } catch (submitError) {
      setErrorMessage(
        submitError instanceof Error
          ? submitError.message
          : "No fue posible enviar la solicitud.",
      );
      setStatus("error");
    }
  }

  return (
    <section aria-labelledby="form-cliente-title">
      <header className="mb-6 flex items-start justify-between gap-4">
        <div>
          <p className="font-montserrat-medium text-xs uppercase tracking-[0.16em] text-[#6000cf]">
            Crear un evento
          </p>
          <h2 className="mt-1 text-2xl text-[#38007b]" id="form-cliente-title">
            Cuéntanos qué necesitas
          </h2>
        </div>
        <button
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-2xl text-[#5d5863] transition-colors hover:bg-[#f1f2f6]"
          type="button"
          onClick={onClose}
          aria-label="Cerrar formulario"
        >
          &times;
        </button>
      </header>

      <form className="grid gap-4 sm:grid-cols-2" onSubmit={handleSubmit}>
        <label className="grid gap-1.5 text-sm font-semibold text-[#34313a]">
          Nombre
          <input className={fieldClassName} name="nombre" autoComplete="name" required />
        </label>
        <label className="grid gap-1.5 text-sm font-semibold text-[#34313a]">
          Correo
          <input
            className={fieldClassName}
            name="correo"
            type="email"
            autoComplete="email"
            required
          />
        </label>
        <label className="grid gap-1.5 text-sm font-semibold text-[#34313a]">
          Teléfono
          <input
            className={fieldClassName}
            name="telefono"
            type="tel"
            autoComplete="tel"
            required
          />
        </label>
        <label className="grid gap-1.5 text-sm font-semibold text-[#34313a]">
          Servicio de interés
          <select className={fieldClassName} name="servicio" defaultValue="" required>
            <option value="" disabled>Selecciona un servicio</option>
            <option>DJs</option>
            <option>Karaoke</option>
            <option>Cantantes</option>
            <option>Música en vivo</option>
            <option>Fotografía y video</option>
            <option>Catering y bartenders</option>
            <option>Otro</option>
          </select>
        </label>
        <label className="grid gap-1.5 text-sm font-semibold text-[#34313a] sm:col-span-2">
          Observaciones
          <textarea
            className={`${fieldClassName} min-h-28 resize-y`}
            name="observaciones"
            rows={4}
          />
        </label>

        <label className="flex items-start gap-2 text-sm font-normal text-[#34313a] sm:col-span-2">
          <input
            className="mt-1 accent-[#6000cf]"
            type="checkbox"
            name="aceptaPoliticaPrivacidad"
            required
          />
          <span>
            Acepto la política de privacidad.
          </span>
        </label>

        {status === "success" && (
          <p className="text-sm text-green-700 sm:col-span-2" role="status">
            Recibimos tu solicitud. Gracias por contactarnos.
          </p>
        )}
        {status === "error" && (
          <p className="text-sm text-red-700 sm:col-span-2" role="alert">
            {errorMessage}
          </p>
        )}
        <button
          className="min-h-12 rounded-lg bg-[#ec27cb] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#d51ab5] disabled:cursor-wait disabled:opacity-70 sm:col-span-2"
          type="submit"
          disabled={status === "sending"}
        >
          {status === "sending" ? "Enviando..." : "Enviar solicitud"}
        </button>
      </form>
    </section>
  );
}
