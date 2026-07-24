# react-lernpfad — always-on rules

Bilingual (DE/EN) React learning app: Vite + React 19 + TypeScript. The app itself is the tutorial — keep everything beginner-readable.

Iron rules (apply to every change):

- Every user-visible text goes through i18n: add the SAME key to BOTH `src/i18n/de.json` and `src/i18n/en.json`. Never hard-code UI strings.
- Code comments are bilingual: German first, English directly below.
- Verify before claiming done: `npm run build && npm run lint && npm run check:i18n`.
- No new dependencies without asking.
- Keep examples deliberately simple — teaching beats elegance.

Everything else deliberately lives elsewhere and is loaded only when needed: path rules in `.github/instructions/`, procedures in `.github/skills/`, roles in `.github/agents/`, reusable request templates in `.github/prompts/`.
