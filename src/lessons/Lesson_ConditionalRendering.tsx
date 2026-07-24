// Was macht diese Datei?
// Die Lektion "Bedingtes Rendern": Etwas nur anzeigen, wenn eine Bedingung
// gilt -- mit den zwei wichtigsten Mustern `&&` und `? :`. Das Playground-
// Beispiel ist ein kleiner Login-Schalter.
//
// What does this file do?
// The "Conditional rendering" lesson: showing something only when a
// condition holds -- with the two most important patterns `&&` and `? :`.
// The playground example is a little login toggle.

import { useLanguage } from "../i18n/LanguageContext";
import { LivePlayground } from "../components/LivePlayground";

// Der Anfangs-Code fuer den Live-Editor.
// The initial code for the live editor.
const playgroundCode = `
function Status() {
  const [loggedIn, setLoggedIn] = useState(false);
  return (
    <div>
      <button onClick={() => setLoggedIn(!loggedIn)}>
        {loggedIn ? "Logout" : "Login"}
      </button>
      {loggedIn && <p>Willkommen zurück! 🎉</p>}
      <p>{loggedIn ? "Du bist angemeldet." : "Bitte melde dich an."}</p>
    </div>
  );
}

render(<Status />);
`;

export function Lesson_ConditionalRendering() {
  const { t } = useLanguage();

  return (
    <div className="lesson-text">
      <h3>{t("bed.h")}</h3>
      <p>{t("bed.p1")}</p>
      <p>{t("bed.p2")}</p>

      <LivePlayground code={playgroundCode} />
    </div>
  );
}
