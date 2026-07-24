// Was macht diese Datei?
// Die WIEDERVERWENDBARE Liste aller Lektionen (links im Lernpfad). Sie zeigt
// jeden Titel als Knopf, gruppiert nach Bereich. Der aktive Eintrag wird
// hervorgehoben. Ein Klick meldet der Huelle (App.tsx), welche Lektion
// gewaehlt wurde.
//
// What does this file do?
// The REUSABLE list of all lessons (on the left of the learning path). It
// shows every title as a button, grouped by section. The active entry is
// highlighted. A click tells the shell (App.tsx) which lesson was selected.

// `Fragment` erlaubt mehrere Elemente ohne zusaetzliches <div> drumherum.
// `Fragment` allows several elements without an extra wrapping <div>.
import { Fragment } from "react";
import type { Lesson } from "../types/lesson";
import { useLanguage } from "../i18n/LanguageContext";

// Die Props der Liste. Achte auf `onSelect`: eine FUNKTION als Prop (ein
// "Callback"). So reicht ein Kind Ereignisse nach oben an die Eltern.
// The list's props. Note `onSelect`: a FUNCTION as a prop (a "callback").
// This is how a child passes events up to its parent.
type LessonListProps = {
  lessons: Lesson[]; // alle Lektionen / all lessons (array of Lesson)
  activeId: number; // welche Lektion ist gerade offen? / which lesson is open?
  onSelect: (id: number) => void; // beim Klick gerufen / called on click
};

export function LessonList({ lessons, activeId, onSelect }: LessonListProps) {
  // t() uebersetzt den Titel-Schluessel jeder Lektion in die aktuelle Sprache.
  // t() translates each lesson's title key into the current language.
  const { t } = useLanguage();
  return (
    <nav className="lesson-list">
      {/*
        Mit .map() wird aus jedem Lektions-Objekt ein Knopf. Jedes Element in
        einer solchen Liste braucht einen eindeutigen `key` -- daran erkennt
        React die Eintraege wieder. Wir nehmen die id.

        .map() turns every lesson object into a button. Every element in such
        a list needs a unique `key` -- that is how React recognises the
        entries. We use the id.
      */}
      {lessons.map((lesson, index) => {
        // Beginnt hier eine neue Gruppe? Dann eine Ueberschrift davor zeigen.
        // Does a new group start here? Then show a heading before it.
        const newGroup =
          index === 0 || lessons[index - 1].groupKey !== lesson.groupKey;
        return (
          <Fragment key={lesson.id}>
            {newGroup && <p className="list-group">{t(lesson.groupKey)}</p>}
            <button
              // Ist diese Lektion aktiv? Dann zusaetzliche CSS-Klasse "active".
              // Is this lesson active? Then add the CSS class "active".
              className={lesson.id === activeId ? "list-button active" : "list-button"}
              onClick={() => onSelect(lesson.id)}
            >
              <span className="list-number">{lesson.id}</span>
              {t(lesson.titleKey)}
            </button>
          </Fragment>
        );
      })}
    </nav>
  );
}
