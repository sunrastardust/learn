// Was macht diese Datei?
// Die Lektion "Agent-Setup: Simulator". Sie macht das Copilot-Setup unter
// .github/ ERLEBBAR: Der Nutzer stellt (simuliert) eine Anfrage, waehlt WOMIT
// er arbeitet (eigener Agent oder ein eingebauter Modus) und sieht, was
// FESTGELEGT ist (Modell, Werkzeuge, Fokus) und was das kostet. Kernaussage:
// Ein eigener Agent legt alles bewusst fest; bei einem eingebauten Modus
// haengt es vom Picker ab -- das Modell kann zu teuer ODER zu schwach sein.
// Es laeuft keine echte KI; alles ist nachgestellt.
//
// What does this file do?
// The "Agent setup: simulator" lesson. It makes the Copilot setup under
// .github/ TANGIBLE: the user (simulated) sends a request, chooses WHAT they
// work with (a custom agent or a built-in mode) and sees what is FIXED (model,
// tools, focus) and what it costs. Core message: a custom agent deliberately
// fixes everything; with a built-in mode it depends on the picker -- the model
// may be too expensive OR too weak. No real AI runs; everything is staged.

import { useState } from "react";
import { useLanguage } from "../i18n/LanguageContext";

// --- Kosten-Modell (bewusst vereinfacht!) ---------------------------------
// Alle Zahlen sind "Kostenpunkte": Tokens x relativer Modellpreis.
// --- Cost model (deliberately simplified!) --------------------------------
// All numbers are "cost points": tokens x relative model price.
const BASE_WORK = 2000; // Aufgabe + Code-Kontext / task + code context
const BASE_QUESTION = 800; // reine Frage / pure question
const ALWAYS_RULES = 300; // copilot-instructions.md
const PER_APPLYTO = 400; // eine applyTo-Datei / one applyTo file
const ALL_APPLYTO = 1200; // alle drei, wenn immer geladen / all three if always on
const PER_SKILL = 800; // ein Skill-Inhalt / one skill body
const ALL_SKILLS = 1600; // beide Skills inline / both skills inline
const SKILL_INDEX = 60; // nur die Kurzbeschreibungen / descriptions only
const ROUTER_STEP = 500; // der Router liest die Anfrage / router reads request
// Relative Modellpreise. Ein eigener Agent legt ein PASSENDES fest (guenstig
// ODER stark, je nach Aufgabe). Ein eingebauter Modus nimmt, was im Picker
// steht -- irgendwo zwischen diesen Enden, und man waehlt es nicht bewusst.
// Relative model prices. A custom agent fixes a FITTING one (cheap OR strong,
// depending on the task). A built-in mode takes whatever is in the picker --
// somewhere between these ends, and you don't choose it deliberately.
const PRICE_CHEAP = 1; // Haiku
const PRICE_STRONG = 5; // Sonnet
const PRICE_PREMIUM = 10; // Opus

type Mode = "custom" | "agent" | "ask";

const modeButtons: { id: Mode; labelKey: string }[] = [
  { id: "custom", labelKey: "sim.modus.custom" },
  { id: "agent", labelKey: "sim.modus.agent" },
  { id: "ask", labelKey: "sim.modus.ask" },
];

// Die drei Dinge, die ein eigener Agent festlegt -- und die bei einem
// eingebauten Modus offen bleiben.
// The three things a custom agent fixes -- and that stay open with a
// built-in mode.
const controlRows = [
  { labelKey: "sim.ctrl.modell", customKey: "sim.ctrl.modell.custom", builtinKey: "sim.ctrl.modell.builtin" },
  { labelKey: "sim.ctrl.tools", customKey: "sim.ctrl.tools.custom", builtinKey: "sim.ctrl.tools.builtin" },
  { labelKey: "sim.ctrl.scope", customKey: "sim.ctrl.scope.custom", builtinKey: "sim.ctrl.scope.builtin" },
];

// Ein Szenario beschreibt eine Beispiel-Anfrage und wie das Setup reagiert.
// A scenario describes an example request and how the setup reacts.
type Scenario = {
  id: string;
  titleKey: string;
  reasonKey: string;
  agent: string | null; // null = reine Frage / pure question
  model: string | null; // Anzeigename / display name
  strong: boolean; // braucht das teure Modell? / needs the expensive model?
  files: string[];
  instructions: string[];
  skill: string | null;
};

const scenarios: Scenario[] = [
  {
    id: "s1",
    titleKey: "sim.s1.titel",
    reasonKey: "sim.s1.grund",
    agent: "@ui",
    model: "Claude Sonnet 4.5",
    strong: true,
    files: ["src/App.css"],
    instructions: ["styles.instructions.md"],
    skill: null,
  },
  {
    id: "s2",
    titleKey: "sim.s2.titel",
    reasonKey: "sim.s2.grund",
    agent: "@logic",
    model: "Claude Sonnet 4.5",
    strong: true,
    files: ["src/lessons/Lesson_UseRef.tsx", "src/lessons/lessons.ts", "src/i18n/de.json", "src/i18n/en.json"],
    instructions: ["lessons.instructions.md", "i18n.instructions.md"],
    skill: "new-lesson",
  },
  {
    id: "s3",
    titleKey: "sim.s3.titel",
    reasonKey: "sim.s3.grund",
    agent: "@docs",
    model: "Claude Haiku 4.5",
    strong: false,
    files: ["README.md"],
    instructions: [],
    skill: null,
  },
  {
    id: "s4",
    titleKey: "sim.s4.titel",
    reasonKey: "sim.s4.grund",
    agent: "@logic",
    model: "Claude Sonnet 4.5",
    strong: true,
    files: ["src/i18n/de.json", "src/i18n/en.json"],
    instructions: ["i18n.instructions.md"],
    skill: "i18n-check",
  },
  {
    id: "s5",
    titleKey: "sim.s5.titel",
    reasonKey: "sim.s5.grund",
    agent: null,
    model: null,
    strong: false,
    files: [],
    instructions: [],
    skill: null,
  },
];

export function Lesson_AgentSimulator() {
  const { t } = useLanguage();

  const [activeId, setActiveId] = useState("s1");
  const [mode, setMode] = useState<Mode>("custom");
  const [applyToOn, setApplyToOn] = useState(true);
  const [skillsOn, setSkillsOn] = useState(true);

  const scenario = scenarios.find((s) => s.id === activeId) ?? scenarios[0];
  const isWork = scenario.agent !== null; // Arbeit vs. reine Frage / work vs. pure question
  const isBuiltin = mode !== "custom"; // eingebauter Modus? / a built-in mode?

  // --- Kosten berechnen / compute the cost --------------------------------
  // Der Ask-Modus unterhaelt sich nur, darum die kleinere Basis.
  // Ask mode only converses, hence the smaller base.
  const base = mode === "ask" ? BASE_QUESTION : isWork ? BASE_WORK : BASE_QUESTION;
  // applyTo & Skills gelten in JEDEM Modus (agentenunabhaengig, siehe Lekt. 16).
  // applyTo & skills apply in EVERY mode (agent-independent, see lesson 17).
  const instructionCost = applyToOn ? scenario.instructions.length * PER_APPLYTO : ALL_APPLYTO;
  const skillCost = skillsOn ? (scenario.skill ? PER_SKILL : 0) + SKILL_INDEX : 0;
  const ctxSum = base + ALWAYS_RULES + instructionCost + skillCost;
  const routerCost = mode === "custom" && isWork ? ROUTER_STEP * PRICE_CHEAP : 0;

  // Eigener Agent: EIN fester Preis (passendes Modell). Eingebauter Modus:
  // eine BANDBREITE -- vom guenstigsten bis zum teuersten Picker-Modell.
  // Custom agent: ONE fixed price (fitting model). Built-in mode: a RANGE --
  // from the cheapest to the most expensive picker model.
  let costMin: number;
  let costMax: number;
  if (mode === "custom") {
    const price = scenario.strong ? PRICE_STRONG : PRICE_CHEAP;
    costMin = ctxSum * price + routerCost;
    costMax = costMin;
  } else {
    costMin = ctxSum * PRICE_CHEAP;
    costMax = ctxSum * PRICE_PREMIUM;
  }
  const isRange = costMin !== costMax;

  // Referenz-Obergrenze: alles immer geladen, teures Modell.
  // Reference upper bound: everything always loaded, expensive model.
  const naivePoints = (BASE_WORK + ALWAYS_RULES + ALL_APPLYTO + ALL_SKILLS) * PRICE_PREMIUM;
  const minWidth = Math.max(2, Math.round((costMin / naivePoints) * 100));
  const maxWidth = Math.max(minWidth, Math.round((costMax / naivePoints) * 100));

  const hasWarnings =
    !applyToOn || (!skillsOn && scenario.skill !== null) || mode === "agent" || (mode === "ask" && isWork);

  const step1 =
    mode === "custom" ? t("sim.schritt1") : mode === "agent" ? t("sim.schritt1.agentmode") : t("sim.schritt1.askmode");

  return (
    <div className="lesson-text">
      <h3>{t("sim.h")}</h3>
      <p>{t("sim.p1")}</p>

      <div className="sim-intro">
        <strong>{t("sim.was.h")}</strong>
        <p>{t("sim.was.p1")}</p>
        <p>{t("sim.was.p2")}</p>
      </div>

      {/* --- 1. Anfrage waehlen / pick a request --------------------------- */}
      <p>
        <strong>{t("sim.waehle")}</strong>
      </p>
      <div className="sim-scenarios">
        {scenarios.map((s) => (
          <button
            key={s.id}
            className={s.id === activeId ? "sim-button active" : "sim-button"}
            onClick={() => setActiveId(s.id)}
          >
            {t(s.titleKey)}
          </button>
        ))}
      </div>

      <div className="sim-prompt">
        <span className="sim-prompt-label">{t("sim.anfrage")}</span>
        <em>„{t(scenario.titleKey)}"</em>
      </div>

      {/* --- 2. Modus waehlen / pick the mode ----------------------------- */}
      <p>
        <strong>{t("sim.modus.h")}</strong>
      </p>
      <div className="sim-scenarios">
        {modeButtons.map((m) => (
          <button
            key={m.id}
            className={m.id === mode ? "sim-button active" : "sim-button"}
            onClick={() => setMode(m.id)}
          >
            {t(m.labelKey)}
          </button>
        ))}
      </div>

      {/* --- 3. Mechanismus-Schalter / mechanism toggles ------------------ */}
      <div className="sim-toggles">
        <strong className="sim-toggles-title">{t("sim.tg.h")}</strong>
        <label>
          <input type="checkbox" checked={applyToOn} onChange={(e) => setApplyToOn(e.target.checked)} />
          {t("sim.tg.applyto")}
        </label>
        <label>
          <input type="checkbox" checked={skillsOn} onChange={(e) => setSkillsOn(e.target.checked)} />
          {t("sim.tg.skills")}
        </label>
      </div>
      <p className="sim-note">{t("sim.tg.p")}</p>

      <div className="sim-effect">
        <span className="sim-effect-label">{t("sim.wirkung")}</span>
        <div className="sim-warnings">
          {hasWarnings ? (
            <>
              {!applyToOn && <p className="sim-warning">⚠ {t("sim.warn.applyto")}</p>}
              {!skillsOn && scenario.skill && <p className="sim-warning">⚠ {t("sim.warn.skill")}</p>}
              {mode === "agent" && <p className="sim-warning">⚠ {t("sim.warn.agentmode")}</p>}
              {mode === "ask" && isWork && <p className="sim-warning">⚠ {t("sim.warn.askmode")}</p>}
            </>
          ) : (
            <p className="sim-ok">{t("sim.warn.keine")}</p>
          )}
        </div>
      </div>

      {/* --- Der Ablauf / the flow --------------------------------------- */}
      <div className="sim-box">
        {/* Schritt 1 / step 1 */}
        <p className="sim-step">{step1}</p>

        {/* Schritt 2 / step 2 */}
        <p className="sim-step">{t("sim.schritt2")}</p>
        <p className="sim-decision">
          {mode === "custom" ? (
            isWork ? (
              <strong>
                {scenario.agent} · {scenario.model}
              </strong>
            ) : (
              <strong>{t("sim.keinagent")}</strong>
            )
          ) : mode === "agent" ? (
            <strong>{t("sim.wer.agentmode")}</strong>
          ) : (
            <strong>{t("sim.wer.askmode")}</strong>
          )}
        </p>
        <p className="sim-reason">
          {mode === "custom"
            ? t(scenario.reasonKey)
            : mode === "agent"
              ? t("sim.grund.agentmode")
              : t("sim.grund.askmode")}
        </p>
        {mode === "custom" && isWork && <p className="sim-note">{t("sim.at")}</p>}
        <p className="sim-files">
          {t("sim.beruehrte")}{" "}
          {mode === "ask" ? (
            <em>{t("sim.files.ask")}</em>
          ) : scenario.files.length > 0 ? (
            scenario.files.map((file) => (
              <code key={file} className="sim-file">
                {file}
              </code>
            ))
          ) : (
            <em>{t("sim.beruehrte.keine")}</em>
          )}
        </p>

        {/* Schritt 3 / step 3 -- Kontext gilt in JEDEM Modus gleich. */}
        <p className="sim-step">{t("sim.schritt3")}</p>
        <div className="sim-chips">
          <span className="chip chip-always">copilot-instructions.md · {t("sim.ctx.immer")}</span>
          {applyToOn &&
            scenario.instructions.map((file) => (
              <span key={file} className="chip chip-applyto">
                {file} · {t("sim.ctx.applyto")}
              </span>
            ))}
          {skillsOn && scenario.skill && (
            <span className="chip chip-skill">
              {scenario.skill}/SKILL.md · {t("sim.ctx.skill")}
            </span>
          )}
          {scenario.instructions.length === 0 && !scenario.skill && (
            <span className="sim-chips-note">{t("sim.ctx.keine")}</span>
          )}
        </div>

        {/* Schritt 4 / step 4 -- Was ist festgelegt, und was kostet es? ---- */}
        <p className="sim-step">{t("sim.schritt4")}</p>

        {/* Kontroll-Karte: Modell, Werkzeuge, Fokus -- fest vs. ungewiss.
            Control card: model, tools, focus -- fixed vs. undetermined. */}
        <div className="sim-control">
          {controlRows.map((row) => (
            <div className="sim-ctrl-row" key={row.labelKey}>
              <span className="sim-ctrl-dim">{t(row.labelKey)}</span>
              <span className={isBuiltin ? "sim-ctrl-val gamble" : "sim-ctrl-val fixed"}>
                {isBuiltin ? "○ " : "✓ "}
                {t(isBuiltin ? row.builtinKey : row.customKey)}
              </span>
            </div>
          ))}
        </div>

        {/* Kosten: eigener Agent = ein Punkt, eingebauter Modus = Bandbreite.
            Cost: custom agent = one point, built-in mode = a range. */}
        <div className="sim-bar-row">
          <span className="sim-bar-label">{t("sim.tok.setup")}</span>
          <div className="sim-bar">
            {/* Heller Teil = die ganze Bandbreite; solider Teil = Untergrenze.
                Light part = the whole range; solid part = the lower bound. */}
            <div className="sim-bar-fill range" style={{ width: `${maxWidth}%` }} />
            <div className="sim-bar-fill setup" style={{ width: `${minWidth}%` }} />
          </div>
          <span className="sim-bar-value">
            {isRange ? `${costMin.toLocaleString()} – ${costMax.toLocaleString()}` : costMin.toLocaleString()}
          </span>
        </div>
        <div className="sim-bar-row">
          <span className="sim-bar-label">{t("sim.tok.naiv")}</span>
          <div className="sim-bar">
            <div className="sim-bar-fill naive" style={{ width: "100%" }} />
          </div>
          <span className="sim-bar-value">{naivePoints.toLocaleString()}</span>
        </div>
        <p className="sim-note">{t("sim.tok.hinweis")}</p>
      </div>

      <p>
        <strong>{t("sim.fazit")}</strong>
      </p>

      {/* Zum Nachschlagen ganz am Ende: die echten Dateien des Setups.
          For reference at the very end: the real files of the setup. */}
      <h4>{t("sim.dateien.h")}</h4>
      <ul>
        {["sim.f1", "sim.f2", "sim.f3", "sim.f4", "sim.f5"].map((key) => (
          <li key={key}>{t(key)}</li>
        ))}
      </ul>
    </div>
  );
}
