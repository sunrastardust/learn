// Was macht diese Datei?
// Lektion 1: Sie erklaert, was eine KOMPONENTE ist und wie JSX aussieht.
// Eine Komponente ist einfach eine Funktion, die JSX zurueckgibt. JSX sieht
// aus wie HTML, ist aber JavaScript -- deshalb koennen wir mittendrin mit
// geschweiften Klammern { } echten Code einsetzen.

// Eine Komponente ist eine Funktion, deren Name mit einem GROSSBUCHSTABEN
// beginnt (das ist Pflicht in React -- daran erkennt React eine Komponente).
export function Lektion1_KomponentenJSX() {
  // Das ist eine ganz normale JavaScript-Variable. Weil JSX "richtiges"
  // JavaScript ist, koennen wir sie unten mit { name } einsetzen.
  const name = "Welt";

  // `return (...)` gibt das JSX zurueck. Das ist das, was am Bildschirm
  // erscheint. Es MUSS genau EIN aeusseres Element geben -- hier <div>.
  return (
    <div>
      <h3>Hallo, {name}!</h3>
      <p>
        Das hier ist deine erste Komponente. Alles was du siehst, kommt aus
        der Funktion <code>Lektion1_KomponentenJSX</code>.
      </p>
      <p>
        In JSX kannst du mit geschweiften Klammern jederzeit JavaScript
        einsetzen. Beispiel: 2 + 3 = <strong>{2 + 3}</strong>.
      </p>
    </div>
  );
}
