import { createContext, useContext } from "react";

export type Language = "es" | "en";

export type LanguageContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
  translationError: boolean;
};

export const LanguageContext = createContext<LanguageContextValue | null>(null);

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage debe usarse dentro de LanguageProvider.");
  }
  return context;
}
