import { useLocation, useNavigate } from "react-router";
import { useLanguage } from "./language-context";

function scrollToSection(targetId: string) {
  document.getElementById(targetId)?.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
}

function NavigationLinks() {
  const location = useLocation();
  const navigate = useNavigate();
  const { language } = useLanguage();
  const navigationLinks = language === "en"
    ? [
      { label: "Services", targetId: "services-carousel-title" },
      { label: "How it works", targetId: "how-it-works-title" },
      { label: "About Us", targetId: "about-title" },
      { label: "Blog", href: "/blog" },
      { label: "Contact", targetId: "contacto" },
    ]
    : [
      { label: "Servicios", targetId: "services-carousel-title" },
      { label: "Cómo funciona", targetId: "how-it-works-title" },
      { label: "Quiénes Somos", targetId: "about-title" },
      { label: "Blog", href: "/blog" },
      { label: "Contacto", targetId: "contacto" },
    ];

  return (
    <nav aria-label={language === "en" ? "Main navigation" : "Navegación principal"}>
      <ul className="flex flex-col gap-4 lg:flex-row lg:items-center lg:gap-7">
        {navigationLinks.map((link) => (
          <li key={link.label}>
            {link.targetId ? (
              <button
                className="text-left text-sm font-semibold text-white transition-opacity hover:opacity-75"
                type="button"
                onClick={(event) => {
                  if (location.pathname === "/") {
                    scrollToSection(link.targetId);
                  } else {
                    navigate("/", { state: { scrollTo: link.targetId } });
                  }
                  const menu = event.currentTarget.closest("details");
                  if (menu) menu.open = false;
                }}
              >
                {link.label}
              </button>
            ) : (
              <a
                className="text-sm font-semibold text-white transition-opacity hover:opacity-75"
                href={link.href}
              >
                {link.label}
              </a>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}

function LanguageSelector() {
  const { language, setLanguage, translationError } = useLanguage();
  const languageName = language === "en" ? "English" : "Español";

  return (
    <details className="group relative">
      <summary
        className="inline-flex min-h-9 cursor-pointer list-none items-center rounded-md border border-white/80 px-3 text-xs font-semibold [&::-webkit-details-marker]:hidden"
        aria-label={language === "en" ? "Select language" : "Seleccionar idioma"}
      >
        {languageName}
      </summary>
      <div className="absolute left-0 top-full z-[60] mt-2 min-w-36 rounded-md border border-white/15 bg-[#5100b5] p-1 shadow-xl">
        {([
          ["es", "Español"],
          ["en", "English"],
        ] as const).map(([option, label]) => (
          <button
            className="block w-full rounded px-3 py-2 text-left text-sm hover:bg-white/15"
            type="button"
            key={option}
            aria-current={language === option ? "true" : undefined}
            onClick={(event) => {
              setLanguage(option);
              const menu = event.currentTarget.closest("details");
              if (menu) menu.open = false;
            }}
          >
            {label}
          </button>
        ))}
        {translationError && (
          <p className="max-w-52 px-3 py-2 text-xs text-white/80" role="status">
            {language === "en"
              ? "Google Translate could not be loaded."
              : "No se pudo cargar Google Translate."}
          </p>
        )}
      </div>
    </details>
  );
}

export default function Header() {
  const location = useLocation();
  const { language } = useLanguage();

  return (
    <header className="relative z-50 bg-[#6000cf] text-white">
      <div className="mx-auto flex min-h-[72px] max-w-6xl items-center justify-between gap-5 px-5 sm:px-8">
        <a
          className="shrink-0"
          href="/"
          aria-label="Martz Entertainment, inicio"
          onClick={(event) => {
            if (location.pathname !== "/") return;
            event.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          <img
            className="h-10 w-[145px] object-contain object-left sm:h-11 sm:w-[160px]"
            src="https://wp.martzentertainment.com/wp-content/uploads/2026/09/martz-logo-small.webp"
            alt="Martz Entertainment"
          />
        </a>

        <div className="hidden items-center gap-8 lg:flex">
          <NavigationLinks />
          <div className="flex items-center gap-3">
            <LanguageSelector />
            <a
              className="inline-flex min-h-8 items-center rounded-md border border-white/80 px-3 text-xs font-semibold transition-colors hover:bg-white/15"
              href="https://admin.martzentertainment.com/"
            >
              {language === "en" ? "Log In" : "Iniciar Sesión"}
            </a>
          </div>
        </div>

        <details className="group relative ml-auto lg:hidden">
          <summary
            className="flex h-10 w-10 cursor-pointer list-none items-center justify-center rounded-md border border-white/75 [&::-webkit-details-marker]:hidden"
            aria-label={language === "en" ? "Open menu" : "Abrir menú"}
          >
            <svg aria-hidden="true" viewBox="0 0 24 24" className="h-6 w-6 fill-none stroke-current" strokeWidth="2" strokeLinecap="round">
              <path d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          </summary>
          <div className="absolute right-0 top-full mt-3 w-64 rounded-lg border border-white/15 bg-[#5100b5] p-5 shadow-xl">
            <NavigationLinks />
            <div className="mt-5 flex items-center gap-3 border-t border-white/20 pt-4">
              <LanguageSelector />
              <a
                className="inline-flex min-h-9 items-center rounded-md border border-white/80 px-3 text-xs font-semibold transition-colors hover:bg-white/15"
                href="/login"
              >
                {language === "en" ? "Log In" : "Iniciar Sesión"}
              </a>
            </div>
          </div>
        </details>
      </div>
    </header>
  );
}