import { motion } from 'framer-motion'
import { OMark } from './OMark'

export function DefinitionHero() {
  return (
    <section
      data-header-theme="dark"
      className="relative flex min-h-screen items-center bg-main-black px-6 sm:px-10 lg:px-24"
    >
      <div className="mx-auto flex w-full max-w-[1320px] flex-col items-start gap-10 sm:flex-row sm:items-center sm:justify-center sm:gap-14">
        <motion.h1
          className="font-display leading-[1.2] font-extrabold tracking-tight text-main-ivory"
          style={{ fontSize: 'clamp(32px, 6vw, 76px)' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          서비스의 앞과 뒤.
          <br />
          그 사이, 가장 확실한 연결.
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
        >
          <OMark size="clamp(72px, 11vw, 160px)" ignited />
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-10 left-1/2 h-10 w-px -translate-x-1/2 bg-secondary-text"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.25 }}
        transition={{ duration: 1, delay: 1 }}
      />
    </section>
  )
}
