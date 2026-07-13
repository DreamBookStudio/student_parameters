// test_scoring.mjs — verifies the scoring engine embedded in battery.html
// against synthetic sessions + the tutor.html PARAMS contract.
import fs from "fs";
import vm from "vm";

const APP = "/sessions/lucid-exciting-noether/mnt/Student Psychometric Analysis/app";
const html = fs.readFileSync(APP + "/battery.html", "utf8");
const BAT = JSON.parse(fs.readFileSync(APP + "/tests/battery.json", "utf8"));

// extract scoring block
const m = html.match(/\/\*SCORING-BEGIN\*\/([\s\S]*?)\/\*SCORING-END\*\//);
if (!m) throw new Error("scoring block not found");
const ctx = {};
vm.createContext(ctx);
vm.runInContext(m[1] + "; this.MS = MirrorScoring;", ctx);
const MS = ctx.MS;

let pass = 0, failn = 0;
const ok = (c, msg) => { if (c) { pass++; } else { failn++; console.error("  ✗ " + msg); } };

// ---------------- synthetic session builder ----------------
function synth(q) {
  // q: {acc, conf(correct), conf(wrong), rate, cov, commission, pae, crtRef, likert}
  const S = {
    seed: 1, name: "Synth", startedTs: 0, finishedTs: 32 * 60000,
    blurs: {}, skips: q.skips ?? 1, form: {},
    items: [], span: { bwd: [], osp: [] }, sprint: { practice: [], run: [] },
    pairs: { selected: [], cycle2: [], recall: [], recog: [] },
    sart: { practice: [], trials: [] }, nle: [], selfreport: {}, checks: {},
    deviceClass: "mouse"
  };
  let flip = 0;
  const hit = p => { flip += p; if (flip >= 1) { flip -= 1; return true; } return false; }; // deterministic p-mixer
  const conf = c => c ? q.confC : q.confW;
  // stage1: 16 items, difficulty ramp 4E(1,2)/8M(3)/4H(4,5)
  const diffs = [1,1,2,2,3,3,3,3,3,3,3,3,4,4,5,5];
  diffs.forEach((d, i) => {
    const c = hit(q.acc);
    S.items.push({ stage: "reasoning", id: "R" + i, type: "matrix", difficulty: d, pick: 0, correct: c, rt: 8000 + d * 3000, conf: conf(c), timeout: false, skip: false });
  });
  // span: 9 bwd + 4 osp
  [3,3,4,4,5,5,6,6,7].forEach((sz, i) => {
    const u = Math.max(0, Math.min(1, q.span + (i % 2 ? -0.05 : 0.05)));
    const pc = Math.round(u * sz);
    S.span.bwd.push({ id: "B" + i, size: sz, posCorrect: pc, unit: pc / sz, rt: 4000, conf: conf(pc === sz) });
  });
  [3,4,5,6].forEach((sz, i) => {
    const u = Math.max(0, Math.min(1, q.span));
    const pc = Math.round(u * sz);
    S.span.osp.push({ id: "O" + i, size: sz, posCorrect: pc, unit: pc / sz, verifyAcc: 0.95, conf: conf(pc === sz) });
  });
  // sprint: rate = correct/90s
  const nResp = Math.round(q.rate * 90 / 0.93);
  for (let i = 0; i < nResp; i++) S.sprint.run.push({ digit: 1, pick: 1, correct: hit(0.93), rt: 700 + (i % 5) * 40, t: i });
  // pairs
  for (let i = 0; i < 12; i++) S.pairs.cycle2.push({ id: "P" + i, correct: hit(q.imm), rt: 3000 });
  for (let i = 0; i < 12; i++) S.pairs.recall.push({ id: "P" + i, correct: hit(q.del), rt: 4000, timeout: false });
  for (let i = 0; i < 16; i++) {
    const intact = i < 8;
    const saysYes = intact ? hit(q.hit) : hit(1 - q.cr);
    S.pairs.recog.push({ id: "P" + i, intact, saysYes, correct: saysYes === intact, rt: 2500, conf: conf(saysYes === intact), timeout: false });
  }
  // sart: 80 go + 10 nogo
  for (let i = 0; i < 90; i++) {
    const nogo = i % 9 === 4 && i < 90 && S.sart.trials.filter(t => t.nogo).length < 10;
    if (nogo) S.sart.trials.push({ digit: 3, nogo: true, responded: hit(q.commission), rt: 400 });
    else S.sart.trials.push({ digit: 5, nogo: false, responded: hit(0.97), rt: 420 + (i % 7) * q.covJitter });
  }
  // number: 24 cmp + 10 nle + 6 est
  for (let i = 0; i < 24; i++) S.items.push({ stage: "number", id: "C" + i, type: "comparison", pick: "a", correct: hit(q.cmp), rt: 900, timeout: false, skip: false });
  for (let i = 0; i < 10; i++) S.nle.push({ target: 500, est: 500, pae: q.pae, rt: 5000, timeout: false });
  for (let i = 0; i < 6; i++) { const c = hit(q.est); S.items.push({ stage: "number", id: "E" + i, type: "estimation", difficulty: 3, pick: 0, correct: c, rt: 6000, conf: conf(c), timeout: false, skip: false, lure: c ? null : "near" }); }
  // spatial: 8 rot + 4 fold
  for (let i = 0; i < 8; i++) { const c = hit(q.spa); S.items.push({ stage: "spatial", id: "RT" + i, type: "rotation", difficulty: 2 + (i % 3), angle: [45,90,135,180][i % 4], pick: 0, correct: c, rt: 5000 + (i % 4) * 1500, conf: conf(c), timeout: false, skip: false }); }
  for (let i = 0; i < 4; i++) { const c = hit(q.spa); S.items.push({ stage: "spatial", id: "PF" + i, type: "folding", difficulty: 2 + i, pick: 0, correct: c, rt: 9000, conf: conf(c), timeout: false, skip: false }); }
  // reflection: 6 CRT
  for (let i = 0; i < 6; i++) { const ref = hit(q.crt); S.items.push({ stage: "reflection", id: "CR" + i, type: "crt", difficulty: 3, pick: 0, correct: ref, cls: ref ? "reflective" : "lure", rt: 15000, conf: conf(ref), timeout: false, skip: false }); }
  // self-report
  const sc = BAT.items.stage10.scales;
  const put = (items, v) => items.forEach(it => S.selfreport[it.id] = v);
  put(sc.NGSE.items, q.likert); put(sc.MINIIPIP_C.items.filter(i => !i.reverse), q.likert);
  put(sc.MINIIPIP_C.items.filter(i => i.reverse), 6 - q.likert);
  put(sc.MSLQ.items, q.likert);
  put(sc.AMAS.items, q.amas);
  sc.SRQL.items.forEach(it => S.selfreport[it.id] = it.sub === "aut" ? q.srqAut : q.srqCtrl);
  S.checks.CHK_1 = 7; S.checks.CHK_2 = 1;
  return S;
}

const HIGH = synth({ acc: 15/16, span: 0.92, rate: 0.80, covJitter: 8, commission: 0.10, cmp: 0.97, pae: 1.4, est: 1.0, spa: 11/12, crt: 5/6, imm: 0.9, del: 0.85, hit: 0.95, cr: 0.95, confC: 1.0, confW: 0.25, likert: 5, amas: 1, srqAut: 7, srqCtrl: 2, skips: 0 });
const MID  = synth({ acc: 0.5, span: 0.68, rate: 0.55, covJitter: 30, commission: 0.35, cmp: 0.90, pae: 3.5, est: 4/6, spa: 8/12, crt: 3/6, imm: 0.58, del: 0.5, hit: 0.8, cr: 0.75, confC: 0.75, confW: 0.75, likert: 3, amas: 2.3, srqAut: 5, srqCtrl: 4.6, skips: 2 });
const LOW  = synth({ acc: 0.25, span: 0.42, rate: 0.35, covJitter: 55, commission: 0.60, cmp: 0.78, pae: 6.0, est: 2/6, spa: 5/12, crt: 1/6, imm: 0.35, del: 0.22, hit: 0.6, cr: 0.55, confC: 1.0, confW: 1.0, likert: 2, amas: 4.2, srqAut: 3.4, srqCtrl: 6, skips: 5 });

const rH = MS.computeAll(HIGH, BAT), rM = MS.computeAll(MID, BAT), rL = MS.computeAll(LOW, BAT);
const pH = MS.buildProfile(rH, HIGH, BAT), pM = MS.buildProfile(rM, MID, BAT), pL = MS.buildProfile(rL, LOW, BAT);

console.log("— band ordering (high ≥ mid ≥ low, strict somewhere) —");
for (const c of ["A1","A2","A3","A4","A5","C1","C2","D1","D2","E1","E3"]) {
  const h = rH.axes[c].band, m = rM.axes[c].band, l = rL.axes[c].band;
  ok(h != null && m != null && l != null, c + " all present");
  ok(h >= m && m >= l, `${c} ordering h${h} m${m} l${l}`);
  ok(h > l, `${c} discriminates h${h} l${l}`);
}
console.log("bands H:", JSON.stringify(pH.params));
console.log("bands M:", JSON.stringify(pM.params));
console.log("bands L:", JSON.stringify(pL.params));

console.log("— mid profile ≈ band 5s —");
ok(Math.abs(rM.axes.A1.band - 5) <= 1, "A1 mid ~5, got " + rM.axes.A1.band);
ok(Math.abs(rM.axes.A2.band - 5) <= 1, "A2 mid ~5, got " + rM.axes.A2.band);
ok(Math.abs(rM.axes.A3.band - 5) <= 1, "A3 mid ~5, got " + rM.axes.A3.band);
ok(Math.abs(rM.axes.C2.band - 5) <= 1, "C2 mid ~5, got " + rM.axes.C2.band);

console.log("— tutor.html PARAMS contract —");
const TUTOR_CODES = ["A2","A3","A4","D2","D3","E3","E5","A1","D1","C2","C1","A5","E1","E2","E6"];
for (const p of [pH, pM, pL]) {
  ok(Object.keys(p.params).every(k => TUTOR_CODES.includes(k)), "param keys ⊆ tutor codes: " + Object.keys(p.params).join(","));
  ok(p.schema === "parameter-mirror/profile.v1", "schema id");
  for (const [k, v] of Object.entries(p.params)) {
    if (k === "D3") { ok(typeof v === "object" && ["Overconfident","Well-calibrated","Underconfident"].includes(v.bias) && Number.isInteger(v.res) && v.res >= 0 && v.res <= 10, "D3 shape " + JSON.stringify(v)); }
    else if (k === "E2") { ok(["Autonomous","Mixed","Controlled","Amotivated"].includes(v), "E2 class " + v); }
    else ok(Number.isInteger(v) && v >= 0 && v <= 10, `${k} integer band 0–10, got ${v}`);
  }
  ok(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}[+-]\d{2}:\d{2}$/.test(p.generated), "ISO timestamp w/ offset " + p.generated);
  ok(p.validity.attention_checks === "pass" && p.validity.complete === true, "validity");
  ok(["duration_min","blurs","skips","post_error_persistence","rt_difficulty_r"].every(k => k in p.telemetry_summary), "telemetry keys");
}

console.log("— semantics —");
ok(pH.params.E5 <= 2, "high performer, low anxiety → low E5 band, got " + pH.params.E5);
ok(pL.params.E5 >= 7, "anxious responder → high E5 band, got " + pL.params.E5);
ok(rL.axes.E5.flags.includes("riskFlag"), "E5 riskFlag at band ≥7");
ok(pH.params.E2 === "Autonomous", "high RAI → Autonomous, got " + pH.params.E2);
ok(pL.params.E2 === "Controlled", "negative RAI → Controlled, got " + pL.params.E2);
ok(pH.params.D3.bias === "Well-calibrated" || rH.d3.bias_value < 0.06, "high: calibrated (bias " + rH.d3.bias_value + ")");
ok(pL.params.D3.bias === "Overconfident", "low + always-100% conf → Overconfident, got " + pL.params.D3.bias);
ok(rH.d3.gamma > 0.6, "high resolution gamma > .6, got " + rH.d3.gamma);
ok(rM.d3.gamma === null || Math.abs(rM.d3.gamma) < 0.3, "flat confidence → low/undefined gamma, got " + rM.d3.gamma);
ok(rH.axes.A4.subs.dprime > rL.axes.A4.subs.dprime, "A4 d′ ordering");
ok(rH.axes.E6.band >= rL.axes.E6.band, "E6 ordering");

console.log("— attention-check failure path —");
const BAD = synth({ acc: 0.6, span: 0.7, rate: 0.6, covJitter: 20, commission: 0.3, cmp: 0.9, pae: 3, est: 0.7, spa: 0.7, crt: 0.5, imm: 0.6, del: 0.5, hit: 0.8, cr: 0.8, confC: 0.75, confW: 0.5, likert: 4, amas: 3, srqAut: 5, srqCtrl: 4, skips: 1 });
BAD.checks.CHK_1 = 3; // failed instructed check
const rB = MS.computeAll(BAD, BAT); const pB = MS.buildProfile(rB, BAD, BAT);
ok(!("E1" in pB.params) && !("E3" in pB.params) && !("E5" in pB.params) && !("E2" in pB.params), "E-block omitted from params on check fail");
ok(pB.validity.attention_checks === "fail", "validity fail recorded");
ok(pB.detail.E1.flags.includes("attention_check_failed"), "detail explains omission");
ok("D2" in pB.params, "D2 survives via behavioural half");
ok(rB.axes.D2.flags.includes("self_report_invalid_behavioural_only"), "D2 flagged behavioural-only");

console.log("— ceiling guardrail —");
const CEIL = synth({ acc: 1.0, span: 1.0, rate: 0.9, covJitter: 6, commission: 0, cmp: 1.0, pae: 1.0, est: 1.0, spa: 1.0, crt: 1.0, imm: 1.0, del: 1.0, hit: 1.0, cr: 1.0, confC: 1.0, confW: 0.25, likert: 5, amas: 1, srqAut: 7, srqCtrl: 1, skips: 0 });
const rC = MS.computeAll(CEIL, BAT);
ok(rC.axes.A1.band === 9 && rC.axes.A1.flags.includes("ceiling_retest_harder_form"), "A1 capped at 9 w/ ceiling flag, got " + rC.axes.A1.band);
ok(rC.axes.C2.band === 9, "C2 capped at 9, got " + rC.axes.C2.band);
ok(rC.d3.flags.includes("accuracy_extreme"), "D3 guardrail: accuracy extreme flagged");

console.log("— percentile math spot checks —");
ok(Math.round(MS.percentileFrom(BAT.scoring.anchors.A1, 0.50)) === 50, "A1 .50 → P50");
ok(Math.round(MS.percentileFrom(BAT.scoring.anchors.A1, 0.38)) === 25, "A1 .38 → P25");
ok(Math.round(MS.percentileFrom(BAT.scoring.anchors.A5.sub.cov, 0.30)) === 50, "CoV .30 → P50 (reversed)");
ok(Math.round(MS.percentileFrom(BAT.scoring.anchors.A5.sub.cov, 0.18)) === 90, "CoV .18 → P90 (reversed)");
ok(MS.bandFrom(50, BAT.scoring.master_bands) === 5, "P50 → band 5");
ok(MS.bandFrom(84, BAT.scoring.master_bands) === 8, "P84 → band 8");
ok(MS.bandFrom(99, BAT.scoring.master_bands) === 10, "P99 → band 10");
ok(Math.abs(MS.qnorm(0.975) - 1.96) < 0.01, "qnorm(0.975) ≈ 1.96");

// embedded copy === canonical file
const emb = html.match(/<script id="batteryData" type="application\/json">([\s\S]*?)<\/script>/)[1];
ok(JSON.stringify(JSON.parse(emb.replace(/<\\\//g, "</"))) === JSON.stringify(BAT), "embedded battery JSON === tests/battery.json");

console.log(`\n${pass} passed, ${failn} failed`);
process.exit(failn ? 1 : 0);
