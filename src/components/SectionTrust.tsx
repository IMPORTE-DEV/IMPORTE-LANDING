import { motion } from 'framer-motion'
import { OMark } from './OMark'

const resolutions = [
  { component: 'ProfileHeader', ref: 'user.name', status: 'confirmed' as const },
  { component: 'UserCard', ref: 'user.name', status: 'confirmed' as const },
  { component: 'SettingsProfile', ref: 'user.name', status: 'confirmed' as const },
  { component: 'LegacyView', ref: 'user.name', status: 'unresolved' as const },
]

function ResolutionRow({
  item,
  index,
}: {
  item: (typeof resolutions)[number]
  index: number
}) {
  const confirmed = item.status === 'confirmed'
  return (
    <motion.div
      className="flex items-center justify-between border-b border-main-ivory/10 py-4 last:border-none"
      initial={{ opacity: 0, x: 12 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: 'easeOut' }}
    >
      <div>
        <p className="font-mono text-[15px] text-main-ivory">{item.component}</p>
        <p className="mt-0.5 font-mono text-[13px] text-secondary-text">
          {item.ref}
        </p>
      </div>
      {confirmed ? (
        <span className="inline-flex items-center gap-2 text-[13px] font-medium tracking-wide text-main-ivory">
          <motion.span
            className="h-1.5 w-1.5 rounded-full bg-brand-orange"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.3, delay: index * 0.1 + 0.25 }}
          />
          CONFIRMED
        </span>
      ) : (
        <span className="text-[13px] font-medium tracking-wide text-secondary-text/60">
          UNRESOLVED
        </span>
      )}
    </motion.div>
  )
}

const copy: { text: string; className: string }[] = [
  {
    text: '걱정하지 마세요.',
    className: 'text-[22px] font-medium text-secondary-text sm:text-[24px]',
  },
  {
    text: '신뢰할 수 없는 자동화는\n반쪽짜리 자동화입니다.',
    className:
      'mt-6 text-[24px] leading-[1.35] font-medium text-main-ivory sm:text-[28px]',
  },
  {
    text: '코드에서 반쪽이란\n아무것도 아닌 것과 다르지 않습니다.',
    className:
      'mt-6 text-[30px] leading-[1.3] font-bold tracking-tight text-main-ivory sm:text-[34px]',
  },
]

export function SectionTrust() {
  return (
    <section className="bg-main-black px-6 py-28 text-main-ivory sm:px-10 lg:px-24">
      <div className="mx-auto grid max-w-[1320px] grid-cols-1 gap-16 lg:grid-cols-[2fr_3fr] lg:gap-10">
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
            className="mt-10 text-[19px] leading-[1.6] text-secondary-text sm:text-[21px]"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            확실한 연결.
            <br />
            확실한 영향 파악.
          </motion.p>

          <motion.p
            className="mt-6 text-[26px] leading-[1.35] font-bold tracking-tight text-main-ivory sm:text-[30px]"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            IMPORTE는{' '}
            <span className="text-brand-orange">
              추측 없이,
              <br />
              확실한 연결을 구성합니다.
            </span>
          </motion.p>

          <motion.p
            className="mt-8 text-[19px] leading-[1.6] text-secondary-text sm:text-[21px]"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            확실한 것은 처리하고,
            <br />
            확실하지 않은 것은
            <br />
            어설프게 고치지 않습니다.
            <br />
            멈추고, 확인합니다.
          </motion.p>

          <motion.p
            className="mt-8 text-[19px] leading-[1.6] font-medium text-main-ivory sm:text-[21px]"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            모르는 것을 모른다고 말하는 것.
            <br />
            AI 시대의 새로운 덕목입니다.
          </motion.p>
        </div>

        <div className="flex items-center">
          <motion.div
            className="w-full rounded-xl border border-main-ivory/10 bg-secondary-black p-6 sm:p-8"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <div className="mb-2 flex items-center gap-2.5">
              <OMark size={16} ignited />
              <span className="font-mono text-xs tracking-[0.2em] text-secondary-text uppercase">
                Consumer Resolution
              </span>
            </div>
            <div>
              {resolutions.map((item, i) => (
                <ResolutionRow key={item.component} item={item} index={i} />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
