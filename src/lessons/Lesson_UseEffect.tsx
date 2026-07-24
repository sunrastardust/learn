// Was macht diese Datei?
// Die Lektion "useEffect": Nebenwirkungen (Side Effects) -- Timer starten,
// Daten laden, aufraeumen. Nach dem Live-Beispiel folgt eine Ablauf-Grafik,
// die den Code des Beispiels in drei Phasen Schritt fuer Schritt erklaert
// (erstes Rendern / jede Sekunde / beim Verschwinden), dazu zwei Details,
// die die Schreibweise des Codes begruenden.
//
// What does this file do?
// The "useEffect" lesson: side effects -- starting timers, loading data,
// cleaning up. After the live example comes a flow graphic explaining the
// example's code step by step in three phases (first render / every second /
// on unmount), plus two details that justify how the code is written.

import { useLanguage } from "../i18n/LanguageContext";
import { LivePlayground } from "../components/LivePlayground";

// Der Anfangs-Code fuer den Live-Editor -- hier laesst sich die Aufgabe
// (Intervall aendern, Aufraeumen weglassen) direkt ausprobieren.
// The initial code for the live editor -- the task (change the interval,
// drop the cleanup) can be tried directly here.
const playgroundCode = `
function Clock() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setSeconds((s) => s + 1), 1000);
    // Aufräumen / cleanup:
    return () => clearInterval(id);
  }, []);

  return <p>Diese Uhr läuft seit {seconds} Sekunden.</p>;
}

render(<Clock />);
`;

// Die drei Phasen des Ablaufs. Die Schluessel stehen ausgeschrieben da (nicht
// zusammengebaut), damit `npm run check:i18n` sie als benutzt erkennt.
// `loop` markiert die Phase, die sich staendig wiederholt.
// The three phases of the flow. The keys are spelled out (not composed) so
// `npm run check:i18n` sees them as used. `loop` marks the phase that keeps
// repeating.
const phases = [
  {
    titleKey: "eff.ph1.titel",
    loop: false,
    stepKeys: [
      "eff.ph1.s1",
      "eff.ph1.s2",
      "eff.ph1.s3",
      "eff.ph1.s4",
      "eff.ph1.s5",
      "eff.ph1.s6",
    ],
  },
  {
    titleKey: "eff.ph2.titel",
    loop: true,
    stepKeys: [
      "eff.ph2.s1",
      "eff.ph2.s2",
      "eff.ph2.s3",
      "eff.ph2.s4",
      "eff.ph2.s5",
      "eff.ph2.s6",
    ],
  },
  {
    titleKey: "eff.ph3.titel",
    loop: false,
    stepKeys: ["eff.ph3.s1", "eff.ph3.s2"],
  },
];

export function Lesson_UseEffect() {
  const { t } = useLanguage();

  return (
    <div className="lesson-text">
      <h3>{t("eff.h")}</h3>
      <p>{t("eff.p1")}</p>
      <p>{t("eff.p2")}</p>
      <p>{t("eff.p3")}</p>

      {/* Erst das laufende Beispiel zeigen -- die Grafik darunter erklaert
          genau diesen Code.
          Show the running example first -- the graphic below explains
          exactly this code. */}
      <LivePlayground code={playgroundCode} />

      {/* --- Ablauf-Grafik: drei Phasen / flow graphic: three phases ------ */}
      <h4>{t("eff.ablauf.h")}</h4>
      <p>{t("eff.ablauf.p")}</p>
      <div className="phases">
        {phases.map((phase) => (
          <div
            className={phase.loop ? "phase phase-loop" : "phase"}
            key={phase.titleKey}
          >
            <strong className="phase-title">
              {t(phase.titleKey)} {phase.loop && <span aria-hidden="true">↻</span>}
            </strong>
            <ol>
              {phase.stepKeys.map((key) => (
                <li key={key}>{t(key)}</li>
              ))}
            </ol>
          </div>
        ))}
      </div>

      {/* Zwei Details, die erklaeren, WARUM der Code so geschrieben ist.
          Two details explaining WHY the code is written this way. */}
      <h4>{t("eff.detail.h")}</h4>
      <p>
        <strong>{t("eff.d1.h")}</strong> {t("eff.d1.p")}
      </p>
      <p>
        <strong>{t("eff.d2.h")}</strong> {t("eff.d2.p")}
      </p>

      <p className="merksatz">{t("eff.merksatz")}</p>
    </div>
  );
}
