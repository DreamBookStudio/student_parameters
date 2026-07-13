# Problem Design & Scoring Specification — "The Parameter Mirror"

**Project:** Student Psychometric Analysis · **Product folder deliverable**
**What this is:** the design spec for a rapid, timed, IQ-test-style battery that measures a JEE/NEET aspirant's cognitive and dispositional parameters and returns a **radar (spider) chart** of all of them. It specifies, per parameter: how to test it, the kind of problem statements needed, what behaviour maps to the parameter, how many questions are enough, and the exact algorithm to compute the score.
**What this is NOT:** a syllabus test or exam-prep tool. It measures *how this brain works*, not what it knows. (Subject mastery = the job of mock tests.)
**Companions:** `Metrics_Needed.md` (which parameters apply) · `../research/parameters/` (the underlying framework, rubric, schema). Parameter codes (A1…E6) match those files.
**Date:** 2026-07-01. Every quantitative claim below is sourced (see References); load-bearing psychometric facts were verified against primary sources.

---

# PART I — GLOBAL DESIGN

## 1. Product goal and the one hard constraint

A student runs through a ~25–30 minute battery of short, self-scoring items (no pen, paper, or calculator), rates their confidence as they go, and receives a radar chart of ~15 parameters plus plain-language "your strengths / your leaks" feedback. The purpose is **self-awareness → targeted effort**: a mirror.

The hard constraint (no pen/paper/calculator) is a *feature*: it forces items that measure the underlying cognitive machinery (reasoning, memory, speed, magnitude sense, spatial manipulation, inhibition) rather than trained procedures. All formats specified here are validated for on-screen, mental-only administration.

## 2. Six design principles (each is a research finding, not a preference)

1. **Prefer accuracy / rate scores over "difference scores."** Interference and switch-cost scores (Stroop, flanker, task-switch) are theoretically clean but individually **unreliable** — the *reliability paradox*: tasks built to produce big group effects deliberately minimise between-person variance, so the subtraction (incongruent − congruent) has median test–retest r ≈ .40 (Hedge, Powell & Sumner, 2018). **Rule: score overall accuracy / efficiency in the demanding condition; never rank a student on a raw difference score.**
2. **Use robust scoring: median (not mean) RT on correct trials; partial-credit for span; combine speed+accuracy with IES or rate-correct.** Partial-credit unit scoring of span is a free reliability gain (Conway et al., 2005).
3. **Length follows Spearman–Brown, not vibes.** Reliability rises with length but with diminishing returns: going from r≈.60 to r≈.80 needs ~2.7× the items. Set a **MIN (screening, reliability ≈.70)** and a **TARGET (individual feedback, ≈.80)** per parameter (Nunnally convention; AERA/APA/NCME Standards 2014). Adaptive item selection (CAT) can hit the target with ~half the items where a calibrated item bank exists (Gibbons et al., 2008).
4. **Respect fatigue.** Cognitive fatigue degrades scores after ~30 min in adolescents (Ackerman & Kanfer, 2009). Cap active testing at **~25–30 min**; front-load reliability-critical tasks (matrix reasoning, span) before fatigue accrues; benchmark against the NIH Toolbox where useful domain scores come from 3–7 min blocks (Weintraub et al., 2013).
5. **The confidence layer is free calibration.** Attach a "how sure are you?" rating to every scored cognitive item. Calibration (D3) is then computed from (confidence, correctness) pairs already collected — no separate item bank. Confidence judgments accrue across the whole battery, giving the ≥100 trials that stable calibration metrics need.
6. **Standardise the measurement context.** RT-based scores are confounded by input device (touch vs. mouse vs. keyboard). Record device/input type; z-score speed metrics *within* device class; exclude anticipations (RT < 150–200 ms) and lapses (RT > ~10 s or >3 SD) before scoring.

## 3. Which parameters this battery measures, and by what means

The battery covers the JEE/NEET-applicable set from `Metrics_Needed.md`. They fall into four measurement modes:

| Mode | Parameters | Item vehicle |
|------|-----------|--------------|
| **Performance items** (right/wrong, timed) | A1 Fluid Reasoning · A2 Working Memory · A3 Processing Speed · A4 Learning Efficiency · A5 Attentional Control · C1 Number Sense · C2 Spatial · D1 Executive/Inhibition | Mental tasks (§ Part II-A) |
| **Metacognitive layer** (computed, no own items) | D3 Monitoring Calibration | Confidence tag on every item (§ II-B) |
| **Self-report block** (Likert statements) | E1 Self-Efficacy · E2 Motivation Quality · E3 Conscientiousness · E5 Exam/Math Anxiety · (self-report half of D2) | Short validated scales (§ II-C) |
| **Behavioural telemetry** (in-test behaviour) | D2 Metacognition/SRL (behavioural half) · E6 Engagement | Traces: time allocation, persistence, revisits (§ II-D) |

**Honest scope note:** the performance items are the core "IQ-style" mirror. D2/SRL and E-block are dispositional and cannot be captured by right/wrong puzzles alone — they use short self-report + behavioural traces, and are flagged on the radar as *self-report grade* rather than *performance grade*.

## 4. Item → parameter mapping, including dual-purpose items

One well-designed item can feed several parameters. Key reuse (this is how the battery stays short):

| Item / task | Primary parameter | Also feeds |
|-------------|-------------------|------------|
| Timed mental estimation / arithmetic | C1 Number Sense | A3 Speed (RT), D3 Calibration (confidence) |
| Mental rotation | C2 Spatial | A3 Speed (RT slope), D3 |
| Flanker (arrows) | A5 Attention | D1 Inhibition, D3 |
| n-back / running memory | A2 Working Memory | A5 Attention, D3 |
| Cognitive Reflection Test items | D1 Inhibition (reflective override) | C1 Number Sense, D3 |
| Matrix reasoning (moderate deadline) | A1 Fluid Reasoning | A3 (mild), D3 |
| Symbol-digit substitution | A3 Processing Speed | A5 (sustained), D3 |
| Paired-associate learn→recall | A4 Learning Efficiency | A2 (encoding), D3 |
| **Every scored item** | its own parameter | **D3 Calibration** (confidence tag) |
| **Whole-session behaviour** | — | **D2 SRL** + **E6 Engagement** (time use, persistence, skips, review) |

**Design rule for dual-purpose items:** hold the item constant but log *all* relevant signals (accuracy, RT, confidence). Only count an item toward a parameter if the item was *designed* to load on it — do not retro-fit (e.g., a mental-rotation RT is a valid Speed signal, but rotation accuracy is a Spatial signal, not a Speed one).

## 5. Scoring pipeline (raw → radar)

Every parameter follows the same five-step pipeline; only the "metric" step differs.

1. **Clean.** Drop practice trials, anticipations, lapses, and responses from failed attention checks.
2. **Compute the raw metric** (parameter-specific formula — see Part II): proportion correct, median correct RT, IES, rate-correct score, span partial-credit, Weber fraction, PAE, d′, calibration bias, gamma, etc.
3. **Standardise.** Convert to a z-score against a reference group. **Phase 1 (pre-norms):** z within the current test cohort (report scores as provisional/relative). **Phase 2 (after piloting N ≥ ~300–500 per age):** z against stable age norms. Reverse-sign metrics where lower-is-better (RT, IES, Weber, PAE, anxiety) so that **higher z = better** on every axis.
4. **Map to 0–10.** Apply the master conversion in `../research/parameters/02_Scoring_Rubric.md` (percentile → band): z→percentile→0–10. This keeps every axis on one comparable, equal-interval-ish scale.
5. **Composite + radar.** For parameters with several indicators, the parameter score = mean of standardised sub-scores (then →0–10). Plot all parameters on the radar; **visually flag screening-grade axes** (reliability ≈.70: e.g., inhibition, n-back) differently from feedback-grade axes (≈.80: matrix, span, speed) so a student never over-reads a noisy axis. Anxiety is plotted as **"composure" (reverse of anxiety)** so that, on every axis, *further out = better*.

**Calibration direction on the chart:** plot D3 as two readouts — a **composure/bias needle** (over↔under-confident, centred = good) and a **resolution 0–10** (how well confidence tracks correctness). Bias is not "higher = better", so it is shown as a centred gauge, not a radar spoke.

## 6. Battery blueprint — item counts, time, and reliability grade

Counts are fixed-form; a calibrated adaptive engine could cut the TARGET column ~50% (Gibbons et al., 2008). "Trials" = timed responses; "items" = discrete problems. Reliability grade: **F** = feedback (~.80), **S** = screening (~.70).

| Block (order) | Parameter(s) | MIN | TARGET | ~Time | Grade | Scoring metric |
|---|---|---|---|---|---|---|
| 1. Matrix + series + analogy | A1 Fluid Reasoning | 8–11 | **16** | 5–6 min | F | proportion correct → IRT θ |
| 2. Backward / complex span | A2 Working Memory | 9 | **12–15** | 4 min | F | partial-credit unit score |
| 3. Symbol-digit substitution | A3 Processing Speed | 20–30 | **40–60** (~90 s) | 2 min | F | rate-correct = correct/sec |
| 4. Mental rotation + paper-fold | C2 Spatial | 6–8 | **12–16** | 3–4 min | F | accuracy (+ RT slope) |
| 5. Magnitude comparison + number-line | C1 Number Sense | 20–30 cmp / 15 NLE | **40 cmp / 20 NLE** | 3 min | F | accuracy / Weber w / PAE |
| 6. Flanker (arrows) | A5 Attention + D1 Inhibition | 40–60 | **~120/condition** ideal | 3 min | S | overall incongruent acc/RT (not diff) |
| 7. CRT (reflection) | D1 Inhibition + C1 | 3 | **6–7** | 2 min | S | # reflective-correct |
| 8. Paired-associate learn → delayed recall | A4 Learning Efficiency | 12 pairs | **20 pairs + recog.** | 3 min (+delay) | F | recall %, d′, trials-to-criterion |
| (layer) Confidence tag on blocks 1–8 | D3 Calibration | — | ≥100 judgments | +0 | F* | bias, gamma, Brier, meta-d′ |
| 9. Self-report | E1,E2,E3,E5, D2(self) | — | **~35 items** | 5 min | self-report | scale means → z |
| (passive) Session behaviour | D2 SRL, E6 Engagement | — | — | +0 | S | time-use, persistence, revisits |

**Active total ≈ 26–30 min** — within the adolescent fatigue budget, with reliability-critical blocks (1, 2) first. *F for calibration assumes the confidence layer accrues ≥100 judgments across the battery.

---

# PART II-A — PERFORMANCE PARAMETERS (cognitive items)

Each section: what it is · how to test (no pen/paper) · example problem statements · behaviour→parameter · how many · scoring algorithm · dual-purpose & caveats.

## A1 · Fluid Reasoning (Gf)
**What.** Reasoning and rule-finding on novel problems — the engine of JEE-style multi-step problem solving.
**How to test.** Matrix reasoning (3×3 grid, pick the missing tile), number/letter series, verbal analogies, odd-one-out. (The four ICAR item types.) Moderate per-item deadline (e.g., 30–45 s) so accuracy carries the signal.
**Example problem statements.**
- Series: `2, 4, 7, 11, 16, ?` → 22 (differences +2,+3,+4,+5,+6).
- Matrix: a 3×3 of shapes where rotation + shading follow rules; choose the 6th-option tile that completes both.
- Analogy: `hand : glove :: foot : ?` → sock.
- Odd-one-out: `{81, 64, 49, 50, 36}` → 50 (not a perfect square).
**Behaviour → parameter.** Proportion correct on hard items (primary). Untimed/generously-timed accuracy = Gf; do **not** convert Gf to a speed score.
**How many.** MIN 8–11 items (screening); **TARGET 16** mixed items (ICAR-16 reached α = .81; matrix items are the hardest to make reliable, so budget ≥12 if matrix-only).
**Scoring algorithm.** Best: calibrate items with a 2-parameter IRT model, estimate ability θ per student; θ → z → 0–10. Simple fallback: proportion correct, or sum of z-scored subtype scores. → map to 0–10 via the master conversion.
**Dual-purpose / caveats.** Mild deadline yields a weak A3 signal (don't double-count). Confidence tag → D3.
**Refs.** Condon & Revelle (2014).

## A2 · Working Memory
**What.** Holding and manipulating information mid-task — carries multi-step PCM problems.
**How to test.** Backward digit span; complex span (operation/symmetry span) with on-screen recall grid; running-memory / 2-back for engagement.
**Example problem statements.**
- Backward span: digits `4 · 9 · 2 · 7` shown 1/s → "enter in reverse": 7 2 9 4.
- Operation span: "Is (3×2) − 1 = 5?  [Y/N]" → then a letter "R" to remember → repeat 3–6 times → "recall the letters in order."
- 2-back: stream of letters; tap when the current letter equals the one two back.
**Behaviour → parameter.** Items recalled in correct serial position; span reached. (n-back: signal-detection d′.)
**How many.** MIN ~9 trials (3 set-sizes × 3); **TARGET 12–15 trials**, partial-credit scored.
**Scoring algorithm.** **Partial-credit unit score** = mean over trials of (items in correct position / set size) → z → 0–10. If n-back is used: d′ = z(hit rate) − z(false-alarm rate). **Prefer complex/backward span over n-back for the scored axis** (n-back has weak individual-differences reliability); use n-back only as an engaging load task.
**Dual-purpose / caveats.** n-back also indexes A5; use span for the graded A2 axis. Confidence → D3.
**Refs.** Conway et al. (2005); Jaeggi et al. (2010).

## A3 · Processing Speed
**What.** Speed/fluency of simple decisions — attempts completed under time pressure (critical for NEET volume).
**How to test.** Symbol-digit substitution (key maps digits↔symbols); pattern comparison (same/different, fast); choice reaction time.
**Example problem statements.**
- Substitution: key `1=◇ 2=△ 3=○ 4=□`; stream "3 1 4 2 …" → tap the matching symbol as fast as possible for 90 s.
- Pattern comparison: two figures side by side → "identical? yes/no", go fast.
**Behaviour → parameter.** Number correct in a fixed time window; or median correct-trial RT.
**How many.** MIN 20–30 trials (~2–3 min); **TARGET 40–60** in a ~90 s block.
**Scoring algorithm.** **Rate-Correct Score** RCS = (# correct) / (total time in seconds) = correct responses per second → z → 0–10. For choice RT: median correct RT (reverse-signed). Use IES = mean correct RT / proportion correct only when error rate < ~15%.
**Dual-purpose / caveats.** Standardise input device (touch vs mouse changes RT). Most reliable block (DSST test–retest ≈ .85–.95). Confidence → D3.
**Refs.** Carlozzi et al. (2015); Bruyer & Brysbaert (2011).

## A4 · Learning Efficiency / Retrieval
**What.** How fast you encode and how reliably you retrieve new material — the biggest lever for NEET Biology / inorganic-chemistry volume.
**How to test.** Paired-associate learning (learn N novel pairs over K study cycles → cued recall, immediate + short delay); recognition memory (old/new) scored by signal-detection.
**Example problem statements.**
- Learn 12 symbol–word pairs (`☂ = river, ▲ = copper, ⬢ = spring …`) in a study phase → test: "`☂` = ?".
- Delayed recall of the same pairs after ~10 min of other blocks (retention).
- Recognition: "Have you seen this pair before? old / new."
**Behaviour → parameter.** Trials-to-criterion (fewer = more efficient) OR recall accuracy after fixed exposure; retention = delayed ÷ immediate; recognition d′.
**How many.** MIN 12 pairs; **TARGET 20 pairs + 40–60 recognition trials.**
**Scoring algorithm.** Recall proportion; d′ = z(H) − z(FA) with **log-linear correction** H = (hits + 0.5)/(hits + misses + 1), FA = (FA + 0.5)/(FA + CR + 1); criterion c = −0.5·[z(H) + z(FA)]. Composite (immediate recall, retention, d′) → z → 0–10.
**Dual-purpose / caveats.** Encoding phase also taxes A2. Learning-efficiency scores are reliable across 30 h and 3 y (Zerr et al., 2018).
**Refs.** Zerr et al. (2018); Macmillan & Creelman (2005).

## A5 · Attentional Control
**What.** Sustaining focus and resisting lapses across long papers and study blocks.
**How to test.** Sustained Attention to Response Task (SART): respond to every digit except a rare No-Go; or sustained choice-RT tracking RT variability. (Flanker doubles here.)
**Example problem statements.**
- SART: digits 1–9 stream quickly → "tap for every digit EXCEPT 3 (withhold on 3)."
**Behaviour → parameter.** Commission errors (responding to No-Go), omissions, and RT coefficient of variation CoV = SD(RT)/mean(RT).
**How many.** MIN 40–60 trials; **TARGET 80–100.**
**Scoring algorithm.** Composite of commission-error rate (reverse-signed) + RT-CoV (reverse-signed) → z → 0–10. **Weight RT-CoV higher** (more reliable than commission count).
**Dual-purpose / caveats.** Screening-grade unless trial count is high. Overlaps A2 (executive attention) — don't treat as fully independent.
**Refs.** Robertson et al. (1997).

## C1 · Number Sense / Quantitative Reasoning
**What.** Intuitive magnitude/estimation — fast option-elimination and answer sanity-checking.
**How to test.** Nonsymbolic dot-array comparison (flashed ~500 ms to block counting); symbolic magnitude comparison (vary numerical distance); number-line estimation; rapid estimation.
**Example problem statements.**
- Dot arrays flash → "which side had more? L/R."
- "Which is larger: 68 or 71?" (fast; small distance = harder).
- "Tap where 240 sits on a 0–1000 line."
- "≈ 34 × 19? nearest: 500 / 650 / 800" → 650.
**Behaviour → parameter.** Accuracy + RT (comparison); Weber fraction w (nonsymbolic acuity); Percent Absolute Error and linearity (number-line).
**How many.** MIN 20–30 comparisons + 15 number-line; **TARGET 40 + 20.** (Stable Weber w needs ≥100–150 trials — use accuracy as the stable backup.)
**Scoring algorithm.** Symbolic-comparison accuracy (the stronger math predictor, r ≈ .30); **PAE = mean(|estimate − target| / scale-range) × 100** (reverse-signed); number-line **linearity R²** (fit estimate ~ target); optional Weber w (psychophysical fit; reverse-signed). Composite → z → 0–10.
**Dual-purpose / caveats.** RT feeds A3; confidence → D3. Nonsymbolic w is stimulus-protocol-sensitive — fix one visual-control protocol.
**Refs.** Halberda et al. (2008); Siegler & Booth (2004); Schneider et al. (2017).

## C2 · Spatial Ability
**What.** Mental rotation/visualisation — 3D geometry, vectors, rotational mechanics, stereochemistry. Trainable, so highly actionable.
**How to test.** Mental rotation (same vs mirror; vary angular disparity 0–180°); mental paper-folding (punched-hole); cube/net matching.
**Example problem statements.**
- "Is the right block figure a rotation of the left one, or its mirror image?"
- "This paper is folded as shown and a hole is punched — which unfolded sheet is correct?" (4 options).
**Behaviour → parameter.** Accuracy; correct-trial RT and its slope vs angular disparity (rotation rate).
**How many.** MIN 6–8 items; **TARGET 12–16** (rotation items are internally very consistent — ICAR R3D α = .93 at 24 items — so few go far).
**Scoring algorithm.** Accuracy proportion; RT-vs-angle slope β₁ from RT = β₀ + β₁·(angle) (smaller β₁ = faster mental rotation, reverse-signed). Composite → z → 0–10.
**Dual-purpose / caveats.** RT feeds A3. **Flag the well-documented sex difference** for fair norming (norm within sex or monitor for bias). Watch instrument copyright (MRT, PSVT:R) — use licensed or original items.
**Refs.** Vandenberg & Kuse (1978); Shepard & Metzler (1971).

## D1 · Executive Function / Inhibition
**What.** Suppressing the intuitive-but-wrong response — "silly-mistake" and distractor-trap control.
**How to test.** Eriksen flanker (respond to the center arrow); numerical/color Stroop (color-key response, no voice); Go/No-Go; Cognitive Reflection Test items for reflective override.
**Example problem statements.**
- Flanker: `> > < > >` → respond to the center (`<`, left).
- CRT: "A bat and ball cost ₹110 together; the bat costs ₹100 more than the ball. How much is the ball?" (lure = 10; correct = 5).
- Numerical Stroop: "which is numerically larger?" when physical font size conflicts with value.
**Behaviour → parameter.** **Overall incongruent-condition accuracy and RT** (see caveat); Go/No-Go commission errors; CRT = count of reflective-correct answers (resisting the lure).
**How many.** Flanker MIN 40–60 / TARGET ~120 per condition; **CRT 6–7 items.**
**Scoring algorithm.** Primary = incongruent-block accuracy + median incongruent RT (or IES) → z; CRT = # items answered with the reflective (non-intuitive) response → z. Composite → 0–10. **Do NOT score the raw congruency difference (incongruent − congruent) for individuals** — reliability paradox (median r ≈ .40).
**Dual-purpose / caveats.** Flanker feeds A5; CRT feeds C1. Screening-grade on the radar. Confidence → D3.
**Refs.** Hedge, Powell & Sumner (2018); Eriksen & Eriksen (1974); Frederick (2005).

---

# PART II-B — THE METACOGNITIVE LAYER

## D3 · Monitoring Calibration (computed, no own items)
**What.** How well the student's confidence matches their actual correctness — decisive under **negative marking** (attempt vs. skip intelligence).
**How to test.** After every scored item in blocks 1–8, ask **"How sure are you this is correct? 0–100%."** No separate item bank; calibration is computed from the (confidence, outcome) pairs already collected.
**Behaviour → parameter.** Per trial: confidence c ∈ [0,1] and outcome o ∈ {0,1}. Keep trial-level data (aggregates are insufficient for gamma / meta-d′).
**How many.** ≥ 100 confidence judgments — accrue naturally across the whole battery.
**Scoring algorithms (formulas).**
- **Bias (calibration):** `Bias = mean(confidence) − mean(accuracy)`. > 0 overconfident, < 0 underconfident, ≈ 0 well-calibrated.
- **Resolution (Goodman–Kruskal gamma):** `γ = (N_c − N_d) / (N_c + N_d)` over pairs of trials differing in outcome (N_c concordant, N_d discordant) — higher = better discrimination of one's own right vs wrong answers.
- **Brier score:** `BS = mean((c − o)²)` (0 best). Murphy decomposition: `BS = Reliability − Resolution + Uncertainty` (bin by confidence; Reliability lower = better, Resolution higher = better).
- **Metacognitive sensitivity:** meta-d′ and type-2 AUC; **efficiency = meta-d′ / d′** (1.0 = ideal).
**Readout on the chart.** A centred **composure/bias gauge** (over ↔ under, centre = good) + **resolution 0–10**. Always report the base rate (mean accuracy) beside it.
**Caveats.** Raw bias is confounded with task difficulty; gamma is unstable if there are few errors (easy items); meta-d′ is preferred but needs ≥ 100 trials with a spread of confidence.
**Refs.** Fleming & Lau (2014); Nelson (1984); Brier (1950).

---

# PART II-C — SELF-REPORT BLOCK (dispositional)

These parameters are **not** right/wrong puzzles; they are measured with short validated Likert scales. Place this block **last** (post-performance) so it doesn't prime performance. Insert **2 attention checks** (one instructed-response: *"Select 'Strongly agree' here"*; one infrequency: *"I have never used a phone"*) and pre-register an exclusion rule for failures. Mix reverse-keyed items to curb acquiescence. **Flag on the radar as self-report grade** and be transparent that these are fakeable in high-stakes framing.

**Total self-report ≈ 35 items (~5 min).** Score each scale as its item mean → z → 0–10 (reverse anxiety so the axis reads as *composure*).

## E1 · Academic Self-Efficacy — New General Self-Efficacy Scale (NGSE)
8 items, 5-point Likert; α ≈ .86–.90. Example: *"When facing difficult tasks, I am certain I will accomplish them."* Score = mean of 8 → z → 0–10. (For subject-specific efficacy, duplicate 4 items each stem-anchored to "in Physics/Chemistry/Maths/Biology.") **Ref:** Chen, Gully & Eden (2001).

## E2 · Motivation Quality (SDT) — Learning Self-Regulation Questionnaire (SRQ-L, short)
12 items, 7-point, two subscales (Autonomous, Controlled). Compute **Relative Autonomy Index = mean(Autonomous) − mean(Controlled)**. Output both a 0–10 (RAI→z→band) and a **profile label** {Autonomous / Mixed / Controlled / Amotivated}. Example (autonomous): *"Because I find learning this material important for my goals."* **Ref:** Williams & Deci (1996); Ryan & Connell (1989) (RAI formula).

## E3 · Conscientiousness — Mini-IPIP Conscientiousness (absorbs grit)
4 items, 5-point; α ≈ .70 (better reliability-per-item than the 3-item BFI-2-XS). Example: *"I get chores done right away"*; *"I often forget to put things back"* (reverse). Score = mean (2 items reverse-scored) → z → 0–10. **Do not add a grit scale** — grit is redundant with conscientiousness (Credé et al., 2017). **Ref:** Donnellan et al. (2006).

## E5 · Exam / Math Anxiety — AMAS (+ optional WTAS)
**AMAS** 9 items, 5-point; α ≈ .85–.90; math-specific (LMA + MEA subscales) — primary for JEE. Example: *"Thinking about a maths test one day before."* Optional **Westside Test Anxiety Scale** 10 items (α ≈ .88) for general/NEET exam anxiety with a severity cutoff. Score = mean; **reverse-signed → plotted as "Composure"** (higher = calmer). High anxiety triggers a supportive message + resource pointer, never a scary label. **Refs.** Hopko et al. (2003); Driscoll (2007).

## D2 (self-report half) · Metacognition / SRL — short strategy inventory
~6 items adapted from MSLQ metacognitive-self-regulation / planning-monitoring items, 5-point. Example: *"When I study, I set goals and check my progress against them."* Combined with the behavioural traces in II-D into one D2 score (weight behaviour ≥ self-report where telemetry exists). **Ref:** Pintrich et al. (1991); Dent & Koenka (2016).

---

# PART II-D — BEHAVIOURAL TELEMETRY (in-test)

Computed passively from interaction logs during the battery. **Screening-grade** and provisional in a one-off 30-min sitting; far richer if the product later becomes an ongoing study platform.

## D2 (behavioural half) · Self-Regulated Learning proxies
- **Response-to-difficulty:** on hard items, does the student slow down and stay accurate (adaptive) or speed up and guess (maladaptive)? Index = correlation of RT with item difficulty.
- **Persistence after error:** accuracy/effort on the item *after* a wrong answer (recovery vs. tilt).
- **Time-allocation quality:** proportion of time spent on items they ultimately get right vs. wrong.
- **Review/flag use:** if a review step is offered, whether they revisit low-confidence items (links to D3).
Combine (z-scored) with the II-C self-report → D2 0–10.

## E6 · Academic Engagement (behavioural)
- Session completion rate; time-on-task ratio (active vs idle); item-abandonment / non-response rate; latency drift (disengagement over blocks).
Index → z → 0–10. **Include only if telemetry is captured; otherwise omit the axis** rather than fake it. Engagement is an *output* signal — read alongside E1/E2/E5, don't treat as an independent trait.

---

# PART III — NORMS, RENDERING, ROLLOUT & CAUTIONS

## 1. Norming (the score is meaningless without a reference)
- **Phase 1 (launch):** standardise **within the current cohort** (z within tested aspirants). Label scores *relative/provisional*.
- **Phase 2 (after piloting N ≥ ~300–500 per age band):** build **stable norms**, ideally **separate JEE vs. NEET tracks** and by stage (Class 11 / 12 / dropper). Re-express 0–10 against these norms.
- **Phase 3:** IRT-calibrate the reasoning and self-report item banks → enable **adaptive testing** (cut item counts ~50% at equal precision).

## 2. Reliability governance
Compute **coefficient omega (ω)** per parameter from pilot data. Label every radar axis **F** (feedback, ω ≈ .80+) or **S** (screening, ω ≈ .70). On S-axes: widen the confidence band, soften wording ("directional"), never drive a strong claim. Specifically, inhibition/flexibility (difference-score constructs) and n-back are S by design.

## 3. Radar chart rendering
- All axes 0–10, **outward = better** (anxiety shown reversed as Composure).
- Shade/annotate S-axes differently from F-axes; show a confidence band per axis.
- **Calibration (D3) is shown separately**, not as a radar spoke: a centred bias gauge (over ↔ under) + resolution 0–10, with the base-rate accuracy beside it.
- Auto-generate a 2–3 line "biggest leaks / biggest strengths" summary from the largest below-/above-median z-scores, each with one instructional implication (from `02_Scoring_Rubric.md`).

## 4. Fairness, ethics, and anti-gaming
- **Device invariance:** record input type; z speed metrics within device class; prefer accuracy axes when device mix is uncontrolled.
- **Spatial sex difference:** norm within sex or monitor for differential item functioning.
- **Practice trials** before each performance block (untimed, unscored) so scores reflect ability, not instructions-confusion.
- **Attention checks + exclusion rule** for careless/゛faked responding; **infrequency + instructed-response** items (used sparingly).
- **Anti-gaming:** randomised item selection from banks, parallel forms across retakes, response deadlines, and — for reasoning — IRT/CAT so items aren't reused.
- **No labels, no ceilings.** Report bands with confidence and next-actions. Frame fixed-ish parameters (A1 fluid reasoning) as "strategy-setting," not verdicts. Privacy: store per the schema that separates identity from scores (`../research/parameters/03_Data_Schema.sql`).

## 5. Validation plan (do this before trusting the mirror)
Pilot → item analysis (difficulty *p*, discrimination *r_pb* / IRT *a,b*) → drop weak items → recompute ω → a **test–retest subsample** (2–4 weeks) → **convergent check** (do performance axes correlate sensibly with each other and, optionally, with mock-test scores?) → publish per-axis reliability in-product. Keep the framing a *mirror*, not a predictor of rank.

---

# References (verified during research; see also `../research/parameters/References.md`)

**Test length, reliability, scoring**
- Spearman (1910); Brown (1910) — Spearman–Brown prophecy formula.
- Nunnally, J. C., & Bernstein, I. H. (1994). *Psychometric Theory* (3rd ed.). — reliability conventions (.70/.80/.90).
- AERA, APA & NCME (2014). *Standards for Educational and Psychological Testing.* https://www.apa.org/science/programs/testing/standards
- Condon, D. M., & Revelle, W. (2014). The International Cognitive Ability Resource. *Intelligence, 43*, 52–64. https://www.personality-project.org/revelle/publications/condon.icar.14.pdf
- Hedge, C., Powell, G., & Sumner, P. (2018). The reliability paradox. *Behavior Research Methods, 50*, 1166–1186. https://pubmed.ncbi.nlm.nih.gov/28726177/
- Conway, A. R. A., et al. (2005). Working memory span tasks: A methodological review and user's guide. *Psychonomic Bulletin & Review, 12*, 769–786. https://link.springer.com/article/10.3758/BF03196772
- Gibbons, R. D., et al. (2008). Using CAT to reduce the burden of mental health assessment. *Psychiatric Services, 59*, 361–368. https://pmc.ncbi.nlm.nih.gov/articles/PMC2916927/
- Ackerman, P. L., & Kanfer, R. (2009). Test length and cognitive fatigue. *J. Experimental Psychology: Applied, 15*, 163–181. https://www.apa.org/pubs/journals/releases/xap-15-2-163.pdf
- Weintraub, S., et al. (2013). NIH Toolbox Cognition Battery. *Neurology.* https://pmc.ncbi.nlm.nih.gov/articles/PMC4103959/
- Bruyer, R., & Brysbaert, M. (2011). Inverse Efficiency Score. *Psychologica Belgica, 51*, 5–13. https://psychologicabelgica.com/articles/10.5334/pb-51-1-5

**Task designs & scoring**
- Jaeggi, S. M., et al. (2010). Concurrent validity of the n-back. *Memory, 18*, 394–412. https://pubmed.ncbi.nlm.nih.gov/20408039/
- Carlozzi, N. E., et al. (2015). NIH Toolbox Pattern Comparison Processing Speed. https://pmc.ncbi.nlm.nih.gov/articles/PMC4424947/
- Robertson, I. H., et al. (1997). 'Oops!' (SART). *Neuropsychologia, 35*, 747–758. https://pubmed.ncbi.nlm.nih.gov/9204482/
- Eriksen, B. A., & Eriksen, C. W. (1974). Flanker task. *Perception & Psychophysics, 16*, 143–149.
- Stroop, J. R. (1935). Interference in serial verbal reactions. *J. Exp. Psychol., 18*, 643–662. http://psychclassics.yorku.ca/Stroop/
- Miyake, A., et al. (2000). Unity and diversity of executive functions. *Cognitive Psychology, 41*, 49–100. https://www.sciencedirect.com/science/article/abs/pii/S001002859990734X
- Frederick, S. (2005). Cognitive reflection and decision making (CRT). *J. Economic Perspectives, 19*, 25–42. https://www.aeaweb.org/articles?id=10.1257/089533005775196732

**Number, spatial, memory, calibration**
- Halberda, J., Mazzocco, M., & Feigenson, L. (2008). Non-verbal number acuity ↔ maths. *Nature, 455*, 665–668. https://www.nature.com/articles/nature07246
- Siegler, R. S., & Booth, J. L. (2004). Numerical estimation. *Child Development, 75*, 428–444.
- Schneider, M., et al. (2017). Symbolic/nonsymbolic magnitude ↔ math: meta-analysis. *Developmental Science, 20*, e12372.
- Vandenberg, S. G., & Kuse, A. R. (1978). Mental Rotations Test. *Perceptual and Motor Skills, 47*, 599–604.
- Shepard, R. N., & Metzler, J. (1971). Mental rotation. *Science, 171*, 701–703.
- Zerr, C. L., et al. (2018). Learning efficiency. *Psychological Science, 29*, 1436–1450. https://journals.sagepub.com/doi/abs/10.1177/0956797618772540
- Macmillan, N. A., & Creelman, C. D. (2005). *Detection Theory: A User's Guide* (2nd ed.). — d′, criterion c, log-linear correction.
- Fleming, S. M., & Lau, H. C. (2014). How to measure metacognition. *Frontiers in Human Neuroscience, 8*, 443. https://www.frontiersin.org/articles/10.3389/fnhum.2014.00443/full
- Nelson, T. O. (1984). Measures of feeling-of-knowing accuracy (gamma). *Psychological Bulletin, 95*, 109–133.
- Brier, G. W. (1950). Verification of forecasts (Brier score). *Monthly Weather Review, 78*, 1–3.

**Self-report scales & response validity**
- Chen, G., Gully, S. M., & Eden, D. (2001). New General Self-Efficacy Scale. *Organizational Research Methods, 4*, 62–83.
- Williams, G. C., & Deci, E. L. (1996) / Ryan, R. M., & Connell, J. P. (1989). SRQ / RAI. https://selfdeterminationtheory.org/
- Donnellan, M. B., et al. (2006). Mini-IPIP scales. *Psychological Assessment, 18*, 192–203.
- Soto, C. J., & John, O. P. (2017). BFI-2-S / BFI-2-XS. *J. Research in Personality, 68*, 69–81.
- Credé, M., Tynan, M. C., & Harms, P. D. (2017). Much ado about grit. *JPSP, 113*, 492–511. https://pubmed.ncbi.nlm.nih.gov/27845531/
- Hopko, D. R., et al. (2003). Abbreviated Math Anxiety Scale (AMAS). *Assessment, 10*, 178–182. https://pubmed.ncbi.nlm.nih.gov/12801189/
- Driscoll, R. (2007). Westside Test Anxiety Scale. ERIC ED495968. https://files.eric.ed.gov/fulltext/ED495968.pdf
- Kung, F. Y. H., Kwok, N., & Brown, D. J. (2018). Attention checks & scale validity. *Applied Psychology, 67*, 264–283.
- Pintrich, P. R., et al. (1991). MSLQ manual. ERIC ED338122. https://files.eric.ed.gov/fulltext/ED338122.pdf

*Note: a few scale-specific α values and item wordings should be confirmed against the primary source before production use (flagged in the research notes). All effect-size and reliability claims above were retrieved during research; none fabricated.*


