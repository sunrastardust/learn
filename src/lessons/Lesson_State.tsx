// Was macht diese Datei?
// STATE mit useState. "State" ist das Gedaechtnis einer Komponente.
// Aendert sich der State, zeichnet React die Komponente automatisch neu -- so
// bleibt das, was du siehst, immer aktuell.
//
// What does this file do?
// STATE with useState. "State" is a component's memory. When the
// state changes, React automatically re-renders the component -- so what you
// see always stays up to date.

// `useState` ist ein "Hook" -- eine Funktion aus React, mit der Komponenten
// sich Werte merken koennen. Wir muessen sie importieren.
// `useState` is a "hook" -- a function from React that lets components
// remember values. We have to import it.
import { useState } from "react";
import { useLanguage } from "../i18n/LanguageContext";
import { LivePlayground } from "../components/LivePlayground";

// Der Anfangs-Code fuer den Live-Editor. Genau hier laesst sich die Aufgabe
// dieser Lektion direkt ausprobieren (Startwert 10, Zuruecksetzen-Button).
// The initial code for the live editor. This is exactly where this lesson's
// task can be tried directly (start value 10, reset button).
const playgroundCode = `
function Counter() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <h3>Zähler: {count}</h3>
      <button onClick={() => setCount(v => v + 1)}>+1</button>
      <button onClick={() => setCount(v => v - 1)}>-1</button>
    </div>
  );
}

render(<Counter />);
`;

export function Lesson_State() {
  const { t } = useLanguage();

  // useState(0) gibt ein Paar zurueck:
  //   1) den aktuellen Wert           -> hier `count`
  //   2) eine Funktion zum Aendern    -> hier `setCount`
  // Die 0 ist der STARTWERT. TypeScript erkennt daraus automatisch, dass
  // `count` eine Zahl ist -- wir muessen den Typ nicht selbst hinschreiben.
  //
  // useState(0) returns a pair:
  //   1) the current value            -> here `count`
  //   2) a function to change it      -> here `setCount`
  // The 0 is the STARTING VALUE. From it TypeScript automatically infers that
  // `count` is a number -- we don't have to write the type ourselves.
  const [count, setCount] = useState(0);

  return (
    <div>
      <h3>{t("l3.zaehler", { count })}</h3>
      {/*
        onClick bekommt eine FUNKTION, die beim Klick laufen soll.
        Wichtig: Statt setCount(count + 1) nehmen wir die Form mit
        Vorher-Wert (value => value + 1). Das ist sicherer, wenn schnell
        hintereinander geklickt wird.

        onClick receives a FUNCTION to run on click.
        Important: instead of setCount(count + 1) we use the previous-value
        form (value => value + 1). That is safer when clicks happen in quick
        succession.
      */}
      <button onClick={() => setCount((value) => value + 1)}>+1</button>{" "}
      <button onClick={() => setCount((value) => value - 1)}>-1</button>
      <p>{t("l3.p1")}</p>

      {/* Zum Selbst-Ausprobieren, direkt hier in der App.
          For trying it out yourself, right here in the app. */}
      <LivePlayground code={playgroundCode} />
    </div>
  );
}
