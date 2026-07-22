// Was macht diese Datei?
// Lektion 4: EVENTS & EINGABEN. Wir verbinden ein Textfeld (input) mit State.
// Tippst du etwas, laeuft bei jedem Zeichen die onChange-Funktion, die den
// State aktualisiert. Der angezeigte Text ist damit immer live aktuell.

import { useState } from "react";
// `ChangeEvent` ist der TypeScript-Typ fuer ein Aenderungs-Ereignis. Damit
// weiss TypeScript, dass `e.target.value` existiert und ein string ist.
import type { ChangeEvent } from "react";

export function Lektion4_Events() {
  // Der State haelt den aktuellen Text des Eingabefelds. Startwert: leerer Text.
  const [text, setText] = useState("");

  // Diese Funktion laeuft bei JEDER Aenderung im Textfeld.
  // e.target.value ist das, was gerade im Feld steht.
  function beiEingabe(e: ChangeEvent<HTMLInputElement>) {
    setText(e.target.value);
  }

  return (
    <div>
      <h3>Live-Eingabe</h3>
      {/*
        Das ist ein "kontrolliertes" Eingabefeld: value kommt aus dem State,
        und onChange schreibt jede Aenderung zurueck in den State. Dadurch ist
        React die einzige Quelle der Wahrheit fuer den Inhalt.
      */}
      <input
        type="text"
        value={text}
        onChange={beiEingabe}
        placeholder="Tippe hier etwas..."
      />
      {/* Sobald du tippst, aktualisiert sich diese Zeile sofort. */}
      <p>
        Du hast geschrieben: <strong>{text || "(noch nichts)"}</strong>
      </p>
    </div>
  );
}
