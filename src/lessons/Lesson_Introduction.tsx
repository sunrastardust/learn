// Was macht diese Datei?
// Die Lektion "Einfuehrung": Sie erklaert in einfachen Worten, was React ist.
// Alle Texte kommen ueber t() aus den Sprachdateien -- so ist die Lektion
// zweisprachig und du siehst i18n gleich in Aktion.
//
// What does this file do?
// The "Introduction" lesson: it explains in simple words what React is.
// All texts come from the language files via t() -- so the lesson is bilingual
// and you see i18n in action right away.

import { useState } from "react";
import { useLanguage } from "../i18n/LanguageContext";

export function Lesson_Introduction() {
  // t() liefert den Text zum Schluessel in der aktuellen Sprache.
  // t() returns the text for a key in the current language.
  const { t } = useLanguage();

  // Ein kleiner Zaehler, damit du siehst, dass React wirklich "lebt":
  // Klick -> State aendert sich -> die Zeile unten aktualisiert sich sofort.
  // A little counter so you can see that React is really "alive":
  // click -> state changes -> the line below updates immediately.
  const [count, setCount] = useState(0);

  return (
    <div className="lesson-text">
      <h3>{t("einf.h")}</h3>
      <p>{t("einf.p1")}</p>
      <p>{t("einf.p2")}</p>
      <p>{t("einf.p3")}</p>

      <p>{t("einf.beispiel.hinweis")}</p>
      <button onClick={() => setCount((value) => value + 1)}>
        {t("einf.beispiel.knopf")}
      </button>{" "}
      {/* Der Platzhalter {count} im Text wird durch die echte Zahl ersetzt.
          The {count} placeholder in the text is replaced by the real number. */}
      <strong>{t("einf.beispiel.zaehler", { count })}</strong>
    </div>
  );
}
