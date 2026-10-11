import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const diffLines = [
  { text: '  // users.dto.ts', sign: ' ' },
  { text: '  export class UserResponse {', sign: ' ' },
  { text: '    id: string', sign: ' ' },
  { text: '-   name: string', sign: '-' },
  { text: '+   displayName: string', sign: '+' },
  { text: '    avatarUrl: string', sign: ' ' },
  { text: '  }', sign: ' ' },
  { text: '  // users.controller.ts', sign: ' ' },
  { text: '  @Get(\':id\') getUser(@Param(\'id\') id: string)', sign: ' ' },
  { text: '    return this.users.toResponse(user)', sign: ' ' },
]

const impacts: { location: string; confirmed: boolean }[] = [
  { location: 'ProfileHeader.tsx:27', confirmed: true },
  { location: 'UserCard.tsx:14', confirmed: true },
  { location: 'SettingsProfile.tsx:42', confirmed: true },
  { location: 'LegacyView.tsx', confirmed: false },
]

const copy: { text: string; className: string }[] = [
  {
    text: '일을 만드는 자동화는\n자동화가 아닙니다.',
    className:
      'text-[28px] leading-[1.3] font-bold tracking-tight sm:text-[36px]',
  },
  {
    text: '자동화가 수백 줄을 바꿔도,\n그 수백 줄을 다시 읽어야 한다면,',
    className: 'mt-6 text-[18px] leading-[1.6] text-main-black/65 sm:text-[20px]',
  },
  {
    text: '일이 사라진 게 아닙니다.\n검수라는 이름으로\n옮겨갔을 뿐입니다.',
    className:
      'mt-6 text-[22px] leading-[1.4] font-semibold sm:text-[26px]',
  },
  {
    text: 'IMPORTE는\n경고만 던지고 끝내지 않습니다.',
    className:
      'mt-10 text-[24px] leading-[1.35] font-bold tracking-tight sm:text-[28px]',
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
    <section
      id="report"
      data-header-theme="light"
      className="scroll-mt-20 bg-main-ivory px-6 pt-28 pb-24 text-main-black sm:px-10 lg:px-24"
    >
      <div className="mx-auto grid max-w-[1320px] grid-cols-1 gap-16 lg:grid-cols-[2fr_3fr] lg:items-center lg:gap-10">
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
            className="mt-8 text-[18px] leading-[1.6] text-main-black/65 sm:text-[20px]"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            무엇이 바뀌었는지.
            <br />
            어디까지 영향을 받았는지.
            <br />
            무엇이 확실하고,
            <br />
            무엇을 확인해야 하는지.
          </motion.p>

          <motion.p
            className="mt-6 text-[22px] leading-[1.4] font-bold sm:text-[26px]"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            결과와 근거만 확인하세요.
          </motion.p>
        </div>

        <div className="flex items-center">
          <div ref={ref} className="relative w-full">
            {/* receding diff, the provider change behind the report */}
            <motion.pre
              className="pointer-events-none absolute inset-x-0 top-6 mx-auto max-w-[520px] overflow-hidden font-mono text-[11px] leading-[1.9] text-main-black sm:text-[12px]"
              style={{ opacity: diffOpacity, y: diffY, scale: diffScale }}
            >
              {diffLines.map((line) => (
                <div key={line.text}>{line.text}</div>
              ))}
            </motion.pre>

            <motion.div
              className="relative mx-auto w-full max-w-[520px] rounded-2xl border border-main-black/10 bg-main-black p-8 text-main-ivory shadow-[0_30px_60px_-20px_rgba(11,11,10,0.35)] sm:p-10"
              style={{ scale: cardScale, y: cardY }}
            >
              <p className="text-[14px] font-semibold tracking-[0.04em] text-brand-orange">
                변경 리포트
              </p>
              <p className="mt-3 font-mono text-[15px] text-secondary-text sm:text-[16px]">
                GET /users/{'{id}'} · name{' '}
                <span className="text-main-ivory">→</span> displayName
              </p>

              <div className="mt-8 border-t border-main-ivory/10 pt-3">
                {impacts.map((item) => (
                  <div
                    key={item.location}
                    className="flex items-center justify-between gap-4 py-2.5 font-mono text-[13px] sm:text-[14px]"
                  >
                    <span className="truncate text-main-ivory">{item.location}</span>
                    {item.confirmed ? (
                      <span className="inline-flex shrink-0 items-center gap-2 font-sans font-medium text-main-ivory">
                        <span className="h-1.5 w-1.5 rounded-full bg-brand-orange" />
                        수정 필요
                      </span>
                    ) : (
                      <span className="shrink-0 font-sans font-medium text-secondary-text/60">
                        확인 필요
                      </span>
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-5 border-t border-main-ivory/10 pt-6 text-center text-[14px] text-secondary-text">
                확정 3곳 · 미확정 1곳 · 근거와 함께
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
