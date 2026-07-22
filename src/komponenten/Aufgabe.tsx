// Was macht diese Datei?
// Eine kleine, WIEDERVERWENDBARE Komponente: die gelbe "Aufgabe fuer dich"-Box.
// Jede Lektion nutzt sie, damit die Aufgabe ueberall gleich aussieht. Genau
// dafuer sind Komponenten da -- einmal bauen, ueberall verwenden.

// Die Props dieser Komponente: nur ein Text.
type AufgabeProps = {
  text: string;
};

export function Aufgabe({ text }: AufgabeProps) {
  return (
    <div className="aufgabe">
      <strong>✏️ Aufgabe fuer dich</strong>
      <p>{text}</p>
    </div>
  );
}
