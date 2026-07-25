// Was macht diese Datei? / What does this file do?
// DE: Ein GitHub-Copilot-Hook fuer das Ereignis preToolUse (laeuft VOR jedem
//     Werkzeug-Aufruf eines Agenten). Copilot uebergibt den Aufruf als JSON
//     ueber die Standard-Eingabe (u. a. tool_name und tool_input.filePath),
//     und der Hook antwortet mit einer JSON-Entscheidung auf der Standard-
//     Ausgabe: "allow" laesst den Aufruf zu, "deny" STOPPT ihn.
//     Hier: generierte Dateien (dist/, out/, node_modules, package-lock.json)
//     duerfen nicht von Hand bearbeitet werden -> deny.
//     Verdrahtet in .github/hooks/hooks.json.
// EN: A GitHub Copilot hook for the preToolUse event (runs BEFORE every tool
//     call by an agent). Copilot passes the call as JSON on stdin (incl.
//     tool_name and tool_input.filePath), and the hook answers with a JSON
//     decision on stdout: "allow" lets the call through, "deny" STOPS it.
//     Here: generated files (dist/, out/, node_modules, package-lock.json)
//     must not be hand-edited -> deny.
//     Wired up in .github/hooks/hooks.json.

let raw = "";
process.stdin.on("data", (chunk) => (raw += chunk));
process.stdin.on("end", () => {
  let data = {};
  try {
    data = JSON.parse(raw.replace(/^﻿/, "").trim());
  } catch {
    // Kein/kaputtes JSON -> im Zweifel erlauben. / No/broken JSON -> allow.
  }

  // Der Pfad der Datei, die der Agent gleich aendern will (camelCase im
  // tool_input). Bei Werkzeugen ohne Datei (z. B. Terminal) bleibt er leer.
  // The path of the file the agent is about to change (camelCase in
  // tool_input). Empty for tools without a file (e.g. terminal).
  const input = data?.tool_input ?? {};
  const file = String(input.filePath ?? input.file_path ?? input.path ?? "").replace(/\\/g, "/");

  // Antwortet Copilot mit einer Entscheidung und beendet den Hook.
  // Answers Copilot with a decision and ends the hook.
  const decide = (decision, reason) => {
    const out = { hookSpecificOutput: { permissionDecision: decision } };
    if (reason) out.hookSpecificOutput.permissionDecisionReason = reason;
    console.log(JSON.stringify(out));
    process.exit(0);
  };

  // Kein Datei-Pfad -> nichts zu pruefen. / No file path -> nothing to check.
  if (!file) return decide("allow");

  // Generierte Dateien nicht von Hand bearbeiten -> Aufruf verweigern.
  // Don't hand-edit generated files -> deny the call.
  if (/(^|\/)(dist|out|node_modules)\//.test(file) || /package-lock\.json$/.test(file)) {
    return decide(
      "deny",
      `"${file}" ist generiert / is generated – nicht von Hand bearbeiten / do not hand-edit.`
    );
  }

  return decide("allow");
});
