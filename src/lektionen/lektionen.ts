// Was macht diese Datei?
// Hier steht die LISTE aller Lektionen -- die Reihenfolge des Lernpfads.
// Sie ist bewusst von den Komponenten getrennt: Willst du spaeter eine neue
// Lektion ergaenzen, baust du eine neue Datei in src/lektionen/ und traegst
// sie hier einmal ins Array ein. Sonst musst du nichts anfassen.

import type { Lektion } from "../typen/lektion";
import { Lektion1_KomponentenJSX } from "./Lektion1_KomponentenJSX";
import { Lektion2_Props } from "./Lektion2_Props";
import { Lektion3_State } from "./Lektion3_State";
import { Lektion4_Events } from "./Lektion4_Events";

// `: Lektion[]` sagt TypeScript: Das ist ein Array aus Lektion-Objekten.
// Fehlt in einem Eintrag ein Pflicht-Feld (z.B. `aufgabe`), gibt es sofort
// einen Fehler -- ein grosser Vorteil von TypeScript.
export const lektionen: Lektion[] = [
  {
    id: 1,
    titel: "Komponenten & JSX",
    kurzbeschreibung: "Was eine Komponente ist und wie JSX aussieht.",
    aufgabe:
      "Oeffne src/lektionen/Lektion1_KomponentenJSX.tsx und aendere den Text " +
      'in der Variable `name` von "Welt" in deinen eigenen Namen. Speichern -- ' +
      "der Browser aktualisiert sich von allein.",
    Inhalt: Lektion1_KomponentenJSX,
  },
  {
    id: 2,
    titel: "Props",
    kurzbeschreibung: "Werte an eine Komponente weitergeben.",
    aufgabe:
      "In src/lektionen/Lektion2_Props.tsx: uebergib einer <Begruessung /> " +
      "einen anderen Namen. Fuege danach eine vierte <Begruessung /> mit einem " +
      "neuen Namen und einer `laune` deiner Wahl hinzu.",
    Inhalt: Lektion2_Props,
  },
  {
    id: 3,
    titel: "State mit useState",
    kurzbeschreibung: "Eine Komponente bekommt ein Gedaechtnis.",
    aufgabe:
      "In src/lektionen/Lektion3_State.tsx: aendere den Startwert in " +
      "useState(0) auf 10. Baue dann einen dritten Button 'Zuruecksetzen', der " +
      "die Zahl mit setAnzahl(0) wieder auf 0 stellt.",
    Inhalt: Lektion3_State,
  },
  {
    id: 4,
    titel: "Events & Eingaben",
    kurzbeschreibung: "Ein Textfeld live mit State verbinden.",
    aufgabe:
      "In src/lektionen/Lektion4_Events.tsx: zeige den eingegebenen Text " +
      "zusaetzlich in GROSSBUCHSTABEN an. Tipp: text.toUpperCase() wandelt " +
      "einen Text in Grossbuchstaben um.",
    Inhalt: Lektion4_Events,
  },
];
