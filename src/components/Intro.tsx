import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { BrushRing } from './BrushRing'

type IntroProps = {
  onComplete: () => void
}

type Flip = { x: number; y: number; scale: number }

/**
 * Logo formation: IM is separated from PORTE. The O ignites first —
 * its negative space deepens to black — then gravity pulls IM into
 * place to complete IMPORTE. A single light sweep marks the join.
 * The finished wordmark then flies up into the header's own logo spot
 * (measured via FLIP), handing off to the real header underneath.
 */
export function Intro({ onComplete }: IntroProps) {
  const reduceMotion = useReducedMotion()
  const [ignited, setIgnited] = useState(false)
  const [joined, setJoined] = useState(false)
  const [sweep, setSweep] = useState(false)
  const [flying, setFlying] = useState(false)
  const [visible, setVisible] = useState(true)
  const [flip, setFlip] = useState<Flip>({ x: 0, y: 0, scale: 1 })
  const wordmarkRef = useRef<HTMLDivElement>(null)

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
      setTimeout(() => {
        const source = wordmarkRef.current?.getBoundingClientRect()
        const target = document
          .querySelector('[data-header-logo]')
          ?.getBoundingClientRect()
        if (source && target && source.width > 0) {
          const scale = target.width / source.width
          const x =
            target.left + target.width / 2 - (source.left + source.width / 2)
          const y =
            target.top + target.height / 2 - (source.top + source.height / 2)
          setFlip({ x, y, scale })
        }
        setFlying(true)
      }, 2000),
      setTimeout(() => onComplete(), 2650),
      setTimeout(() => setVisible(false), 2750),
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
            <motion.div
              ref={wordmarkRef}
              className="flex items-baseline font-display select-none"
              style={{
                fontSize: 'clamp(40px, 8vw, 96px)',
                fontWeight: 800,
                letterSpacing: '-0.02em',
                color: '#F2EEE5',
              }}
              animate={
                flying
                  ? { x: flip.x, y: flip.y, scale: flip.scale, opacity: [1, 1, 0] }
                  : { x: 0, y: 0, scale: 1, opacity: 1 }
              }
              transition={{
                x: { duration: 0.65, ease: [0.65, 0, 0.35, 1] },
                y: { duration: 0.65, ease: [0.65, 0, 0.35, 1] },
                scale: { duration: 0.65, ease: [0.65, 0, 0.35, 1] },
                opacity: { duration: 0.65, times: [0, 0.8, 1] },
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
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
