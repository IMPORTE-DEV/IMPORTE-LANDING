import { forwardRef, useLayoutEffect, useRef, useState } from 'react'
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from 'framer-motion'
import { OMark } from './OMark'

const rows = [
  { backend: 'Router', frontend: 'Type' },
  { backend: 'Schema', frontend: 'Client' },
  { backend: 'Logic', frontend: 'Consumer' },
]

const Box = forwardRef<HTMLDivElement, { label: string }>(function Box(
  { label },
  ref,
) {
  return (
    <div
      ref={ref}
      className="relative z-10 shrink-0 rounded-md border border-main-black/15 bg-main-ivory px-4 py-2.5 font-mono text-sm text-main-black sm:text-base"
    >
      {label}
    </div>
  )
})

type Point = { bx: number; by: number; fx: number; fy: number }
type Geometry = {
  size: { w: number; h: number }
  center: { x: number; y: number }
  points: Point[]
}

const O_GAP = 34

/** Point along the from→to segment, stopped `gap` short of `to` — keeps lines clear of the O. */
function pullBack(
  from: { x: number; y: number },
  to: { x: number; y: number },
  gap: number,
) {
  const dx = to.x - from.x
  const dy = to.y - from.y
  const len = Math.hypot(dx, dy) || 1
  const t = Math.max(0, (len - gap) / len)
  return { x: from.x + dx * t, y: from.y + dy * t }
}

function ConnectorLines({
  index,
  point,
  center,
  scrollYProgress,
}: {
  index: number
  point: Point
  center: { x: number; y: number }
  scrollYProgress: MotionValue<number>
}) {
  const start = 0.18 + index * 0.16
  const end = start + 0.24
  const progress = useTransform(scrollYProgress, [start, end], [0, 1])
  const color = useTransform(
    progress,
    [0, 0.96, 1],
    ['#E9652B', '#E9652B', '#0B0B0A'],
  )

  const backendEnd = pullBack({ x: point.bx, y: point.by }, center, O_GAP)
  const frontendStart = pullBack({ x: point.fx, y: point.fy }, center, O_GAP)

  return (
    <>
      <motion.line
        x1={point.bx}
        y1={point.by}
        x2={backendEnd.x}
        y2={backendEnd.y}
        strokeWidth={2}
        strokeLinecap="round"
        style={{ stroke: color, pathLength: progress }}
      />
      <motion.line
        x1={frontendStart.x}
        y1={frontendStart.y}
        x2={point.fx}
        y2={point.fy}
        strokeWidth={2}
        strokeLinecap="round"
        style={{ stroke: color, pathLength: progress }}
      />
    </>
  )
}

function ConnectionDiagram() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const backendRefs = useRef<(HTMLDivElement | null)[]>([])
  const frontendRefs = useRef<(HTMLDivElement | null)[]>([])
  const [geometry, setGeometry] = useState<Geometry | null>(null)

  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ['start 0.85', 'start 0.15'],
  })

  const oScale = useTransform(scrollYProgress, [0.05, 0.35], [0.3, 1])
  const oOpacity = useTransform(scrollYProgress, [0.05, 0.3], [0, 1])

  useLayoutEffect(() => {
    const container = containerRef.current
    if (!container) return

    const measure = () => {
      const box = container.getBoundingClientRect()
      if (box.width === 0) return

      const points = rows.map((_, i) => {
        const b = backendRefs.current[i]?.getBoundingClientRect()
        const f = frontendRefs.current[i]?.getBoundingClientRect()
        if (!b || !f) return { bx: 0, by: 0, fx: 0, fy: 0 }
        return {
          bx: b.right - box.left,
          by: b.top + b.height / 2 - box.top,
          fx: f.left - box.left,
          fy: f.top + f.height / 2 - box.top,
        }
      })

      const mid = points[Math.floor(rows.length / 2)]
      setGeometry({
        size: { w: box.width, h: box.height },
        center: mid ? { x: (mid.bx + mid.fx) / 2, y: mid.by } : { x: 0, y: 0 },
        points,
      })
    }

    measure()

    const ro = new ResizeObserver(measure)
    ro.observe(container)
    backendRefs.current.forEach((el) => el && ro.observe(el))
    frontendRefs.current.forEach((el) => el && ro.observe(el))
    document.fonts?.ready?.then(measure)

    return () => ro.disconnect()
  }, [])

  return (
    <div ref={scrollRef} className="relative w-full">
      <div className="mb-8 flex justify-between px-1 font-mono text-xs tracking-[0.2em] text-main-black/65 uppercase sm:text-sm">
        <span>Backend</span>
        <span>Frontend</span>
      </div>

      <div ref={containerRef} className="relative flex flex-col gap-10 sm:gap-14">
        {rows.map((row, i) => (
          <div key={row.backend} className="flex items-center justify-between gap-3">
            <Box
              ref={(el) => {
                backendRefs.current[i] = el
              }}
              label={row.backend}
            />
            <div className="flex-1" />
            <Box
              ref={(el) => {
                frontendRefs.current[i] = el
              }}
              label={row.frontend}
            />
          </div>
        ))}

        {geometry && (
          <svg
            className="pointer-events-none absolute inset-0"
            width={geometry.size.w}
            height={geometry.size.h}
            viewBox={`0 0 ${geometry.size.w} ${geometry.size.h}`}
          >
            {rows.map((row, i) => (
              <ConnectorLines
                key={row.backend}
                index={i}
                point={geometry.points[i]}
                center={geometry.center}
                scrollYProgress={scrollYProgress}
              />
            ))}
          </svg>
        )}

        {geometry && (
          <motion.div
            className="pointer-events-none absolute"
            style={{
              left: geometry.center.x,
              top: geometry.center.y,
              x: '-50%',
              y: '-50%',
              scale: oScale,
              opacity: oOpacity,
            }}
          >
            <OMark size={52} ignited pulse onLight />
          </motion.div>
        )}
      </div>
    </div>
  )
}

const paragraphs: { text: string; emphasis?: boolean }[] = [
  { text: '연결은 끝났습니다.', emphasis: true },
  { text: 'Backend와 Frontend의 연결은\n항상 비슷합니다.' },
  { text: '같은 구조.\n같은 Router.\n같은 Schema.\n같은 Type.\n같은 Client.' },
  { text: '이미 정해진 의미를\n다른 코드로 다시 옮기는 일.' },
]

export function SectionDefinition() {
  return (
    <section
      id="connection"
      data-header-theme="light"
      className="scroll-mt-20 bg-main-ivory px-6 py-28 text-main-black sm:px-10 lg:px-24"
    >
      <div className="mx-auto grid max-w-[1320px] grid-cols-1 gap-16 lg:grid-cols-[2fr_3fr] lg:gap-10">
        <div className="max-w-[640px]">
          {paragraphs.map((p, i) => (
            <motion.p
              key={p.text}
              className={
                p.emphasis
                  ? 'text-[32px] leading-[1.2] font-bold tracking-tight sm:text-[40px]'
                  : 'mt-8 text-[19px] leading-[1.6] whitespace-pre-line text-main-black/70 sm:text-[21px]'
              }
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.6, delay: i * 0.05, ease: 'easeOut' }}
            >
              {p.text}
            </motion.p>
          ))}

          <motion.p
            className="mt-10 text-[26px] leading-[1.3] font-bold tracking-tight sm:text-[32px]"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            그런데 왜 매번
            <br />
            사람이 다시 짜야 하나요?
          </motion.p>

          <motion.p
            className="mt-8 text-[19px] leading-[1.6] text-main-black/70 sm:text-[21px]"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            처음 연결할 때부터,
            <br />
            무언가 바뀐 다음까지.
          </motion.p>

          <motion.p
            className="mt-8 text-[26px] leading-[1.3] font-bold tracking-tight text-brand-orange sm:text-[30px]"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            IMPORTE가 연결합니다.
          </motion.p>
        </div>

        <div className="flex items-center">
          <ConnectionDiagram />
        </div>
      </div>
    </section>
  )
}
