# Task-Design Standards — Working Memory, Processing Speed & Attentional Control

**Project:** Student Psychometric Analysis
**Metrics covered:** A2 Working Memory (backward digit span + operation span) · A3 Processing Speed (symbol-digit substitution, 90 s) · A5 Attentional Control (SART)
**Population:** JEE/NEET aspirants, ~16–19 yrs, academically selected (high-ability, high-motivation)
**Date:** 2026-07-13
**Companions:** `../../product/Metrics_Needed.md` (parameter selection), `../../product/Test_Battery_Plan.md` (Stages 2, 3, 7 already lock in most of the parameters validated below — this report is the evidence base for those design choices, and flags where gold-standard practice diverges from the current plan).

Scope note: this is an engineering reference, not a literature survey — every subsection is written to be directly actionable for authoring `battery.json` items and the scoring code in `battery.html`. Where the published literature does not give a number (no direct JEE/NEET or India norms exist for any of these four tasks — confirmed by search), that gap is stated explicitly rather than papered over with an invented figure.

---

## 1. Backward Digit Span

### 1.1 Design rationale
Backward span requires the participant to hold a sequence *and* mentally reverse it before output — a manipulation step, not just maintenance — which is why it loads more on central-executive/fluid-reasoning resources and less on pure phonological storage than forward span. That is the reason it (not forward span) is the A2 vehicle here.

### 1.2 Protocol parameters
- **Presentation rate: 1 digit/second**, the standard across WAIS/WISC-family administration manuals and clinical digit-span protocols. On-screen visual delivery should match this cadence (e.g., ~800 ms digit-on / 200 ms digit-off per position — already the project's Stage 2 spec).
- **Instruction pattern:** examiner/UI states the full rule and gives a worked example before scored trials ("I will show you some numbers; when I'm done, enter them in *reverse* order").
- **Set-size progression:** sequences start at length 2 and increase by one digit per level; **two trials at each length**; discontinue when the participant fails both trials at a given length, or when the ceiling length is reached. Canonical ceilings are 9 digits forward / 8 backward (WAIS-IV).
- **This project's compressed ladder** (Stage 2: lengths 3,3,4,4,5,5,6,6,7 — two trials per length 3–6 plus a single length-7 ceiling probe) is a reasonable time-boxed simplification of the two-trials-per-length/discontinue-on-double-failure rule above; it forgoes formal discontinuation logic in favor of a fixed 9-trial run, which is fine for a fixed-time battery but means ceiling effects at length 7 should be checked empirically at pilot.

### 1.3 Stimulus-construction rules
Digit sequences must be generated (or filtered) against these rules — reject-and-resample at generation time rather than hand-authoring ad hoc:
1. **No ascending or descending runs.** Reject 3+ consecutive digits in strict ascending (4-5-6) or descending (6-5-4) order. Test designers explicitly exclude even short "canonical" runs such as 7-8-9 or the skip-count 2-4-6.
2. **No repeated digits within a trial**, and no digit recurring within a 3-position window; avoid a digit sitting directly next to an identical or numerically adjacent digit (e.g., avoid 1-2 or 5-6 next to each other).
3. **Avoid memorable/famous patterns:** no 4-digit run that reads as a calendar year (19xx/20xx, e.g., 1947, 1999), no phone-number-style repeated blocks, no simple alternating pairs (1-2-1-2).
4. **Balance digit frequency** across the whole item bank so no digit 1–9 is over- or under-represented (prevents a frequency-based recall shortcut).
5. Avoid excessive phonological similarity if sequences are ever spoken aloud in a regional language (rhyming number-names raise confusability, a known effect in the phonological-similarity literature).

**Example (5-digit trial):**
- Valid: `6-1-8-3-5`, `4-9-2-7-1` (no run, no repeats, non-adjacent, not year-like)
- Invalid: `2-4-6-8-1` (ascending run), `7-3-7-2-9` (7 repeats within 3 positions), `1-9-9-7-5` (reads as "1997"), `1-2-1-2-6` (repeating-pair pattern)

### 1.4 Scoring
- **Traditional/clinical "span" score:** longest sequence length at which the participant gets ≥1 of 2 trials fully correct. Simple and familiar, but coarse (only ~5–7 possible values) and discards all information from non-ceiling trials.
- **WAIS-style item score:** 1 point if either trial at a length is correct, 2 points if both are — a mild partial-credit step up from pure "longest span," summed into a raw score.
- **Partial-credit scoring (Conway et al., 2005 tradition — recommended, and already this project's method):** score each trial as a proportion or count rather than pass/fail:
  - *Partial-credit load score* = total digits recalled in correct serial position, summed across all trials (e.g., target `4-9-2-7-1` recalled as `4-9-2-7` scores 4).
  - *Partial-credit unit score* = proportion of digits recalled in correct position **per trial**, averaged across trials (the same recall scores 0.80 for that trial). **This is the formula already specified in `Test_Battery_Plan.md` Stage 2** ("mean over trials of elements in correct serial position ÷ set size").
  - Conway et al. (2005) and later scoring-methods work show partial-credit scoring has **higher reliability, approximates a normal distribution better, and correlates r ≈ .88–.93 with absolute/threshold scores** while retaining far more measurement information — the reason to prefer it over the coarse "longest span" number for a feedback-grade score, while still reporting "longest span" as a friendly narrative number ("your backward span is 6 digits").

### 1.5 Benchmarks for able 16–19-year-olds
No published India-specific or JEE/NEET-specific digit-span norms exist (confirmed absent in this search). Directionally solid anchors to extrapolate from:
- Backward span is reliably **~1–1.5 digits shorter than forward span** in the same person — a well-replicated finding.
- **Gifted/high-achieving adolescents outperform typical-ability peers on both forward and backward span** (comparison of gifted vs. typically-achieving 12–14-year-olds).
- Cowan's (2005) embedded-processes account puts "pure" attentional-focus capacity at **~4 ± 1 chunks** when rehearsal/chunking is prevented; digit span (which permits rehearsal) runs higher than this baseline, and capacity is theorized to keep rising through adolescence toward the adult ceiling.
- **Practical implication:** because this cohort sits near the adult capacity ceiling *and* skews above the general population academically, the item ladder should reach at least backward length 7–8 to avoid ceiling effects — the project's existing ceiling probe at length 7 is a reasonable starting point but should be checked against the "ceiling ≥95% accuracy → cap band at 9" guardrail already in the plan.

### 1.6 Pitfalls
- **Timing drift:** any JS timing-loop jitter (frame drops, tab backgrounding) changes effective per-digit exposure; log actual inter-stimulus intervals for QA against the 1/sec target.
- **Direction confusion:** first-time takers commonly answer forward out of habit — a mandatory worked practice trial is non-negotiable.
- **Auto-generation must enforce §1.3 at the algorithm level**, not spot-check after the fact, once the bank is generated at scale.
- **Do not slow the rate to "help":** extra encoding time changes the construct from a working-memory-capacity probe into a memory-plus-strategy task; keep to 1 digit/sec even though it feels fast for a difficult item.

---

## 2. Operation Span (Automated OSPAN — Unsworth, Heitz, Schrock & Engle, 2005)

### 2.1 Design rationale
Complex span forces genuine "working" (not just short-term) memory by interleaving a processing task (arithmetic verification) with the storage task (serial letter recall) — the processing step is what prevents passive rehearsal and is what differentiates operation span from simple digit span.

### 2.2 Protocol parameters (canonical automated version)
- **Per-element sequence:** (1) a math operation is shown, e.g. `(3×2)−1=?` — participant solves mentally and clicks to reveal the proposed answer; (2) a digit is shown, e.g. `5` — participant judges **True/False** by click; (3) a letter to remember is then shown for a **fixed 800 ms**.
- **Set sizes 3–7** (Unsworth et al. chose this range because pilot testing showed it avoided floor/ceiling); **3 trials per set size**, order randomized across the session → 15 sets, 75 letters + 75 math problems, ≈20–25 minutes total in the original.
  - This project's compressed version (4 trials, sizes 3–6, single repetition each — Stage 2) trades the size-7 ceiling probe and the reliability boost of 3×-repetition for a ~4-minute time budget; reasonable, but note it as a deliberate simplification, not the full-strength instrument.
- **Individualized math time limit:** computed from a **15-item math-only practice block** as that participant's mean solution time **+ 2.5 SD**; if a live trial exceeds this personal limit, the program auto-advances and logs a **speed error**. This is the mechanism that prevents participants from stalling on the math step to covertly rehearse letters — do not hard-code a fixed time limit across all users.
- **85% processing-accuracy criterion:** a running math-accuracy percentage is shown during the task; participants are instructed to keep it ≥85%. In the original validation, **~15% of participants were excluded/flagged** for falling below this criterion — it is a binding design constraint, not a soft suggestion, and needs an equivalent validity flag here (already specified in the plan).
- **Recall:** untimed; a constant **4×3 grid of the fixed 12-letter alphabet** is shown; participant clicks letters in recalled order, with a "blank" placeholder for skipped/forgotten positions (preserves serial position even with omissions) and a "clear" to restart.
- **Practice sequence (3 stages):** (1) letter-recall-only practice (learn the interface), (2) math-only practice — 15 trials, purely to calibrate the individual time limit, (3) combined practice at set size 2 before scored trials begin.

### 2.3 Stimulus-construction rules
- **Letter set: F, H, J, K, L, N, P, Q, R, S, T, Y** — 12 consonants, no vowels, no letter repeats within a set.
  - **Why consonants specifically:** including vowels risks letters combining into pronounceable syllables or recognizable acronyms, letting participants use verbal chunking/lexical strategies instead of pure serial-position memory — reintroducing the "word-knowledge" confound that complex-span designs are built to strip out (word-based spans have been shown to share variance with vocabulary/verbal-knowledge measures). An all-consonant set forces reliance on order memory, not linguistic shortcuts. (Reading span uses the same logic with its own consonant set: B, F, H, J, L, M, Q, R, X.)
- **Equation construction:** simple 1–2 operation arithmetic with single-digit operands, solvable in a few seconds by the target population; proposed answers correct ~50% of the time, and when false, off by a small non-obvious margin (prevents "eyeballing" shortcuts).
- **Set-size range:** 3–7 (or compressed 3–6), order-randomized per participant so set length cannot be anticipated and gamed.

**Example (matching the canonical format):**
```
(3×2)−1=5?  Y/N   →  [TRUE: 3×2=6, 6−1=5]        → letter shown: K
(9−4)×2=8?  Y/N   →  [FALSE: 9−4=5, 5×2=10]        → letter shown: R
(2×6)+1=12? Y/N   →  [FALSE: 2×6=12, 12+1=13]      → letter shown: F
                                    → recall: K, R, F (in order)
```

### 2.4 Scoring
- **Absolute/all-or-nothing "Ospan score":** sum of set sizes for only the sets recalled *perfectly*; e.g., perfect recalls at sizes 3 and 4, a miss at size 5 → score 7. Simple, but coarse and discards partial performance.
- **Partial-credit "total correct" score (recommended, matches Conway et al. 2005 guidance and this project's plan):** total letters recalled in correct serial position across *all* sets, whether or not the whole set was perfect.
  - Benchmark (Georgia Tech validation sample, N=252, ages 18–35, M=22.5 yrs): absolute score M=39.16 (SD=17.41), partial-credit total-correct score M=55.25 (SD=13.70), both out of a max of 75.
- **Diagnostic error breakdown to log:** math errors split into **speed errors** (exceeded individual time limit) vs. **accuracy errors** (wrong True/False judgment) — separates "sacrificed math to protect letter memory" from "genuinely too slow at the arithmetic," and drives the 85%-criterion validity flag.
- **Reliability:** automated OSPAN Cronbach's α = .78; test–retest r = .83 (median 6-day, mean 13-day lag) — solid enough to treat as a feedback-grade (not merely screening-grade) axis.

### 2.5 Benchmarks for able 16–19-year-olds
No direct high-school-age or JEE/NEET norms exist. The closest available proxy is the Georgia Tech university sample above (M age 22.5, general — not elite — university population); expect an academically selected 16–19 cohort to perform **at or somewhat above** these values, but treat this explicitly as an extrapolation, consistent with the plan's "provisional norms v1" policy.
- **Rescale to proportions, not raw counts, when comparing across implementations:** because this project's compressed format has a different maximum (3+4+5+6 = 18 per single repetition vs. the original's 75), any anchor table must use the partial-credit **unit** score (proportion correct, 0–1) rather than raw totals — proportion-correct transfers across different set-size/trial-count implementations much better than an absolute count does. This is already the project's approach.

### 2.6 Pitfalls
- **Never hard-code the math time limit.** JEE/NEET aspirants are typically strong at arithmetic; the per-user calibration (mean + 2.5 SD from practice) is what keeps the task appropriately demanding regardless of population math skill.
- **Enforce the 85% accuracy floor.** Without it, participants can trade math accuracy for better letter recall, turning the "working memory" score into a "how much did you shortcut the distractor task" score.
- **Keep the recall grid layout constant** (not reshuffled per trial) so response-selection time reflects recall confidence, not visual search for the right letter.

---

## 3. Symbol-Digit Substitution (DSST / SDMT / NIH Toolbox family)

### 3.1 Design rationale
A near-pure processing-speed probe: visual scanning + associative lookup + rapid motor response. It is deliberately engineered to keep **accuracy near ceiling** so the score is (almost) entirely a speed measure, not an accuracy measure.

### 3.2 Protocol parameters
- **Key-mapping design:** a fixed key of **9 digit–symbol pairs** (digits 1–9, each paired with one abstract glyph) displayed persistently at the top of the screen throughout the timed run.
- **Original Smith (1982) SDMT:** 110 total test items, **90-second** time limit, written or oral response; score = count of correct matches completed inside 90 s (the fixed duration makes "correct count" already a rate score).
- **Do not conflate with WAIS-family Coding/DSST:** that subtest uses a **120-second (2-minute)** window, not 90 s — benchmark this project's 90 s task against Smith-SDMT and NIH-Toolbox numbers, not WAIS Coding numbers.
- **NIH Toolbox analogues** (useful for cross-checking construction choices, not directly digit-symbol):
  - *Pattern Comparison Processing Speed Test* — same/not-same visual judgment (color, add/remove an element, or one-vs-many), same 90-second/high-accuracy design philosophy, max 130 items.
  - *Oral Symbol Digit* — literal digit-symbol matching like SDMT, but 144-item bank and a **120 s** window.

### 3.3 Stimulus-construction rules
- **Symbols must be abstract and non-nameable** — no shape that maps easily to a one-syllable verbal label (avoid letter-like, number-like, or common-object shapes). This keeps the test language-independent and stops participants from covertly verbally recoding the key, which would blur the construct with verbal working memory rather than pure visuomotor associative speed.
- **Symbols must be visually distinct** at a glance — avoid near-mirror-image pairs or symbols differing only by subtle rotation/reflection (false-match risk under time pressure) — and roughly matched in stroke count/complexity so no symbol is trivially faster to render/tap than another.
- **Pretest for accuracy before locking the bank:** any item producing below **~75% accuracy** during development should be dropped or redesigned — this is the explicit rule the NIH Toolbox Pattern Comparison team used. The logic: confusable pairs contaminate a speed test with an accuracy confound.
- **Trial-sequence generation:**
  1. No digit repeats on two consecutive positions (prevents a trivial "same as last time" shortcut).
  2. Balance frequency of all 9 digits across the full item stream.
  3. If the key is reshuffled between parallel forms, never let a symbol land in the same ordinal key-position across forms (prevents position memorization carrying over).

**Illustrative key (constructed fresh for this spec — not the copyrighted Smith SDMT symbol set, which should not be reproduced verbatim in a commercial product):**
```
1 ↔ ◇   2 ↔ ⊥   3 ↔ ≈   4 ↔ ✳   5 ↔ ⌐
6 ↔ ◐   7 ↔ Λ   8 ↔ ⊠   9 ↔ ≡
```

### 3.4 Scoring
- **Fixed-duration design (this project's 90 s sprint):** score = number of correct substitutions in 90 s (a rate by construction). Track accuracy (% correct of attempted) as a secondary validity check — flagging **accuracy < 80%** as a "speed–accuracy tradeoff broke" signal (already in the plan) is the right guardrail.
- **Rate Correct Score (RCS)** — useful if timing is ever self-paced rather than a hard 90 s stop: `RCS = C / ΣRT`, where C = correct responses and ΣRT = summed reaction time in seconds. This folds speed and accuracy into one number; for a hard-stop 90 s design the simpler "count correct" already *is* the rate metric, so RCS mainly matters if the design ever moves to item-paced administration.
- **Latency-drift diagnostic** (already planned: last-third mean RT ÷ first-third mean RT) is a good added QA metric for within-run fatigue (see Pitfalls).

### 3.5 Benchmarks for able 16–19-year-olds
Best available quantitative anchor: **Kiely, Butterworth, Watson & Wooden (2014)**, nationally representative Australian **written**-SDMT norms (N=14,456, ages 15–100), age band 15–19:

| Group | Mean (SD) | P20 | P40 | P60 | P80 |
|---|---|---|---|---|---|
| Males 15–19 (all education) | 54.09 (12.31) | 45 | 50 | 56 | 63 |
| Females 15–19 (all education) | 56.91 (11.25) | 49 | 54 | 58 | 65 |
| Males 15–19, Year-12-or-higher | 57.28 (13.35) | — | — | — | — |
| Males 15–19, Year-11-or-below | 52.76 (12.05) | — | — | — | — |
| Females 15–19, Year-12-or-higher | 59.48 (11.27) | — | — | — | — |
| Females 15–19, Year-11-or-below | 55.45 (10.56) | — | — | — | — |

- Since JEE/NEET aspirants are, by definition, in the college-track/Year-12+ stream, the **Year-12+ sub-norm (mid-to-high 50s)** is the more relevant reference than the whole-band mean; an academically selected, high-motivation sample should plausibly land at or above the ~60th–80th percentile of even that sub-group (roughly **58–65+ correct in 90 s** as a reasonable "able" anchor) — but this upward adjustment is an extrapolation, not a direct measurement, and should ship "provisional" per the plan's norming policy.
- **Modality caveat:** this is the **written (pencil)** norm. Digital/touchscreen administrations reliably score lower in raw count for the same underlying ability (see 3.6) — either collect fresh digital norms at pilot or apply a modality correction; the plan's existing `device_note` flag on touch input is the right stopgap.
- **NIH Toolbox Pattern Comparison** (Carlozzi et al., 2015; N=4,859, ages 3–85): performance on this 90 s/max-130 visual-speed analogue rises through childhood/adolescence and **peaks around age 19**, then declines through adulthood; for ages 8–19, mean proportion of *attempted* items correct ≈ 0.95 (accuracy intentionally kept near ceiling by item design). Practical implication: **16–19 sits right at the lifespan peak** for this construct, so a single norm band for the whole 16–19 range is defensible — no need for separate 16- vs. 19-year-old sub-norms.

### 3.6 Touch vs. keyboard vs. paper — effects to design around
- Computerized/touchscreen digit-symbol tasks reliably produce **fewer raw correct responses** than paper-and-pencil administration (free-hand writing is faster per item than discrete tap/click actions), but **between-person variance is smaller** on computerized versions — i.e., more consistent, less noise from handwriting-speed differences.
- Touch/tap-based response formats reduce the influence of age-related fine-motor/handwriting decline seen with paper — not very relevant to a 16–19 cohort, but relevant if these norms or this instrument are ever reused for other ages.
- **Construct validity holds across paper, keyboard, and touch, but absolute scores do not transfer between modalities** — norms must be modality-specific. The project's `device_note` flag is the correct mitigation until modality-specific pilot norms exist.

### 3.7 Pitfalls
- **Confusable symbols are the single biggest construction risk** — pretest against the 75%-accuracy floor (§3.3) before locking the bank.
- **End-of-run fatigue/slowing is measurable even in high-ability examinees over a single 90 s sprint** — track first-third vs. last-third RT (already planned) rather than assuming a flat rate; this distinguishes "sustained fast performance" from "fast start, faded fast," and doubles as a cross-signal into A5.
- **Decide up front how an in-flight response at the 90 s cutoff is scored** (count it or not) and apply that rule consistently across the whole item bank to avoid off-by-one scoring noise.

---

## 4. SART — Sustained Attention to Response Task (Robertson, Manly, Andrade, Baddeley & Yiend, 1997)

### 4.1 Design rationale
A go/no-go task engineered so the "go" response becomes an automatic, prepotent habit (very high go-trial frequency) — failures to withhold on the rare no-go trials are meant to index momentary lapses of sustained attention/top-down control, not simple discrimination difficulty. This automaticity-induction is the entire logic of the paradigm, and matters directly for the tradeoff discussion in §4.3.

### 4.2 Canonical protocol parameters
- **Stimuli:** single digits **1–9** (0 not used), each shown in a randomly varying font size across several discrete sizes so no single visual/size feature predicts the no-go digit (e.g., one replication used 48–120 pt on a 21" CRT — exact point sizes are display/DPI-dependent, the principle is "several discrete sizes, randomized per trial").
- **No-Go digit: 3.** Go digits: 1,2,4,5,6,7,8,9.
- **Canonical timing:** digit shown for **250 ms**, followed by a mask for **900 ms** → total SOA **1.15 s (1,150 ms)** per trial.
- **No-Go rate: ~11.1% (1 in 9)** — the digit stream cycles pseudo-randomly through 1–9, so "3" appears roughly once per 9-trial lap; no-go trials should never appear on trial 1, never twice in a row, and are typically spaced ≥3–5 go-trials apart.
- **Original block structure:** a single continuous run of 225 trials (~4.3 minutes, ~25 no-go trials) in Robertson et al. (1997) itself. Widely used standardized replication protocols instead use a practice block (~160 trials) followed by four ~5-minute blocks (1,040 trials total, ~72 no-go trials).
- **Variant alert — No-Go base rate is not universal:** at least one widely used replication protocol runs digits **0–9** (ten digits, ~7% no-go) rather than the canonical 1–9 (nine digits, ~11% no-go). A broader meta-analysis of sustained-attention/go-no-go tasks found published no-go rates ranging **5–30%**. Be explicit about which convention is implemented — it changes both the base rate and the strength of the automaticity effect the paradigm depends on. **This project's plan (digits 1–9, No-Go rate 11%, 90 trials) matches the canonical Robertson design.**
- **Instruction:** press one key as fast as possible for every digit except 3; withhold for 3.

### 4.3 This project's 2-second SOA vs. the canonical 1.15-second SOA — tradeoffs
Direct experimental evidence on slowing the pace: Smilek, Cheyne and colleagues (Behavior Research Methods, 2012) manipulated response-locked delay in a SART variant and found that requiring responses at **600 ms or 800 ms** after stimulus onset (vs. the standard fast pace) produced **significantly fewer commission errors *and* significantly fewer omission errors** than the standard SART — slower pacing lets attention "recouple" before the go/no-go decision and breaks the prepotent-response habit the fast pace is designed to induce. That same study had to extend its own trial window from the canonical 1,150 ms to **1,600 ms** just to stop fast responses from "carrying over" into the next trial.

**Direct implication for a ~2,000 ms SOA** (roughly double the canonical pace, and beyond even the slowest 800 ms-delay condition tested above): expect commission-error rates for attentive, high-ability 16–19-year-olds to run **low and potentially bunched near zero** — a ceiling/floor problem on that specific metric — because the extra time works against the very automaticity-induction mechanism the paradigm relies on to surface attentional lapses via inhibition failure.

**What this means for scoring weight:** this is exactly why RT-based continuous measures should carry more weight than the commission-error count at a 2 s pace — specifically **RT coefficient of variation** (§4.4), which draws on every go-trial's continuous RT (hundreds of data points per session) rather than only the rare error events (single-digit counts per session), giving it far higher statistical reliability at the individual level. RT CV correlates only moderately with commission-error rate (r ≈ .58) — it is not redundant with it.

**Secondary, intentional benefits of the slower pace** (worth banking as deliberate tradeoffs, not just costs):
1. Far more slack for a self-administered browser/touch runtime — a 2,000 ms window tolerates frame-rate jitter that a 250 ms stimulus + 1,150 ms SOA design cannot.
2. Fewer anticipatory/motor-carryover artifacts of the kind Smilek et al. had to engineer around.
3. Partially decouples SART performance from raw processing speed — useful here specifically *because* this battery already measures processing speed separately (A3); a fast-paced SART risks re-measuring A3 rather than cleanly isolating attentional control from it.

**Compensating design choices (all already reflected in `Test_Battery_Plan.md`, which this research validates):**
- Weight RT-CoV more heavily than commission rate in the composite (plan already specifies 2:1).
- Still enforce the canonical ~11% no-go rate and non-adjacent no-go spacing to preserve some habit-formation pressure even at the slower pace.
- Treat A5 as screening-grade (wider confidence band), not feedback-grade (plan already does this).

### 4.4 Scoring
- **Commission errors:** count/% of no-go (digit-3) trials incorrectly responded to. Historically the primary SART metric, but — per §4.3 — mechanically confounded with response-speed/pacing: any manipulation that slows responding will reduce commission errors independent of any real change in sustained attention (the "not enough time or not enough attention?" critique of the whole paradigm).
- **Omission errors:** count/% of go trials with no response in time. Near floor in healthy/engaged samples; elevated omission rate signals disengagement, fatigue, or non-adherence rather than the core inhibitory construct — treat as a **data-quality/validity flag**, not a primary score. Concrete published cutoff: Smilek et al. (2012) excluded participants whose omission rate exceeded **10%** of go trials (>56 of 560 go trials missed) or whose error rate was **>3 SD** from the condition mean. This project's existing "omission rate > 15% → validity flag" guardrail is in the same spirit, slightly more permissive.
- **RT coefficient of variation (recommended primary index at a 2 s SOA):**
  `RT CV = SD(go-trial RTs) / Mean(go-trial RTs)`, computed over all correct go-trial RTs in the run. Treated in the literature as a more continuous, more reliable trial-level index of sustained-attention lapses/mind-wandering than sparse binary error counts, because it uses every go trial rather than only rare no-go events.
- **Composite recommendation (matches this project's plan):** weighted combination of (reverse-scored) RT CV and (reverse-scored) commission rate, **RT-CV weighted ~2:1 over commission rate**, with omission rate used purely as a validity gate rather than folded into the composite.

**Example trial-stream fragment** (Go unless marked; illustrates spacing/frequency rules):
```
7, 2, 8, 5, 1, 9, 3(No-Go), 6, 4, 8, 2, 7, 5, 9, 1, 3(No-Go), 6, 4 ...
```
(no-go on positions 7 and 16 here — never on trial 1, never back-to-back, respects the ~1-in-9 rate and a ≥5-trial minimum gap.)

### 4.5 Benchmarks for able 16–19-year-olds
- **No confident, directly-sourced published commission-error percentage for this exact age/ability band was found in this search pass** — treat any specific numeric target as provisional/needs-pilot-data, consistent with the project's "provisional norms v1" policy. What is well established qualitatively: healthy, attentive young adults still commit a non-trivial number of commission errors under the canonical **fast** SART pace precisely because of its automaticity-inducing design — "zero commission errors" should not be treated as the expected/normal outcome even for high-ability examinees at the canonical pace; at this project's slower 2 s pace, expect commission rates to run **lower** than fast-SART literature values, reinforcing the RT-CV-primary scoring approach above.
- **Omission-rate benchmark:** secondary literature on neurologically healthy samples reports omission rates clustered near floor (small mean, high positive skew — most people miss almost nothing; a minority miss more) — consistent with using elevated omission rate as a validity/disengagement flag rather than a graded ability score.
- Age-differences meta-analytic work on sustained-attention/go-no-go paradigms broadly supports that performance on these tasks continues to mature into late adolescence — this supports treating 16–19 as a reasonably homogeneous norming band (unlike, say, spanning down to age 12).

### 4.6 Pitfalls
- **Anticipatory responses:** RTs below roughly **200 ms** (commonly bounded 100–200 ms in the RT literature) reflect a motor response already programmed before the stimulus was actually processed ("anticipation"/fast guessing), not a genuine stimulus-driven reaction. Exclude these from RT-based metrics (RT CV, mean RT) and flag/count them separately rather than silently averaging them in. **This project's existing global rule (drop RT < 200 ms) already covers this and should apply identically to SART go-trial RTs.**
- **End-of-block vigilance decrement/fatigue:** RT slows and both error types tend to rise with time-on-task in sustained-attention paradigms. A single continuous ~3-minute/90-trial block (as planned) limits this substantially compared to the 15–20 minute multi-block versions used in clinical/vigilance research, but first-third-vs.-last-third comparisons are still worth computing as a QA/diagnostic signal, exactly as the DSST sprint already tracks RT drift.
- **Practice must genuinely resemble the scored block's pace and no-go rate**, not an easier warm-up — the automaticity mechanism the paradigm depends on requires participants to enter the scored block already in fast/automatic response mode, not a deliberate, careful one.
- **Never rely on commission-error rate alone, at any SOA.** The "not enough time vs. not enough attention" debate in the literature shows commission errors are partly a mechanical function of response-speed/caution, not purely of attentional lapsing — always report commission rate alongside RT CV, and treat convergence or divergence between the two as itself diagnostic.

---

## Sources

**Backward digit span**
- SOF Visit 9 Digit Span Test operations manual (administration protocol, 1 digit/sec, trial scoring). https://agingresearchbiobank.nia.nih.gov/studies/sof/documents/download/Protocols/Visit_9/DigitSpanTest_%20Visit9_V1.2.pdf/
- Digit-Span Number Generator (construction rules: no ascending/descending, no repeats within 3, no adjacency). https://www.researchgate.net/publication/303985006_Digit-Span_Number_Generator
- "Measuring working memory span with WAIS-IV: Digit sequence is the superior span test" (canonical-sequence exclusion, 2-trials-per-length, discontinue rule, ceiling lengths). https://www.tandfonline.com/doi/full/10.1080/23279095.2024.2330998
- Woods et al. — "Improving digit span assessment of short-term verbal memory" (MeanSpan concept). https://pmc.ncbi.nlm.nih.gov/articles/PMC2978794/
- "Comparison of the Rey Auditory Verbal Learning Test (RAVLT) and Digit Test among Typically Achieving and Gifted Students" (gifted > typical on FDS/BDS). https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4885152/
- Cowan (2005) working-memory capacity draft / embedded-processes summary (~4-chunk focus-of-attention limit). https://memory.psych.missouri.edu/assets/doc/articles/2005/cowan-2005-izawa-volume-draft.pdf ; https://fiveable.me/cognitive-psychology/key-terms/cowans-embedded-processes-model

**Operation span**
- Unsworth, N., Heitz, R. P., Schrock, J. C., & Engle, R. W. (2005). An automated version of the operation span task. *Behavior Research Methods, 37*(3), 498–505. Full text: https://englelab.gatech.edu/articles/2005/aospanpaper.pdf
- Conway, A. R. A., Kane, M. J., Bunting, M. F., Hambrick, D. Z., Wilhelm, O., & Engle, R. W. (2005). Working memory span tasks: A methodological review and user's guide. *Psychonomic Bulletin & Review, 12*(5), 769–786. https://libres.uncg.edu/ir/uncg/f/M_Kane_WorkingMemory_2005.pdf
- "An easy way to improve scoring of memory span tasks: The edit distance…" (partial-credit load vs. unit scoring definitions, reliability comparison). https://link.springer.com/article/10.3758/s13428-022-01908-2
- Operation Span Task (OSPAN) — Millisecond library. https://www.millisecond.com/download/library/ospan
- Automated Operation Span (AOSPAN) — PsyToolkit. https://www.psytoolkit.org/experiment-library/aospan.html

**Symbol-digit substitution**
- Digit symbol substitution test — Wikipedia (general design description). https://en.wikipedia.org/wiki/Digit_symbol_substitution_test
- Symbol Digit Modalities Test (SDMT) — WPS product page (90 s administration, written/oral norms). https://www.wpspublish.com/sdmt-symbol-digit-modalities-test
- Carlozzi, N. E., Beaumont, J. L., Tulsky, D. S., & Gershon, R. C. (2015). The NIH Toolbox Pattern Comparison Processing Speed Test: Normative data. *Archives of Clinical Neuropsychology, 30*(5), 359–368. https://pmc.ncbi.nlm.nih.gov/articles/PMC4542749/
- Kiely, K. M., Butterworth, P., Watson, N., & Wooden, M. (2014). The Symbol Digit Modalities Test: Normative data from a large nationally representative sample of Australians. *Archives of Clinical Neuropsychology, 29*(8), 767–775. Full text: https://www.academia.edu/18350221/The_Symbol_Digit_Modalities_Test_Normative_data_from_a_large_nationally_representative_sample_of_Australians ; published version: https://academic.oup.com/acn/article/29/8/767/2726846 ; PubMed record: https://pubmed.ncbi.nlm.nih.gov/25352087/
- "Modernizing the Digit Symbol Substitution Test (DSST)" — BrainCheck (touch/digital vs. paper). https://braincheck.com/articles/modernizing-the-digit-symbol-substitution-test-dsst-a-case-for-digital-testing
- "Validation of a digit symbol substitution test for use in supervised and unsupervised assessment in mild Alzheimer's disease" (digital vs. paper-pencil scoring differences). https://www.tandfonline.com/doi/full/10.1080/13803395.2023.2179977
- "Validation and Comparison of a Digital Digit Symbol Substitution (DSST) Task Performed on Smart Phones With a Traditional Paper-Pencil Version." https://www.researchgate.net/publication/351146773_Validation_and_Comparison_of_a_Digital_Digit_Symbol_Substitution_DSST_Task_Performed_on_Smart_Phones_With_a_Traditional_Paper-Pencil_Version
- Rate Correct Score (RCS) formula. https://intercom.help/soma-technologies/en/articles/8057808-how-do-we-calculate-rcs ; https://www.linkedin.com/pulse/rate-correct-score-rcs-powerful-performance-metric
- Digit-sequence/no-immediate-repeat trial-generation patents (response speed and accuracy measurement devices). https://image-ppubs.uspto.gov/dirsearch-public/print/downloadPdf/5079726 ; https://image-ppubs.uspto.gov/dirsearch-public/print/downloadPdf/5289389

**SART**
- Robertson, I. H., Manly, T., Andrade, J., Baddeley, B. T., & Yiend, J. (1997). 'Oops!': Performance correlates of everyday attentional failures in traumatic brain injured and normal subjects. *Neuropsychologia, 35*(6), 747–758. https://pubmed.ncbi.nlm.nih.gov/9204482/ ; https://www.sciencedirect.com/science/article/abs/pii/S0028393297000158
- Sustained Attention to Response Task (SART) — VAGO parameters protocol (block structure, digit 0–9 variant, ~7% no-go). https://scienceofbehaviorchange.org/wp-content/uploads/2018/01/Sustained_Attention_to_Response_Task.pdf
- Sustained Attention to Response Task (SART) — Millisecond library. https://www.millisecond.com/library/sart
- Sustained Attention to Response Task (SART) — PsyToolkit. https://www.psytoolkit.org/experiment-library/sart.html
- Smilek, D., et al. (2012). A methodological note on evaluating performance in a sustained-attention-to-response task. *Behavior Research Methods, 45*(2), 355–363 (response-delay reduces commission and omission errors; 10%-omission/3-SD exclusion criterion; RT-CV formula context). https://link.springer.com/article/10.3758/s13428-012-0266-1
- "Not enough time or not enough attention? Speed, error and self-maintained control in the SART" (speed–accuracy tradeoff critique of commission errors). https://www.researchgate.net/publication/228400882_Not_enough_time_or_not_enough_attention_Speed_error_and_self-maintained_control_in_the_Sustained_Attention_to_Response_Test_SART
- "Age differences in sustained attention tasks: A meta-analysis" (no-go rate range 5–30% across the literature; developmental trajectory). https://pmc.ncbi.nlm.nih.gov/articles/PMC8642381/
- Anticipatory-response / minimum valid RT literature. https://www.neurobs.com/manager/content/docs/psychlab101_experiments/Go-NoGo%20Task/description.html ; https://cortex-lab.site/en/blog/reaction-time
- Vigilance decrement / time-on-task fatigue. https://pmc.ncbi.nlm.nih.gov/articles/PMC3929366/ ; https://www.frontiersin.org/articles/283455
