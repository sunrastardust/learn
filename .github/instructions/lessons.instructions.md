---
applyTo: "src/lessons/**"
---

# Rules for lesson files

- One lesson = one component file `Lesson_*.tsx` + one entry in `lessons.ts` (`id`, `titleKey`, `summaryKey`, optional `taskKey`, `groupKey`, `Content`).
- All texts via `t("...")` — never hard-coded. Keys go into BOTH language files.
- Text-heavy lessons use `className="lesson-text"`; live examples stay minimal (one concept per lesson).
- For a completely new lesson, use the `new-lesson` skill — it holds the full checklist.
