# Scoring Rubric — Per-Parameter Quantification

**Project:** Student Psychometric Analysis · **Deliverable 2 of 3**
**Companion to:** `01_Parameter_Framework_Report.md`
**Date:** 2026-07-01

This rubric defines exactly how each of the 20 parameters is turned into a stored value: the master 0–10 conversion for continuous parameters, concrete behavioral anchors per band, the instructional implication (the point of the exercise), and explicit level/profile definitions for the parameters that are **not** validly a single number.

---

## 0. Master conversion for continuous (0–10) parameters

Continuous parameters are scored **norm-referenced and age-adjusted**: compare the student to same-age peers, not to an absolute standard. Pipeline: raw score → age-normed standard score (M=100, SD=15) → percentile → 0–10 band.

| 0–10 | Percentile (age peers) | Standard score | Label |
|:----:|:----------------------:|:--------------:|-------|
| 0 | < 2 | < 70 | Well below age level |
| 1 | 2–8 | 70–79 | Well below age level |
| 2 | 9–15 | 80–85 | Below age level |
| 3 | 16–24 | 86–89 | Below age level |
| 4 | 25–39 | 90–96 | Low-typical |
| 5 | 40–59 | 97–103 | Age-typical (median) |
| 6 | 60–74 | 104–109 | High-typical |
| 7 | 75–83 | 110–114 | Above age level |
| 8 | 84–90 | 115–119 | Above age level |
| 9 | 91–97 | 120–129 | Well above age level |
| 10 | > 98 | ≥ 130 | Well above age level |

**Rules.**
- Always store the underlying **percentile + raw score + a confidence value**, not just the 0–10 band (the band is for display; the data schema keeps the rest).
- **Never** report a decimal beyond the band (no "7.4") — it implies precision the measurement doesn't have.
- A band from a **single short task is provisional** (low confidence). Composite ≥2 indicators or re-measure before treating it as stable.
- For anxiety (E5), a **high** score is a **risk flag**, not a strength — see its entry.

**Generic behavioral anchors** (specialized per parameter below):

| Band | Meaning | Generic instructional stance |
|:----:|---------|------------------------------|
| **0–3 (Low)** | Clearly below age peers; a likely bottleneck | Scaffold heavily, reduce load, pre-teach prerequisites, monitor closely |
| **4–6 (Typical)** | Within the normal range for age | Standard grade-level instruction; light differentiation |
| **7–10 (High)** | A relative strength to leverage | Extend, accelerate, use as a lever for weaker areas |

---

## 1. Domain A — Core Cognitive Capacity (all continuous 0–10)

### A1 · Fluid Reasoning (Gf)
| Band | What it looks like | Instructional implication |
|:----:|--------------------|---------------------------|
| 0–3 | Struggles with novel/multi-step problems; needs worked examples; poor spontaneous transfer | Use worked examples + faded scaffolding; teach one strategy explicitly; minimize novelty at first |
| 4–6 | Handles grade-level novel problems with normal support | Standard problem-solving instruction with hints available |
| 7–10 | Rapidly infers rules, transfers to new contexts, enjoys puzzles | Give open-ended/novel challenges; reduce scaffolding; accelerate |

### A2 · Working Memory
| Band | What it looks like | Instructional implication |
|:----:|--------------------|---------------------------|
| 0–3 | Loses track mid-problem; drops steps; overwhelmed by multi-step instructions | Chunk tasks; externalize steps (write it down); reduce simultaneous demands; provide checklists |
| 4–6 | Holds typical multi-step problems | Standard pacing |
| 7–10 | Juggles many elements mentally; strong mental arithmetic | Allow longer multi-step chains; less externalization needed |

### A3 · Processing Speed
| Band | What it looks like | Instructional implication |
|:----:|--------------------|---------------------------|
| 0–3 | Slow but not necessarily inaccurate; timed tasks penalize them | Extend time; separate speed from accuracy in grading; automate facts gradually |
| 4–6 | Age-typical fluency | Standard |
| 7–10 | Fast, fluent retrieval and scanning | Fluency drills under-challenge them; move to reasoning depth |

### A4 · Learning Efficiency (Glr)
| Band | What it looks like | Instructional implication |
|:----:|--------------------|---------------------------|
| 0–3 | Needs many exposures to retain; forgets across sessions | Spaced repetition; more retrieval practice; over-learn key facts |
| 4–6 | Typical acquisition/retention rate | Standard review cadence |
| 7–10 | Acquires and retains quickly with few exposures | Compress review; move faster; enrich rather than repeat |

### A5 · Attentional Control
| Band | What it looks like | Instructional implication |
|:----:|--------------------|---------------------------|
| 0–3 | Distractible; off-task quickly; errors from lapses (not lack of skill) | Short segments; minimize distractors; frequent check-ins; movement breaks |
| 4–6 | Sustains attention for age-typical periods | Standard session length |
| 7–10 | Sustains focus through long/complex tasks | Can handle extended deep-work blocks |

---

## 2. Domain B — Verbal & Knowledge Foundations

### B1 · Crystallized / Verbal Knowledge (Gc) — continuous 0–10
| Band | What it looks like | Instructional implication |
|:----:|--------------------|---------------------------|
| 0–3 | Limited vocabulary/background knowledge; misses technical terms | Pre-teach vocabulary; build background; avoid language-heavy framing of STEM |
| 4–6 | Age-typical knowledge base | Standard |
| 7–10 | Broad vocabulary and general knowledge | Leverage verbal explanation; introduce advanced terminology |
*Fairness note: a low band may reflect limited opportunity-to-learn, not ability. Respond with enrichment, never labeling.*

### B2 · Reading Comprehension — continuous 0–10
| Band | What it looks like | Instructional implication |
|:----:|--------------------|---------------------------|
| 0–3 | Decodes but misses meaning; fails word problems they could compute | Reduce reading load in STEM; read problems aloud; teach word-problem parsing; match text to Lexile |
| 4–6 | Grade-level comprehension | Standard |
| 7–10 | Strong comprehension of dense text | Assign richer source texts; independent reading of science material |

### B3 · Prior STEM Domain Knowledge — **per-skill mastery + proficiency %** (NOT a single 0–10)
Score **each prerequisite skill/topic** on the mastery ladder; store a proficiency % per topic; roll up to a topic-map, not one number.

| Level | Proficiency % | Definition | Instructional implication |
|-------|:---:|------------|---------------------------|
| **Not yet** | 0–39% | Prerequisite absent | Teach prerequisite before new content |
| **Developing** | 40–69% | Partial/unreliable | Targeted practice; guided support |
| **Proficient** | 70–89% | Reliable with occasional slips | Ready for next topic; light review |
| **Mastered** | 90–100% | Automatic, transfers | Advance / accelerate / use to scaffold peers |
*Guard against circularity: assess prerequisites, then predict readiness for new content.*

---

## 3. Domain C — STEM-Specific Aptitudes

### C1 · Number Sense / Quantitative Reasoning — continuous 0–10
| Band | What it looks like | Instructional implication |
|:----:|--------------------|---------------------------|
| 0–3 | Weak magnitude intuition; number-line estimates nonlinear; slow symbolic comparison | Build magnitude sense (number lines, estimation games) before procedures |
| 4–6 | Typical number sense | Standard |
| 7–10 | Sharp magnitude intuition; strong estimation | Push toward abstraction, proportional reasoning, mental estimation |

### C2 · Spatial Ability — continuous 0–10 ⭐
| Band | What it looks like | Instructional implication |
|:----:|--------------------|---------------------------|
| 0–3 | Struggles with rotation/visualization; geometry, graphs, diagrams hard | **Train it** (it's malleable, g≈0.47): sketching, manipulatives, gesture, rotation practice; provide diagrams |
| 4–6 | Typical spatial skill | Standard; include spatial tasks |
| 7–10 | Strong visualization/rotation | Leverage for geometry, physics, chemistry, engineering; a STEM strength to surface (often missed by standard tests) |

### C3 · Scientific Reasoning — **developmental level** (ordinal; optional 0–10 overlay)
Map from a Lawson-style (LCTSR) or CVS task.

| Level | 0–10 overlay | Definition | Instructional implication |
|-------|:---:|------------|---------------------------|
| **Concrete** | 0–3 | Reasons about tangible cases; confounds variables; no systematic control | Teach control-of-variables explicitly (direct instruction); use concrete manipulatives |
| **Transitional** | 4–6 | Inconsistent control-of-variables; partial hypothesis testing | Scaffold experiment design; prompt "what are you holding constant?" |
| **Formal** | 7–10 | Systematic CVS; hypothetico-deductive; coordinates theory & evidence | Give open inquiry, experimental design, evidence-evaluation tasks |

---

## 4. Domain D — Executive Function & Metacognitive Regulation

### D1 · Executive Function (inhibition + flexibility) — continuous 0–10 composite
Report an **inhibition** sub-score and a **flexibility** sub-score; weight flexibility lower (weaker achievement link).

| Band | What it looks like | Instructional implication |
|:----:|--------------------|---------------------------|
| 0–3 | Impulsive answers; blurts intuitive-but-wrong responses; rigid switching | Teach "stop-and-check"; flag common misconception traps; explicit cue to switch strategies |
| 4–6 | Typical control | Standard |
| 7–10 | Inhibits prepotent errors; flexible strategy shifting | Introduce problems requiring counterintuitive reasoning |

### D2 · Metacognition & Self-Regulated Learning — continuous 0–10 composite
(From behavioral traces + age-appropriate self-report; flag confidence when self-report-only.)

| Band | What it looks like | Instructional implication |
|:----:|--------------------|---------------------------|
| 0–3 | Doesn't plan, monitor, or check; dives in; no strategy adjustment | Teach explicit strategies (plan-monitor-check); model think-alouds; prompt self-questioning |
| 4–6 | Some planning/checking with prompting | Fade prompts gradually |
| 7–10 | Plans, monitors, self-corrects, adapts strategies independently | Give autonomy; complex multi-stage projects |

### D3 · Monitoring Calibration — **bias + resolution pair** (NOT a single 0–10)
Compute from confidence judgments vs. auto-scored accuracy.

**Bias** (signed −5…+5, reported as a category):
| Category | Meaning | Instructional implication |
|----------|---------|---------------------------|
| **Overconfident** (bias > +1) | Confidence exceeds accuracy | Confront with feedback; require justification before answering; targeted error review |
| **Well-calibrated** (−1…+1) | Confidence matches accuracy | Trust their self-assessment; encourage self-directed study |
| **Underconfident** (bias < −1) | Accuracy exceeds confidence | Build confidence; surface their actual success rate; reduce anxiety |

**Resolution** (0–10): how well they distinguish what they know from what they don't. Low resolution → teach self-testing to sharpen monitoring, regardless of bias.

---

## 5. Domain E — Motivation, Affect & Disposition

*All self-report; below ~grade 3–4 use informant (teacher/parent) report. Treat single-administration scores as state-sensitive (low confidence).*

### E1 · Academic Self-Efficacy — continuous 0–10 (per domain, e.g., math vs. science)
| Band | What it looks like | Instructional implication |
|:----:|--------------------|---------------------------|
| 0–3 | "I can't do this"; avoids challenge; gives up early | Engineer early **mastery experiences**; break tasks into winnable steps; specific process praise |
| 4–6 | Typical, task-dependent confidence | Standard; calibrate challenge |
| 7–10 | Confident, takes on hard tasks | Ensure challenge matches; watch for overconfidence (cross-check D3) |

### E2 · Motivation Quality (SDT) — **Relative Autonomy Index 0–10 + profile label**
| Profile (dominant) | RAI band | What it looks like | Instructional implication |
|--------------------|:---:|--------------------|---------------------------|
| **Amotivated** | 0–2 | No drive; disengaged | Rebuild competence + relevance; very small wins |
| **Controlled** | 3–5 | Works only for grades/rewards/approval | Add autonomy/choice; connect to personal relevance |
| **Mixed** | 6–7 | Both internal and external drivers | Nudge toward interest-based framing |
| **Autonomous** | 8–10 | Driven by interest/value | Provide choice, depth, self-directed projects |

### E3 · Conscientiousness (absorbs grit) — continuous 0–10
| Band | What it looks like | Instructional implication |
|:----:|--------------------|---------------------------|
| 0–3 | Disorganized; inconsistent effort; misses follow-through | External structure (deadlines, checklists, routines); build habits |
| 4–6 | Typically reliable | Standard |
| 7–10 | Organized, diligent, persistent | Give long-horizon projects; grant independence |

### E4 · Openness / Curiosity (absorbs NFC) — continuous 0–10 (lower-priority)
| Band | What it looks like | Instructional implication |
|:----:|--------------------|---------------------------|
| 0–3 | Prefers routine; avoids novel/abstract | Anchor new ideas to familiar concrete contexts |
| 4–6 | Typical curiosity | Standard |
| 7–10 | Seeks novelty, complexity, big questions | Feed with enrichment, open exploration, "why" questions |

### E5 · Academic / Math Anxiety — continuous 0–10 (**high = risk, reverse-signed**)
| Band | What it looks like | Instructional implication |
|:----:|--------------------|---------------------------|
| 0–3 (low anxiety) | Calm in evaluative/math settings | Standard; can handle timed assessment |
| 4–6 (moderate) | Some tension; occasional avoidance | Reduce time pressure; low-stakes practice; normalize errors |
| 7–10 (high — **flag**) | Freezes, avoids math, WM disrupted by worry | Remove time pressure; build math self-efficacy; consider counselor referral if severe; **do not** interpret low math scores as low ability until anxiety addressed |

### E6 · Academic Engagement (behavioral) — continuous 0–10 (from telemetry)
| Band | What it looks like | Instructional implication |
|:----:|--------------------|---------------------------|
| 0–3 | Low time-on-task, high abandonment, no help-seeking | Investigate cause (too hard? not relevant? anxiety?); re-hook interest; adjust difficulty |
| 4–6 | Typical involvement | Standard |
| 7–10 | High persistence, active help-seeking, completes tasks | Sustain with appropriate challenge; avoid boredom from under-challenge |
*Engagement is an outcome signal — read it alongside its drivers (E1/E2/E5), don't treat it as an independent trait.*

---

## 6. Scoring governance (apply to every parameter)

1. **Store the evidence, show the band.** Persist raw score, standard score, percentile, method/instrument, timestamp, and a **confidence** value; display the 0–10 band or category.
2. **Confidence tiers.** High = ≥2 converging indicators or a validated standardized subtest; Medium = one good task; Low = single short task or self-report-only for young children. Never drive high-stakes decisions on Low.
3. **Re-measure over time.** All scores are timestamped; track growth (especially for malleable parameters: spatial, SRL, self-efficacy, prior knowledge, anxiety).
4. **Interpret profiles, not isolated scores** (see report §9). Cross-check related parameters (e.g., low math score + high math anxiety → address anxiety first).
5. **No labeling.** Report bands with instructional implications and confidence, never as fixed traits ("low-ability"). Foreground malleable parameters to teachers.
