# A1 Fluid Reasoning — Item Design Standards (ICAR-Style Battery)

**Project:** Student Psychometric Analysis — Test Battery item-authoring research
**Metric:** A1 Fluid Reasoning (Gf), measured via 4 item types: 3×3 figural matrix reasoning, number/letter series, verbal analogies, odd-one-out
**Population:** JEE/NEET aspirants, ages 16–19, India (academically selected, high-ability, English-medium but frequently ESL)
**Date:** 2026-07-13
**Feeds:** `app/tests/battery.json` Stage 1 ("Reasoning") — per `product/Test_Battery_Plan.md` §Stage 1: 16 scored items (6 matrix / 4 series / 3 analogy / 3 odd-one-out) + 6 spares, 6-option format, 45 s/item, difficulty ramp items 1–4 easy (p≈.8) → 5–12 medium (p≈.5) → 13–16 hard (p≈.25)

---

## 0. Scope note — why these 4 formats, and how they relate to "true" ICAR

ICAR's own original four item types (Condon & Revelle, 2014) are **Letter/Number Series, Matrix Reasoning, Verbal Reasoning, and Three-Dimensional Rotation**. This battery keeps the first two verbatim in spirit (matrix reasoning, number/letter series) but swaps out 3D Rotation and blends Verbal Reasoning into two sharper formats — **verbal analogies** and **odd-one-out (verbal classification)**. This is a deliberate, defensible substitution, not a drift from the standard:

1. **3D Rotation is dropped from A1** because this battery already dedicates a full stage and parameter (**C2 Spatial Ability**, Stage 5) to rotation/paper-folding. Reusing R3D-style items inside A1 would double-count spatial ability into two axes and contaminate the Gf measurement with spatial variance (Carroll, 1993, treats Gf and Gv as correlated-but-distinct strata).
2. **Verbal Reasoning is split into analogies + odd-one-out** because ICAR's own VR item type is explicitly a grab-bag — "a variety of logic, vocabulary and general knowledge questions" (Condon & Revelle, 2014, p. 54) — and ICAR's contributed/expanded pool separately lists "180 abstract reasoning items" and "180 verbal reasoning items" (ICAR Catalogue v1.0, §11). Analogies and classification (odd-one-out) are the two sub-formats from that broader family with the cleanest, most construct-pure relational-reasoning demand and the lowest general-knowledge/vocabulary loading — both important for a non-native-English-medium-but-English-fluent population where this product's explicit mandate is to measure the **meta-layer, not syllabus or crystallized-knowledge content** (`product/Metrics_Needed.md`: B1 Crystallized/Verbal Knowledge and B3 Prior STEM Knowledge are both out of scope).
3. Net effect: this battery's A1 stage samples fluid reasoning across **figural** (matrix), **quantitative/symbolic** (series), and **verbal-relational** (analogy, classification) domains — the same "content diversity, one underlying g" logic ICAR itself uses to justify sampling across item types rather than testing one format deeply.

**Public-domain / copyright ground rules used throughout this file** (see also `Test_Battery_Plan.md` §1.3): ICAR-published sample items are explicitly public domain and are quoted verbatim below, cited. **Raven's Progressive Matrices actual items are never reproduced** (they remain commercially copyrighted; this file never describes an actual published Raven's item, only the published *rule taxonomy* used to analyze them, which is scientific description, not the expressive content). Every worked example matrix/analogy/odd-one-out item below not explicitly cited to ICAR is **self-authored, ICAR-style, original to this document**.

---

## 1. ICAR — item types, public-domain status, reliability, sample items

### 1.1 What ICAR is and why it's public domain

The International Cognitive Ability Resource (ICAR) is a collaborative, non-proprietary item bank founded by David Condon and William Revelle (Northwestern University) to give researchers a **public-domain alternative to copyrighted ability tests** (Condon & Revelle, 2014). Its core argument: modern item-generation and large-N online calibration can maintain test validity without copyright-based security, because item *exposure* is controlled by having a large, growing, freely re-generable item pool rather than by legal restriction. All ICAR content is released for **non-commercial research/educational use**; the project explicitly asks users to keep sample items public to disincentivize wholesale copying, and to cite the originating papers.

### 1.2 The four original item types + the expanded family

| Item type | Format | N items (core set) | Source |
|---|---|---|---|
| Letter and Number Series (LN) | Short digit/letter sequence, pick next term, 6 options | 9 | Condon & Revelle (2014) |
| Matrix Reasoning (MR) | 3×3 array of geometric shapes, one missing, pick from 6 options | 11 | Condon & Revelle (2014) |
| Verbal Reasoning (VR) | Logic / vocabulary / general-knowledge questions, 4–6 options | 16 | Condon & Revelle (2014) |
| Three-Dimensional Rotation (R3D) | Cube renderings, pick the valid rotation, 6–8 options | 24 | Condon & Revelle (2014) |
| Progressive Matrices | Raven's-rule-style 3×3, **8 distractors** (9 options total) | 27 | Loe & Rust (2019) |
| Number Series (ANSIG) | Fill in 1–2 next numbers, free response, no option set | 48 | Loe (2017), `numGen` R package |
| Figural Analogies | 2×2 array, 4th shape missing, 8 options + "none correct" + "don't know" | 30 + 8 | Blum, Holling, Galibert & Forthmann (2016) |

Source: ICAR Catalogue v1.0 (icar-project.com/ICAR_Catalogue.pdf) and ICAR Contributor Guidelines PDF (icar-project.com/attachments/download/138/Guidelines.pdf).

**Design implication:** note the option-count is *not* fixed across the ICAR family — 6 options is the Condon & Revelle (2014) convention for MR/LN (chance = 16.7%), but the harder "Progressive Matrices" sub-family deliberately uses **8 distractors (9 options, chance = 11%)** precisely because more options widen the achievable difficulty ceiling for high-ability samples. This is directly relevant for a JEE/NEET-aspirant battery (see §6.2 on ceiling effects).

### 1.3 Reliability (α) and difficulty structure

From Condon & Revelle (2014), Study 1 (N = 96,958 online, SAPA-Project sampling):

| Scale | α | ω-hierarchical | ω-total | Items | Mean p (proportion correct) |
|---|---|---|---|---|---|
| ICAR60 (all 4 types) | **.93** | .61 | .94 | 60 | .53 (weighted) |
| ICAR16 (sample test) | **.81** | .66 | .83 | 16 | — |
| LN (Letter/Number Series) | .77 | .66 | .80 | 9 | .59 (sd .13) |
| MR (Matrix Reasoning) | .68 | .58 | .71 | 11 | .52 (sd .15) |
| VR (Verbal Reasoning) | .76 | .64 | .77 | 16 | .64 (sd .22) |
| R3D (3D Rotation) | .93 | .78 | .94 | 24 | .19 (sd .08) |

**Reading this for item authoring:** Matrix Reasoning is the *hardest item type to make internally consistent* (α = .68 on only 11 items) — Condon & Revelle explicitly attribute this to the 11 MR items not uniformly tapping one construct, i.e., some items load on incidental figural/perceptual factors rather than pure relational reasoning. **Practical rule: budget more matrix items than you think you need**, and pilot-check each one's item-total correlation before finalizing (this is why `Problem_Design_Spec.md` already flags "budget ≥12 if matrix-only"). Letter/Number Series and Verbal Reasoning reach acceptable α with far fewer items (9 and 16 respectively) because the underlying rule structure is more homogeneous.

Individual ICAR item p-values (proportion correct) range from **.24 (VR.13) to .96 (VR.18)** across the published 16/60-item stats pages (icar-project.org/types/{LN,MR,VR}/…stats.html) — useful real-world calibration anchors: an item with p ≈ .24 is a genuinely "hard" item at this test's level of difficulty; p ≈ .90+ is genuinely "easy"/floor.

### 1.4 Sample items — ICAR-published, public domain (quoted verbatim, cited)

These are reproduced directly from ICAR's own public catalogue and contributor guidelines, which explicitly exist to be shared:

> **Letter/Number Series** — "In the following alphanumeric series, what letter comes next? **I J L O S** (1) T (2) U (3) V (4) X (5) Y (6) Z"
> — *ICAR Catalogue v1.0*. Solved: I=9, J=10, L=12, O=15, S=19 (alphabet position); gaps 1, 2, 3, 4 (arithmetic progression of the *gap*) → next gap 5 → 19+5=24=**X**. Correct = **(4) X**.

> **Letter/Number Series** — "In the following alphanumeric series, what letter comes next? **V Q M J H**" Options: (1) E (2) F (3) G (4) H (5) I (6) J.
> — *ICAR Guidelines PDF*. Solved: V=22, Q=17, M=13, J=10, H=8; gaps −5, −4, −3, −2 (shrinking negative gap) → next gap −1 → 8−1=7=**G**. Correct = **(3) G** (confirmed in source).

> **Number Series (ANSIG)** — "In the following number sequence, what number comes next? **11 14 21 32 47**"
> — *ICAR Guidelines PDF*, Loe (2017). Solved: gaps 3, 7, 11, 15 (arithmetic progression of the gap, +4 each) → next gap 19 → 47+19=**66**. Correct = **66** (confirmed in source).

> **Verbal Reasoning** — "IF the day after tomorrow is two days before Thursday, then what day is it today?" Options: (1) Friday (2) Monday (3) Wednesday (4) Saturday (5) Tuesday (6) Sunday.
> — *ICAR Catalogue v1.0*. Solved: "two days before Thursday" = Tuesday; "day after tomorrow" = today+2 = Tuesday → today = **Sunday**. Correct = **(6) Sunday**.

> **Verbal Reasoning** — "Zach is taller than Matt and Richard is shorter than Zach. Which of the following statements would be most accurate?" Options: (1) Richard is taller than Matt (2) Richard is shorter than Matt (3) Richard is as tall as Matt (4) It's impossible to tell.
> — *ICAR Guidelines PDF*. Correct = **(4) It's impossible to tell** (confirmed in source) — a clean example of a **logic-only** item with zero vocabulary load and no single valid ordering (classic "insufficient premises" trap), exactly the fairness profile this battery wants for ESL-safe verbal items.

**Why these matter for this project:** they demonstrate that genuine ICAR items are (a) built from a small, explicit rule (arithmetic progression of gaps, shrinking gap, logical transitivity/indeterminacy), (b) use everyday, low-frequency-neutral vocabulary, and (c) are short. Self-authored items below imitate this profile.

### 1.5 ICAR5 and abbreviated forms — a pilot-size cautionary note

Kirkegaard (2016, OpenPsych) validated **ICAR5**, a 5-item abbreviation of ICAR16, on Danish 6th–10th graders (N=236). Two findings directly relevant to this project's age range (16–19) and its plan to build a "spare parallel form" (`Test_Battery_Plan.md` §1.3):
- The abbreviated test was **too difficult for the younger students (grades 6–7)** but appropriately calibrated for older ones — difficulty must be piloted against the *actual* target age, not assumed to transfer from adult ICAR norms.
- One item was **not discriminative** and had to be flagged for replacement — a reminder that even a published, pre-validated item can fail in a new sample; always re-check item-total correlations at pilot (this project's own plan already requires this, see `Test_Battery_Plan.md` §5).

---

## 2. Matrix reasoning (3×3 figural) — rule taxonomy, difficulty, distractors

### 2.1 The Carpenter, Just & Shell (1990) rule taxonomy

Carpenter, Just & Shell (1990, *Psychological Review*, 97, 404–431) is the foundational cognitive-process account of Raven's-style matrices (via verbal protocols, eye-tracking, and two computational models, FAIRAVEN and BETTERAVEN). They identified **five rule types** sufficient to generate essentially all Advanced Progressive Matrices Set II items, ordered here from lowest to highest cognitive demand:

| # | Rule | Definition | Cognitive demand |
|---|---|---|---|
| 1 | **Constant in a row** | An attribute is identical across all three cells in a row (but may differ row-to-row). | Lowest — pure pattern-matching, no transformation to compute. |
| 2 | **(Quantitative) pairwise progression** | An attribute changes by a constant increment between adjacent cells in a row (e.g., count +1, size grows). | Low-moderate — one arithmetic-like operation. |
| 3 | **Figure addition or subtraction** | The third cell's features = union (addition) or set-difference (subtraction/exclusion) of the first two cells' features. | Moderate — requires mental overlay/set operations. |
| 4 | **Distribution of three values** | Three distinct values of an attribute each appear exactly once per row *and* once per column (a Latin-square constraint). | High — must hold the whole row+column in mind to find the missing value by elimination. |
| 5 | **Distribution of two values** | A degenerate/special case of #4: two values occur across the three cells with one repeated (or one cell "null"). | High — same elimination logic, less redundant information to anchor on. |

Difficulty is driven by **(a) how many rules apply simultaneously** (each governs one attribute — shape, size, count, shading, orientation, position) **and (b) how many "rule tokens"** (repetitions of the same rule across attributes) the item requires — Carpenter et al. showed harder items need more rules *and* more tokens, and that distribution rules specifically are what separates high- from low-scoring solvers, because they cannot be solved by simple perceptual continuation and instead require explicit goal management in working memory. This finding has been replicated and extended by Verguts & De Boeck (2002), who confirmed the taxonomy and additionally showed solvers get *faster at inducing each rule type* across a test (practice/fluency effect) — worth remembering when setting per-item time limits (a flat 45 s deadline is slightly more generous for rule types encountered later in the block).

**Confirmatory cross-check:** modern automatic-item-generation (AIG) datasets built explicitly on Carpenter et al.'s taxonomy (PGM — Barrett et al., 2018; RAVEN — Zhang et al., 2019; I-RAVEN — Hu et al., 2021) converge on the same four/five rule labels, sometimes renamed: **Constant, Progression, Arithmetic (= figure addition/subtraction), Distribute-Three** (Li, 2025, arXiv:2510.03127, describing I-RAVEN precisely this way — "Distribute Three" subsuming "Distribute Two" as the null-value special case).

### 2.2 Perceptual organization — a difficulty knob independent of rule count

Two further factors, layered on top of rule count, change difficulty without changing the rule taxonomy:
- **Harmonic vs. non-harmonic organization** (Primi, 2001): harmonic items have visually congruent attribute changes that reinforce each other (e.g., shape gets bigger *and* darker together, so the eye "reads" one combined trend); non-harmonic items have attributes that visually compete (e.g., one attribute changes while an *irrelevant, unruled* attribute like rotation also varies randomly), forcing the solver to disentangle signal from noise. Non-harmonic items are reliably harder at equal rule-count.
- **Overlay / fusion / distortion** (Embretson, 1998; building on Carpenter et al., 1990, which did not model perceptual encoding): items where elements are perceptually overlaid or fused (so the solver must first *segment* the image before reasoning about it) add a perceptual-encoding cost on top of the relational-reasoning cost. Keep overlay/fusion items rare and reserve them for the hard tier only — they can inject construct-irrelevant variance (fine visual segmentation ability) if overused.

### 2.3 Distractor construction — what NOT to do, and what to do instead

This is the single most empirically-documented failure mode in matrix-reasoning item writing, so it gets its own subsection.

**The failure mode ("context-blind" / "star-graph" problem):** if every wrong option is built by perturbing *only the correct answer* (change one attribute of the right answer, five times, for five distractors), the correct answer becomes the option "most similar to all other options" — solvable by comparing options **to each other** without ever looking at the matrix. This is a documented, serious defect in the original RAVEN AI benchmark dataset (Zhang et al., 2019), which let models score 70–90%+ using only the answer set, with zero access to the problem matrix (Hu et al., 2021; Benny et al., 2021). Human test-takers exploit the identical shortcut (this is the classic "Repetition" error/solving-strategy documented in the human Raven's literature). **Never build a 6-option set this way.**

**What to do instead — three validated recipes:**

1. **Sandia Matrix Generator recipe** (Matzen et al., 2010 — the highest-fidelity SPM-replication generator published): build each distractor from *one* of six templates, not all from the correct answer: (a) an entry that already appears elsewhere in the matrix, (b) a random transformation of a matrix entry, (c) a random transformation of the correct answer, (d) a random transformation of an *incorrect* answer, (e) a novel combination of features sampled from the matrix, (f) a novel combination of features that never appeared in the matrix. Mixing templates (a)–(f) across the 5 distractors prevents any single "distance from the key" heuristic from working.
2. **IMak factorial recipe** (Blum & Holling, 2018): for a 1-rule item, sample 4 distinct values of the ruled attribute (including the correct one) crossed with 2 values of one *other*, unruled attribute → 4×2 = 8 combinations as the option set (adapt to 6 for this battery's option count: sample 3 ruled values × 2 unruled values = 6, keeping exactly one combination correct). This guarantees every distractor is a "legal-looking" attribute combination, not an arbitrary scramble.
3. **Balanced-graph / Attribute-Bisection-Tree recipe** (I-RAVEN, Hu et al., 2021): explicitly design the answer set so that pairwise "differs by k attributes" distances are **even across all six options**, not concentrated around the correct answer. In practice for a 6-option hand-authored item: pick 2 near-miss distractors (differ from the key by exactly one attribute — the item's actual rule, violated), 2 mid-distance distractors (differ by one attribute unrelated to the rule, or by a plausible-but-wrong rule application), and 1–2 far distractors (differ by 2+ attributes, there mainly to anchor chance-level guessers, not to be genuinely tempting).

**General multiple-choice hygiene** (Haladyna, Downing & Rodriguez, 2002 — applies to every item type in this file, not just matrices): avoid absurd/implausible options (they don't function as distractors and just inflate apparent difficulty for nothing); make every distractor "typical-error plausible"; avoid any distractor that a test-taker could eliminate on formatting/length/position grounds alone.

### 2.4 Difficulty knobs — summary

| Knob | Easy | Medium | Hard |
|---|---|---|---|
| # rules (attributes governed) | 1 | 2–3 | 3–4 |
| Rule types used | Constant-in-row, simple progression | + figure add/subtract, distribution-of-three | + distribution-of-two, multiple simultaneous distribution rules |
| Perceptual organization | Harmonic | Harmonic | Non-harmonic (irrelevant distracting attribute present) |
| Distractor distance | Some near-miss + some far (chance anchors) | Balanced near/mid/far | Mostly near-miss, balanced graph (no single "most similar" option) |
| Options | 6 | 6 | 6 (ICAR's own hardest sub-family, "Progressive Matrices," goes to 8–9 options for exactly this reason — consider 8 for your hardest 1–2 items if ceiling effects appear at pilot) |

### 2.5 Worked example items (self-authored, ICAR/Carpenter-style; grids given as attribute tables — directly usable as a spec for SVG/asset generation)

Each item: 3×3 grid (bottom-right cell = "?"), the rule(s), correct answer, difficulty rationale, and distractor notes. Shapes used: circle ●, square ■, triangle ▲, pentagon ⬠, hexagon ⬡.

**M1 — Tier: Easy (practice-quality). Est. p ≈ .95. Rules: 1 (constant-in-row: shape).**

| | Col 1 | Col 2 | Col 3 |
|---|---|---|---|
| Row 1 | ● | ● | ● |
| Row 2 | ■ | ■ | ■ |
| Row 3 | ▲ | ▲ | **?** |

Correct: ▲. Only one attribute (shape) varies, and it is held constant within each row — the target row is already 2/3 visible. Distractors: ● and ■ (repeats of rows 1–2 — flagged here as the "repetition" anti-pattern; acceptable *only* because this is a true warm-up item), ⬠, ⬡, and a rotated ▲ (tests whether the solver wrongly treats orientation as ruled, when it isn't).

**M2 — Tier: Easy. Est. p ≈ .85. Rules: 1 (pairwise progression: count).**

| | Col 1 | Col 2 | Col 3 |
|---|---|---|---|
| Row 1 | ● | ●● | ●●● |
| Row 2 | ●●●● | ●●●●● | ●●●●●● |
| Row 3 | ●●●●●●● | ●●●●●●●● | **?** |

Correct: ●●●●●●●●● (9 circles). Shape is constant matrix-wide (not ruled — a deliberate design choice to isolate exactly one rule); count increases by 1 left-to-right, continuing row-to-row (7,8,→9). Distractors: 10 circles (over-shoots the row-wise pattern, tempting if solver mis-tracks the running count instead of the within-row +1), 8 circles (repeat of the cell to its left), a set of 9 squares (right count, wrong shape — tests whether solver is actually tracking the ruled attribute), 6 and 11 circles as far anchors.

**M3 — Tier: Easy–Medium. Est. p ≈ .70. Rules: 2 (constant-in-row: shape; progression: size).**

| | Col 1 | Col 2 | Col 3 |
|---|---|---|---|
| Row 1 | ▲ small | ▲ medium | ▲ large |
| Row 2 | ⬠ small | ⬠ medium | ⬠ large |
| Row 3 | ⬡ small | ⬡ medium | **?** |

Correct: ⬡ large. Two co-occurring rules on two independent attributes (shape held per row; size grows across each row) — the minimum realistic combination, since almost any two-attribute figural grid invokes at least this much. Distractors: ⬡ medium (repeat, ignores the progression), ⬠ large (right size, wrong shape), ▲ large (wrong shape, from a different row), ⬡ small, and a ⬡ extra-large (over-shoots the progression step size — tests precision, not just direction).

**M4 — Tier: Medium. Est. p ≈ .60. Rules: 2 (distribution-of-three: shape; constant-in-row: shading).**

| | Col 1 | Col 2 | Col 3 |
|---|---|---|---|
| Row 1 | ● outline | ■ outline | ▲ outline |
| Row 2 | ▲ solid | ● solid | ■ solid |
| Row 3 | ■ hatched | ▲ hatched | **?** |

Correct: ● hatched. Shape follows a Latin-square (distribution-of-three): each of {●, ■, ▲} appears exactly once per row and once per column; shading is constant-in-row. Solving requires scanning the *column* (col 3 already has ▲, ■ → missing ●), not just the row — this is what pushes distribution rules above progression rules in difficulty (Carpenter et al.'s central finding). Distractors: ▲ hatched and ■ hatched (repeat shapes already in row 3 — legitimate near-miss distractors here, since they test exactly the row/column-elimination logic, not a repetition shortcut, because they are genuinely plausible completions of the row alone), ● outline / ● solid (right shape, wrong shading — tests whether solver tracks both rules independently), ⬠ hatched (a shape outside the ruled set entirely — a far anchor).

**M5 — Tier: Medium. Est. p ≈ .55. Rules: 2 (figure subtraction: inner mark; constant-in-row: outer shape).**

| | Col 1 | Col 2 | Col 3 |
|---|---|---|---|
| Row 1 | ■ with ✕ and ／ | ■ with ✕ | ■ with ／ (✕ removed) |
| Row 2 | ⬠ with ●● and ▲ | ⬠ with ●● | ⬠ with ▲ (●● removed) |
| Row 3 | ⬡ with ★ and ♦ | ⬡ with ★ | **?** |

Correct: ⬡ with ♦ (★ removed). Column 3 = column 1 **minus** column 2 (figure subtraction/exclusion: whatever mark is common to columns 1 and 2 is removed, leaving only the remainder). Distractors: ⬡ with ★ (kept the wrong element — the "figure addition" misread, i.e., solver unions instead of subtracts), ⬡ with both ★ and ♦ (did nothing — no operation applied), ⬡ empty (over-subtracted, removed everything), ■ or ⬠ with ♦ (right inner mark, wrong outer shape).

**M6 — Tier: Medium–Hard. Est. p ≈ .45. Rules: 3 (progression: number of shape-sides; distribution-of-three: shading; constant-in-row: size).**

| | Col 1 | Col 2 | Col 3 |
|---|---|---|---|
| Row 1 | ▲ outline (large) | ⬠ half-filled (large) | ⬡ solid (large) |
| Row 2 | ⬠ solid (medium) | ⬡ outline (medium) | ▲ half-filled (medium) |
| Row 3 | ⬡ half-filled (small) | ▲ solid (small) | **?** |

Correct: ⬠ outline (small). Sides-count progresses 3→5→6 reading each row left to right if you track the *shape family*, but here the shape identity itself is what's under the distribution rule (each of ▲/⬠/⬡ appears once per row and once per column — same logic as M4, but now layered with a second distribution rule on shading, plus size held constant-in-row). This is a genuine 3-rule item and needs deliberate row+column cross-checking on two independent attributes simultaneously — a real working-memory load increase over M4/M5.

**M7 — Tier: Hard. Est. p ≈ .35. Rules: 2 ruled + 1 distracting (non-harmonic organization).**

Same shape/count logic as M2 (progression: count of ● increases 1→2→3 per row, resetting each row; distribution-of-two: fill state alternates solid/outline across columns with one column repeated) **plus** every cell is independently rotated at a random angle (0°/15°/40°/70°, no pattern) purely as visual noise. Correct answer follows the count+fill rules exactly; rotation is irrelevant. This tests whether the solver can correctly identify *which* attributes are ruled versus decorative — the essence of Primi's (2001) harmonic/non-harmonic distinction, and a good, cheap way to manufacture a hard item without adding a genuinely new rule (i.e., it raises difficulty through perceptual disentanglement cost, not relational complexity — use sparingly and knowingly).

**M8 — Tier: Hard. Est. p ≈ .22. Rules: 4 (constant-in-row: outer shape; progression: inner dot count; distribution-of-three: inner shape; distribution-of-two: border style solid/dashed).**

A full four-rule item, one rule per attribute, matching Carpenter et al.'s description of their hardest Set-II-equivalent items (this is deliberately at the level of the battery's item 13–16 "hard" tier, p≈.25 target). Because four independent attributes must each be tracked across the row **and**, for the two distribution rules, cross-checked against the column, this item requires holding much more in working memory simultaneously than M1–M6 — exactly the "goal management" bottleneck Carpenter et al. identify as what separates high scorers from low scorers. Distractor set built with the Sandia six-template recipe (§2.3): one option repeats a matrix entry outright, one is a random transform of the key, one is a random transform of a wrong matrix entry, one is a novel-but-plausible combination, two are near-miss (each violates exactly one of the four rules).

**M9 — Tier: Hard (ceiling item for high-Gf test-takers). Est. p ≈ .18. Rules: 4 combined with figure addition.**

As M8, but Column 3 additionally = Column 1 **∪** Column 2 on the inner-mark attribute (figure addition layered onto the distribution rules governing shape/border). This is intentionally the hardest item in the bank — reserved for the 13–16 "hard tier" slot specifically to guard against ceiling effects in a highly selected population (see §6.2); expect p in the .15–.25 range even among strong JEE Advanced-caliber solvers.

### 2.6 Copyright note

None of M1–M9 reproduces any published Raven's, ICAR Progressive-Matrices, or other proprietary item — they are original constructions following the **published, citable rule taxonomy** (Carpenter, Just & Shell, 1990) and **published, citable distractor-construction methods** (Matzen et al., 2010; Blum & Holling, 2018; Hu et al., 2021). This is the same relationship every academic AIG paper in this literature has to the original Raven's test: the rules are scientific/mathematical description (not copyrightable), the specific images in the actual commercial test are (and are never described here beyond citing that they exist).

---

## 3. Number / letter series — design, difficulty knobs, worked examples

### 3.1 Cognitive model

Series-completion is modeled (Simon & Kotovsky, 1963; Kotovsky & Simon, 1973; extended to numbers by Holzman, Pellegrino & Glaser, 1983) as four sequential sub-processes: **(1) relation detection** (hypothesize a relation between adjacent terms), **(2) discovery of periodicity** (is this one series or several interleaved ones?), **(3) pattern description** (state the rule compactly enough to hold in working memory), **(4) extrapolation** (apply the rule to generate the missing term). Item difficulty is a function of how much each stage costs — this is the direct analogue of Carpenter et al.'s rule-taxonomy for matrices, translated into the numeric/symbolic domain.

### 3.2 The four empirically-validated stimulus features (Arendasy & Sommer, 2012, as reported in Sun, Liu & Luo, 2019)

| Feature | Definition | Effect on difficulty |
|---|---|---|
| **Periodicity** | Number of independent interleaved sub-series the item actually contains (1 = simple series; 2 = alternating/interleaved). | Higher periodicity sharply raises difficulty — periodicity must be *discovered* before any rule can be applied. |
| **Rule span** | Number of elements a single rule links together (adjacent-pair vs. requiring 3 elements, as in Fibonacci-style addition). | Wider span = more working memory held per inference step. |
| **Number of rules** | How many distinct rules must be inferred (e.g., a first-order rule plus a second-order rule on the differences). | Directly analogous to matrix "# rules"; each additional rule roughly doubles relational load. |
| **Rule complexity** | The category of arithmetic operation involved (addition/subtraction easiest; multiplication/division harder; combined two-step operations hardest). | Higher-complexity operation categories cost more even at equal rule count. |

### 3.3 Empirical difficulty findings (Sun, Liu & Luo, 2019, *Frontiers in Psychology*, 10:884 — Rasch-calibrated, N=466 Chinese secondary/university students)

- **Two-step (second-order) items are dramatically harder than one-step items**: average Rasch difficulty **+1.28 logits** vs. **−0.70 logits**, t(83) = −6.29, p < .001. This is the single strongest, most directly reusable difficulty lever for this project — *whether the item requires computing a "series of the differences" before extrapolating* is close to a binary switch between "medium" and "hard" tier.
- **Number-element type interacts with operation type**: integers are easiest; **fractions make arithmetic (additive) sequences harder but make geometric (multiplicative) sequences easier** (because fractions multiply by simple numerator/denominator multiplication but must be common-denominated to add) — a genuinely counter-intuitive, citable finding worth encoding directly into item authoring (don't assume "fractions = uniformly harder").
- Reliability of the resulting 92-item Rasch-scaled bank: separation reliability .98, EAP/PV reliability .87 — confirms number series can reach strong reliability with well-structured item models.
- Construct validity: correlation with 5 Raven's SPM items, corrected for attenuation, **r = .70** — number series and figural matrices measure highly overlapping (not identical) reasoning variance, supporting using both in one Gf composite.
- **High-ability-population caution, directly citable and directly relevant to JEE/NEET**: the same paper notes that when the Wechsler scales were adapted for China, "the most difficult items were considered only moderately difficult" for the target population and harder items had to be custom-built (Zhang, 2009, cited in Sun et al., 2019) — this is the number-series-specific version of the ceiling-effect problem this project must design against for a competitive-exam-selected cohort (see §6.2).

### 3.4 Sun, Liu & Luo's (2019) 18 item models — directly reusable formula/example table (facts, not copyrighted expression)

**One-step models (easier, average difficulty ≈ −0.70 logits):**

| Type | Operation | Formula | Example |
|---|---|---|---|
| Integer | Arithmetic | aₙ₊₁ = aₙ + k | 3, 6, 9, 12, 15 |
| Integer | Geometric | aₙ₊₁ = aₙ × k | 3, 6, 12, 24, 48 |
| Integer | Addition (Fibonacci-type) | aₙ₊₂ = aₙ₊₁ + aₙ | 3, 3, 6, 9, 15 |
| Integer | Multiplication (recursive) | aₙ₊₂ = aₙ₊₁ × aₙ | 3, 3, 9, 27, 243 |
| Fraction | Arithmetic / Geometric / Addition / Multiplication | (as above, fractional terms) | e.g. ½, 1, 3⁄2, 2, 5⁄2 |

**Two-step models (harder, average difficulty ≈ +1.28 logits — compute a derivative series of gaps/ratios first):**

| Step 1 | Step 2 | Formula | Example |
|---|---|---|---|
| Arithmetic | Arithmetic | aₙ₊₁=aₙ+bₙ, bₙ₊₁=bₙ+k | 3, 4, 7, 12, 19 |
| Arithmetic | Geometric | aₙ₊₁=aₙ+bₙ, bₙ₊₁=bₙ×k | 2, 3, 5, 9, 17 |
| Geometric | Arithmetic | aₙ₊₁=aₙ×bₙ, bₙ₊₁=bₙ+k | 1, 2, 8, 48, 384 |

(Full 18-model table in source paper; reproduced here in abbreviated form as it is mathematical/scientific fact, not expressive content.)

### 3.5 Difficulty knobs — summary, mapped to this battery's 3-tier ramp

| Knob | Easy (p≈.8, items 1–4-equivalent) | Medium (p≈.5) | Hard (p≈.25) |
|---|---|---|---|
| Periodicity | 1 (simple series) | 1 | 2 (alternating/interleaved) |
| Rule span | Adjacent pair | Adjacent pair or Fibonacci-span-3 | Span-3 or second-order |
| Number of rules | 1 | 1, or 2 with an obvious cue | 2 (first-order + second-order) |
| Rule complexity | Addition/subtraction, integers, constant gap ≤ 5 | Multiplication, or subtraction with negative direction | Two-step arithmetic-on-arithmetic, multiplicative-recursive, or interleaved |
| Number domain | Small integers | Small integers or simple fractions | Larger integers, or fractions in the arithmetic-sequence family specifically (per §3.3 interaction finding) |

### 3.6 Worked example items (12 total — 3 ICAR-published/cited, 9 self-authored)

Each item gives: sequence, correct next term, mechanism, tier, est. p, and distractor rationale.

1. **[ICAR, public domain]** I J L O S → **X**. Letter positions 9,10,12,15,19; gap progression 1,2,3,4→5. Tier: **Medium** (letter-position translation adds a step vs. pure digits). Distractors: T (off-by-one gap error), V (miscounted alphabet by one), Y/Z (over-shoot).
2. **[ICAR, public domain]** V Q M J H → **G**. Backward alphabet, shrinking negative gap −5,−4,−3,−2→−1. Tier: **Hard** (backward direction + shrinking-magnitude gap is a double twist). Distractors: F (gap −2 repeated instead of shrinking to −1), H (repeated previous term), E (over-shrunk gap).
3. **[ICAR/ANSIG, public domain]** 11 14 21 32 47 → **66**. Second-order arithmetic: gaps 3,7,11,15 (rising by +4). Tier: **Hard**. Distractors: 62 (extended the last gap +15 instead of +19), 64, 70 (over/under-shoot on the second-order step).
4. **[Self-authored]** 4, 9, 14, 19, 24 → **29**. Simple arithmetic, +5. Tier: **Easy**, est. p ≈ .85. Distractors: 27, 28, 30 (near misses on the constant).
5. **[Self-authored]** 2, 6, 18, 54, 162 → **486**. Geometric ×3. Tier: **Easy–Medium**, est. p ≈ .75. Distractors: 324 (×2 instead of ×3 — a plausible wrong-ratio error), 432, 648.
6. **[Self-authored]** 2, 3, 5, 8, 13 → **21**. Classic Fibonacci-type addition (aₙ₊₂=aₙ₊₁+aₙ), rule-span-3. Tier: **Medium**, est. p ≈ .55. Distractors: 18 (added the two wrong terms), 20, 22.
7. **[Self-authored]** 1, 2, 2, 4, 8 → **32**. Multiplication-recursive (aₙ₊₂=aₙ₊₁×aₙ). Tier: **Hard**, est. p ≈ .30 (multiplicative-recursive rules are the least-practiced series type for this population). Distractors: 16 (treated it as simple ×2 geometric, ignoring the recursive rule), 10 (added instead of multiplied), 64.
8. **[Self-authored]** 5, 6, 9, 14, 21 → **30**. Second-order/quadratic: gaps 1,3,5,7 (arithmetic progression of gaps, +2 each). Tier: **Medium–Hard**, est. p ≈ .40. Distractors: 28 (extended gap by +7 instead of +9), 29, 32.
9. **[Self-authored]** 3, 20, 6, 17, 9, 14, 12 → **11**. Alternating/interleaved: odd positions 3,6,9,12 (+3); even positions 20,17,14 (−3). Tier: **Hard**, est. p ≈ .28 — periodicity itself must be discovered first (Holzman et al.'s "discovery of periodicity" stage is the actual bottleneck, not the arithmetic). Distractors: 15 (continued the +3 sub-series instead of switching sub-series — the single most diagnostic "didn't notice interleaving" error), 9, 8.
10. **[Self-authored]** B, D, G, K, P → **V**. Letter series via increasing alphabet-position gap: 2,4,7,11,16; gaps 2,3,4,5→6; 16+6=22=V. Tier: **Medium**, est. p ≈ .50. Distractors: U (off-by-one), T, W.
11. **[Self-authored]** 1/4, 1/2, 3/4, 1, 5/4 → **3/2**. Fractional arithmetic, +1/4. Tier: **Medium**, est. p ≈ .45 (per Sun et al.'s finding, fractions raise difficulty specifically for arithmetic/additive sequences). Distractors: 4/3 (common fraction-arithmetic slip), 5/4 (repeat), 7/4 (added 1/2 instead of 1/4).
12. **[Self-authored]** 2, 5, 11, 23, 47 → **95**. Recursive linear transform aₙ₊₁=2aₙ+1 (equivalently, gaps double: 3,6,12,24→48). Tier: **Hard**, est. p ≈ .22. Distractors: **94** (the most important distractor here — the answer a solver gets by naively extending the gap *additively* by the last increment, 47+24=71, or by mis-doubling; author the exact wrong-strategy number empirically once a working item-writer/calculator is on hand, and always include the "partial-rule" answer as a distractor, per Haladyna et al.'s "use typical errors" principle), 93, 96.

### 3.7 Distractor guidelines specific to series

- The single best distractor is **the number a solver gets by applying only *part* of the rule** (e.g., extrapolating the first-order gap without noticing a second-order trend; continuing one sub-series through an interleaved item). This is far more diagnostic than random noise numbers, and directly operationalizes Haladyna et al.'s (2002) "base distractors on real error patterns" guideline.
- Always include one distractor that is an **off-by-one / off-by-a-small-constant** error on the correct arithmetic (catches careless-but-competent solvers, useful signal for this project's separate D1 Executive-Function/inhibition axis, since Stage 8 already screens for this — series items should not be *designed* to double as D1 probes, but shouldn't be surprised when they correlate).
- Never use a distractor number that requires a *different* number of digits or an implausible magnitude jump — that becomes eliminable by inspection alone, not by solving.

### 3.8 Copyright note

Items 1–3 are ICAR-published public-domain sample items, quoted and cited. Items 4–12 and the item-model formulas in §3.4 are either self-authored or are mathematical facts (arithmetic/geometric/Fibonacci/recursive sequence structures are centuries-old public mathematics, not copyrightable expression) reported from a peer-reviewed, openly-cited source (Sun, Liu & Luo, 2019, Frontiers in Psychology — fully open-access).

---

## 4. Verbal analogies — relation taxonomy, ESL-safe design, distractors, worked examples

### 4.1 Why analogies measure fluid reasoning (not vocabulary)

Sternberg's (1977) componential theory decomposes A:B::C:D solving into discrete performance components — **encode** (perceive the terms), **infer** (deduce the A:B relation), **map** (check the relation transfers to the C-term's domain), **apply** (project the relation from C to find/select D), **compare/justify**, **respond**. The reasoning-relevant work is entirely in *infer/map/apply* — vocabulary only matters for *encode*. **This means item difficulty should be engineered through relation abstractness (infer/map/apply), not through rarer words** — a critical design principle for this population, where vocabulary difficulty is a pure confound (construct-irrelevant variance), not a feature.

### 4.2 Relation taxonomy

The most commonly used practical taxonomy (drawn from the Miller Analogies Test category structure, a long-standing commercial format; **the taxonomy/category-labels are descriptive facts about relation-types in general use, not reproductions of any copyrighted MAT item**) groups relations into four families:

| Family | Sub-types | Example relation (generic) |
|---|---|---|
| **Semantic** | synonym, antonym, degree/intensity | warm : hot |
| **Classification** | category/class-membership, part-whole, whole-part | mango : fruit; page : book |
| **Association / functional** | function/use, agent-tool, cause-effect, creator-creation | carpenter : saw |
| **Logical/mathematical** | negation/absence, sequence/order | blind : sight (absence of a faculty) |

**Design rule for this project specifically:** stay inside **Classification** and **Association/functional** and simple **Semantic** relations built from *concrete, high-frequency, culturally-neutral* nouns. Avoid two traps this population is especially prone to tempt item-writers into:
1. **Never build the relation out of JEE/NEET syllabus content** (e.g., "mitochondria : cell :: nucleus : atom") — that measures crystallized STEM knowledge (B3), which is explicitly out of scope for this product (`Metrics_Needed.md`: "Subject-topic mastery is deliberately out of scope"). A student who studies more biology should not score higher on a *fluid reasoning* item.
2. **Never rely on idiom, culture-specific reference, or low-frequency/literary vocabulary** — ESL-fairness research is explicit that vocabulary gaps are a textbook example of *construct-irrelevant variance*: a fair item should not require word-knowledge that is incidental to the ability being measured (this is a direct, general finding in language-testing fairness literature, applied here to a non-native-English-medium-but-fluent test-taking population).

### 4.3 Worked example items (10, self-authored, ICAR/MAT-style; simple vocabulary throughout)

1. **KEY : LOCK :: PEN : ?** (a) PAPER (b) INK (c) WRITE (d) PENCIL. Relation: instrument : the thing it operates on. Correct: **PAPER**. Tier: **Easy**, est. p ≈ .85. Distractors: INK (part-of-pen confusion), WRITE (wrong part of speech/role — an action, not an object), PENCIL (same-category co-hyponym lure — tests whether solver is matching *relation* or just *topic*).
2. **MANGO : FRUIT :: CARROT : ?** (a) VEGETABLE (b) ORANGE (c) FARM (d) SALAD. Relation: item : category. Correct: **VEGETABLE**. Tier: **Easy**, est. p ≈ .80. Distractors: ORANGE (a fruit itself — category-confusion), FARM (associative, not categorical), SALAD (co-occurrence, not category).
3. **PAGE : BOOK :: PETAL : ?** (a) FLOWER (b) GARDEN (c) STEM (d) COLOR. Relation: part : whole. Correct: **FLOWER**. Tier: **Easy–Medium**, est. p ≈ .75. Distractors: GARDEN (whole-of-whole overreach), STEM (sibling-part trap, not the whole), COLOR (an attribute, not an object).
4. **CARPENTER : SAW :: TAILOR : ?** (a) NEEDLE (b) CLOTH (c) SHIRT (d) SHOP. Relation: worker : characteristic tool. Correct: **NEEDLE**. Tier: **Medium**, est. p ≈ .55. Distractors: CLOTH (raw material, not tool), SHIRT (product, not tool), SHOP (workplace association).
5. **SPARK : FIRE :: SEED : ?** (a) PLANT (b) SOIL (c) FRUIT (d) ROOT. Relation: small trigger : the larger thing it becomes. Correct: **PLANT**. Tier: **Medium**, est. p ≈ .50. Distractors: FRUIT is a deliberately strong distractor (a plausible "downstream" answer — pilot-check this item specifically for a double-key risk, since some solvers may reasonably argue seed→fruit; if pilot data shows FRUIT pulling too many responses, replace with a cleaner option), SOIL (context, not result), ROOT (part, not whole result).
6. **WARM : HOT :: COOL : ?** (a) COLD (b) ICE (c) WINTER (d) MILD. Relation: degree/intensification. Correct: **COLD**. Tier: **Medium**, est. p ≈ .50. Distractors: ICE (concrete instance, not the adjective — part-of-speech trap), WINTER (associated season), MILD (near-synonym of the *stem* word, wrong direction).
7. **SCARCE : ABUNDANT :: TIMID : ?** (a) BOLD (b) SHY (c) QUIET (d) WEAK. Relation: antonym pair (relation-between-relations — a step up in abstraction). Correct: **BOLD**. Tier: **Medium–Hard**, est. p ≈ .40. Distractors: SHY (near-synonym of the stem, not its opposite), QUIET (loosely associated trait), WEAK (plausible but not the precise antonym). *Vocabulary ceiling note: "scarce/abundant/timid" sit at the upper acceptable frequency band for this battery — do not go further into literary/rare vocabulary than this.*
8. **BLIND : SIGHT :: DEAF : ?** (a) HEARING (b) SOUND (c) SILENCE (d) EAR. Relation: condition : the faculty/sense that is absent. Correct: **HEARING**. Tier: **Hard**, est. p ≈ .30. Distractors: SOUND (the stimulus, not the faculty), SILENCE (the absence-state itself, tempting but the wrong role), EAR (organ vs. faculty confusion — a good precise-thinking distractor).
9. **AUTHOR : CHAPTER :: ARCHITECT : ?** (a) BLUEPRINT (b) BUILDING (c) ROOM (d) BRICK. Relation: creator's-whole-work : a-subdivision-of-that-whole (chapter is part of the book the author creates; parallel = a subdivision of the building the architect creates). Correct: **ROOM**. Tier: **Hard**, est. p ≈ .22. Distractors: BLUEPRINT (the single best distractor in this set — tempting because it's the architect's direct output, but it's at the wrong *level*: chapter is a part of the finished creation, not the planning artifact — tests precise relation-mapping, Sternberg's "map" step, not just topical association), BUILDING (the whole itself, level-confusion), BRICK (too fine-grained, wrong grain-size).
10. **HOT : COLD :: UP : ?** (a) DOWN (b) SIDE (c) TOP (d) FAST. Relation: simple canonical antonym. Correct: **DOWN**. Tier: **Easy** (practice/anchor item), est. p ≈ .90.

### 4.4 Distractor guidelines

- Build each wrong option from a **different, named failure mode**: same-category-not-same-relation (item 1, 2), part-of-part instead of part-of-whole (item 3), wrong part of speech/grammatical role (item 1, 6), plausible-but-wrong "grain size" (item 9), near-synonym-of-the-stem instead of true relation match (item 6, 7). Naming the failure mode for every distractor, at authoring time, is what prevents "random plausible word" distractors that don't actually diagnose anything.
- Always run at least one item past a second author asking "could a defensible case be made for a different option?" before finalizing (item 5 above is flagged exactly for this reason) — analogies are the item type most prone to legitimate double-keys because natural-language relations are rarely perfectly unique.

### 4.5 Copyright note

All 10 items are self-authored. The 4-family relation taxonomy (semantic/classification/association/logical) is a widely-used descriptive framework for categorizing analogy relation-types in general (as used to teach and structure the Miller Analogies Test, ETS Kit of Factor-Referenced Cognitive Tests, and similar formats); no actual MAT, SAT, or ETS item content is reproduced or paraphrased anywhere in this document.

---

## 5. Odd-one-out (verbal classification) — design, typicality, distractors, worked examples

### 5.1 What the format measures and the classification dimensions

Odd-one-out (classification) items measure deductive/inductive reasoning by requiring the solver to find the shared property among *n*−1 items and identify the one item that lacks it. Items are typically built along one of three dimensions, in increasing order of typical difficulty:
1. **Semantic category** (all-but-one belong to an obvious noun category — animals, furniture, fruit).
2. **Function/purpose** (all-but-one share a use, even when surface category is mixed or, harder, when surface category is identical for all five and only *function* differs).
3. **Physical/structural or abstract property** (a shared attribute finer-grained than category — a property some category-members happen not to have).

### 5.2 Typicality and category structure (Rosch & Mervis, 1975)

Rosch & Mervis's prototype theory establishes that category membership is graded: the most *typical* members of a category share the most features with other members and the fewest features with contrasting categories; atypical members are correctly-categorized but property-poor relative to the prototype. This has a direct, practical item-design consequence: **the four "in-category" items should be drawn from typical/prototypical members** (so the shared property is unambiguous and salient), while **the odd-one-out should be an atypical member of the correct category, or a typical member of a different category** — either design cleanly manipulates difficulty, but conflating the two within one item set risks a double-key (see M6/O6 pitfall below).

### 5.3 The central pitfall: multiple valid "odd ones"

Because natural categories overlap on many dimensions at once, the most common authoring failure is an item where **more than one option can be defended as "the odd one"** depending on which shared property the solver happens to notice first. This is the classification-format analogue of the matrix "context-blind" problem (§2.3) and the analogy "double-key" problem (§4.4) — it is the single most important thing to pilot-check before finalizing any odd-one-out item.

### 5.4 Worked example items (10, self-authored)

1. **APPLE, MANGO, POTATO, BANANA, GRAPE.** Odd: **POTATO** (vegetable among fruits). Tier: **Easy**, est. p ≈ .90. All four "in" items are prototypical fruits (Rosch-typical); unambiguous.
2. **CHAIR, TABLE, SOFA, SPOON, BED.** Odd: **SPOON** (utensil among furniture). Tier: **Easy**, est. p ≈ .85.
3. **KNIFE, SCISSORS, SAW, AXE, SPOON.** Odd: **SPOON** (function dimension: all others cut/have a blade; category alone — "all are tools/utensils" — would not isolate an odd one, forcing the solver onto the *function* dimension). Tier: **Easy–Medium**, est. p ≈ .75.
4. **SPARROW, EAGLE, PENGUIN, CROW, PIGEON.** Odd: **PENGUIN** (all five share the surface category "bird" — category alone gives no odd one — the shared property that isolates one is a finer-grained functional property, flight; PENGUIN is a correctly-categorized but atypical/property-poor bird in Rosch's sense). Tier: **Medium**, est. p ≈ .55. This item is a good template for "medium" difficulty precisely because it forces solvers past the first (category) hypothesis to a second (functional-property) hypothesis.
5. **9, 16, 25, 27, 36.** Odd: **27** (all others are perfect squares; 27 is a perfect cube, 3³). Tier: **Medium**, est. p ≈ .50. Numeric/abstract variant — zero vocabulary load, good for ESL-safety, but flagged: this variant taps quantitative/numeric classification and risks overlapping with this battery's separate **C1 Number Sense** parameter; use sparingly (1 item max) in the A1 bank to avoid cross-parameter construct contamination.
6. **WHEEL, PEDAL, HANDLEBAR, SADDLE, STEERING WHEEL.** Odd: **STEERING WHEEL** (all others are bicycle parts; steering wheel is a car part). Tier: **Medium**, est. p ≈ .45. *Authoring lesson, kept deliberately visible*: an earlier draft of this item used ENGINE instead of PEDAL — rejected at design time because e-bikes/motorbikes have engines, creating a real double-key risk (a solver could argue ENGINE is the odd one on different, equally valid grounds). Always ask "is there a second defensible odd-one?" before finalizing — this is the concrete version of the §5.3 pitfall.
7. **DOCTOR, TEACHER, ENGINEER, PATIENT, LAWYER.** Odd: **PATIENT** (all others are professionals who serve others in that role; PATIENT is a service-recipient, not a service-provider — a relation/role-based classification, not a surface-topic one, since all five words are equally "people found in institutions"). Tier: **Hard**, est. p ≈ .35.
8. **DRIZZLE, DOWNPOUR, SHOWER, SPRINKLE, MIST.** Odd: **DOWNPOUR** (all others denote light-to-moderate rain; downpour is the intensity outlier — a degree/scale classification, the classification-format analogue of matrix "quantitative progression"). Tier: **Hard**, est. p ≈ .30.
9. **8, 27, 64, 100, 125.** Odd: **100** (all others are perfect cubes — 2³, 3³, 4³, 5³; 100 = 10² is not a cube). Tier: **Hard**, est. p ≈ .25. Same C1-overlap caution as item 5 — use at most one numeric odd-one-out item per form, and only in the hard tier where it's earning its keep as a genuine "resist the first pattern" item.
10. **RED, BLUE, HAPPY, GREEN, YELLOW.** Odd: **HAPPY** (an emotion among colors). Tier: **Easy** (practice/anchor item), est. p ≈ .90.

### 5.5 Distractor / option-set guidelines

Odd-one-out is naturally a "5 items, pick the 1 that doesn't belong" format rather than a classic stem+options MCQ — but when implemented as a 6-option single-answer item (matching this battery's uniform format), present the 5 category words as options A–E and the correct "odd" word as the keyed option, with **one additional same-category "trap" word** as option F for the harder tier only (an item where a 6th word is *also* a plausible member of the minority category, testing whether the solver over-selects on a shared surface feature) — reserve this for hard-tier items only, since it adds a second live decision and can tip a medium item into a double-key if not piloted carefully.

### 5.6 Copyright note

All 10 items are self-authored. The classification-dimension framework (category / function / property) and the Rosch & Mervis (1975) typicality account are general, citable psychological findings, not any test publisher's proprietary content.

---

## 6. Cross-cutting engineering appendix

### 6.1 Option count and the "ideal difficulty" formula

For a single-best-answer multiple-choice item with *k* options and pure guessing, chance accuracy = 1/*k*. Classical test theory's item-discrimination-maximizing target is **p ≈ halfway between chance and 100%**: p_target ≈ (1 + 1/k) / 2.

| Options (k) | Chance (1/k) | Discrimination-maximizing p_target |
|---|---|---|
| 4 | .25 | .625 |
| 5 | .20 | .60 |
| **6 (this battery's format)** | **.167** | **.58** |
| 8 (ICAR "Progressive Matrices" hard sub-family) | .125 | .56 |
| 9 (ICAR Progressive Matrices w/ 8 distractors) | .111 | .56 |

This is why the battery's own authored targets (p≈.8 / .5 / .25 across the easy/medium/hard tiers, per `Test_Battery_Plan.md`) deliberately **span below and above** the pure discrimination-maximizing midpoint (.58): the goal here is a wide *difficulty ramp* for diagnostic/reporting purposes (showing a student where their personal ability ceiling sits), not a single maximally-discriminating cut-score item, so the .25 hard-tier target is intentionally close to chance (.167) for this 6-option format — appropriate given the population.

### 6.2 Ceiling effects — the single most important caution for this population

JEE/NEET aspirants are an academically **pre-selected, high-ability, high-motivation** sample — the same population type where ceiling effects are most damaging and most likely. Two independent, directly-relevant citations converge on the same warning:
- General gifted-assessment literature: "ceiling effects prevent meaningful discrimination among gifted individuals whose true abilities exceed the test's measurement range... a commonly proposed solution is the use of above-level tests" — i.e., a test normed/pitched at the general population will bunch a selected population near the top, destroying the very discrimination this battery needs for its radar/percentile output.
- Domain-specific evidence: when Wechsler scales were adapted for high-performing Chinese students, "the most difficult items were considered only moderately difficult" and genuinely harder items had to be custom-built (cited in Sun, Liu & Luo, 2019) — the exact same phenomenon should be expected for JEE/NEET aspirants relative to general-population-normed item difficulty.

**Concrete mitigations already reflected in the worked examples above:**
- Push the hardest 2–3 items per type past what "feels" appropriately hard for a general-population 16–19-year-old (M8, M9, series items 7/9/12, analogy items 8/9, odd-one-out items 7/8/9 are all authored at the p≈.20–.30 target deliberately, not p≈.40).
- Keep the option count flexible — ICAR's own hard sub-family widens to 8–9 options for exactly this reason; if pilot data shows the current hard-tier items clustering above p≈.35, widen those specific items to 8 options before writing new (harder-content) items, since more options is a cheaper lever than inventing a 5th rule.
- `Test_Battery_Plan.md` §3.3 already has the correct guardrail wired in: "raw accuracy ≥ .95 on any performance stage → band capped at 9 with note 'ceiling — retest with harder form'" — the item design in this file is what keeps that guardrail from firing routinely.

### 6.3 Applying this file directly to the Stage-1 item bank (6 matrix / 4 series / 3 analogy / 3 odd-one-out, 16 scored + 6 spare)

| Tier (item #s) | Target p | Matrix | Series | Analogy | Odd-one-out |
|---|---|---|---|---|---|
| Easy (1–4) | ≈.8 | 1 rule, harmonic (M1/M2 style) | 1-step, integer, constant gap ≤5 (item 4/5 style) | concrete function/category relation, top-frequency vocab (items 1/2/10 style) | obvious semantic category (items 1/2/10 style) |
| Medium (5–12) | ≈.5 | 2 rules, may include one distribution rule (M3/M4/M5 style) | 1-step multiplicative/Fibonacci, or clearly-cued 2-rule (items 6/8/10 style) | classification/degree relation, mid-frequency vocab (items 3/4/5/6 style) | function-over-category or property-over-category (items 3/4/6 style) |
| Hard (13–16) | ≈.25 | 3–4 rules, ≥1 distribution rule, consider non-harmonic noise or figure-addition layering (M7/M8/M9 style) | 2-step (second-order), interleaved, or multiplicative-recursive (items 7/9/12 style) | abstract/two-step relation-mapping, upper-frequency-band vocab ceiling (items 7/8/9 style) | role/relation-based or degree/scale classification (items 7/8 style); ≤1 numeric-variant item total |

This table is the direct hand-off artifact for authoring `app/tests/battery.json` Stage 1 (task: "Author `app/tests/battery.json` item database").

### 6.4 Confidence-tag and timing compatibility

All worked examples above are short enough to read and answer within the battery's existing **45 s per-item deadline** (`Test_Battery_Plan.md` Stage 1 conduct protocol) even at the hard tier — series items with a 5-term stem and 6 options, matrix items describable as a 3×3 grid, and single-sentence analogy/classification stems are all well within typical reading+solving time for this population at this difficulty range. No item type in this file requires a longer per-item deadline than the plan already specifies.

---

## Sources

Directly fetched/read in full (primary):
- Condon, D. M., & Revelle, W. (2014). The international cognitive ability resource: Development and initial validation of a public-domain measure. *Intelligence, 43*, 52–64. https://www.personality-project.org/revelle/publications/condon.icar.14.pdf (also https://doi.org/10.1016/j.intell.2014.01.004)
- ICAR Catalogue v1.0 (06/17). https://icar-project.com/ICAR_Catalogue.pdf
- ICAR Contributor Guidelines PDF. https://icar-project.com/attachments/download/138/Guidelines.pdf
- ICAR Project | Home. https://icar-project.org/
- ICAR Project | Item Types | Verbal Reasoning Item Statistics. https://icar-project.org/types/VR/VRstats.html
- ICAR Project | Item Types | Matrix Reasoning Item Statistics. https://icar-project.org/types/MR/MRstats.html
- ICAR Project | Item Types | Letter and Number Series Item Statistics. https://icar-project.org/types/LN/LNstats.html
- Yang, Y., Sanyal, D., Michelson, J., Ainooson, J., & Kunda, M. (2021). Automatic item generation of figural analogy problems: A review and outlook. *Proceedings of the 9th Annual Conference on Advances in Cognitive Systems.* https://arxiv.org/pdf/2201.08450
- Li, B. (2025). A study of rule omission in Raven's Progressive Matrices. https://arxiv.org/html/2510.03127v1
- Sun, L., Liu, Y., & Luo, F. (2019). Automatic generation of number series reasoning items of high difficulty. *Frontiers in Psychology, 10*, 884. https://www.frontiersin.org/journals/psychology/articles/10.3389/fpsyg.2019.00884/full (https://doi.org/10.3389/fpsyg.2019.00884)

Confirmed via targeted web search (secondary/reported, standard bibliographic facts cross-checked across ≥2 independent results):
- Carpenter, P. A., Just, M. A., & Shell, P. (1990). What one intelligence test measures: A theoretical account of the processing in the Raven Progressive Matrices Test. *Psychological Review, 97*(3), 404–431.
- Verguts, T., & De Boeck, P. (2002). The induction of solution rules in Raven's Progressive Matrices Test. *European Journal of Cognitive Psychology, 14*(4). https://ppw.kuleuven.be/okp/_pdf/Verguts2002TIOSR.pdf
- Matzen, L. E., Benz, Z. O., Dixon, K. R., Posey, J., Kroger, J. K., & Speed, A. E. (2010). Recreating Raven's: Software for systematically generating large numbers of Raven-like matrix problems with normed properties. *Behavior Research Methods, 42*, 525–541.
- Blum, D., & Holling, H. (2018). Automatic generation of figural analogies with the IMak package. *Frontiers in Psychology, 9*, 1286.
- Primi, R. (2001). Complexity of geometric inductive reasoning tasks. *Intelligence, 30*, 41–70.
- Embretson, S. E. (1998). A cognitive design system approach to generating valid tests. *Psychological Methods, 3*, 380.
- Zhang, C., Gao, F., Jia, B., Zhu, Y., & Zhu, S.-C. (2019). RAVEN: A dataset for relational and analogical visual reasoning. *CVPR.*
- Hu, S., Ma, Y., Liu, X., Wei, Y., & Bai, S. (2021). Stratified rule-aware network for abstract visual reasoning. *AAAI.*
- Benny, Y., Pekar, N., & Wolf, L. (2021). Scale-localized abstract reasoning. *CVPR.*
- Simon, H. A., & Kotovsky, K. (1963). Human acquisition of concepts for sequential patterns. *Psychological Review.*
- Holzman, T. G., Pellegrino, J. W., & Glaser, R. (1983). Cognitive variables in series completion. *Journal of Educational Psychology, 75*(4), 603–618.
- Sternberg, R. J. (1977). Component processes in analogical reasoning. *Psychological Review, 84*(4), 353–378.
- Rosch, E., & Mervis, C. B. (1975). Family resemblances: Studies in the internal structure of categories. *Cognitive Psychology, 7*(4), 573–605.
- Haladyna, T. M., Downing, S. M., & Rodriguez, M. C. (2002). A review of multiple-choice item-writing guidelines for classroom assessment. *Applied Measurement in Education, 15*(3), 309–334.
- Kirkegaard, E. O. W. (2016). ICAR5: Design and validation of a 5-item public domain cognitive ability test. *Open Differential Psychology.* https://openpsych.net/paper/5/
- Loe, B., Sun, L., Simonfy, F., & Doebler, P. (2018). Evaluating an automated number series item generator using linear logistic test models. *Journal of Intelligence, 6*(2), 20. (cited via ICAR Guidelines PDF reference list)
- Dworak, E. M., Revelle, W., Doebler, P., & Condon, D. M. (2020). Using the International Cognitive Ability Resource as an open source tool to explore individual differences in cognitive ability. *Personality and Individual Differences, 169*, 109906. https://www.sciencedirect.com/science/article/pii/S0191886920300957

Internal project documents consulted for context/consistency (not external sources):
- `product/Metrics_Needed.md`, `product/Test_Battery_Plan.md`, `product/Problem_Design_Spec.md` (A1 section), `research/parameters/References.md` (citation-convention reference)
