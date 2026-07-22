# React-Lernpfad

Ein kleines Lernprojekt, um **React von Grund auf** selbst auszuprobieren.
Das Besondere: Die App **ist** dein Tutorial. Sie zeigt einen Lernpfad aus
mehreren Lektionen, durch die du der Reihe nach klickst. Jede Lektion

- erklaert **ein** React-Konzept kurz,
- zeigt ein **lauffaehiges Live-Beispiel**,
- und gibt dir eine kleine **Aufgabe zum Selbst-Ausprobieren**.

Gebaut mit **Vite + React + TypeScript**.

---

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

Danach zeigt das Terminal eine Adresse wie `http://localhost:5173/`.
Diese im Browser oeffnen -- fertig. Aenderst du eine Datei und speicherst,
aktualisiert sich der Browser automatisch (Hot Reload).

Weitere Befehle:

```bash
npm run build     # Produktions-Build erstellen (nach ./dist)
npm run preview   # den Build lokal ansehen
npm run lint      # Code auf Fehler pruefen
```

---

## Ordnerstruktur

```
react-lernpfad/
├─ index.html              # Einstiegspunkt der Seite
└─ src/
   ├─ main.tsx             # startet React und haengt <App /> in die Seite
   ├─ App.tsx              # die HUELLE des Lernpfads (Liste + aktuelle Lektion)
   ├─ index.css            # globale Styles + Farb-Variablen (hell/dunkel)
   ├─ App.css              # Styles nur fuer den Lernpfad
   ├─ typen/               # TypeScript-Typen
   │  └─ lektion.ts        #   der Typ `Lektion` (Bauplan einer Lektion)
   ├─ komponenten/         # kleine, wiederverwendbare Bausteine
   │  ├─ LektionsListe.tsx #   die Liste links
   │  └─ Aufgabe.tsx       #   die "Aufgabe fuer dich"-Box
   └─ lektionen/           # eine Datei je Lektion + die Reihenfolge
      ├─ lektionen.ts      #   das Array aller Lektionen (der Lernpfad)
      ├─ Lektion1_KomponentenJSX.tsx
      ├─ Lektion2_Props.tsx
      ├─ Lektion3_State.tsx
      └─ Lektion4_Events.tsx
```

Jede Datei beginnt mit einem kurzen deutschen Kommentar "Was macht diese
Datei?", damit du dich schnell zurechtfindest. TypeScript-Besonderheiten
(Typen, Props-Typisierung) sind direkt an Ort und Stelle erklaert.

---

## Wie der Lernpfad gedacht ist

- **Links** siehst du alle Lektionen. Die aktuelle ist hervorgehoben.
- **Rechts** laeuft die gewaehlte Lektion: Erklaerung, Live-Beispiel, Aufgabe.
- Mit **Zurueck / Weiter** navigierst du durch die Reihe.
- Das Umschalten passiert bewusst nur ueber `useState` -- **noch kein Router**.
  Das kommt spaeter (siehe "Naechste Schritte").

**Empfehlung:** Arbeite die Lektionen der Reihe nach durch und mach jeweils
die Aufgabe. Aendere ruhig direkt den Code in `src/lektionen/` -- dank Hot
Reload siehst du das Ergebnis sofort im Browser. Genau so lernt man React.

### Die Lektionen in Stufe 1

1. **Komponenten & JSX** -- was eine Komponente ist, wie JSX aussieht.
2. **Props** -- Werte an eine Komponente weitergeben (typisiert).
3. **State mit useState** -- eine Komponente bekommt ein Gedaechtnis.
4. **Events & Eingaben** -- ein Textfeld live mit State verbinden.

---

## Eine neue Lektion ergaenzen

Der Lernpfad ist so gebaut, dass Erweitern leicht ist:

1. Neue Datei in `src/lektionen/` anlegen, z.B. `Lektion5_Listen.tsx`.
   Als Vorlage einfach eine bestehende Lektion kopieren.
2. Die Komponente exportieren (`export function Lektion5_Listen() { ... }`).
3. In `src/lektionen/lektionen.ts` importieren und einen neuen Eintrag ins
   Array `lektionen` einfuegen (mit `id`, `titel`, `kurzbeschreibung`,
   `aufgabe` und `Inhalt`).

Mehr ist nicht noetig -- Liste, Navigation und Fortschritt passen sich von
allein an. Der Typ `Lektion` sorgt dafuer, dass du kein Feld vergisst.

---

## Naechste Schritte (Stufe 2)

Wenn dir Stufe 1 vertraut ist, bieten sich diese Konzepte an:

- **Listen mit `.map()`** -- Daten-Arrays in viele Elemente verwandeln
  (die `LektionsListe` nutzt das bereits -- schau sie dir als Vorschau an).
- **`useEffect`** -- auf Aenderungen reagieren, z.B. den Fortschritt im
  `localStorage` speichern, damit er nach dem Neuladen erhalten bleibt.
- **Ein Router** (z.B. `react-router`) -- echte Seiten mit eigener URL je
  Lektion, statt Umschalten nur ueber `useState`.
- **Komponenten aufteilen & Props weiterreichen** -- groessere UIs sauber
  strukturieren.
- **Eigene Hooks** -- wiederkehrende Logik in `useMeinHook()` auslagern.
