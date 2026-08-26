import { useState } from 'react'
import { Intro } from './components/Intro'
import { Header } from './components/Header'
import { DefinitionHero } from './components/DefinitionHero'
import { Hero } from './components/Hero'
import { SectionDefinition } from './components/SectionDefinition'
import { SectionTrust } from './components/SectionTrust'
import { SectionReport } from './components/SectionReport'
import { SectionPositioning } from './components/SectionPositioning'
import { Closing } from './components/Closing'

const INTRO_LAST_PLAYED_KEY = 'importe-intro-last-played'
const INTRO_REPLAY_INTERVAL_MS = 24 * 60 * 60 * 1000 // once a day

function seenIntroToday() {
  try {
    const last = localStorage.getItem(INTRO_LAST_PLAYED_KEY)
    return !!last && Date.now() - Number(last) < INTRO_REPLAY_INTERVAL_MS
  } catch {
    return false
  }
}

function App() {
  const [introDone, setIntroDone] = useState(seenIntroToday)

  const handleIntroComplete = () => {
    try {
      localStorage.setItem(INTRO_LAST_PLAYED_KEY, String(Date.now()))
    } catch {
      // ignore storage failures (private mode, etc.) — intro just replays
    }
    setIntroDone(true)
  }

  return (
    <>
      {!introDone && <Intro onComplete={handleIntroComplete} />}
      <Header visible={introDone} />
      <main>
        <DefinitionHero />
        <Hero />
        <SectionDefinition />
        <SectionTrust />
        <SectionReport />
        <SectionPositioning />
        <Closing />
      </main>
    </>
  )
}

export default App
