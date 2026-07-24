// Was macht diese Datei?
// Die Lektion "Skripte, Hooks & MCP": drei fortgeschrittene Bausteine eines
// Agent-Setups. Hilfsskripte erledigen deterministische Arbeit billig (sparen
// Tokens), Hooks setzen Regeln bei Ereignissen automatisch durch, MCP-Server
// erweitern die Werkzeuge. Das Projekt liefert fuer Skripte ein echtes
// Beispiel (scripts/check-i18n.mjs).
//
// What does this file do?
// The "Scripts, hooks & MCP" lesson: three advanced building blocks of an
// agent setup. Helper scripts do deterministic work cheaply (save tokens),
// hooks enforce rules automatically on events, MCP servers extend the tools.
// The project provides a real example for scripts (scripts/check-i18n.mjs).

import { useLanguage } from "../i18n/LanguageContext";

// Die drei Bausteine als Tabellen-Daten fuer die Uebersicht am Ende.
// The three building blocks as table data for the summary at the end.
const blocks = [
  { name: "shm.tab.skript", purpose: "shm.tab.skript.zweck", example: "scripts/check-i18n.mjs" },
  { name: "shm.tab.hook", purpose: "shm.tab.hook.zweck", example: ".github/workflows/deploy.yml" },
  { name: "shm.tab.mcp", purpose: "shm.tab.mcp.zweck", example: "shm.tab.mcp.beispiel" },
];

export function Lesson_ScriptsHooksMCP() {
  const { t } = useLanguage();

  return (
    <div className="lesson-text">
      <h3>{t("shm.h")}</h3>
      <p>{t("shm.p1")}</p>

      {/* --- 1. Hilfsskripte (sparen Tokens) / helper scripts (save tokens) - */}
      <h4>{t("shm.skript.h")}</h4>
      <p>{t("shm.skript.p1")}</p>
      <p>{t("shm.skript.p2")}</p>

      {/* Token-Vergleich: Modell-Denkarbeit vs. Skript. Die Balkenbreiten sind
          illustrativ -- sie zeigen die Groessenordnung, keine Messwerte.
          Token comparison: model reasoning vs. script. The bar widths are
          illustrative -- they show the order of magnitude, not measurements. */}
      <div className="tokencmp">
        <div className="tokencmp-row">
          <span className="tokencmp-label">{t("shm.skript.vorher")}</span>
          <div className="tokencmp-track">
            <div className="tokencmp-bar big" />
          </div>
        </div>
        <div className="tokencmp-row">
          <span className="tokencmp-label">{t("shm.skript.nachher")}</span>
          <div className="tokencmp-track">
            <div className="tokencmp-bar small" />
          </div>
        </div>
      </div>

      <p>{t("shm.skript.faustregel")}</p>

      {/* --- 2. Hooks / hooks --------------------------------------------- */}
      <h4>{t("shm.hook.h")}</h4>
      <p>{t("shm.hook.p1")}</p>
      <p>{t("shm.hook.p2")}</p>
      <p>{t("shm.hook.p3")}</p>
      <p>{t("shm.hook.p4")}</p>
      <p>{t("shm.hook.p5")}</p>
      <p>{t("shm.hook.p6")}</p>

      {/* --- 3. MCP-Server / MCP servers --------------------------------- */}
      <h4>{t("shm.mcp.h")}</h4>
      <p>{t("shm.mcp.p1")}</p>
      <p>{t("shm.mcp.p2")}</p>
      <p>
        <strong>{t("shm.mcp.p3")}</strong>
      </p>

      {/* --- Uebersicht / summary ---------------------------------------- */}
      <h4>{t("shm.tab.h")}</h4>
      <div className="table-scroll">
        <table>
          <thead>
            <tr>
              <th>{t("shm.tab.sp.baustein")}</th>
              <th>{t("shm.tab.sp.zweck")}</th>
              <th>{t("shm.tab.sp.beispiel")}</th>
            </tr>
          </thead>
          <tbody>
            {blocks.map((b) => (
              <tr key={b.name}>
                <td>
                  <strong>{t(b.name)}</strong>
                </td>
                <td>{t(b.purpose)}</td>
                <td>
                  {/* Echte Datei-Pfade fest, der MCP-Beispieltext uebersetzt.
                      Real file paths fixed, the MCP example text translated. */}
                  {b.example.startsWith("shm.") ? t(b.example) : <code>{b.example}</code>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
