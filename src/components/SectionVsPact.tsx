import { useState, type ReactNode } from 'react'
import { motion } from 'framer-motion'
import { pactComparison } from '../data/pactComparison'

type Endpoint = keyof typeof pactComparison
type Contract = (typeof pactComparison)[Endpoint]

const ENDPOINTS = Object.keys(pactComparison) as Endpoint[]
const SOURCE_URL =
  'https://github.com/muratkeremozcan/pact-js-example-react-consumer/tree/77a4667722b50195e923d815fc11d0709da123fa'

// 계약 영역은 개발자에게 익숙한 Swagger 기본색을 그대로 쓴다
const METHOD_COLOR: Record<string, string> = {
  GET: '#61affe',
  POST: '#49cc90',
  PUT: '#fca130',
  DELETE: '#f93e3e',
}

const copy: { text: string; className: string }[] = [
  {
    text: 'Pact와 나란히',
    className:
      'text-[14px] font-semibold tracking-[0.04em] text-brand-orange sm:text-[15px]',
  },
  {
    text: '테스트에 적은 계약과,\n코드가 쓰는 계약.',
    className:
      'mt-4 text-[30px] leading-[1.3] font-bold tracking-tight text-main-ivory sm:text-[34px]',
  },
  {
    text: '같은 저장소에서 Pact 소비자 테스트를 돌려 만든 Pact 파일과,\nIMPORTE가 코드에서 뽑은 요구 계약입니다.',
    className:
      'mt-6 text-[17px] leading-[1.6] text-secondary-text sm:text-[19px]',
  },
]

const facts = [
  '요청마다 실어 보내는 Authorization 헤더는 Pact 파일에 없습니다.',
  'Pact가 적어 둔 응답 필드 중 화면이 읽지 않는 것은 요구 계약에 없습니다.',
]

function MethodBadge({ method }: { method: string }) {
  return (
    <span
      className="inline-flex min-w-[64px] justify-center rounded px-3 py-1 font-mono text-[13px] font-bold text-[#0b0b0a]"
      style={{ background: METHOD_COLOR[method] }}
    >
      {method}
    </span>
  )
}

function Tag({
  tone,
  children,
}: {
  tone: 'missing' | 'unused' | 'warn'
  children: string
}) {
  const cls =
    tone === 'missing'
      ? 'bg-brand-orange/15 text-brand-orange'
      : tone === 'warn'
        ? 'bg-[#fca130]/15 text-[#fca130]'
        : 'bg-main-ivory/8 text-secondary-text'
  return (
    <span
      className={`ml-2 inline-block rounded px-1.5 py-0.5 align-middle font-sans text-[11px] font-medium ${cls}`}
    >
      {children}
    </span>
  )
}

function SourceLabel({ name, detail }: { name: string; detail: string }) {
  return (
    <p className="mb-3 flex items-baseline gap-3">
      <span className="text-[18px] font-bold text-main-ivory">{name}</span>
      <span className="text-[13px] text-secondary-text">{detail}</span>
    </p>
  )
}

function Block({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="overflow-hidden rounded-lg border border-main-ivory/8">
      <p className="bg-[#171717] px-4 py-2.5 text-[13px] font-semibold text-main-ivory">
        {title}
      </p>
      <div className="px-4 py-2">{children}</div>
    </div>
  )
}

// 좁은 화면에서는 칸을 쌓는다 — 옆으로 밀어야 보이는 사용 위치를 만들지 않는다
function Row({
  field,
  type,
  where,
  dim,
}: {
  field: ReactNode
  type?: ReactNode
  where: ReactNode
  dim?: boolean
}) {
  // type 이 없으면(Pact 쪽) 필드 · 예시 두 칸
  const cols =
    type === undefined
      ? 'sm:grid-cols-[1.4fr_1fr]'
      : 'sm:grid-cols-[1.2fr_0.55fr_1.85fr]'
  return (
    <div
      className={`grid grid-cols-1 gap-x-4 gap-y-0.5 border-t border-main-ivory/6 py-2 text-[13px] first:border-t-0 ${cols} ${dim ? 'opacity-55' : ''}`}
    >
      <div className="min-w-0 font-mono text-main-ivory [overflow-wrap:anywhere]">
        {field}
      </div>
      {type === undefined ? null : (
        <div className="min-w-0 text-secondary-text">{type}</div>
      )}
      <div className="min-w-0 text-secondary-text [overflow-wrap:anywhere]">
        {where}
      </div>
    </div>
  )
}

function Empty({ children }: { children: string }) {
  return <p className="py-2 text-[13px] text-secondary-text/80">{children}</p>
}

function Location({
  file,
  line,
  symbol,
}: {
  file: string
  line: number
  symbol: string
}) {
  return (
    <>
      {/* 긴 경로가 줄바꿈되면 이 카드만 길어진다 — 파일 이름:줄만, 전체 경로는 title */}
      <span className="font-mono text-[12px]" title={`${file}:${line}`}>
        {file.split('/').pop()}:{line}
      </span>
      <span className="text-[12px] text-secondary-text/80"> · {symbol}</span>
    </>
  )
}

function ImporteSide({ c }: { c: Contract }) {
  const pactHeaders = new Set<string>(c.pact.flatMap((i) => i.headers))
  const pactResponse = new Set<string>(
    c.pact.flatMap((i) => i.response.map(([p]) => p)),
  )
  const anchor = c.anchors[0]
  return (
    <div className="space-y-4">
      <div>
        <p className="text-[15px] font-bold text-main-ivory">
          쓰는 쪽 · 요구 계약
        </p>
        <p className="text-[12px] text-secondary-text">
          분석 영역 · 저장소 루트
        </p>
      </div>
      <Block title="경로 · 쿼리 · 헤더">
        {c.request.map((r) => (
          <Row
            key={r.name}
            field={
              <>
                {r.name}
                {r.name.startsWith('header.') &&
                !pactHeaders.has(r.name.slice('header.'.length)) ? (
                  <Tag tone="missing">Pact에 없음</Tag>
                ) : null}
              </>
            }
            type={r.type ?? '타입 미확정'}
            where={<Location {...anchor} />}
          />
        ))}
      </Block>
      <Block title="요청 본문">
        {c.body.length ? (
          c.body.map((b) => (
            <Row
              key={b.name}
              field={b.name}
              type={b.type ?? '타입 미확정'}
              where={<Location {...anchor} />}
            />
          ))
        ) : (
          <Empty>확인된 본문 필드 없음</Empty>
        )}
      </Block>
      <Block title="기대하는 응답">
        {c.response.length ? (
          c.response.map((f) => (
            <Row
              key={f.path}
              field={
                <>
                  response.{f.path}
                  {!pactResponse.has(f.path) ? (
                    <Tag tone="missing">Pact에 없음</Tag>
                  ) : null}
                </>
              }
              type={
                f.notInType ? (
                  <span className="text-[#fca130]">타입에 없음</span>
                ) : (
                  (f.type ?? '타입 미확정')
                )
              }
              where={<Location {...f.usedAt} />}
            />
          ))
        ) : (
          <Empty>화면이 읽는 응답 필드 없음</Empty>
        )}
      </Block>
    </div>
  )
}

function PactSide({ c }: { c: Contract }) {
  // 하위 필드를 읽으면 그 자리도 쓴 것이다 — 빈 목록 상호작용의 `data[*]` 는 화면이 `data[*].name` 을 읽는다
  const read = c.response.map((f) => f.path as string)
  const isRead = (p: string) =>
    read.some((r) => r === p || r.startsWith(p + '.') || r.startsWith(p + '['))
  return (
    <div className="space-y-4">
      <div>
        <p className="text-[15px] font-bold text-main-ivory">
          상호작용 {c.pact.length}개
        </p>
        <p className="text-[12px] text-secondary-text">
          ReactConsumer → MoviesAPI
        </p>
      </div>
      {c.pact.map((i, n) => (
        <Block key={n} title={`${i.description} · ${i.status}`}>
          {i.given.length ? (
            <p className="pt-1 pb-1 text-[12px] text-secondary-text/80">
              given · {i.given.join(', ')}
            </p>
          ) : null}
          {[
            ...i.query.map((q) => `query.${q}`),
            ...i.headers.map((h) => `header.${h}`),
            ...i.requestBody.map((b) => `body.${b}`),
          ].map((name) => (
            <Row key={name} field={name} where="요청" />
          ))}
          {i.response.length ? (
            i.response.map(([p, example]) => {
              const unused = !isRead(p)
              return (
                <Row
                  key={p}
                  dim={unused}
                  field={
                    <>
                      response.{p}
                      {unused ? <Tag tone="unused">화면이 안 읽음</Tag> : null}
                    </>
                  }
                  where={
                    <span className="font-mono text-[12px]">{example}</span>
                  }
                />
              )
            })
          ) : (
            <Empty>응답 본문 없음</Empty>
          )}
        </Block>
      ))}
    </div>
  )
}

export function SectionVsPact() {
  const [current, setCurrent] = useState<Endpoint>('GET /movies/{id}')
  const c = pactComparison[current]

  return (
    <section
      id="vs-pact"
      data-header-theme="dark"
      className="scroll-mt-20 bg-main-black px-6 py-28 text-main-ivory sm:px-10 lg:px-24"
    >
      <div className="mx-auto max-w-[1320px]">
        <div className="max-w-[760px]">
          {copy.map((t, i) => (
            <motion.p
              key={t.text}
              className={`whitespace-pre-line ${t.className}`}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: 'easeOut' }}
            >
              {t.text}
            </motion.p>
          ))}
          <ul className="mt-6 space-y-2 text-[16px] leading-[1.6] text-main-ivory/90 sm:text-[17px]">
            {facts.map((f) => (
              <li key={f} className="flex gap-3">
                <span
                  aria-hidden
                  className="mt-[0.7em] h-1.5 w-1.5 shrink-0 rounded-full bg-brand-orange"
                />
                {f}
              </li>
            ))}
          </ul>
        </div>

        <div
          className="mt-12 flex flex-wrap gap-2"
          role="group"
          aria-label="엔드포인트"
        >
          {ENDPOINTS.map((ep) => {
            const on = ep === current
            const [method, path] = ep.split(' ')
            return (
              <button
                key={ep}
                type="button"
                aria-pressed={on}
                onClick={() => setCurrent(ep)}
                className={`flex items-center gap-2 rounded-md border px-3 py-1.5 font-mono text-[13px] transition-colors ${on ? 'border-main-ivory/40 bg-main-ivory/8 text-main-ivory' : 'border-main-ivory/10 text-secondary-text hover:border-main-ivory/25'}`}
              >
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ background: METHOD_COLOR[method] }}
                  aria-hidden
                />
                {method} {path}
              </button>
            )
          })}
        </div>

        <motion.figure
          className="mt-6"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          {/* 출처가 다른 두 계약 — 한 틀에 넣지 않고 카드를 나눈다 */}
          <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-2 lg:gap-6">
            <div>
              <SourceLabel
                name="Pact"
                detail="소비자 테스트를 돌려 생성한 Pact 파일"
              />
              <div className="overflow-hidden rounded-xl border border-main-ivory/12 bg-[#141414]">
                <div className="flex items-center gap-3 border-b border-main-ivory/10 px-4 py-3">
                  <span className="font-mono text-[13px] font-bold text-secondary-text">
                    {c.method}
                  </span>
                  <span className="font-mono text-[17px] text-main-ivory sm:text-[19px]">
                    {c.path}
                  </span>
                </div>
                <div className="p-5 sm:p-6">
                  <PactSide c={c} />
                </div>
              </div>
            </div>
            <div>
              <SourceLabel
                name="IMPORTE"
                detail="같은 커밋의 코드에서 추출한 요구 계약"
              />
              <div className="overflow-hidden rounded-xl border border-[#61affe]/40 bg-[#1d232a]">
                <div className="flex items-center gap-4 border-b border-[#61affe]/30 px-3 py-2.5">
                  <MethodBadge method={c.method} />
                  <span className="font-mono text-[17px] text-main-ivory sm:text-[19px]">
                    {c.path}
                  </span>
                </div>
                <div className="p-5 sm:p-6">
                  <ImporteSide c={c} />
                </div>
              </div>
            </div>
          </div>
          <figcaption className="mt-3 text-[13px] text-secondary-text/70">
            실제 Pact 파일 · 실제 분석 결과 ·{' '}
            <a
              href={SOURCE_URL}
              target="_blank"
              rel="noreferrer"
              className="underline underline-offset-2 hover:text-main-ivory"
            >
              muratkeremozcan/pact-js-example-react-consumer
            </a>{' '}
            @77a4667
          </figcaption>
        </motion.figure>
      </div>
    </section>
  )
}
