import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import differenceShot from '../assets/product/report-difference.png'
import differenceShotMobile from '../assets/product/report-difference-mobile.png'

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
            그래서 어디가 깨졌는지.
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

            <motion.figure
              className="relative mx-auto w-full max-w-[640px] pt-40 sm:pt-44"
              style={{ scale: cardScale, y: cardY }}
            >
              <picture>
                <source
                  media="(max-width: 639px)"
                  srcSet={differenceShotMobile}
                  width={396}
                  height={318}
                />
                <img
                  src={differenceShot}
                  width={818}
                  height={216}
                  loading="lazy"
                  alt="GET /users/{id}의 차이 카드. 쓰는 쪽 IMPORTE-FE와 주는 쪽 IMPORTE-BE를 맞대고, response.name이 제공 계약에 없다고 차이 있음으로 표시한다."
                  className="h-auto w-full rounded-xl border border-main-black/10 shadow-[0_30px_60px_-20px_rgba(11,11,10,0.35)]"
                />
              </picture>
              <figcaption className="mt-3 text-[13px] text-main-black/50">
                실제 제품 화면 · 예시 저장소
              </figcaption>
            </motion.figure>
          </div>
        </div>
      </div>
    </section>
  )
}
