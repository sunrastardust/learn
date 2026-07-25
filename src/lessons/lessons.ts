// Was macht diese Datei?
// Hier steht die LISTE aller Lektionen -- die Reihenfolge des Lernpfads.
// Sie ist bewusst von den Komponenten getrennt: Willst du spaeter eine neue
// Lektion ergaenzen, baust du eine neue Datei in src/lessons/ und traegst
// sie hier einmal ins Array ein. Sonst musst du nichts anfassen.
// Titel, Beschreibung, Aufgabe und Gruppe stehen hier nur als SCHLUESSEL --
// die echten Texte liegen in src/i18n/de.json und en.json.
//
// What does this file do?
// This holds the LIST of all lessons -- the order of the learning path.
// It is deliberately kept separate from the components: to add a new lesson
// later, create a new file in src/lessons/ and register it here once in the
// array. You don't have to touch anything else.
// Title, description, task and group are stored here only as KEYS -- the
// actual texts live in src/i18n/de.json and en.json.

import type { Lesson } from "../types/lesson";
import { Lesson_Introduction } from "./Lesson_Introduction";
import { Lesson_ReactStructure } from "./Lesson_ReactStructure";
import { Lesson_AboutThisProject } from "./Lesson_AboutThisProject";
import { Lesson_ToolsAndMap } from "./Lesson_ToolsAndMap";
import { Lesson_ComponentsJSX } from "./Lesson_ComponentsJSX";
import { Lesson_Props } from "./Lesson_Props";
import { Lesson_State } from "./Lesson_State";
import { Lesson_Events } from "./Lesson_Events";
import { Lesson_ConditionalRendering } from "./Lesson_ConditionalRendering";
import { Lesson_ListsKeys } from "./Lesson_ListsKeys";
import { Lesson_SharedState } from "./Lesson_SharedState";
import { Lesson_UseEffect } from "./Lesson_UseEffect";
import { Lesson_MultiLanguage } from "./Lesson_MultiLanguage";
import { Lesson_ConfigFiles } from "./Lesson_ConfigFiles";
import { Lesson_Roadmap } from "./Lesson_Roadmap";
import { Lesson_AgentsIntro } from "./Lesson_AgentsIntro";
import { Lesson_Mechanisms } from "./Lesson_Mechanisms";
import { Lesson_AgentSimulator } from "./Lesson_AgentSimulator";
import { Lesson_ScriptsHooksMCP } from "./Lesson_ScriptsHooksMCP";

// `: Lesson[]` sagt TypeScript: ein Array aus Lesson-Objekten. Fehlt ein
// Pflicht-Feld, gibt es sofort einen Fehler.
// `: Lesson[]` tells TypeScript: an array of Lesson objects. If a required
// field is missing, you get an error immediately.
export const lessons: Lesson[] = [
  {
    id: 1,
    titleKey: "lektion.einfuehrung.titel",
    summaryKey: "lektion.einfuehrung.kurz",
    taskKey: "lektion.einfuehrung.aufgabe",
    groupKey: "gruppe.react",
    Content: Lesson_Introduction,
  },
  {
    id: 2,
    titleKey: "lektion.struktur.titel",
    summaryKey: "lektion.struktur.kurz",
    taskKey: "lektion.struktur.aufgabe",
    groupKey: "gruppe.react",
    Content: Lesson_ReactStructure,
  },
  {
    id: 3,
    titleKey: "lektion.projekt.titel",
    summaryKey: "lektion.projekt.kurz",
    // Kein taskKey: Diese Uebersichts-Lektion hat bewusst keine Aufgabe.
    // No taskKey: this overview lesson deliberately has no task.
    groupKey: "gruppe.react",
    Content: Lesson_AboutThisProject,
  },
  {
    id: 4,
    titleKey: "lektion.werkzeuge.titel",
    summaryKey: "lektion.werkzeuge.kurz",
    taskKey: "lektion.werkzeuge.aufgabe",
    groupKey: "gruppe.react",
    Content: Lesson_ToolsAndMap,
  },
  {
    id: 5,
    titleKey: "lektion.komponenten.titel",
    summaryKey: "lektion.komponenten.kurz",
    taskKey: "lektion.komponenten.aufgabe",
    groupKey: "gruppe.react",
    Content: Lesson_ComponentsJSX,
  },
  {
    id: 6,
    titleKey: "lektion.props.titel",
    summaryKey: "lektion.props.kurz",
    taskKey: "lektion.props.aufgabe",
    groupKey: "gruppe.react",
    Content: Lesson_Props,
  },
  {
    id: 7,
    titleKey: "lektion.state.titel",
    summaryKey: "lektion.state.kurz",
    taskKey: "lektion.state.aufgabe",
    groupKey: "gruppe.react",
    Content: Lesson_State,
  },
  {
    id: 8,
    titleKey: "lektion.events.titel",
    summaryKey: "lektion.events.kurz",
    taskKey: "lektion.events.aufgabe",
    groupKey: "gruppe.react",
    Content: Lesson_Events,
  },
  {
    id: 9,
    titleKey: "lektion.bedingt.titel",
    summaryKey: "lektion.bedingt.kurz",
    taskKey: "lektion.bedingt.aufgabe",
    groupKey: "gruppe.react",
    Content: Lesson_ConditionalRendering,
  },
  {
    id: 10,
    titleKey: "lektion.listen.titel",
    summaryKey: "lektion.listen.kurz",
    taskKey: "lektion.listen.aufgabe",
    groupKey: "gruppe.react",
    Content: Lesson_ListsKeys,
  },
  {
    id: 11,
    titleKey: "lektion.gemeinsam.titel",
    summaryKey: "lektion.gemeinsam.kurz",
    taskKey: "lektion.gemeinsam.aufgabe",
    groupKey: "gruppe.react",
    Content: Lesson_SharedState,
  },
  {
    id: 12,
    titleKey: "lektion.effekt.titel",
    summaryKey: "lektion.effekt.kurz",
    taskKey: "lektion.effekt.aufgabe",
    groupKey: "gruppe.react",
    Content: Lesson_UseEffect,
  },
  {
    id: 13,
    titleKey: "lektion.i18n.titel",
    summaryKey: "lektion.i18n.kurz",
    taskKey: "lektion.i18n.aufgabe",
    groupKey: "gruppe.react",
    Content: Lesson_MultiLanguage,
  },
  {
    id: 14,
    titleKey: "lektion.config.titel",
    summaryKey: "lektion.config.kurz",
    taskKey: "lektion.config.aufgabe",
    groupKey: "gruppe.react",
    Content: Lesson_ConfigFiles,
  },
  {
    id: 15,
    titleKey: "lektion.roadmap.titel",
    summaryKey: "lektion.roadmap.kurz",
    taskKey: "lektion.roadmap.aufgabe",
    groupKey: "gruppe.react",
    Content: Lesson_Roadmap,
  },
  {
    id: 16,
    titleKey: "lektion.agintro.titel",
    summaryKey: "lektion.agintro.kurz",
    taskKey: "lektion.agintro.aufgabe",
    groupKey: "gruppe.agenten",
    Content: Lesson_AgentsIntro,
  },
  {
    id: 17,
    titleKey: "lektion.mechanismen.titel",
    summaryKey: "lektion.mechanismen.kurz",
    taskKey: "lektion.mechanismen.aufgabe",
    groupKey: "gruppe.agenten",
    Content: Lesson_Mechanisms,
  },
  {
    id: 18,
    titleKey: "lektion.agsim.titel",
    summaryKey: "lektion.agsim.kurz",
    taskKey: "lektion.agsim.aufgabe",
    groupKey: "gruppe.agenten",
    Content: Lesson_AgentSimulator,
  },
  {
    id: 19,
    titleKey: "lektion.shm.titel",
    summaryKey: "lektion.shm.kurz",
    taskKey: "lektion.shm.aufgabe",
    groupKey: "gruppe.agenten",
    Content: Lesson_ScriptsHooksMCP,
  },
];
