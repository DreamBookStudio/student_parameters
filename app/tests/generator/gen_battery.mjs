// ============================================================================
// gen_battery.mjs — builds & validates app/tests/battery.json
// Programmatic where correctness matters: span sequences, opspan equations,
// comparison-pair grid, rotation-shape asymmetry proofs, paper-fold unfolding
// math, series/CRT/estimation arithmetic verification.
// Run: node gen_battery.mjs <output-path>
// ============================================================================
import * as D from "./gen_data.mjs";
import fs from "fs";

// ---------- deterministic RNG (build-time seed → reproducible bank) ----------
function mulberry32(a) { return function () { a |= 0; a = (a + 0x6D2B79F5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }
const rng = mulberry32(20260713);
const ri = (n) => Math.floor(rng() * n);
const pick = (arr) => arr[ri(arr.length)];
function shuffle(a) { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = ri(i + 1); [a[i], a[j]] = [a[j], a[i]]; } return a; }

const fail = (msg) => { throw new Error("VALIDATION: " + msg); };
const assert = (c, msg) => { if (!c) fail(msg); };

// ============================================================================
// 1) Backward digit span sequences (rules per research/tests/02 §1.3)
// ============================================================================
function validSeq(s) {
  for (let i = 0; i + 2 < s.length; i++) {
    if (s[i + 1] - s[i] === 1 && s[i + 2] - s[i + 1] === 1) return false;   // asc run
    if (s[i + 1] - s[i] === -1 && s[i + 2] - s[i + 1] === -1) return false; // desc run
  }
  if (new Set(s).size !== s.length) return false;                            // repeats
  for (let i = 0; i + 1 < s.length; i++) if (Math.abs(s[i + 1] - s[i]) <= 1) return false; // adjacent-value neighbours
  const str = s.join("");
  for (let i = 0; i + 3 < str.length + 1; i++) { const w = str.slice(i, i + 4); if (/^(19|20)\d\d$/.test(w)) return false; }
  return true;
}
function genSeq(len) {
  for (let t = 0; t < 5000; t++) {
    const s = []; while (s.length < len) { const d = 1 + ri(9); if (!s.includes(d)) s.push(d); }
    if (validSeq(s)) return s;
  }
  fail("no valid sequence len " + len);
}
const BWD_SIZES = [3, 3, 4, 4, 5, 5, 6, 6, 7];
const backward = {
  practice: [{ id: "BW_P1", seq: genSeq(2) }, { id: "BW_P2", seq: genSeq(3) }],
  trials: BWD_SIZES.map((sz, i) => ({ slot: i, size: sz, candidates: [{ id: `BW_${i}a`, seq: genSeq(sz) }, { id: `BW_${i}b`, seq: genSeq(sz) }] }))
};
backward.practice.forEach(p => assert(validSeq(p.seq), "practice seq"));
backward.trials.forEach(t => t.candidates.forEach(c => assert(validSeq(c.seq), "seq " + c.id)));

// ============================================================================
// 2) Operation span (letters F,H,J,K,L,N,P,Q,R,S,T,Y; eq 50% true, off by small margin)
// ============================================================================
const OSP_LETTERS = ["F", "H", "J", "K", "L", "N", "P", "Q", "R", "S", "T", "Y"];
function genEq(truth) {
  for (let t = 0; t < 999; t++) {
    const a = 2 + ri(7), b = 2 + ri(7), c = 1 + ri(8);
    const plus = rng() < 0.5;
    const val = plus ? a * b + c : a * b - c;
    if (val < 1 || val > 60) continue;
    let shown = val;
    if (!truth) { shown = val + (rng() < 0.5 ? -1 : 1) * (1 + ri(2)); if (shown < 1 || shown === val) continue; }
    return { eq: `(${a} × ${b}) ${plus ? "+" : "−"} ${c}`, shown, truth };
  }
  fail("eq gen");
}
function genOspTrial(id, size) {
  const letters = shuffle(OSP_LETTERS).slice(0, size);
  const nTrue = Math.round(size / 2);
  const truths = shuffle([...Array(size)].map((_, i) => i < nTrue));
  return { id, size, elements: letters.map((L, i) => ({ ...genEq(truths[i]), letter: L })) };
}
const OSP_SIZES = [3, 4, 5, 6];
const opspan = {
  letterGrid: OSP_LETTERS,
  practice: [genOspTrial("OS_P1", 2)],
  trials: OSP_SIZES.map((sz, i) => ({ slot: i, size: sz, candidates: [genOspTrial(`OS_${i}a`, sz), genOspTrial(`OS_${i}b`, sz)] }))
};
opspan.trials.forEach(t => t.candidates.forEach(c => {
  assert(new Set(c.elements.map(e => e.letter)).size === c.size, "osp letters unique " + c.id);
  c.elements.forEach(e => { const m = e.eq.match(/\((\d) × (\d)\) ([+−]) (\d)/); const v = m[3] === "+" ? +m[1] * +m[2] + +m[4] : +m[1] * +m[2] - +m[4]; assert((v === e.shown) === e.truth, "eq truth " + c.id); });
}));

// ============================================================================
// 3) Rotation shapes — asymmetry proofs
// ============================================================================
const SHAPES = {
  F: [[1, 0], [2, 0], [0, 1], [1, 1], [1, 2]],
  Y: [[0, 1], [1, 0], [1, 1], [1, 2], [1, 3]],
  P: [[0, 0], [0, 1], [0, 2], [1, 1], [1, 2]],
  N: [[0, 0], [0, 1], [1, 1], [1, 2], [1, 3]],
  L6: [[0, 0], [0, 1], [0, 2], [0, 3], [1, 0], [2, 0]]
};
const norm = (cells) => { const mx = Math.min(...cells.map(c => c[0])), my = Math.min(...cells.map(c => c[1])); return cells.map(([x, y]) => [x - mx, y - my]).sort((a, b) => a[0] - b[0] || a[1] - b[1]); };
const key = (cells) => JSON.stringify(norm(cells));
const rot90 = (cells) => cells.map(([x, y]) => [-y, x]);
const mirror = (cells) => cells.map(([x, y]) => [-x, y]);
for (const [name, cells] of Object.entries(SHAPES)) {
  const k0 = key(cells); let r = cells;
  for (let i = 1; i <= 3; i++) { r = rot90(r); assert(key(r) !== k0, `${name} has ${i * 90}° rotational symmetry`); }
  let m = mirror(cells);
  for (let i = 0; i <= 3; i++) { assert(key(m) !== k0, `${name} mirror equals rotation ${i * 90}°`); m = rot90(m); }
}
// 8 scored (angles ×2, same/mirror balanced) + 3 spares
const ROT_TRIALS = [
  { id: "RT_01", shape: "F", angle: 45, mirrored: false, difficulty: 2 },
  { id: "RT_02", shape: "Y", angle: 45, mirrored: true, difficulty: 2 },
  { id: "RT_03", shape: "P", angle: 90, mirrored: true, difficulty: 3 },
  { id: "RT_04", shape: "N", angle: 90, mirrored: false, difficulty: 3 },
  { id: "RT_05", shape: "L6", angle: 135, mirrored: false, difficulty: 4 },
  { id: "RT_06", shape: "F", angle: 135, mirrored: true, difficulty: 4 },
  { id: "RT_07", shape: "P", angle: 180, mirrored: true, difficulty: 4 },
  { id: "RT_08", shape: "Y", angle: 180, mirrored: false, difficulty: 4 },
  { id: "RT_09", shape: "N", angle: 90, mirrored: true, difficulty: 3, spare: true },
  { id: "RT_10", shape: "L6", angle: 180, mirrored: true, difficulty: 4, spare: true },
  { id: "RT_11", shape: "P", angle: 135, mirrored: false, difficulty: 4, spare: true }
];
const ROT_PRACTICE = [
  { id: "RT_P1", shape: "F", angle: 90, mirrored: false },
  { id: "RT_P2", shape: "P", angle: 45, mirrored: true }
];

// ============================================================================
// 4) Paper folding — fold math + option construction
// ============================================================================
// Fold defs: predicate M = moved region, reflect ρ. Unfold: S ∪ ρ(S) where ρ(q)∈M.
const FOLDS = {
  L2R: { m: ([x]) => x < 0.5, r: ([x, y]) => [1 - x, y], line: [[0.5, 0], [0.5, 1]] },
  R2L: { m: ([x]) => x > 0.5, r: ([x, y]) => [1 - x, y], line: [[0.5, 0], [0.5, 1]] },
  T2B: { m: ([, y]) => y > 0.5, r: ([x, y]) => [x, 1 - y], line: [[0, 0.5], [1, 0.5]] },
  B2T: { m: ([, y]) => y < 0.5, r: ([x, y]) => [x, 1 - y], line: [[0, 0.5], [1, 0.5]] },
  D1: { m: ([x, y]) => y < x, r: ([x, y]) => [y, x], line: [[0, 0], [1, 1]] },            // fold below-diagonal up-left
  Q3: { m: ([x]) => x < 0.75 && x > 0.5, r: ([x, y]) => [1.5 - x, y], line: [[0.75, 0], [0.75, 1]] }, // fold [0.5,0.75] strip onto [0.75,1]
  DQ: { m: ([x, y]) => y > x - 0.5, r: ([x, y]) => [y + 0.5, x - 0.5], line: [[0.5, 0], [1, 0.5]] }   // diagonal of bottom-right quarter
};
const rnd3 = (v) => Math.round(v * 1000) / 1000;
function unfold(folds, punches) {
  let pts = punches.map(p => p.slice());
  for (let i = folds.length - 1; i >= 0; i--) {
    const f = FOLDS[folds[i]];
    const add = [];
    for (const q of pts) {
      const m = f.r(q);
      if (m[0] >= -1e-9 && m[0] <= 1 + 1e-9 && m[1] >= -1e-9 && m[1] <= 1 + 1e-9 && f.m(m)) add.push(m);
    }
    pts = pts.concat(add);
  }
  const seen = new Set();
  return pts.map(p => [rnd3(p[0]), rnd3(p[1])]).filter(p => { const k = p.join(","); if (seen.has(k)) return false; seen.add(k); return true; })
    .sort((a, b) => a[0] - b[0] || a[1] - b[1]);
}
const patKey = (pts) => JSON.stringify(pts.map(p => p.join(",")));
function foldItem(id, difficulty, folds, punches, outlines, distractorFns) {
  const correct = unfold(folds, punches);
  const opts = [correct];
  for (const fn of distractorFns) {
    const d = fn(correct, folds, punches).map(p => [rnd3(p[0]), rnd3(p[1])]).sort((a, b) => a[0] - b[0] || a[1] - b[1]);
    assert(patKey(d) !== patKey(correct), id + " distractor equals correct");
    assert(!opts.some(o => patKey(o) === patKey(d)), id + " duplicate distractor");
    opts.push(d);
  }
  const order = shuffle([0, 1, 2, 3]);
  const options = order.map(i => opts[i]);
  return { id, difficulty, folds, punches, outlines, options, ans: order.indexOf(0) };
}
// distractor helpers
const dropOne = (c) => c.slice(0, c.length - 1);
const wrongAxis = (axis) => (c) => { const s = new Set(c.map(p => p.join(","))); const out = c.slice(); for (const p of c) { const q = axis === "v" ? [1 - p[0], p[1]] : [p[0], 1 - p[1]]; if (!s.has(q.join(","))) { out.push(q); s.add(q.join(",")); } } return out.slice(0, c.length + Math.max(1, Math.floor(c.length / 2))); };
const shifted = (dx, dy) => (c) => c.map(p => [Math.min(0.95, Math.max(0.05, p[0] + dx)), Math.min(0.95, Math.max(0.05, p[1] + dy))]);
const extraDouble = (axis) => (c) => { const s = new Set(c.map(p => p.join(","))); const out = c.slice(); for (const p of c) { const q = axis === "v" ? [1 - p[0], p[1]] : [p[0], 1 - p[1]]; const k = q.join(","); if (!s.has(k)) { out.push(q); s.add(k); } } return out; };
const antiDiag = () => (c) => c.map(p => [1 - p[1], 1 - p[0]]);

const SQ = [[0, 0], [1, 0], [1, 1], [0, 1]];
const FOLD_ITEMS = [
  foldItem("PF_E1", 1, ["L2R"], [[0.7, 0.65]],
    [{ outline: SQ, line: FOLDS.L2R.line, arrow: [[0.15, 0.5], [0.85, 0.5]] }, { outline: [[0.5, 0], [1, 0], [1, 1], [0.5, 1]] }],
    [dropOne, (c) => [[0.7, 0.65], [0.7, 0.35]], shifted(0.12, 0)]),
  foldItem("PF_E2", 2, ["L2R", "T2B"], [[0.75, 0.25]],
    [{ outline: SQ, line: FOLDS.L2R.line, arrow: [[0.15, 0.5], [0.85, 0.5]] },
     { outline: [[0.5, 0], [1, 0], [1, 1], [0.5, 1]], line: [[0.5, 0.5], [1, 0.5]], arrow: [[0.75, 0.9], [0.75, 0.1]] },
     { outline: [[0.5, 0], [1, 0], [1, 0.5], [0.5, 0.5]] }],
    [(c) => [[0.75, 0.25], [0.25, 0.25]], (c) => [[0.75, 0.25], [0.25, 0.25], [0.75, 0.75]], shifted(-0.1, 0.1)]),
  foldItem("PF_M1", 3, ["B2T", "R2L"], [[0.15, 0.85], [0.4, 0.6]],
    [{ outline: SQ, line: FOLDS.B2T.line, arrow: [[0.5, 0.1], [0.5, 0.9]] },
     { outline: [[0, 0.5], [1, 0.5], [1, 1], [0, 1]], line: [[0.5, 0.5], [0.5, 1]], arrow: [[0.9, 0.75], [0.1, 0.75]] },
     { outline: [[0, 0.5], [0.5, 0.5], [0.5, 1], [0, 1]] }],
    [dropOne, wrongAxis("v"), shifted(0.08, -0.08)]),
  foldItem("PF_M2", 4, ["D1"], [[0.2, 0.6], [0.35, 0.9]],
    [{ outline: SQ, line: FOLDS.D1.line, arrow: [[0.75, 0.25], [0.25, 0.75]] },
     { outline: [[0, 0], [1, 1], [0, 1]] }],
    [antiDiag(), dropOne, (c) => c.concat([[0.8, 0.15]])]),
  foldItem("PF_H1", 4, ["L2R", "T2B", "Q3"], [[0.85, 0.2]],
    [{ outline: SQ, line: FOLDS.L2R.line, arrow: [[0.15, 0.5], [0.85, 0.5]] },
     { outline: [[0.5, 0], [1, 0], [1, 1], [0.5, 1]], line: [[0.5, 0.5], [1, 0.5]], arrow: [[0.75, 0.9], [0.75, 0.1]] },
     { outline: [[0.5, 0], [1, 0], [1, 0.5], [0.5, 0.5]], line: [[0.75, 0], [0.75, 0.5]], arrow: [[0.55, 0.25], [0.95, 0.25]] },
     { outline: [[0.75, 0], [1, 0], [1, 0.5], [0.75, 0.5]] }],
    [(c) => c.filter((_, i) => i % 2 === 0), wrongAxis("h"), shifted(0, 0.12)]),
  foldItem("PF_H2", 5, ["T2B", "L2R", "DQ"], [[0.9, 0.2]],
    [{ outline: SQ, line: FOLDS.T2B.line, arrow: [[0.5, 0.9], [0.5, 0.1]] },
     { outline: [[0, 0], [1, 0], [1, 0.5], [0, 0.5]], line: [[0.5, 0], [0.5, 0.5]], arrow: [[0.1, 0.25], [0.9, 0.25]] },
     { outline: [[0.5, 0], [1, 0], [1, 0.5], [0.5, 0.5]], line: [[0.5, 0], [1, 0.5]], arrow: [[0.6, 0.4], [0.9, 0.1]] },
     { outline: [[0.5, 0], [1, 0], [1, 0.5]] }],
    [(c, folds, punches) => unfold(folds.slice(0, -1), punches), antiDiag(), shifted(-0.08, 0.08)])
];
// verify expected hole counts
assert(unfold(["L2R"], [[0.7, 0.65]]).length === 2, "PF_E1 holes");
assert(unfold(["L2R", "T2B"], [[0.75, 0.25]]).length === 4, "PF_E2 holes");
assert(unfold(["B2T", "R2L"], [[0.15, 0.85], [0.4, 0.6]]).length === 8, "PF_M1 holes");
assert(unfold(["D1"], [[0.2, 0.6], [0.35, 0.9]]).length === 4, "PF_M2 holes");
assert(unfold(["L2R", "T2B", "Q3"], [[0.85, 0.2]]).length === 8, "PF_H1 holes");
assert(unfold(["T2B", "L2R", "DQ"], [[0.9, 0.2]]).length === 8, "PF_H2 holes");
const FOLD_PRACTICE = foldItem("PF_P1", 1, ["T2B"], [[0.5, 0.25]],
  [{ outline: SQ, line: FOLDS.T2B.line, arrow: [[0.5, 0.9], [0.5, 0.1]] }, { outline: [[0, 0], [1, 0], [1, 0.5], [0, 0.5]] }],
  [dropOne, (c) => [[0.5, 0.25], [0.25, 0.25]], shifted(0.15, 0.05)]);

// ============================================================================
// 5) Magnitude comparison pairs — distance × compatibility grid
// ============================================================================
function compat(a, b) { // decade & unit comparisons agree with overall?
  const [lo, hi] = a < b ? [a, b] : [b, a];
  const dl = Math.floor(lo / 10), dh = Math.floor(hi / 10), ul = lo % 10, uh = hi % 10;
  if (dl === dh) return "within";
  return uh > ul ? "compatible" : (uh < ul ? "incompatible" : "neutral");
}
const ok2d = (n) => n >= 11 && n <= 99 && n % 10 !== 0 && Math.floor(n / 10) !== n % 10;
function genPairs(bin, dLo, dHi, count, wantCompat) {
  const out = [];
  let guard = 0;
  while (out.length < count && guard++ < 200000) {
    const a = 11 + ri(89), d = dLo + ri(dHi - dLo + 1), b = a + d;
    if (!ok2d(a) || !ok2d(b)) continue;
    const c = compat(a, b);
    if (c !== wantCompat) continue;
    if (out.some(p => (p.a === a && p.b === b) || (p.a === b && p.b === a))) continue;
    const left = out.length % 2 === 0; // counterbalance larger side
    out.push({ id: `CM_${bin}_${wantCompat[0]}${out.length}`, a: left ? b : a, b: left ? a : b, larger: left ? "a" : "b", distance: d, bin, compat: c });
  }
  assert(out.length === count, `pairs ${bin}/${wantCompat}: got ${out.length}`);
  return out;
}
// NOTE: between-decade pairs at distance ≤5 are ALWAYS unit-incompatible (lo%10+d≥10 ⇒ uh<ul),
// so the close bin pairs "within-decade" (own sub-bin per research 03 §4.2) with incompatible.
const CMP_BANK = [
  ...genPairs("close", 1, 5, 6, "within"), ...genPairs("close", 2, 5, 5, "incompatible"),
  ...genPairs("med", 6, 15, 6, "compatible"), ...genPairs("med", 6, 15, 5, "incompatible"),
  ...genPairs("far", 16, 40, 6, "compatible"), ...genPairs("far", 16, 40, 4, "incompatible")
];
assert(CMP_BANK.length === 32, "cmp bank 32");
const CMP_PRACTICE = [{ id: "CM_P1", a: 23, b: 68, larger: "b" }, { id: "CM_P2", a: 47, b: 45, larger: "a" }];
// scored form: 24 of 32 — 8 per bin (runtime keeps compat balance per bin: 4/4)

// ============================================================================
// 6) Arithmetic verification — series, CRT, estimation
// ============================================================================
for (const s of D.SERIES_ITEMS) {
  const nums = s.seq.every(x => /^[\d/]+$/.test(x)) ? s.seq.map(Number) : null;
  const exp = Number(s.options[s.ans]);
  const c = s.check || {};
  if (c.kind === "arith") assert(nums.at(-1) + c.k === exp, s.id);
  if (c.kind === "geom") assert(nums.at(-1) * c.k === exp, s.id);
  if (c.kind === "fib") assert(nums.at(-1) + nums.at(-2) === exp, s.id);
  if (c.kind === "gap2") { const g = nums.slice(1).map((v, i) => v - nums[i]); const gg = g.slice(1).map((v, i) => v - g[i]); assert(gg.every(v => v === gg[0]), s.id + " gaps"); assert(nums.at(-1) + g.at(-1) + gg[0] === exp, s.id); }
  if (c.kind === "affine") assert(c.a * nums.at(-1) + c.b === exp, s.id);
  if (c.kind === "interleave") { const odd = nums.filter((_, i) => i % 2 === 0), even = nums.filter((_, i) => i % 2 === 1); assert(even.at(-1) - 3 === exp, s.id); assert(odd.every((v, i) => i === 0 || v - odd[i - 1] === 3), s.id); }
  if (c.kind === "lettergap2") { const pos = s.seq.map(ch => ch.charCodeAt(0) - 64); const g = pos.slice(1).map((v, i) => v - pos[i]); assert(g.every((v, i) => i === 0 || v - g[i - 1] === 1), s.id); assert(String.fromCharCode(64 + pos.at(-1) + g.at(-1) + 1) === s.options[s.ans], s.id); }
  assert(new Set(s.options).size === s.options.length, s.id + " dup options");
}
for (const c of D.CRT_ITEMS) {
  const k = c.check || {};
  if (k.kind === "partition") { const small = (k.total - k.diff) / 2; assert(small === c.answer && k.total - k.diff === c.lure, c.id); }
  if (k.kind === "together") assert(1 / (1 / k.a + 1 / k.b) === c.answer, c.id);
  if (k.kind === "rank") assert(2 * k.k - 1 === c.answer, c.id);
  if (k.kind === "ledger") assert(k.legs.reduce((a, b) => a + b, 0) === c.answer, c.id);
  if (k.kind === "ratio") assert(k.total / (k.ratio + 1) === c.answer, c.id);
  if (k.kind === "seqpct") { const v = k.changes.reduce((a, p) => a * (1 + p), k.start); assert((v < k.start) === (k.expect === "loss"), c.id); }
  if (c.format === "mcq") { assert(c.options[c.ans] !== undefined && c.lureIdx !== c.ans, c.id); }
}
for (const e of [...D.ESTIMATION_ITEMS, ...D.ESTIMATION_PRACTICE]) {
  const dists = e.options.map(o => Math.abs(o - e.exact));
  const best = dists.indexOf(Math.min(...dists));
  assert(best === e.ans, e.id + " correct option is not nearest to exact");
  assert(new Set(e.options).size === e.options.length, e.id + " dup options");
}

// ============================================================================
// 7) Matrix / analogy / odd-one-out validation
// ============================================================================
for (const m of [...D.MATRIX_ITEMS, D.MATRIX_PRACTICE]) {
  assert(m.grid.length === 9 && m.grid.filter(c => c === null).length === 1, m.id + " grid");
  const keys = m.options.map(o => JSON.stringify(o));
  assert(new Set(keys).size === 6, m.id + " options not unique");
  assert(m.ans >= 0 && m.ans < 6, m.id + " ans range");
}
for (const a of D.ANALOGY_ITEMS) assert(new Set(a.options).size === a.options.length && a.options.length === 6, a.id);
for (const o of [...D.ODDONE_ITEMS, D.ODDONE_PRACTICE]) assert(new Set(o.options).size === o.options.length && o.options.length === 5, o.id);
// slots satisfiable
for (const [type, tier, count] of D.STAGE1_SLOTS) {
  const pool = { matrix: D.MATRIX_ITEMS, series: D.SERIES_ITEMS, analogy: D.ANALOGY_ITEMS, oddoneout: D.ODDONE_ITEMS }[type].filter(i => i.tier === tier);
  assert(pool.length >= count, `stage1 slot ${type}/${tier} needs ${count}, bank has ${pool.length}`);
}
assert(D.STAGE1_SLOTS.reduce((a, s) => a + s[2], 0) === 16, "stage1 = 16 scored");

// PA pairs
assert(new Set(D.PA_PAIRS.map(p => p.word)).size === 20, "PA words unique");
assert(new Set(D.PA_PAIRS.map(p => JSON.stringify(p.glyph))).size === 20, "PA glyphs unique");

// scales
const S = D.SCALES;
assert(S.NGSE.items.length === 8, "NGSE 8");
assert(S.SRQL.items.filter(i => i.sub === "aut").length === 6 && S.SRQL.items.filter(i => i.sub === "ctrl").length === 6, "SRQL 6+6");
assert(S.MINIIPIP_C.items.length === 4 && S.MINIIPIP_C.items.filter(i => i.reverse).length === 2, "IPIP");
assert(S.AMAS.items.length === 9 && S.AMAS.items.filter(i => i.sub === "LMA").length === 5, "AMAS");
assert(S.MSLQ.items.length === 6, "MSLQ 6");
const selfReportCount = 8 + 12 + 4 + 9 + 6;
assert(selfReportCount === 39, "self-report core 39 items (+2 checks)");

// anchors monotonic
for (const [code, a] of Object.entries(D.ANCHORS)) {
  const check = (arr, dir, tag) => { for (let i = 1; i < arr.length; i++) assert(dir === 1 ? arr[i] > arr[i - 1] : arr[i] < arr[i - 1], `anchor ${tag} not monotonic`); };
  if (a.v) check(a.v, a.dir, code);
  if (a.sub) for (const [k, s] of Object.entries(a.sub)) check(s.v, s.dir, code + "." + k);
}

// ============================================================================
// 8) Assemble battery.json
// ============================================================================
const battery = {
  schema: "parameter-mirror/battery.v1",
  version: "1.0.0",
  generated: "2026-07-13",
  norms: "provisional-v1-literature",
  meta: {
    title: "The Parameter Mirror — Test Battery",
    session: "11 stages, ≈32 min. Fixed order. Confidence tags on stages 1,2,5,6,8 + stage-9 recognition.",
    copyright: "All performance items original (ICAR-style formats). NGSE cited (Chen et al. 2001); Mini-IPIP public domain; AMAS adapted (Hopko et al. 2003); MSLQ public manual (Pintrich et al. 1991); SRQ-L adaptation (SDT, free for research). No Raven's/MRT/PSVT/ETS content.",
    research: "See research/tests/01–04 for the evidence base; product/Test_Battery_Plan.md for the protocol contract.",
    confidence_buttons: [0.25, 0.5, 0.75, 1.0]
  },
  scoring: {
    master_bands: D.MASTER_BANDS,
    anchors: D.ANCHORS,
    lenses: D.LENSES,
    rt_hygiene: { min_ms: 200, max_ms: 10000, sd_cut: 3 },
    d3: { bias_over: 0.05, bias_under: -0.05, min_judgments: 40, acc_hi: 0.90, acc_lo: 0.15 },
    guardrails: {
      ceiling_acc: 0.95, ceiling_cap: 9,
      a3_acc_flag: 0.80, sart_omission_flag: 0.15,
      blur_flag: 2, e5_risk_band: 7,
      e6_rubric: "complete required; 10 − penalties (drift>20%:−2, >40%:−4; blurs>2:−2; skips>6:−2, 4–6:−1), clamp 4–10"
    },
    grades: { F: ["A1", "A2", "A3", "A4", "C1", "C2"], S: ["A5", "D1", "D2", "E6"], self_report: ["E1", "E2", "E3", "E5"], d3: { bias: "F", res: "S until ≥100 judgments" } }
  },
  readouts: D.READOUTS,
  param_meta: D.PARAM_META,
  stages: [
    { n: 0, key: "setup", title: "Setup", time_min: 1 },
    { n: 1, key: "reasoning", title: "Reasoning", measures: ["A1", "D3", "D2"], deadline_ms: 45000, cap_min: 6, confidence: true, scored: 16 },
    { n: 2, key: "span", title: "Memory span", measures: ["A2", "D3"], confidence: true, digit_on_ms: 800, digit_off_ms: 200, verify_deadline_ms: 6000 },
    { n: 3, key: "sprint", title: "Symbol sprint", measures: ["A3", "A5"], practice_s: 20, run_s: 90, confidence: false },
    { n: 4, key: "pairs_study", title: "Pairs — learn", measures: ["A4"], study_ms: 4000, isi_ms: 1000, feedback_ms: 1500, n_pairs: 12, confidence: false },
    { n: 5, key: "spatial", title: "Spatial", measures: ["C2", "D3"], deadline_ms: 30000, confidence: true, scored_rotation: 8, scored_folding: 4 },
    { n: 6, key: "number", title: "Number sense", measures: ["C1", "A3", "D3"], cmp_deadline_ms: 3000, nle_deadline_ms: 15000, est_deadline_ms: 15000, confidence_est_only: true, scored_cmp: 24, scored_nle: 10, scored_est: 6 },
    { n: 7, key: "sart", title: "Focus", measures: ["A5", "D1"], trials: 90, practice: 15, stim_ms: 250, soa_ms: 2000, nogo_digit: 3, nogo_count: 10, confidence: false },
    { n: 8, key: "reflection", title: "Reflection", measures: ["D1", "C1", "D3"], deadline_ms: 40000, confidence: true, scored: 6 },
    { n: 9, key: "pairs_recall", title: "Pairs — recall", measures: ["A4", "D3"], recall_deadline_ms: 15000, recog_deadline_ms: 10000, n_recog: 16, confidence_recognition: true },
    { n: 10, key: "selfreport", title: "About you", measures: ["E1", "E2", "E3", "E5", "D2"], items: selfReportCount + 2 }
  ],
  items: {
    stage1: {
      slots: D.STAGE1_SLOTS,
      practice: [D.SERIES_PRACTICE, D.MATRIX_PRACTICE],
      bank: [...D.MATRIX_ITEMS, ...D.SERIES_ITEMS, ...D.ANALOGY_ITEMS, ...D.ODDONE_ITEMS]
    },
    stage2: { backward, opspan },
    stage3: {
      mapping_digits: [1, 2, 3, 4],
      symbols: [
        { id: "G1", path: "M -6 5 L 6 5 M 0 5 L 0 -6" },
        { id: "G2", path: "M -5 -5 L 5 -5 L 5 5" },
        { id: "G3", path: "M -6 -2 C -3 -6 3 2 6 -2 M -6 4 C -3 0 3 8 6 4" },
        { id: "G4", path: "M -6 0 A 7 7 0 0 1 6 0 A 7 7 0 0 1 -6 0" }
      ],
      note: "Abstract, stroke-matched glyphs; pilot for confusability (NIH-Toolbox ≥75% accuracy rule)."
    },
    stage4: { pairs: D.PA_PAIRS, select: 12 },
    stage5: { rotation: { shapes: SHAPES, trials: ROT_TRIALS, practice: ROT_PRACTICE }, folding: { items: FOLD_ITEMS, practice: FOLD_PRACTICE } },
    stage6: {
      comparison: { bank: CMP_BANK, practice: CMP_PRACTICE, scored: 24, per_bin: 8 },
      numberline: D.NLE_TARGETS,
      estimation: { bank: D.ESTIMATION_ITEMS, practice: D.ESTIMATION_PRACTICE, scored: 6 }
    },
    stage7: { generator: "runtime-seeded", rules: "digits 1–9, no immediate repeats, exactly nogo_count no-gos spread non-adjacently" },
    stage8: { bank: D.CRT_ITEMS, practice: D.CRT_PRACTICE, scored: 6, primary_pool: ["CRT_01", "CRT_02", "CRT_03", "CRT_04", "CRT_05", "CRT_06", "CRT_07", "CRT_08", "CRT_09", "CRT_10"], rule: "pick 6 with distinct archetypes" },
    stage9: { recognition: { intact: 8, recombined: 8 }, recall_options: 4 },
    stage10: { scales: D.SCALES, order: ["NGSE", "SRQL", "MINIIPIP_C", "AMAS", "MSLQ"], checks: D.ATTENTION_CHECKS, framing: "No right answers — answer for how you actually are, not how you'd like to be." }
  }
};

// final sanity: bank sizes vs plan
assert(battery.items.stage1.bank.length === 23, "stage1 bank 23 (16 scored + 7 spare)");
assert(battery.items.stage5.rotation.trials.length === 11 && battery.items.stage5.folding.items.length === 6, "stage5 bank");
assert(battery.items.stage8.bank.length === 12, "stage8 bank 12");

const out = process.argv[2] || "battery.json";
fs.writeFileSync(out, JSON.stringify(battery, null, 1));
const bytes = fs.statSync(out).size;
console.log(`OK battery.json written → ${out} (${(bytes / 1024).toFixed(1)} KB)`);
console.log(`stage1 bank ${battery.items.stage1.bank.length} | cmp pairs ${CMP_BANK.length} | fold items ${FOLD_ITEMS.length} | rot trials ${ROT_TRIALS.length} | CRT ${D.CRT_ITEMS.length} | self-report ${selfReportCount}+2`);
