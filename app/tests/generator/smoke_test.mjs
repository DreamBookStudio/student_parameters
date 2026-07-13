// smoke_test.mjs — jsdom end-to-end: boots battery.html, walks setup→first
// practice item, then drives the results renderer with a synthetic session.
import fs from "fs";
import { JSDOM } from "jsdom";

const APP = "/sessions/lucid-exciting-noether/mnt/Student Psychometric Analysis/app";
const html = fs.readFileSync(APP + "/battery.html", "utf8");
const BAT = JSON.parse(fs.readFileSync(APP + "/tests/battery.json", "utf8"));

let pass = 0, failn = 0;
const ok = (c, m) => { if (c) pass++; else { failn++; console.error("  ✗ " + m); } };
const sleep = ms => new Promise(r => setTimeout(r, ms));

const dom = new JSDOM(html, {
  runScripts: "dangerously", pretendToBeVisual: true, url: "file:///app/battery.html",
  beforeParse(w) {
    w.fetch = () => Promise.reject(new Error("no fetch in test"));
  }
});
const w = dom.window, d = w.document;
const errors = [];
w.addEventListener("error", e => errors.push(e.message));

await sleep(300); // let batReady + stSetup settle
ok(errors.length === 0, "no runtime errors on boot: " + errors.join(" | "));
ok(d.querySelector("#screen .card h2")?.textContent.includes("Parameter Mirror"), "setup screen rendered");
ok(!!d.querySelector("#nm") && !!d.querySelector("#go"), "name input + begin button present");

// begin session → reasoning intro
d.querySelector("#nm").value = "Smoke Tester";
d.querySelector("#go").click();
await sleep(200);
ok(errors.length === 0, "no errors after begin: " + errors.join(" | "));
ok(d.querySelector("#screen h2")?.textContent.includes("Reasoning"), "reasoning intro shown");
const form = w.eval("S.form");
ok(form.stage1.length === 16, "form: 16 stage-1 items picked");
ok(new Set(form.stage1).size === 16, "form: stage-1 picks unique");
ok(form.pairs.length === 12 && form.crt.length === 6 && form.cmp.length === 24 && form.nle.length === 10 && form.est.length === 6, "form sizes ok");
const bank1 = BAT.items.stage1.bank;
const comp = {};
form.stage1.forEach(id => { const it = bank1.find(b => b.id === id); comp[it.type + "/" + it.tier] = (comp[it.type + "/" + it.tier] || 0) + 1; });
ok(comp["matrix/e"] === 2 && comp["matrix/m"] === 2 && comp["matrix/h"] === 2 && comp["series/m"] === 2 && comp["oddoneout/h"] === 1, "slot composition respected: " + JSON.stringify(comp));

// start practice → first practice item (series) renders and accepts a click
d.querySelector("#go").click();
await sleep(200);
ok(d.querySelectorAll("#screen .opt").length >= 6, "practice item options rendered");
ok(!!d.querySelector("#itemTimerBar"), "item timer present");
d.querySelectorAll("#screen .opt")[0].click();  // answer → feedback (900ms)
await sleep(1200);
ok(errors.length === 0, "no errors through first practice item: " + errors.join(" | "));
ok(w.eval("S.items.length") >= 1 && w.eval("S.items[0].practice") === true, "practice response logged");
const isMatrixNow = !!d.querySelector("#screen svg");
ok(isMatrixNow, "second practice item (matrix) rendered with SVG cells");

// ---- drive results directly with a synthetic session ----
function synth(q) {
  const S = { seed: 1, name: "Synth", startedTs: 0, finishedTs: 32 * 60000, blurs: { reasoning: 1 }, skips: q.skips ?? 1, form: {},
    items: [], span: { bwd: [], osp: [] }, sprint: { practice: [], run: [] },
    pairs: { selected: [], cycle2: [], recall: [], recog: [] }, sart: { practice: [], trials: [] },
    nle: [], selfreport: {}, checks: {}, deviceClass: "mouse" };
  let flip = 0; const hit = p => { flip += p; if (flip >= 1) { flip -= 1; return true; } return false; };
  const conf = c => c ? q.confC : q.confW;
  [1,1,2,2,3,3,3,3,3,3,3,3,4,4,5,5].forEach((dd, i) => { const c = hit(q.acc);
    S.items.push({ stage: "reasoning", id: "R" + i, type: "matrix", difficulty: dd, pick: 0, correct: c, rt: 9000, conf: conf(c), timeout: false, skip: false }); });
  [3,3,4,4,5,5,6,6,7].forEach((sz, i) => { const pc = Math.round(q.span * sz);
    S.span.bwd.push({ id: "B" + i, size: sz, posCorrect: pc, unit: pc / sz, rt: 4000, conf: conf(pc === sz) }); });
  [3,4,5,6].forEach((sz, i) => { const pc = Math.round(q.span * sz);
    S.span.osp.push({ id: "O" + i, size: sz, posCorrect: pc, unit: pc / sz, verifyAcc: 0.95, conf: conf(pc === sz) }); });
  for (let i = 0; i < 55; i++) S.sprint.run.push({ digit: 1, pick: 1, correct: hit(0.94), rt: 800, t: i });
  for (let i = 0; i < 12; i++) S.pairs.cycle2.push({ id: "P" + i, correct: hit(q.imm), rt: 3000 });
  for (let i = 0; i < 12; i++) S.pairs.recall.push({ id: "P" + i, correct: hit(q.del), rt: 4000, timeout: false });
  for (let i = 0; i < 16; i++) { const intact = i < 8; const saysYes = intact ? hit(0.85) : hit(0.2);
    S.pairs.recog.push({ id: "P" + i, intact, saysYes, correct: saysYes === intact, rt: 2500, conf: conf(saysYes === intact), timeout: false }); }
  for (let i = 0; i < 90; i++) { const nogo = i % 9 === 4 && S.sart.trials.filter(t => t.nogo).length < 10;
    if (nogo) S.sart.trials.push({ digit: 3, nogo: true, responded: hit(0.3), rt: 400 });
    else S.sart.trials.push({ digit: 5, nogo: false, responded: hit(0.97), rt: 420 + (i % 7) * 25 }); }
  for (let i = 0; i < 24; i++) S.items.push({ stage: "number", id: "C" + i, type: "comparison", pick: "a", correct: hit(0.92), rt: 900, timeout: false, skip: false });
  for (let i = 0; i < 10; i++) S.nle.push({ target: 500, est: 500, pae: 3.2, rt: 5000, timeout: false });
  for (let i = 0; i < 6; i++) { const c = hit(0.67); S.items.push({ stage: "number", id: "E" + i, type: "estimation", difficulty: 3, pick: 0, correct: c, rt: 6000, conf: conf(c), timeout: false, skip: false, lure: null }); }
  for (let i = 0; i < 12; i++) { const c = hit(q.spa); S.items.push({ stage: "spatial", id: "S" + i, type: i < 8 ? "rotation" : "folding", difficulty: 3, angle: [45,90,135,180][i % 4], pick: 0, correct: c, rt: 7000, conf: conf(c), timeout: false, skip: false }); }
  for (let i = 0; i < 6; i++) { const ref = hit(q.crt); S.items.push({ stage: "reflection", id: "CR" + i, type: "crt", difficulty: 3, pick: 0, correct: ref, cls: ref ? "reflective" : "lure", rt: 15000, conf: conf(ref), timeout: false, skip: false }); }
  const sc = BAT.items.stage10.scales;
  const put = (items, v) => items.forEach(it => S.selfreport[it.id] = v);
  put(sc.NGSE.items, q.likert); put(sc.MINIIPIP_C.items.filter(i => !i.reverse), q.likert);
  put(sc.MINIIPIP_C.items.filter(i => i.reverse), 6 - q.likert);
  put(sc.MSLQ.items, q.likert); put(sc.AMAS.items, q.amas);
  sc.SRQL.items.forEach(it => S.selfreport[it.id] = it.sub === "aut" ? q.srqAut : q.srqCtrl);
  S.checks.CHK_1 = 7; S.checks.CHK_2 = 1;
  return S;
}
const synthS = synth({ acc: 0.6, span: 0.7, confC: 0.75, confW: 0.5, imm: 0.65, del: 0.55, spa: 0.65, crt: 0.5, likert: 4, amas: 3.6, srqAut: 5.5, srqCtrl: 4.0, skips: 2 });
w.eval(`
  Object.assign(S, ${JSON.stringify(synthS)});
  showResults();
`);
await sleep(300);
ok(errors.length === 0, "no errors rendering results: " + errors.join(" | "));
const svg = d.querySelector("#screen svg");
ok(!!svg && d.querySelectorAll("#screen polygon").length >= 5, "radar SVG with rings + polygons rendered");
ok(d.querySelector("#screen").textContent.includes("Provisional norms"), "provisional banner shown");
ok(d.querySelector("#screen").textContent.includes("attempt/skip"), "D3 headline present");
ok(!!d.querySelector("#lensSel"), "lens toggle present");
ok(!!d.querySelector("#dl") && !!d.querySelector("#cp"), "export buttons present");
const prof = w.eval("window.__mirror.profile");
ok(prof.schema === "parameter-mirror/profile.v1", "profile schema in DOM run");
ok(Number.isInteger(prof.params.A1) && prof.params.D3 && typeof prof.params.E2 === "string", "profile params well-formed: " + JSON.stringify(prof.params));
// lens switch exercises summary re-render
d.querySelector("#lensSel").value = "jee"; d.querySelector("#lensSel").dispatchEvent(new w.Event("change"));
await sleep(50);
ok(errors.length === 0, "lens switch clean");
ok(d.querySelector("#sumBody").textContent.length > 40, "summary body populated after lens switch");

console.log(`\nSMOKE: ${pass} passed, ${failn} failed`);
process.exit(failn ? 1 : 0);
