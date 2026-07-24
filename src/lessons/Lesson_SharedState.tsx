// Was macht diese Datei?
// Die Lektion "Gemeinsamer State" (Lifting State Up): Sollen mehrere
// Komponenten denselben Wert sehen, wandert der State in die gemeinsame
// Eltern-Komponente. Das Playground-Beispiel: zwei Anzeigen + ein Knopf,
// alle haengen am selben Zaehler.
//
// What does this file do?
// The "Shared state" lesson (lifting state up): when several components
// need to see the same value, the state moves into the shared parent
// component. The playground example: two displays + one button, all
// connected to the same counter.

import { useLanguage } from "../i18n/LanguageContext";
import { LivePlayground } from "../components/LivePlayground";

// Der Anfangs-Code fuer den Live-Editor.
// The initial code for the live editor.
const playgroundCode = `
function Display({ count }) {
  return <p>Zähler: {count}</p>;
}

function PlusButton({ onClick }) {
  return <button onClick={onClick}>+1</button>;
}

function App() {
  // Der State wohnt HIER, beim gemeinsamen Eltern.
  const [count, setCount] = useState(0);
  return (
    <div>
      <Display count={count} />
      <Display count={count} />
      <PlusButton onClick={() => setCount(count + 1)} />
    </div>
  );
}

render(<App />);
`;

export function Lesson_SharedState() {
  const { t } = useLanguage();

  return (
    <div className="lesson-text">
      <h3>{t("gem.h")}</h3>
      <p>{t("gem.p1")}</p>
      <p>{t("gem.p2")}</p>

      <LivePlayground code={playgroundCode} />
    </div>
  );
}
