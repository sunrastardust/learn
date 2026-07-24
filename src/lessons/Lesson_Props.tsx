// Was macht diese Datei?
// Lektion 2: PROPS. Props sind die "Argumente" einer Komponente -- damit gibt
// eine Eltern-Komponente Werte an eine Kind-Komponente weiter. In TypeScript
// beschreiben wir mit einem Typ genau, welche Props erlaubt sind.
//
// What does this file do?
// Lesson 2: PROPS. Props are the "arguments" of a component -- a parent
// component uses them to pass values to a child component. In TypeScript we
// use a type to describe exactly which props are allowed.

import { useLanguage } from "../i18n/LanguageContext";
import { LivePlayground } from "../components/LivePlayground";

// Der Anfangs-Code fuer den Live-Editor -- wie das Beispiel, nur ohne
// TypeScript-Typen (der Playground fuehrt reines JavaScript/JSX aus).
// The initial code for the live editor -- like the example, just without
// TypeScript types (the playground runs plain JavaScript/JSX).
const playgroundCode = `
function Greeting({ name, mood = "neutral" }) {
  const emoji =
    mood === "cheerful" ? "😄" : mood === "tired" ? "🥱" : "🙂";
  return <p>Hallo {name}! {emoji}</p>;
}

render(
  <div>
    <Greeting name="Anna" mood="cheerful" />
    <Greeting name="Chris" />
  </div>
);
`;

// So typisiert man Props: ein Typ, der die erwarteten Felder auflistet.
// Schreibt man beim Aufruf einen Prop falsch, meckert TypeScript sofort.
// This is how you type props: a type listing the expected fields.
// If you misspell a prop when using the component, TypeScript complains
// immediately.
type GreetingProps = {
  // Pflicht-Prop: Wer wird begruesst? / Required prop: who is greeted?
  name: string;
  // Das `?` macht den Prop OPTIONAL -- man darf ihn weglassen.
  // `mood` darf nur einer dieser drei Werte sein (ein "Union-Typ").
  // The `?` makes the prop OPTIONAL -- you may leave it out.
  // `mood` may only be one of these three values (a "union type").
  mood?: "cheerful" | "neutral" | "tired";
};

// Die Komponente bekommt EIN Objekt mit allen Props. Mit { name, mood }
// packen wir die einzelnen Props direkt aus (das nennt man Destructuring).
// The component receives ONE object with all props. With { name, mood } we
// unpack the individual props directly (this is called destructuring).
function Greeting({ name, mood = "neutral" }: GreetingProps) {
  const { t } = useLanguage();
  // Je nach Stimmung ein passendes Emoji. / A matching emoji for each mood.
  const emoji = mood === "cheerful" ? "😄" : mood === "tired" ? "🥱" : "🙂";
  return (
    <p>
      {t("l2.hallo", { name })} {emoji}
    </p>
  );
}

// Diese Lektions-Komponente nutzt <Greeting /> gleich mehrfach und gibt
// jedes Mal andere Props mit.
// This lesson component uses <Greeting /> several times, passing different
// props each time.
export function Lesson2_Props() {
  const { t } = useLanguage();
  return (
    <div>
      <h3>{t("l2.h")}</h3>
      {/* Props werden wie HTML-Attribute uebergeben: name="..."
          Props are passed like HTML attributes: name="..." */}
      <Greeting name="Anna" mood="cheerful" />
      <Greeting name="Ben" mood="tired" />
      {/* mood weggelassen -> Standardwert "neutral".
          mood left out -> default value "neutral". */}
      <Greeting name="Chris" />

      {/* Zum Selbst-Ausprobieren, direkt hier in der App.
          For trying it out yourself, right here in the app. */}
      <LivePlayground code={playgroundCode} />
    </div>
  );
}
