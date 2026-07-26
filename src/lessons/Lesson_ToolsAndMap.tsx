// Was macht diese Datei?
// Die Lektion "Werkzeuge & Projekt-Landkarte". Teil 1: Welche Bibliotheken
// und Werkzeuge in diesem Projekt arbeiten und wozu (react, react-dom, Vite,
// TypeScript, ...). Teil 2: Eine Landkarte "Was aendere ich wo?" -- die
// haeufigsten Aenderungswuensche und die zustaendigen Dateien.
//
// What does this file do?
// The "Tools & project map" lesson. Part 1: which libraries and tools work
// in this project and what for (react, react-dom, Vite, TypeScript, ...).
// Part 2: a map "What do I change where?" -- the most common change wishes
// and the files responsible for them.

import { useLanguage } from "../i18n/LanguageContext";

// Die Werkzeuge als Daten: Name fest (Eigennamen), Zweck uebersetzt.
// The tools as data: name fixed (proper nouns), purpose translated.
const libraries = [
  { name: "react", purposeKey: "tools.lib.react" },
  { name: "react-dom", purposeKey: "tools.lib.reactdom" },
  { name: "vite", purposeKey: "tools.lib.vite" },
  { name: "typescript", purposeKey: "tools.lib.ts" },
  { name: "oxlint", purposeKey: "tools.lib.oxlint" },
  { name: "react-live", purposeKey: "tools.lib.reactlive" },
  { name: "node + npm", purposeKey: "tools.lib.node" },
];

// Die Landkarte: Ziel uebersetzt, Datei-Pfade fest (Pfade uebersetzt man nicht).
// The map: goal translated, file paths fixed (paths are never translated).
const mapEntries = [
  { goalKey: "map.g1", files: "src/i18n/de.json + en.json" },
  { goalKey: "map.g2", files: "src/index.css (CSS-Variablen / CSS variables)" },
  { goalKey: "map.g3", files: "src/App.css" },
  { goalKey: "map.g4", files: "src/lessons/ + lessons.ts + beide JSONs / both JSONs" },
  { goalKey: "map.g5", files: "src/lessons/lessons.ts" },
  { goalKey: "map.g6", files: "src/i18n/ + LanguageContext.tsx + LanguageSwitcher.tsx" },
  { goalKey: "map.g7", files: "index.html" },
  { goalKey: "map.g8", files: "src/App.tsx" },
];

export function Lesson_ToolsAndMap() {
  const { t } = useLanguage();

  return (
    <div className="lesson-text">
      <h3>{t("tools.h")}</h3>
      <p>{t("tools.p1")}</p>

      {/* Tabelle 1: die Werkzeuge. / Table 1: the tools. */}
      <div className="table-scroll">
        <table>
          <thead>
            <tr>
              <th>{t("tools.spalte.name")}</th>
              <th>{t("tools.spalte.zweck")}</th>
            </tr>
          </thead>
          <tbody>
            {libraries.map((lib) => (
              <tr key={lib.name}>
                <td>
                  <code>{lib.name}</code>
                </td>
                <td>{t(lib.purposeKey)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Was beim Build tatsaechlich entsteht -- konkret, nicht abstrakt.
          What the build actually produces -- concrete, not abstract. */}
      <h4>{t("tools.build.h")}</h4>
      <p>{t("tools.build.p1")}</p>
      <p>{t("tools.build.p2")}</p>
      <pre className="code-block">{
`dist/
├─ index.html
└─ assets/
   ├─ index-B9f1Mm2N.css   (dein ganzes CSS, gebündelt)
   └─ index-edQvr5ws.js    (dein ganzer Code + React, gebündelt)`
      }</pre>
      <p>{t("tools.build.p3")}</p>
      <p className="merksatz">{t("tools.build.p4")}</p>

      <h4>{t("tools.nicht.h")}</h4>
      <p>{t("tools.nicht.p")}</p>

      {/* Tabelle 2: die Landkarte. / Table 2: the map. */}
      <h4>{t("map.h")}</h4>
      <p>{t("map.p1")}</p>
      <div className="table-scroll">
        <table>
          <thead>
            <tr>
              <th>{t("map.spalte.ziel")}</th>
              <th>{t("map.spalte.ort")}</th>
            </tr>
          </thead>
          <tbody>
            {mapEntries.map((entry) => (
              <tr key={entry.goalKey}>
                <td>{t(entry.goalKey)}</td>
                <td>
                  <code>{entry.files}</code>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
