import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// base: Beim Bauen fuer GitHub Pages liegen die Dateien unter einem
// Unterpfad (…/learn/). Relative Pfade ("./") funktionieren dort UND lokal,
// ohne den Repo-Namen fest zu verdrahten. Der Dev-Server bleibt "/".
// (Falls ihr spaeter einen Router einbaut, auf "/<repo-name>/" umstellen.)
//
// base: when building for GitHub Pages the files live under a sub-path
// (…/learn/). Relative paths ("./") work there AND locally without
// hard-coding the repo name. The dev server stays at "/".
// (If you add a router later, switch to "/<repo-name>/".)
export default defineConfig(({ command }) => ({
  plugins: [react()],
  base: command === 'build' ? './' : '/',
}))
