// Was macht diese Datei? / What does this file do?
// DE: Ein GitHub-Copilot-Hook fuer das Ereignis postToolUse (laeuft NACH einem
//     Werkzeug-Aufruf). Er prueft, ob de.json und en.json dieselben Schluessel
//     haben. Weichen sie ab, gibt er dem Agenten einen Hinweis als
//     "additionalContext" zurueck -- postToolUse kann nichts mehr verweigern,
//     nur noch reagieren/erinnern.
//     Verdrahtet als agent-spezifischer Hook in .github/agents/logic.agent.md.
// EN: A GitHub Copilot hook for the postToolUse event (runs AFTER a tool call).
//     It checks whether de.json and en.json share the same keys. On divergence
//     it returns a hint to the agent as "additionalContext" -- postToolUse can
//     no longer deny, only react/remind.
//     Wired up as an agent-scoped hook in .github/agents/logic.agent.md.

import { readFileSync } from "node:fs";

let raw = "";
process.stdin.on("data", (chunk) => (raw += chunk));
process.stdin.on("end", () => {
  try {
    const de = JSON.parse(readFileSync("src/i18n/de.json", "utf8"));
    const en = JSON.parse(readFileSync("src/i18n/en.json", "utf8"));
    const onlyDe = Object.keys(de).filter((k) => !(k in en));
    const onlyEn = Object.keys(en).filter((k) => !(k in de));

    if (onlyDe.length || onlyEn.length) {
      const parts = [];
      if (onlyDe.length) parts.push("nur in de.json / only in de.json: " + onlyDe.join(", "));
      if (onlyEn.length) parts.push("nur in en.json / only in en.json: " + onlyEn.join(", "));
      const msg =
        "i18n: Schluessel weichen ab / keys differ. " +
        parts.join("; ") +
        ". Bitte beide Dateien synchron halten / please keep both files in sync.";
      // additionalContext gibt Copilot den Hinweis mit in die naechste Runde.
      // additionalContext hands the hint to Copilot for the next round.
      console.log(JSON.stringify({ hookSpecificOutput: { additionalContext: msg } }));
    }
  } catch {
    // Datei fehlt oder ist gerade ungueltig -> still bleiben.
    // File missing or momentarily invalid -> stay silent.
  }
  process.exit(0);
});
