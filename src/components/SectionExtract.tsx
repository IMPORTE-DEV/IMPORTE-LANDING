import { motion } from 'framer-motion'
import extractShot from '../assets/product/extract-required-contract.png'
import extractShotMobile from '../assets/product/extract-required-contract-mobile.png'

const copy: { text: string; className: string }[] = [
  {
    text: '프론트 전용 Swagger 추출',
    className:
      'text-[14px] font-semibold tracking-[0.04em] text-[#ab421a] sm:text-[15px]',
  },
  {
    text: 'API를 쓰는 코드에서,\n바로 문서로.',
    className:
      'mt-4 text-[30px] leading-[1.3] font-bold tracking-tight sm:text-[34px]',
  },
  {
    text: '엔드포인트와 필드,\n그리고 그 필드를 실제로 쓰는 위치까지.',
    className:
      'mt-6 text-[19px] leading-[1.6] text-main-black/65 sm:text-[21px]',
  },
  {
    text: '모르는 것은 추측해 채우지 않고,\n미확정으로 남깁니다.',
    className:
      'mt-6 text-[19px] leading-[1.6] text-main-black/65 sm:text-[21px]',
  },
]

export function SectionExtract() {
  return (
    <section
      id="extract"
      data-header-theme="light"
      className="scroll-mt-20 bg-main-ivory px-6 py-28 text-main-black sm:px-10 lg:px-24"
    >
      <div className="mx-auto grid max-w-[1320px] grid-cols-1 gap-16 lg:grid-cols-[2fr_3fr] lg:gap-10">
        <div className="max-w-[640px] lg:self-center">
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
        </div>

        <motion.figure
          className="w-full"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          {/* 좁은 화면에서는 줄이면 글씨가 읽히지 않는다 — 앱을 모바일 폭으로 띄워
              '기대하는 응답' 표만 찍은 것을 쓴다 */}
          <picture>
            <source
              media="(max-width: 639px)"
              srcSet={extractShotMobile}
              width={362}
              height={313}
            />
            <img
              src={extractShot}
              width={818}
              height={790}
              loading="lazy"
              alt="IMPORTE-FE의 GET /users/{id} 요구 계약. 쓰는 쪽 요구 계약으로 경로 · 쿼리 필드와 기대하는 응답 필드를 보여 주고, 필드마다 ProfileHeader.tsx:27 같은 사용 위치를 적는다. response.badge는 타입 미확정 · 위치 미확인으로 남아 있다."
              className="h-auto w-full rounded-xl border border-main-black/10 shadow-[0_30px_60px_-20px_rgba(11,11,10,0.35)]"
            />
          </picture>
          <figcaption className="mt-3 text-[13px] text-main-black/50">
            실제 제품 화면 · 예시 저장소
          </figcaption>
        </motion.figure>
      </div>
    </section>
  )
}
