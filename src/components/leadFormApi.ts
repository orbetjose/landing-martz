type FormApiRoute = "contactos" | "eventos" | "talentos";

export function getFormApiEndpoint(route: FormApiRoute) {
  const wordpressDomain = import.meta.env.VITE_WP_DOMAIN;

  if (!wordpressDomain) {
    return undefined;
  }

  return `${wordpressDomain.replace(/\/+$/, "")}/wp-json/martz/v1/${route}`;
}

export async function submitLeadForm(
  endpoint: string | undefined,
  payload: Record<string, string>,
) {
  if (!endpoint) {
    throw new Error(
      "El endpoint de WordPress para este formulario todavía no está configurado.",
    );
  }

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(`WordPress respondió con el estado ${response.status}.`);
  }
}
