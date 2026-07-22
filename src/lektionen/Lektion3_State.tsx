// Was macht diese Datei?
// Lektion 3: STATE mit useState. "State" ist das Gedaechtnis einer Komponente.
// Aendert sich der State, zeichnet React die Komponente automatisch neu -- so
// bleibt das, was du siehst, immer aktuell.

// `useState` ist ein "Hook" -- eine Funktion aus React, mit der Komponenten
// sich Werte merken koennen. Wir muessen sie importieren.
import { useState } from "react";

export function Lektion3_State() {
  // useState(0) gibt ein Paar zurueck:
  //   1) den aktuellen Wert           -> hier `anzahl`
  //   2) eine Funktion zum Aendern    -> hier `setAnzahl`
  // Die 0 in useState(0) ist der STARTWERT.
  // TypeScript erkennt aus der 0 automatisch, dass `anzahl` eine Zahl ist --
  // wir muessen den Typ hier also gar nicht selbst hinschreiben.
  const [anzahl, setAnzahl] = useState(0);

  return (
    <div>
      <h3>Zaehler: {anzahl}</h3>
      {/*
        onClick bekommt eine FUNKTION, die beim Klick laufen soll.
        Wichtig: Statt setAnzahl(anzahl + 1) nehmen wir die Form mit
        Vorher-Wert (wert => wert + 1). Das ist sicherer, wenn schnell
        hintereinander geklickt wird.
      */}
      <button onClick={() => setAnzahl((wert) => wert + 1)}>+1</button>{" "}
      <button onClick={() => setAnzahl((wert) => wert - 1)}>-1</button>
      <p>
        Jeder Klick aendert den State. Weil sich der State aendert, rendert
        React die Komponente neu -- und die Zahl oben stimmt wieder.
      </p>
    </div>
  );
}
