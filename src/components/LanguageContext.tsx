import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { LanguageContext, type Language } from "./language-context";

type GoogleTranslateElementOptions = {
  pageLanguage: string;
  includedLanguages: string;
  autoDisplay: boolean;
};

declare global {
  interface Window {
    googleTranslateElementInit?: () => void;
    google?: {
      translate?: {
        TranslateElement?: new (
          options: GoogleTranslateElementOptions,
          elementId: string,
        ) => unknown;
      };
    };
  }
}

const GOOGLE_TRANSLATE_SCRIPT_ID = "google-translate-script";

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("es");
  const [translationError, setTranslationError] = useState(false);
  const languageRef = useRef(language);
  const translationRequestRef = useRef(0);

  const applyGoogleLanguage = useCallback((targetLanguage: Language) => {
    const requestId = ++translationRequestRef.current;
    let attempts = 0;
    document.documentElement.lang = targetLanguage;
    setTranslationError(false);

    const selectLanguage = () => {
      if (requestId !== translationRequestRef.current) {
        return;
      }

      const select = document.querySelector<HTMLSelectElement>(".goog-te-combo");
      const optionExists = select
        && Array.from(select.options).some((option) => option.value === targetLanguage);

      if (select && optionExists) {
        select.value = targetLanguage;
        select.dispatchEvent(new Event("change", { bubbles: true }));
        setTranslationError(false);
        return;
      }

      attempts += 1;
      if (attempts < 20) {
        window.setTimeout(selectLanguage, 250);
      } else {
        setTranslationError(true);
      }
    };

    selectLanguage();
  }, []);

  const setLanguage = useCallback((nextLanguage: Language) => {
    languageRef.current = nextLanguage;
    setLanguageState(nextLanguage);
    applyGoogleLanguage(nextLanguage);
  }, [applyGoogleLanguage]);

  useEffect(() => {
    document.documentElement.lang = languageRef.current;
    window.googleTranslateElementInit = () => {
      const TranslateElement = window.google?.translate?.TranslateElement;
      if (!TranslateElement) {
        setTranslationError(true);
        return;
      }

      if (!document.querySelector(".goog-te-combo")) {
        new TranslateElement(
          {
            pageLanguage: "es",
            includedLanguages: "en,es",
            autoDisplay: false,
          },
          "google_translate_element",
        );
      }
      applyGoogleLanguage(languageRef.current);
    };

    let script = document.getElementById(GOOGLE_TRANSLATE_SCRIPT_ID) as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement("script");
      script.id = GOOGLE_TRANSLATE_SCRIPT_ID;
      script.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      script.onerror = () => setTranslationError(true);
      document.body.appendChild(script);
    } else if (window.google?.translate?.TranslateElement) {
      window.googleTranslateElementInit();
    }
  }, [applyGoogleLanguage]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, translationError }}>
      {children}
      <div id="google_translate_element" aria-hidden="true" />
    </LanguageContext.Provider>
  );
}
