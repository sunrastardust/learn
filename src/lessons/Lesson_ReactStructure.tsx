// Was macht diese Datei?
// Die Lektion "React: Aufbau & Struktur": Wie eine React-App startet
// (index.html -> main.tsx -> App), wie daraus ein Komponenten-BAUM waechst,
// wie die Daten fliessen (Props runter, Events rauf) und welche Funktionen/
// Konzepte man kennen muss. Als Beispiel dient der Baum DIESER App.
//
// What does this file do?
// The "React: structure" lesson: how a React app boots (index.html ->
// main.tsx -> App), how a component TREE grows from it, how data flows
// (props down, events up) and which functions/concepts you need to know.
// The tree of THIS very app serves as the example.

import { useLanguage } from "../i18n/LanguageContext";

// Die Schluessel der wichtigsten Funktionen/Konzepte -- als Daten-Array,
// aus dem unten per .map() die Liste entsteht.
// The keys of the most important functions/concepts -- as a data array
// turned into the list below via .map().
const conceptKeys = [
  "struct.f1",
  "struct.f2",
  "struct.f3",
  "struct.f4",
  "struct.f5",
  "struct.f6",
  "struct.f7",
];

export function Lesson_ReactStructure() {
  const { t } = useLanguage();

  return (
    <div className="lesson-text">
      <h3>{t("struct.h")}</h3>
      <p>{t("struct.p1")}</p>
      <p>{t("struct.p2")}</p>
      <p>{t("struct.p3")}</p>
      <p>{t("struct.p4")}</p>

      {/* Der Komponenten-Baum dieser App -- verschachtelte Listen zeigen die
          Hierarchie. / This app's component tree -- nested lists show the
          hierarchy. */}
      <h4>{t("struct.baum.h")}</h4>
      <p>{t("struct.baum.hinweis")}</p>
      <ul>
        <li>
          <code>main.tsx</code> → <code>App</code> – {t("struct.t.app")}
          <ul>
            <li>
              <code>LanguageSwitcher</code> – {t("struct.t.switcher")}
            </li>
            <li>
              <code>LessonList</code> – {t("struct.t.list")}
            </li>
            <li>
              <code>Lesson_*</code> – {t("struct.t.content")}
              <ul>
                <li>
                  <code>Task</code> – {t("struct.t.task")}
                </li>
              </ul>
            </li>
          </ul>
        </li>
      </ul>

      <h4>{t("struct.funcs.h")}</h4>
      <ul>
        {conceptKeys.map((key) => (
          <li key={key}>{t(key)}</li>
        ))}
      </ul>
    </div>
  );
}
