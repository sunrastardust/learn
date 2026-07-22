// Was macht diese Datei?
// Die WIEDERVERWENDBARE Liste aller Lektionen (links im Lernpfad). Sie zeigt
// jeden Titel als Knopf. Der aktive Eintrag wird hervorgehoben. Ein Klick
// meldet der Huelle (App.tsx), welche Lektion gewaehlt wurde.

import type { Lektion } from "../typen/lektion";

// Die Props der Liste. Achte auf `beiAuswahl`: Das ist eine FUNKTION als Prop
// (ein "Callback"). So reicht ein Kind Ereignisse nach oben an die Eltern.
type LektionsListeProps = {
  lektionen: Lektion[]; // alle Lektionen (ein Array vom Typ Lektion)
  aktiveId: number; // welche Lektion ist gerade offen?
  beiAuswahl: (id: number) => void; // wird beim Klick mit der neuen id gerufen
};

export function LektionsListe({
  lektionen,
  aktiveId,
  beiAuswahl,
}: LektionsListeProps) {
  return (
    <nav className="liste">
      {/*
        Mit .map() wird aus jedem Lektions-Objekt ein Knopf. Jedes Element in
        einer solchen Liste braucht einen eindeutigen `key` -- daran erkennt
        React die Eintraege wieder. Wir nehmen die id.
      */}
      {lektionen.map((lektion) => (
        <button
          key={lektion.id}
          // Ist diese Lektion die aktive? Dann zusaetzliche CSS-Klasse "aktiv".
          className={lektion.id === aktiveId ? "liste-knopf aktiv" : "liste-knopf"}
          onClick={() => beiAuswahl(lektion.id)}
        >
          <span className="liste-nummer">{lektion.id}</span>
          {lektion.titel}
        </button>
      ))}
    </nav>
  );
}
