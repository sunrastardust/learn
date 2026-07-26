// Was macht diese Datei?
// Das HERZSTUECK der Mehrsprachigkeit. Sie stellt drei Dinge bereit:
//   1) welche Sprache gerade aktiv ist (`language`)
//   2) wie man sie umschaltet (`setLanguage`)
//   3) die Funktion `t()`, die zu einem Schluessel den passenden Text liefert.
// Damit JEDE Komponente an diese Werte kommt -- egal wie tief verschachtelt --
// nutzen wir einen React-CONTEXT: oben mit <LanguageProvider> gefuellt, unten
// per Hook `useLanguage()` abgeholt. So muss man die Sprache nicht per Prop
// durch die ganze App reichen.
//
// What does this file do?
// The HEART of the multi-language support. It provides three things:
//   1) which language is currently active (`language`)
//   2) how to switch it (`setLanguage`)
//   3) the function `t()`, which returns the matching text for a key.
// So that EVERY component can reach these values -- no matter how deeply
// nested -- we use a React CONTEXT: filled at the top with <LanguageProvider>,
// picked up below via the hook `useLanguage()`. This way you don't have to
// pass the language through the whole app via props.

import { createContext, useContext, useState } from "react";
// `ReactNode` ist der Typ fuer "beliebiger Inhalt zwischen zwei Tags".
// `ReactNode` is the type for "any content between two tags".
import type { ReactNode } from "react";

// Die beiden Sprachdateien. Dank `resolveJsonModule` in der tsconfig koennen
// wir JSON direkt wie ein normales Objekt importieren.
// The two language files. Thanks to `resolveJsonModule` in tsconfig we can
// import JSON directly like a normal object.
import de from "./de.json";
import en from "./en.json";

// Die erlaubten Sprachen -- ein "Union-Typ": entweder "de" ODER "en".
// Tippt man versehentlich "fr", meckert TypeScript sofort.
// The allowed languages -- a "union type": either "de" OR "en".
// If you accidentally type "fr", TypeScript complains immediately.
export type Language = "de" | "en";

// Eine Tabelle: pro Sprache ein Woerterbuch (Schluessel -> Text).
// `Record<A, B>` heisst "ein Objekt mit Schluesseln vom Typ A und Werten B".
// A table: one dictionary per language (key -> text).
// `Record<A, B>` means "an object with keys of type A and values of type B".
const dictionaries: Record<Language, Record<string, string>> = { de, en };

// Optionale Werte fuer Platzhalter wie {count} in einem Text.
// Optional values for placeholders like {count} in a text.
type Values = Record<string, string | number>;

// So sieht der Inhalt des Contexts aus -- genau diese drei Dinge gibt es.
// This is what the context content looks like -- exactly these three things.
type LanguageContextType = {
  language: Language;
  setLanguage: (next: Language) => void;
  t: (key: string, values?: Values) => string;
  // Das komplette Woerterbuch der aktuellen Sprache (Schluessel -> Text).
  // Normalerweise braucht man nur t(); die Suche will aber ALLE Texte
  // durchsehen koennen, nicht nur einen einzelnen Schluessel abfragen.
  // The complete dictionary of the current language (key -> text).
  // Usually t() is all you need; but the search wants to look through ALL
  // texts, not just fetch a single key.
  dict: Record<string, string>;
};

// Der eigentliche Context. Startwert `null`, weil er erst im Provider
// gefuellt wird. Der Hook unten prueft, dass er wirklich vorhanden ist.
// The actual context. Initial value `null` because it is only filled inside
// the provider. The hook below checks that it really exists.
const LanguageContext = createContext<LanguageContextType | null>(null);

// Der PROVIDER umschliesst die App und stellt die Sprach-Werte bereit.
// `children` ist alles zwischen <LanguageProvider> ... </LanguageProvider>.
// The PROVIDER wraps the app and supplies the language values.
// `children` is everything between <LanguageProvider> ... </LanguageProvider>.
export function LanguageProvider({ children }: { children: ReactNode }) {
  // Die aktuelle Sprache liegt im State. Startsprache: Deutsch.
  // The current language lives in state. Starting language: German.
  const [language, setLanguage] = useState<Language>("de");

  // Die Uebersetzungs-Funktion: holt den Text zum Schluessel in der aktuellen
  // Sprache und ersetzt optionale Platzhalter.
  // The translation function: fetches the text for a key in the current
  // language and replaces optional placeholders.
  function t(key: string, values?: Values): string {
    // Fehlt der Schluessel, zeigen wir den Schluessel selbst -- so faellt ein
    // Tippfehler in der JSON-Datei sofort auf.
    // If the key is missing we show the key itself -- that way a typo in the
    // JSON file is spotted immediately.
    let text = dictionaries[language][key] ?? key;

    // Platzhalter ersetzen: aus "{count}" wird z.B. "3".
    // Replace placeholders: "{count}" becomes e.g. "3".
    if (values) {
      for (const [name, value] of Object.entries(values)) {
        text = text.replaceAll(`{${name}}`, String(value));
      }
    }
    return text;
  }

  // `value` ist das, was alle Kinder ueber useLanguage() erhalten.
  // `value` is what all children receive via useLanguage().
  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, dict: dictionaries[language] }}>
      {children}
    </LanguageContext.Provider>
  );
}

// Der praktische Hook: jede Komponente ruft `const { t } = useLanguage()` auf.
// Er holt den Context und stellt sicher, dass ein Provider darum herum liegt.
//
// The convenient hook: every component calls `const { t } = useLanguage()`.
// It fetches the context and makes sure a provider wraps the component.
//
// Hinweis zur naechsten Zeile: Der Linter mag es eigentlich nicht, wenn eine
// Datei eine Komponente (LanguageProvider) UND eine Funktion (diesen Hook)
// exportiert -- das kann das "Hot Reloading" beim Entwickeln leicht bremsen.
// Fuer dieses Lernprojekt gehoeren beide aber absichtlich zusammen, darum
// schalten wir die Warnung fuer genau diese eine Stelle ab.
//
// Note on the next line: the linter normally dislikes a file exporting both a
// component (LanguageProvider) AND a function (this hook) -- it can slightly
// slow down "hot reloading" during development. In this learning project the
// two deliberately belong together, so we disable the warning for exactly
// this one spot.
// oxlint-disable-next-line react/only-export-components
export function useLanguage(): LanguageContextType {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage muss innerhalb von <LanguageProvider> stehen. / useLanguage must be used inside <LanguageProvider>.");
  }
  return ctx;
}
