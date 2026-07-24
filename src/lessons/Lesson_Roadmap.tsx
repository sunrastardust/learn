// Was macht diese Datei?
// Die Lektion "Lernfahrplan": Sie zeigt, was man braucht, um in ein
// BESTEHENDES React-Projekt einzusteigen -- in drei Gruppen: (1) was dieser
// Lernpfad schon abdeckt, (2) was als Naechstes kommt, (3) was im
// Projektalltag zusaetzlich wichtig ist.
//
// What does this file do?
// The "Roadmap" lesson: it shows what you need to join an EXISTING React
// project -- in three groups: (1) what this learning path already covers,
// (2) what comes next, (3) what additionally matters in day-to-day work.

import { useLanguage } from "../i18n/LanguageContext";

// Die Schluessel der Listenpunkte je Gruppe. Aus diesen Arrays erzeugen wir
// unten mit .map() die Listen -- genau die Technik aus road.g1.i4!
// The keys of the list items per group. From these arrays we generate the
// lists below with .map() -- exactly the technique from road.g1.i4!
const groups = [
  { titleKey: "road.g1.h", items: ["road.g1.i1", "road.g1.i2", "road.g1.i3", "road.g1.i4", "road.g1.i5", "road.g1.i6", "road.g1.i7", "road.g1.i8"] },
  { titleKey: "road.g2.h", items: ["road.g2.i1", "road.g2.i2", "road.g2.i3", "road.g2.i4", "road.g2.i5", "road.g2.i6"] },
  { titleKey: "road.g3.h", items: ["road.g3.i1", "road.g3.i2", "road.g3.i3", "road.g3.i4", "road.g3.i5", "road.g3.i6"] },
];

export function Lesson_Roadmap() {
  const { t } = useLanguage();

  return (
    <div className="lesson-text">
      <h3>{t("road.h")}</h3>
      <p>{t("road.p1")}</p>
      <p>{t("road.p2")}</p>

      {/* Aussen .map() ueber die Gruppen, innen .map() ueber die Punkte --
          verschachtelte Listen aus Daten. `key` nicht vergessen!
          Outer .map() over the groups, inner .map() over the items --
          nested lists built from data. Don't forget `key`! */}
      {groups.map((group) => (
        <div key={group.titleKey}>
          <h4>{t(group.titleKey)}</h4>
          <ul>
            {group.items.map((itemKey) => (
              <li key={itemKey}>{t(itemKey)}</li>
            ))}
          </ul>
        </div>
      ))}

      {/* Ein normaler Link -- oeffnet die offizielle React-Doku in neuem Tab.
          A normal link -- opens the official React docs in a new tab. */}
      <p>
        {t("road.doku")}{" "}
        <a href="https://react.dev/learn" target="_blank" rel="noreferrer">
          react.dev/learn
        </a>
      </p>
    </div>
  );
}
