// Was macht diese Datei?
// Der Startpunkt der App: Hier wird React gestartet und die <App /> in die
// Seite (das <div id="root"> in index.html) eingehaengt. Der LanguageProvider
// liegt bewusst ganz aussen, damit jede Komponente die Sprache kennt.
//
// What does this file do?
// The entry point of the app: this is where React is started and <App /> is
// mounted into the page (the <div id="root"> in index.html). The
// LanguageProvider deliberately sits at the very outside so every component
// knows the language.

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
// Der LanguageProvider stellt Sprache + t() fuer die GANZE App bereit.
// The LanguageProvider supplies language + t() to the WHOLE app.
import { LanguageProvider } from './i18n/LanguageContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LanguageProvider>
      <App />
    </LanguageProvider>
  </StrictMode>,
)
