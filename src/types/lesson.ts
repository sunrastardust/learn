// Was macht diese Datei?
// Hier steht der zentrale TypeScript-Typ fuer eine einzelne Lektion.
// Ein "Typ" beschreibt, WELCHE Felder ein Objekt haben muss und von welcher
// Art (string, number, ...) sie sind. So merkt TypeScript schon beim Tippen,
// wenn wir ein Feld vergessen oder falsch benennen -- lange bevor die App laeuft.
//
// What does this file do?
// This holds the central TypeScript type for a single lesson.
// A "type" describes WHICH fields an object must have and of what kind
// (string, number, ...). That way TypeScript warns you while typing already
// if you forget a field or misname it -- long before the app runs.

import type { ComponentType } from "react";

// `type Lesson = { ... }` definiert einen eigenen Typ mit dem Namen "Lesson".
// `type Lesson = { ... }` defines a custom type named "Lesson".
export type Lesson = {
  // Eindeutige Nummer der Lektion (1, 2, 3, ...).
  // Unique number of the lesson (1, 2, 3, ...).
  id: number;

  // Kein fertiger Text, sondern ein SCHLUESSEL in die Sprachdateien (z.B.
  // "lektion.props.titel"). Die App holt daraus per t() den passenden Text.
  // Not a finished text but a KEY into the language files (e.g.
  // "lektion.props.titel"). The app fetches the matching text via t().
  titleKey: string;

  // Schluessel fuer die kurze Beschreibung (der Untertitel).
  // Key for the short description (the subtitle).
  summaryKey: string;

  // Schluessel fuer die Aufgabe. Das `?` macht das Feld OPTIONAL: reine
  // Uebersichts-Lektionen lassen es einfach weg.
  // Key for the task. The `?` makes the field OPTIONAL: pure overview
  // lessons simply leave it out.
  taskKey?: string;

  // Schluessel fuer die Gruppe (den "Bereich") der Lektion -- z.B. React-
  // Grundlagen oder KI-Agenten. Die Liste links zeigt daraus Ueberschriften.
  // Key for the lesson's group (its "section") -- e.g. React basics or AI
  // agents. The list on the left renders headings from it.
  groupKey: string;

  // Fuer die Suche: die Schluessel-Praefixe dieser Lektion, z.B. ["einf"]
  // fuer alle Schluessel, die mit "einf." beginnen. Damit weiss die Suche,
  // welche Texte aus den Sprachdateien zu welcher Lektion gehoeren.
  // Legst du eine neue Lektion an, traegst du hier ihr Praefix ein.
  // For the search: this lesson's key prefixes, e.g. ["einf"] for all keys
  // starting with "einf.". This is how the search knows which texts from the
  // language files belong to which lesson.
  // When you add a new lesson, put its prefix here.
  searchPrefixes: string[];

  // Die Komponente der Lektion selbst. `ComponentType` ist der React-Typ fuer
  // "irgendeine Komponente, die man rendern kann".
  // The lesson's component itself. `ComponentType` is the React type for
  // "any component that can be rendered".
  Content: ComponentType;
};
