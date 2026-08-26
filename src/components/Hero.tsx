import { motion } from 'framer-motion'

const chain = ['Backend Changed', 'Schema', 'Type', 'Client', 'Consumer']

export function Hero() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden bg-main-black px-6 py-32 sm:px-10 lg:px-24">
      {/* faint background chain, purely atmospheric */}
      <div className="pointer-events-none absolute top-1/2 right-6 hidden -translate-y-1/2 flex-col items-end gap-3 text-right font-mono text-sm text-secondary-text sm:right-12 md:flex lg:right-20">
        {chain.map((label, i) => (
          <motion.div
            key={label}
            className="flex flex-col items-end gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.08, 0.2, 0.08] }}
            transition={{
              duration: 3.6,
              repeat: Infinity,
              delay: i * 0.5,
              ease: 'easeInOut',
            }}
          >
            <span>{label}</span>
            {i < chain.length - 1 && <span className="text-xs">↓</span>}
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1320px]">
        <motion.h1
          className="max-w-[720px] font-display text-[42px] leading-[1.1] font-extrabold tracking-tight text-main-ivory sm:text-[64px] lg:text-[84px]"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          왜 두 번
          <br />
          일하시나요?
        </motion.h1>

        <motion.p
          className="mt-10 max-w-[560px] text-[19px] leading-[1.6] font-normal text-secondary-text sm:text-[22px]"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: 'easeOut' }}
        >
          기능을 만들고,
          <br />
          코드를 짜고,
          <br />
          정책을 결정했습니다.
        </motion.p>

        <motion.p
          className="mt-8 max-w-[600px] text-[28px] leading-[1.25] font-semibold text-main-ivory sm:text-[34px]"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: 'easeOut' }}
        >
          당신은 이미 충분히 일했습니다.
        </motion.p>

        <motion.p
          className="mt-8 max-w-[560px] text-[19px] leading-[1.6] font-normal text-secondary-text sm:text-[22px]"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45, ease: 'easeOut' }}
        >
          그런데 변경 하나마다
          <br />
          타입을 다시 맞추고,
          <br />
          임시 서버를 고치고,
          <br />
          호출부를 찾고,
          <br />
          연결을 다시 만듭니다.
        </motion.p>

        <motion.p
          className="mt-8 max-w-[560px] text-[19px] leading-[1.6] font-medium text-main-ivory sm:text-[22px]"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6, ease: 'easeOut' }}
        >
          그건 새로운 개발이 아닙니다.
        </motion.p>
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
