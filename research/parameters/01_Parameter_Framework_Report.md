# A Research-Backed Parameter Framework for Modeling K–12 STEM Learners

**Project:** Student Psychometric Analysis
**Scope:** K–12 school students · comprehensive parameter set tagged by measurement feasibility · domain-general traits + STEM-specific (math/science/spatial) aptitudes
**Deliverable 1 of 3:** Research report (see also `02_Scoring_Rubric.md`, `03_Data_Schema.sql`, and `Student_Parameter_Framework.xlsx`)
**Date:** 2026-07-01

---

## 1. Executive summary

This framework defines **20 parameters**, grouped into **5 domains**, on which any K–12 learner can be quantifiably modeled so a teacher or tutoring system can adapt instruction. Every parameter is grounded in peer-reviewed evidence (meta-analyses and seminal studies), each is assigned a **quantification method** (a continuous 0–10 score where that is psychometrically defensible; an ordinal or categorical scheme where it is not), and each carries a **measurement-feasibility tier** describing how realistically it can be captured in a scalable digital product.

Three design commitments distinguish this from a naive "list of traits":

1. **We exclude "learning styles" (VARK).** The evidence against instruction-to-style matching is strong and consistent. Building on it would undermine credibility. It appears here only as a documented exclusion (§4).
2. **We enforce parsimony.** Several popular constructs are statistically redundant with better-established ones. Grit is absorbed into Conscientiousness; Need for Cognition into Openness; short-term span and working-memory "updating" into Working Memory. This prevents a dashboard of 30 overlapping sliders that measure the same few things (§9).
3. **We are honest about measurement.** Not every construct is validly a single number. Scientific reasoning is reported as a developmental level; motivation as an autonomy profile; monitoring accuracy as calibration bias plus resolution. Faking precision (a "7.4/10 intuition") would be scientifically indefensible.

The **two strongest anchors** in the entire literature, which the model is built around: general cognitive ability correlates with school grades at **ρ ≈ .54** (Roth et al., 2015), and working memory correlates with mathematics at **r ≈ .35** (Peng et al., 2016). Prior domain knowledge and early math skill are the strongest *specific* predictors of later achievement (Duncan et al., 2007).

---

## 2. Purpose, end goal, and how to read this

**End goal being served.** The project models a student on inherent and acquired parameters so that (a) a teacher understands the learner quickly, and (b) tutoring adapts to that learner. This document is the *specification* of what to measure and why. The scoring rubric operationalizes *how to score it*; the data schema specifies *how to store it*.

**A modeling stance to adopt up front.** These parameters are not independent "dials." They form a correlated structure with a small number of powerful underlying factors (general cognitive ability; a self-regulation/conscientiousness factor; a domain-knowledge factor). The value of a rich parameter set is **diagnostic resolution** — knowing *where* a student is strong or weak to target instruction — not the illusion that 20 things vary independently. Model them as correlated; interpret profiles, not isolated scores.

**How each parameter is documented (§5–§8):** definition → why it matters for K–12 STEM (with effect sizes) → how it is validly measured (named instruments, age ranges) → feasibility tier → quantification method → overlap/parsimony notes → key references.

---

## 3. Design principles

- **Evidence first.** Every parameter has meta-analytic or seminal empirical support. Effect sizes are reported so the team can weight parameters by predictive value, not intuition.
- **Parsimony over proliferation.** Where two constructs share most of their variance, we keep the better-measured, better-established one and note the absorption.
- **Measurement honesty.** Continuous 0–10 only where a construct is a single, reasonably interval-scaled latent dimension with adequate reliability. Otherwise ordinal/categorical/profile.
- **Developmental sensitivity.** K–12 spans ages ~5–18. Self-report is unreliable below ~grade 3; some constructs need age-normed scoring or informant (teacher/parent) report for young children. Flagged per parameter.
- **Feasibility realism.** A parameter's scientific validity and its measurability at scale are *different questions*. We separate them with an explicit tier system (§10) so product decisions are made with eyes open.
- **Fairness and ethics.** Several parameters (crystallized knowledge, prior knowledge) partly index opportunity-to-learn and SES, not fixed aptitude. Scores must inform support, never label or limit a child (§11).

---

## 4. What we deliberately exclude

### 4.1 Learning styles / VARK — excluded as a myth

The "meshing hypothesis" — that matching instruction to a student's sensory/processing style (visual / auditory / reading-writing / kinesthetic) improves learning — **has no credible supporting evidence**. The foundational review (Pashler, McDaniel, Rohrer & Bjork, 2008, *Psychological Science in the Public Interest*) set the fair test — a style-by-method crossover interaction — and found almost no studies used an adequate design, and those that did failed to find the required interaction. Coffield et al. (2004) catalogued 71 learning-styles models and found the field theoretically incoherent with poor-reliability instruments. Belief is nonetheless near-universal among teachers (~89–97%; Newton & Salvi, 2020), which is exactly why a serious framework must state the exclusion explicitly rather than quietly omit it.

**Directive:** do not model, infer, or output a VARK/learning-style parameter. If a stakeholder expects it, cite Pashler et al. (2008) and redirect them to evidence-based parameters (prior knowledge, working memory, self-efficacy).

### 4.2 Constructs absorbed for parsimony (measured, but not as separate parameters)

| Popular construct | Absorbed into | Why |
|---|---|---|
| **Grit** | Conscientiousness (E3) | Grit is very strongly correlated with conscientiousness and adds little incremental validity; its perseverance-of-effort facet does nearly all the predictive work (Credé, Tynan & Harms, 2017). |
| **Need for Cognition** | Openness / Curiosity (E4) | High overlap with Openness and intrinsic motivation; limited incremental validity. |
| **Short-term memory span** | Working Memory (A2) | Storage-only span predicts achievement more weakly than complex working memory (Kane et al., 2005). Kept as a low-cost sub-facet. |
| **WM "updating" (EF)** | Working Memory (A2) | Near-identical to the working-memory construct; avoid double-counting. |
| **Math problem-solving** | Modeled as a STEM *proficiency outcome*, not a latent trait | It is a composite of fluid reasoning + working memory + number sense + reading + prior knowledge; measure it as achievement, then explain it with the parameters. |
| **General intelligence (g)** | Not a product parameter | Full-scale IQ requires proctored clinical assessment (Tier 3). We measure its facets (Gf, Gwm, Gc, Gs) instead. |

---

## 5. The framework at a glance

Quantification key: **C** = continuous 0–10 (from norm-referenced/standardized scoring); **O** = ordinal levels; **P** = profile/categorical; **B** = bias + resolution pair.
Feasibility key (see §10): **T1** = embedded / stealth / short game-like task (auto-scored); **T2** = brief self-report or short standardized subtest; **T3** = requires proctored/clinical assessment.

| # | Parameter | Domain | Quant. | Tier | Anchor evidence |
|---|-----------|--------|:------:|:----:|-----------------|
| A1 | Fluid Reasoning (Gf) | Core Cognitive | C | T1/T2 | g–grades ρ≈.54 (Roth 2015); Gf↔WM latent r≈.72 (Kane 2005) |
| A2 | Working Memory (Gwm) | Core Cognitive | C | T1 | WM–math r≈.35 (Peng 2016) |
| A3 | Processing Speed (Gs) | Core Cognitive | C | T1 | Developmental driver of WM/reasoning (Kail 1991) |
| A4 | Long-Term Retrieval / Learning Efficiency (Glr) | Core Cognitive | C | T1/T2 | RAN–reading r≈.43 (McWeeny 2022); RAN–math (Koponen 2017) |
| A5 | Attentional Control | Core Cognitive | C | T1 | Sustained attention ↔ achievement (Keller 2023); ADHD EF deficits (Willcutt 2005) |
| B1 | Crystallized / Verbal Knowledge (Gc) | Verbal & Knowledge | C | T2 | Verbal IQ out-predicts nonverbal, ρ≈.53 vs .44 (Roth 2015) |
| B2 | Reading Comprehension | Verbal & Knowledge | C | T1/T2 | Predicts math word-problem solving (Vilenius-Tuohimaa 2008) |
| B3 | Prior STEM Domain Knowledge | Verbal & Knowledge | O+% | T1 | Early math = strongest later-achievement predictor (Duncan 2007) |
| C1 | Number Sense / Quantitative Reasoning | STEM Aptitude | C | T1 | ANS↔math indep. of IQ (Halberda 2008); symbolic r≈.30 (Schneider 2017) |
| C2 | Spatial Ability | STEM Aptitude | C | T1 | Predicts STEM beyond math+verbal (Wai 2009); trainable g≈0.47 (Uttal 2013) |
| C3 | Scientific Reasoning | STEM Aptitude | O(+C) | T1/T2 | CVS teachable, transfers (Klahr & Nigam 2004; Zimmerman 2007) |
| D1 | Executive Function (inhibition + flexibility) | EF & Metacognition | C | T1 | EF↔achievement, N≈64k (Diamond 2013; Best 2011) |
| D2 | Metacognition & Self-Regulated Learning | EF & Metacognition | C | T1/T2 | Metacognition–achievement r≈.20 (Dent & Koenka 2016) |
| D3 | Monitoring Calibration | EF & Metacognition | B | T1 | Relative metacomprehension accuracy ~r≈.24 (Schraw 2009) |
| E1 | Academic Self-Efficacy | Motivation & Affect | C | T2 | Self-efficacy–performance r≈.38 (Multon 1991) |
| E2 | Motivation Quality (SDT autonomy) | Motivation & Affect | C+P | T2 | Autonomous motivation ↔ deep learning (Ryan & Deci 2020) |
| E3 | Conscientiousness (absorbs grit) | Motivation & Affect | C | T2 | Strongest Big-Five predictor r≈.22 (Poropat 2009) |
| E4 | Openness / Curiosity (absorbs NFC) | Motivation & Affect | C | T2 | Openness r≈.10–.12; stronger at primary level (Poropat 2009) |
| E5 | Academic / Math Anxiety | Motivation & Affect | C | T2 | Math anxiety–achievement r≈−.28 (Barroso 2021) |
| E6 | Academic Engagement (behavioral) | Motivation & Affect | C | T1 | Behavioral engagement ↔ achievement; telemetry-measurable (Fredricks 2004) |

**Recommended MVP core (10):** A1 Gf, A2 Working Memory, A4 Learning Efficiency, B3 Prior Knowledge, C1 Number Sense, C2 Spatial, D2 Metacognition/SRL, E1 Self-Efficacy, E5 Math Anxiety, E6 Engagement. These maximize predictive value × feasibility. The rest add diagnostic resolution as the product matures.

---

## 6. Domain A — Core Cognitive Capacity

These are the CHC (Cattell–Horn–Carroll) broad abilities beneath general intelligence. They are the "engine" of learning: largely domain-general, moderately heritable, and only partially malleable. **Parsimony warning:** A1, A2, and A5 are tightly inter-correlated (a shared executive/reasoning core); do not treat them as fully independent.

### A1 · Fluid Reasoning (Gf)
**Definition.** Reasoning, concept formation, and novel-problem solving that cannot be done by recalling learned facts (e.g., matrix/pattern completion, inference).
**Why it matters (STEM).** Gf is the ability most saturated with general intelligence *g*, and *g* correlates with grades at **ρ ≈ .54** (Roth et al., 2015, 240 samples, N≈105,000). It drives transfer, proof construction, and multi-step problem solving. Caution: purely nonverbal matrix tests under-predict grades (ρ≈.44) relative to mixed batteries (ρ≈.60).
**Measured by.** WISC-V Fluid Reasoning Index (Matrix Reasoning, Figure Weights), ages 6–16; Woodcock-Johnson IV Gf; Raven's Progressive Matrices (Colored ~5–11; Standard ~8+); ICAR public matrix items.
**Feasibility.** **T1/T2** — matrix items self-administer, auto-score, and adapt well; triangulate rather than rely on a single short task.
**Quantification.** Continuous **0–10** from age-normed standard score → percentile → band.
**Overlap.** Gf↔Working Memory latent **r≈.72** (~50% shared variance; Kane et al., 2005); Gf≈g at the latent level. Biggest parsimony flag in the model.
**Refs.** Roth et al. (2015); Kane et al. (2005); Schneider & McGrew (2018, CHC).

### A2 · Working Memory (Gwm)
**Definition.** Holding information in mind *and manipulating it* during ongoing work (distinct from passive storage).
**Why it matters (STEM).** The most STEM-critical domain-general parameter. **WM–mathematics r = .35** [.32,.37] (Peng et al., 2016, 110 studies); strongest for word problems and multi-step calculation. WM limits how much problem information a student holds before offloading.
**Measured by.** WISC-V Working Memory Index (Digit Span backward, Picture Span); WJ-IV Gwm (Numbers Reversed); complex-span tasks (operation/reading/counting span). **Engineering note:** use complex-span, **not** n-back — n-back has weak individual-differences reliability.
**Feasibility.** **T1** — complex-span and backward-span digitize cleanly with good reliability.
**Quantification.** Continuous **0–10** (norm-referenced). Optionally store a separate visuospatial-span sub-facet (Corsi).
**Overlap.** High with Gf, attentional control, and (absorbed) short-term span. Model as part of a shared executive-control core.
**Refs.** Peng et al. (2016); Allen et al. (2023); Kane et al. (2005).

### A3 · Processing Speed (Gs)
**Definition.** Speed and fluency of simple, over-learned visual-scan/comparison/decision tasks under time pressure.
**Why it matters (STEM).** A developmental rate-limiter: gains in Gs drive growth in working memory and reasoning across childhood (Kail, 1991). Supports math *fluency* (fact retrieval) more than conceptual accuracy. Its effect on grades is real but largely indirect (through Gf/Gwm).
**Measured by.** WISC-V Processing Speed Index (Coding, Symbol Search, Cancellation), ages 6–16; WJ-IV Gs (Letter-Pattern Matching).
**Feasibility.** **T1** — symbol-search/matching paradigms are timed and self-scoring. **Caveat:** control input modality (touch vs. mouse vs. keyboard) — device latency and motor speed confound cross-device comparison.
**Quantification.** Continuous **0–10** (norm-referenced), with device standardization.
**Overlap.** Moderate with Gf/Gwm; comparatively separable from Gc — a useful non-redundant signal if device confounds are controlled.
**Refs.** Kail (1991); Schneider & McGrew (2018); WISC-V Technical Manual.

### A4 · Long-Term Retrieval / Learning Efficiency (Glr)
**Definition.** How quickly and durably a student encodes, consolidates, and fluently retrieves new information (associative learning, retrieval fluency). Includes the **recall vs. recognition** contrast.
**Why it matters (STEM).** Indexes *learning rate* — directly relevant to instruction/retention. Retrieval-fluency (RAN) illustrates the link: **RAN–reading r≈.43** (McWeeny et al., 2022) and RAN predicts arithmetic fluency (Koponen et al., 2017). One of the more *independent* abilities, so it adds incremental prediction of learning rate beyond static ability.
**Measured by.** WJ-IV Glr (Visual-Auditory Learning = a paired-associate learning-efficiency task; Story Recall; Retrieval Fluency); RAN (objects/colors ~4–5+, letters/digits once known); trials-to-criterion paired-associate tasks.
**Feasibility.** **Split. T1** for a digital paired-associate learning-efficiency task (trials-to-criterion) and recognition probes; RAN needs voice capture + timing. Free/oral recall is **T3** (open verbal scoring). *Recommendation:* deploy paired-associate + RAN as the scalable indicators.
**Quantification.** Continuous **0–10** (learning-rate / trials-to-criterion normed).
**Overlap.** Modest with Gf/Gwm (that independence is its value). RAN overlaps Gs (both speeded).
**Refs.** McWeeny et al. (2022); Koponen et al. (2017); Schrank et al. (2014, WJ-IV).

### A5 · Attentional Control
**Definition.** Voluntarily directing and *sustaining* focus, resisting distraction/interference (executive/controlled attention; sustained + selective).
**Why it matters (STEM).** Sustained attention predicts real-world reading/math skills (Keller et al., 2023); the clinical extreme (ADHD) shows medium EF/vigilance deficits and academic underachievement (Willcutt et al., 2005). Engle's account treats controlled attention as the *core of working-memory capacity itself*.
**Measured by.** Continuous Performance Tests (Conners CPT-3 ages 8+; T.O.V.A. ages 4+); Flanker / Attention Network Test (child versions); NIH Toolbox Flanker (ages 3+); plus teacher/parent rating (Conners, SWAN, Vanderbilt).
**Feasibility.** **T1** for performance tasks (flanker, go/no-go — native digital, auto-scored); **T2** via brief teacher/parent rating. *Recommendation:* pair a short flanker/go-no-go with a brief rating for convergent measurement.
**Quantification.** Continuous **0–10** (interference cost / vigilance normed).
**Overlap.** Very high with Gwm (executive-attention account) — strongest parsimony concern; consider modeling attention + Gwm as one executive-control factor unless data separate them.
**Refs.** Keller et al. (2023); Willcutt et al. (2005); Engle (2002).

---

## 7. Domain B — Verbal & Knowledge Foundations

### B1 · Crystallized / Verbal Knowledge (Gc)
**Definition.** Breadth/depth of acquired, culturally transmitted knowledge — vocabulary, general information, verbal comprehension.
**Why it matters (STEM).** Carries much of IQ's predictive power (verbal/mixed tests out-predict nonverbal: ρ≈.53/.60 vs .44; Roth et al., 2015). Underpins reading problem statements and acquiring technical vocabulary. **Fairness caveat:** Gc partly indexes prior schooling/SES (opportunity-to-learn), not pure aptitude.
**Measured by.** WISC-V Verbal Comprehension (Similarities, Vocabulary); WJ-IV Comprehension-Knowledge; PPVT-5 (receptive vocabulary, 2:6–90+).
**Feasibility.** **T2** — multiple-choice receptive-vocabulary/knowledge probes auto-score; expressive/oral definitions are T3.
**Quantification.** Continuous **0–10** (age-normed).
**Overlap.** Moderate with Gf (investment theory: Gf builds Gc over time); high with reading outcomes.
**Refs.** Roth et al. (2015); Cattell (1963); Schneider & McGrew (2018).

### B2 · Reading Comprehension
**Definition.** Extracting/constructing meaning from text. Under the Simple View: **Comprehension = Decoding × Language Comprehension** (Gough & Tunmer, 1986).
**Why it matters (STEM).** A gate on STEM: it predicts math **word-problem** performance even after controlling for technical reading (Vilenius-Tuohimaa et al., 2008), and governs access to dense science text. Weak readers are disadvantaged on word problems even when calculation is intact.
**Measured by.** Gates-MacGinitie (K–12+); WJ Passage Comprehension (cloze; T3); Maze/Cloze CBM (AIMSweb, easyCBM, DIBELS Maze; grades 1–8+); Lexile for adaptive text-matching.
**Feasibility.** **T1/T2** — maze/cloze and adaptive MC comprehension are objectively scorable and built for scale; open constructed-response and oral fluency need ASR/human scoring.
**Quantification.** Continuous **0–10** (normed) or Lexile mapped to band.
**Overlap.** Strong with Gc and language comprehension; gates B3 and math word problems.
**Refs.** Gough & Tunmer (1986); Vilenius-Tuohimaa et al. (2008); Fuchs et al. (word problems as text comprehension).

### B3 · Prior STEM Domain Knowledge
**Definition.** The organized domain-specific knowledge (facts, concepts, schemas, procedures) a learner already holds in the target STEM area.
**Why it matters (STEM).** Among the strongest determinants of new learning; early math skill is the **single strongest predictor** of later achievement across six longitudinal datasets (Duncan et al., 2007). Drives "Matthew effects" — early advantages compound (Stanovich, 1986). **Honest nuance:** measured effect size is sensitive to how prior knowledge is assessed (Dochy et al., 1999); avoid circularity by testing *prerequisite* content, then predicting *new* content.
**Measured by.** Adaptive pretests / knowledge-space placement tests; CBM; interim/adaptive achievement tests — all per topic/unit.
**Feasibility.** **T1** — an adaptive knowledge-map pretest simultaneously measures prior knowledge *and* places the learner. This is central to a tutoring product's value.
**Quantification.** **Per-skill mastery** (ordinal: Not yet / Developing / Proficient / Mastered) plus a **proficiency %** per topic — *not* a single global 0–10 (a knowledge map, not one number).
**Overlap.** Overlaps Gc; near-tautological with current domain achievement (guard against circularity).
**Refs.** Duncan et al. (2007); Dochy et al. (1999); Stanovich (1986).

---

## 8. Domains C–E (STEM aptitudes, regulation, motivation)

### Domain C — STEM-Specific Aptitudes

**C1 · Number Sense / Quantitative Reasoning.**
*Definition.* Intuitive grasp of quantity — the Approximate Number System (nonsymbolic magnitude) plus symbolic number knowledge (numerals, number-line estimation).
*Why (STEM).* ANS acuity correlates with math achievement **independent of IQ** (Halberda et al., 2008); symbolic magnitude comparison is the stronger predictor (**r≈.30** vs .24 nonsymbolic; Schneider et al., 2017); number-line estimation predicts math (r≈.45 in early grades; Siegler & Booth, 2004).
*Measured by.* Nonsymbolic dot comparison (Panamath, ~3–4+), symbolic comparison (~5+), number-line estimation (~5+ through adolescence) — all touchscreen-friendly.
*Feasibility.* **T1** — canonical short digital tasks, auto-scored by accuracy/Weber fraction/estimation error. Prioritize symbolic tasks (more efficient predictor).
*Quantification.* Continuous **0–10** (normed).
*Overlap.* Feeds math problem-solving; number-line shares variance with spatial ability.

**C2 · Spatial Ability.** ⭐ *High-leverage.*
*Definition.* Generating, retaining, and transforming visual-spatial representations (mental rotation, spatial visualization, spatial working memory).
*Why (STEM).* Adolescent spatial ability predicts entry/success in STEM — especially physics, engineering, chemistry — **with incremental validity beyond math and verbal ability** (Wai, Lubinski & Benbow, 2009, Project TALENT, ~400k tracked 11+ yrs). It is a "sleeping giant" standard testing misses. And it is **malleable**: training g ≈ **0.47**, durable and transferable (Uttal et al., 2013). Predictive + trainable + measurable = a rare trifecta.
*Measured by.* Vandenberg-Kuse Mental Rotation Test (KR-20≈.88, ~10+); Revised PSVT:R (α≈.86, ages 13+); ETS Paper Folding (VZ-2); Corsi block (spatial WM, ~5+). *(Watch instrument copyright.)*
*Feasibility.* **T1** — mental rotation, paper folding, Corsi are canonical computerized tasks with objective latency/accuracy scoring.
*Quantification.* Continuous **0–10** (normed).
*Overlap.* Related to but distinct from Gf (a separate CHC ability, Gv), yet adds STEM prediction beyond it.

**C3 · Scientific Reasoning.**
*Definition.* Generating and evaluating knowledge through inquiry: control-of-variables strategy (CVS), hypothesis testing, evidence–theory coordination.
*Why (STEM).* CVS is concrete and **teachable early**, and instruction method matters — direct instruction produced mastery in far more children than discovery, with equivalent transfer (Klahr & Nigam, 2004). Scientific-thinking skills develop across elementary/middle school and are improvable (Zimmerman, 2007).
*Measured by.* Lawson's Classroom Test of Scientific Reasoning (LCTSR; 24-item MC, grades ~7–college; classifies concrete/transitional/formal); interactive CVS experiment-design tasks (Klahr paradigm, grades ~2–8); evidence-evaluation vignettes.
*Feasibility.* **T1/T2** — Lawson's test is MC and auto-scorable; CVS digitizes naturally as an experiment-design widget that detects confounding.
*Quantification.* **Ordinal developmental level** (Concrete / Transitional / Formal) — optionally a 0–10 overlay. This is genuinely a stage construct, not a smooth scale.
*Overlap.* Correlates with Gf and prior knowledge; partly domain-general (CVS transfers), partly knowledge-dependent.

### Domain D — Executive Function & Metacognitive Regulation

**D1 · Executive Function (Inhibition + Cognitive Flexibility).**
*Definition.* Top-down control: **inhibitory control** (suppress prepotent responses / resist interference) and **cognitive flexibility** (shift between rules/perspectives). (Working-memory updating is absorbed into A2.)
*Why (STEM).* EF robustly predicts achievement (elementary meta-analysis N≈64,167); **inhibition** relates consistently to math/reading, useful for overriding intuitive-but-wrong answers (misconceptions). **Honest flag:** the *shifting/flexibility* facet is the weakest — it did **not** consistently predict achievement (Best et al., 2011) — so down-weight it.
*Measured by.* Flanker, Stroop (child/animal versions for pre-readers), Go/No-Go (inhibition, ~4+); Dimensional Change Card Sort (flexibility, ~3–7); task-switching (older). Aggregate multiple tasks — single tasks are psychometrically weak (task-impurity problem).
*Feasibility.* **T1** — brief, language-light, touchscreen-friendly, auto-scored *as a composite*.
*Quantification.* Continuous **0–10** composite (report inhibition and flexibility sub-scores; weight flexibility lower).
*Overlap.* Correlated with Gf, Gs, and attentional control; inhibition overlaps conscientiousness.

**D2 · Metacognition & Self-Regulated Learning (SRL).**
*Definition.* Knowing about and regulating one's own learning: metacognitive knowledge/regulation (Flavell) operating through Zimmerman's forethought → performance → reflection cycle.
*Why (STEM).* The stronger half of SRL's achievement link — **metacognition r≈.20** vs. cognitive strategies r≈.11 (Dent & Koenka, 2016). Directly enables STEM problem-solving (strategy selection, checking work).
*Measured by.* Jr. Metacognitive Awareness Inventory (grades 3–9); MSLQ subscales (secondary+); think-aloud (gold standard but T3); **behavioral trace data** (help-seeking, revision, self-testing, time allocation). **Caveat:** self-report is unreliable below ~grade 3.
*Feasibility.* **T1/T2** — best captured for young learners via **behavioral telemetry** (a digital-product advantage that sidesteps the self-report problem); self-report questionnaires for older students.
*Quantification.* Continuous **0–10** composite (trace + self-report), reported with a confidence flag when self-report-only.
*Overlap.* Shares variance with conscientiousness and with D3 calibration; nested with SRL.

**D3 · Monitoring Calibration.**
*Definition.* Correspondence between a student's confidence and actual performance: **bias** (over/under-confidence) and **resolution** (discriminating correct from incorrect).
*Why (STEM).* Poor calibration → poor study decisions (stopping too early, misplaced confidence on math/physics items). Monitoring accuracy is modest even in good learners (relative accuracy ~r≈.24; Schraw, 2009), and it adds *incremental* signal beyond the achievement score (a low performer can still be well-calibrated).
*Measured by.* Item-level confidence judgments + auto-scored accuracy → compute bias, absolute calibration, resolution/gamma. Feasible with children (e.g., fifth-graders).
*Feasibility.* **T1** — arguably the most product-friendly metacognition measure: confidence slider + auto-scored answer, zero human coding. Embed in the STEM item stream.
*Quantification.* **Bias + resolution pair.** Bias = signed category {Overconfident / Well-calibrated / Underconfident} (or −5..+5); Resolution = 0–10. Not a single number.
*Overlap.* Behavioral index of D2 monitoring.

### Domain E — Motivation, Affect & Disposition

All Domain-E constructs are primarily **self-report** (except E6). Below ~grade 3–4, prefer **informant (teacher/parent) report** and simplified/pictorial items; all self-report is fakeable and social-desirability-prone (mindset and grit especially — which is one more reason grit is absorbed, §4.2).

**E1 · Academic Self-Efficacy.**
*Definition.* Task/domain-specific belief in one's capability to succeed at a given academic task (Bandura) — distinct from global self-esteem.
*Why (STEM).* **Self-efficacy–performance r≈.38** (Multon et al., 1991); moderate and robust (Honicke & Broadbent, 2016); malleable via mastery experiences. Reciprocal with achievement (predictor *and* outcome).
*Measured by.* Domain-specific efficacy scales; MSLQ self-efficacy subscale; PALS; measured best *just before* a task, anchored to real task difficulty.
*Feasibility.* **T2** — short, task-anchored self-report embeds cleanly.
*Quantification.* Continuous **0–10** (domain-specific, e.g., separate math vs. science).
*Overlap.* High with SDT competence (E2) and motivation; most task-specific, thus often most predictive of the cluster.

**E2 · Motivation Quality (Self-Determination Theory).**
*Definition.* *Quality* of motivation on an autonomy continuum — intrinsic/identified (autonomous) vs. introjected/external (controlled) — driven by satisfaction of autonomy, competence, relatedness needs.
*Why (STEM).* Autonomous motivation predicts deeper (conceptual vs. rote) learning, persistence, and STEM course-taking; autonomy-supportive teaching is a robust lever (Ryan & Deci, 2020). Effects are moderate and context-dependent.
*Measured by.* Academic Self-Regulation Questionnaire (SRQ-A); Intrinsic Motivation Inventory; Basic Psychological Needs scales; math/science-specific adaptations.
*Feasibility.* **T2** — brief need-satisfaction / motivation batteries; simplify for <8s.
*Quantification.* **Relative Autonomy Index as 0–10** *plus* a **dominant-type profile label** {Autonomous / Mixed / Controlled / Amotivated}. Quality ≠ quantity, so report the profile, not just a magnitude.
*Overlap.* Competence need ≈ self-efficacy (E1); drives engagement (E6). Manage collinearity.

**E3 · Conscientiousness (absorbs Grit).**
*Definition.* Big-Five trait: organized, disciplined, achievement-striving, dependable, persevering.
*Why (STEM).* **The strongest Big-Five predictor of achievement, r≈.22**, largely independent of intelligence (Poropat, 2009); strongest at primary/secondary levels. Absorbs grit, whose perseverance facet does the predictive work (Credé et al., 2017).
*Measured by.* Youth Big-Five (BFI-2 and child/adolescent adaptations, BFQ-C, IPIP); **informant report recommended under ~age 10.**
*Feasibility.* **T2** (self-report) with **informant-report** option for young children.
*Quantification.* Continuous **0–10**.
*Overlap.* Near-redundant with grit; overlaps SRL effort-regulation and inhibition.

**E4 · Openness / Curiosity (absorbs Need for Cognition).**
*Definition.* Intellectual curiosity, imagination, preference for novelty/complexity and effortful thinking.
*Why (STEM).* Smaller positive achievement correlation (r≈.10–.12; stronger at primary level; Poropat, 2009); supports engagement with challenging/novel STEM content and deep processing.
*Measured by.* Youth Big-Five Openness facets; curiosity scales; (NFC folded in).
*Feasibility.* **T2** (self-report / informant).
*Quantification.* Continuous **0–10** (lower priority parameter).
*Overlap.* High with Need for Cognition and intrinsic motivation/curiosity.

**E5 · Academic / Math Anxiety.**
*Definition.* Tension, apprehension, or fear that interferes with performance in evaluative or numerical situations — a **worry** (cognitive) and **emotionality** (arousal) component. Math anxiety is the STEM-specific, domain-relevant form; test anxiety is the general variant.
*Why (STEM).* **Math anxiety–achievement r≈−.28** (Barroso et al., 2021, 223 studies); it consumes working-memory resources and drives a math-avoidance → lower-competence loop (Ashcraft, 2002). High product relevance: anxiety can also bias the very scores you collect.
*Measured by.* Abbreviated Math Anxiety Scale (AMAS, 9 items — ideal); MARS-E/MARS-A; SEMA (early); test-anxiety inventories (TAI, CTAS). Pair with in-task behavioral markers (latency/avoidance).
*Feasibility.* **T2** — AMAS is short and deployable; severe cases warrant clinical *referral*, not product scoring.
*Quantification.* Continuous **0–10** (higher = more anxiety; treat as a risk flag, reverse-signed for "readiness").
*Overlap.* Related to test anxiety, Neuroticism; negatively to math self-efficacy. Earns its place via STEM domain-specificity.

**E6 · Academic Engagement (behavioral).**
*Definition.* Active involvement in learning — behavioral (participation, effort, on-task persistence), emotional (interest/belonging), cognitive (strategic investment).
*Why (STEM).* A strong proximal predictor of achievement and persistence; behavioral engagement is typically the strongest dimension and is the **most digitally instrumentable** construct in this cluster.
*Measured by.* Behavioral **trace data** (time-on-task, completion, help-seeking, latency) — objective; plus self-report for emotional/cognitive dimensions (EvsD, SEI, School Engagement Measure).
*Feasibility.* **T1** (behavioral telemetry) — best-in-cluster for a digital product; **T2** for emotional/cognitive dimensions.
*Quantification.* Continuous **0–10** (behavioral index from telemetry).
*Overlap.* The observable output of motivation (E1/E2) — treat as outcome-proximal; **do not double-count** as an independent predictor.

---

## 9. Parsimony and correlation structure

The parameters are not independent. Model them as a correlated structure with a few latent factors, or predictive multicollinearity and false "insight" will result.

| Cluster to watch | Members | Guidance |
|---|---|---|
| **Executive/reasoning core** | Gf (A1), Working Memory (A2), Attentional Control (A5), EF-inhibition (D1) | Latent Gf↔WM r≈.72. Model as a shared factor; report facets for diagnosis, not as independent predictors. |
| **Self-regulation/diligence** | Conscientiousness (E3), SRL/metacognition (D2), (grit — absorbed) | Heavy overlap. Conscientiousness is the trait anchor; SRL is the malleable, teachable behavior. |
| **Motivation family** | Self-efficacy (E1), SDT motivation (E2), Engagement (E6), Openness (E4) | Efficacy is most task-specific/predictive; engagement is the behavioral output — avoid double-counting. |
| **Evaluative anxiety** | Math anxiety (E5), test anxiety | Related; keep math anxiety for STEM specificity. |
| **Knowledge factor** | Gc (B1), Prior Knowledge (B3), Reading (B2) | Correlated; prior knowledge is per-topic and product-central. |

**Incremental-validity principle:** add a parameter to a prediction only if it explains achievement variance *beyond* the core (g/prior-knowledge). Spatial ability (C2), learning efficiency (A4), calibration (D3), and math anxiety (E5) are valued precisely because they add signal beyond the executive/knowledge core.

---

## 10. Measurement & scoring science

**Reliability & validity (the gate).** Follow the *Standards for Educational and Psychological Testing* (AERA/APA/NCME, 2014). Validity is a unitary argument built from evidence (content, response processes, internal structure, relations to other variables, consequences). Reliability conventions: α ≥ .70 acceptable, ≥ .80 good, ≥ .90 for high-stakes individual decisions; prefer **coefficient omega (ω)** over alpha (Sijtsma, 2009; McNeish, 2018). No parameter should drive high-stakes decisions on a single short task.

**Norm-referencing.** Raw scores are not comparable across tasks/ages. Convert to age-normed standard scores (z, or standard score mean 100 / SD 15), then to percentiles, then to the 0–10 band. For parents/teachers, **percentile rank** is the most intuitive output; compute internally on a standardized metric so bands stay equal-interval.

**Why 0–10 for some, categories for others (Stevens, 1946).** A continuous 0–10 is defensible when a construct is a single, roughly interval-scaled latent dimension with adequate reliability (Gf, working memory, self-efficacy). Ordinal/profile output is correct when precision doesn't justify a fine scale, the construct is a stage (scientific reasoning), a profile (SDT motivation), or a paired index (calibration). Never do interval arithmetic (means, growth deltas) on what are really ordinal categories.

**Computerized Adaptive Testing (CAT).** Use Item Response Theory to select each next item from the student's provisional ability — precise estimates with far fewer items, ideal for keeping assessment short (Embretson & Reise, 2000).

**Stealth assessment — the scalable ideal.** Infer parameters unobtrusively from in-product behavior/log data via Evidence-Centered Design (Mislevy et al., 2003; Shute & Ventura, 2013). Shute et al. (2016) recovered problem-solving skill from gameplay, validated against Raven's. This is the natural fit for a tutoring product — but it still requires the full validity machinery; it is not a shortcut around psychometrics.

---

## 11. Feasibility tiers, limitations, and ethics

**The three feasibility tiers** (assigned per parameter in §5):
- **Tier 1 — Embedded / stealth or short game-like task.** Auto-scored from interaction or a <5-min gamified task; zero added burden; fully scalable. (Number sense, spatial, working memory, engagement, calibration, prior knowledge.)
- **Tier 2 — Brief self-report or short standardized subtest.** Low burden; relies on self-report validity or a bounded module. (Self-efficacy, conscientiousness, motivation, anxiety, a single Gf/matrix module.)
- **Tier 3 — Requires proctored/clinical assessment.** Not scalable self-serve; proxy it inside the product and be explicit about the limitation. (Full-scale IQ/g, clinical diagnoses, high-stakes certification, open oral-recall.)

**Limitations to state in any deployment:**
- **Self-report breaks down for young children** (< ~grade 3–4) and is fakeable/social-desirability-prone — use informant report and behavioral traces instead.
- **Some parameters index opportunity, not aptitude.** Crystallized knowledge and prior knowledge partly reflect SES and schooling. Never present them as fixed ability.
- **Circularity risk.** Prior knowledge and domain achievement are near-tautological — measure prerequisites, predict new content.
- **Device/administration confounds** (processing speed especially) threaten cross-student comparability — standardize.
- **Single short tasks are unreliable.** Composite and re-measure; attach a confidence estimate to every stored score (the schema supports this).

**Ethics.** These scores exist to *target support*, never to label, rank, or limit a child. Growth-oriented, malleable parameters (spatial ability, SRL, self-efficacy, prior knowledge) should be foregrounded to teachers over fixed-sounding ones. Avoid deterministic language ("low-ability"); report bands with confidence intervals and instructional implications. Comply with student-data regulations (FERPA/COPPA and local equivalents) — the schema separates identity from scores to support this.

---

## 12. Recommended next steps

1. **Build the Tier-1 core first** (the MVP-10 in §5): these give the most predictive value with the least friction and no self-report age limits.
2. **Instrument stealth assessment** for prior knowledge, engagement, and metacognition from day one — it is the product's measurement moat.
3. **Pilot and validate.** Compute reliability (ω) per parameter, check the correlation structure against §9, and confirm each parameter adds incremental validity before shipping it to teachers.
4. **Operationalize** with `02_Scoring_Rubric.md` (band anchors), `03_Data_Schema.sql` (storage), and `Student_Parameter_Framework.xlsx` (catalog + rubric + data dictionary).

*Full reference list in `References.md`. Effect sizes cited here were independently verification-checked (14/14 load-bearing citations confirmed real and accurately attributed).*
