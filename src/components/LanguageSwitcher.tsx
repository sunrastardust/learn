// Was macht diese Datei?
// Der Umschalter zwischen Deutsch und Englisch (oben rechts). Zwei Knoepfe,
// der aktive ist hervorgehoben. Beim Klick ruft er setLanguage() aus dem
// Context auf -- danach rendert die ganze App in der neuen Sprache neu.
//
// What does this file do?
// The switch between German and English (top right). Two buttons, the active
// one is highlighted. On click it calls setLanguage() from the context --
// after that the whole app re-renders in the new language.

import { useLanguage } from "../i18n/LanguageContext";
import type { Language } from "../i18n/LanguageContext";

// Die auswaehlbaren Sprachen mit ihrem Anzeige-Kuerzel.
// `as const` sagt TypeScript: Diese Werte sind fest ("de"/"en"), nicht
// irgendein beliebiger string -- so passen sie exakt zum Typ `Language`.
// The selectable languages with their display labels.
// `as const` tells TypeScript: these values are fixed ("de"/"en"), not just
// any string -- so they exactly match the `Language` type.
const languages = [
  { code: "de", label: "DE" },
  { code: "en", label: "EN" },
] as const;

export function LanguageSwitcher() {
  // Aktuelle Sprache und Umschalt-Funktion aus dem Context holen.
  // Get the current language and the switch function from the context.
  const { language, setLanguage, t } = useLanguage();

  return (
    <div className="language-switcher" role="group" aria-label={t("sprache.titel")}>
      {languages.map((entry) => (
        <button
          key={entry.code}
          className={
            entry.code === language ? "language-button active" : "language-button"
          }
          // setLanguage erwartet den Typ `Language`. Dank `as const` weiss
          // TypeScript, dass code genau "de" | "en" ist.
          // setLanguage expects the `Language` type. Thanks to `as const`,
          // TypeScript knows that code is exactly "de" | "en".
          onClick={() => setLanguage(entry.code as Language)}
        >
          {entry.label}
        </button>
      ))}
    </div>
  );
}
