// Was macht diese Datei? / What does this file do?
// DE: Ein Agent-Hook fuer das Ereignis PreToolUse (laeuft VOR jedem Edit/Write
//     eines Agenten). Er zeigt beide Kraefte eines Hooks:
//       1) BLOCKEN  – generierte Dateien (dist/, out/, package-lock.json,
//          node_modules) duerfen nicht von Hand bearbeitet werden. Exit 2
//          stoppt den Werkzeug-Aufruf in Claude Code.
//       2) ERINNERN – bei einer Sprachdatei ein sanfter Hinweis (Exit 0),
//          den Zwilling nicht zu vergessen.
//     Verdrahtet in .claude/settings.json (hooks.PreToolUse).
// EN: An agent hook for the PreToolUse event (runs BEFORE every Edit/Write by
//     an agent). It shows both powers of a hook:
//       1) BLOCK   – generated files (dist/, out/, package-lock.json,
//          node_modules) must not be hand-edited. Exit 2 stops the tool call
//          in Claude Code.
//       2) REMIND  – on a language file, a gentle hint (exit 0) not to forget
//          the twin.
//     Wired up in .claude/settings.json (hooks.PreToolUse).
//
// Claude Code uebergibt die Werkzeug-Daten als JSON ueber stdin.
// Claude Code passes the tool data as JSON via stdin.

let raw = "";
process.stdin.on("data", (chunk) => (raw += chunk));
process.stdin.on("end", () => {
  let data = {};
  try {
    data = JSON.parse(raw.replace(/^﻿/, "").trim());
  } catch {
    // Kein/kaputtes JSON -> nichts tun. / No/broken JSON -> do nothing.
  }

  // Der Pfad der Datei, die der Agent gleich aendern will.
  // The path of the file the agent is about to change.
  const file = String(data?.tool_input?.file_path ?? "").replace(/\\/g, "/");

  // 1) HARTE SPERRE: generierte Dateien nicht von Hand bearbeiten.
  //    HARD BLOCK: don't hand-edit generated files.
  if (/\/(dist|out|node_modules)\//.test(file) || /package-lock\.json$/.test(file)) {
    console.error(
      `⛔ PreToolUse-Guard: "${file}" ist generiert / is generated – nicht von Hand bearbeiten / do not hand-edit.`
    );
    process.exit(2); // Exit 2 blockt den Werkzeug-Aufruf. / Exit 2 blocks the tool call.
  }

  // 2) SANFTER HINWEIS: Sprachdatei -> an den Zwilling denken.
  //    GENTLE HINT: language file -> remember the twin.
  if (/src\/i18n\/(de|en)\.json$/.test(file)) {
    console.log(
      "ℹ PreToolUse: Du bearbeitest eine Sprachdatei – denke an den Zwilling. / You are editing a language file – remember its twin."
    );
  }

  process.exit(0); // Alles erlaubt. / Everything allowed.
});
