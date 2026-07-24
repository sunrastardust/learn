// Was macht diese Datei?
// Die Lektion "Agent-Setup: Simulator". Sie macht das Copilot-Setup unter
// .github/ ERLEBBAR: Der Nutzer stellt (simuliert) eine Anfrage an Copilot,
// waehlt WOMIT er arbeitet (eigener Agent oder ein eingebauter Modus) und
// verfolgt in vier festen Schritten, was hinter den Kulissen passiert --
// samt Kostenvergleich. Es laeuft keine echte KI; alles ist nachgestellt.
// Wichtig fuers Layout: Alle Bereiche sind IMMER da (feste Slots mit
// Mindesthoehen) -- so springt die Seite beim Umschalten nicht.
//
// What does this file do?
// The "Agent setup: simulator" lesson. It makes the Copilot setup under
// .github/ TANGIBLE: the user (simulated) sends a request to Copilot, chooses
// WHAT they work with (a custom agent or a built-in mode) and follows in four
// fixed steps what happens behind the scenes -- including a cost comparison.
// No real AI runs; everything is staged.
// Important for the layout: all areas are ALWAYS present (fixed slots with
// minimum heights) -- so the page does not jump when switching.

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
const PRICE_CHEAP = 1; // Haiku (relativ) / Haiku (relative)
const PRICE_STRONG = 5; // Sonnet (relativ) / Sonnet (relative)

// Womit arbeitet der Nutzer? Der eigene Agent (mit Router) oder ein
// eingebauter Modus aus dem VS-Code-Picker.
// What does the user work with? The custom agent (with router) or a built-in
// mode from the VS Code picker.
type Mode = "custom" | "agent" | "ask";

const modeButtons: { id: Mode; labelKey: string }[] = [
  { id: "custom", labelKey: "sim.modus.custom" },
  { id: "agent", labelKey: "sim.modus.agent" },
  { id: "ask", labelKey: "sim.modus.ask" },
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

  // State: gewaehltes Szenario, gewaehlter Modus, zwei Mechanismus-Schalter.
  // State: chosen scenario, chosen mode, two mechanism toggles.
  const [activeId, setActiveId] = useState("s1");
  const [mode, setMode] = useState<Mode>("custom");
  const [applyToOn, setApplyToOn] = useState(true);
  const [skillsOn, setSkillsOn] = useState(true);

  const scenario = scenarios.find((s) => s.id === activeId) ?? scenarios[0];
  const isWork = scenario.agent !== null; // Arbeit vs. reine Frage / work vs. pure question

  // --- Kosten berechnen / compute the cost --------------------------------
  // Der Ask-Modus unterhaelt sich nur (kein autonomes Durchsuchen der
  // Codebasis), darum die kleinere Basis. / Ask mode only converses (no
  // autonomous codebase scan), hence the smaller base.
  const base = mode === "ask" ? BASE_QUESTION : isWork ? BASE_WORK : BASE_QUESTION;
  // applyTo & Skills gelten in JEDEM Modus (agentenunabhaengig, siehe Lekt. 16).
  // applyTo & skills apply in EVERY mode (agent-independent, see lesson 16).
  const instructionCost = applyToOn ? scenario.instructions.length * PER_APPLYTO : ALL_APPLYTO;
  const skillCost = skillsOn ? (scenario.skill ? PER_SKILL : 0) + SKILL_INDEX : 0;
  // Nur der eigene Agent (Router) waehlt ein passendes, ggf. guenstiges Modell.
  // Die eingebauten Modi nehmen immer das Modell aus dem Picker (hier: stark).
  // Only the custom agent (router) picks a fitting, possibly cheap model.
  // The built-in modes always take the picker model (here: strong).
  const workPrice = mode === "custom" ? (scenario.strong ? PRICE_STRONG : PRICE_CHEAP) : PRICE_STRONG;
  const workCost = (base + ALWAYS_RULES + instructionCost + skillCost) * workPrice;
  const routerCost = mode === "custom" && isWork ? ROUTER_STEP * PRICE_CHEAP : 0;
  const setupPoints = routerCost + workCost;

  // Referenz: ein einziger grosser Agent, alles immer im Kontext.
  // Reference: one single big agent, everything always in context.
  const naivePoints = (BASE_WORK + ALWAYS_RULES + ALL_APPLYTO + ALL_SKILLS) * PRICE_STRONG;
  const setupWidth = Math.max(3, Math.round((setupPoints / naivePoints) * 100));

  // Warnungen: fehlende Mechanismen ODER ein Modus, der nicht ideal passt.
  // Warnings: missing mechanisms OR a mode that is not a good fit.
  const hasWarnings =
    !applyToOn || (!skillsOn && scenario.skill !== null) || mode === "agent" || (mode === "ask" && isWork);

  // Schritt-1-Text je nach Modus. / Step-1 text depending on the mode.
  const step1 =
    mode === "custom" ? t("sim.schritt1") : mode === "agent" ? t("sim.schritt1.agentmode") : t("sim.schritt1.askmode");

  return (
    <div className="lesson-text">
      <h3>{t("sim.h")}</h3>
      <p>{t("sim.p1")}</p>

      {/* Die Erklaer-Box: Worum geht es hier ueberhaupt?
          The explainer box: what is this all about? */}
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

      {/* --- 2. Modus waehlen / pick the mode -----------------------------
          Eigener Agent ODER ein eingebauter Modus aus dem Picker.
          Custom agent OR a built-in mode from the picker. */}
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

      {/* --- 3. Mechanismus-Schalter / mechanism toggles ------------------
          Untereinander in einer festen Spalte -- so verspringt nichts.
          Stacked in a fixed column -- so nothing jumps. */}
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

      {/* Sofort-Feedback DIREKT unter den Schaltern.
          Immediate feedback RIGHT under the toggles. */}
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

      {/* --- Der Ablauf in vier festen Schritten / the flow in four steps -- */}
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
        {/* Der @-Hinweis ergibt nur beim eigenen Agent Sinn.
            The @ note only makes sense with a custom agent. */}
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

        {/* Schritt 4 / step 4 */}
        <p className="sim-step">{t("sim.schritt4")}</p>
        <div className="sim-bar-row">
          <span className="sim-bar-label">{t("sim.tok.setup")}</span>
          <div className="sim-bar">
            <div className="sim-bar-fill setup" style={{ width: `${setupWidth}%` }} />
          </div>
          <span className="sim-bar-value">{setupPoints.toLocaleString()}</span>
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
