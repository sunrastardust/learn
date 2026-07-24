// Was macht diese Datei?
// Prueft die Sprachdateien: (1) de.json und en.json haben exakt dieselben
// Schluessel, (2) alle im Code benutzten Schluessel existieren, (3) unbenutzte
// Schluessel werden als Warnung gemeldet. Wird von `npm run check:i18n`
// aufgerufen -- und vom Skill `.github/skills/i18n-check`.
//
// What does this file do?
// Checks the language files: (1) de.json and en.json have exactly the same
// keys, (2) every key used in the code exists, (3) unused keys are reported
// as a warning. Invoked by `npm run check:i18n` -- and by the skill
// `.github/skills/i18n-check`.

import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

const de = JSON.parse(readFileSync("src/i18n/de.json", "utf8"));
const en = JSON.parse(readFileSync("src/i18n/en.json", "utf8"));

// Alle .ts/.tsx-Dateien unter src/ einsammeln (rekursiv).
// Collect all .ts/.tsx files under src/ (recursively).
function* sourceFiles(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) yield* sourceFiles(path);
    else if (/\.(ts|tsx)$/.test(entry.name)) yield path;
  }
}

// Benutzte Schluessel finden -- zwei Stufen:
// - STRENG: t("...")-Aufrufe und *Key:-Eigenschaften -> muessen existieren.
// - LOCKER: jeder String in Punkt-Schreibweise (z.B. in Daten-Arrays wie
//   ["road.g1.i1", ...]) -> zaehlt nur gegen die UNUSED-Warnung.
// Find used keys -- two tiers:
// - STRICT: t("...") calls and *Key: properties -> must exist.
// - LOOSE: any dot-notation string (e.g. in data arrays like
//   ["road.g1.i1", ...]) -> only counts against the UNUSED warning.
const used = new Set();
const mentioned = new Set();
for (const file of sourceFiles("src")) {
  const source = readFileSync(file, "utf8");
  for (const m of source.matchAll(/\bt\(\s*["']([^"']+)["']/g)) used.add(m[1]);
  for (const m of source.matchAll(/\b\w*[Kk]ey\s*:\s*["']([^"']+)["']/g)) used.add(m[1]);
  for (const m of source.matchAll(/["']([a-z0-9]+(?:\.[a-z0-9]+)+)["']/gi)) mentioned.add(m[1]);
}

let failed = 0;

// (1) Paritaet / parity
const onlyDe = Object.keys(de).filter((k) => !(k in en));
const onlyEn = Object.keys(en).filter((k) => !(k in de));
if (onlyDe.length || onlyEn.length) {
  failed = 1;
  console.error("PARITY: nur in de.json / only in de.json:", onlyDe);
  console.error("PARITY: nur in en.json / only in en.json:", onlyEn);
}

// (2) fehlende Schluessel / missing keys
const missing = [...used].filter((k) => !(k in de) || !(k in en));
if (missing.length) {
  failed = 1;
  console.error("MISSING (im Code benutzt, in JSON fehlt / used in code, absent in JSON):", missing);
}

// (3) unbenutzte Schluessel -- nur Warnung / unused keys -- warning only
const unused = Object.keys(de).filter((k) => !used.has(k) && !mentioned.has(k));
if (unused.length) console.warn("UNUSED (Warnung/warning):", unused);

console.log(
  failed
    ? "✗ i18n-Check fehlgeschlagen / check failed"
    : `✓ i18n ok — ${Object.keys(de).length} Schluessel/keys, ${used.size} benutzt/used`
);
process.exit(failed);
