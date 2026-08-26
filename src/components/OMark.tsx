import { motion, useReducedMotion } from 'framer-motion'
import { BrushRing } from './BrushRing'

type OMarkProps = {
  size?: number | string
  ignited?: boolean
  pulse?: boolean
  sweep?: boolean
  className?: string
}

/**
 * The brand mark — a dry-brush orange ring over a pure-black void,
 * muted until IMPORTE intervenes.
 */
export function OMark({
  size = 40,
  ignited = true,
  pulse = false,
  sweep = false,
  className = '',
}: OMarkProps) {
  const reduceMotion = useReducedMotion()

  return (
    <motion.div
      className={className}
      style={{ width: size, height: size }}
      animate={pulse && !reduceMotion ? { scale: [1, 1.06, 1] } : undefined}
      transition={
        pulse ? { duration: 3.2, repeat: Infinity, ease: 'easeInOut' } : undefined
      }
    >
      <BrushRing ignited={ignited} sweep={sweep} className="h-full w-full" />
    </motion.div>
  )
}
