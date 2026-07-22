// Was macht diese Datei?
// Das ist die HUELLE des Lernpfads -- die Haupt-Komponente der App. Sie merkt
// sich mit useState, welche Lektion gerade offen ist, zeigt links die Liste
// und rechts den Inhalt der gewaehlten Lektion. Das Umschalten laeuft bewusst
// nur ueber State (noch KEIN Router -- das kommt spaeter in Stufe 2).

import { useState } from "react";
import { lektionen } from "./lektionen/lektionen";
import { LektionsListe } from "./komponenten/LektionsListe";
import { Aufgabe } from "./komponenten/Aufgabe";
import "./App.css";

export default function App() {
  // State: die id der gerade gewaehlten Lektion. Start: die erste Lektion.
  const [aktiveId, setAktiveId] = useState(1);

  // Aus der id die passende Lektion heraussuchen.
  // .find(...) kann theoretisch nichts finden, deshalb faengt `?? lektionen[0]`
  // diesen Fall ab und nimmt zur Sicherheit die erste Lektion.
  const aktiveLektion =
    lektionen.find((l) => l.id === aktiveId) ?? lektionen[0];

  // Position der aktuellen Lektion im Array (0, 1, 2, ...) -- fuer Zurueck/Weiter.
  const index = lektionen.findIndex((l) => l.id === aktiveId);
  const istErste = index === 0;
  const istLetzte = index === lektionen.length - 1;

  // `Inhalt` ist die Komponente der aktiven Lektion. Weil sie mit grossem
  // Buchstaben beginnt, koennen wir sie unten als <Inhalt /> rendern.
  const Inhalt = aktiveLektion.Inhalt;

  return (
    <div className="lernpfad">
      <header className="kopf">
        <h1>React-Lernpfad</h1>
        <p>Klick dich Schritt fuer Schritt durch die Lektionen.</p>
      </header>

      <div className="raster">
        {/* LINKS: die Liste aller Lektionen. beiAuswahl setzt die neue id. */}
        <aside>
          <LektionsListe
            lektionen={lektionen}
            aktiveId={aktiveId}
            beiAuswahl={setAktiveId}
          />
        </aside>

        {/* RECHTS: die aktuell gewaehlte Lektion. */}
        <main className="inhalt">
          {/* Fortschritt: die wievielte von wie vielen Lektionen? */}
          <p className="fortschritt">
            Lektion {index + 1} von {lektionen.length}
          </p>

          <h2>{aktiveLektion.titel}</h2>
          <p className="untertitel">{aktiveLektion.kurzbeschreibung}</p>

          {/* Das Live-Beispiel: die Komponente der Lektion. */}
          <section className="beispiel">
            <Inhalt />
          </section>

          {/* Die Aufgabe -- ueberall gleich dank wiederverwendbarer Komponente. */}
          <Aufgabe text={aktiveLektion.aufgabe} />

          {/* Navigation: Zurueck / Weiter. Am Rand jeweils deaktiviert. */}
          <div className="navigation">
            <button
              disabled={istErste}
              onClick={() => setAktiveId(lektionen[index - 1].id)}
            >
              ← Zurueck
            </button>
            <button
              disabled={istLetzte}
              onClick={() => setAktiveId(lektionen[index + 1].id)}
            >
              Weiter →
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}
