import { Link } from "react-router";

export default function NotFound() {
  return (
    <main className="flex min-h-[60vh] flex-col items-center justify-center bg-[#f1f2f6] px-5 py-16 text-center">
      <p className="font-montserrat-medium text-sm uppercase tracking-[0.2em] text-[#6000cf]">
        Error 404
      </p>
      <h1 className="mt-3 text-3xl text-[#38007b] sm:text-4xl">
        Página no encontrada
      </h1>
      <p className="mt-4 max-w-lg leading-7 text-[#5d5863]">
        La página que buscas no existe o ya no está disponible.
      </p>
      <Link
        className="mt-7 rounded-md bg-[#38007b] px-5 py-3 font-semibold text-white transition-colors hover:bg-[#6000cf]"
        to="/"
      >
        Volver al inicio
      </Link>
    </main>
  );
}
