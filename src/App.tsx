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

import { useState, useEffect, useRef } from "react";
import { lessons } from "./lessons/lessons";
import { LessonList } from "./components/LessonList";
import { Task } from "./components/Task";
import { LanguageSwitcher } from "./components/LanguageSwitcher";
import { SearchBox } from "./components/SearchBox";
import { useLanguage } from "./i18n/LanguageContext";
import "./App.css";

export default function App() {
  // t() liefert Texte in der aktuellen Sprache (siehe i18n/LanguageContext).
  // t() returns texts in the current language (see i18n/LanguageContext).
  const { t } = useLanguage();

  // State: die id der gerade gewaehlten Lektion. Start: die erste Lektion.
  // State: the id of the currently selected lesson. Start: the first lesson.
  const [activeId, setActiveId] = useState(1);

  // Zweiter State: Ist die Lektions-Liste auf dem Handy aufgeklappt?
  // Auf dem Desktop spielt er keine Rolle -- dort ist die Liste per CSS
  // immer sichtbar. Auf schmalen Bildschirmen wuerde sie sonst den halben
  // Bildschirm fuellen, bevor man ueberhaupt zum Inhalt kommt.
  // Second piece of state: is the lesson list expanded on mobile?
  // On desktop it does not matter -- there the list is always visible via
  // CSS. On narrow screens it would otherwise fill half the screen before
  // you even get to the content.
  const [menuOpen, setMenuOpen] = useState(false);

  // Beim Waehlen einer Lektion das Menue wieder zuklappen -- sonst muesste
  // man auf dem Handy erst wieder hochscrollen.
  // Collapse the menu when a lesson is picked -- otherwise on mobile you
  // would have to scroll back up first.
  function selectLesson(id: number) {
    setActiveId(id);
    setMenuOpen(false);
  }

  // Fuer die Suche: Wonach wurde gesucht, und das wievielte Mal? Der Zaehler
  // (nonce) sorgt dafuer, dass der Effekt unten AUCH dann laeuft, wenn man
  // zweimal hintereinander denselben Treffer anklickt -- der Text allein
  // haette sich dann ja nicht geaendert.
  // For the search: what was searched for, and for the how-many-th time? The
  // counter (nonce) makes the effect below run EVEN IF you click the same
  // result twice in a row -- the text alone would not have changed then.
  const [jump, setJump] = useState({ term: "", nonce: 0 });

  // Der Bereich mit dem Lektions-Inhalt. Ein "ref" ist ein direkter Griff auf
  // ein echtes DOM-Element -- den brauchen wir, um darin nach der Fundstelle
  // zu suchen und dorthin zu scrollen.
  // The area holding the lesson content. A "ref" is a direct handle on a real
  // DOM element -- we need it to search for the matching spot inside it and
  // scroll there.
  const contentRef = useRef<HTMLElement>(null);

  // Klick auf einen Suchtreffer: Lektion wechseln und den Suchbegriff merken.
  // Click on a search result: switch lesson and remember the search term.
  function jumpToHit(lessonId: number, term: string) {
    setActiveId(lessonId);
    setMenuOpen(false);
    setJump((prev) => ({ term, nonce: prev.nonce + 1 }));
  }

  // Nach dem Wechsel die Fundstelle suchen, hinscrollen und kurz hervorheben.
  // useEffect laeuft NACH dem Rendern -- erst dann steht der neue Lektions-
  // Text im DOM und kann durchsucht werden (siehe Lektion 12).
  // After the switch, find the matching spot, scroll to it and highlight it
  // briefly. useEffect runs AFTER rendering -- only then is the new lesson
  // text in the DOM and can be searched (see lesson 12).
  useEffect(() => {
    if (!jump.term || !contentRef.current) return;
    const needle = jump.term.toLowerCase();

    // Nur "Text-Elemente" durchsehen, keine Container -- sonst waere der
    // erste Treffer immer das aeusserste <div>.
    // Only look at "text elements", not containers -- otherwise the first
    // match would always be the outermost <div>.
    const candidates = contentRef.current.querySelectorAll("p, li, h3, h4, td, th");
    for (const element of candidates) {
      if ((element.textContent ?? "").toLowerCase().includes(needle)) {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
        element.classList.add("search-found");
        // Die Hervorhebung nach kurzer Zeit wieder entfernen. Die zurueck-
        // gegebene Funktion raeumt den Timer auf (siehe Lektion 12).
        // Remove the highlight after a short while. The returned function
        // cleans up the timer (see lesson 12).
        const timer = setTimeout(() => element.classList.remove("search-found"), 2500);
        return () => clearTimeout(timer);
      }
    }

    // Nichts gefunden (z. B. Treffer stand nur im Titel)? Dann wenigstens
    // an den Anfang der Lektion springen.
    // Nothing found (e.g. the match was only in the title)? Then at least
    // jump to the start of the lesson.
    contentRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [jump]);

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
        {/* Rechts oben: erst die Suche, dann der Sprach-Umschalter.
            Top right: the search first, then the language switch. */}
        <div className="header-tools">
          <SearchBox lessons={lessons} onJump={jumpToHit} />
          <LanguageSwitcher />
        </div>
      </header>

      {/* Nur auf schmalen Bildschirmen sichtbar (siehe App.css): klappt die
          Lektions-Liste auf und zu. aria-expanded sagt Screenreadern, ob
          gerade auf- oder zugeklappt ist.
          Only visible on narrow screens (see App.css): expands and collapses
          the lesson list. aria-expanded tells screen readers whether it is
          currently open or closed. */}
      <button
        className="nav-toggle"
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen((open) => !open)}
      >
        <span aria-hidden="true">☰</span> {t("nav.menu")}
        <span className="nav-toggle-count">
          {index + 1}/{lessons.length}
        </span>
      </button>

      <div className="layout">
        {/* LINKS: die Liste aller Lektionen. onSelect setzt die neue id.
            Die Klasse "open" macht die Liste auf dem Handy sichtbar.
            LEFT: the list of all lessons. onSelect sets the new id.
            The class "open" makes the list visible on mobile. */}
        <aside className={menuOpen ? "sidebar open" : "sidebar"}>
          <LessonList lessons={lessons} activeId={activeId} onSelect={selectLesson} />
        </aside>

        {/* RECHTS: die aktuell gewaehlte Lektion.
            RIGHT: the currently selected lesson. */}
        <main className="content" ref={contentRef}>
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
