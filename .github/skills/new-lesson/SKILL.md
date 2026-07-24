---
name: new-lesson
description: Complete checklist for adding a new lesson to the learning path (component, registry entry, DE+EN keys, verification). Use whenever a task asks for a new lesson/Lektion.
---

# Add a new lesson

1. Create `src/lessons/Lesson_<Name>.tsx` — copy the closest existing lesson as a template. Header comment bilingual (German first, English below).
2. All texts via `t("...")` — NO hard-coded strings.
3. Add the keys to BOTH `src/i18n/de.json` AND `src/i18n/en.json`:
   `lektion.<name>.titel`, `lektion.<name>.kurz`, optional `lektion.<name>.aufgabe`, plus all content keys.
4. Register it in `src/lessons/lessons.ts`: next free `id`, `titleKey`, `summaryKey`, optional `taskKey`, `groupKey`, `Content`.
5. Text-heavy lesson? Wrap it in `className="lesson-text"`.
6. Verify: `npm run build && npm run lint && npm run check:i18n` — all green. The lesson count in "About this project" updates automatically.
