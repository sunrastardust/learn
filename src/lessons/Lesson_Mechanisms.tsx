// Was macht diese Datei?
// Die Lektion "Mechanismen im Vergleich": Warum es Instructions UND Skills
// UND Agents gibt -- und warum man nicht einfach alles in die Agent-Datei
// schreibt. Kern der Lektion: Die drei werden von UNTERSCHIEDLICHEN Dingen
// ausgeloest (Pfad / Absicht / Rolle). Mit drei Grafiken: Ausloeser-Karten,
// drei Faelle mit Kontext-Chips und einem Entscheidungsbaum.
//
// What does this file do?
// The "Mechanisms compared" lesson: why there are instructions AND skills
// AND agents -- and why you don't simply put everything into the agent file.
// The core: the three are triggered by DIFFERENT things (path / intent /
// role). With three graphics: trigger cards, three cases with context chips
// and a decision tree.

import { useLanguage } from "../i18n/LanguageContext";

// --- Grafik 1: die drei Ausloeser als Karten ------------------------------
// Icon und Ziel-Ordner sind Eigennamen -- nicht uebersetzt. Die Schluessel
// stehen bewusst ausgeschrieben da (nicht zusammengebaut), damit
// `npm run check:i18n` sie als benutzt erkennt.
// --- Graphic 1: the three triggers as cards -------------------------------
// Icon and target folder are proper names -- not translated. The keys are
// deliberately spelled out (not composed) so `npm run check:i18n` can see
// them as used.
const triggers = [
  {
    icon: "📁",
    target: "instructions/",
    triggerKey: "mech.k1.ausloeser",
    questionKey: "mech.k1.frage",
    lifeKey: "mech.k1.dauer",
  },
  {
    icon: "🎯",
    target: "skills/",
    triggerKey: "mech.k2.ausloeser",
    questionKey: "mech.k2.frage",
    lifeKey: "mech.k2.dauer",
  },
  {
    icon: "👤",
    target: "agents/",
    triggerKey: "mech.k3.ausloeser",
    questionKey: "mech.k3.frage",
    lifeKey: "mech.k3.dauer",
  },
];

// --- Grafik 2: drei Faelle -- welche Aufgabe laedt welchen Kontext? -------
// Die Chip-Farben sind dieselben wie im Simulator (Lektion 18).
// --- Graphic 2: three cases -- which task loads which context? ------------
// The chip colours are the same as in the simulator (lesson 18).
const cases = [
  {
    titleKey: "mech.f1.titel",
    noteKey: "mech.f1.note",
    chips: [
      { label: "copilot-instructions.md", kind: "always" },
      { label: "i18n.instructions.md", kind: "applyto" },
    ],
  },
  {
    titleKey: "mech.f2.titel",
    noteKey: "mech.f2.note",
    chips: [
      { label: "copilot-instructions.md", kind: "always" },
      { label: "i18n-check/SKILL.md", kind: "skill" },
    ],
  },
  {
    titleKey: "mech.f3.titel",
    noteKey: "mech.f3.note",
    chips: [
      { label: "copilot-instructions.md", kind: "always" },
      { label: "lessons.instructions.md", kind: "applyto" },
      { label: "i18n.instructions.md", kind: "applyto" },
      { label: "new-lesson/SKILL.md", kind: "skill" },
    ],
  },
];

// --- Grafik 3: der Entscheidungsbaum -------------------------------------
// Frage uebersetzt, Ziel-Datei/Ordner fest.
// --- Graphic 3: the decision tree ----------------------------------------
// Question translated, target file/folder fixed.
const tree = [
  { questionKey: "mech.b1.frage", target: "instructions/ (applyTo)" },
  { questionKey: "mech.b2.frage", target: "skills/" },
  { questionKey: "mech.b3.frage", target: "agents/" },
  { questionKey: "mech.b4.frage", target: "prompts/" },
  { questionKey: "mech.b5.frage", target: "copilot-instructions.md" },
];

export function Lesson_Mechanisms() {
  const { t } = useLanguage();

  return (
    <div className="lesson-text">
      <h3>{t("mech.h")}</h3>
      <p>{t("mech.p1")}</p>

      {/* --- Grafik 1: Ausloeser-Karten / trigger cards ------------------- */}
      <h4>{t("mech.karten.h")}</h4>
      <div className="mech-cards">
        {triggers.map((item) => (
          <div className="mech-card" key={item.target}>
            <span className="mech-card-icon">{item.icon}</span>
            <strong className="mech-card-trigger">{t(item.triggerKey)}</strong>
            <span className="mech-card-question">{t(item.questionKey)}</span>
            <code className="mech-card-target">{item.target}</code>
            <span className="mech-card-life">{t(item.lifeKey)}</span>
          </div>
        ))}
      </div>

      {/* Das konkrete Beispiel aus diesem Repo.
          The concrete example from this repo. */}
      <h4>{t("mech.i18n.h")}</h4>
      <p>{t("mech.i18n.p1")}</p>
      <p>{t("mech.i18n.p2")}</p>
      <p>{t("mech.i18n.p3")}</p>

      {/* --- Grafik 2: drei Faelle mit Chips / three cases with chips ----- */}
      <h4>{t("mech.faelle.h")}</h4>
      <div className="case-list">
        {cases.map((item) => (
          <div className="case-row" key={item.titleKey}>
            <span className="case-title">„{t(item.titleKey)}"</span>
            <div className="case-chips">
              {item.chips.map((chip) => (
                <span key={chip.label} className={`chip chip-${chip.kind}`}>
                  {chip.label}
                </span>
              ))}
            </div>
            <span className="case-note">{t(item.noteKey)}</span>
          </div>
        ))}
      </div>

      {/* Warum nicht alles in die Agent-Datei?
          Why not put everything into the agent file? */}
      <h4>{t("mech.warum.h")}</h4>
      <ul>
        {["mech.w1", "mech.w2", "mech.w3", "mech.w4"].map((key) => (
          <li key={key}>{t(key)}</li>
        ))}
      </ul>

      {/* --- Grafik 3: Entscheidungsbaum / decision tree ------------------ */}
      <h4>{t("mech.baum.h")}</h4>
      <p>{t("mech.baum.p")}</p>
      <div className="tree-list">
        {tree.map((item) => (
          <div className="tree-row" key={item.questionKey}>
            <span className="tree-question">{t(item.questionKey)}</span>
            <span className="tree-arrow">→</span>
            <code className="tree-target">{item.target}</code>
          </div>
        ))}
      </div>

      <p>
        <strong>{t("mech.fazit")}</strong>
      </p>
    </div>
  );
}
