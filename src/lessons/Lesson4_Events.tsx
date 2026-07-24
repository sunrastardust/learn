// Was macht diese Datei?
// Lektion 4: EVENTS & EINGABEN. Wir verbinden ein Textfeld (input) mit State.
// Tippst du etwas, laeuft bei jedem Zeichen die onChange-Funktion, die den
// State aktualisiert. Der angezeigte Text ist damit immer live aktuell.
//
// What does this file do?
// Lesson 4: EVENTS & INPUT. We wire a text field (input) to state. When you
// type something, the onChange function runs on every character and updates
// the state. The displayed text is therefore always live and up to date.

import { useState } from "react";
// `ChangeEvent` ist der TypeScript-Typ fuer ein Aenderungs-Ereignis. Damit
// weiss TypeScript, dass `e.target.value` existiert und ein string ist.
// `ChangeEvent` is the TypeScript type for a change event. With it TypeScript
// knows that `e.target.value` exists and is a string.
import type { ChangeEvent } from "react";
import { useLanguage } from "../i18n/LanguageContext";
import { LivePlayground } from "../components/LivePlayground";

// Der Anfangs-Code fuer den Live-Editor -- hier laesst sich die Aufgabe
// (GROSSBUCHSTABEN mit text.toUpperCase()) direkt ausprobieren.
// The initial code for the live editor -- the task (UPPERCASE via
// text.toUpperCase()) can be tried directly here.
const playgroundCode = `
function LiveInput() {
  const [text, setText] = useState("");
  return (
    <div>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Tippe hier..."
      />
      <p>
        Du hast geschrieben: <strong>{text || "(noch nichts)"}</strong>
      </p>
    </div>
  );
}

render(<LiveInput />);
`;

export function Lesson4_Events() {
  const { t } = useLanguage();

  // Der State haelt den aktuellen Text des Eingabefelds. Startwert: leer.
  // The state holds the current text of the input field. Start: empty.
  const [text, setText] = useState("");

  // Diese Funktion laeuft bei JEDER Aenderung im Textfeld.
  // e.target.value ist das, was gerade im Feld steht.
  // This function runs on EVERY change in the text field.
  // e.target.value is whatever is currently in the field.
  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setText(e.target.value);
  }

  return (
    <div>
      <h3>{t("l4.h")}</h3>
      {/*
        Ein "kontrolliertes" Eingabefeld: value kommt aus dem State, onChange
        schreibt jede Aenderung zurueck in den State. So ist React die einzige
        Quelle der Wahrheit fuer den Inhalt.

        A "controlled" input: value comes from the state, onChange writes every
        change back into the state. That way React is the single source of
        truth for the content.
      */}
      <input
        type="text"
        value={text}
        onChange={handleChange}
        placeholder={t("l4.platzhalter")}
      />
      {/* Sobald du tippst, aktualisiert sich diese Zeile sofort.
          As soon as you type, this line updates immediately. */}
      <p>
        {t("l4.geschrieben")} <strong>{text || t("l4.nichts")}</strong>
      </p>

      {/* Zum Selbst-Ausprobieren, direkt hier in der App.
          For trying it out yourself, right here in the app. */}
      <LivePlayground code={playgroundCode} />
    </div>
  );
}
