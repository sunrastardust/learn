// Was macht diese Datei?
// Hier steht der zentrale TypeScript-Typ fuer eine einzelne Lektion.
// Ein "Typ" beschreibt, WELCHE Felder ein Objekt haben muss und von welcher
// Art (string, number, ...) sie sind. So merkt TypeScript schon beim Tippen,
// wenn wir ein Feld vergessen oder falsch benennen -- lange bevor die App laeuft.

import type { ComponentType } from "react";

// `type Lektion = { ... }` definiert einen eigenen Typ mit dem Namen "Lektion".
// Ueberall wo wir spaeter `Lektion` schreiben, ist genau diese Form gemeint.
export type Lektion = {
  // Eindeutige Nummer der Lektion (1, 2, 3, ...). Damit finden/sortieren wir sie.
  id: number;

  // Der Titel, den du in der Liste links siehst. Ein Text -> Typ `string`.
  titel: string;

  // Ein kurzer Satz, worum es geht. Wird als Untertitel angezeigt.
  kurzbeschreibung: string;

  // Die kleine Aufgabe zum Selbst-Ausprobieren ("Aufgabe fuer dich").
  aufgabe: string;

  // Das Besondere: Hier speichern wir die KOMPONENTE selbst.
  // `ComponentType` ist der React-Typ fuer "irgendeine Komponente, die man
  // rendern kann". So bringt jede Lektion ihren eigenen Inhalt mit und die
  // Huelle (App.tsx) muss nur noch `<Inhalt />` schreiben.
  Inhalt: ComponentType;
};
