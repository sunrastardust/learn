// Was macht diese Datei?
// Der Startpunkt der App: Hier wird React gestartet und die <App /> in die
// Seite (das <div id="root"> in index.html) eingehaengt. Der LanguageProvider
// liegt bewusst ganz aussen, damit jede Komponente die Sprache kennt.
// Unten sind alle Imports und der render()-Aufruf einzeln erklaert.
//
// What does this file do?
// The entry point of the app: this is where React is started and <App /> is
// mounted into the page (the <div id="root"> in index.html). The
// LanguageProvider deliberately sits at the very outside so every component
// knows the language.
// Below, every import and the render() call are explained one by one.

// `StrictMode` kommt aus dem Paket "react" (installiert via npm, siehe
// package.json). Es ist selbst KEINE sichtbare Komponente, sondern ein
// Entwicklungs-Werkzeug: Es rendert jede Komponente in der Entwicklung
// zweimal hintereinander, um Fehler wie vergessenes Aufraeumen in useEffect
// aufzudecken (siehe Lektion 12). Im fertigen Build (npm run build) hat es
// keine Auswirkung mehr.
//
// `StrictMode` comes from the "react" package (installed via npm, see
// package.json). It is NOT a visible component itself, but a development
// tool: it renders every component twice in a row during development, to
// expose bugs such as forgotten cleanup in useEffect (see lesson 12). In the
// finished build (npm run build) it has no effect anymore.
import { StrictMode } from 'react'

// `createRoot` kommt aus "react-dom/client" -- einem eigenen Paket, das die
// Bruecke zwischen React und dem echten Browser-DOM schlaegt. "react" allein
// kennt keine Browser; "react-dom" weiss, wie man Elemente tatsaechlich auf
// den Bildschirm bringt. Der Unterschied ist Absicht: React selbst kann so
// auch fuer andere Ziele verwendet werden (z. B. react-native fuer Apps).
//
// `createRoot` comes from "react-dom/client" -- a separate package that
// bridges React and the real browser DOM. "react" alone knows nothing about
// browsers; "react-dom" knows how to actually put elements on screen. This
// split is deliberate: React itself can then also target other outputs
// (e.g. react-native for apps).
import { createRoot } from 'react-dom/client'

// Importiert KEINEN JavaScript-Wert, sondern eine CSS-Datei aus demselben
// Ordner (./index.css). Vite erkennt an der Endung .css: "das ist Stylesheet,
// nicht Code" und haengt die Regeln beim Start in die Seite ein. Ab hier
// gelten die Farb-Variablen (--bg, --accent, ...) fuer die ganze App.
//
// Imports NO JavaScript value, but a CSS file from the same folder
// (./index.css). Vite recognises the .css ending: "this is a stylesheet, not
// code" and injects the rules into the page on startup. From here on, the
// colour variables (--bg, --accent, ...) apply to the whole app.
import './index.css'

// Importiert die Komponente aus ./App.tsx -- die Datei liegt im selben
// Ordner wie main.tsx. `App` ist hier der DEFAULT-Export dieser Datei (siehe
// "export default function App()" in App.tsx); deshalb gibt es hier KEINE
// geschweiften Klammern um den Namen (anders als bei StrictMode/createRoot,
// die "named exports" sind). Die Dateiendung .tsx darf beim Importieren
// weggelassen werden -- das erledigt Vite automatisch.
//
// Imports the component from ./App.tsx -- the file sits in the same folder
// as main.tsx. `App` is this file's DEFAULT export here (see "export default
// function App()" in App.tsx); that is why there are NO curly braces around
// the name (unlike StrictMode/createRoot, which are "named exports"). The
// .tsx file extension may be omitted on import -- Vite resolves it
// automatically.
import App from './App.tsx'

// Der LanguageProvider stellt Sprache + t() fuer die GANZE App bereit.
// Er kommt aus src/i18n/LanguageContext.tsx (eigener Unterordner, daher der
// laengere Pfad) und ist -- wie App -- ein NAMED export (geschweifte
// Klammern), weil die Datei "export function LanguageProvider(...)" schreibt.
//
// The LanguageProvider supplies language + t() to the WHOLE app.
// It comes from src/i18n/LanguageContext.tsx (its own subfolder, hence the
// longer path) and, like App, is a NAMED export (curly braces), because that
// file writes "export function LanguageProvider(...)".
import { LanguageProvider } from './i18n/LanguageContext.tsx'

// Jetzt der eigentliche Start. Drei Schritte in einer Zeile:
//   1) document.getElementById('root') sucht das <div id="root"> aus
//      index.html im echten Browser-DOM.
//   2) Das "!" danach sagt TypeScript: "Ich weiss sicher, dass dieses
//      Element existiert, gib mir keinen Tipp-Fehler wegen 'koennte null
//      sein'." (Es steht schliesslich fest in index.html.)
//   3) createRoot(...) macht aus diesem leeren <div> einen "Wurzel-Knoten":
//      ab jetzt darf React genau innerhalb dieses divs Elemente einfuegen,
//      aendern und wieder entfernen.
//
// Now the actual start. Three steps in one line:
//   1) document.getElementById('root') looks up the <div id="root"> from
//      index.html in the real browser DOM.
//   2) The "!" after it tells TypeScript: "I know for certain this element
//      exists, don't warn me about 'could be null'." (It is fixed in
//      index.html after all.)
//   3) createRoot(...) turns that empty <div> into a "root node": from now
//      on React is allowed to insert, change and remove elements exactly
//      inside this div.
createRoot(document.getElementById('root')!).render(
  // .render(...) bekommt das JSX, das tatsaechlich angezeigt werden soll.
  // Die Verschachtelung hier ist keine zufaellige Reihenfolge, sondern
  // Absicht -- von aussen nach innen:
  //
  // .render(...) receives the JSX that should actually be displayed.
  // The nesting here is not a random order but deliberate -- from outside
  // in:
  <StrictMode>
    {/* AEUSSERSTE Huelle: das Entwicklungs-Werkzeug von oben. Es hat keinen
        eigenen Effekt auf das Aussehen, umschliesst aber ALLES.
        OUTERMOST wrapper: the development tool from above. It has no visual
        effect of its own, but wraps EVERYTHING. */}
    <LanguageProvider>
      {/* ZWEITE Ebene: erst hier beginnt der Sprach-Context (siehe Lektion
          13/16 zu Context). Er muss AUSSERHALB von <App /> stehen, weil
          jede Komponente INNERHALB des Providers useLanguage() aufrufen
          koennen soll -- auch tief verschachtelte wie eine einzelne Lektion.
          SECOND level: only here does the language context begin (see
          lesson 13/16 on context). It must sit OUTSIDE <App />, because
          every component INSIDE the provider needs to be able to call
          useLanguage() -- even deeply nested ones like a single lesson. */}
      <App />
      {/* INNERSTE Komponente: die eigentliche Anwendung (siehe App.tsx).
          Sie liegt so tief, weil sie selbst schon useLanguage() benutzt --
          waere sie AUSSERHALB des LanguageProvider, gaebe es beim Start
          sofort einen Fehler ("useLanguage muss innerhalb von
          <LanguageProvider> stehen").
          INNERMOST component: the actual application (see App.tsx).
          It sits this deep because it already uses useLanguage() itself --
          if it were OUTSIDE the LanguageProvider, there would be an
          immediate error on startup ("useLanguage must be used inside
          <LanguageProvider>"). */}
    </LanguageProvider>
  </StrictMode>,
)
