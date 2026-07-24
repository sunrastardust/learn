---
applyTo: "src/**/*.css"
---

# Rules for styles

- Colors ONLY via the CSS variables from `index.css` (`--text`, `--bg`, `--accent`, ...) so light AND dark mode keep working.
- Breakpoint for narrow screens: `@media (max-width: 720px)`.
- No inline styles in components; extend the classes in `App.css` instead.
