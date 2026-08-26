import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { BrushRing } from './BrushRing'

type IntroProps = {
  onComplete: () => void
}

/**
 * Logo formation: IM is separated from PORTE. The O ignites first —
 * its negative space deepens to black — then gravity pulls IM into
 * place to complete IMPORTE. A single light sweep marks the join.
 */
export function Intro({ onComplete }: IntroProps) {
  const reduceMotion = useReducedMotion()
  const [ignited, setIgnited] = useState(false)
  const [joined, setJoined] = useState(false)
  const [sweep, setSweep] = useState(false)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    if (reduceMotion) {
      const t = setTimeout(() => {
        setVisible(false)
        onComplete()
      }, 200)
      return () => clearTimeout(t)
    }

    const timers = [
      setTimeout(() => setIgnited(true), 380),
      setTimeout(() => setJoined(true), 620),
      setTimeout(() => setSweep(true), 1340),
      setTimeout(() => setVisible(false), 2500),
      setTimeout(() => onComplete(), 2900),
    ]
    return () => timers.forEach(clearTimeout)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduceMotion])

  useEffect(() => {
    document.body.style.overflow = visible ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [visible])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-main-black"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        >
          <div className="relative flex items-center justify-center">
            <div
              className="flex items-baseline font-display select-none"
              style={{
                fontSize: 'clamp(40px, 8vw, 96px)',
                fontWeight: 800,
                letterSpacing: '-0.02em',
                color: '#F2EEE5',
              }}
            >
              <motion.span
                initial={{ marginRight: 'clamp(24px, 12vw, 140px)' }}
                animate={{ marginRight: joined ? 0 : 'clamp(24px, 12vw, 140px)' }}
                transition={{ duration: 0.72, ease: [0.6, 0, 0.85, 0.35] }}
              >
                IM
              </motion.span>
              <span className="relative inline-flex items-baseline">
                <span>P</span>
                <span
                  className="relative mx-[0.02em] inline-block"
                  style={{
                    width: '0.82em',
                    height: '0.82em',
                    alignSelf: 'center',
                  }}
                >
                  <BrushRing
                    ignited={ignited}
                    sweep={sweep}
                    glow={ignited && !joined}
                    className="absolute inset-0 h-full w-full"
                  />
                </span>
                <span>RTE</span>
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
