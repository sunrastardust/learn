// Was macht diese Datei?
// STATE mit useState -- die ausfuehrliche Lektion. Sie zerlegt zuerst die
// ungewohnte Syntax Stueck fuer Stueck, zeigt dann den genauen Ablauf beim
// Klicken, und bringt zwei Live-Beispiele: einen einfachen Zaehler und eine
// kleine Bestellung (dort sieht man, was in den State gehoert -- und was
// NICHT, weil es sich ausrechnen laesst).
//
// What does this file do?
// STATE with useState -- the detailed lesson. It first dissects the unusual
// syntax piece by piece, then shows the exact flow on click, and brings two
// live examples: a simple counter and a small order (there you see what
// belongs in state -- and what does NOT, because it can be computed).

// `useState` ist ein "Hook" -- eine Funktion aus React, mit der Komponenten
// sich Werte merken koennen. Wir muessen sie importieren.
// `useState` is a "hook" -- a function from React that lets components
// remember values. We have to import it.
import { useState } from "react";
import { useLanguage } from "../i18n/LanguageContext";
import { LivePlayground } from "../components/LivePlayground";

// Die Bestandteile der Zeile `const [count, setCount] = useState(0);`
// Das Code-Stueck ist fest (Code uebersetzt man nicht), die Erklaerung
// kommt aus den Sprachdateien.
// The parts of the line `const [count, setCount] = useState(0);`
// The code fragment is fixed (you don't translate code), the explanation
// comes from the language files.
const syntaxParts = [
  { code: "const", key: "l3.syn.const" },
  { code: "[ … ]", key: "l3.syn.klammern" },
  { code: "count", key: "l3.syn.count" },
  { code: "setCount", key: "l3.syn.setcount" },
  { code: "useState", key: "l3.syn.usestate" },
  { code: "(0)", key: "l3.syn.start" },
];

// Der Ablauf in zwei Phasen -- dieselbe Darstellung wie in der useEffect-
// Lektion, damit man sie wiedererkennt.
// The flow in two phases -- the same presentation as in the useEffect
// lesson, so it feels familiar.
const phases = [
  {
    titleKey: "l3.flow.p1.titel",
    loop: false,
    stepKeys: ["l3.flow.p1.s1", "l3.flow.p1.s2", "l3.flow.p1.s3", "l3.flow.p1.s4"],
  },
  {
    titleKey: "l3.flow.p2.titel",
    loop: true,
    stepKeys: ["l3.flow.p2.s1", "l3.flow.p2.s2", "l3.flow.p2.s3", "l3.flow.p2.s4", "l3.flow.p2.s5"],
  },
];

// Beispiel 1: der einfache Zaehler. / Example 1: the simple counter.
const counterCode = `
function Counter() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <h3>Zähler: {count}</h3>
      <button onClick={() => setCount(v => v + 1)}>+1</button>
      <button onClick={() => setCount(v => v - 1)}>-1</button>
    </div>
  );
}

render(<Counter />);
`;

// Beispiel 2: eine kleine Bestellung. Wichtig daran: NUR die Menge ist
// State. Der Preis pro Stueck aendert sich nie (normale Konstante), und die
// Summe wird bei jedem Rendern frisch ausgerechnet -- sie gehoert NICHT in
// den State, sonst muesste man sie staendig von Hand nachziehen.
// Example 2: a small order. The key point: ONLY the quantity is state. The
// price per item never changes (a normal constant), and the total is
// recomputed on every render -- it does NOT belong in state, otherwise you
// would have to keep it in sync by hand.
const orderCode = `
function Order() {
  // Das ändert sich -> State:
  const [quantity, setQuantity] = useState(1);

  // Das ändert sich nie -> normale Konstante:
  const pricePerItem = 4.5;

  // Das lässt sich ausrechnen -> KEIN State:
  const total = quantity * pricePerItem;

  return (
    <div>
      <p>Kaffee — {pricePerItem.toFixed(2)} € pro Stück</p>
      <button onClick={() => setQuantity(q => Math.max(1, q - 1))}>−</button>
      <strong> {quantity} </strong>
      <button onClick={() => setQuantity(q => q + 1)}>+</button>
      <p>Summe: <strong>{total.toFixed(2)} €</strong></p>
    </div>
  );
}

render(<Order />);
`;

export function Lesson_State() {
  const { t } = useLanguage();

  // Genau die Zeile, die unten Stueck fuer Stueck erklaert wird.
  // Exactly the line that is explained piece by piece below.
  const [count, setCount] = useState(0);

  return (
    <div className="lesson-text">
      <p>{t("l3.intro1")}</p>
      <p>{t("l3.intro2")}</p>

      {/* --- Was ist ein Hook? / What is a hook? --- */}
      <h4>{t("l3.hook.h")}</h4>
      <p>{t("l3.hook.p1")}</p>
      <p>{t("l3.hook.p2")}</p>

      {/* --- Die Syntax zerlegt / the syntax dissected --- */}
      <h4>{t("l3.syn.h")}</h4>
      <p>{t("l3.syn.p")}</p>
      <pre className="code-block">const [count, setCount] = useState(0);</pre>
      <div className="table-scroll">
        <table>
          <thead>
            <tr>
              <th>{t("l3.syn.sp.teil")}</th>
              <th>{t("l3.syn.sp.bed")}</th>
            </tr>
          </thead>
          <tbody>
            {syntaxParts.map((part) => (
              <tr key={part.code}>
                <td>
                  <code>{part.code}</code>
                </td>
                <td>{t(part.key)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* --- Der genaue Ablauf / the exact flow --- */}
      <h4>{t("l3.flow.h")}</h4>
      <p>{t("l3.flow.p")}</p>
      <div className="phases">
        {phases.map((phase) => (
          <div className={phase.loop ? "phase phase-loop" : "phase"} key={phase.titleKey}>
            <strong className="phase-title">
              {t(phase.titleKey)} {phase.loop && <span aria-hidden="true">↻</span>}
            </strong>
            <ol>
              {phase.stepKeys.map((key) => (
                <li key={key}>{t(key)}</li>
              ))}
            </ol>
          </div>
        ))}
      </div>

      {/* --- Beispiel 1: der Zaehler, live in dieser Seite ---
          --- Example 1: the counter, live in this page --- */}
      <h4>{t("l3.bsp.h")}</h4>
      <h3>{t("l3.zaehler", { count })}</h3>
      {/*
        onClick bekommt eine FUNKTION, die beim Klick laufen soll.
        Wichtig: Statt setCount(count + 1) nehmen wir die Form mit
        Vorher-Wert (value => value + 1). Warum, steht unten bei den
        Stolpersteinen.

        onClick receives a FUNCTION to run on click.
        Important: instead of setCount(count + 1) we use the previous-value
        form (value => value + 1). The reason is in the pitfalls below.
      */}
      <button onClick={() => setCount((value) => value + 1)}>+1</button>{" "}
      <button onClick={() => setCount((value) => value - 1)}>-1</button>
      <p>{t("l3.p1")}</p>
      <LivePlayground code={counterCode} />

      {/* --- Beispiel 2: naeher an der Praxis ---
          --- Example 2: closer to real life --- */}
      <h4>{t("l3.praxis.h")}</h4>
      <p>{t("l3.praxis.p1")}</p>
      <LivePlayground code={orderCode} />
      <p>{t("l3.praxis.p2")}</p>

      {/* --- Haeufige Stolpersteine / common pitfalls --- */}
      <h4>{t("l3.stolper.h")}</h4>
      <ul>
        {["l3.stolper.i1", "l3.stolper.i2", "l3.stolper.i3", "l3.stolper.i4"].map((key) => (
          <li key={key}>{t(key)}</li>
        ))}
      </ul>

      <p className="merksatz">{t("l3.merksatz")}</p>
    </div>
  );
}
