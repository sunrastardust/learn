// Was macht diese Datei?
// Das ist die HUELLE des Lernpfads -- die Haupt-Komponente der App. Sie merkt
// sich mit useState, welche Lektion gerade offen ist, zeigt links die Liste
// und rechts den Inhalt der gewaehlten Lektion. Das Umschalten laeuft bewusst
// nur ueber State (noch KEIN Router -- das kommt spaeter).
// Alle festen Texte kommen ueber t() aus den Sprachdateien (DE/EN).
//
// What does this file do?
// This is the SHELL of the learning path -- the app's main component. It uses
// useState to remember which lesson is currently open, shows the list on the
// left and the selected lesson's content on the right. Switching lessons runs
// purely through state (NO router yet -- that comes later).
// All fixed texts come from the language files (DE/EN) via t().

import { useState } from "react";
import { lessons } from "./lessons/lessons";
import { LessonList } from "./components/LessonList";
import { Task } from "./components/Task";
import { LanguageSwitcher } from "./components/LanguageSwitcher";
import { useLanguage } from "./i18n/LanguageContext";
import "./App.css";

export default function App() {
  // t() liefert Texte in der aktuellen Sprache (siehe i18n/LanguageContext).
  // t() returns texts in the current language (see i18n/LanguageContext).
  const { t } = useLanguage();

  // State: die id der gerade gewaehlten Lektion. Start: die erste Lektion.
  // State: the id of the currently selected lesson. Start: the first lesson.
  const [activeId, setActiveId] = useState(1);

  // Aus der id die passende Lektion heraussuchen. .find() kann theoretisch
  // nichts finden, deshalb faengt `?? lessons[0]` diesen Fall ab.
  // Look up the matching lesson by id. .find() can in theory find nothing,
  // so `?? lessons[0]` catches that case as a fallback.
  const activeLesson = lessons.find((l) => l.id === activeId) ?? lessons[0];

  // Position der aktuellen Lektion im Array (0, 1, 2, ...) -- fuer
  // Zurueck/Weiter.
  // Position of the current lesson in the array (0, 1, 2, ...) -- used for
  // Back/Next.
  const index = lessons.findIndex((l) => l.id === activeId);
  const isFirst = index === 0;
  const isLast = index === lessons.length - 1;

  // `Content` ist die Komponente der aktiven Lektion. Weil sie mit grossem
  // Buchstaben beginnt, koennen wir sie unten als <Content /> rendern.
  // `Content` is the active lesson's component. Because it starts with a
  // capital letter, we can render it below as <Content />.
  const Content = activeLesson.Content;

  return (
    <div className="app">
      <header className="header">
        {/* Titel + Untertitel links, der Sprach-Umschalter rechts.
            Title + subtitle on the left, the language switch on the right. */}
        <div className="header-text">
          <h1>{t("app.titel")}</h1>
          <p>{t("app.untertitel")}</p>
        </div>
        <LanguageSwitcher />
      </header>

      <div className="layout">
        {/* LINKS: die Liste aller Lektionen. onSelect setzt die neue id.
            LEFT: the list of all lessons. onSelect sets the new id. */}
        <aside>
          <LessonList lessons={lessons} activeId={activeId} onSelect={setActiveId} />
        </aside>

        {/* RECHTS: die aktuell gewaehlte Lektion.
            RIGHT: the currently selected lesson. */}
        <main className="content">
          {/* Fortschritt: die wievielte von wie vielen Lektionen? Die
              Platzhalter {current}/{total} werden von t() ersetzt.
              Progress: which lesson out of how many? The placeholders
              {current}/{total} are replaced by t(). */}
          <p className="progress">
            {t("nav.fortschritt", {
              current: index + 1,
              total: lessons.length,
            })}
          </p>

          <h2>{t(activeLesson.titleKey)}</h2>
          <p className="subtitle">{t(activeLesson.summaryKey)}</p>

          {/* Das Live-Beispiel: die Komponente der Lektion.
              The live example: the lesson's component. */}
          <section className="example">
            <Content />
          </section>

          {/* Die Aufgabe wird NUR angezeigt, wenn die Lektion eine hat.
              `taskKey && (...)` ist "bedingtes Rendern".
              The task is shown ONLY if the lesson has one.
              `taskKey && (...)` is "conditional rendering". */}
          {activeLesson.taskKey && <Task text={t(activeLesson.taskKey)} />}

          {/* Navigation: Zurueck / Weiter. Am Rand jeweils deaktiviert.
              Navigation: Back / Next. Disabled at either end. */}
          <div className="navigation">
            <button
              disabled={isFirst}
              onClick={() => setActiveId(lessons[index - 1].id)}
            >
              {t("nav.zurueck")}
            </button>
            <button
              disabled={isLast}
              onClick={() => setActiveId(lessons[index + 1].id)}
            >
              {t("nav.weiter")}
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}
