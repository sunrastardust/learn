---
name: i18n-check
description: Verify that de.json and en.json are complete and in sync (key parity, missing/unused keys). Use before finishing any task that touched language files.
---

# i18n check

1. Run `npm run check:i18n`.
2. `PARITY` error → keys differ between de.json and en.json: add the missing twin key (never delete blindly).
3. `MISSING` error → a key is used in code but absent from a language file: add it to BOTH files.
4. `UNUSED` warning → key exists but is never referenced: remove it from BOTH files, or wire it up.
5. Re-run until exit code 0.
