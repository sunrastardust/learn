// Was macht diese Datei?
// Die Lektion "Konfigurationsdateien & .env": Sie erklaert die Steuerdateien
// im Projektwurzel-Ordner (package.json, tsconfig, vite.config, ...) und das
// Thema Umgebungsvariablen -- besonders .env.local (lokal, geheim) und
// .env.example (Vorlage im Repo). Alle Texte kommen ueber t().
//
// What does this file do?
// The "Config files & .env" lesson: it explains the control files in the
// project root (package.json, tsconfig, vite.config, ...) and the topic of
// environment variables -- especially .env.local (local, secret) and
// .env.example (a template in the repo). All texts come via t().

import { useLanguage } from "../i18n/LanguageContext";

// Die Konfigurationsdateien als Tabellen-Daten. Der Dateiname ist ein
// Eigenname (fest), der Zweck wird uebersetzt.
// The config files as table data. The file name is a proper noun (fixed),
// the purpose is translated.
const files = [
  { name: "package.json", purposeKey: "cfg.f.pkg" },
  { name: "package-lock.json", purposeKey: "cfg.f.lock" },
  { name: "tsconfig*.json", purposeKey: "cfg.f.tsconfig" },
  { name: "vite.config.ts", purposeKey: "cfg.f.vite" },
  { name: ".oxlintrc.json", purposeKey: "cfg.f.oxlint" },
  { name: "index.html", purposeKey: "cfg.f.html" },
  { name: ".gitignore", purposeKey: "cfg.f.gitignore" },
];

export function Lesson_ConfigFiles() {
  const { t } = useLanguage();

  return (
    <div className="lesson-text">
      <h3>{t("cfg.h")}</h3>
      <p>{t("cfg.p1")}</p>

      <div className="table-scroll">
        <table>
          <thead>
            <tr>
              <th>{t("cfg.tab.datei")}</th>
              <th>{t("cfg.tab.wofuer")}</th>
            </tr>
          </thead>
          <tbody>
            {files.map((file) => (
              <tr key={file.name}>
                <td>
                  <code>{file.name}</code>
                </td>
                <td>{t(file.purposeKey)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* --- Umgebungsvariablen & .env / environment variables & .env ----- */}
      <h4>{t("cfg.env.h")}</h4>
      <p>{t("cfg.env.p1")}</p>
      <p>{t("cfg.env.p2")}</p>
      <p>{t("cfg.env.p3")}</p>

      {/* Der wichtigste Warnhinweis -- hervorgehoben als Merksatz.
          The most important warning -- highlighted as a mnemonic. */}
      <p className="merksatz">{t("cfg.env.p4")}</p>

      <p>{t("cfg.env.p5")}</p>
    </div>
  );
}
