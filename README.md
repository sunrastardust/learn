# React-Lernpfad / React Learning Path

🇩🇪 [Deutsche Version](#-deutsch) · 🇬🇧 [English version](#-english)

Ein zweisprachiges Lernprojekt fuer unser Team: **React von Grund auf lernen –
ohne Sprachbarrieren und ohne Angst, etwas kaputt zu machen.**

A bilingual learning project for our team: **learn React from scratch –
without language barriers and without fear of breaking anything.**

---

# 🇩🇪 Deutsch

Die App **ist** dein Tutorial. Sie zeigt einen Lernpfad aus Lektionen, durch
die du der Reihe nach klickst. Jede Lektion erklaert **ein** React-Konzept,
zeigt ein **lauffaehiges Live-Beispiel** und gibt dir (meist) eine kleine
**Aufgabe zum Selbst-Ausprobieren**. Oben rechts schaltest du die ganze
Oberflaeche zwischen **Deutsch und Englisch** um.

Gebaut mit **Vite + React + TypeScript**.

## Voraussetzungen

- [Node.js](https://nodejs.org/) (Version 18 oder neuer). Pruefen mit:
  ```bash
  node --version
  ```

## Starten

```bash
npm install   # einmalig: Pakete herunterladen
npm run dev    # Entwicklungs-Server starten
```

Danach die angezeigte Adresse (`http://localhost:5173/`) im Browser oeffnen.
Aenderst du eine Datei und speicherst, aktualisiert sich der Browser
automatisch (Hot Reload).

Weitere Befehle:

```bash
npm run build     # Produktions-Build erstellen (nach ./dist)
npm run preview   # den Build lokal ansehen
npm run lint      # Code auf Fehler pruefen
```

## Aus VS Code mit Debugger starten

1. Projektordner in VS Code oeffnen (`File > Open Folder...`).
2. Einmalig `npm install`, falls noch nicht geschehen.
3. **Run and Debug** oeffnen (`Strg`+`Umschalt`+`D`).
4. Im Dropdown **"Lernpfad im Chrome debuggen"** (oder Edge) waehlen.
5. **F5** druecken.

Erst startet der Dev-Server, dann oeffnet sich der Browser mit angehaengtem
Debugger. Breakpoints setzt du direkt in den `.tsx`-Dateien (links neben die
Zeilennummer klicken).

## Öffentlich hosten (GitHub Pages)

Die App ist eine rein statische Seite – der Live-Editor laeuft komplett im
Browser. Sie laesst sich darum gratis auf **GitHub Pages** veroeffentlichen;
Kollegen brauchen dann nur die URL (kein Node, kein Install). Der Quellcode
liegt im selben oeffentlichen Repo – wer tiefer einsteigen will, klont ihn.

Einmalige Einrichtung:

1. Auf GitHub ein **oeffentliches** Repo anlegen (hier: `learn`).
2. Lokal alles committen und pushen:
   ```bash
   git add -A
   git commit -m "React-Lernpfad"
   git remote add origin https://github.com/sunrastardust/learn.git
   git push -u origin master
   ```
3. Im Repo unter **Settings → Pages → Build and deployment → Source** den Wert
   **"GitHub Actions"** waehlen.

Fertig. Der mitgelieferte Workflow (`.github/workflows/deploy.yml`) baut bei
jedem Push automatisch und veroeffentlicht die App unter
**`https://sunrastardust.github.io/learn/`**. Kuenftige Aenderungen gehen
mit `git push` live.

> Die `base`-Einstellung in `vite.config.ts` sorgt fuer relative Pfade, damit
> die App unter dem Unterpfad `/learn/` laedt. Weil es (noch) keinen Router
> gibt, entfaellt das uebliche SPA-404-Problem.

## Spielwiese ohne Risiko

**Du kannst hier nichts dauerhaft kaputt machen.** Das Projekt ist ein
Git-Repository:

```bash
git restore .    # setzt ALLE Dateien auf den letzten sauberen Stand zurueck
```

Baust du beim Experimentieren einen Fehler ein, zeigt der Browser eine rote
Meldung (Vite-Error-Overlay). Das ist kein Absturz: Datei korrigieren,
speichern – die App laeuft sofort weiter. Zum Ueben gerne eine Lektions-Datei
kopieren und in der Kopie spielen.

Zusaetzlich enthalten die Basics-Lektionen (5–13) einen **Live-Editor**
(react-live) direkt in der App: Beispiel-Code aendern, Vorschau sofort sehen,
"Zuruecksetzen" stellt jederzeit den Anfang wieder her. Diese Sandbox
veraendert die echten Projekt-Dateien nie.

## Ordnerstruktur

```
react-lernpfad/
├─ .github/                # GitHub-Copilot-Agent-Setup (siehe Lektionen 15-18)
│  ├─ copilot-instructions.md   # Grundregeln, IMMER geladen -> kurz halten
│  ├─ instructions/        # Bereichs-Regeln, nur bei applyTo-Treffern geladen
│  ├─ agents/              # project (Router, guenstig) + ui / logic / docs
│  ├─ skills/              # Prozeduren auf Abruf: new-lesson, i18n-check
│  └─ prompts/             # Anfrage-Vorlagen: /new-lesson, /explain
├─ scripts/
│  └─ check-i18n.mjs       # Sprachdatei-Pruefung (npm run check:i18n)
├─ index.html              # Einstiegspunkt der Seite
└─ src/
   ├─ main.tsx             # startet React und haengt <App /> in die Seite
   ├─ App.tsx              # die HUELLE des Lernpfads (Liste + aktuelle Lektion)
   ├─ index.css            # globale Styles + Farb-Variablen (hell/dunkel)
   ├─ App.css              # Styles nur fuer den Lernpfad
   ├─ types/               # TypeScript-Typen
   │  └─ lesson.ts         #   der Typ `Lesson` (Bauplan einer Lektion)
   ├─ i18n/                # Mehrsprachigkeit
   │  ├─ de.json           #   alle deutschen Texte (Schluessel -> Text)
   │  ├─ en.json           #   dieselben Schluessel, englische Texte
   │  └─ LanguageContext.tsx #  Sprache + t()-Funktion fuer die ganze App
   ├─ components/          # kleine, wiederverwendbare Bausteine
   │  ├─ LessonList.tsx    #   die Liste links (mit Gruppen)
   │  ├─ Task.tsx          #   die "Aufgabe fuer dich"-Box
   │  └─ LanguageSwitcher.tsx # die DE/EN-Umschaltung oben rechts
   └─ lessons/             # eine Datei je Lektion + die Reihenfolge
      ├─ lessons.ts        #   das Array aller Lektionen (der Lernpfad)
      ├─ Lesson_ComponentsJSX.tsx, Lesson_Props.tsx, ...
      └─ Lesson_*.tsx      #   die uebrigen Lektions-Komponenten
```

Jede Datei beginnt mit einem Kommentar **"Was macht diese Datei?" – zuerst auf
Deutsch, direkt darunter auf Englisch.** Auch alle Erklaer-Kommentare im Code
sind zweisprachig. TypeScript-Besonderheiten werden an Ort und Stelle erklaert.

## Die Lektionen

1. **Einfuehrung** – was React ist, in einfachen Worten.
2. **React: Aufbau & Struktur** – Boot-Ablauf, Komponentenbaum, Datenfluss, die wichtigsten Funktionen.
3. **Ueber dieses Projekt** – Aufbau, Bedienung, Spielwiese.
4. **Werkzeuge & Projekt-Landkarte** – Bibliotheken + Zweck, und was man wo aendert.
5. **Komponenten & JSX** – die Bausteine jeder React-App.
6. **Props** – Werte an eine Komponente weitergeben (typisiert).
7. **State mit useState** – eine Komponente bekommt ein Gedaechtnis.
8. **Events & Eingaben** – ein Textfeld live mit State verbinden.
9. **Bedingtes Rendern** – etwas nur anzeigen, wenn eine Bedingung gilt.
10. **Listen & Keys** – aus einem Daten-Array eine Liste am Bildschirm.
11. **Gemeinsamer State** – State nach oben ziehen (Lifting State Up).
12. **useEffect** – Timer, Daten laden, Aufraeumen.
13. **Mehrsprachigkeit mit JSON** – wie die DE/EN-Umschaltung funktioniert (Context).
14. **Lernfahrplan** – was du fuer den Einstieg in ein echtes Projekt brauchst.

**Stufe 2: KI-Agenten & Copilot**

15. **KI-Agenten: Einfuehrung** – wie ein Agent-System grundsaetzlich funktioniert.
16. **Mechanismen im Vergleich** – Instructions, Skills oder Agent: wann nimmt man was?
17. **Agent-Setup: Simulator** – das Copilot-Setup dieses Repos interaktiv testen.
18. **Skripte, Hooks & MCP** – den Agenten effizienter (Tokens) und maechtiger machen.

## Mehrsprachigkeit (DE/EN)

Alle Texte stehen in zwei JSON-Dateien mit **denselben Schluesseln**:

```json
// de.json                     // en.json
"nav.weiter": "Weiter →"       "nav.weiter": "Next →"
```

Im Code fragt eine Komponente den Text ueber den Schluessel ab:

```tsx
const { t } = useSprache();
<button>{t("nav.weiter")}</button>   // zeigt "Weiter →" oder "Next →"
```

Die aktuelle Sprache liegt zentral im **Context**
(`src/i18n/SpracheContext.tsx`). Der Umschalter aendert diesen einen Wert –
und die ganze Seite rendert neu.

**Uebungen** (auch als Aufgabe in Lektion 13):

1. In `de.json` den Wert von `"app.untertitel"` aendern – speichern, Kopf der
   Seite beobachten.
2. In **beiden** Dateien denselben neuen Schluessel anlegen (z.B.
   `"app.fusszeile"`) und mit `t("app.fusszeile")` anzeigen.
3. Fuer Mutige: eine **dritte Sprache**. `de.json` nach `fr.json` kopieren,
   Werte uebersetzen, Sprache in `LanguageContext.tsx` (Typ `Language` +
   Objekt `dictionaries`) und im `LanguageSwitcher` ergaenzen.

> Faustregel: Jeder Schluessel muss in **allen** Sprachdateien existieren –
> sonst fehlt dort der Text (angezeigt wird dann der Schluessel selbst).

## Eine neue Lektion ergaenzen

1. Neue Datei in `src/lessons/` anlegen (bestehende Lektion kopieren).
2. Komponente exportieren (`export function Lesson_XYZ() { ... }`).
3. Texte (Titel, Kurzbeschreibung, Aufgabe) in **beiden** Sprachdateien als
   Schluessel anlegen.
4. In `src/lessons/lessons.ts` importieren und mit `id`, `titleKey`,
   `summaryKey`, optional `taskKey`, `groupKey` und `Content` eintragen.

Liste, Navigation und Fortschritt passen sich automatisch an.

## Namenskonventionen

Alle Bezeichner (Dateinamen, Komponenten, Funktionen, Variablen, CSS-Klassen)
sind **Englisch** – wie in den meisten echten Projekten. Das deutsche
Verstaendnis liefern die **zweisprachigen Kommentare** (Deutsch zuerst,
Englisch darunter) und die umschaltbare Oberflaeche. Die i18n-**Schluessel**
(z.B. `lektion.props.titel`) sind Daten, kein Code – sie behalten ihre Namen,
damit bestehende Texte stabil bleiben.

## GitHub Copilot: Agent-Setup (Demo)

Dieses Repo enthaelt unter `.github/` ein beispielhaftes Copilot-Setup nach
dem Prinzip **"so wenig Kontext wie moeglich, so viel wie noetig"**:

| Mechanismus | Datei(en) | Wann geladen? |
| --- | --- | --- |
| Immer-Instruktionen | `copilot-instructions.md` | bei JEDEM Auftrag → nur eiserne Grundregeln |
| applyTo-Instruktionen | `instructions/*.instructions.md` | nur wenn passende Dateien angefasst werden |
| Agents | `agents/*.agent.md` | `project` = guenstiger Router (Haiku), delegiert an `ui`/`logic` (Sonnet) oder `docs` (Haiku) |
| Skills | `skills/*/SKILL.md` | Prozedur-Wissen auf Abruf (`new-lesson`, `i18n-check`) |
| Prompts | `prompts/*.prompt.md` | gespeicherte Anfrage-Vorlagen, im Chat per `/name` (`/new-lesson`, `/explain`) |
| Hooks | `.github/hooks/hooks.json` (Copilot preToolUse-Guard) · `agents/logic.agent.md` (Copilot postToolUse) · `.githooks/pre-commit` (git-Hook) | laufen automatisch rund um Werkzeuge bzw. Commits (siehe Lektion 18) |

Die Copilot-Hooks (`.github/hooks/`, `agents/*.agent.md`) sind in VS Code
aktuell ein Preview-Feature. Den git-Hook einmalig aktivieren:
`git config core.hooksPath .githooks` (unter macOS/Linux ggf.
`chmod +x .githooks/pre-commit`).

Benutzung: In VS Code den Copilot-Chat oeffnen, Agent **project** waehlen und
eine Aufgabe stellen – der Router delegiert an den passenden Spezialisten.
Spezialisten lassen sich auch jederzeit direkt waehlen; ohne gewaehlten Agent
gilt das Modell aus dem Model-Picker.
Erklaerung, Mechanismen-Vergleich und interaktiver Simulator:
**Lektionen 15–18** in der App.
Hinweis: Die `.github`-Dateien sind bewusst einsprachig (englisch) und knapp –
sie kosten bei jedem Auftrag Tokens; die zweisprachige Doku steht hier.

## Naechste Schritte (Stufe 3)

Siehe Lektion 14 (**Lernfahrplan**) in der App – dort steht, was ihr schon
koennt, was als Naechstes kommt (useEffect, eigene Hooks, Router, Datenladen,
Formulare, State-Management) und was im Projektalltag wichtig ist (Tooling,
React DevTools, fremden Code lesen, Git, Tests). Beste Vertiefung:
[react.dev/learn](https://react.dev/learn).

---

# 🇬🇧 English

The app **is** your tutorial. It shows a learning path of lessons you click
through in order. Each lesson explains **one** React concept, shows a
**runnable live example** and (usually) gives you a small **task to try
yourself**. In the top right you switch the whole UI between **German and
English**.

Built with **Vite + React + TypeScript**.

## Prerequisites

- [Node.js](https://nodejs.org/) (version 18 or newer). Check with:
  ```bash
  node --version
  ```

## Getting started

```bash
npm install   # once: download packages
npm run dev    # start the development server
```

Then open the shown address (`http://localhost:5173/`) in your browser. When
you change a file and save, the browser refreshes automatically (hot reload).

More commands:

```bash
npm run build     # create a production build (into ./dist)
npm run preview   # view the build locally
npm run lint      # check the code for problems
```

## Debugging from VS Code

1. Open the project folder in VS Code (`File > Open Folder...`).
2. Run `npm install` once if you haven't.
3. Open **Run and Debug** (`Ctrl`+`Shift`+`D`).
4. Pick **"Lernpfad im Chrome debuggen / Debug in Chrome"** (or Edge).
5. Press **F5**.

The dev server starts first, then the browser opens with the debugger
attached. Set breakpoints directly in the `.tsx` files (click left of a line
number).

## Hosting it publicly (GitHub Pages)

The app is a purely static site – the live editor runs entirely in the
browser. So it can be published for free on **GitHub Pages**; colleagues then
only need the URL (no Node, no install). The source lives in the same public
repo – anyone who wants to dig deeper just clones it.

One-time setup:

1. Create a **public** repo on GitHub (here: `learn`).
2. Commit and push everything locally:
   ```bash
   git add -A
   git commit -m "React learning path"
   git remote add origin https://github.com/sunrastardust/learn.git
   git push -u origin master
   ```
3. In the repo under **Settings → Pages → Build and deployment → Source**,
   choose **"GitHub Actions"**.

Done. The included workflow (`.github/workflows/deploy.yml`) builds
automatically on every push and publishes the app at
**`https://sunrastardust.github.io/learn/`**. Future changes go live with
`git push`.

> The `base` setting in `vite.config.ts` produces relative paths so the app
> loads under the `/learn/` sub-path. Because there is no router (yet), the
> usual SPA 404 problem does not apply.

## A playground without risk

**You cannot permanently break anything here.** The project is a Git
repository:

```bash
git restore .    # resets ALL files to the last clean state
```

If you introduce an error while experimenting, the browser shows a red
message (Vite's error overlay). That is not a crash: fix the file, save – the
app immediately continues. For practice, copy a lesson file and play inside
the copy.

In addition, the basics lessons (5–13) contain a **live editor** (react-live)
right inside the app: change the example code, see the preview instantly, "Reset" restores
the start at any time. This sandbox never touches the real project files.

## Folder structure

```
react-lernpfad/
├─ .github/                # GitHub Copilot agent setup (see lessons 15-18)
│  ├─ copilot-instructions.md   # base rules, ALWAYS loaded -> keep short
│  ├─ instructions/        # area rules, loaded only on applyTo matches
│  ├─ agents/              # project (router, cheap) + ui / logic / docs
│  ├─ skills/              # procedures on demand: new-lesson, i18n-check
│  └─ prompts/             # request templates: /new-lesson, /explain
├─ scripts/
│  └─ check-i18n.mjs       # language-file check (npm run check:i18n)
├─ index.html              # entry point of the page
└─ src/
   ├─ main.tsx             # starts React and mounts <App /> into the page
   ├─ App.tsx              # the SHELL of the learning path (list + current lesson)
   ├─ index.css            # global styles + color variables (light/dark)
   ├─ App.css              # styles for the learning path only
   ├─ types/               # TypeScript types
   │  └─ lesson.ts         #   the `Lesson` type (blueprint of a lesson)
   ├─ i18n/                # multi-language support
   │  ├─ de.json           #   all German texts (key -> text)
   │  ├─ en.json           #   the same keys, English texts
   │  └─ LanguageContext.tsx # language + t() function for the whole app
   ├─ components/          # small, reusable building blocks
   │  ├─ LessonList.tsx    #   the list on the left (with groups)
   │  ├─ Task.tsx          #   the "your task" box
   │  └─ LanguageSwitcher.tsx # the DE/EN switch (top right)
   └─ lessons/             # one file per lesson + the order
      ├─ lessons.ts        #   the array of all lessons (the learning path)
      ├─ Lesson_ComponentsJSX.tsx, Lesson_Props.tsx, ...
      └─ Lesson_*.tsx      #   the remaining lesson components
```

Every file starts with a comment **"Was macht diese Datei?" – first in
German, English right below.** All explanatory comments in the code are
bilingual, too. TypeScript specifics are explained right where they appear.

## The lessons

1. **Introduction** – what React is, in simple words.
2. **React: structure & anatomy** – boot flow, component tree, data flow, the key functions.
3. **About this project** – structure, usage, playground.
4. **Tools & project map** – libraries + purpose, and what to change where.
5. **Components & JSX** – the building blocks of every React app.
6. **Props** – passing values into a component (typed).
7. **State with useState** – a component gets a memory.
8. **Events & input** – wiring a text field to state, live.
9. **Conditional rendering** – showing something only when a condition holds.
10. **Lists & keys** – a data array becomes a list on screen.
11. **Shared state** – lifting state up to the shared parent.
12. **useEffect** – timers, loading data, cleanup.
13. **Multi-language with JSON** – how the DE/EN switch works (context).
14. **Roadmap** – what you need to join a real project.

**Stage 2: AI agents & Copilot**

15. **AI agents: introduction** – how an agent system fundamentally works.
16. **Mechanisms compared** – instructions, skills or agent: when do you use which?
17. **Agent setup: simulator** – test this repo's Copilot setup interactively.
18. **Scripts, hooks & MCP** – make the agent more efficient (tokens) and more capable.

## Multi-language (DE/EN)

All texts live in two JSON files sharing the **same keys**:

```json
// de.json                     // en.json
"nav.weiter": "Weiter →"       "nav.weiter": "Next →"
```

In the code a component asks for a text by its key:

```tsx
const { t } = useSprache();
<button>{t("nav.weiter")}</button>   // shows "Weiter →" or "Next →"
```

The current language is stored centrally in a **context**
(`src/i18n/SpracheContext.tsx`). The switch changes that single value – and
the whole page re-renders.

**Exercises** (also the task of lesson 13):

1. Change the value of `"app.untertitel"` in `en.json` – save and watch the
   page header.
2. Add the same new key (e.g. `"app.fusszeile"`) to **both** files and show
   it with `t("app.fusszeile")`.
3. For the brave: a **third language**. Copy `de.json` to `fr.json`,
   translate the values, register the language in `LanguageContext.tsx`
   (type `Language` + object `dictionaries`) and in the `LanguageSwitcher`.

> Rule of thumb: every key must exist in **all** language files – otherwise
> the text is missing there (the key itself is shown instead).

## Adding a new lesson

1. Create a new file in `src/lessons/` (copy an existing lesson).
2. Export the component (`export function Lesson_XYZ() { ... }`).
3. Add the texts (title, short description, task) to **both** language files
   as keys.
4. Import it in `src/lessons/lessons.ts` and register it with `id`,
   `titleKey`, `summaryKey`, optionally `taskKey`, `groupKey`, and `Content`.

List, navigation and progress adapt automatically.

## Naming conventions

All identifiers (file names, components, functions, variables, CSS classes)
are **English** – just like in most real-world projects. German understanding
comes from the **bilingual comments** (German first, English below) and the
switchable UI. The i18n **keys** (e.g. `lektion.props.titel`) are data, not
code – they keep their original names so existing texts stay stable.

## GitHub Copilot: agent setup (demo)

Under `.github/` this repo contains an exemplary Copilot setup following the
principle **"as little context as possible, as much as needed"**:

| Mechanism | File(s) | When loaded? |
| --- | --- | --- |
| Always-on instructions | `copilot-instructions.md` | on EVERY request → iron base rules only |
| applyTo instructions | `instructions/*.instructions.md` | only when matching files are touched |
| Agents | `agents/*.agent.md` | `project` = cheap router (Haiku), delegates to `ui`/`logic` (Sonnet) or `docs` (Haiku) |
| Skills | `skills/*/SKILL.md` | procedural knowledge on demand (`new-lesson`, `i18n-check`) |
| Prompts | `prompts/*.prompt.md` | saved request templates, invoked in chat via `/name` (`/new-lesson`, `/explain`) |
| Hooks | `.github/hooks/hooks.json` (Copilot preToolUse guard) · `agents/logic.agent.md` (Copilot postToolUse) · `.githooks/pre-commit` (git hook) | run automatically around tools resp. commits (see lesson 18) |

The Copilot hooks (`.github/hooks/`, `agents/*.agent.md`) are currently a
preview feature in VS Code. Activate the git hook once:
`git config core.hooksPath .githooks` (on macOS/Linux maybe
`chmod +x .githooks/pre-commit`).

Usage: open Copilot Chat in VS Code, pick the **project** agent and give it a
task – the router delegates to the right specialist. You can also pick a
specialist directly at any time; with no agent selected, the model from the
model picker applies. Explanation and an
interactive simulator: **lessons 15–18** in the app. Note: the `.github`
files are deliberately single-language (English) and terse – they cost tokens
on every request; the bilingual docs live here.

## Next steps (stage 3)

See lesson 14 (**Roadmap**) in the app – it lists what you already learn here,
what comes next (useEffect, custom hooks, router, data fetching, forms, state
management) and what matters in day-to-day project work (tooling, React
DevTools, reading unfamiliar code, Git, tests). Best place to go deeper:
[react.dev/learn](https://react.dev/learn).
