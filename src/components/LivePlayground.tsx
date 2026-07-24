// Was macht diese Datei?
// Der LIVE-EDITOR fuer die Basics-Lektionen: links/oben editierbarer Code,
// darunter sofort die gerenderte Vorschau. Eine SANDBOX im Speicher -- die
// echten Projekt-Dateien bleiben unberuehrt, und "Zuruecksetzen" stellt
// jederzeit den Anfangs-Code wieder her. Technik: react-live fuehrt den
// Code direkt im Browser aus; prism-react-renderer faerbt ihn ein.
//
// What does this file do?
// The LIVE EDITOR for the basics lessons: editable code on top, the rendered
// preview right below. A SANDBOX in memory -- the real project files stay
// untouched, and "Reset" restores the initial code at any time. Tech:
// react-live executes the code right in the browser; prism-react-renderer
// does the syntax colouring.

import { useState, useEffect, createContext, useContext } from "react";
import { LiveProvider, LiveEditor, LiveError, LivePreview } from "react-live";
// Festes dunkles Editor-Thema -- gut lesbar in hellem UND dunklem App-Modus.
// Fixed dark editor theme -- readable in light AND dark app mode.
import { themes } from "prism-react-renderer";
import { useLanguage } from "../i18n/LanguageContext";

// Die Props: nur der Anfangs-Code des Beispiels.
// The props: just the example's initial code.
type LivePlaygroundProps = {
  code: string;
};

export function LivePlayground({ code }: LivePlaygroundProps) {
  const { t } = useLanguage();

  // Der Reset-Trick: `version` steckt als `key` am LiveProvider. Erhoehen wir
  // sie, wirft React den alten Editor komplett weg und baut ihn mit dem
  // Anfangs-Code neu auf ("Neu-Mount durch key-Wechsel") -- ein sauberer,
  // garantierter Reset ohne eigene Undo-Logik.
  // The reset trick: `version` is attached as `key` on the LiveProvider.
  // Incrementing it makes React throw away the old editor and rebuild it
  // with the initial code ("remount via key change") -- a clean, guaranteed
  // reset without any custom undo logic.
  const [version, setVersion] = useState(0);

  return (
    <div className="playground">
      <div className="playground-head">
        <strong>▶ {t("play.h")}</strong>
        <button
          className="playground-reset"
          onClick={() => setVersion((v) => v + 1)}
        >
          ↺ {t("play.reset")}
        </button>
      </div>
      <p className="playground-note">{t("play.hinweis")}</p>

      {/* `scope` legt fest, was der Beispiel-Code benutzen darf -- die React-
          Grundfunktionen der Lektionen. `noInline` erlaubt mehrere
          Anweisungen + render(...).
          `scope` defines what the example code may use -- the React basics
          from the lessons. `noInline` allows multiple statements +
          render(...). */}
      <LiveProvider
        key={version}
        code={code.trim()}
        scope={{ useState, useEffect, createContext, useContext }}
        noInline
        theme={themes.vsDark}
      >
        <div className="playground-editor">
          <LiveEditor />
        </div>
        <p className="playground-note">{t("play.render")}</p>

        <span className="playground-label">{t("play.vorschau")}</span>
        <div className="playground-preview">
          <LivePreview />
        </div>
        {/* Fehler erscheinen hier als Text statt als Absturz.
            Errors show up here as text instead of a crash. */}
        <LiveError className="playground-error" />
      </LiveProvider>
    </div>
  );
}
