import { useEffect, useState, type FormEvent, type ReactNode } from "react";
import { useLocation, useNavigate } from "react-router";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import FormCliente from "../components/FormCliente";
import FormTalento from "../components/FormTalento";

const CONTACT_API_URL = "https://wp.martzentertainment.com/wp-json/martz/v1/contact";

const values = [
  {
    title: "Pasión",
    description:
      "Amamos lo que hacemos y nos apasiona ver eventos exitosos que crean recuerdos duraderos.",
    icon: "https://wp.martzentertainment.com/wp-content/uploads/2026/09/ico-pasion.png",
    height: "h-10",
  },
  {
    title: "Excelencia",
    description:
      "Nos esforzamos por ofrecer el más alto nivel de calidad en cada interacción.",
    icon: "https://wp.martzentertainment.com/wp-content/uploads/2026/09/ico-excelence.png",
    height: "h-15",
  },
  {
    title: "Comunidad",
    description:
      "Creemos en el poder de la colaboración y en construir relaciones duraderas.",
    icon: "https://wp.martzentertainment.com/wp-content/uploads/2026/09/ico-community.png",
    height: "h-10",
  },
];

type EntertainmentService = {
  title: string;
  icon: ReactNode;
  iconImage?: string;
};

const entertainmentServices: EntertainmentService[] = [
  {
    title: "DJs",
    icon: (
      <svg
        aria-hidden="true"
        viewBox="0 0 32 32"
        className="h-7 w-7 fill-none stroke-current"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="16" r="8" />
        <circle cx="12" cy="16" r="2" />
        <path d="m20 11 7-4v15l-7-4M4 27h24" />
      </svg>
    ),
    iconImage:
      "https://wp.martzentertainment.com/wp-content/uploads/2026/09/djs-ico.png",
  },
  {
    title: "Karaoke",
    icon: (
      <svg
        aria-hidden="true"
        viewBox="0 0 32 32"
        className="h-7 w-7 fill-none stroke-current"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="12" y="3" width="8" height="17" rx="4" />
        <path d="M8 15a8 8 0 0 0 16 0M16 23v6m-5 0h10" />
      </svg>
    ),
    iconImage:
      "https://wp.martzentertainment.com/wp-content/uploads/2026/09/karaoke-ico.png",
  },
  {
    title: "Cantantes",
    icon: (
      <svg
        aria-hidden="true"
        viewBox="0 0 32 32"
        className="h-7 w-7 fill-none stroke-current"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="13" cy="9" r="5" />
        <path d="M4 28v-3a9 9 0 0 1 18 0v3M22 7l6-2v14a4 4 0 1 1-3-3.9V9l-3 .9" />
      </svg>
    ),
    iconImage:
      "https://wp.martzentertainment.com/wp-content/uploads/2026/09/cantantes-ico.png",
  },
  {
    title: "Tríos",
    icon: (
      <svg
        aria-hidden="true"
        viewBox="0 0 32 32"
        className="h-7 w-7 fill-none stroke-current"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="16" cy="8" r="3" />
        <circle cx="6" cy="12" r="2.5" />
        <circle cx="26" cy="12" r="2.5" />
        <path d="M10 27v-3a6 6 0 0 1 12 0v3M1 27v-2a5 5 0 0 1 7-4.6M31 27v-2a5 5 0 0 0-7-4.6" />
      </svg>
    ),
    iconImage:
      "https://wp.martzentertainment.com/wp-content/uploads/2026/09/trios-ico.png",
  },
  {
    title: "Bandas en vivo",
    icon: (
      <svg
        aria-hidden="true"
        viewBox="0 0 32 32"
        className="h-7 w-7 fill-none stroke-current"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M5 15h14v11H5zM8 15v11m8-11v11M5 18h14M23 5v13m0-10 5-2v12" />
        <circle cx="23" cy="22" r="3" />
      </svg>
    ),
    iconImage:
      "https://wp.martzentertainment.com/wp-content/uploads/2026/09/bandas-ico.png",
  },
];

type HowItWorksStep = {
  title: string;
  description: string;
  border: string;
  iconBackground: string;
  icon: ReactNode;
  iconImage?: string;
};

const howItWorksSteps: HowItWorksStep[] = [
  {
    title: "Regístrate",
    description: "Crea tu cuenta y describe tu evento soñado.",
    border: "border-[#ff3de4]",
    iconBackground: "bg-[#ff3de4]",
    icon: (
      <svg
        aria-hidden="true"
        viewBox="0 0 32 32"
        className="h-8 w-8 fill-current"
      >
        <circle cx="12" cy="9" r="6" />
        <path d="M2 27v-3a10 10 0 0 1 15-8.7l-2 3.5A6 6 0 0 0 6 24v3H2Zm18-5 3 3 7-8-2.5-2.2-4.7 5.3-1.3-1.3L18 24l2 2Z" />
      </svg>
    ),
    iconImage:
      "https://wp.martzentertainment.com/wp-content/uploads/2026/09/registrate-ico.png",
  },
  {
    title: "Descubre",
    description: "Explora talentos, planners y servicios disponibles.",
    border: "border-[#380074]",
    iconBackground: "bg-[#380074]",
    icon: (
      <svg
        aria-hidden="true"
        viewBox="0 0 32 32"
        className="h-8 w-8 fill-none stroke-current"
        strokeWidth="2"
        strokeLinejoin="round"
      >
        <path d="m16 3 4 8 9 1-6.5 6.3 1.6 9L16 23l-8.1 4.3 1.6-9L3 12l9-1 4-8Z" />
      </svg>
    ),
    iconImage:
      "https://wp.martzentertainment.com/wp-content/uploads/2026/09/descubre-ico.png",
  },
  {
    title: "Reserva",
    description: "Descubre cuál servicio se adapta mejor a tus necesidades.",
    border: "border-[#ff3de4]",
    iconBackground: "bg-[#ff3de4]",
    icon: (
      <svg
        aria-hidden="true"
        viewBox="0 0 32 32"
        className="h-8 w-8 fill-none stroke-current"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="4" y="6" width="24" height="23" rx="2" />
        <path d="M10 3v6m12-6v6M4 12h24m-17 8 4 4 8-8" />
      </svg>
    ),
    iconImage:
      "https://wp.martzentertainment.com/wp-content/uploads/2026/09/reserva-ico.png",
  },
  {
    title: "Disfruta",
    description: "Vive un evento único e inolvidable.",
    border: "border-[#380074]",
    iconBackground: "bg-[#380074]",
    icon: (
      <svg
        aria-hidden="true"
        viewBox="0 0 32 32"
        className="h-8 w-8 fill-current"
      >
        <circle cx="12" cy="9" r="6" />
        <path d="M2 27v-3a10 10 0 0 1 15-8.7l-2 3.5A6 6 0 0 0 6 24v3H2Zm18-5 3 3 7-8-2.5-2.2-4.7 5.3-1.3-1.3L18 24l2 2Z" />
      </svg>
    ),
    iconImage:
      "https://wp.martzentertainment.com/wp-content/uploads/2026/09/registrate-ico.png",
  },
];

const serviceBenefits = [
  {
    description: "Comparar opciones y precios fácilmente.",
    image:
      "https://wp.martzentertainment.com/wp-content/uploads/2026/09/live-image.webp",
    imageAlt: "Celebración con música en vivo y asistentes",
  },
  {
    description: "Reservar rápido y seguro.",
    image:
      "https://wp.martzentertainment.com/wp-content/uploads/2026/09/food-image.webp",
    imageAlt: "Servicio de catering preparado para un evento",
  },
  {
    description: "Garantía de calidad en todos los servicios.",
    image:
      "https://wp.martzentertainment.com/wp-content/uploads/2026/09/party-image.webp",
    imageAlt: "DJ animando a los asistentes de un evento",
  },
];

type TrustFeature = {
  title: string;
  description: string;
  icon: ReactNode;
  iconImage?: string;
};

const trustFeatures: TrustFeature[] = [
  {
    title: "Pagos protegidos",
    description: "Transacciones seguras con garantía de reembolso.",
    icon: (
      <svg
        aria-hidden="true"
        viewBox="0 0 32 32"
        className="h-8 w-8 fill-current"
      >
        <path d="M16 2 28 7v8c0 8-5 12-12 16C9 27 4 23 4 15V7l12-5Zm-2 19 9-9-2-2-7 7-3-3-2 2 5 5Z" />
      </svg>
    ),
    iconImage:
      "https://wp.martzentertainment.com/wp-content/uploads/2026/09/pagos-protegidos.png",
  },
  {
    title: "Atención al cliente",
    description: "Soporte para resolver cualquier consulta.",
    icon: (
      <svg
        aria-hidden="true"
        viewBox="0 0 32 32"
        className="h-8 w-8 fill-none stroke-current"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M5 17v-3a11 11 0 0 1 22 0v3M5 16h4v8H7a3 3 0 0 1-3-3v-2a3 3 0 0 1 1-3Zm22 0h-4v8h2a3 3 0 0 0 3-3v-2a3 3 0 0 0-1-3ZM12 28h8m-7-7a5 5 0 0 0 6 0" />
        <circle cx="16" cy="13" r="4" />
      </svg>
    ),
    iconImage:
      "https://wp.martzentertainment.com/wp-content/uploads/2026/09/atencion-cliente.png",
  },
  {
    title: "Gestión transparente",
    description: "Seguimiento completo de tu evento desde la reserva.",
    icon: (
      <svg
        aria-hidden="true"
        viewBox="0 0 32 32"
        className="h-8 w-8 fill-none stroke-current"
        strokeWidth="2.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="16" cy="16" r="12" />
        <path d="m10 16 4 4 8-9" />
      </svg>
    ),
    iconImage:
      "https://wp.martzentertainment.com/wp-content/uploads/2026/09/gestion-transparente.png",
  },
];

const serviceCards = [
  {
    title: "Música en Vivo",
    description:
      "Desde bandas completas hasta solistas, encuentra el sonido perfecto para tu evento.",
    image:
      "https://wp.martzentertainment.com/wp-content/uploads/2026/09/music-image.webp",
    imageAlt: "Músicos en vivo durante una celebración",
  },
  {
    title: "Fotografía y Video",
    description:
      "Captura cada momento con profesionales que cuentan tu historia.",
    image:
      "https://wp.martzentertainment.com/wp-content/uploads/2026/09/fotografia-image.webp",
    imageAlt: "Cámara profesional de fotografía y video",
  },
  {
    title: "Catering y Bartenders",
    description:
      "Experiencias gastronómicas y bebidas para todos tus invitados.",
    image:
      "https://wp.martzentertainment.com/wp-content/uploads/2026/09/catering-image.webp",
    imageAlt: "Mesa con servicio de catering para un evento",
  },
];

export default function Home() {
  const location = useLocation();
  const navigate = useNavigate();
  const [contactStatus, setContactStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [activeLeadForm, setActiveLeadForm] = useState<"cliente" | "talento" | null>(null);

  useEffect(() => {
    if (location.pathname !== "/" || !location.state) return;

    const navigationState = location.state as {
      scrollTo?: string;
      leadForm?: "cliente" | "talento";
    };
    if (!navigationState.scrollTo && !navigationState.leadForm) return;

    const frameId = window.requestAnimationFrame(() => {
      if (navigationState.scrollTo) {
        document.getElementById(navigationState.scrollTo)?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
      if (navigationState.leadForm) {
        setActiveLeadForm(navigationState.leadForm);
      }
      navigate("/", { replace: true, state: null });
    });

    return () => window.cancelAnimationFrame(frameId);
  }, [location.key, location.pathname, location.state, navigate]);

  useEffect(() => {
    function handleOpenLeadForm(event: Event) {
      const form = (event as CustomEvent<"cliente" | "talento">).detail;
      if (form === "cliente" || form === "talento") setActiveLeadForm(form);
    }

    window.addEventListener("open-lead-form", handleOpenLeadForm);
    return () => window.removeEventListener("open-lead-form", handleOpenLeadForm);
  }, []);

  useEffect(() => {
    if (!activeLeadForm) return;

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setActiveLeadForm(null);
    }

    const previousBodyOverflow = document.body.style.overflow;
    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = previousBodyOverflow;
    };
  }, [activeLeadForm]);

  async function handleContactSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = {
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      phone: String(formData.get("phone") ?? ""),
      subject: String(formData.get("subject") ?? ""),
      message: String(formData.get("message") ?? ""),
    };

    setContactStatus("sending");

    try {
      const response = await fetch(CONTACT_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Contact API responded with ${response.status}`);
      }

      form.reset();
      setContactStatus("success");
    } catch {
      setContactStatus("error");
    }
  }

  return (
    <>
      <main>
        <section
          className="hero-banner flex min-h-screen lg:min-h-[80vh]  items-center overflow-hidden px-6 py-12 sm:px-12 lg:px-20"
          aria-labelledby="hero-title"
        >
          <div className="mx-auto w-full max-w-6xl">
            <div className="max-w-107.5">
              <h1 id="hero-title" className="leading-none">
                <span className="block font-hero text-[2.65rem] uppercase text-[#26353a] sm:text-5xl">
                  Encuentra el
                </span>
                <img
                  className="-mt-1 block h-auto w-52 object-contain object-left sm:w-64"
                  src="https://wp.martzentertainment.com/wp-content/uploads/2026/09/talento.png"
                  alt="Talento"
                />
                <span className="mt-1 block font-hero text-[2.55rem] uppercase leading-[0.92] text-[#26353a] sm:text-5xl">
                  Perfecto para tu evento
                </span>
              </h1>

              <p className="mt-4 max-w-90 text-sm leading-snug text-[#5d6b6e] sm:text-base">
                Conectamos a los mejores artistas con clientes que buscan {" "}
                <span className="font-montserrat-bold">entretenimiento excepcional</span>.
              </p>

              <div className="mt-6 flex flex-nowrap gap-2">
                <button
                  className="inline-flex min-h-10 items-center justify-center whitespace-nowrap rounded-sm bg-[#ec27cb] px-3 py-2 font-heading text-xs font-bold text-white transition-colors hover:bg-[#d51ab5] sm:px-4 sm:text-sm"
                  type="button"
                  onClick={() => setActiveLeadForm("cliente")}
                >
                  Cotizar evento
                </button>
                <button
                  className="inline-flex min-h-10 items-center justify-center whitespace-nowrap rounded-sm bg-[#36106f] px-3 py-2 font-heading text-xs font-bold text-white transition-colors hover:bg-[#260950] sm:px-4 sm:text-sm"
                  type="button"
                  onClick={() => setActiveLeadForm("talento")}
                >
                  Registrar talento
                </button>
              </div>
            </div>
          </div>
        </section>

        <section
          className="flex flex-col-reverse md:grid bg-white lg:min-h-155 lg:grid-cols-[43%_57%]"
          aria-labelledby="about-title"
        >
          <figure className="relative m-0 min-h-80 overflow-hidden sm:min-h-105 lg:min-h-155">
            <img
              className="absolute inset-0 h-full w-full object-cover object-center brightness-[0.9]"
              src="https://wp.martzentertainment.com/wp-content/uploads/2026/09/image-concierto.webp"
              alt="Músicos actuando frente a una multitud en un concierto"
              loading="lazy"
            />
          </figure>

          <div className="flex items-center px-6 py-12 sm:px-10 sm:py-16 lg:px-12 xl:px-20">
            <div className="ml-auto w-full max-w-3xl text-right">
              <h2
                id="about-title"
                className="text-2xl font-bold text-[#390074] sm:text-3xl"
              >
                Quiénes Somos
              </h2>
              <p className="mt-1 text-lg font-bold text-[#5d5d5d] sm:text-xl">
                Nuestra Historia
              </p>

              <div className="mt-7 space-y-4 text-sm leading-relaxed text-[#777] sm:text-[15px]">
                <p>
                  Martz Entertainment es una empresa de entretenimiento y
                  producción de eventos nacida en Miami, respaldada por un
                  equipo con más de 15 años de experiencia en la música y el
                  espectáculo.
                </p>
                <p>
                  Nuestra historia comienza en la música. La experiencia sobre
                  el escenario nos ha enseñado a reconocer lo que hace que un
                  show conecte con el público: buenos artistas, preparación,
                  energía y una producción que cuide cada detalle. Esa
                  experiencia es la base con la que hoy seleccionamos talentos y
                  creamos propuestas para nuestros clientes.
                </p>
                <p>
                  Con el tiempo, Martz creció más allá de la música en vivo. Hoy
                  reunimos artistas, DJs y profesionales de eventos para ofrecer
                  soluciones que pueden incluir sonido, iluminación, decoración,
                  catering, bartenders y otros servicios, según lo que cada
                  celebración necesite.
                </p>
              </div>

              <div className="mt-10 grid grid-cols-3 text-center">
                <div className="border-r border-[#4e0f90] px-2 sm:px-4">
                  <p className="text-lg font-heading! text-[#390074] sm:text-2xl">
                    +5.000
                  </p>
                  <p className="mt-1 text-[11px] leading-tight text-[#5e5e5e] sm:text-sm">
                    contrataciones exitosas
                  </p>
                </div>
                <div className="border-r border-[#4e0f90] px-2 sm:px-4">
                  <p className="text-lg font-heading! text-[#390074] sm:text-2xl">
                    Talentos
                  </p>
                  <p className="mt-1 text-[11px] leading-tight text-[#5e5e5e] sm:text-sm">
                    Ayudando a talentos a crecer profesionalmente
                  </p>
                </div>
                <div className="px-2 sm:px-4">
                  <p className="text-lg font-heading! text-[#390074] sm:text-2xl">
                    Eventos
                  </p>
                  <p className="mt-1 text-[11px] leading-tight text-[#5e5e5e] sm:text-sm">
                    Conectamos talento excepcional con eventos memorables
                  </p>
                </div>
              </div>

              <button
                className="mt-8 font-inter inline-flex min-h-10 items-center justify-center rounded-sm bg-[#ec27cb] px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-[#d51ab5]"
                type="button"
                onClick={() => setActiveLeadForm("cliente")}
              >
                Cotizar evento
              </button>
            </div>
          </div>
        </section>

        <section
          className="bg-white md:max-w-5xl mx-auto px-5 py-14 sm:px-10 sm:py-16 2xl:py-24"
          aria-labelledby="values-title"
        >
          <h2
            id="values-title"
            className="mb-10 text-center text-2xl font-bold text-[#3e0b78] sm:text-3xl"
          >
            Nuestros Valores
          </h2>

          <div className="mx-auto md:max-w-6xl">
            <Swiper
              slidesPerView={1}
              spaceBetween={14}
              breakpoints={{
                640: { slidesPerView: 2, spaceBetween: 18 },
                1024: { slidesPerView: 3, spaceBetween: 18 },
              }}
              className="px-3! py-2! sm:px-5!"
            >
              {values.map((value) => (
                <SwiperSlide key={value.title} className="h-auto">
                  <article className="flex h-full min-h-51.25 flex-col items-center rounded-xl border border-[#d0d0d0] bg-[#f5f5f5] px-5 py-5 text-center shadow-[0_8px_18px_rgba(0,0,0,0.06)] sm:px-6 md:min-h-55">
                    <div className="mb-3 flex h-14 items-center justify-center text-[#ec00bf]">
                      <img src={value.icon} className={value.height} />
                    </div>
                    <h3 className=" font-bold text-[#555]">
                      {value.title}
                    </h3>
                    <p className="mt-2 max-w-55 text-sm leading-snug text-[#5e5e5e] pb-4">
                      {value.description}
                    </p>
                    <span
                      className="mt-auto w-12 border-t border-[#a244ee] pt-4"
                      aria-hidden="true"
                    />
                  </article>
                </SwiperSlide>
              ))}
            </Swiper>

          </div>
        </section>

        <section
          className="services-banner relative isolate overflow-hidden px-5 py-8 sm:px-10 lg:min-h-85 lg:px-12 lg:py-0 2xl:py-14"
          aria-labelledby="services-title"
        >
          <div className="relative mx-auto grid w-full max-w-6xl items-center lg:min-h-85 lg:grid-cols-2">
            <div className="relative min-h-71.25 sm:min-h-77.5 lg:min-h-85">
              <img
                className="absolute left-[2%] top-[20%] z-20 w-32 -rotate-4 object-contain sm:w-40 lg:left-[12%] lg:w-44"
                src="https://wp.martzentertainment.com/wp-content/uploads/2026/09/Encuentra_.png"
                alt="Encuentra."
                loading="lazy"
              />
              <img
                className="absolute left-[64%] top-[14%] z-20 w-28 -rotate-2 object-contain sm:left-[59%] sm:w-36 lg:w-40"
                src="https://wp.martzentertainment.com/wp-content/uploads/2026/09/Conecta_.png"
                alt="Conecta."
                loading="lazy"
              />
              <img
                className="absolute bottom-auto top-10 left-45 -translate-x-1/2 rounded-t-[45%] object-top drop-shadow-[0_0_24px_rgba(236,0,191,0.4)] sm:h-[88%] sm:w-[54%] lg:left-0 lg:h-[84%] lg:w-full lg:translate-x-0 object-contain"
                src="https://wp.martzentertainment.com/wp-content/uploads/2026/09/image-dj.webp"
                alt="Artista actuando en vivo frente al público"
                loading="lazy"
              />
            </div>

            <div className="relative z-10 pb-4 pt-8 text-center lg:py-8 lg:text-right">
              <h2
                id="services-title"
                className="font-display text-3xl font-bold uppercase leading-[0.95] text-white sm:text-4xl lg:text-[2.65rem]"
              >
                <span className="block">Todo lo que tu</span>
                <span className="block whitespace-nowrap">
                  evento{" "}
                  <img
                    className="inline-block w-28 align-middle object-contain sm:w-36 lg:w-40"
                    src="https://wp.martzentertainment.com/wp-content/uploads/2026/09/necesita.png"
                    alt="necesita"
                    loading="lazy"
                  />
                </span>
              </h2>

              <ul
                className="mt-7 grid grid-cols-2 gap-y-5 sm:grid-cols-5 sm:gap-y-0 lg:mt-8"
                aria-label="Servicios de entretenimiento"
              >
                {entertainmentServices.map((service, index) => (
                  <li
                    key={service.title}
                    className={`flex flex-col items-center gap-2 px-2 text-[#00f0d2] sm:border-r sm:border-[#00f0d2]/45 ${index === entertainmentServices.length - 1 ? "sm:border-r-0" : ""} ${index === entertainmentServices.length - 1 ? "col-span-2 sm:col-span-1" : ""}`}
                  >
                    {service.iconImage ? (
                      <img
                        className="h-9  object-contain"
                        src={service.iconImage}
                        alt=""
                        aria-hidden="true"
                      />
                    ) : (
                      service.icon
                    )}
                    <span className="max-w-24 text-center font-display text-sm font-semibold uppercase leading-tight text-white sm:text-base">
                      {service.title}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section
          className="grid bg-white lg:grid-cols-[55%_45%]"
          aria-labelledby="how-it-works-title"
        >
          <div className="flex items-center justify-center px-6 py-12 sm:px-10 sm:py-16 lg:px-16 lg:py-6">
            <div className="w-full max-w-120">
              <h2
                id="how-it-works-title"
                className="text-2xl font-bold text-[#410080] sm:text-3xl"
              >
                ¿Cómo funciona?
              </h2>
              <p className="mt-1 text-base leading-snug text-[#858585] ">
                Organizar tu evento perfecto
                <br />
                nunca fue tan fácil
              </p>

              <ol className="mt-8 space-y-5 sm:mt-6 ">
                {howItWorksSteps.map((step, index) => (
                  <li
                    key={step.title}
                    className={`grid min-h-14 grid-cols-[64px_1fr] overflow-hidden rounded-full border-2 ${step.border}`}
                    data-aos="fade-left"
                    data-aos-delay={index * 100}
                  >
                    <span
                      className={`flex items-center justify-center text-white relative z-10 ${step.iconBackground}`}
                    >
                      {step.iconImage ? (
                        <img
                          className="h-6 object-contain"
                          src={step.iconImage}
                          alt=""
                          aria-hidden="true"
                        />
                      ) : (
                        step.icon
                      )}
                    </span>
                    <span className="flex flex-col justify-center px-3 py-2 sm:px-4">
                      <span className="text-[13px] leading-tight text-[#5c5c5c] sm:text-sm font-montserrat-bold">
                        {index + 1}. {step.title}
                      </span>
                      <span className="mt-1 text-xs leading-snug text-[#737373] sm:text-sm">
                        {step.description}
                      </span>
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          <figure className="relative m-0 max-h-90 2xl:min-h-160 overflow-hidden bg-[#a500d6] sm:min-h-120 lg:min-h-130">
            <img
              className="absolute inset-0 h-full w-full object-cover object-center"
              src="https://wp.martzentertainment.com/wp-content/uploads/2026/09/girl-image.webp"
              alt="DJ disfrutando de la música durante un evento"
              loading="lazy"
            />
          </figure>
        </section>

        <section
          className="relative isolate overflow-hidden bg-[#3b076f] px-5 py-8 sm:px-8 sm:py-10 2xl:py-14"
          aria-labelledby="service-benefits-title"
        >
          <div
            className="absolute inset-0 -z-10 bg-[#3b076f]/90"
            aria-hidden="true"
          />

          <div className="mx-auto w-full max-w-6xl md:max-w-5xl">
            <h2
              id="service-benefits-title"
              className="mb-6 text-center text-2xl font-bold leading-tight text-white sm:mb-8 sm:text-2xl"
            >
              Encuentra todo para
              <br />
              <span className="font-normal">tu evento</span>
            </h2>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
              {serviceBenefits.map((benefit, index) => (
                <article
                  key={benefit.description}
                  className="mx-auto flex w-full max-w-70 flex-col overflow-hidden rounded-2xl bg-[#f6f4f5] text-center shadow-lg"
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                >
                  <img
                    className="aspect-16/10 w-full h-60 object-cover"
                    src={benefit.image}
                    alt={benefit.imageAlt}
                    loading="lazy"
                  />
                  <p className="flex min-h-18 items-center justify-center px-5 py-4 text-sm leading-snug text-[#5e5e5e]">
                    {benefit.description}
                  </p>
                </article>
              ))}
            </div>

            <div className="mt-6 text-center sm:mt-7">
              <a
                className="inline-flex min-h-11 items-center justify-center rounded-xl bg-[#ec27cb] px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#d51ab5]"
                href="#services-title"
              >
                Explorar servicios
              </a>
            </div>
          </div>
        </section>

        <section
          className="grid bg-white md:grid-cols-[43%_57%]"
          aria-labelledby="trust-title"
        >
          <figure className="relative m-0 min-h-85 overflow-hidden sm:min-h-110 md:min-h-130">
            <img
              className="absolute inset-0 h-full w-full object-cover object-center"
              src="https://wp.martzentertainment.com/wp-content/uploads/2026/09/dj-image.webp"
              alt="DJ trabajando en su consola durante un evento"
              loading="lazy"
            />
          </figure>

          <div className="flex items-center justify-center px-6 py-12 sm:px-10 sm:py-14 lg:px-16">
            <div className="w-full max-w-lg">
              <h2
                id="trust-title"
                className="text-center text-2xl font-bold leading-tight text-[#390074] sm:text-right sm:text-3xl"
              >
                Gestión segura y transparente
              </h2>
              <p className="mx-auto mt-4 max-w-md text-center text-sm leading-relaxed text-[#5e5e5e] sm:ml-auto sm:mr-0 sm:text-right">
                Nuestro equipo administra los pagos y la plataforma para que
                tanto clientes como talentos disfruten de una experiencia sin
                preocupaciones.
              </p>

              <ul className="mt-8 space-y-4 sm:mt-10 sm:space-y-8">
                {trustFeatures.map((feature, index) => (
                  <li
                    key={feature.title}
                    className="flex items-center justify-center gap-4 sm:justify-end sm:gap-5"
                    data-aos="fade-right"
                    data-aos-delay={index * 100}
                  >
                    <div className="flex min-h-17.5 w-full max-w-[320px] flex-col justify-center rounded-2xl bg-[#fbfafb] px-5 py-3 text-center shadow-[0_6px_16px_rgba(0,0,0,0.12)] sm:text-right">
                      <h3 className="text-xs font-bold text-[#555] sm:text-sm">
                        {feature.title}
                      </h3>
                      <p className="mt-1 text-sm leading-snug text-[#5e5e5e]">
                        {feature.description}
                      </p>
                    </div>
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center text-[#ec00bf]">
                      {feature.iconImage ? (
                        <img
                          className="h-10 object-contain"
                          src={feature.iconImage}
                          alt=""
                          aria-hidden="true"
                        />
                      ) : (
                        feature.icon
                      )}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section
          className="bg-linear-to-b from-[#57119b] to-[#34066c] px-5 pt-12 text-white sm:px-8 "
          aria-labelledby="community-title"
        >
          <div className="mx-auto max-w-5xl">
            <header className="mx-auto max-w-2xl text-center">
              <h2
                id="community-title"
                className="text-xl font-bold leading-snug sm:text-2xl"
              >
                Haz crecer tu carrera participando en los
                <br className="hidden sm:block" /> mejores eventos
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-white/85 sm:text-base">
                Únete a nuestra comunidad de talentos verificados y conecta con
                clientes premium que buscan servicios de calidad excepcional.
              </p>
            </header>

            <div className="mx-auto mt-8 grid max-w-3xl grid-cols-1 gap-7 sm:mt-10 sm:grid-cols-2 sm:gap-10">
              <article className="mx-auto w-full max-w-[320px]">
                <p className="mb-3 flex justify-center">
                  <button
                    className="rounded-full bg-[#ec27cb] px-4 py-1 text-sm font-medium text-white transition-colors hover:bg-[#d51ab5]"
                    type="button"
                    onClick={() => setActiveLeadForm("cliente")}
                  >
                    Para Clientes
                  </button>
                </p>
                <img
                  className="aspect-4/5 w-full rounded-xl object-cover object-center shadow-xl"
                  src="https://wp.martzentertainment.com/wp-content/uploads/2026/09/clients-image.webp"
                  alt="Clientes disfrutando de una celebración con música en vivo"
                  loading="lazy"
                />
              </article>

              <article className="mx-auto w-full max-w-[320px]">
                <p className="mb-3 flex justify-center">
                  <button
                    className="rounded-full bg-white px-4 py-1 text-sm font-medium text-[#5a3881] transition-colors hover:bg-[#f1f2f6]"
                    type="button"
                    onClick={() => setActiveLeadForm("talento")}
                  >
                    Para Talentos
                  </button>
                </p>
                <img
                  className="aspect-4/5 w-full rounded-xl object-cover object-center shadow-xl"
                  src="https://wp.martzentertainment.com/wp-content/uploads/2026/09/talents-image.webp"
                  alt="Artista con audífonos lista para presentarse en un evento"
                  loading="lazy"
                />
              </article>
            </div>
          </div>
        </section>

        <section
          className="bg-white px-5 py-12 sm:px-8 "
          aria-labelledby="services-carousel-title"
        >
          <div className="mx-auto max-w-5xl">
            <header className="mb-8 text-center sm:mb-10">
              <h2
                id="services-carousel-title"
                className="text-2xl font-bold text-[#390074] sm:text-3xl"
              >
                Nuestros Servicios
              </h2>
              <p className="mt-2 text-sm text-[#5e5e5e] sm:text-base">
                Encuentra el talento perfecto para hacer de tu evento una
                experiencia inolvidable.
              </p>
            </header>

            <div className="relative mx-auto max-w-6xl px-7 sm:px-9">
              <button
                className="service-cards-prev absolute left-0 top-1/2 z-10 flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-[#242424] transition-colors hover:text-[#ec27cb]"
                type="button"
                aria-label="Ver servicios anteriores"
              >
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  className="h-6 w-6 fill-none stroke-current"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m15 18-6-6 6-6" />
                </svg>
              </button>

              <Swiper
                modules={[Navigation]}
                navigation={{
                  prevEl: ".service-cards-prev",
                  nextEl: ".service-cards-next",
                }}
                slidesPerView={1.15}
                spaceBetween={14}
                breakpoints={{
                  640: { slidesPerView: 2, spaceBetween: 18 },
                  1024: { slidesPerView: 3, spaceBetween: 18 },
                }}
                className="py-1!"
              >
                {serviceCards.map((service) => (
                  <SwiperSlide key={service.title} className="h-auto">
                    <article className="group relative flex aspect-3/4 h-full min-h-62.5 items-center justify-center overflow-hidden rounded-lg bg-[#32105a] text-center">
                      <img
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        src={service.image}
                        alt={service.imageAlt}
                        loading="lazy"
                      />
                      <div
                        className="absolute inset-0 bg-linear-to-t from-[#250642]/90 via-[#250642]/35 to-[#250642]/10"
                        aria-hidden="true"
                      />
                      <div className="relative z-10 px-5 py-6 text-white">
                        <h3 className="text-base font-bold sm:text-lg">
                          {service.title}
                        </h3>
                        <p className="mt-3 text-left text-sm leading-snug text-white/90">
                          {service.description}
                        </p>
                      </div>
                    </article>
                  </SwiperSlide>
                ))}
              </Swiper>

              <button
                className="service-cards-next absolute right-0 top-1/2 z-10 flex h-8 w-8 translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-[#242424] transition-colors hover:text-[#ec27cb]"
                type="button"
                aria-label="Ver más servicios"
              >
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  className="h-6 w-6 fill-none stroke-current"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </button>
            </div>
          </div>
        </section>

        <section
          className="bg-white px-5 py-12 sm:px-8"
          aria-labelledby="faq-title"
        >
          <div className="mx-auto max-w-155">
            <header className="mb-7 text-center sm:mb-8">
              <h2
                id="faq-title"
                className="text-2xl font-bold text-[#390074] sm:text-3xl"
              >
                Preguntas Frecuentes
              </h2>
              <p className="mt-2 text-sm text-[#5e5e5e] sm:text-base">
                Resolvemos las dudas más comunes sobre nuestra plataforma.
              </p>
            </header>

            <div className="space-y-2">
              <details className="font-montserrat-medium group rounded-2xl border border-[#dedede] bg-white shadow-[0_3px_10px_rgba(0,0,0,0.07)]">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-3  text-[#5e5e5e] [&::-webkit-details-marker]:hidden">
                  ¿Cómo funciona el proceso de reserva?
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    className="h-5 w-5 shrink-0 fill-none stroke-current text-black transition-transform group-open:rotate-180"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </summary>
                <p className="px-5 pb-4 pr-12 text-sm leading-relaxed text-[#5e5e5e]">
                  Explora los servicios disponibles, elige el que mejor se
                  adapte a tu evento y envía una solicitud. Te acompañamos para
                  confirmar los detalles y completar la reserva.
                </p>
              </details>

              <details className="font-montserrat-medium group rounded-2xl border border-[#dedede] bg-white shadow-[0_3px_10px_rgba(0,0,0,0.07)]">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-3 text-[#5e5e5e] [&::-webkit-details-marker]:hidden">
                  ¿Qué garantías ofrecen sobre la calidad del servicio?
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    className="h-5 w-5 shrink-0 fill-none stroke-current text-black transition-transform group-open:rotate-180"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </summary>
                <p className="px-5 pb-4 pr-12 text-sm leading-relaxed text-[#5e5e5e]">
                  Trabajamos con talentos y proveedores verificados. Nuestro
                  equipo da seguimiento a cada reserva para ayudarte a resolver
                  cualquier inconveniente.
                </p>
              </details>

              <details className="font-montserrat-medium group rounded-2xl border border-[#dedede] bg-white shadow-[0_3px_10px_rgba(0,0,0,0.07)]">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-3  text-[#5e5e5e] [&::-webkit-details-marker]:hidden">
                  ¿Cuánto cuesta usar la plataforma?
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    className="h-5 w-5 shrink-0 fill-none stroke-current text-black transition-transform group-open:rotate-180"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </summary>
                <p className="px-5 pb-4 pr-12 text-sm leading-relaxed text-[#5e5e5e]">
                  Crear una cuenta y explorar opciones es gratis. El precio
                  final depende del servicio, el proveedor y las necesidades de
                  tu evento; recibirás los detalles antes de confirmar.
                </p>
              </details>

              <details className="font-montserrat-medium group rounded-2xl border border-[#dedede] bg-white shadow-[0_3px_10px_rgba(0,0,0,0.07)]">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-3  text-[#5e5e5e] [&::-webkit-details-marker]:hidden">
                  ¿Puedo cancelar una reserva?
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    className="h-5 w-5 shrink-0 fill-none stroke-current text-black transition-transform group-open:rotate-180"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </summary>
                <p className="px-5 pb-4 pr-12 text-sm leading-relaxed text-[#5e5e5e]">
                  Las condiciones de cancelación pueden variar según el
                  proveedor y la fecha del evento. Podrás revisarlas antes de
                  reservar y contactar a nuestro equipo si necesitas ayuda.
                </p>
              </details>

              <details className="font-montserrat-medium group rounded-2xl border border-[#dedede] bg-white shadow-[0_3px_10px_rgba(0,0,0,0.07)]">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-3  text-[#5e5e5e] [&::-webkit-details-marker]:hidden">
                  ¿Cómo me registro como talento?
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    className="h-5 w-5 shrink-0 fill-none stroke-current text-black transition-transform group-open:rotate-180"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </summary>
                <p className="px-5 pb-4 pr-12 text-sm leading-relaxed text-[#5e5e5e]">
                  Selecciona “Registrar talento”, crea tu perfil y comparte
                  información sobre tus servicios. El equipo revisará tus datos
                  para completar la verificación.
                </p>
              </details>

              <details className="font-montserrat-medium group rounded-2xl border border-[#dedede] bg-white shadow-[0_3px_10px_rgba(0,0,0,0.07)]">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-3  text-[#5e5e5e] [&::-webkit-details-marker]:hidden">
                  ¿Qué tipos de eventos manejan?
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    className="h-5 w-5 shrink-0 fill-none stroke-current text-black transition-transform group-open:rotate-180"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </summary>
                <p className="px-5 pb-4 pr-12 text-sm leading-relaxed text-[#5e5e5e]">
                  Puedes encontrar opciones para celebraciones privadas, bodas,
                  eventos corporativos, fiestas y otros encuentros que necesiten
                  entretenimiento o producción.
                </p>
              </details>
            </div>
          </div>
        </section>

        <section
          id="contacto"
          className="relative isolate overflow-hidden bg-linear-to-b from-[#57119b] to-[#34066c] px-5 py-12 text-white sm:px-8 sm:py-16"
          aria-labelledby="contact-title"
        >
          <img
            className="pointer-events-none absolute bottom-0 right-0 -z-10 hidden h-full max-h-[680px] w-[42%] object-contain object-right-bottom lg:block"
            src="https://wp.martzentertainment.com/wp-content/uploads/2026/09/form.webp"
            alt=""
            aria-hidden="true"
            loading="lazy"
          />

          <div className="relative mx-auto w-full max-w-6xl">
            <div className="w-full max-w-[540px]">
              <h2 id="contact-title" className="text-2xl font-bold text-white sm:text-3xl">
                Contáctanos
              </h2>
              <h3 className="mt-1 text-lg font-bold text-white sm:text-xl">
                Solicita más información
              </h3>
              <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/80">
                Completa el formulario y nos pondremos en contacto contigo a la brevedad.
              </p>

              <form className="mt-7 grid grid-cols-1 gap-4 sm:grid-cols-2" onSubmit={handleContactSubmit}>
                <label className="sr-only" htmlFor="contact-name">Nombre</label>
                <input
                  className="min-h-[54px] min-w-0 rounded-xl border border-white/10 bg-white/20 px-5 text-sm text-white outline-none placeholder:text-white/85 focus:border-white/60 focus:ring-2 focus:ring-white/25"
                  id="contact-name"
                  name="name"
                  type="text"
                  placeholder="Nombre"
                  autoComplete="name"
                  required
                />

                <label className="sr-only" htmlFor="contact-email">Email</label>
                <input
                  className="min-h-[54px] min-w-0 rounded-xl border border-white/10 bg-white/20 px-5 text-sm text-white outline-none placeholder:text-white/85 focus:border-white/60 focus:ring-2 focus:ring-white/25"
                  id="contact-email"
                  name="email"
                  type="email"
                  placeholder="Email"
                  autoComplete="email"
                  required
                />

                <label className="sr-only" htmlFor="contact-phone">Teléfono</label>
                <input
                  className="min-h-[54px] min-w-0 rounded-xl border border-white/10 bg-white/20 px-5 text-sm text-white outline-none placeholder:text-white/85 focus:border-white/60 focus:ring-2 focus:ring-white/25"
                  id="contact-phone"
                  name="phone"
                  type="tel"
                  placeholder="Teléfono"
                  autoComplete="tel"
                />

                <label className="sr-only" htmlFor="contact-subject">Asunto</label>
                <input
                  className="min-h-[54px] min-w-0 rounded-xl border border-white/10 bg-white/20 px-5 text-sm text-white outline-none placeholder:text-white/85 focus:border-white/60 focus:ring-2 focus:ring-white/25"
                  id="contact-subject"
                  name="subject"
                  type="text"
                  placeholder="Asunto"
                  required
                />

                <label className="sr-only" htmlFor="contact-message">Mensaje</label>
                <textarea
                  className="min-h-[190px] min-w-0 resize-y rounded-xl border border-white/10 bg-white/20 px-5 py-4 text-sm text-white outline-none placeholder:text-white/85 focus:border-white/60 focus:ring-2 focus:ring-white/25 sm:col-span-2"
                  id="contact-message"
                  name="message"
                  placeholder="Mensaje"
                  required
                />

                <button
                  className="inline-flex min-h-11 items-center justify-center rounded-md bg-[#ec27cb] px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#d51ab5] disabled:cursor-wait disabled:opacity-70 sm:col-span-2"
                  type="submit"
                  disabled={contactStatus === "sending"}
                >
                  {contactStatus === "sending" ? "Enviando..." : "Enviar Mensaje"}
                </button>

                {contactStatus === "success" && (
                  <p className="text-sm text-white sm:col-span-2" role="status">
                    Tu mensaje fue enviado. Gracias por contactarnos.
                  </p>
                )}
                {contactStatus === "error" && (
                  <p className="text-sm text-white sm:col-span-2" role="alert">
                    No pudimos enviar tu mensaje. Inténtalo de nuevo más tarde.
                  </p>
                )}
              </form>
            </div>
          </div>
        </section>
      </main>
      {activeLeadForm && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-black/60 p-4"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setActiveLeadForm(null);
          }}
        >
          <div
            className="my-auto max-h-[calc(100vh-2rem)] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-5 shadow-2xl sm:p-8"
            role="dialog"
            aria-modal="true"
            aria-labelledby={activeLeadForm === "cliente" ? "form-cliente-title" : "form-talento-title"}
          >
            {activeLeadForm === "cliente" ? (
              <FormCliente onClose={() => setActiveLeadForm(null)} />
            ) : (
              <FormTalento onClose={() => setActiveLeadForm(null)} />
            )}
          </div>
        </div>
      )}
    </>
  );
}
