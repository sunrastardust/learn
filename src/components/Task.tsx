// Was macht diese Datei?
// Eine kleine, WIEDERVERWENDBARE Komponente: die "Aufgabe fuer dich"-Box.
// Jede Lektion nutzt sie, damit die Aufgabe ueberall gleich aussieht. Genau
// dafuer sind Komponenten da -- einmal bauen, ueberall verwenden.
// Der fertige Aufgaben-Text kommt als Prop rein; die Ueberschrift holt sich
// die Box selbst uebersetzt aus dem Sprach-Context.
//
// What does this file do?
// A small, REUSABLE component: the "your task" box. Every lesson uses it so
// the task looks the same everywhere. That is exactly what components are for
// -- build once, use everywhere. The finished task text comes in as a prop;
// the heading is fetched (translated) by the box itself from the language
// context.

import { useLanguage } from "../i18n/LanguageContext";

// Die Props: nur der (bereits uebersetzte) Aufgaben-Text.
// The props: just the (already translated) task text.
type TaskProps = {
  text: string;
};

export function Task({ text }: TaskProps) {
  const { t } = useLanguage();
  return (
    <div className="task">
      <strong>✏️ {t("aufgabe.titel")}</strong>
      {/* Der Text kann mit \n getrennte Schritte enthalten. Dank
          "white-space: pre-line" (App.css) erscheinen sie als eigene Zeilen.
          The text may contain steps separated by \n. Thanks to
          "white-space: pre-line" (App.css) they appear as separate lines. */}
      <p>{text}</p>
    </div>
  );
}
