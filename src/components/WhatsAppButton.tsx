import { useLocation } from "react-router";

const WHATSAPP_URL = "https://wa.me/message/6HY4ZDIRVW6BI1";

export default function WhatsAppButton() {
  const { pathname } = useLocation();

  if (pathname !== "/" && pathname !== "/blog") return null;

  return (
    <a
      aria-label="Contáctanos por WhatsApp"
      className="fixed right-4 bottom-4 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25d366] text-white shadow-lg transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#128c7e] sm:right-6 sm:bottom-6"
      href={WHATSAPP_URL}
      rel="noopener noreferrer"
      target="_blank"
      title="Contáctanos por WhatsApp"
    >
      <svg
        aria-hidden="true"
        className="h-8 w-8 fill-current"
        viewBox="0 0 32 32"
      >
        <path d="M16.04 3C8.87 3 3.04 8.74 3.04 15.8c0 2.52.75 4.87 2.04 6.85L3 29l6.57-2.02a13.2 13.2 0 0 0 6.47 1.68h.01c7.17 0 13.01-5.74 13.01-12.8S23.22 3 16.04 3Zm0 23.5h-.01a10.9 10.9 0 0 1-5.55-1.51l-.4-.24-3.9 1.2 1.27-3.74-.26-.4a10.45 10.45 0 0 1-1.67-5.7c0-5.83 4.85-10.57 10.81-10.57 2.89 0 5.6 1.1 7.64 3.1a10.42 10.42 0 0 1 3.17 7.47c0 5.83-4.85 10.57-10.81 10.57Zm5.93-7.92c-.32-.16-1.89-.91-2.18-1.01-.29-.1-.5-.16-.7.16-.21.31-.8 1-1 1.2-.19.21-.37.23-.69.08-.32-.16-1.34-.49-2.55-1.55-.94-.81-1.57-1.8-1.75-2.11-.18-.32-.02-.49.14-.64.14-.14.32-.37.48-.56.16-.18.21-.31.32-.52.1-.21.05-.39-.03-.55-.08-.16-.7-1.67-.96-2.29-.25-.6-.51-.52-.7-.53h-.59c-.2 0-.54.08-.83.39-.29.31-1.09 1.05-1.09 2.56s1.12 2.96 1.28 3.17c.16.21 2.2 3.3 5.33 4.63.75.32 1.34.51 1.8.65.75.23 1.43.2 1.97.12.6-.09 1.89-.75 2.15-1.48.27-.73.27-1.35.19-1.48-.08-.13-.29-.21-.61-.37Z" />
      </svg>
    </a>
  );
}
