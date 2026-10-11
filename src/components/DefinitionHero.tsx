import { motion } from 'framer-motion'
import { OMark } from './OMark'
import { trackCtaClick } from '../lib/analytics'

export function DefinitionHero() {
  return (
    <section
      data-header-theme="dark"
      className="relative flex min-h-screen items-center bg-main-black px-6 py-28 sm:px-10 lg:px-24"
    >
      <div className="mx-auto flex w-full max-w-[1320px] flex-col items-center gap-12 text-center sm:flex-row sm:items-center sm:justify-center sm:gap-14 sm:text-left">
        <div className="flex flex-col items-center break-keep sm:items-start">
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
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5, ease: 'easeOut' }}
          >
            <p className="mt-9 text-[16px] leading-[1.75] text-secondary-text sm:text-[19px]">
              API 문서는 서버가 무엇을 주는지 말합니다.
              <br />
              <span className="text-main-ivory">
                IMPORTE는 코드가 무엇을 요구하는지 말합니다.
              </span>
              <br />
              둘이 어긋나면, 서비스는 깨집니다.
            </p>
            <p className="mt-4 text-[19px] font-semibold text-main-ivory sm:text-[23px]">
              그 사이를, <span className="text-brand-orange">IMPORTE</span>가 지킵니다.
            </p>
          </motion.div>

          <motion.a
            href="https://app.importe.dev"
            onClick={() => trackCtaClick('hero')}
            className="mt-10 inline-flex items-center gap-2 rounded-full bg-brand-orange px-7 py-3.5 text-[15px] font-semibold text-main-black transition-colors hover:bg-main-ivory sm:text-[16px]"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.75, ease: 'easeOut' }}
          >
            GitHub로 시작하기
            <span aria-hidden="true">→</span>
          </motion.a>
        </div>

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
