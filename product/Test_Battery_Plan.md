# Test Battery Plan — Conduct, Design & Output Contract

**Project:** Student Psychometric Analysis · **Product folder deliverable**
**What this is:** the operational plan for the test battery HTML — which tests to build, how each test must be conducted (exact administration protocol), what is logged, how raw behaviour becomes each parameter score, and the exact JSON the results page must emit so `../app/tutor.html` can load a *measured* profile instead of hand-set sliders.
**Companions:** `Metrics_Needed.md` (parameter selection) · `Problem_Design_Spec.md` (task research, item formats, scoring formulas, references) · `../research/parameters/02_Scoring_Rubric.md` (master 0–10 conversion + behavioural anchors).
**Date:** 2026-07-13.

**Decisions locked for v1** (agreed 2026-07-13):

1. **Full-length battery** (~30 min active), every metric measured both quantitatively (score) and qualitatively (band + behavioural readout).
2. **Static embedded item bank** — items authored once and embedded in the HTML at build time (same pattern as the syllabus JSONs). No runtime LLM generation: RT-based scores need deterministic, zero-latency item delivery.
3. **Norming = published-literature benchmark anchors + rubric bands + business-logic guardrails.** No cohort z-scores exist for a single local user; provisional anchor tables are embedded and flagged provisional until pilot data (N ≥ 300) replaces them.
4. **Output = radar/gauge results page + tutor-ready JSON** matching `tutor.html`'s `profile.params` schema exactly.

---

# PART 1 — SESSION ARCHITECTURE

## 1.0 Coverage matrix — all 15 finalized metrics (traceability to `Metrics_Needed.md`)

The finalized set is **8 Tier-1 + 6 Tier-2 + 1 conditional = 15 metrics**. Every one has a test vehicle, a quantitative score, and a qualitative readout. The 5 dropped metrics (B1, B2, B3, C3, E4) are **not** tested anywhere.

| # | Code | Metric | Tier | Test vehicle (stage) | Quantitative output | Measurement grade |
|---|------|--------|:----:|----------------------|---------------------|-------------------|
| 1 | A2 | Working Memory | 1 | Backward digit span + operation span (Stage 2) | partial-credit unit score → 0–10 | F · performance |
| 2 | A3 | Processing Speed | 1 | Symbol-digit 90 s sprint (Stage 3) | rate-correct/s → 0–10 | F · performance |
| 3 | A4 | Learning Efficiency / Retrieval | 1 | Paired-associate study → delayed recall + recognition (Stages 4 & 9) | recall % + retention + d′ composite → 0–10 | F · performance |
| 4 | D2 | Metacognition & SRL | 1 | Session telemetry (0.6) + MSLQ-adapted items (0.4) (layer + Stage 10) | composite → 0–10 | S · hybrid |
| 5 | D3 | Monitoring Calibration | 1 | Confidence tags on stages 1, 2, 5, 6, 8, 9 (layer) | bias class + resolution γ → {bias, res 0–10} | F bias / S res |
| 6 | E3 | Conscientiousness | 1 | Mini-IPIP C, 4 items (Stage 10) | scale mean → 0–10 | self-report |
| 7 | E5 | Exam / Test Anxiety | 1 | AMAS, 9 items, track-anchored (Stage 10) | scale total → 0–10 risk (reversed as Composure on radar) | self-report |
| 8 | A1 | Fluid Reasoning | 1 | Matrix + series + analogy + odd-one-out, 16 items (Stage 1) | proportion correct → 0–10 | F · performance |
| 9 | D1 | Executive Function / Inhibition | 2 | CRT-style traps (Stage 8) + SART commissions (Stage 7) | reflective-correct + commissions composite → 0–10 | S · performance |
| 10 | C2 | Spatial Ability | 2 → **1 for JEE** | Mental rotation + paper-folding, 12 items (Stage 5) | accuracy → 0–10 | F · performance |
| 11 | C1 | Number Sense / Mental Math | 2 | Magnitude comparison + number-line + estimation (Stage 6) | accuracy + PAE composite → 0–10 | F · performance |
| 12 | A5 | Attentional Control | 2 | SART, 90 trials (Stage 7) | RT-CoV + commission composite → 0–10 | S · performance |
| 13 | E1 | Academic Self-Efficacy | 2 | NGSE, 8 items (Stage 10) | scale mean → 0–10 | self-report |
| 14 | E2 | Motivation Quality (SDT) | 2 | SRQ-L short, 12 items (Stage 10) | RAI → profile class {Autonomous/Mixed/Controlled/Amotivated} | self-report |
| 15 | E6 | Academic Engagement | cond. | Whole-session telemetry (layer) | engagement index → 0–10, **omitted if session incomplete** | S · behavioural |

**Track emphasis carried from `Metrics_Needed.md`** — the battery itself is **exam-agnostic** (no track asked at setup). The JEE/NEET emphasis lives entirely downstream, as an optional **lens toggle on the results page** (and in how the tutor uses the profile):
- **JEE lens** → reasoning-heavy: "biggest leaks" ranking up-weights **A1, A2, C2, C1, D1**; C2 presented within the Tier-1 group.
- **NEET lens** → volume/recall/speed: up-weights **A4, A3, D3, E5**.
- Default (no lens): unweighted. Either lens leads with the differentiated bundle **D2 + D3 + E5** (design caution #2 — the layer mock tests never reveal), and D3 is a headline readout, not a footnote (caution #3).

## 1.1 The session at a glance

One sitting, **11 stages, ≈ 32 min** including instructions. Fixed order (reliability-critical blocks first, self-report last, per the fatigue and priming rules in `Problem_Design_Spec.md` §2).

| # | Stage | Measures (primary → secondary) | Active time |
|---|-------|-------------------------------|------------|
| 0 | Setup: name + device check only | — | 1 min |
| 1 | **Reasoning** — matrices, series, analogies, odd-one-out | A1 → D3 | 6 min |
| 2 | **Memory span** — backward digit span + operation span | A2 → D3 | 4 min |
| 3 | **Symbol-digit sprint** — 90 s substitution | A3 → A5, D3 | 2 min |
| 4 | **Pairs I (study)** — learn 12 symbol–word pairs | A4 (encoding) | 2.5 min |
| 5 | **Spatial** — mental rotation + paper-folding | C2 → A3, D3 | 4 min |
| 6 | **Number sense** — magnitude comparison + number-line + estimation | C1 → A3, D3 | 3 min |
| 7 | **Focus** — SART (sustained attention) | A5 → D1 | 3 min |
| 8 | **Reflection** — 6 CRT-style trap items | D1 → C1, D3 | 2.5 min |
| 9 | **Pairs II (recall)** — cued recall + recognition of stage-4 pairs | A4 (retrieval, delayed ≈ 12 min) | 2.5 min |
| 10 | **Self-report** — 35 Likert items + 2 attention checks | E1, E2, E3, E5, D2(self) | 5 min |
| — | *(passive, whole session)* interaction telemetry | D2(behavioural), E6, D3 layer | 0 |

**Why this order (design intent, keep on any revision):**
- Stages 1–2 first: Gf and span are the most fatigue-sensitive, feedback-grade axes.
- Stage 4 → stage 9 sandwich creates the **delayed-recall interval (~12 min)** required for the A4 retention score without adding time.
- Self-report last so statements about anxiety/motivation cannot prime performance.
- Stage 3 (pure speed) sits between two heavy-thinking blocks as a pacing "breather" that still yields the most reliable score in the battery.

## 1.2 Global administration rules (apply to every performance stage)

1. **Practice first.** Every performance stage opens with 2–3 untimed, unscored practice items with correctness feedback. Scored trials give **no feedback** (feedback mid-test contaminates calibration and anxiety measurement).
2. **Confidence tag on every scored item.** After each response in stages 1, 2, 5, 6, 8 (discrete-item stages): *"How sure are you? "* — 4 quick buttons: **25% / 50% / 75% / 100%** (guess → certain). One tap, < 1.5 s. This is the entire D3 item layer; it also feeds D2. Rapid-fire stages (3, 7) and recall (9) skip per-item tags; stage 9 uses them on recognition trials only.
3. **Timing discipline.** Per-item deadlines as specified per stage; a visible but non-alarming timer (thin progress bar, no ticking countdown — anxiety hygiene). All RTs logged in ms from stimulus render to response.
4. **RT hygiene.** Before scoring: drop trials with RT < 200 ms (anticipation) and RT > 10 s or > 3 SD above the student's stage mean (lapse). Log input device (`touch`/`mouse`/`keyboard`); flag speed scores measured on touch as `device_note`.
5. **No pen, paper, or calculator** — stated at setup and re-stated before stages 2, 6, 8. Enforced by design (items are mental-only per `Problem_Design_Spec.md`).
6. **No mid-test scores.** Nothing is revealed until the results page. Skipping an item is allowed (logged — it is D2/D3 signal), quitting a stage is not (partial stages score as invalid, axis omitted).
7. **One sitting, fullscreen prompt, tab-blur logging.** `visibilitychange` events are logged; > 2 blurs in a performance stage → validity flag on that stage's axes.
8. **Exam-agnostic administration.** No track/class is collected at setup; every student takes the identical battery. The JEE/NEET emphasis is a results-page lens (see §1.0): the "biggest leaks" ranker multiplies each axis's deviation-from-median by a lens weight (JEE: A1/A2/C2/C1/D1 × 1.5; NEET: A4/A3/D3/E5 × 1.5; no lens: all × 1.0) before picking the top 2–3.

## 1.3 Item bank requirements (build-time, embedded)

- Authored as a single `battery.json` embedded at build time. Every item carries: `id`, `stage`, `type`, `difficulty` (1–5 authored estimate), `answer`, `options`, `deadline_ms`, and `params_fed` (primary + secondary codes).
- **All items original** (write in-house; do not copy Raven's/MRT/PSVT items — copyright, see spec §II-A C2 caveat). Formats may follow the public-domain ICAR *styles*.
- Bank sizes below give **one full form + ~40% spare** for a retake parallel form (v1: static; adaptive/CAT is Phase 3).
- Difficulty structure per stage is specified in Part 2; author to that curve, then verify empirically at pilot.

---

# PART 2 — PER-STAGE DESIGN & CONDUCT PROTOCOL

Every stage entry has the same skeleton: **Measures · Item bank · Conduct (exact protocol) · Logged signals · Quantitative scoring · Qualitative readout.** Formulas reference `Problem_Design_Spec.md`; 0–10 mapping uses the anchor tables in Part 3.

## Stage 1 · Reasoning (A1 Fluid Reasoning)

- **Measures:** A1 (primary). Confidence tags → D3. RT pattern → D2 behavioural.
- **Item bank:** 16 scored items + 6 spares. Mix: 6 matrix (3×3 figural, 6 options), 4 number/letter series, 3 verbal analogies, 3 odd-one-out. Difficulty ramp: items 1–4 easy (authored p ≈ .8), 5–12 medium (p ≈ .5), 13–16 hard (p ≈ .25). 2 practice items (1 series, 1 matrix).
- **Conduct:** one item per screen. **45 s deadline per item** (soft: at 45 s the item auto-submits as skipped, logged `timeout`). No back-navigation. Confidence tag after each answer. Total cap 6 min.
- **Logged:** per item — response, correct, RT, confidence, timeout/skip.
- **Quantitative:** proportion correct over 16 (v1 fallback scoring; IRT θ at Phase 3). Skips/timeouts count wrong. → percentile via anchor table → band.
- **Qualitative:** rubric A1 band anchors; narrative must use "strategy-setting" framing, never "ceiling" (design caution #1 in `Metrics_Needed.md`).

## Stage 2 · Memory span (A2 Working Memory)

- **Measures:** A2 (primary). Encoding effort → A4 context. Confidence → D3.
- **Item bank:** *Backward digit span:* 9 trials — set sizes 3,3,4,4,5,5,6,6,7 (digits shown 1/s, 800 ms on / 200 ms off). *Operation span:* 4 trials — set sizes 3,4,5,6; each element = simple verification ("(3×2) − 1 = 5? Y/N", 6 s deadline) then a consonant to remember. 2 practice trials each.
- **Conduct:** digits/letters appear one at a time, centre screen; recall via on-screen keypad/letter grid (no typing ambiguity). Backward block first, then operation span. Confidence tag after each *trial* (not each digit). Verification accuracy in operation span must stay ≥ 85%; below that, the trial is flagged (trading off the processing task).
- **Logged:** per trial — recalled sequence, per-position correctness, verification accuracy, RTs, confidence.
- **Quantitative:** **partial-credit unit score** = mean over trials of (elements in correct serial position ÷ set size), computed separately for the two tasks, then averaged (equal weight). → anchors → band.
- **Qualitative:** rubric A2 anchors (chunking advice at low band, longer chains at high band).

## Stage 3 · Symbol-digit sprint (A3 Processing Speed)

- **Measures:** A3 (primary). Consistency across the 90 s → A5 support. No confidence tags.
- **Item bank:** generator, not bank: fixed key mapping 4 digits ↔ 4 abstract symbols displayed persistently at top; stream of single digits in random order (no digit twice in a row).
- **Conduct:** 20 s practice (feedback), then **one 90 s scored run**. Student taps the matching symbol as fast as possible. Progress bar only; no error feedback.
- **Logged:** every response — correct, RT; timestamps for drift analysis.
- **Quantitative:** **Rate-Correct Score = # correct ÷ 90 s** (correct responses per second). Accuracy < 80% → validity flag (speed–accuracy tradeoff broke; report accuracy-adjusted note). Latency drift (last-third mean RT ÷ first-third mean RT) stored for E6.
- **Qualitative:** rubric A3 anchors (low band → time-triage tactics; the readout must say "slow ≠ weak — accuracy-first strategy" where accuracy is high).

## Stages 4 & 9 · Paired-associate learning (A4 Learning Efficiency / Retrieval)

- **Measures:** A4 (primary): encoding speed, immediate recall, delayed retention, recognition sensitivity. Recognition confidence tags → D3.
- **Item bank:** 12 symbol–word pairs (abstract glyph + concrete Hindi/English-neutral noun, e.g. `⬢ = spring`), authored to avoid pre-existing associations; + 12 recombined foils for recognition. Spares: 8 pairs.
- **Conduct — Stage 4 (study):** two study cycles. Cycle 1: each pair shown 4 s. Cycle 2: **test-with-feedback** — cue shown, student picks the word from 4 options, correct answer then shown 1.5 s (this is retrieval practice, the strongest encoding signal). Immediate cued-recall score = cycle-2 accuracy.
- **Conduct — Stage 9 (recall, ≈ 12 min later):** (a) cued recall, 12 trials, 4-option; no feedback. (b) recognition, 16 trials: intact vs recombined pair → "seen exactly this pair? yes/no" + confidence tag.
- **Logged:** cycle-2 accuracy, delayed accuracy, recognition hits/false alarms, RTs, confidence.
- **Quantitative:** three sub-scores, z-averaged: **immediate recall** (cycle-2 %), **retention ratio** = delayed ÷ immediate (capped at 1), **recognition d′** with log-linear correction (spec §A4). Composite → anchors → band.
- **Qualitative:** rubric A4 anchors; low band prescribes spaced retrieval + mnemonics (the NEET-volume lever).

## Stage 5 · Spatial (C2 Spatial Ability)

- **Measures:** C2 (primary). RT-vs-angle slope → secondary speed signal. Confidence → D3.
- **Item bank:** 12 scored + 5 spare: 8 mental rotation (2D block figures, same-vs-mirror, angular disparity 45/90/135/180° balanced) + 4 paper-folding (fold-and-punch, 4 options). All original artwork. 2 practice.
- **Conduct:** one item per screen, **30 s deadline**, confidence tag after each. Rotation items instruct: "decide whether the right figure is a *rotation* or a *mirror image* of the left."
- **Logged:** correct, RT, angular disparity, confidence.
- **Quantitative:** accuracy proportion (primary). RT slope vs angle computed and stored (secondary, not banded in v1 — needs more trials for stability). → anchors → band.
- **Qualitative:** rubric C2 anchors + the explicit "trainable" message (g ≈ 0.47 training effect — always show the growth frame). Note in data: sex-difference norming caveat (spec §C2).

## Stage 6 · Number sense (C1 Number Sense / Mental Math)

- **Measures:** C1 (primary). Comparison RT → A3 support. Confidence → D3 (estimation items only).
- **Item bank:** three sub-blocks: (a) **symbolic comparison** — 24 trials, "which is larger?" two 2-digit numbers, numerical distance varied 1–40, **3 s deadline**; (b) **number-line** — 10 trials, tap position of a number on an unmarked 0–1000 line; (c) **rapid estimation** — 6 items, "≈ 34 × 19?" with 3 options, 15 s, confidence-tagged.
- **Conduct:** sub-blocks in the order a → b → c with one-line instructions each; practice 2 trials per sub-block.
- **Logged:** correct/estimate value, RT, distance (for a), target + tap position (for b), confidence (for c).
- **Quantitative:** composite of z-scored: comparison **accuracy** (primary — the stronger maths predictor), number-line **PAE** = mean(|estimate − target|)/1000 × 100 (reverse-signed), estimation accuracy. → anchors → band. (Nonsymbolic dot arrays and Weber *w* are **dropped from v1** — they need 100+ trials for stability; accuracy-based measures carry the axis.)
- **Qualitative:** rubric C1 anchors (low band → explicit estimation tricks, order-of-magnitude checking).

## Stage 7 · Focus (A5 Attentional Control)

- **Measures:** A5 (primary), Go/No-Go commissions → D1 support.
- **Item bank:** generator: digits 1–9, 90 trials, 2 s each (250 ms stimulus + response window), No-Go digit = 3, No-Go rate = 11% (10 withholds).
- **Conduct:** "Tap for every digit EXCEPT 3." 15 practice trials with feedback, then 90 scored trials (~3 min) without. Explicitly framed as a focus (not speed) task.
- **Logged:** per trial — response/withhold, correct, RT.
- **Quantitative:** composite (z-average, **RT-CoV weighted 2:1 over commissions** per spec §A5): RT coefficient of variation on Go trials (reverse) + commission-error rate (reverse). Omission rate > 15% → validity flag (disengagement, feeds E6). → anchors → band. **Screening grade (S)** — always shown with the wider confidence band.
- **Qualitative:** rubric A5 anchors (low band → chunked study blocks, active checkpoints).

## Stage 8 · Reflection traps (D1 Executive Function / Inhibition)

- **Measures:** D1 (primary — reflective override), C1 support, confidence → D3 (trap items are the most diagnostic calibration probes in the battery).
- **Item bank:** 6 CRT-style items + 4 spares, **original numbers/contexts** (the bat-and-ball classic is memorised by this cohort — never use published CRT items verbatim). Each has a designed intuitive-lure answer. ₹/Indian contexts. 1 practice (non-trap, to avoid tipping students off).
- **Conduct:** one per screen, **40 s deadline**, numeric-entry or 4-option (lure always present), confidence tag after each. Do not announce that items contain traps.
- **Logged:** answer classified {reflective-correct, lure, other-wrong}, RT, confidence.
- **Quantitative:** # reflective-correct (0–6) combined (z-average) with SART commissions from stage 7 → D1 composite → anchors → band. **Screening grade (S).** Lure-rate stored separately — it drives the "silly-mistake risk" narrative.
- **Qualitative:** rubric D1 anchors (low band → checking rituals, trap-pattern flags in the tutor).

## Layer · D3 Monitoring Calibration (computed — no items of its own)

- **Input:** every (confidence, correct) pair from stages 1, 2, 5, 6, 8 + stage 9 recognition ≈ **60–70 judgments** (v1 accepts this; the ≥100 ideal arrives when retakes accumulate — resolution is reported with a wide band at n < 100).
- **Quantitative (formulas in spec §II-B):**
  - **Bias** = mean(confidence) − mean(accuracy). Classification for the tutor schema: bias > **+0.05** → `Overconfident`; < **−0.05** → `Underconfident`; else `Well-calibrated`.
  - **Resolution** = Goodman–Kruskal gamma over trial pairs → mapped to 0–10 via anchors (γ ≤ 0 → 0–1; γ ≈ .5 → 5; γ ≥ .85 → 9–10).
  - Brier score stored for the record; not displayed in v1.
- **Guardrails:** if accuracy > 90% or < 15% overall (too easy/too hard for gamma to be stable) or < 40 valid judgments → resolution flagged `provisional`, bias still reported. Always display base-rate accuracy next to the gauge.
- **Qualitative:** headline readout — the attempt-vs-skip narrative under negative marking: overconfident → "your confidence costs you negatives"; underconfident → "you skip marks you own"; plus the resolution sentence ("your confidence does/doesn't know when you're right").

## Stage 10 · Self-report (E1, E2, E3, E5, D2-self)

- **Measures & instruments** (items per spec §II-C, all embedded, 5-point Likert unless noted):
  - **E1** Academic Self-Efficacy — NGSE, 8 items.
  - **E2** Motivation Quality — SRQ-L short, 12 items, 7-point, Autonomous + Controlled subscales.
  - **E3** Conscientiousness — Mini-IPIP C, 4 items (2 reverse-keyed).
  - **E5** Exam Anxiety — AMAS, 9 items, generic exam/test wording (no track-specific anchoring, since track isn't collected).
  - **D2-self** — 6 MSLQ-adapted planning/monitoring items.
  - **+2 attention checks:** one instructed-response ("Select 'Agree' for this item"), one infrequency ("I have never used a phone"). Positions ~12 and ~28.
- **Conduct:** one scrolling list, randomised within-scale order, reverse-keyed items mixed in; progress indicator; ~5 min; a short neutral framing line: *"No right answers — answer for how you actually are, not how you'd like to be."*
- **Quantitative:** scale mean each (reverse-keyed handled) → anchors → band. **E2** additionally: **RAI = mean(Autonomous) − mean(Controlled)**; profile class: RAI ≥ +1 → `Autonomous`; −1 < RAI < +1 → `Mixed`; RAI ≤ −1 → `Controlled`; both subscale means < 3 → `Amotivated` (overrides).
- **Business logic:** fail either attention check → entire self-report block flagged `invalid`; axes omitted from radar and JSON carries nulls + flag. **E5 ≥ +1 SD** (AMAS ≥ 28) → `riskFlag: true` + supportive message + resource pointer (never a scary label); E5 plotted reverse as **Composure**.
- **Qualitative:** rubric E-domain anchors; pair with performance axes per design caution #4 (e.g., high anxiety + low speed → address anxiety first).

## Layer · D2 Metacognition/SRL (self-report + behavioural composite) and E6 Engagement

- **D2 behavioural half** (from whole-session telemetry, spec §II-D): (a) response-to-difficulty adaptivity = within-stage correlation of RT with authored item difficulty (positive = adaptive slowing); (b) post-error persistence = accuracy on items immediately following an error ÷ overall accuracy; (c) skip quality = proportion of skips that were low-confidence items (good skipping) where tags exist.
- **D2 score:** z-average of behavioural index (weight 0.6) + D2-self scale (weight 0.4) → anchors → band. If telemetry is sparse (many skipped stages) → fall back to self-report only, grade S.
- **E6 Engagement (conditional axis):** completion rate, non-response/abandon rate, latency drift across stages, blur count → index → band. **Only emitted if the session was completed**; a quit session produces no E6 axis at all (never fake it).

---

# PART 3 — SCORING PIPELINE & PROVISIONAL NORMS

## 3.1 Pipeline (identical for every axis)

```
clean trials → raw metric (Part 2 formulas) → percentile via anchor table (3.2)
→ 0–10 band via master conversion (02_Scoring_Rubric.md §0) → integer band only
→ store {raw, percentile, band, grade F/S, validity flags, device}
```

Rules carried from the rubric: report the **integer band only** (no decimals); store raw + percentile underneath; single-task axes are provisional by definition; **higher = better on every displayed axis** (anxiety reversed as Composure; E5 stored raw in JSON because `tutor.html` expects "higher = more anxious").

## 3.2 Provisional anchor tables (v1 — literature-derived, replace at pilot)

Percentile anchors P10/P25/P50/P75/P90; linear interpolation between anchors; clamp outside. Values are **provisional engineering anchors** synthesised from the task literature cited in `Problem_Design_Spec.md` (ICAR norms, WAIS-era span/DSST distributions, NIH Toolbox, CRT and SART distributions, AMAS/NGSE/Mini-IPIP scale norms), adjusted for an academically selected 16–19 cohort. **Every anchor must be re-estimated from pilot data; the results page must label scores "provisional norms v1" until then.**

| Axis | Raw metric | P10 | P25 | P50 | P75 | P90 |
|------|-----------|----:|----:|----:|----:|----:|
| A1 | proportion correct (16 items) | .25 | .38 | .50 | .63 | .78 |
| A2 | partial-credit unit score | .42 | .55 | .68 | .80 | .90 |
| A3 | rate-correct (correct/s, 90 s) | .35 | .45 | .55 | .68 | .80 |
| A4 | composite z of (imm. recall %, retention, d′) — anchor each: | 35% / .60 / 1.0 | 45% / .70 / 1.5 | 58% / .80 / 2.0 | 72% / .90 / 2.6 | 85% / .95 / 3.2 |
| A5 | RT-CoV (reverse) / commission rate (reverse) | .45 / 60% | .38 / 48% | .30 / 35% | .24 / 22% | .18 / 10% |
| C1 | comparison acc / NLE PAE (rev) / estimation acc | .78 / 6.0% / .33 | .84 / 4.5% / .50 | .90 / 3.5% / .67 | .94 / 2.5% / .83 | .97 / 1.5% / 1.0 |
| C2 | rotation+folding accuracy | .42 | .55 | .67 | .80 | .90 |
| D1 | CRT correct (of 6) / SART commissions (rev) | 1 / 60% | 2 / 48% | 3 / 35% | 4 / 22% | 5 / 10% |
| D3-res | Goodman–Kruskal γ | .10 | .30 | .50 | .70 | .85 |
| E1 | NGSE mean (1–5) | 3.1 | 3.5 | 3.9 | 4.3 | 4.6 |
| E3 | Mini-IPIP C mean (1–5) | 2.4 | 2.9 | 3.4 | 3.9 | 4.4 |
| E5 | AMAS total (9–45; **higher = worse**) | 12 | 16 | 21 | 26 | 31 |
| D2 | composite (behavioural .6 + MSLQ-mean .4) | scale-relative: anchor MSLQ mean 2.6 | 3.0 | 3.5 | 3.9 | 4.3 |
| E6 | engagement index (completion/latency-drift composite) | rubric-banded, not percentile (see 3.3) | | | | |

Multi-metric axes (A4, A5, C1, D1, D2): convert each sub-metric to a percentile via its own anchors, average percentiles with the stated weights, then band.

## 3.3 Business-logic guardrails (override layer, applied after banding)

1. **Validity gates:** attention-check failure → E-block axes null. Stage abandoned → that axis null. Speed axis on touch device → `device_note`, band unchanged but confidence widened. > 2 tab-blurs in a stage → axis flagged.
2. **Floor/ceiling honesty:** raw accuracy ≥ .95 on any performance stage → band capped at 9 with note "ceiling — retest with harder form" (a 16-item test cannot certify a 10).
3. **E5 risk overlay:** band ≥ 7 on raw anxiety (AMAS ≥ ~+1 SD) → `riskFlag`, supportive copy, resource pointer, and the D2/E1 pairing rule (never show "low ability" narratives alongside a high-anxiety flag without the anxiety-first framing).
4. **E6 rubric bands** (not percentile): completed all stages, drift < 20%, no abandons → 7–10; completed with drift/blurs → 4-6; abandons or forced-march pattern → 0–3.
5. **Grade labels:** F (feedback) axes: A1, A2, A3, A4, C1, C2, D3-bias. S (screening): A5, D1, D2, E6, D3-res (until ≥100 judgments). Self-report axes labelled `self-report`. The radar must visually distinguish all three (spec Part III §2–3).
6. **No labeling, no ceilings:** every band ships with its rubric instructional implication and a growth frame for malleable axes (A4, A5, C2, D1, D2, D3, E1, E5).

---

# PART 4 — OUTPUT CONTRACT (feeds the results HTML and tutor.html)

## 4.1 `mirror_profile.json` — exact schema

The battery emits one JSON. The `params` object **must byte-for-byte match** what `tutor.html` stores in `profile.params` (verified against `PARAMS` in `app/tutor.html`, lines 311–376):

```json
{
  "schema": "parameter-mirror/profile.v1",
  "generated": "2026-07-13T10:42:00+05:30",
  "student": { "name": "…", "device": "mouse" },
  "norms": "provisional-v1-literature",

  "params": {
    "A2": 6, "A3": 4, "A4": 7,
    "D2": 5,
    "D3": { "bias": "Overconfident", "res": 6 },
    "E3": 5, "E5": 7, "A1": 6,
    "D1": 4, "C2": 8, "C1": 6, "A5": 5,
    "E1": 6, "E2": "Mixed",
    "E6": 7
  },

  "detail": {
    "A2": { "raw": 0.71, "percentile": 62, "grade": "F", "flags": [] },
    "A3": { "raw": 0.48, "percentile": 33, "grade": "F", "flags": ["device_touch"] },
    "D3": { "bias_value": 0.09, "gamma": 0.55, "brier": 0.18,
             "n_judgments": 64, "base_rate": 0.61, "flags": ["res_provisional"] },
    "E5": { "raw": 29, "percentile": 84, "grade": "self-report",
             "riskFlag": true, "flags": [] },
    "…": "one entry per axis; null band ⇒ axis omitted from params too"
  },

  "telemetry_summary": { "duration_min": 31.4, "blurs": 1, "skips": 3,
                          "post_error_persistence": 0.94, "rt_difficulty_r": 0.41 },
  "validity": { "attention_checks": "pass", "complete": true }
}
```

**Contract rules:**
- `params` values: integers 0–10 for slider-type; D3 exactly `{bias: "Overconfident"|"Well-calibrated"|"Underconfident", res: 0–10}`; E2 exactly one of `"Autonomous"|"Mixed"|"Controlled"|"Amotivated"`; E5 is the **raw-direction anxiety band** (higher = more anxious — matches the tutor's `riskFlag` slider semantics).
- An invalid/missing axis is **absent from `params`** (tutor keeps its default 5) and `detail` explains why. Never emit a fabricated number.
- `detail`, `telemetry_summary`, `validity` are for the results page and future norming; the tutor only reads `params`.

## 4.2 Results HTML (next artifact — requirements it must satisfy)

1. **Radar** of all slider axes, 0–10, outward = better, E5 rendered as Composure (10 − band); F/S/self-report axes visually distinct; confidence bands per axis.
2. **D3 shown beside the radar, not on it:** centred bias gauge (over ↔ under) + resolution 0–10 + base-rate accuracy.
3. **Auto-summary:** 2–3 "biggest strengths / biggest leaks" lines from extreme bands, each with the rubric's instructional implication; anxiety-first pairing rule enforced.
4. **Export:** download `mirror_profile.json` + copy-to-clipboard; import instructions for `tutor.html` (tutor needs a matching "import profile JSON" affordance — small addition to make there).
5. **Provisional-norms banner** until pilot norms ship.

---

# PART 5 — CONDUCT CHECKLIST (administration one-pager)

Before session: quiet room, single device, fullscreen, ~35 uninterrupted minutes, no pen/paper/calculator within reach.
During: the app enforces order, deadlines, practice, confidence tags; the student may skip items but not stages; no scores shown mid-test.
After: results page renders radar + gauges + summary; export JSON; load into tutor; repeat the battery no sooner than **2 weeks** later (retest window) using the spare parallel form.

**Validation before trusting the mirror** (unchanged from spec Part III §5): pilot → item stats → drop weak items → ω per axis → test–retest subsample → convergent checks → publish per-axis reliability in-product.
