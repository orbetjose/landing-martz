import { useState, type FormEvent } from "react";
import { submitLeadForm } from "./leadFormApi";

const TALENT_FORM_API_URL = import.meta.env.VITE_WP_TALENT_FORM_API_URL;
const fieldClassName =
  "min-h-12 w-full rounded-lg border border-[#dedde3] bg-white px-4 py-3 text-sm text-[#242128] outline-none transition focus:border-[#6000cf] focus:ring-2 focus:ring-[#6000cf]/15";

export default function FormTalento({ onClose }: { onClose: () => void }) {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    setStatus("sending");
    setErrorMessage("");

    try {
      await submitLeadForm(TALENT_FORM_API_URL, {
        nombre: String(data.get("nombre") ?? ""),
        nombreArtistico: String(data.get("nombreArtistico") ?? ""),
        email: String(data.get("email") ?? ""),
        fechaNacimiento: String(data.get("fechaNacimiento") ?? ""),
        esBandaOGrupo: String(data.get("esBandaOGrupo") ?? ""),
        telefono: String(data.get("telefono") ?? ""),
        redesSociales: String(data.get("redesSociales") ?? ""),
        ciudad: String(data.get("ciudad") ?? ""),
        pais: String(data.get("pais") ?? ""),
      });
      form.reset();
      setStatus("success");
    } catch (submitError) {
      setErrorMessage(
        submitError instanceof Error
          ? submitError.message
          : "No fue posible enviar el registro.",
      );
      setStatus("error");
    }
  }

  return (
    <section aria-labelledby="form-talento-title">
      <header className="mb-6 flex items-start justify-between gap-4">
        <div>
          <p className="font-montserrat-medium text-xs uppercase tracking-[0.16em] text-[#6000cf]">
            Registrar talento
          </p>
          <h2 className="mt-1 text-2xl text-[#38007b]" id="form-talento-title">
            Comparte tu talento
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
          Nombre artístico
          <input className={fieldClassName} name="nombreArtistico" required />
        </label>
        <label className="grid gap-1.5 text-sm font-semibold text-[#34313a]">
          Email
          <input
            className={fieldClassName}
            name="email"
            type="email"
            autoComplete="email"
            required
          />
        </label>
        <label className="grid gap-1.5 text-sm font-semibold text-[#34313a]">
          Fecha de nacimiento
          <input
            className={fieldClassName}
            name="fechaNacimiento"
            type="date"
            autoComplete="bday"
            required
          />
        </label>

        <fieldset className="sm:col-span-2">
          <legend className="text-sm font-semibold text-[#34313a]">
            ¿Eres una banda o grupo?
          </legend>
          <div className="mt-2 flex flex-wrap gap-x-6 gap-y-2">
            <label className="inline-flex items-center gap-2 text-sm text-[#34313a]">
              <input
                className="accent-[#6000cf]"
                type="radio"
                name="esBandaOGrupo"
                value="si"
                required
              />
              Sí
            </label>
            <label className="inline-flex items-center gap-2 text-sm text-[#34313a]">
              <input
                className="accent-[#6000cf]"
                type="radio"
                name="esBandaOGrupo"
                value="no"
                required
              />
              No, soy solista
            </label>
          </div>
        </fieldset>

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
          Redes sociales
          <input
            className={fieldClassName}
            name="redesSociales"
            type="text"
            placeholder="Instagram, TikTok, Facebook..."
          />
        </label>
        <label className="grid gap-1.5 text-sm font-semibold text-[#34313a]">
          Ciudad
          <input className={fieldClassName} name="ciudad" autoComplete="address-level2" required />
        </label>
        <label className="grid gap-1.5 text-sm font-semibold text-[#34313a]">
          País
          <input className={fieldClassName} name="pais" autoComplete="country-name" required />
        </label>

        {status === "success" && (
          <p className="text-sm text-green-700 sm:col-span-2" role="status">
            Recibimos tu registro. Gracias por compartir tu talento.
          </p>
        )}
        {status === "error" && (
          <p className="text-sm text-red-700 sm:col-span-2" role="alert">
            {errorMessage}
          </p>
        )}
        <button
          className="min-h-12 rounded-lg bg-[#36106f] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#260950] disabled:cursor-wait disabled:opacity-70 sm:col-span-2"
          type="submit"
          disabled={status === "sending"}
        >
          {status === "sending" ? "Enviando..." : "Registrar talento"}
        </button>
      </form>
    </section>
  );
}
