// Was macht diese Datei?
// Die Lektion "Mehrsprachigkeit": Sie erklaert, WIE die DE/EN-Umschaltung
// funktioniert -- also genau das, was du gerade benutzt. Das Live-Beispiel
// zeigt die aktuelle Sprache und was der Schluessel "nav.weiter" gerade ergibt.
//
// What does this file do?
// The "Multi-language" lesson: it explains HOW the DE/EN switch works -- that
// is, exactly what you are using right now. The live example shows the current
// language and what the key "nav.weiter" currently yields.

import { useLanguage } from "../i18n/LanguageContext";
import { LivePlayground } from "../components/LivePlayground";

// Der Anfangs-Code fuer den Live-Editor: das Context-Grundprinzip im
// Kleinen -- eine Farbe statt einer Sprache, sonst dieselbe Mechanik.
// The initial code for the live editor: the context principle in
// miniature -- a colour instead of a language, otherwise the same mechanics.
const playgroundCode = `
const ColorContext = createContext("tomato");

function DeepChild() {
  // Liest den Wert aus dem Context / reads the value from the context:
  const color = useContext(ColorContext);
  return <p style={{ color }}>Meine Farbe kommt aus dem Context!</p>;
}

render(
  <ColorContext.Provider value="seagreen">
    <DeepChild />
  </ColorContext.Provider>
);
`;

export function Lesson_MultiLanguage() {
  // Neben t() holen wir hier auch `language`, um sie im Beispiel anzuzeigen.
  // Besides t() we also grab `language` to show it in the example.
  const { t, language } = useLanguage();

  return (
    <div className="lesson-text">
      <h3>{t("mehr.h")}</h3>
      <p>{t("mehr.p1")}</p>
      <p>{t("mehr.p2")}</p>
      <p>{t("mehr.p3")}</p>
      <p>{t("mehr.p4")}</p>
      <p>{t("mehr.p5")}</p>

      {/* Live-Beispiel: aktuelle Sprache + ein uebersetzter Schluessel.
          Live example: current language + one translated key. */}
      <p>{t("mehr.beispiel.aktuell", { language })}</p>
      <p>
        {t("mehr.beispiel.schluessel")} <code>{t("nav.weiter")}</code>
      </p>

      {/* Das Context-Prinzip zum Selbst-Ausprobieren.
          The context principle for trying out yourself. */}
      <p>{t("mehr.p6")}</p>
      <LivePlayground code={playgroundCode} />
    </div>
  );
}
