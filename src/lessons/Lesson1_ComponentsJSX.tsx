// Was macht diese Datei?
// Lektion 1: Sie erklaert, was eine KOMPONENTE ist und wie JSX aussieht.
// Eine Komponente ist einfach eine Funktion, die JSX zurueckgibt. JSX sieht
// aus wie HTML, ist aber JavaScript -- deshalb koennen wir mittendrin mit
// geschweiften Klammern { } echten Code einsetzen.
//
// What does this file do?
// Lesson 1: it explains what a COMPONENT is and what JSX looks like.
// A component is simply a function that returns JSX. JSX looks like HTML but
// is JavaScript -- that's why we can drop real code right into it using curly
// braces { }.

import { useLanguage } from "../i18n/LanguageContext";
import { LivePlayground } from "../components/LivePlayground";

// Der Anfangs-Code fuer den Live-Editor unten -- bewusst dieselbe Idee wie
// das Beispiel darueber, zum direkten Herumspielen.
// The initial code for the live editor below -- deliberately the same idea
// as the example above it, for playing around directly.
const playgroundCode = `
function Example() {
  const name = "Welt";
  return (
    <div>
      <h3>Hallo, {name}!</h3>
      <p>2 + 3 = {2 + 3}</p>
    </div>
  );
}

render(<Example />);
`;

// Eine Komponente ist eine Funktion, deren Name mit einem GROSSBUCHSTABEN
// beginnt (Pflicht in React -- daran erkennt React eine Komponente).
// A component is a function whose name starts with a CAPITAL letter
// (mandatory in React -- that is how React recognises a component).
export function Lesson1_ComponentsJSX() {
  // t() liefert die Texte in der aktuellen Sprache (DE/EN).
  // t() returns the texts in the current language (DE/EN).
  const { t } = useLanguage();

  // Das ist eine ganz normale JavaScript-Variable. Weil JSX "richtiges"
  // JavaScript ist, koennen wir sie unten als Platzhalter einsetzen.
  // This is a perfectly normal JavaScript variable. Because JSX is "real"
  // JavaScript, we can insert it below as a placeholder.
  const name = "Welt";

  // `return (...)` gibt das JSX zurueck -- das, was am Bildschirm erscheint.
  // Es MUSS genau EIN aeusseres Element geben -- hier <div>.
  // `return (...)` returns the JSX -- what appears on screen.
  // There MUST be exactly ONE outer element -- here <div>.
  return (
    <div>
      {/* Der Platzhalter {name} im Text wird durch die Variable ersetzt.
          The {name} placeholder in the text is replaced by the variable. */}
      <h3>{t("l1.hallo", { name })}</h3>
      <p>{t("l1.p1")}</p>
      <p>
        {/* Hier siehst du "rohes" JSX: {2 + 3} ist echtes JavaScript mitten
            im Markup und ergibt 5.
            Here you see "raw" JSX: {2 + 3} is real JavaScript in the middle
            of the markup and evaluates to 5. */}
        {t("l1.p2")} <strong>{2 + 3}</strong>
      </p>

      {/* Zum Selbst-Ausprobieren, direkt hier in der App.
          For trying it out yourself, right here in the app. */}
      <LivePlayground code={playgroundCode} />
    </div>
  );
}
