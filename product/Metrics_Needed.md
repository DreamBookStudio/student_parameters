# Metrics Needed — JEE Advanced / NEET Parameter Battery

**Project:** Student Psychometric Analysis
**Product scope:** A diagnostic "mirror" that quantifies a JEE/NEET aspirant's cognitive and psychological parameters so they can see their mental model and focus effort. **This product measures the *meta layer* (how this brain learns and performs under pressure) — NOT the syllabus.** Subject-topic mastery is deliberately out of scope (that is what mock-test series already do).
**Population:** ~16–19 yrs (Class 11–12 + droppers). Self-report and stealth/behavioral measures are both valid at this age.
**Source of truth:** `../research/parameters/` (framework report, scoring rubric, data schema, references). Parameter codes below match that framework.

---

## Selection summary

Of the 20 framework parameters: **8 core (Tier 1)** + **6 supporting (Tier 2)** are in scope; **1 conditional**; **5 dropped** as not the lever for this exam context.

Weighting key: **H** = high relevance, **M** = medium, **L** = low.
Quant.: `0-10` continuous · `bias+res` calibration pair · `profile` category profile.
Feasibility: **T1** embedded/stealth or short game-like task · **T2** brief self-report / short subtest.

---

## Tier 1 — Core mirror (build these first)

| Code | Metric | JEE | NEET | Quant. | Feas. | Why it matters for the exam |
|------|--------|:---:|:----:|:------:|:-----:|-----------------------------|
| **A2** | Working Memory | H | H | 0-10 | T1 | Multi-step PCM problems live or die on holding + manipulating information. |
| **A3** | Processing Speed | H | H | 0-10 | T1 | Both papers are brutal on time; retrieval/scanning speed = attempts completed. Critical for NEET volume. |
| **A4** | Learning Efficiency / Retrieval | M–H | H | 0-10 | T1 | How fast you encode and how reliably you recall. Biggest lever for NEET Biology + inorganic chemistry (pure volume). |
| **D2** | Metacognition & Self-Regulated Learning | H | H | 0-10 | T1/T2 | Planning, self-testing, monitoring, time strategy. This *is* "focus on weak areas," operationalized. |
| **D3** | Monitoring Calibration | H | H | bias+res | T1 | ★ Killer feature. With **negative marking**, knowing what you actually know is worth marks: overconfidence bleeds negatives, underconfidence leaves easy marks. Measure via confidence-tagging on every practice answer → bias + resolution. |
| **E3** | Conscientiousness | H | H | 0-10 | T2 | Discipline/consistency across a 1–2 year grind; strongest dispositional predictor. |
| **E5** | Exam / Test Anxiety | H | H | 0-10 (risk) | T2 | Enormous in this cohort; directly hijacks working memory. Also the wellbeing signal. |
| **A1** | Fluid Reasoning | H | M | 0-10 | T2 | Engine of *novel* multi-step problems. Weight high for JEE Advanced; lower for NEET (recall over novelty). |

## Tier 2 — Strong supporting

| Code | Metric | JEE | NEET | Quant. | Feas. | Why it matters for the exam |
|------|--------|:---:|:----:|:------:|:-----:|-----------------------------|
| **D1** | Executive Function / Inhibition | M–H | M | 0-10 | T1 | "Silly mistake" and distractor-trap resistance. Careless-error control is a real score leak. |
| **C2** | Spatial Ability | H | L–M | 0-10 | T1 | 3D geometry, vectors, rotational mechanics, organic stereochemistry. Trainable (g≈0.47), so actionable. **Promote to Tier 1 for JEE.** |
| **C1** | Number Sense / Mental Math | M | M | 0-10 | T1 | Estimation + sanity-checking to eliminate options fast. |
| **A5** | Attentional Control | M | M–H | 0-10 | T1 | Sustaining focus across a 3-hr paper and long study blocks. |
| **E1** | Academic Self-Efficacy | M | M | 0-10 | T2 | Subject-specific belief ("I can crack organic"); predicts persistence + effort allocation. |
| **E2** | Motivation Quality (autonomy) | M | M | profile | T2 | Autonomous vs. controlled (parental-pressure-driven). Predicts burnout risk over the cycle — sustainability flag. |

## Conditional

| Code | Metric | Include when | Quant. | Feas. |
|------|--------|--------------|:------:|:-----:|
| **E6** | Academic Engagement (behavioral) | Product captures practice-session telemetry (time-on-task, help-seeking, completion). Otherwise skip. | 0-10 | T1 |

## Dropped — not the lever for this context

| Code | Metric | Why dropped |
|------|--------|-------------|
| **B1** | Crystallized / Verbal Knowledge | JEE/NEET are not verbal exams. |
| **B2** | Reading Comprehension | Marginal; only "question-parsing" matters and it overlaps with attention. Optional micro-check at most. |
| **B3** | Prior STEM Domain Knowledge | Syllabus mastery = the job of mock-test series. Explicitly out of scope for a parameters mirror. |
| **C3** | Scientific Reasoning (experimental design) | Exams test applying laws, not designing experiments. |
| **E4** | Openness / Curiosity | Helps deep understanding but is not the exam lever. |

---

## JEE vs NEET emphasis

- **JEE Advanced → reasoning-heavy.** Weight **A1, A2, C2, C1, D1** more (novel, multi-concept problems).
- **NEET → volume / recall / speed.** Weight **A4, A3, D3, E5** more (memorization + fast, high-attempt-rate MCQs under negative marking).

## Design cautions (carry into the build)

1. **Frame A1 Fluid Reasoning carefully.** It is diagnostic but barely trainable — present it as "set your strategy around this" (a lower-Gf student leans on pattern drilling + templates), never as a demotivating ceiling.
2. **Lead with the differentiated bundle: D2 + D3 + E5** — the self-regulation-and-nerve layer that mock scores never reveal. That is the product's defensible edge.
3. **Calibration (D3) is worth marks directly** under negative marking — treat it as a headline readout ("attempt vs. skip" intelligence), not a footnote.
4. **Report profiles, not isolated scores**, and pair related metrics (e.g., low practice score + high E5 anxiety → address anxiety first, not "study harder").
5. **No labeling.** Show every metric with a confidence level and an actionable next step; foreground the malleable metrics (A4, A5, C2, D1, D2, D3, E1, E5) over the fixed ones.

---

*Next artifact (not yet built): the actual test battery — specific task per Tier-1 metric, session length, and the JEE/NEET-relevant readout each produces.*
