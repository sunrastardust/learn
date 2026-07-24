// Was macht diese Datei?
// Die Lektion "Ueber dieses Projekt": Sie erklaert, wie der Lernpfad aufgebaut
// ist, wie du ihn bedienst -- und warum du hier gefahrlos experimentieren
// kannst (Spielwiese!). Alle Texte kommen aus den JSON-Sprachdateien via t().
//
// What does this file do?
// The "About this project" lesson: it explains how the learning path is
// built, how you operate it -- and why you can safely experiment here
// (playground!). All texts come from the JSON language files via t().

import { useLanguage } from "../i18n/LanguageContext";
// Wir importieren die Lektions-Liste, um ihre Anzahl LIVE anzuzeigen -- so
// sieht man, wie React aus Daten (dem Array) Anzeige macht.
// We import the lesson list to show its count LIVE -- demonstrating how React
// turns data (the array) into display.
import { lessons } from "./lessons";

export function Lesson_AboutThisProject() {
  const { t } = useLanguage();

  return (
    <div className="lesson-text">
      <h3>{t("proj.h")}</h3>
      <p>{t("proj.p1")}</p>
      <p>{t("proj.p2")}</p>
      <p>{t("proj.p3")}</p>
      <p>{t("proj.p4")}</p>
      <p>{t("proj.p5")}</p>

      {/* lessons.length ist die aktuelle Anzahl. Fuegst du eine Lektion
          hinzu, aendert sich diese Zeile automatisch mit.
          lessons.length is the current count. If you add a lesson, this
          line updates automatically. */}
      <p>
        <strong>{t("proj.zaehlung", { count: lessons.length })}</strong>
      </p>

      {/* Der Spielwiesen-Teil: Warum man hier nichts kaputt machen kann.
          The playground part: why you cannot break anything here. */}
      <h4>{t("proj.spiel.h")}</h4>
      <p>{t("proj.spiel.p1")}</p>
      <p>{t("proj.spiel.p2")}</p>
      <p>{t("proj.spiel.p3")}</p>
    </div>
  );
}
