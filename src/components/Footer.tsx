const companyLinks = [
  { label: "Quiénes somos", href: "#about-title" },
  { label: "Ayuda", href: "#faq-title" },
  { label: "Contacto", href: "#contacto" },
  { label: "Términos y Condiciones", href: "#terminos-y-condiciones" },
  { label: "Política de Privacidad", href: "#politica-de-privacidad" },
];

const serviceLinks = [
  { label: "Servicios", href: "#services-carousel-title" },
  { label: "Para Clientes", href: "#crear-evento" },
  { label: "Para Talentos", href: "#registrar-talento" },
];

const socialLinks = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/martzlive?igsh=MW5hM2p4OGpya3hmbQ%3D%3D&utm_source=qr",
    icon: (
      <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4 fill-none stroke-current" strokeWidth="1.8">
        <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.8" r=".8" className="fill-current stroke-none" />
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: "http://facebook.com/martzentertainment",
    icon: (
      <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4 fill-current">
        <path d="M13.5 21v-8h2.7l.4-3h-3.1V8.1c0-.9.3-1.5 1.6-1.5h1.7V4c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3V10H7.3v3h2.8v8h3.4Z" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "https://youtube.com/@martzentertainment?si=EA66ms2M3klrYl6g",
    icon: (
      <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4 fill-current">
        <path d="M21.6 7.2a2.8 2.8 0 0 0-2-2C17.8 4.7 12 4.7 12 4.7s-5.8 0-7.6.5a2.8 2.8 0 0 0-2 2A29 29 0 0 0 2 12a29 29 0 0 0 .4 4.8 2.8 2.8 0 0 0 2 2c1.8.5 7.6.5 7.6.5s5.8 0 7.6-.5a2.8 2.8 0 0 0 2-2A29 29 0 0 0 22 12a29 29 0 0 0-.4-4.8ZM10 15.2V8.8l5.5 3.2-5.5 3.2Z" />
      </svg>
    ),
  },
  {
    label: "TikTok",
    href: "https://www.tiktok.com/@martzentertainment?_r=1&_t=ZT-916NbiUV8f1",
    icon: (
      <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4 fill-current">
        <path d="M16.6 3c.3 2.1 1.5 3.4 3.4 3.5v3.1a8 8 0 0 1-3.4-.9v6.5a6.5 6.5 0 1 1-6.5-6.5c.4 0 .8 0 1.2.1v3.3a3.2 3.2 0 1 0 2.1 3V3h3.2Z" />
      </svg>
    ),
  },
];

function FooterLinks({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <nav aria-label={title}>
      <h2 className="mb-5 text-sm font-bold text-white">{title}</h2>
      <ul className="space-y-4">
        {links.map((link) => (
          <li key={link.label}>
            <a className="text-[13px] text-white/80 transition-colors hover:text-white" href={link.href}>
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#1f0344] text-white">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-x-8 gap-y-10 px-6 py-10 sm:px-10 sm:py-12 lg:grid-cols-[1.25fr_1fr_1fr_1fr] lg:gap-12">
        <div className="col-span-2 max-w-xs lg:col-span-1">
          <a href="#hero-title" className="inline-flex items-center gap-2" aria-label="Martz, inicio">
            <img src="http://landing-martz.local/wp-content/uploads/2026/09/martz-logo-small.webp" alt="Logo martz footer" className="h-14 object-contain" />
          </a>
          <p className="mt-3 max-w-[240px] text-[13px] leading-relaxed text-white/85">
            La plataforma líder para conectar talentos y clientes en el mundo de los eventos.
          </p>
        </div>

        <FooterLinks title="Empresa" links={companyLinks} />
        <FooterLinks title="Servicios" links={serviceLinks} />

        <div>
          <h2 className="mb-5 text-sm font-bold text-white">Síguenos</h2>
          <ul className="flex flex-wrap gap-2">
            {socialLinks.map((social) => (
              <li key={social.label}>
                <a
                  className="flex h-8 w-8 items-center justify-center rounded-md bg-white/20 text-white transition-colors hover:bg-white/35"
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mx-auto max-w-6xl border-t border-white/20 px-6 py-5 text-center sm:px-10">
        <p className="text-xs text-white/80">© {year} Martz Entertainment. Todos los derechos reservados.</p>
        <div className="mt-2 flex items-center justify-center gap-3 text-xs text-white/75">
          <a className="underline underline-offset-2 hover:text-white" href="#terminos-y-condiciones">
            Términos y Condiciones
          </a>
          <span aria-hidden="true">|</span>
          <a className="underline underline-offset-2 hover:text-white" href="#politica-de-privacidad">
            Política de Privacidad
          </a>
        </div>
      </div>
    </footer>
  );
}