import { useState } from 'react'
import { motion } from 'framer-motion'
import { OMark } from './OMark'
import { trackCtaClick } from '../lib/analytics'

export function Closing() {
  const [hover, setHover] = useState(false)

  return (
    <section
      data-header-theme="dark"
      className="flex min-h-screen flex-col items-center justify-center bg-main-black px-6 py-32 text-center text-main-ivory"
    >
      <motion.div
        className="flex flex-col items-center"
        initial={{ opacity: 0, scale: 0.85 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <OMark size={190} ignited sweep={hover} />
        <p className="mt-9 font-display text-[32px] font-extrabold tracking-[0.06em] text-main-ivory sm:text-[40px]">
          IMPORTE
        </p>
      </motion.div>

      <motion.div
        className="mt-16"
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.6, delay: 0.15, ease: 'easeOut' }}
      >
        <p className="text-[19px] font-normal text-secondary-text sm:text-[21px]">
          Try IMPORTE.
        </p>
        <p className="mt-2 text-[18px] text-secondary-text sm:text-[20px]">
          Focus on your IMPORTE.
        </p>
      </motion.div>

      <motion.a
        href="https://app.importe.dev"
        id="closing-cta"
        className="group relative mt-16 inline-flex scroll-mt-24 items-center gap-3 rounded-full border border-main-ivory/20 px-9 py-4 text-[16px] font-semibold text-main-ivory transition-colors sm:text-[17px]"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onClick={() => trackCtaClick('closing')}
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.6, delay: 0.35, ease: 'easeOut' }}
        animate={{ borderColor: hover ? '#E9652B' : 'rgba(242,238,229,0.2)' }}
      >
        <OMark size={16} ignited={hover} />
        Get Early Access
        <motion.span
          animate={{ x: hover ? 4 : 0, color: hover ? '#E9652B' : '#F2EEE5' }}
          transition={{ duration: 0.25 }}
        >
          →
        </motion.span>
      </motion.a>

      <div className="mt-24 flex flex-col items-center gap-4 text-xs text-secondary-text/60">
        <p>IMPORTE © 2026</p>

        <div
          id="contact"
          className="flex scroll-mt-24 flex-col items-center gap-1.5 rounded-lg px-4 py-2"
        >
          <p className="font-mono text-[10px] tracking-[0.15em] text-secondary-text/40 uppercase">
            Contact
          </p>
          <div className="grid grid-cols-[56px_auto] items-baseline gap-x-2 gap-y-1.5 text-left">
            <span className="text-secondary-text/40">LinkedIn</span>
            <a
              href="https://www.linkedin.com/in/kcleverp"
              target="_blank"
              rel="noopener noreferrer"
              className="underline decoration-secondary-text/40 underline-offset-2 transition-colors hover:text-main-ivory hover:decoration-main-ivory"
            >
              www.linkedin.com/in/kcleverp
            </a>
            <span className="text-secondary-text/40">Email</span>
            <a
              href="mailto:kcleverp@gmail.com"
              className="underline decoration-secondary-text/40 underline-offset-2 transition-colors hover:text-main-ivory hover:decoration-main-ivory"
            >
              kcleverp@gmail.com
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
