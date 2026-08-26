import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const diffLines = [
  { text: '- type UserCardProps = { userName: string }', sign: '-' },
  { text: '+ type UserCardProps = { name: string }', sign: '+' },
  { text: '  export function UserCard(props: UserCardProps) {', sign: ' ' },
  { text: '-   return <span>{props.userName}</span>', sign: '-' },
  { text: '+   return <span>{props.name}</span>', sign: '+' },
  { text: '  }', sign: ' ' },
  { text: '- ProfileHeader.tsx · user.userName → user.name', sign: '-' },
  { text: '+ ProfileHeader.tsx · user.name confirmed', sign: '+' },
  { text: '- SettingsProfile.tsx · user.userName → user.name', sign: '-' },
  { text: '+ SettingsProfile.tsx · user.name confirmed', sign: '+' },
]

const stats: { label: string; value: string }[] = [
  { label: 'Affected', value: '4' },
  { label: 'Updated', value: '4' },
  { label: 'Unresolved', value: '0' },
]

const checks = ['Typecheck', 'Contract', 'Tests']

const copy: { text: string; className: string }[] = [
  {
    text: '일을 만드는 자동화는\n자동화가 아닙니다.',
    className:
      'text-[28px] leading-[1.3] font-bold tracking-tight sm:text-[36px]',
  },
  {
    text: '자동화한 결과를\n일일이 다시 확인해야 한다면,\n그건 일을 없앤 것이 아니라\n노동을 바꾼 것뿐입니다.',
    className: 'mt-6 text-[18px] leading-[1.6] text-main-black/65 sm:text-[20px]',
  },
  {
    text: 'IMPORTE가 만든\n수백 줄의 코드를\n매번 읽을 필요 없습니다.',
    className:
      'mt-6 text-[22px] leading-[1.4] font-semibold sm:text-[26px]',
  },
]

export function SectionReport() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.9', 'center 0.4'],
  })

  const diffOpacity = useTransform(scrollYProgress, [0, 1], [0.4, 0.06])
  const diffY = useTransform(scrollYProgress, [0, 1], [0, -28])
  const diffScale = useTransform(scrollYProgress, [0, 1], [1, 0.94])
  const cardScale = useTransform(scrollYProgress, [0, 1], [0.94, 1])
  const cardY = useTransform(scrollYProgress, [0, 1], [24, 0])

  return (
    <section className="bg-main-ivory px-6 py-28 text-main-black sm:px-10 lg:px-24">
      <div className="mx-auto max-w-[1320px]">
        <div className="max-w-[640px]">
          {copy.map((c, i) => (
            <motion.p
              key={c.text}
              className={`whitespace-pre-line ${c.className}`}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: 'easeOut' }}
            >
              {c.text}
            </motion.p>
          ))}

          <motion.p
            className="mt-6 text-[20px] leading-[1.4] font-bold text-brand-orange sm:text-[24px]"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            추측 없이,
            <br />
            확실한 연결을 구성하기에
          </motion.p>

          <motion.p
            className="mt-6 text-[18px] leading-[1.6] text-main-black/65 sm:text-[20px]"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            무엇이 바뀌었는지.
            <br />
            어디까지 연결됐는지.
            <br />
            무엇을 처리했는지.
            <br />
            검증은 끝났는지.
          </motion.p>

          <motion.p
            className="mt-6 text-[22px] leading-[1.4] font-bold sm:text-[26px]"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            필요한 것만 보고합니다.
          </motion.p>
        </div>

        <div ref={ref} className="relative mt-20 flex justify-center">
          {/* receding diff, evidence of the work done */}
          <motion.pre
            className="pointer-events-none absolute inset-x-0 top-6 mx-auto max-w-[720px] overflow-hidden font-mono text-[12px] leading-[1.9] text-main-black sm:text-[13px]"
            style={{ opacity: diffOpacity, y: diffY, scale: diffScale }}
          >
            {diffLines.map((line) => (
              <div key={line.text}>{line.text}</div>
            ))}
          </motion.pre>

          <motion.div
            className="relative w-full max-w-[620px] rounded-2xl border border-main-black/10 bg-main-black p-8 text-main-ivory shadow-[0_30px_60px_-20px_rgba(11,11,10,0.35)] sm:p-10"
            style={{ scale: cardScale, y: cardY }}
          >
            <p className="font-mono text-[13px] tracking-[0.2em] text-brand-orange uppercase">
              Reconciliation Complete
            </p>
            <p className="mt-3 font-mono text-[15px] text-secondary-text sm:text-[16px]">
              user.name <span className="text-main-ivory">→</span>{' '}
              user.displayName
            </p>

            <div className="mt-8 grid grid-cols-3 gap-4 border-t border-main-ivory/10 pt-6">
              {stats.map((s) => (
                <div key={s.label}>
                  <p className="text-[13px] text-secondary-text">{s.label}</p>
                  <p className="mt-1 text-[26px] font-semibold tracking-tight">
                    {s.value}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 border-t border-main-ivory/10 pt-6">
              {checks.map((c) => (
                <span
                  key={c}
                  className="inline-flex items-center gap-2 font-mono text-[13px] text-main-ivory"
                >
                  {c}
                  <span className="text-brand-orange">✓</span>
                </span>
              ))}
            </div>

            <div className="mt-8 border-t border-main-ivory/10 pt-6 text-center font-mono text-[13px] tracking-[0.15em] text-secondary-text uppercase">
              No Action Required
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
