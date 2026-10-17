// 실제 Pact 파일 + IMPORTE 분석 결과(운영 조건)에서 랜딩 비교 데이터를 만든다 — 손으로 옮기지 않는다
// node scripts/gen-pact-comparison.cjs <pacts/ReactConsumer-MoviesAPI-bi-directional.json> <fe-analyzer --out 결과 JSON> src/data/pactComparison.ts
const fs = require('node:fs');
const [pactPath, graphPath, outPath] = process.argv.slice(2);
const pact = JSON.parse(fs.readFileSync(pactPath, 'utf8'));
const graph = JSON.parse(fs.readFileSync(graphPath, 'utf8'));
const MOVIE_TYPES = { id: 'number', name: 'string', year: 'number', rating: 'number', director: 'string' };
const ORDER = ['GET /movies/{id}', 'GET /movies', 'POST /movies', 'PUT /movies/{id}', 'DELETE /movies/{id}'];
const templ = (method, path) => method + ' ' + path.replace(/^\/movies\/\d+$/, '/movies/{id}');
const flatten = (v, pre, out) => {
  if (Array.isArray(v)) { if (!v.length) out.push([pre + '[*]', '[]']); else flatten(v[0], pre + '[*]', out); }
  else if (v && typeof v === 'object') for (const k of Object.keys(v).sort()) flatten(v[k], pre ? pre + '.' + k : k, out);
  else out.push([pre, JSON.stringify(v)]);
  return out;
};
const leafType = (p) => { const k = p.split('.').pop(); return MOVIE_TYPES[k] || null; };
const out = {};
for (const ep of ORDER) {
  const c = graph.contracts.find((x) => x.endpoint === ep);
  const interactions = pact.interactions.filter((i) => templ(i.request.method, i.request.path) === ep).map((i) => {
    const body = i.response.body ? i.response.body.content ?? i.response.body : null;
    const reqBody = i.request.body ? i.request.body.content ?? i.request.body : null;
    return {
      description: i.description,
      given: (i.providerStates || []).map((s) => s.name),
      status: i.response.status,
      query: Object.keys(i.request.query || {}),
      headers: Object.keys(i.request.headers || {}),
      requestBody: reqBody ? flatten(reqBody, '', []).map(([p]) => p) : [],
      response: body ? flatten(body, '', []) : [],
    };
  });
  const paths = c.response.fields.map((f) => f.path);
  const leaves = c.response.fields.filter((f) => !paths.some((p) => p !== f.path && (p.startsWith(f.path + '.') || p.startsWith(f.path + '['))));
  const site = (a) => ({ file: a.file, line: a.line, symbol: a.symbol });
  out[ep] = {
    method: c.method,
    path: c.structuralPath,
    anchors: c.anchors.map(site),
    // 경로 · 쿼리 · 헤더 · 본문 — 타입은 이 저장소가 선언한 타입(consumer.ts · movie-types.ts)에서
    request: [
      ...(c.request.params || []).map((p) => ({ name: 'path.' + p.name, type: MOVIE_TYPES[p.name] || null })),
      ...(c.request.query || []).map((q) => ({ name: 'query.' + q.name, type: 'string' })),
      ...(c.request.headers || []).map((h) => ({ name: 'header.' + h.name, type: 'string' })),
    ],
    body: (c.request.body.fields || []).map((b) => ({ name: 'body.' + b.path, type: leafType(b.path) })).sort((a, b) => a.name.localeCompare(b.name)),
    response: leaves.map((f) => ({
      path: f.path,
      type: f.inType === false ? null : leafType(f.path),
      notInType: f.inType === false,
      usedAt: { file: f.consumers[0].file, line: f.consumers[0].line, symbol: f.consumers[0].subject },
    })),
    pact: interactions,
  };
}
const banner = `// 생성 파일 — 손으로 고치지 않는다.\n// Pact: muratkeremozcan/pact-js-example-react-consumer @77a4667 의 소비자 테스트를 실행해 만든 pacts/ReactConsumer-MoviesAPI-bi-directional.json\n// IMPORTE: 같은 커밋을 IMPORTE fe-analyzer(타입 선언 받기 포함)로 분석한 결과\n`;
fs.writeFileSync(outPath, banner + 'export const pactComparison = ' + JSON.stringify(out, null, 2) + ' as const\n', 'utf8');
console.log('ok', Object.keys(out).length);
