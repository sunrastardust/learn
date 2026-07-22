// Was macht diese Datei?
// Lektion 2: PROPS. Props sind die "Argumente" einer Komponente -- damit gibt
// eine Eltern-Komponente Werte an eine Kind-Komponente weiter. In TypeScript
// beschreiben wir mit einem Typ genau, welche Props erlaubt sind.

// So typisiert man Props: Wir definieren einen Typ, der die erwarteten Felder
// auflistet. Schreibt man beim Aufruf einen Prop falsch oder vergisst ihn,
// meckert TypeScript sofort.
type BegruessungProps = {
  name: string; // Pflicht-Prop: Wer wird begruesst?
  // Ein `?` macht einen Prop OPTIONAL -- man DARF ihn weglassen.
  // `laune` kann nur einer dieser drei Texte sein (ein "Union-Typ").
  laune?: "froehlich" | "neutral" | "muede";
};

// Die Komponente bekommt EIN Objekt mit allen Props. Mit { name, laune }
// "packen" wir die einzelnen Props direkt aus (das nennt man Destructuring).
function Begruessung({ name, laune = "neutral" }: BegruessungProps) {
  // Je nach Laune waehlen wir ein passendes Emoji.
  const emoji = laune === "froehlich" ? "😄" : laune === "muede" ? "🥱" : "🙂";
  return (
    <p>
      Hallo {name}! {emoji}
    </p>
  );
}

// Diese Lektions-Komponente nutzt <Begruessung /> gleich mehrfach und gibt
// jedes Mal andere Props mit.
export function Lektion2_Props() {
  return (
    <div>
      <h3>Dieselbe Komponente, andere Props</h3>
      {/* Hier uebergeben wir die Props wie HTML-Attribute: name="..." */}
      <Begruessung name="Anna" laune="froehlich" />
      <Begruessung name="Ben" laune="muede" />
      {/* laune weggelassen -> es gilt der Standardwert "neutral" */}
      <Begruessung name="Chris" />
    </div>
  );
}
