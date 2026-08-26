import { useState } from 'react'
import { Intro } from './components/Intro'
import { Hero } from './components/Hero'
import { SectionDefinition } from './components/SectionDefinition'
import { SectionTrust } from './components/SectionTrust'
import { SectionReport } from './components/SectionReport'
import { SectionPositioning } from './components/SectionPositioning'
import { Closing } from './components/Closing'

function App() {
  const [introDone, setIntroDone] = useState(false)

  return (
    <>
      {!introDone && <Intro onComplete={() => setIntroDone(true)} />}
      <main>
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
