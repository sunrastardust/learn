// Was macht diese Datei?
// Die Lektion "Frontmatter": Sie erklaert den YAML-Kopf zwischen den beiden
// --- Zeilen am Anfang der Setup-Dateien. Pro Dateityp (.agent.md,
// .instructions.md, SKILL.md, .prompt.md) gibt es eine Tabelle mit den
// moeglichen Feldern, dazu ein echtes Beispiel aus diesem Repo und ein
// Abschnitt ueber veraltete Schreibweisen.
//
// What does this file do?
// The "frontmatter" lesson: it explains the YAML header between the two ---
// lines at the top of the setup files. For each file type (.agent.md,
// .instructions.md, SKILL.md, .prompt.md) there is a table of the available
// fields, plus a real example from this repo and a section on outdated
// spellings.

import { useLanguage } from "../i18n/LanguageContext";

// Die Felder je Dateityp. Der Feldname ist ein Eigenname (fest), der Zweck
// wird uebersetzt. Die Schluessel stehen ausgeschrieben da, damit
// `npm run check:i18n` sie als benutzt erkennt.
// The fields per file type. The field name is a proper noun (fixed), the
// purpose is translated. Keys are spelled out so `npm run check:i18n` sees
// them as used.
const agentFields = [
  { field: "name", purposeKey: "fm.a.name" },
  { field: "description", purposeKey: "fm.a.desc" },
  { field: "model", purposeKey: "fm.a.model" },
  { field: "tools", purposeKey: "fm.a.tools" },
  { field: "agents", purposeKey: "fm.a.agents" },
  { field: "argument-hint", purposeKey: "fm.a.hint" },
  { field: "hooks", purposeKey: "fm.a.hooks" },
  { field: "user-invocable", purposeKey: "fm.a.userinv" },
];

const instructionFields = [
  { field: "applyTo", purposeKey: "fm.i.applyto" },
  { field: "description", purposeKey: "fm.i.desc" },
  { field: "name", purposeKey: "fm.i.name" },
];

const skillFields = [
  { field: "name", purposeKey: "fm.s.name" },
  { field: "description", purposeKey: "fm.s.desc" },
  { field: "allowed-tools", purposeKey: "fm.s.tools" },
  { field: "license", purposeKey: "fm.s.license" },
];

const promptFields = [
  { field: "description", purposeKey: "fm.p.desc" },
  { field: "agent", purposeKey: "fm.p.agent" },
  { field: "argument-hint", purposeKey: "fm.p.hint" },
  { field: "model", purposeKey: "fm.p.model" },
  { field: "tools", purposeKey: "fm.p.tools" },
];

// Das echte Frontmatter des logic-Agents aus diesem Repo -- Code, daher
// nicht uebersetzt.
// The real frontmatter of this repo's logic agent -- code, hence untranslated.
const realExample = `---
name: logic
description: Specialist for data and structure ...
model: Claude Sonnet 4.5
tools: ['search', 'edit', 'execute/runInTerminal',
        'execute/getTerminalOutput', 'read/problems']
agents: []
hooks:
  PostToolUse:
    - type: command
      command: "node scripts/i18n-hook.mjs"
---

# logic — data & structure      <-- ab hier: der Text fuer das Modell
Scope: src/lessons/lessons.ts ...`;

export function Lesson_Frontmatter() {
  const { t } = useLanguage();

  // Eine Tabelle rendern -- viermal dieselbe Struktur, darum als kleine
  // Hilfsfunktion (so muss man das JSX nicht viermal schreiben).
  // Render one table -- the same structure four times, so a small helper
  // (that way you don't write the JSX four times).
  const table = (rows: { field: string; purposeKey: string }[]) => (
    <div className="table-scroll">
      <table>
        <thead>
          <tr>
            <th>{t("fm.sp.feld")}</th>
            <th>{t("fm.sp.zweck")}</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.field}>
              <td>
                <code>{row.field}</code>
              </td>
              <td>{t(row.purposeKey)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="lesson-text">
      <h3>{t("fm.h")}</h3>
      <p>{t("fm.p1")}</p>
      <p>{t("fm.p2")}</p>
      <p className="merksatz">{t("fm.p3")}</p>

      {/* Ein echtes Beispiel zuerst -- danach die Nachschlage-Tabellen.
          A real example first -- then the reference tables. */}
      <h4>{t("fm.bsp.h")}</h4>
      <p>{t("fm.bsp.p")}</p>
      <pre className="code-block">{realExample}</pre>

      <h4>{t("fm.agent.h")}</h4>
      <p>{t("fm.agent.p")}</p>
      {table(agentFields)}
      <p>{t("fm.agent.mehr")}</p>

      <h4>{t("fm.instr.h")}</h4>
      <p>{t("fm.instr.p")}</p>
      {table(instructionFields)}

      <h4>{t("fm.skill.h")}</h4>
      <p>{t("fm.skill.p")}</p>
      {table(skillFields)}

      <h4>{t("fm.prompt.h")}</h4>
      <p>{t("fm.prompt.p")}</p>
      {table(promptFields)}

      {/* Veraltete Schreibweisen -- haeufige Fehlerquelle beim Kopieren
          alter Beispiele aus dem Netz.
          Outdated spellings -- a common source of errors when copying old
          examples from the web. */}
      <h4>{t("fm.alt.h")}</h4>
      <p>{t("fm.alt.p1")}</p>
      <ul>
        {["fm.alt.i1", "fm.alt.i2", "fm.alt.i3"].map((key) => (
          <li key={key}>{t(key)}</li>
        ))}
      </ul>

      <p>{t("fm.ausnahme")}</p>
    </div>
  );
}
