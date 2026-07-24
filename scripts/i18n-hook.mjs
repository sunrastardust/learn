// Was macht diese Datei? / What does this file do?
// DE: Ein SANFTER Agent-Hook (PostToolUse). Er wird nach jeder Datei-Aenderung
//     aufgerufen und prueft, ob de.json und en.json dieselben Schluessel haben.
//     Weichen sie ab, gibt er einen Hinweis aus -- blockt aber NICHT (Exit 0).
//     So wird der Agent waehrend der Arbeit erinnert, den Zwilling nicht zu
//     vergessen, ohne ihn mitten in einer mehrteiligen Aenderung auszubremsen.
// EN: A GENTLE agent hook (PostToolUse). It is called after every file edit and
//     checks whether de.json and en.json share the same keys. If they diverge
//     it prints a hint -- but does NOT block (exit 0). It nudges the agent
//     during work not to forget the twin key, without stopping it in the middle
//     of a multi-step change.
//
// Verdrahtet in .github/agents/logic.agent.md (hooks: PostToolUse).
// Wired up in .github/agents/logic.agent.md (hooks: PostToolUse).

import { readFileSync } from "node:fs";

try {
  const de = JSON.parse(readFileSync("src/i18n/de.json", "utf8"));
  const en = JSON.parse(readFileSync("src/i18n/en.json", "utf8"));
  const onlyDe = Object.keys(de).filter((k) => !(k in en));
  const onlyEn = Object.keys(en).filter((k) => !(k in de));

  if (onlyDe.length || onlyEn.length) {
    console.error("ℹ i18n-Hinweis / hint: de.json und en.json weichen ab / keys differ.");
    if (onlyDe.length) console.error("  nur in de.json / only in de.json:", onlyDe.join(", "));
    if (onlyEn.length) console.error("  nur in en.json / only in en.json:", onlyEn.join(", "));
    console.error("  -> vor dem Fertigstellen beide Dateien synchron halten / keep both files in sync.");
  }
} catch {
  // Datei fehlt oder ist gerade ungueltig (Agent editiert vielleicht noch) --
  // still ignorieren, ein sanfter Hook darf nie stoeren.
  // File missing or momentarily invalid (agent may still be editing) --
  // stay silent, a gentle hook must never get in the way.
}

// IMMER erfolgreich beenden: Ein PostToolUse-Hook soll den Agenten nur
// erinnern, niemals blockieren.
// ALWAYS exit successfully: a PostToolUse hook should only remind the agent,
// never block it.
process.exit(0);
