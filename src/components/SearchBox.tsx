// Was macht diese Datei?
// Die Volltext-Suche ueber ALLE Lektionen. Sie durchsucht nicht nur die
// Titel, sondern jeden Text aus den Sprachdateien. Moeglich wird das durch
// die searchPrefixes jeder Lektion: Damit weiss die Suche, welcher Schluessel
// (z.B. "eff.p1") zu welcher Lektion gehoert.
// Ein Treffer zeigt Lektionsname + Textausschnitt; ein Klick springt zur
// Lektion UND zur Fundstelle (das Scrollen erledigt App.tsx).
//
// What does this file do?
// The full-text search across ALL lessons. It searches not just the titles
// but every text from the language files. This is possible thanks to each
// lesson's searchPrefixes: they tell the search which key (e.g. "eff.p1")
// belongs to which lesson.
// A result shows the lesson name + a text excerpt; a click jumps to the
// lesson AND to the matching spot (the scrolling is done by App.tsx).

import { useState } from "react";
import type { Lesson } from "../types/lesson";
import { useLanguage } from "../i18n/LanguageContext";

type SearchBoxProps = {
  lessons: Lesson[];
  // Wird beim Klick auf einen Treffer gerufen: welche Lektion, und wonach
  // gesucht wurde (damit die Stelle hervorgehoben werden kann).
  // Called when a result is clicked: which lesson, and what was searched for
  // (so the spot can be highlighted).
  onJump: (lessonId: number, term: string) => void;
};

// Ein einzelner Treffer. / A single search result.
type Hit = {
  lessonId: number;
  lessonTitle: string;
  excerpt: string;
};

// Schneidet einen kurzen Ausschnitt rund um den Fundort heraus, damit man
// den Zusammenhang sieht statt eines 300 Zeichen langen Absatzes.
// Cuts a short excerpt around the match so you see the context instead of a
// 300-character paragraph.
function makeExcerpt(text: string, at: number, termLength: number): string {
  const start = Math.max(0, at - 40);
  const end = Math.min(text.length, at + termLength + 60);
  return (start > 0 ? "… " : "") + text.slice(start, end).trim() + (end < text.length ? " …" : "");
}

export function SearchBox({ lessons, onJump }: SearchBoxProps) {
  const { t, dict } = useLanguage();

  // Was der Nutzer eingetippt hat. / What the user typed.
  const [query, setQuery] = useState("");

  // Ab zwei Zeichen wird gesucht -- bei einem einzelnen Buchstaben waere
  // praktisch alles ein Treffer.
  // Searching starts at two characters -- with a single letter almost
  // everything would match.
  const term = query.trim().toLowerCase();
  const hits: Hit[] = [];

  if (term.length >= 2) {
    for (const lesson of lessons) {
      const title = t(lesson.titleKey);

      // Alle Schluessel dieser Lektion einsammeln: die drei aus der Registry
      // plus alles, was mit einem ihrer Praefixe beginnt.
      // Collect all keys of this lesson: the three from the registry plus
      // everything starting with one of its prefixes.
      const keys = [lesson.titleKey, lesson.summaryKey];
      if (lesson.taskKey) keys.push(lesson.taskKey);
      for (const key of Object.keys(dict)) {
        if (lesson.searchPrefixes.some((prefix) => key.startsWith(prefix + "."))) keys.push(key);
      }

      // Pro Lektion reicht der erste Treffer -- sonst faende man 20-mal
      // dieselbe Lektion in der Liste.
      // One hit per lesson is enough -- otherwise the same lesson would show
      // up 20 times in the list.
      for (const key of keys) {
        const value = dict[key];
        if (!value) continue;
        const at = value.toLowerCase().indexOf(term);
        if (at !== -1) {
          hits.push({ lessonId: lesson.id, lessonTitle: title, excerpt: makeExcerpt(value, at, term.length) });
          break;
        }
      }
    }
  }

  return (
    <div className="search">
      <input
        type="search"
        className="search-input"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={t("suche.platzhalter")}
        aria-label={t("suche.label")}
      />

      {/* Die Trefferliste erscheint nur, wenn wirklich gesucht wurde.
          The result list only appears when something was actually searched. */}
      {term.length >= 2 && (
        <div className="search-results">
          <p className="search-count">{t("suche.treffer", { count: hits.length })}</p>
          {hits.map((hit) => (
            <button
              key={hit.lessonId}
              className="search-hit-button"
              onClick={() => {
                onJump(hit.lessonId, query.trim());
                setQuery(""); // Liste schliessen / close the list
              }}
            >
              <span className="search-hit-title">{hit.lessonTitle}</span>
              <span className="search-hit-excerpt">{hit.excerpt}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
