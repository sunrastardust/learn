// Was macht diese Datei?
// Die Lektion "Listen & Keys": Mit .map() wird aus einem Daten-Array eine
// Liste am Bildschirm; `key` gibt jedem Element eine stabile Identitaet.
// Das Playground-Beispiel ist eine wachsende Einkaufsliste.
//
// What does this file do?
// The "Lists & keys" lesson: .map() turns a data array into a list on
// screen; `key` gives every element a stable identity. The playground
// example is a growing shopping list.

import { useLanguage } from "../i18n/LanguageContext";
import { LivePlayground } from "../components/LivePlayground";

// Der Anfangs-Code fuer den Live-Editor.
// The initial code for the live editor.
const playgroundCode = `
function ShoppingList() {
  const [items, setItems] = useState(["Äpfel", "Brot", "Käse"]);
  return (
    <div>
      <ul>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <button onClick={() => setItems([...items, "Neu " + (items.length + 1)])}>
        Hinzufügen
      </button>
    </div>
  );
}

render(<ShoppingList />);
`;

export function Lesson_ListsKeys() {
  const { t } = useLanguage();

  return (
    <div className="lesson-text">
      <h3>{t("li.h")}</h3>
      <p>{t("li.p1")}</p>
      <p>{t("li.p2")}</p>
      <p>{t("li.p3")}</p>

      <LivePlayground code={playgroundCode} />
    </div>
  );
}
