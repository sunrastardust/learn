// Was macht diese Datei?
// Die Lektion "KI-Agenten: Einfuehrung": Sie erklaert, was ein Agent ist,
// warum Kontext (Tokens) das knappe Gut ist und welche fuenf Mechanismen ein
// gutes Setup nutzt. Ausserdem: Was passiert, wenn man GAR KEINEN eigenen
// Agent waehlt -- die eingebauten Modi (Ask / Agent / Plan) im Vergleich zu
// einem eigenen Agent, samt Kosten. Die Praxis zeigt der Simulator (Lekt. 17).
//
// What does this file do?
// The "AI agents: introduction" lesson: it explains what an agent is, why
// context (tokens) is scarce and which five mechanisms a good setup uses.
// Also: what happens if you pick NO custom agent at all -- the built-in modes
// (ask / agent / plan) compared to a custom agent, including cost. The
// simulator (lesson 18) shows it in practice.

import { useLanguage } from "../i18n/LanguageContext";
import { AgentOrgChart } from "../components/AgentOrgChart";

// Die eingebauten Modi + der eigene Agent als Tabellen-Daten. Namen fest,
// die Beschreibungen kommen uebersetzt aus den JSON-Dateien.
// The built-in modes + the custom agent as table data. Names fixed, the
// descriptions come translated from the JSON files.
const modes = [
  { name: "Ask", tut: "modi.ask.tut", tools: "modi.ask.werk", model: "modi.ask.mod", cost: "modi.ask.kost" },
  { name: "Agent", tut: "modi.agent.tut", tools: "modi.agent.werk", model: "modi.agent.mod", cost: "modi.agent.kost" },
  { name: "Plan", tut: "modi.plan.tut", tools: "modi.plan.werk", model: "modi.plan.mod", cost: "modi.plan.kost" },
  { name: "modi.custom.name", tut: "modi.custom.tut", tools: "modi.custom.werk", model: "modi.custom.mod", cost: "modi.custom.kost" },
];

export function Lesson_AgentsIntro() {
  const { t } = useLanguage();

  return (
    <div className="lesson-text">
      <h3>{t("agi.h")}</h3>
      <p>{t("agi.p1")}</p>
      {/* Ein konkretes Beispiel macht die abstrakte Schleife greifbar.
          A concrete example makes the abstract loop tangible. */}
      <p>{t("agi.beispiel")}</p>
      <p>{t("agi.p2")}</p>
      <p>{t("agi.p3")}</p>

      {/* Das Organigramm macht das "Team" sofort sichtbar -- die Mechanismen
          darunter erklaeren dann die einzelnen Bausteine.
          The org chart makes the "team" visible at once -- the mechanisms
          below then explain the individual building blocks. */}
      <h4>{t("org.h")}</h4>
      <p>{t("org.p")}</p>
      <AgentOrgChart />

      <p>{t("agi.p4")}</p>
      {/* Die fuenf Mechanismen als Liste -- wieder .map() ueber Daten.
          The five mechanisms as a list -- .map() over data again. */}
      <ul>
        {["agi.m1", "agi.m2", "agi.m3", "agi.m4", "agi.m5"].map((key) => (
          <li key={key}>{t(key)}</li>
        ))}
      </ul>

      {/* Vorwaerts-Verweis: Hooks sind ein weiterer Baustein, aber eine
          andere Kategorie (Automatisierung statt Kontext) -- Lektion 19.
          Forward reference: hooks are another building block, but a different
          category (automation instead of context) -- lesson 19. */}
      <p>{t("agi.hooks")}</p>

      <p>
        <strong>{t("agi.merksatz")}</strong>
      </p>

      {/* --- Eingebaute Modi vs. eigener Agent ----------------------------
          Antwort auf: Was, wenn ich GAR KEINEN eigenen Agent waehle?
          Answer to: what if I pick NO custom agent at all? */}
      <h4>{t("modi.h")}</h4>
      <p>{t("modi.p1")}</p>
      <div className="table-scroll">
        <table>
          <thead>
            <tr>
              <th>{t("modi.sp.name")}</th>
              <th>{t("modi.sp.tut")}</th>
              <th>{t("modi.sp.werk")}</th>
              <th>{t("modi.sp.mod")}</th>
              <th>{t("modi.sp.kost")}</th>
            </tr>
          </thead>
          <tbody>
            {modes.map((m) => (
              <tr key={m.name}>
                {/* Der eigene Agent hat einen uebersetzten Namen, die
                    eingebauten Modi heissen ueberall gleich.
                    The custom agent has a translated name, the built-in modes
                    are named the same everywhere. */}
                <td>
                  <strong>{m.name.startsWith("modi.") ? t(m.name) : m.name}</strong>
                </td>
                <td>{t(m.tut)}</td>
                <td>{t(m.tools)}</td>
                <td>{t(m.model)}</td>
                <td>{t(m.cost)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p>{t("modi.p2")}</p>

      {/* Der Mehrwert fuer Fortgeschrittene: dasselbe Muster gilt in allen
          Agent-Werkzeugen. / The value for advanced readers: the same
          pattern applies in all agent tools. */}
      <p>{t("agi.transfer")}</p>
      <p>{t("agi.sprache")}</p>
    </div>
  );
}
