import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { OMark } from './OMark'

export function SectionPositioning() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.8', 'center 0.45'],
  })

  const lineScale = useTransform(scrollYProgress, [0.15, 0.7], [0, 1])
  const oOpacity = useTransform(scrollYProgress, [0.35, 0.65], [0, 1])
  const oScale = useTransform(scrollYProgress, [0.35, 0.7], [0.4, 1])

  return (
    <section className="bg-main-black px-6 py-32 text-main-ivory sm:px-10 lg:px-24">
      <div className="mx-auto max-w-[900px] text-center">
        <motion.p
          className="text-[30px] leading-[1.3] font-bold tracking-tight sm:text-[38px]"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          핵심에 집중하세요.
        </motion.p>

        <motion.p
          className="mt-8 text-[19px] leading-[1.6] text-secondary-text sm:text-[21px]"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.6, delay: 0.08, ease: 'easeOut' }}
        >
          AI 시대, 에이전트는 코드 공장이 되었습니다.
          <br />
          이제 중요한 것은 더 많이 만드는 것이 아닙니다.
        </motion.p>

        <motion.p
          className="mt-8 text-[26px] leading-[1.35] font-bold tracking-tight sm:text-[32px]"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.6, delay: 0.16, ease: 'easeOut' }}
        >
          무엇을 만들지 아는 것.
          <br />
          어떻게 만들어야 하는지 아는 것.
        </motion.p>

        <motion.p
          className="mt-8 text-[19px] leading-[1.6] text-secondary-text sm:text-[21px]"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.6, delay: 0.24, ease: 'easeOut' }}
        >
          개발자의 새로운 핵심 역량입니다.
        </motion.p>
      </div>

      <div ref={ref} className="mx-auto mt-32 max-w-[1100px]">
        <div className="relative flex items-center justify-between">
          <span className="font-display text-[28px] font-extrabold tracking-tight sm:text-[44px] lg:text-[56px]">
            EXPERIENCE
          </span>

          <div className="relative mx-4 flex flex-1 items-center sm:mx-8">
            <motion.div
              className="h-px flex-1 origin-left bg-brand-orange"
              style={{ scaleX: lineScale }}
            />
            <div className="w-12 shrink-0 sm:w-16" />
            <motion.div
              className="h-px flex-1 origin-right bg-brand-orange"
              style={{ scaleX: lineScale }}
            />

            <motion.div
              className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              style={{ opacity: oOpacity, scale: oScale }}
            >
              <OMark size={48} ignited pulse />
            </motion.div>
          </div>

          <span className="font-display text-[28px] font-extrabold tracking-tight sm:text-[44px] lg:text-[56px]">
            LOGIC
          </span>
        </div>

        <motion.p
          className="mx-auto mt-16 max-w-[520px] text-center text-[19px] leading-[1.6] text-secondary-text sm:text-[21px]"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          경험을 설계하세요.
          <br />
          로직을 만드세요.
        </motion.p>

        <motion.p
          className="mt-10 text-center text-[26px] leading-[1.35] font-bold tracking-tight sm:text-[32px]"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          IMPORTE가
          <br />그 사이에{' '}
          <span className="text-brand-orange">다리를 놓겠습니다.</span>
        </motion.p>
      </div>
    </section>
  )
}
