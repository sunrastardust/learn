---
description: Scaffold a new lesson end-to-end (component, registry entry, DE+EN keys, verification).
agent: logic
argument-hint: Lesson name (DE + EN) and the one concept it teaches
---

Create a new lesson for this learning path.

If not provided, first ask for: the lesson name (German + English title) and the ONE concept it teaches.

Then follow the `new-lesson` skill checklist exactly: component file in `src/lessons/`, keys in BOTH `src/i18n/de.json` AND `en.json`, registry entry in `src/lessons/lessons.ts`, then verify with `npm run build && npm run lint && npm run check:i18n`.
