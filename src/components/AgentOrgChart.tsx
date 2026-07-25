// Was macht diese Datei?
// Das Organigramm des Agent-Setups als SVG-Grafik: oben die immer geladenen
// Grundregeln, in der Mitte die Hierarchie (Anfrage -> Router -> drei
// Spezialisten), unten je Agent der Kontext, der automatisch dazukommt.
// Alle Beschriftungen kommen ueber t(), die Farben aus den CSS-Variablen --
// so passt die Grafik zu Sprache UND hellem/dunklem Modus.
//
// What does this file do?
// The agent setup's org chart as an SVG graphic: the always-loaded base rules
// on top, the hierarchy in the middle (request -> router -> three
// specialists), and per agent below the context that is added automatically.
// All labels come via t(), the colours from the CSS variables -- so the
// graphic follows both the language AND light/dark mode.

import { useLanguage } from "../i18n/LanguageContext";

export function AgentOrgChart() {
  const { t } = useLanguage();

  // Die drei Spezialisten als Daten -- daraus entstehen unten mit .map()
  // sowohl die Agenten-Kaesten als auch die Kontext-Kaesten darunter.
  // The three specialists as data -- .map() below turns them into both the
  // agent boxes and the context boxes underneath.
  const agents = [
    { x: 60, name: "ui", subKey: "org.ui.sub", rules: "styles.instructions", skills: null },
    { x: 255, name: "logic", subKey: "org.logic.sub", rules: "lessons, i18n", skills: "new-lesson, i18n-check" },
    { x: 450, name: "docs", subKey: "org.docs.sub", rules: null, skills: null },
  ];

  return (
    <svg className="orgchart" viewBox="0 0 680 498" role="img" xmlns="http://www.w3.org/2000/svg">
      {/* title und desc machen die Grafik fuer Screenreader verstaendlich.
          title and desc make the graphic understandable for screen readers. */}
      <title>{t("org.a11y.titel")}</title>
      <desc>{t("org.a11y.desc")}</desc>

      {/* Die Pfeilspitze wird einmal definiert und unten mehrfach benutzt.
          The arrow head is defined once and reused several times below. */}
      <defs>
        <marker id="org-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M2 1L8 5L2 9" fill="none" stroke="context-stroke" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </marker>
      </defs>

      {/* Band oben: gilt fuer alles / top band: applies to everything */}
      <rect className="org-box-n" x="40" y="36" width="600" height="42" rx="4" />
      <text className="org-t" x="56" y="56">copilot-instructions.md</text>
      <text className="org-s" x="56" y="72">{t("org.immer")}</text>

      {/* Zweiter Eingang: die Prompt-Vorlagen / second entrance: prompt templates */}
      <rect className="org-box-n" x="40" y="100" width="180" height="64" rx="4" />
      <text className="org-t" x="56" y="122">{t("org.prompts")}</text>
      <text className="org-s" x="56" y="140">/new-lesson → logic</text>
      <text className="org-s" x="56" y="156">/explain → ask</text>

      {/* Der normale Eingang / the normal entrance */}
      <rect className="org-box-n" x="250" y="104" width="180" height="44" rx="4" />
      <text className="org-t" x="340" y="131" textAnchor="middle">{t("org.anfrage")}</text>
      <line className="org-arr" x1="340" y1="148" x2="340" y2="176" markerEnd="url(#org-arrow)" />

      {/* Der Router / the router */}
      <rect className="org-box-a" x="230" y="178" width="220" height="60" rx="4" />
      <text className="org-t" x="340" y="202" textAnchor="middle">project — Router</text>
      <text className="org-s" x="340" y="222" textAnchor="middle">{t("org.router.sub")}</text>

      {/* Faecher: der Router delegiert an die drei Spezialisten.
          Fan-out: the router delegates to the three specialists. */}
      <line className="org-arr" x1="340" y1="238" x2="150" y2="276" markerEnd="url(#org-arrow)" />
      <line className="org-arr" x1="340" y1="238" x2="340" y2="276" markerEnd="url(#org-arrow)" />
      <line className="org-arr" x1="340" y1="238" x2="530" y2="276" markerEnd="url(#org-arrow)" />

      {/* Die Spezialisten und ihr jeweiliger Zusatz-Kontext.
          The specialists and their respective extra context. */}
      {agents.map((agent) => (
        <g key={agent.name}>
          <rect className="org-box-a" x={agent.x} y="278" width="170" height="62" rx="4" />
          <text className="org-t" x={agent.x + 85} y="302" textAnchor="middle">{agent.name}</text>
          <text className="org-s" x={agent.x + 85} y="322" textAnchor="middle">{t(agent.subKey)}</text>

          <line className="org-arr" x1={agent.x + 85} y1="340" x2={agent.x + 85} y2="364" markerEnd="url(#org-arrow)" />

          <rect className="org-box-n" x={agent.x} y="366" width="170" height="88" rx="4" />
          <text className="org-s" x={agent.x + 16} y="388">{t("org.regeln")}</text>
          <text className="org-s" x={agent.x + 16} y="406">{agent.rules ?? t("org.keine")}</text>
          <text className="org-s" x={agent.x + 16} y="430">Skills:</text>
          <text className="org-s" x={agent.x + 16} y="448">{agent.skills ?? t("org.keine")}</text>
        </g>
      ))}

      <text className="org-s" x="40" y="478">{t("org.legende")}</text>
    </svg>
  );
}
