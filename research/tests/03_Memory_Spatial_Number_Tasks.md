# Task-Design Standards: Learning Efficiency, Spatial Ability, and Number Sense

**Project:** Student Psychometric Analysis — JEE/NEET Aspirant Battery (ages 16–19)
**Metrics covered:** A4 Learning Efficiency (paired-associate learning + recognition) · C2 Spatial Ability (2D mental rotation + paper folding) · C1 Number Sense (symbolic magnitude comparison + number-line estimation + rapid estimation)
**Deliverable:** 3 of 4 parallel research reports (see also the other `research/tests/0X_*.md` files)
**Date:** 2026-07-13

---

## 0. Scope and how to use this document

This report translates the gold-standard experimental paradigms behind six task families into **engineering-ready item-construction rules**: what stimuli to build, how to sequence trials, what to time, what formula to score with, and what numeric benchmark to validate against. Every design rule below is traced to a named paradigm/paper. Where the source paper used stimuli we cannot legally or sensibly reuse (real foreign-language words, copyrighted rotation plates), the report gives **generative construction rules** so an original, non-infringing item bank can be built instead.

**Quick-reference table**

| # | Subtest | Metric | Core paradigm | Item bank size (typical) | Timing | Primary score |
|---|---|---|---|---|---|---|
| 1a | Paired-associate learning | A4 | Zerr et al. (2018) learning-efficiency task | 12–45 novel symbol–word pairs | 4 s study / 4.5 s test / 10–15 min filled delay | Tests-to-criterion, immediate recall %, delayed recall % |
| 1b | Associative recognition | A4 | Recombined-pair foils (5-PAR logic) | Same pairs, ~50% intact / 50% recombined | Self-paced 2AFC | d′ (log-linear corrected) |
| 2 | 2D mental rotation | C2 | Cooper & Shepard (1973) same-vs-mirror | 40–80 trials, 4–5 angles | 5–8 s deadline | RT-vs-angle slope (ms/°), accuracy |
| 3 | Paper folding (punched hole) | C2 | Thurstone/ETS Kit VZ-2 | 20 items / 2 parts | 3 min/part (speeded) | % correct, by fold-count/type |
| 4 | Symbolic magnitude comparison | C1 | Moyer & Landauer (1967); Nuerk et al. (2001) | 60–120 two-digit pairs | ~2.5–3 s deadline/item | Distance-effect slope, accuracy |
| 5 | Number-line estimation 0–1000 | C1 | Siegler & Opfer (2003) | 20–24 targets | Untimed (≤10–15 s/item) | PAE %, linear R² |
| 6 | Rapid estimation (3-option) | C1 | Split-effect / rounding-strategy literature | 20–40 items | 5–8 s deadline | Accuracy, RT, lure-type diagnostics |

---

## 1. A4 Learning Efficiency — Paired-Associate Learning

### 1.1 Design rationale and source paradigm

The reference design is **Zerr, Berg, Nelson, Fishell, Savalia & McDermott (2018), "Learning Efficiency: Identifying Individual Differences in Learning Rate and Retention in Healthy Adults,"** *Psychological Science* 29(9), 1436–1450 — purpose-built to **eliminate the ceiling effects** that standard clinical paired-associate tests (e.g., WMS-IV Verbal Paired Associates) show in healthy, high-ability populations. This is exactly the risk profile of a JEE/NEET-aspirant sample, so the ceiling-avoidance logic of this paradigm should be treated as a hard design constraint, not an optional detail.

Full method (verified from the primary-source PDF): participants studied **45 Lithuanian–English word pairs** (two counterbalanced parallel lists validated as equivalent). Each pair was shown for **4 s, separated by a 1-s ISI**. After one exposure, participants took **Test 1** — a cued-recall test (native-language cue → target response), cue shown for 4.5 s, with **immediate corrective feedback** (correct pairing displayed 1.5 s regardless of response accuracy, 1-s ISI). Correctly recalled items were *dropped*; incorrectly recalled items were re-tested in the next cycle. This test-with-feedback / drop-correct-retest-incorrect loop (**retrieval practice**) repeated — with **30 s of arithmetic filler between test blocks** to clear working-memory rehearsal — until every pair had been recalled correctly **exactly once** ("tests-to-criterion"), capped at 16 cycles. After criterion, all pairs were **restudied once more**, then participants played a **5-minute Tetris distractor** (filled delay) before a **final cued-recall test** (identical format to Test 1, no feedback).

### 1.2 Protocol parameters (engineering spec)

| Parameter | Zerr et al. (2018) value | Recommended battery adaptation |
|---|---|---|
| Number of pairs | 45 | 12–24 (shorter battery; keep ≥12 to avoid ceiling in a strong sample) |
| Study exposure | 4 s/pair, 1-s ISI | Keep as-is; scales with pair count |
| Test-cue window | 4.5 s | Keep as-is |
| Feedback | Correct pair shown 1.5 s, always | Keep as-is (regardless of accuracy) |
| Retrieval-practice cycles | Iterate until 100% correct-once, cap 16 | **Cap at 2–3 fixed cycles** for a bounded-length battery (accept a small ceiling/floor trade-off vs. the adaptive original) |
| Inter-cycle filler | 30 s arithmetic | Keep — prevents covert rehearsal of just-tested items |
| Pre-delay restudy | One full restudy pass | Keep |
| Retention interval | 5-min filled (Tetris) | **10–15 min filled**, per this project's spec — use another unrelated, attention-demanding battery stage as filler, never idle waiting or a repeated silent-recall attempt |
| Delayed test | Cued recall, no feedback, 4.5 s window | Keep |

### 1.3 Stimulus construction rules (novel symbol–word pairs)

Zerr et al. used real (but unfamiliar) Lithuanian words. For an Indian, often multilingual (English/Hindi/regional-language) 16–19-year-old sample, **real foreign vocabulary risks partial pre-existing association** via cognates or loanwords, so construct **wholly novel stimuli** instead, following the same "unfamiliar visual referent + arbitrary label" logic used in developmental visual–verbal paired-associate-learning (PAL) research:

- **Cue side:** invented glyphs/symbols — either abstract 2–4-stroke shapes with no resemblance to Devanagari, Tamil, or other scripts the student may recognize, or simple novel pictograms. Do **not** reuse real alphanumerics or existing-script characters, even decoratively, since partial letter/numeral resemblance ("this glyph looks like a 6") reintroduces the pre-existing-association confound the design is meant to eliminate.
- **Target side:** common, concrete, high-imageability English nouns (easier to verify/score than invented pseudowords, and avoids the added burden of learning novel phonology). Alternatively use pseudowords with legal English phonotactics (no real lexical meaning) if a fully symmetric novel–novel pairing is preferred.
- **Match nuisance variables:** control glyph stroke-count and target-word length/syllable count across items so item-level difficulty isn't confounded by surface complexity (mirrors Zerr et al.'s own control of Lithuanian/English word length and syllable count).
- **Two parallel forms** (List A/List B) built to matched difficulty allow re-testing without item repetition — validate equivalence empirically (no significant mean difference across forms) before relying on them interchangeably, as Zerr et al. did for their two lists.

### 1.4 Recognition test with recombined-pair foils

Add (or substitute, for a shorter battery) a **recognition** stage using the associative-recognition logic common in the paired-associate-recognition literature (5-PAR: Old-intact / Old-rearranged / Old-New / New-Old / New-New). The critical design element is that **foils must be "recombined" pairs — both members studied, just not originally paired together** — not wholly novel pairs:

- **Intact trials (signal):** cue + target exactly as studied.
- **Recombined trials (critical lure):** a studied cue re-paired with a *different* studied target. Because both components are individually familiar, correct rejection requires true **relational/associative memory**, not mere item familiarity — this is precisely why recombined foils (not novel-item foils) are the standard, since novel-item foils can be rejected on item-familiarity alone without engaging the associative memory the A4 construct targets.
- Optionally add a small proportion of fully novel pairs (new cue + new target) as an item-familiarity control/catch condition.
- Response format: old/new judgment per pair, or explicit "same pairing / different pairing" 2AFC.

### 1.5 Scoring formulas

- **Tests-to-criterion** = number of test cycles needed to have every pair correct once (lower = faster learning).
- **Immediate recall %** = Test-1 accuracy after a single study exposure (by design, this is a *floor* measure, not a ceiling one).
- **Delayed recall % ("final test")** = accuracy on the post-delay cued-recall test.
- **Retention ratio** = delayed recall % ÷ 100% (criterion baseline), since every retained item was, by definition, correct at least once at criterion. This isolates *durability* from *learning speed*.
- **Composite learning-efficiency score** (Zerr et al.'s approach): average the standardized z-scores of Test-1 accuracy, (−1 × tests-to-criterion), and delayed-recall accuracy into one z-composite. Recommended as the single A4 scale score.
- **Recognition d′ with log-linear correction** (Snodgrass & Corwin, 1988; independently corroborated in Miller, 2018, *Behavior Research Methods*, "Recovering the variance of d′ from hit and false alarm statistics"):

```
p(Hit)_corrected  = (Hits + 0.5) / (N_signal_trials + 1)
p(FA)_corrected   = (FalseAlarms + 0.5) / (N_noise_trials + 1)
d' = Φ⁻¹(p(Hit)_corrected) − Φ⁻¹(p(FA)_corrected)      [Φ⁻¹ = inverse standard-normal CDF]
```

Apply this correction whenever a hit or false-alarm rate could be 0 or 1 (common with capable test-takers), which makes the raw z-transform undefined. Compute d′ separately for **intact-vs-recombined** (the diagnostic "associative" d′ for A4) and, if novel-pair catch trials are included, for **old-vs-new** (an "item familiarity" d′) so the two memory components aren't conflated.

### 1.6 Benchmark numbers (from the primary source)

- Immediate recall after one exposure (Test 1, 45 pairs): **M ≈ 9.4–11.1/45 ≈ 21–25%** — deliberately low, by design, to avoid ceiling.
- Tests-to-criterion (45 pairs, cap 16): **M ≈ 7.6–8.3 cycles (SD ≈ 2.8–2.9)**.
- Delayed final-test recall (post-criterion, post-restudy, post-5-min-filled-delay): **M ≈ 33.2–33.4/45 ≈ 73.8–74.2%** → retention ratio ≈ **74%** (i.e., ~26% forgetting despite every item having been correctly produced at least once).
- Individual differences: faster learners (fewer tests-to-criterion) also retain **more**, not less — tests-to-criterion vs. final-test correlation **r ≈ −.48 to −.60** — speed and durability are positively linked, not a speed/accuracy trade-off.
- Test–retest reliability (30-hour gap, alternate forms): Test 1 **r ≈ .56**; tests-to-criterion **r ≈ .68**; final test **r ≈ .68**; composite **r ≈ .68** — a useful reliability target to validate your own instrument against during piloting.

### 1.7 Pitfalls

- Real low-frequency foreign vocabulary risks partial pre-existing association for multilingual Indian test-takers — use invented glyphs/pseudowords.
- Too few pairs re-introduces ceiling effects in a high-ability sample — err toward more pairs or shorter per-item exposure rather than fewer pairs.
- An **unfilled** retention interval invites covert rehearsal, inflating retention estimates — always fill the delay with an unrelated, attention-demanding task.
- Novel-item-only recognition foils let participants pass on item familiarity alone — recombined foils are essential to isolate associative memory.
- Extreme hit/FA rates make raw z-scores undefined — always log-linear-correct before computing d′.
- The original "iterate until every item correct once" design has **unbounded length**, which is incompatible with a fixed-duration, multi-stage battery — cap retrieval-practice cycles at a fixed number (2–3) rather than an adaptive criterion.

### 1.8 Copyright notes

The Zerr et al. learning-efficiency *task design* is a published research method, not a proprietary product — but do not reuse the actual Lithuanian–English stimulus lists verbatim; construct an original glyph/pseudoword set as above. If WMS-IV Verbal Paired Associates or any other clinical instrument is consulted for delay-interval precedent, note that its actual stimuli and scoring materials are Pearson-copyrighted and must not be copied.

---

## 2. C2 Spatial Ability — 2D Mental Rotation (Same-vs-Mirror)

### 2.1 Paradigms

Two related but distinct classic paradigms underlie "2D mental rotation":

- **Shepard & Metzler (1971):** paired line drawings of 3D multi-cube objects; participants judge whether the second is a rotation of the first ("same") or a rotation **and** a mirror-reflection ("different"). Response time increases **linearly** with angular disparity for same/rotation-only pairs, in both picture-plane and simulated-depth rotations — the founding evidence for an analog, continuous mental-rotation process.
- **Cooper & Shepard (1973):** the more directly relevant precedent for a **2D, single-stimulus, same-vs-mirror** task. A single rotated alphanumeric character is shown, and participants judge normal vs. mirror-reversed. RT increases from 0° toward 180° (slowest at 180°), then decreases from 180° toward 360° in full-circle designs — a genuinely circular RT-by-angle function. If item angles are restricted to 0–180° only (as specified: 45/90/135/180°), expect a simple monotonic increase, not the post-180° decrease.

The standard *instruments* built on these paradigms — the **Vandenberg & Kuse (1978) Mental Rotations Test (MRT)** and the **Purdue Spatial Visualization Test: Rotations (PSVT:R;** Guay, 1976; Bodner) — are both **copyrighted** (see §2.6). Use them only as design references, never as reusable artwork.

### 2.2 Stimulus construction rules (original, non-infringing artwork)

Build items from **asymmetric polyomino-like shapes**: irregular paths of 5–7 connected unit cells (in the spirit of pentomino "arms," but deliberately irregular), validated programmatically before use:

1. **No rotational symmetry:** none of the shape's 90°/180°/270° rotations may equal the original shape (otherwise "same" becomes trivial at that angle).
2. **No reflective symmetry:** the mirrored shape must not equal any rotation of the original (otherwise "mirror" becomes undetectable) — this is the single most important construction check, since a symmetric shape simply has no discriminable mirror image.
3. Reject and regenerate any candidate shape failing check 1 or 2.
4. Acceptable alternative stimulus classes with precedent in the literature: rotated **asymmetric alphanumeric characters** (letters such as F, G, J, L, P, Q, R; digits 2,3,4,5,6,7,9 — all have a clear canonical upright and no reflective symmetry), or abstract "pseudo-letter" glyphs (used specifically to block a verbal-labeling shortcut, e.g., "that's a rotated R," that real letters invite).
5. **Trial construction:** "same" = shape rotated by the trial's angular disparity, no reflection; "mirror" = shape reflected, then rotated by the same disparity. Balance same/mirror 50/50, balance CW/CCW rotation direction, and keep rotation strictly in-plane (2D) — do not introduce simulated depth/foreshortening, which adds a second cognitive demand beyond pure 2D rotation.

### 2.3 Protocol parameters

- **Angular disparities:** 45°, 90°, 135°, 180° (per spec), optionally with 0° catch trials as an easy floor check.
- **Trials per angle:** minimum ~8–10 per angle × same/mirror condition for a stable within-battery slope estimate (full psychophysical studies use more; a screening battery trades some precision for time).
- **Response deadline:** generous enough to capture the RT-vs-angle slope (5–8 s) but bounded to discourage a switch to slow, piecemeal feature-matching.
- Log accuracy and RT on every trial; present central fixation before each stimulus.

### 2.4 Scoring

- **RT-by-angle regression slope (ms/degree)**, computed on correct "same" trials — the classic dependent variable; flatter slope = more efficient spatial transformation.
- **Intercept** (baseline encoding + decision time independent of rotation) as a secondary index.
- **Overall accuracy**, especially important under a speeded deadline where some participants trade speed for accuracy.

### 2.5 Benchmark numbers

- Classic 3D block-figure (Shepard–Metzler-style) slopes: **≈ 10–12 ms/degree** (≈ 84°/s mental-rotation speed).
- 2D alphanumeric-character rotation (Cooper & Shepard-style, adults): markedly shallower, **≈ 3–4 ms/degree** (≈ 290–300°/s) — simple 2D asymmetric shapes should be expected to produce a *shallower* slope than complex 3D cube figures, which has direct implications for how many trials/how much angular range are needed to detect the effect reliably given the smaller millisecond-scale signal.
- RT is typically maximal at 180° disparity in single-stimulus same/mirror designs.
- Accuracy: expect healthy adolescent/young-adult 2AFC same/mirror accuracy in the **~75–95%** range at smaller angles, decreasing toward chance (50%) as disparity approaches 180° for more complex shapes (contrast with the MRT's own ~40–50% raw-correct norms, which reflect that instrument's stricter both-choices-correct scoring rule, not the same 2AFC metric used here).
- Reliable sex differences (male > female, historically d ≈ 0.5–0.9) and spatial-experience effects (gaming, spatial hobbies) are consistently reported in this literature — treat as a known covariate to interpret against, not a scoring artifact.

### 2.6 Pitfalls

- Symmetric shapes (squares, most simple tetrominoes) make the mirror condition partly or fully undetectable — always verify asymmetry programmatically before deploying an item.
- Real letters/digits risk a verbal-labeling shortcut that changes strategy for some test-takers relative to abstract shapes.
- Conflating picture-plane rotation with simulated depth/foreshortening adds a confound beyond pure 2D rotation.

### 2.7 Copyright notes — MRT / PSVT:R

**The Vandenberg & Kuse Mental Rotations Test and the Purdue Spatial Visualization Test: Rotations (PSVT:R) are both copyrighted and must not be reproduced, redrawn-to-resemble, or embedded in a shipped product.** The original Vandenberg & Kuse printing plates deteriorated to the point that the field now uses **Peters et al. (1995), "A Redrawn Vandenberg & Kuse Mental Rotations Test"** — itself distributed only to verified researchers, non-commercially, on request, and still copyright-restricted. PSVT:R is owned by the Purdue Research Foundation. **Commission fully original artwork** using the polyomino-validation rules in §2.2 — this generates an unlimited, legally clean item bank without touching either copyrighted instrument.

---

## 3. C2 Spatial Ability — Paper Folding (Punched-Hole)

### 3.1 Paradigm and reference instrument

Originates with **L. L. Thurstone's Primary Mental Abilities (PMA)** space-factor battery; the modern standard research version is the **ETS Kit of Factor-Referenced Cognitive Tests, "Paper Folding Test" (VZ-2)**, still in active use (e.g., the Vz-2-BRACE administration copy). Concrete, verified parameters from the standard instrument:

- **20 scored items across 2 parts (10 items/part), 3 minutes per part** (6 minutes total) — this is a **speeded** test, not a pure untimed power test.
- **5 answer options (A–E)** per item.
- **1–2 punched holes** shown in the final folded figure.
- Square starting paper; the paper is **only folded, never turned/rotated**; the hole is punched **only after all folds are complete**; a punch through *N* layers produces *N* holes in the unfolded result, placed with mirror symmetry across each fold line crossed.

### 3.2 Item construction rules

1. Choose a square sheet and a sequence of **1–4 folds** (edge-to-edge or edge-to-midline for easier items; add diagonal folds for harder items).
2. Every fold must keep the folded shape **within the original square's outline** and must not re-orient the whole sheet — folding only, no twisting.
3. Place **1–2 punch marks** on the final folded shape.
4. Derive the correct unfolded answer by **mirroring the punch location(s) back across each fold line in reverse fold order**, doubling the hole count at every fold line the punched layer crosses.
5. **Distractor generation** — construct wrong options by simulating genuine fold-tracking errors, not arbitrary noise:
   - mirror across the *wrong* axis for one fold step (position error);
   - omit doubling at one fold (undercounts holes);
   - apply one spurious extra doubling (overcounts holes);
   - correct hole count, but shifted/rotated placement;
   - a plausible result "as if" the sequence had one fewer or one more fold.
   These mirror the actual errors students make losing track of the fold stack, so they function as genuine cognitive distractors, not arbitrary wrong answers. Mix **wrong-count** and **wrong-position** distractors within each item's option set — using only one distractor type lets test-takers shortcut via hole-counting alone.

### 3.3 Difficulty drivers (empirically established)

- **Number of folds** — more folds = more mental "layers" to track = harder.
- **Fold type** — diagonal folds are reliably harder than horizontal/vertical folds; items **mixing** fold types are hardest of all. Easiest items: zero diagonal folds, 0–2 orthogonal folds. Intermediate: diagonal folds with no orthogonal folds.
- **"Atypical"/occluding folds** — folds that hide or occlude a previously-made fold's edge add a **working-memory** load distinct from the baseline spatial-visualization load of "basic," non-occluding folds (Jaeger, 2015, basic-vs-atypical distinction) — this is a separate difficulty lever from simply adding more folds.
- **Number of punch holes** (1 vs. 2) — more punches means more locations to track through every mirroring step.

### 3.4 Scoring

- **Proportion/number correct**, optionally with a guessing correction for k-option items: `score = Right − Wrong/(k−1)` (traditional PMA/ETS paper-and-pencil convention; rights-only scoring is more common in modern digital administration).
- Report accuracy **broken down by fold-count bin and fold-type bin** as difficulty-diagnostic sub-scores, plus response time as a secondary speed index.

### 3.5 Benchmark numbers

- Standard VZ-2 administration: **20 items, 6 minutes total**, highly speeded.
- Item-level accuracy in adults spans widely by design: **>90% correct** on easy 1-fold, orthogonal-only items down to **<30–40%** on the hardest multi-fold/diagonal/occluding items — engineer the item bank to ramp across this full range so scores spread across the ability distribution expected in a pre-selected, above-average JEE/NEET-aspirant sample (include enough hard items to avoid ceiling).

### 3.6 Pitfalls

- Fold order/axis must be depicted **unambiguously** — any ambiguity destroys the item's validity as a mental (not perceptual) folding task.
- Never let the paper appear to rotate/flip beyond the folds explicitly shown.
- Using only wrong-axis distractors (never wrong-count) lets test-savvy students shortcut via hole-counting rather than true mental unfolding.
- An item bank skewed toward easy (1–2 orthogonal folds) risks ceiling in a high-ability sample — include 3–4-fold and diagonal/occluding items.

### 3.7 Copyright notes

The Paper Folding Test (VZ-2) is part of the **ETS Kit of Factor-Referenced Cognitive Tests**, distributed for research/non-commercial use under specific reproduction terms; the Vz-2-BRACE administration copy reproduces the actual ETS item set. **Do not reproduce ETS's plates in a commercial product** — the construction rules in §3.2 generate an equivalent, original item bank without copying ETS artwork.

---

## 4. C1 Number Sense — Symbolic Magnitude Comparison

### 4.1 Paradigm

Founded by **Moyer & Landauer (1967)**, "Time required for judgements of numerical inequality" (*Nature*): a two-alternative "which is larger?" digit-comparison task revealing the **numerical distance effect** (RT and errors increase as |a−b| decreases) and a magnitude/size effect (at equal distance, larger-magnitude pairs are slower), jointly interpreted as evidence for an internal analog "mental number line."

Extended to two-digit numbers by **Nuerk, Weger & Willmes (2001)** and a substantial follow-on literature: the **unit-decade compatibility effect**. When comparing two 2-digit numbers, decade-digit and unit-digit comparisons are made semi-independently. A pair is **compatible** when both digit-wise comparisons agree with the overall answer (e.g., 42 vs. 57: 4<5 *and* 2<7 — both say "57 is bigger"); **incompatible** when they conflict (e.g., 47 vs. 62: 4<6 but 7>2, even though 62 is still numerically larger). Incompatible pairs are reliably slower/more error-prone than compatible pairs at matched overall distance — evidence against a purely holistic mental-number-line account, and a key manipulation for item construction. This has been replicated in large samples (N=452 adults, decompensation effect confirmed alongside the standard distance effect).

### 4.2 Item construction rules (2-digit pairs)

1. Restrict to a defined 2-digit range (e.g., 11–99); decide whether to exclude multiples of ten and repeated-digit numbers (11, 22, 33…) as "easy anchor" items, tagging them as a separate bin rather than mixing them uncontrolled into scored distance bins.
2. **Distance bins:** construct close (overall distance 1–5), medium (6–15), and far (16–30+) pairs — the distance effect (accuracy/RT vs. distance) is the primary validity check for the subtest.
3. **Compatibility, orthogonal to distance:** at matched overall distance, construct both compatible pairs (decade and unit comparisons agree — e.g., 42–57) and incompatible pairs (they disagree — e.g., 47–62).
4. Track within-decade pairs (differ only in unit digit, e.g., 45 vs. 48) as their own sub-bin, since these rely on a different sub-computation than between-decade pairs.
5. **Counterbalance** which side/position shows the numerically larger value, to prevent a positional response bias.

### 4.3 Protocol parameters

- Present both numbers simultaneously (or sequentially, per modality choice); require a fast 2AFC "select the larger" response.
- **Response deadline ≈ 2.5–3 s per item** — long enough to cover the typical RT distribution for 2-digit comparisons (several hundred ms up to ~1.5 s even on harder/incompatible pairs) while still blocking a slow, effortful subtraction-based strategy in place of automatic magnitude access.
- Log accuracy and RT on every trial.

### 4.4 Scoring

- **Overall accuracy (%)** and **mean/median RT on correct trials** (exclude errors, to avoid speed-accuracy-tradeoff artifacts) as headline scores.
- **Distance-effect slope:** regress RT (or accuracy) against numerical distance (or 1/distance, or log-distance) across bins — a shallower RT-distance slope indicates more efficient/automatic magnitude access, and is the primary C1 index from this subtest.
- **Compatibility effect:** mean RT(incompatible) − mean RT(compatible) at matched distance — a secondary/diagnostic index of holistic vs. decomposed processing, more a data-quality/strategy check than a "higher is better" score.

### 4.5 Benchmark numbers

- Young-adolescent (grade 1–3) accuracy on brief symbolic-comparison screeners (e.g., the **Numeracy Screener**, Nosworthy et al., 2013 — a validated 2-minute paper-and-pencil symbolic/non-symbolic comparison test) already runs **.89–.92 correct** at that age.
- Given continued improvement through adolescence and a **pre-selected, high-achieving 16–19-year-old** sample, expect accuracy to approach **ceiling (>95%)** under an untimed or generously-timed task — this is exactly why a **response deadline plus RT/slope-based scoring**, not raw accuracy alone, is necessary to avoid ceiling and capture real individual differences at this age/ability level. The distance-effect slope and compatibility effect are the primary sensitive measures for this population, not raw percent correct.

### 4.6 Pitfalls

- An untimed or generously-timed task will show ceiling accuracy in this population and yield little variance — always pair with a deadline and RT-based scoring.
- Failing to orthogonally manipulate compatibility and distance conflates two distinct effects and muddies average item difficulty — build pairs on a deliberate distance × compatibility grid.
- Round numbers/repeated-digit pairs introduce easy shortcut items — exclude or explicitly separate them from scored bins.
- Uncounterbalanced left/right position of the larger number introduces a response-side bias.

---

## 5. C1 Number Sense — Number-Line Estimation (0–1000)

### 5.1 Paradigm

**Siegler & Opfer (2003)**, "The Development of Numerical Estimation: Evidence for Multiple Representations of Numerical Quantity" (*Psychological Science*), established the bounded 0–1000 (and 0–100) number-line estimation task as the standard paradigm for numerical-magnitude-representation research. Headline finding: the **log-to-linear shift** — younger/less numerically experienced participants' estimates fit a compressive **logarithmic** function of target magnitude; older/more experienced participants fit a **linear** function. By their adult sample, the linear-model fit was at or near 100% — i.e., the representational shift is essentially **complete by adulthood**. For a 16–19-year-old sample, this means the task remains a **precision** measure (how close, how consistent) rather than a representational-shift measure (log vs. linear is not expected to discriminate much at this age).

### 5.2 Target-selection rules

1. **Spread targets across the full 0–1000 range**, including values below and above the midpoint (500) and across multiple orders of magnitude within the range — fitting and comparing log vs. linear models (and computing a meaningful R²) requires a target spread that is not evenly log-spaced or evenly linear-spaced only.
2. **Avoid placing targets exactly on obvious benchmark values** (0, 250, 500, 750, 1000, or other clean multiples of 50/100). Participants using benchmark-based strategies (anchoring to the line's origin, midpoint, endpoint, or quartile marks) will answer benchmark-coincident targets correctly via simple proportional recall rather than genuine magnitude estimation, artificially inflating accuracy and masking true precision.
3. Do include some targets **near, but not exactly on**, benchmark values — this specifically tests whether benchmark-anchoring strategies produce systematic local bias, which is a diagnostic bonus rather than pure noise.
4. Use a **fixed set of ~20–24 target numbers**, randomized in presentation order, balanced across low/mid/high thirds of the range.

### 5.3 Protocol parameters

- Unmarked (or endpoints-only-labeled) horizontal line of fixed physical/pixel length.
- Participant marks/clicks/drags the estimated position for a numeral shown above the line.
- Untimed in principle (this is a precision/power measure, not a speed measure) but a generous per-item ceiling (10–15 s) prevents stalling.
- Record the **exact rendered pixel position** and convert to an estimated value via linear interpolation between the line's actual labeled endpoints — do not hard-code assumed pixel widths (see pitfalls).

### 5.4 Scoring formulas

- **Percent Absolute Error (PAE):**

```
PAE = 100 × |Estimated value − Actual target value| / (Range of the line)
```

For a 0–1000 line: `PAE = 100 × |estimate − target| / 1000`. Lower PAE = better.

- **Linearity (R²):** fit each participant's (target, estimate) pairs with both a linear model (`estimate = a + b·target`) and a logarithmic model (`estimate = a + b·ln(target)`); report the linear model's **R²** (and, optionally, compare fit indices between the two models) as the linearity index. Higher linear R² = more mature/consistent linear mapping. PAE and R² are complementary: a participant can have high linear R² with a systematic scaling bias that still produces non-trivial PAE, so both should be reported.

### 5.5 Benchmark numbers

- Siegler & Opfer (2003) original 0–1000 study: 2nd graders predominantly **logarithmic**; 6th graders and adults predominantly/fully **linear**.
- A population-level study of **6,484 ninth-graders** (mean age ~14, range 12–19) confirmed the task's validity as a mathematics-achievement correlate at adolescent ages (Nuraydin et al., 2022).
- **Schneider et al. (2018)** meta-analysis (263 effect sizes, N = 10,576, ages 4–14): overall number-line–math correlation **r ≈ .44**, rising to **r ≈ .49** in participants older than 9 — the task remains meaningfully diagnostic well into adolescence even after the log/linear shift is complete.
- Typical **PAE on a 0–1000 line in older/more numerate samples runs ≈ 3–3.5%** (a frequently cited benchmark: PAE ≈ 3.3–3.4% for both 0–1000 and reverse 1000–0 versions) — consistent with the **~2–4% range expected for a 16–19-year-old JEE/NEET-aspirant sample**. Expect **linear R² > .95** for the large majority of participants in this age/ability band, with **PAE, not R², doing most of the discriminating work**.

### 5.6 Pitfalls

- Because the log-to-linear shift is essentially complete by adolescence, do not rely on "% fit linear vs. log" as the main discriminator for a 16–19 population — it will show near-ceiling linearity for almost everyone. Use **PAE** as the primary sensitive score.
- Targets placed exactly at 0/250/500/750/1000 invite benchmark-shortcut answers that deflate true error and distort the PAE distribution.
- A too-narrow or clustered target spread undermines log-vs-linear model comparison and biases PAE toward whichever region was sampled.
- **Engineering-specific bug risk:** failing to read the actual rendered pixel length of the line (which varies across devices/screens in a web implementation) silently corrupts the position→value conversion and every downstream PAE score — always compute PAE from the actual rendered endpoints, never assumed/hard-coded pixel values.

---

## 6. C1 Number Sense — Rapid Estimation Items ("≈34×19?", 3 options)

### 6.1 Theoretical background

Computational/arithmetic estimation is studied as a skill distinct from exact calculation. Two converging literatures inform item design:

- **Rounding-strategy research** (Lemaire & Lecacheur and related work on children's and adults' computational-estimation strategies): estimators use rounding-down, rounding-up, and mixed/adaptive rounding strategies, with more complex, more adaptive strategy use increasing with age/expertise.
- **Arithmetic-verification "split effect"** (Ashcraft and colleagues; related work on sum/product verification and plausibility judgment): when judging whether a proposed answer is correct, the numerical **distance ("split") between the proposed and true answer** systematically drives difficulty — small splits (proportionally close to correct) are hard to reject and slower/more error-prone; large splits (far off, or wrong by an order of magnitude) are rejected quickly and accurately. This split/distance effect is the direct design lever for constructing multiple-choice estimation options.

### 6.2 Option-construction rules (3-option item)

For an item stem such as "≈ 34 × 19 ?":

1. Compute the **true value** (646).
2. **Correct/target option:** either the exact value, or — if the intended construct is "closest approximation" rather than exact computation — a rounded value that is unambiguously the closest of the three options to the true value (e.g., within ±5%).
3. **Near/plausible-but-wrong lure ("small split," ~10–20% off):** generated by a plausible partial-rounding error a test-taker might actually make (e.g., rounding only one operand: 34×20=680, or 30×19=570) or a one-digit computation slip. This lure requires genuine magnitude sense to reject, not just a glance at digit count — it is the primary **difficulty** lever (see below).
4. **Order-of-magnitude lure ("large split," ~10× too large/small, or a decimal/place-value shift** — e.g., 64.6 or 6,460 instead of 646): should be easy to reject with correct magnitude sense; functions as a floor check and catches place-value errors or blind guessing.
5. Vary which position (1st/2nd/3rd) holds the correct answer across items, and avoid layouts where options are evenly spaced/orderable by digit count alone (which invites a "pick the middle one" heuristic).
6. **Always pair a near-lure with an order-of-magnitude lure** in the same item — an item with only order-of-magnitude distractors can be solved by "avoid the obviously-wrong-scale option" without engaging fine-grained estimation.

### 6.3 Difficulty knobs

- **Operand size/digit count:** single-digit×single-digit (easiest) → 2-digit×2-digit → 3-digit×2-digit (hardest); larger operands increase both computational load and the estimation-precision required.
- **Operand "roundness"/compatibility:** operands already near round numbers (e.g., 29×41 ≈ 30×40) are easier to estimate than "awkward" operands requiring asymmetric rounding decisions.
- **Closeness of the near-lure to the true value** — smaller % gap = harder item; this is the primary psychometric difficulty parameter, directly analogous to the "distance" manipulations used elsewhere in the C1 metric.
- **Response deadline:** tight (5–8 s) forces genuine rapid estimation/magnitude heuristics rather than exact calculation — too generous a deadline lets strong test-takers simply compute the exact answer, defeating the "estimation, not calculation" construct. Validate empirically during piloting: if median RT sits far below the deadline with high accuracy, tighten it; if accuracy craters, loosen it.
- **Operation type:** multiplication is the canonical item type here, but addition/subtraction/division calibrate differently (division is typically much harder to estimate) — if mixing operations, treat operation type as its own difficulty/strategy factor, not a freely interchangeable choice.

### 6.4 Scoring

- **Accuracy (%)** as the headline score; **RT on correct trials** as a fluency index.
- Optional **estimation-efficiency composite** (accuracy conditioned on RT, or accuracy per unit time), paralleling other C1 sub-scales.
- **Lure-type diagnostics:** log whether an incorrect response selected the near-lure vs. the order-of-magnitude lure — near-lure errors indicate fine-grained magnitude imprecision, while order-of-magnitude errors indicate gross place-value/procedural breakdowns. This distinction is diagnostically valuable and cheap to capture.

### 6.5 Pitfalls

- A near-lure that is too close (within 2–3% of true value) can make "correct" ambiguous under exact-value scoring — explicitly decide whether the task is "pick the exact product" or "pick the closest approximation," and construct lure spacing consistently with that decision.
- Order-of-magnitude-only distractor sets let test-takers shortcut via scale-checking alone — always include a near-lure too.
- Overly generous deadlines collapse the "estimation" construct back into an "exact-arithmetic speed" construct for capable JEE/NEET-aspirant test-takers.
- Mixing operations without tracking operation type as a covariate conflates difficulty sources.

---

## 7. Cross-cutting engineering notes

- **Ceiling avoidance is the unifying design constraint** across all six subtests, because the target population (JEE/NEET aspirants) is pre-selected for above-average cognitive ability. Every subtest above uses one of two levers to prevent ceiling: (a) a **response deadline** that forces reliance on the target automatic/heuristic process rather than a slower compensatory strategy (magnitude comparison, rapid estimation, mental rotation), or (b) a **structurally difficult/floor-inducing design** (single-exposure immediate recall in paired-associate learning; hard multi-fold/diagonal items in paper folding; wide, benchmark-avoiding target spread in number-line estimation).
- **Fixed vs. adaptive length:** the original Zerr paired-associate paradigm is open-ended ("test until every item correct once," up to 16 cycles) — this is incompatible with a fixed-duration, multi-stage battery and must be capped (§1.2).
- **Filled delays matter:** any subtest with a retention interval (paired-associate delayed recall) requires an unrelated, cognitively engaging filler task — never idle waiting, which invites covert rehearsal and inflates apparent retention.
- **Log every raw response, RT, and (for multiple-choice items) which specific distractor was chosen** — several subtests above (paper folding, rapid estimation) derive diagnostic value from *which* wrong answer was picked, not just correct/incorrect.
- **Original artwork requirement:** two subtests (2D mental rotation, paper folding) have widely-used copyrighted reference instruments (MRT, PSVT:R, ETS Kit VZ-2). This report's construction rules (§2.2, §3.2) are written specifically so an implementer can generate an equivalent, legally clean item bank without reproducing any copyrighted plates.

---

## Sources

**Paired-associate learning / recognition (A4):**
- [Zerr, Berg, Nelson, Fishell, Savalia & McDermott (2018) — full text PDF](https://bpb-us-e2.wpmucdn.com/sites.wustl.edu/dist/9/1627/files/2020/10/zerr-et-al-2018.pdf)
- [Learning efficiency: Identifying individual differences… — Christopher Zerr publication page](https://www.christopherzerr.com/publication/2018-zerr-et-al/)
- [Individual Differences in Learning Efficiency — McDermott & Zerr (2019), Current Directions in Psychological Science](https://journals.sagepub.com/doi/10.1177/0963721419869005)
- [Pragmatics of Measuring Recognition Memory (Snodgrass & Corwin, 1988) — log-linear correction](http://wixtedlab.ucsd.edu/publications/Psych%20218/Snodgrass_Corwin_1988.pdf)
- [Recovering the variance of d′ from hit and false alarm statistics — Behavior Research Methods](https://link.springer.com/article/10.3758/s13428-018-1181-x)
- [Associative Deficit in Recognition Memory in a Lifespan Sample of Healthy Adults — PMC (recombined-pair foils)](https://pmc.ncbi.nlm.nih.gov/articles/PMC3011045/)
- [Memory for Items and Associations: Distinct Representations and Processes in Associative Recognition — PMC](https://pmc.ncbi.nlm.nih.gov/articles/PMC2493415/)
- [Comparing the testing effect under blocked and mixed practice — Memory & Cognition](https://link.springer.com/article/10.3758/s13421-016-0641-8)
- [Reversing the testing effect by feedback… — PMC](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC7498445/)
- [Paired-Associate Learning — ScienceDirect Topics overview](https://www.sciencedirect.com/topics/medicine-and-dentistry/paired-associate-learning)

**2D Mental Rotation (C2):**
- [Mental rotation of three-dimensional objects — Shepard & Metzler (1971) summary](http://jhamrick.github.io/quals/mental%20imagery/2015/12/31/Shepard1971.html)
- [Shepard and Metzler Mental Rotation — Cognitive Train](https://cognitivetrain.com/shepard-metzler-mental-rotation/)
- [Mental rotation and perceptual uprightness (Cooper & Shepard letter-rotation paradigm) — full PDF](https://link.springer.com/content/pdf/10.3758/BF03198779.pdf)
- [The Role of Mental Rotation in Letter Processing by Children and Adults — Logan (1980) PDF](http://www.psy.vanderbilt.edu/faculty/logan/1980LoganCJP.pdf)
- [Rotational complexity in mental rotation tests — ScienceDirect](https://www.sciencedirect.com/science/article/pii/S0160289622000071)
- [High School Students' Performance on Vandenberg's Mental Rotations Test — ERIC](https://eric.ed.gov/?id=ED479372)
- [Mental Rotation Test Performance in Brazilian and German Adolescents — PMC](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6497729/)
- [The Purdue Visualization of Rotations Test — ResearchGate](https://www.researchgate.net/publication/226914099_The_Purdue_Visualization_of_Rotations_Test)
- [The Politics of the Purdue Spatial Visualization Test of Rotations (PSVT:R) — Engineering Studies](https://www.tandfonline.com/doi/full/10.1080/19378629.2023.2297958)
- [Peters (1995) — A Redrawn Vandenberg and Kuse Mental Rotations Test — full PDF](http://wexler.free.fr/library/files/peters%20(1995)%20a%20redrawn%20vandenberg%20and%20kuse%20mental%20rotations%20test.%20different%20versions%20and%20factors%20that%20affect%20performance.pdf)
- [Vandenberg & Kuse Mental Rotation Test (Redrawn version) — SILC copyright/access note](https://www.spatiallearning.org/tools/vandenberg-kuse-mental-rotation-test-redrawn-version)

**Paper Folding Test (C2):**
- [Educating on spatial skills using a paper-folding-and-punched-hole videogame — Frontiers in Education](https://www.frontiersin.org/journals/education/articles/10.3389/feduc.2024.1303932/full)
- [Paper Folding Test — Vz-2-BRACE (full item/timing specification, PDF)](https://www.cs.otago.ac.nz/brace/resources/Paper%20Folding%20Test%20Vz-2-BRACE%20Version%2007.pdf)
- [Knowing when to fold 'em: Problem attributes and strategy differences in the Paper Folding test — ScienceDirect](https://www.sciencedirect.com/science/article/abs/pii/S0191886918304495)
- [Problem attributes and strategy differences in the Paper Folding test — ERIC full text](https://files.eric.ed.gov/fulltext/ED590940.pdf)
- [Hole Punching / Paper Folding — Perceptual Ability Test overview — BohrPrep](https://bohrprep.com/hole-punching/)

**Symbolic Magnitude Comparison (C1):**
- [Determinants of reaction time for digit inequality judgments — Moyer, full PDF](https://link.springer.com/content/pdf/10.3758/BF03334328.pdf)
- [Symbolic Numerical Distance Effect Does Not Reflect the Difference between Numbers — PMC](https://pmc.ncbi.nlm.nih.gov/articles/PMC5715324/)
- [A Two-Minute Paper-and-Pencil Test of Symbolic and Nonsymbolic Numerical Magnitude Processing (Numeracy Screener) — PLOS One](https://journals.plos.org/plosone/article?id=10.1371%2Fjournal.pone.0067918)
- [Numeracy Screener — About the Test](https://www.numeracyscreener.org/about-the-test.html)
- [On the perceptual generality of the unit-decade compatibility effect — PubMed](https://www.ncbi.nlm.nih.gov/pubmed/14959508)
- [Individual differences influence two-digit number processing… (N=452 adults) — PubMed](https://pubmed.ncbi.nlm.nih.gov/29275433/)
- [Cognitive control in number processing: the unit–decade compatibility effect — ScienceDirect](https://www.sciencedirect.com/science/article/abs/pii/S0001691810002143)

**Number-Line Estimation 0–1000 (C1):**
- [Siegler & Opfer (2003) — Psychological Science, full PDF](https://siegler.tc.columbia.edu/wp-content/uploads/2019/12/4027Reading-SieglerOpfer-2003.pdf)
- [Percent absolute error (PAE) on the numerical estimation task — ResearchGate figure/benchmark](https://www.researchgate.net/figure/Percent-absolute-error-PAE-on-the-numerical-estimation-task-is-strongly-correlated-with_fig2_265302595)
- [Associations of Number Line Estimation With Mathematical Competence: A Meta-analysis — Schneider et al. (2018), Child Development](https://srcd.onlinelibrary.wiley.com/doi/abs/10.1111/cdev.13068)
- [The number line estimation task is a valid tool for assessing mathematical achievement — 6,484 Luxembourgish ninth-graders (Nuraydin et al., 2022), full PDF](https://www.uni-trier.de/fileadmin/fb1/prof/PSY/PAE/Team/Schneider/NuraydinEtAl2022.pdf)
- [Evaluating the Effect of Labeled Benchmarks on Children's Number Line Estimation — PMC](https://pmc.ncbi.nlm.nih.gov/articles/PMC5491597/)
- [Children's number line estimation strategies: bounded and unbounded tasks — PMC](https://pmc.ncbi.nlm.nih.gov/articles/PMC11580159/)

**Rapid Estimation Items (C1):**
- [What affects strategy selection in arithmetic? Parity and split effects on product verification — Memory & Cognition](https://link.springer.com/article/10.3758/BF03211420)
- [Why 2 + 2 = 5 looks so wrong: the odd-even rule in sum verification — Memory & Cognition](https://link.springer.com/article/10.3758/BF03198431)
- [To carry or not to carry — the carry effect in multi-digit addition — ScienceDirect](https://www.sciencedirect.com/science/article/pii/S0001691810001095)
- [Children's strategies in computational estimation — ScienceDirect (Lemaire & Lecacheur)](https://www.sciencedirect.com/science/article/abs/pii/S0022096502001078)
- [Children's Mixed-Rounding Strategy Use in Computational Estimation — ERIC full text](https://files.eric.ed.gov/fulltext/EJ1354785.pdf)
- [When you don't have to be exact: computational estimation with a comparison task — ScienceDirect](https://www.sciencedirect.com/science/article/abs/pii/S0001691814002315)
- [Solving Math Problems Approximately: A Developmental Perspective — PLOS One](https://journals.plos.org/plosone/article?id=10.1371%2Fjournal.pone.0155515)
- [Do Exact Calculation and Computation Estimation Reflect the Same Skills? — Frontiers in Psychology](https://www.frontiersin.org/journals/psychology/articles/10.3389/fpsyg.2018.01316/full)
- [PIAAC Cycle 2 Released Cognitive Items (distractor-construction example) — OECD PDF](https://www.oecd.org/content/dam/oecd/en/about/programmes/edu/piaac/released-items/cycle-2/PIAAC_CY2_Released_Cognitive_Items_EN.pdf)
- [Distractor Analysis for Test Items — Assessment Systems](https://assess.com/distractor-analysis-test-items/)
