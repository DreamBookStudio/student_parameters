# CRT Design & Self-Report Scales — D1, E1, E2, E3, E5, D2-self + Attention Checks

**Date:** 2026-07-13
**Feeds:** Stage 8 (D1 reflection traps) and Stage 10 (self-report block) of the 11-stage battery specified in `product/Test_Battery_Plan.md`. Item counts, formats and anchor tables below are cross-checked against that locked plan (dated same day) wherever it constrains the design.
**Population:** JEE/NEET aspirants, ages 16–19, Class 11–12 + droppers, India.

---

## 1. Cognitive Reflection Test — D1 Reflective Override

### 1.1 What the CRT measures: attribute substitution

The CRT (Frederick, 2005) does not measure intelligence or maths skill in the way an ability test does — it measures whether a respondent's **System 2** (deliberate, effortful, rule-based) catches and overrides an answer that **System 1** (fast, associative, pattern-based) generates fluently and confidently. Kahneman & Frederick's *attribute substitution* is the mechanism: each item is built so that a simpler, related attribute (e.g., "the two numbers in the problem, related by simple subtraction") **substitutes** for the actually-asked attribute (e.g., "the value that satisfies both constraints simultaneously"). The substituted answer feels correct — it is fluent, requires no effortful check, and is wrong. Reflective responders are the ones who notice the fluent answer doesn't fully satisfy the problem and re-derive it properly.

This is why every well-built CRT item has **exactly one dominant "lure"** (the System-1 answer) rather than being merely "a hard problem" — a hard problem with no salient wrong-but-fluent answer is not a CRT item, it's a numeracy item. This distinction is the design rule that matters most for writing new items (§1.4).

### 1.2 The three classic archetypes (Frederick, 2005) — reference only, do NOT ship verbatim

These are reproduced here **only** so the design team can see the lure mechanism clearly and verify new items reproduce it faithfully. `Test_Battery_Plan.md` §Stage 8 explicitly bans shipping these verbatim ("the bat-and-ball classic is memorised by this cohort"), and Frederick's own data plus later replications (Haigh, 2016; Meyer, Zhou & Frederick, 2018) confirm 44–51%+ prior exposure in general populations — almost certainly higher in an internet-native Indian JEE/NEET coaching cohort that treats CRT items as viral puzzles.

| # | Archetype | Item (Frederick, 2005) | Correct | Lure | Lure mechanism |
|---|-----------|------------------------|:-------:|:----:|-----------------|
| 1 | **Additive / partition** ("bat-and-ball") | "A bat and a ball cost $1.10 in total. The bat costs $1.00 more than the ball. How much does the ball cost?" | $0.05 | **$0.10** | Solver substitutes "the total minus the difference" (T−d) for the correct partition (T−d)/2 — the algebra requires recognizing two unknowns tied by both a sum and a difference, and System 1 resolves it as if it were a single-unknown subtraction. |
| 2 | **Rate / invariance** ("machines") | "If it takes 5 machines 5 minutes to make 5 widgets, how long would it take 100 machines to make 100 widgets?" | 5 minutes | **100 minutes** | Solver substitutes "scale the time in proportion to the count" for the correct invariant (per-unit rate is unchanged when both machines and widgets scale together). |
| 3 | **Exponential / doubling** ("lily pads") | "In a lake, there is a patch of lily pads. Every day, the patch doubles in size. If it takes 48 days for the patch to cover the entire lake, how long would it take for the patch to cover half the lake?" | 47 days | **24 days** | Solver substitutes linear halving of the *time* for the correct exponential relationship (half-coverage is always exactly one doubling-step, i.e., one day, before full coverage). |

### 1.3 Expansion families (the archetype pool for original-item design)

Three published expansions exist specifically because the classic 3 are overexposed. Each contributes a **distinct lure archetype** beyond the three above — this is the pool to draw fresh numbers/contexts from.

**CRT-2 (Thomson & Oppenheimer, 2016)** — 4 items, deliberately **verbal/logical** rather than numeric, to reduce the numeracy confound and gender gap reported for the original CRT:

| Archetype | Item | Correct | Lure |
|---|---|:---:|:---:|
| Rank-position trick | "If you're running a race and you pass the person in second place, what place are you in?" | 2nd | **1st** |
| "All but N" linguistic trick | "A farmer had 15 sheep and all but 8 died. How many are left?" | 8 | **7** (15−8) |
| Riddle / self-reference | "Emily's father has three daughters. The first two are named April and May. What is the third daughter's name?" | Emily | **June** |
| Volume-in-empty-space trick | "How many cubic feet of dirt are there in a hole that is 3' deep x 3' wide x 3' long?" | 0 | **27** (3×3×3) |

**CRT-7 (Toplak, West & Stanovich, 2014)** — adds 4 items to the classic 3 (reliability of the 7-item composite = .72; it out-predicted a 15-task rational-thinking composite better than intelligence or executive-function measures):

| Archetype | Item | Correct | Lure |
|---|---|:---:|:---:|
| Combined-rate ("working together") | "If John can drink one barrel of water in 6 days, and Mary can drink one barrel of water in 12 days, how long would it take them to drink one barrel of water together?" | 4 days | **9 days** (naive average of 6 and 12) |
| Off-by-one counting | "Jerry received both the 15th highest and the 15th lowest mark in the class. How many students are in the class?" | 29 | **30** (naive 15+15) |
| Buy-sell-profit ledger | "A man buys a pig for $60, sells it for $70, buys it back for $80, and sells it finally for $90. How much has he made?" | $20 | **$10** or **$0** |
| Sequential percentage change | "Simon decided to invest $8,000... down 50% by July 17... up 75% from July 17 to October 17. At this point, Simon has: (a) broken even, (b) is ahead of where he began, (c) has lost money." | (c) lost money | **(a) broken even** (naively nets −50%+75%=+25%) |

**CRT-Long (Primi et al., 2015/2016)** — adds 3 more items to the classic 3 (used for IRT-based scaling):

| Archetype | Item | Correct | Lure |
|---|---|:---:|:---:|
| Rate, harder variant | "If three elves can wrap three toys in 1 hour, how many elves are needed to wrap six toys in 2 hours?" | 3 | **6** |
| Off-by-one counting (same as CRT-7) | "Jerry received both the 15th highest and 15th lowest mark..." | 29 | 30 |
| Proportion / ratio trick | "Tall members are three times more likely to win a medal than short members. The team has won 60 medals so far. How many won by short athletes?" | 15 | **20** (naive 60÷3) or **30** (naive even split) |

### 1.4 Design rules for writing ORIGINAL items (mandatory for Stage 8)

1. **Preserve the lure mechanism, replace every surface feature.** Change the numbers, names, objects, and currency — never reuse a classic's numbers with relabeled nouns (e.g., don't just rename "bat and ball" to "pen and notebook" at $1.10/$1.00 — that is isomorphic and pattern-matchable by anyone who's memorised the shape).
2. **One archetype, one dominant lure per item.** The lure must be nameable in advance (for auto-scoring) — if a pilot shows answers scattering across many wrong values with no single dominant one, the item is a numeracy item, not a CRT item; rewrite it.
3. **Ramp difficulty by making the lure more tempting, not the arithmetic harder.** Use round numbers and culturally overlearned schemas (grades, cricket, prices) so the *only* barrier is inhibiting the fluent answer — CRT is explicitly not meant to be a maths-difficulty test.
4. **Keep reading load low (≤ 40 words).** This is an inhibition test, not a comprehension test; every extra clause is a confound.
5. **Use ₹/Indian contexts where they don't distort the logic** — canteen snacks, coaching-class marks, cricket, WhatsApp/exam-rank scenarios, festivals — but do not force currency into archetypes where it doesn't belong (e.g., the volume-in-a-hole trick has no natural rupee angle; leave it unit-based).
6. **Avoid specialised financial/technical vocabulary** (the original "invest in the stock market" item needs simplifying for a 16-year-old — use a mutual-fund/pocket-money framing, not options or margins).
7. **Numeric-first.** Prefer items with a single numeric correct answer and a single numeric lure (auto-gradable, no ambiguity) over verbal-trick items (race position, family riddles, sheep) — reserve the latter for MCQ format since they don't have a natural free-entry answer.

### 1.5 Numeric-entry vs MCQ-with-lure-present

`Test_Battery_Plan.md` specifies Stage 8 items as "numeric-entry or 4-option (lure always present)." Trade-offs to engineer around:

- **Numeric entry (free response)** is the purer measure — Frederick's original CRT is open-ended. It prevents "recognition by elimination" (a reflective-*seeming* pick made just by ruling out an obviously silly option) and avoids chance guessing (~25–33% floor with 3–4 options). **Recommended as the default** for all numeric-archetype items (bat-and-ball style, rate, doubling, off-by-one, ledger, percentage-change).
- **MCQ with the lure explicitly present** is required for the verbal/logical archetypes (race position, "all but N," family riddle, volume-in-hole) since they don't have a natural typed-number answer. When used: **always include correct + lure + 1–2 plausible distractors**, never a binary correct/lure choice (binary choice inflates guessing-corrected scores and removes the "which wrong answer" diagnostic). Do **not** add a "none of these" option for these archetypes — it doesn't fit the trick-question format and adds confusion.
- Whichever format, **the lure must always be an available/possible response** — hiding it defeats the point (a person who can't produce the lure spontaneously and can't recognize it as familiar is not being tested on the substitution effect at all).

### 1.6 Scoring

- Classify every response into exactly one of **{reflective-correct, lure, other-wrong, timeout/skip}** — do not collapse to correct/incorrect. The lure-vs-other-wrong split is the entire diagnostic value add over a plain accuracy score (Toplak et al. 2014; matches `Test_Battery_Plan.md`'s explicit ask to store "lure-rate" separately for the "silly-mistake risk" narrative).
- **D1 raw (this instrument) = # reflective-correct out of N scored items** (plan: N = 6 scored + 4 spare per parallel form).
- **Lure-rate = # lure-responses ÷ N** — reported separately, not folded into the composite; drives the "distractor-trap susceptibility" readout.
- Composite D1 (per plan) = z-average of CRT reflective-correct with Stage-7 SART commission rate (both "screening-grade," wider confidence band).
- Because N is small (6), each item should be independently piloted for a clean lure-dominance pattern before being trusted in the live form (< 30 respondents is not enough to confirm one wrong answer dominates — flag all items provisional until pilot, consistent with the plan's provisional-norms stance elsewhere).

### 1.7 Twelve original items — worked answers + lures (₹/Indian contexts)

Recommended split: **items 1–6 = primary Stage-8 form; 7–10 = spare/parallel form; 11–12 = buffer/extra difficulty range.** All numeric-entry except #8–10 (verbal-trick archetypes, MCQ with lure shown).

| ID | Archetype | Item text | Correct | Lure | Notes |
|----|-----------|-----------|:-------:|:----:|-------|
| **CRT_01** | Additive/partition | "A samosa and a cold drink cost ₹66 together. The samosa costs ₹50 more than the cold drink. How much does the cold drink cost?" | **₹8** (samosa ₹58) | **₹16** (naive 66−50) | Check: 58+8=66 ✓, 58−8=50 ✓ |
| **CRT_02** | Rate/invariance | "If 6 sewing machines take 6 minutes to stitch 6 shirts, how long would 200 machines take to stitch 200 shirts?" | **6 minutes** | **200 minutes** | Per-unit rate invariant when both scale together |
| **CRT_03** | Exponential/doubling | "A funny video shared in a college WhatsApp group doubles its number of viewers every hour. If it takes 30 hours for the whole college to see it, how many hours would it take for half the college to have seen it?" | **29 hours** | **15 hours** (naive half of 30) | Answer is independent of the actual headcount |
| **CRT_04** | Combined rate ("working together") | "Priya can weed a garden plot alone in 6 hours. Rohan can weed the same plot alone in 12 hours. Working together at their own steady rates, how long will they take to finish it?" | **4 hours** | **9 hours** (naive average of 6 & 12) | Rates add: 1/6+1/12=1/4 → 4 hrs |
| **CRT_05** | Off-by-one counting | "In a class test, Ananya scored both the 8th highest and the 8th lowest mark. How many students took the test?" | **15** | **16** (naive 8+8) | n = k+k−1 |
| **CRT_06** | Buy-sell-profit ledger | "A trader buys a bicycle for ₹4,000, sells it for ₹4,500, buys it back for ₹5,000, and sells it again for ₹5,500. What is the trader's overall profit?" | **₹1,000** | **₹500** (only counts the final leg) or ₹0 | Ledger: −4000+4500−5000+5500=1000 |
| **CRT_07** | Sequential % change | "Meera invested ₹10,000 in a mutual fund. In the first 6 months its value fell 50%. In the next 6 months it then rose 60%. At year-end, has Meera: (a) broken even, (b) made a profit, (c) made a loss?" | **(c) made a loss** (final value ₹8,000) | **(a) broken even** (naive −50%+60%=+10%) | 10,000×0.5×1.6=8,000 |
| **CRT_08** (MCQ) | Rank-position trick | "In the final lap of a 400m race, Kabir overtakes the runner who was in 3rd place. What position is Kabir in now?" | **3rd** | **2nd** | Options: 1st / 2nd / **3rd** / 4th |
| **CRT_09** (MCQ) | "All but N" linguistic trick | "A canteen had 18 packets of biscuits. All but 5 were sold. How many packets are left unsold?" | **5** | **13** (naive 18−5) | Options: 5 / 13 / 18 / 23 |
| **CRT_10** (MCQ) | Volume-in-empty-space trick | "How many cubic feet of mud are there in a pit that is 4 ft deep × 4 ft wide × 4 ft long?" | **0** | **64** (naive 4×4×4) | Options: 0 / 16 / 64 / 4 |
| **CRT_11** (buffer) | Proportion/ratio trick | "In a debate club, tall members are three times as likely to win a prize as short members. The club has won 60 prizes so far. How many were won by short members?" | **15** | **20** (naive 60÷3) | 60 split 3:1 → short share = 60/4 |
| **CRT_12** (buffer) | Rate, two-quantity variant | "If 4 tailors can stitch 4 shirts in 4 hours, how many tailors are needed to stitch 8 shirts in 8 hours?" | **4** | **8** (naive: shirts doubled ⇒ tailors doubled, ignoring time also doubled) | Rate: 1 shirt/4 hr/tailor → in 8 hrs each does 2 shirts → 8÷2=4 |

---

## 2. NGSE — Academic Self-Efficacy (E1)

**Source:** Chen, G., Gully, S. M., & Eden, D. (2001). Validation of a new general self-efficacy scale. *Organizational Research Methods*, 4(1), 62–83.
**Copyright status:** Published in a subscription journal (Sage) — **not** public domain, but the 8 items are freely and extensively reproduced in open research-measurement toolkits for non-commercial research/education use (SPARQtools "Measuring Mobility" toolkit, EdInstruments). Standard academic practice is to cite Chen, Gully & Eden (2001) whenever the scale is used; no license fee is required for research/educational administration.
**Reliability:** α ≈ .85–.90 across the original validation studies; consistently replicates > .85 across cross-cultural adaptations.

### Exact item text (verbatim, 8 items)

1. I will be able to achieve most of the goals that I set for myself.
2. When facing difficult tasks, I am certain that I will accomplish them.
3. In general, I think that I can obtain outcomes that are important to me.
4. I believe I can succeed at most any endeavor to which I set my mind.
5. I will be able to successfully overcome many challenges.
6. I am confident that I can perform effectively on many different tasks.
7. Compared to other people, I can do most tasks very well.
8. Even when things are tough, I can perform quite well.

**Response anchors (5-point):** 1 = Strongly disagree, 2 = Disagree, 3 = Neither agree nor disagree, 4 = Agree, 5 = Strongly agree.

**Scoring:** E1 = mean of all 8 items (no reverse-keyed items). Range 1–5. Matches `Test_Battery_Plan.md` anchor table directly (E1 P10=3.1 … P90=4.6).

**Adaptation notes for exam-prep cohort:** All 8 items are already domain-general ("goals I set for myself," "tasks," "endeavor") — **no wording changes are needed or recommended**; altering to explicit "in JEE/NEET prep" framing would narrow the construct from *general* to *academic/domain-specific* self-efficacy (a different construct Chen et al. explicitly designed NGSE to avoid). Ship verbatim.

---

## 3. SRQ-L — Motivation Quality / SDT (E2)

**Source:** Williams, G. C., & Deci, E. L. (1996). Internalization of biopsychosocial values by medical students: A test of self-determination theory. *Journal of Personality and Social Psychology*, 70, 767–779 (original 14-item "interviewing" version). Adapted 12-item version: Black, A. E., & Deci, E. L. (2000). *Science Education*, 84, 740–756 (organic chemistry version).
**Copyright status:** Free for research use — Deci & Ryan distribute all Self-Regulation Questionnaires directly from selfdeterminationtheory.org with no license/fee, explicitly for researchers to adapt to new domains ("new research questions may require slight adaptations of the existing questionnaire... remain true to the concept and validate the adaptations fully").
**Format:** 7-point scale, 1 = not at all true, 4 = somewhat true, 7 = very true. Two subscales only: **Autonomous Regulation** (identified + intrinsic reasons) and **Controlled Regulation** (external + introjected reasons) — SRQ-L was designed with just these two "super-categories," not the full 4-way SDT breakdown.

### 3.1 Published version A — "Learning Questionnaire" (interviewing context, Williams & Deci 1996) — 14 items

Stem A: *I will participate actively in the [organ systems / interviewing] classes:*
1. Because I feel like it's a good way to improve my skills and my understanding of patients. — **Autonomous**
2. Because others would think badly of me if I didn't. — **Controlled**
3. Because learning to interview well is an important part of becoming a doctor. — **Autonomous**
4. Because I would feel bad about myself if I didn't study this approach. — **Controlled**

Stem B: *I am likely to follow my instructor's suggestions for interviewing:*
5. Because I would get a good grade if I do what he/she suggests. — **Controlled**
6. Because I believe my instructor's suggestions will help me interview effectively. — **Autonomous**
7. Because I want others to think that I am a good interviewer. — **Controlled**
8. Because it's easier to do what I'm told than to think about it. — **Controlled**
9. Because it's important to me to do well at this. — **Autonomous**
10. Because I would probably feel guilty if I didn't comply with my instructor's suggestions. — **Controlled**

Stem C: *The reason that I will continue to broaden my interviewing skills is:*
11. Because it's exciting to try new ways to work interpersonally with my patients. — **Autonomous**
12. Because I would feel proud if I continued to improve at interviewing. — **Controlled** (introjected — pride-contingent, not identified)
13. Because it's a challenge to really understand what the patient is experiencing. — **Autonomous**
14. Because it's interesting to use the interview to try to identify what disease the patient has. — **Autonomous**

Scoring key: **Autonomous = {1,3,6,9,11,13,14}** (7 items); **Controlled = {2,4,5,7,8,10,12}** (7 items). Reported subscale α ≈ .75 (controlled) / .80 (autonomous).

### 3.2 Published version B — "Reasons for Learning Questionnaire" (organic chemistry, Black & Deci 2000) — 12 items

Stem A: *I will participate actively in organic chemistry:*
1. Because I feel like it's a good way to improve my understanding of the material. — **Autonomous**
2. Because others might think badly of me if I didn't. — **Controlled**
3. Because I would feel proud of myself if I did well in the course. — **Controlled**
4. Because a solid understanding of chemistry is important to my intellectual growth. — **Autonomous**

Stem B: *I am likely to follow my instructor's suggestions for studying chemistry:*
5. Because I would get a bad grade if I didn't do what he/she suggests. — **Controlled**
6. Because I am worried that I am not going to perform well in the course. — **Controlled**
7. Because it's easier to follow his/her suggestions than come up with my own study strategies. — **Controlled**
8. Because he/she seems to have insight about how best to learn the material. — **Autonomous**

Stem C: *The reason that I will work to expand my knowledge of chemistry is:*
9. Because it's interesting to learn more about the nature of chemistry. — **Autonomous**
10. Because it's a challenge to really understand how to solve chemistry problems. — **Autonomous**
11. Because a good grade in chemistry will look positive on my record. — **Controlled**
12. Because I want others to see that I am intelligent. — **Controlled**

Scoring key: **Autonomous = {1,4,8,9,10}** (5 items); **Controlled = {2,3,5,6,7,11,12}** (7 items). Note: this published 12-item version is **not** a balanced 6+6 — it is 5 autonomous / 7 controlled.

**RAI (Relative Autonomy Index), both versions:** RAI = mean(Autonomous items) − mean(Controlled items). Ryan & Connell (1989)/Grolnick & Ryan (1989) weighted-subscale variant (for scales with 4 subscales) is: 2×Intrinsic + Identified − Introjected − 2×External; SRQ-L uses the simpler two-subscale subtraction since it only has the two super-categories.

### 3.3 Recommended 12-item (6 Autonomous + 6 Controlled) exam-prep adaptation

Neither published version is a balanced 6+6, and the task requires one for the battery's SRQ-L-short slot. The recommendation below is an **engineering adaptation, not an independently validated instrument** — built by taking the Black & Deci (2000) "chemistry" version (closest existing analogue to "studying a subject for a course/exam") as the base, dropping its most redundant controlled item, and adding one autonomous item pulled from the Williams & Deci (1996) version to reach 6+6. Every item is traceable to its source for future psychometric revalidation.

Generic stems (subject-neutral, so the same 12 items work across Physics/Chemistry/Maths/Biology prep):

**Stem A — *I put in effort on my exam preparation (studying, practice problems, attending class):***
- SRQL_01 (Autonomous, source chem-1): Because it's a good way to improve my understanding of the material.
- SRQL_02 (Controlled, source chem-2): Because others might think badly of me if I didn't.
- SRQL_03 (Controlled, source chem-3): Because I would feel proud of myself if I did well.
- SRQL_04 (Autonomous, source chem-4): Because a solid understanding of these subjects matters for my growth, not just the exam.

**Stem B — *I am likely to follow my teacher's/mentor's suggestions for how to study:***
- SRQL_05 (Controlled, source chem-5): Because I would get a bad result if I didn't do what they suggest.
- SRQL_06 (Controlled, source chem-6): Because I am worried that I am not going to perform well.
- SRQL_07 (Controlled, source chem-7): Because it's easier to follow their suggestions than work out my own study strategy.
- SRQL_08 (Autonomous, source chem-8): Because they seem to have real insight about how best to learn the material.
- SRQL_09 (Autonomous, source interviewing-9, new): Because it's important to me personally to do well at this.

**Stem C — *The reason I keep working to expand my knowledge of these subjects is:***
- SRQL_10 (Autonomous, source chem-9): Because it's interesting to learn more about how these subjects work.
- SRQL_11 (Autonomous, source chem-10): Because it's a challenge to really understand how to solve these problems.
- SRQL_12 (Controlled, source chem-12): Because I want others to see that I am intelligent.

**Final tally: Autonomous = {01, 04, 08, 09, 10, 11} = 6. Controlled = {02, 03, 05, 06, 07, 12} = 6.** (Dropped chem-11 "good grade will look positive on my record" — redundant with SRQL_05's grade-driven external framing.)

**Adaptation notes for exam-prep context:**
- Keep the **7-point "not at all true / very true" format** — collapsing to 5-point loses resolution on a construct where the middle categories carry real signal (mixed motivation is extremely common in coaching-driven prep).
- The coaching-institute reality (parent/institute-driven schedules) makes SRQL_07 ("easier to follow their suggestions than work out my own strategy") an unusually high-signal item for this cohort — do not cut it despite it reading as a slightly unusual "reason."
- RAI profile classes (already locked in `Test_Battery_Plan.md`): RAI ≥ +1 → `Autonomous`; −1 < RAI < +1 → `Mixed`; RAI ≤ −1 → `Controlled`; both subscale means < 3 → `Amotivated` (overrides — this scale has no dedicated amotivation items, so use the low-both-means rule as the proxy, consistent with SRQ-L's own design precedent of dropping amotivation for two-subscale versions).

---

## 4. Mini-IPIP Conscientiousness (E3)

**Source:** Donnellan, M. B., Oswald, F. L., Baird, B. M., & Lucas, R. E. (2006). The Mini-IPIP scales: Tiny-yet-effective measures of the Big Five factors of personality. *Psychological Assessment*, 18, 192–203. Item pool: International Personality Item Pool (Goldberg, 1999), ipip.ori.org.
**Copyright status:** **Public domain.** IPIP is explicitly a free, public-domain personality-item repository — no permission or fee required for any use, commercial or research.
**Reliability:** α = .69 (Conscientiousness factor, per the official IPIP scoring key; Donnellan et al. report an average ≈ .70 across 5 validation samples, range ~.59–.77).

### Exact item text (verbatim, 4 items)

1. Get chores done right away. *(+ keyed)*
2. Like order. *(+ keyed)*
3. Often forget to put things back in their proper place. *(− keyed / REVERSE)*
4. Make a mess of things. *(− keyed / REVERSE)*

**Reverse-keyed: items 3 and 4.**

**Instructions (official IPIP preamble):** "Below are phrases describing people's behaviors. Please use the rating scale below to describe how accurately each statement describes you. Describe yourself as you generally are now, not as you wish to be in the future. Describe yourself as you honestly see yourself, in relation to other people you know of the same sex as you are, and roughly your same age. Please read each statement carefully, and put a number from 1 to 5 next to it to describe how accurately the statement describes you."

**Response anchors (5-point):** 1 = Very inaccurate, 2 = Moderately inaccurate, 3 = Neither inaccurate nor accurate, 4 = Moderately accurate, 5 = Very accurate.

**Scoring:** reverse-score items 3 and 4 (6 − x), then E3 = mean of all 4. Range 1–5. Matches `Test_Battery_Plan.md` anchor table (E3 P10=2.4 … P90=4.4).

**Adaptation notes:** Items are commonly implemented either as bare phrases (official IPIP key page format above) or with an explicit "I ___" prefix (e.g., "I get chores done right away") for clarity. **Recommend the explicit "I ___" prefix** for this cohort — 16-year-olds reading quickly on a phone benefit from the subject being spelled out rather than implied by the instructions block. No other wording changes needed; the construct (orderliness/dutifulness) transfers directly to exam-prep discipline without adaptation.

---

## 5. AMAS — Exam Anxiety (E5)

**Source:** Hopko, D. R., Mahadevan, R., Bare, R. L., & Hunt, M. K. (2003). The Abbreviated Math Anxiety Scale (AMAS): Construction, validity, and reliability. *Assessment*, 10(2), 178–182.
**Copyright status:** Published in a subscription journal (Sage's *Assessment*) — **not** formally public domain/CC-licensed. However, the 9-item text is widely and freely reproduced (with full attribution) across many open-access validation/translation studies (ERIC EJ1157604 Spanish validation; Cipora et al. 2015 *Frontiers in Psychology* Polish validation; PMC Japanese validation), which is the established norm for research/educational reuse of this scale. Cite Hopko et al. (2003) on use.
**Structure:** 2 subscales — **Learning Math Anxiety (LMA)**, 5 items (anxiety while studying/being taught) and **Math Evaluation Anxiety (MEA)**, 4 items (anxiety while being tested). Original reliabilities: LMA α = .85, MEA α = .88 (2-week test-retest .78/.83). Original norm: mean = 23.2, SD = 5.8 (N=1,239 undergraduates).

### 5.1 Exact original item text (math-specific, verbatim, 9 items)

**LMA (5 items):**
1. Having to use the tables in the back of a math book.
2. Watching a teacher work an algebraic equation on the blackboard.
3. Listening to a lecture in math class.
4. Listening to another student explain a math formula.
5. Starting a new chapter in a math book.

**MEA (4 items):**
6. Thinking about an upcoming math test one day before.
7. Taking an examination (quiz) in a math course.
8. Being given a homework assignment of many difficult problems which is due the next class meeting.
9. Being given a "pop" quiz in a math class.

**Response anchors (5-point):** 1 = Low anxiety … 5 = High anxiety (each item asks "how anxious would this make you feel?").

**Scoring:** E5 = sum of all 9 items. Range 9–45 (no reverse-keyed items). **+1 SD cutoff ≈ 23.2 + 5.8 = 29** — total score ≥ 29 flags elevated exam anxiety. This lines up closely with `Test_Battery_Plan.md`'s own literature-derived anchor table (P75=26, P90=31; the plan's risk rule "AMAS ≥ ~+1 SD → riskFlag" sits almost exactly between those two anchors, cross-validating the anchor table's construction).

### 5.2 Adapted generic exam/test wording (recommended for this battery)

`Test_Battery_Plan.md` specifies E5 must use "generic exam/test wording (no track-specific anchoring, since track isn't collected)" — JEE covers Physics/Chemistry/Maths, NEET covers Physics/Chemistry/Biology, so "math" framing throughout would misfit half the intended items' spirit for NEET-track Biology-heavy anxiety. Structure (LMA triggers vs MEA triggers) is preserved exactly; only the subject-specific nouns are genericized.

**LMA (5 items):**
1. AMAS_01 — Having to look up a formula, constant, or value in the reference tables at the back of your textbook.
2. AMAS_02 — Watching a teacher solve a problem step-by-step on the board.
3. AMAS_03 — Listening to a lecture in a class you find difficult.
4. AMAS_04 — Listening to a classmate explain a concept or method you haven't understood yet.
5. AMAS_05 — Starting a new, unfamiliar chapter in your textbook.

**MEA (4 items):**
6. AMAS_06 — Thinking about an upcoming exam one day before you take it.
7. AMAS_07 — Taking an important exam or test.
8. AMAS_08 — Being given a set of many difficult problems to complete before the next class.
9. AMAS_09 — Being given a surprise ("pop") test or quiz in class.

Keep the 5-point "low anxiety → high anxiety" anchors and 9–45 scoring range unchanged; the +1 SD ≈ 29 cutoff is a provisional literature anchor (from the math-specific original norm) and should be explicitly labeled "provisional — replace at pilot" per the plan's norms policy, since the adapted wording + Indian cohort will shift the true distribution somewhat.

---

## 6. MSLQ Metacognitive Self-Regulation (D2-self)

**Source:** Pintrich, P. R., Smith, D. A. F., Garcia, T., & McKeachie, W. J. (1991). *A Manual for the Use of the Motivated Strategies for Learning Questionnaire (MSLQ)*. ERIC Document Reproduction Service No. ED338122, National Center for Research to Improve Postsecondary Teaching and Learning, University of Michigan. Companion psychometric paper: Pintrich, Smith, Garcia & McKeachie (1993), *Educational and Psychological Measurement*, 53(3), 801–813.
**Copyright status:** Public ERIC manual (US government/NCRIPTAL-funded), freely downloadable in full (archive.org/details/ERIC_ED338122); standard practice is unrestricted use in research/education with citation.
**Reliability:** α = .79 for the 12-item Metacognitive Self-Regulation subscale (confirmed directly from the primary 1991 manual's own descriptive-statistics section).
**Original format:** 7-point scale, 1 = not at all true of me, 7 = very true of me.

### Exact item text (verbatim, 12 items, with original MSLQ item numbers)

| # | Item text | Process | Keying |
|---|-----------|---------|--------|
| 33 | During class time I often miss important points because I'm thinking of other things. | (attention lapse) | **REVERSE** |
| 36 | When reading for this course, I make up questions to help focus my reading. | Planning | + |
| 41 | When I become confused about something I'm reading for this class, I go back and try to figure it out. | Monitoring/regulating | + |
| 44 | If course readings are difficult to understand, I change the way I read the material. | Regulating | + |
| 54 | Before I study new course material thoroughly, I often skim it to see how it is organized. | Planning | + |
| 55 | I ask myself questions to make sure I understand the material I have been studying in this class. | Monitoring | + |
| 56 | I try to change the way I study in order to fit the course requirements and the instructor's teaching style. | Regulating | + |
| 57 | I often find that I have been reading for this class but don't know what it was all about. | Monitoring (failure) | **REVERSE** |
| 61 | I try to think through a topic and decide what I am supposed to learn from it rather than just reading it over when studying for this course. | Planning | + |
| 76 | When studying for this course I try to determine which concepts I don't understand well. | Monitoring | + |
| 78 | When I study for this class, I set goals for myself in order to direct my activities in each study period. | Planning | + |
| 79 | If I get confused taking notes in class, I make sure I sort it out afterwards. | Monitoring/regulating | + |

**Reverse-keyed: items 33 and 57.**

### 6.1 Recommended 6-item short form (planning + monitoring only) for D2-self

Per `Test_Battery_Plan.md` (Stage 10: "6 MSLQ-adapted planning/monitoring items"), select the 6 cleanest planning/monitoring items, explicitly **excluding** the two reverse-keyed items (33, 57 — reverse items raise misreading risk disproportionately in short self-report forms for this age group) and the three pure "regulating" items (41, 44, 56 — a distinct sub-process, and partly redundant with the retained items):

| ID | Original # | Item text | Process |
|----|:---:|-----------|---------|
| MSLQ_01 | 54 | Before I study new course material thoroughly, I often skim it to see how it is organized. | Planning |
| MSLQ_02 | 61 | I try to think through a topic and decide what I am supposed to learn from it rather than just reading it over when studying for this course. | Planning |
| MSLQ_03 | 78 | When I study for this class, I set goals for myself in order to direct my activities in each study period. | Planning |
| MSLQ_04 | 55 | I ask myself questions to make sure I understand the material I have been studying in this class. | Monitoring |
| MSLQ_05 | 76 | When studying for this course I try to determine which concepts I don't understand well. | Monitoring |
| MSLQ_06 | 79 | If I get confused taking notes in class, I make sure I sort it out afterwards. | Monitoring |

Clean 3 planning + 3 monitoring split, no reverse-keyed items, all six generalize to any subject without rewording (only "this course/class" needs no change — students will naturally read it as their overall exam prep).

**Adaptation notes:**
- **Format:** original MSLQ is 7-point; for consistency with the rest of Stage 10 (NGSE, Mini-IPIP, AMAS all 5-point), **recommend collapsing to a 5-point "not at all true of me (1) → very true of me (5)" scale** for this battery. Suggested mapping for any cross-study comparison: treat 5-point response r as equivalent 7-point ≈ 1 + (r−1)×6/4.
- D2 composite (per plan): D2-self (this 6-item mean) is weighted 0.4 against the 0.6-weighted behavioural telemetry index — so absolute scale range matters less than rank-ordering, which is preserved under the 5-point collapse.

---

## 7. Attention-check design

**Sources:** Kung, F. Y. H., Kwok, N., & Brown, D. J. (2018). Are attention check questions a threat to scale validity? *Applied Psychology*, 67(2), 264–283. Meade, A. W., & Craig, S. B. (2012). Identifying careless responses in survey data. *Psychological Methods*, 17(3), 437–455.

### 7.1 Key findings

- **Kung, Kwok & Brown (2018)** ran two studies (instructed-response items; instructional manipulation check) testing whether embedding attention checks distorts responses to a well-validated scale. Result: **no evidence of a validity threat** — scale means and measurement invariance were unaffected by the presence of attention checks. This directly answers the standard worry that checks "prime a deliberative mindset" that changes how people answer surrounding Likert items — the worry is not supported empirically, so checks can be used without hedging the self-report scores around them.
- **Meade & Craig (2012)** established that careless responding shows up as **two distinct patterns** — random responding and non-random (e.g., straight-lining) responding — that need different detection methods. Recommendation: **don't rely on a single instructed-response item alone**; combine it with (a) consistency indices (correlated item pairs / psychometric synonyms), (b) multivariate outlier detection (e.g., Mahalanobis distance across the Likert block), and (c) using identified rather than fully anonymous responses where feasible, all of which raise detection sensitivity beyond one check item.

### 7.2 Recommended design (matches what's already locked in `Test_Battery_Plan.md` Stage 10 — validated below against the literature)

The plan specifies exactly **2 attention checks**: one **instructed-response item** ("Select 'Agree' for this item") and one **infrequency item** ("I have never used a phone"), at **positions ~12 and ~28** within the 35-item + 2-check Stage-10 block. This design is well-supported:

- **Instructed-response item** (e.g., *"To show you are reading carefully, please select 'Agree' for this statement."*) — the most common and best-validated check type; directly actionable to auto-score (pass/fail is unambiguous).
- **Infrequency item** (e.g., *"I have never used a phone."*) — a bogus/implausible statement that should be near-universally disagreed with; catches straight-lining and random responding that an instructed-response item alone can miss (per Meade & Craig's two-pattern finding), since a straight-liner who happens to land on "agree" by chance would still fail an infrequency item phrased to require "disagree."
- **Positioning ~1/3 and ~4/5 through the block** (≈ items 12 and 28 of 37) is good practice: not clustered at the very start (before fatigue/carelessness has a chance to set in, reducing sensitivity) or the very end (misses carelessness that developed earlier), and spaced far enough apart that passing one doesn't cue vigilance for the other.
- **Exclusion rule (already locked in the plan):** failing **either** check flags the **entire self-report block invalid** — axes (E1, E2, E3, E5, D2-self) are omitted from the radar and JSON carries nulls + a flag, never a fabricated number. This is a strict binary rule rather than "fail ≥2 of N," which is defensible here specifically *because* there are only 2 checks (Meade & Craig's multi-method redundancy argument applies to the number and diversity of checks, not to raising the failure threshold when only 2 are used) — with just one instructed-response and one infrequency item, either single failure is already meaningful evidence of inattention, and Kung et al.'s finding that checks don't distort valid responses means there is no validity cost to enforcing a strict rule on the few students who do fail.
- **Do not announce that self-report responses are being checked for attention** (beyond the two checks reading naturally as normal-seeming items) — this preserves the naturalistic response set the checks are meant to audit, consistent with the same "don't tip off the trap" principle used for the CRT block (§1.5) and the plan's own SART/CRT conduct rules.
- **Supplementary, no extra items needed:** the plan's existing whole-session telemetry (tab-blur count, response-time outliers, skip patterns — already logged for D2/E6/D3) doubles as the "consistency/outlier" layer Meade & Craig recommend pairing with instructed-response items, so no additional in-scale items are needed to reach good detection coverage.

---

## Sources

- [Cognitive Reflection and Decision Making — Frederick (2005), full PDF](https://psych.fullerton.edu/mbirnbaum/psych466/articles/Frederick_CRT_2005.pdf)
- [Cognitive reflection test — Wikipedia](https://en.wikipedia.org/wiki/Cognitive_reflection_test)
- [Assessing miserly information processing: An expansion of the Cognitive Reflection Test — Toplak, West & Stanovich (2014), full PDF](http://keithstanovich.com/Site/Research_on_Reasoning_files/Toplak_West_Stanovich_14.pdf)
- [Investigating an alternate form of the cognitive reflection test — Thomson & Oppenheimer (2016), Judgment and Decision Making](https://www.cambridge.org/core/journals/judgment-and-decision-making/article/investigating-an-alternate-form-of-the-cognitive-reflection-test/42F4F70E998C63952D26DF2F4EBEA59E)
- [Cognitive Reflection Test & Alternatives — Matthew R. Arp, LISPOP methods note (reproduces exact CRT-2/CRT-7/CRT-Long item text)](https://lispop.ca/wp-content/uploads/2021/07/Arp-CRT-Methods-Note.pdf)
- [Has the Standard Cognitive Reflection Test Become a Victim of Its Own Success? — Haigh (2016)](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5225989/)
- [New General Self-Efficacy Scale — SPARQtools reproduction of Chen, Gully & Eden (2001), full item text + scoring](https://sparqtools.org/wp-content/uploads/2022/10/New-General-Self-Efficacy-Scale.pdf)
- [Validation of a New General Self-Efficacy Scale — Chen, Gully & Eden (2001), SAGE](https://journals.sagepub.com/doi/10.1177/109442810141004)
- [New General Self-Efficacy Scale (NGSE) — EdInstruments](https://edinstruments.org/instruments/new-general-self-efficacy-scale-ngse)
- [The Self-Regulation Questionnaires — selfdeterminationtheory.org, full scale descriptions (SRQ-A, SRQ-L, TSRQ, etc.) including both SRQ-L versions and scoring](https://selfdeterminationtheory.org/wp-content/uploads/2022/02/SRQ_Complete.pdf)
- [Self-Regulation Questionnaires (SRQ) — selfdeterminationtheory.org index](https://selfdeterminationtheory.org/self-regulation-questionnaires/)
- [The Mini-IPIP scales: tiny-yet-effective measures of the Big Five — Donnellan et al. (2006), full PDF](https://faracivisiting.wordpress.com/wp-content/uploads/2010/04/donnellan-et-al-2006.pdf)
- [Mini-IPIP Scoring Key — ipip.ori.org (official public-domain item text + alphas)](https://ipip.ori.org/MiniIPIPKey.htm)
- [The Abbreviated Math Anxiety Scale (AMAS) — Hopko, Mahadevan, Bare & Hunt (2003), SAGE](https://journals.sagepub.com/doi/10.1177/1073191103010002008)
- [Validation Study of the Abbreviated Math Anxiety Scale: Spanish Adaptation — Brown & Macías Sifuentes (2016), ERIC EJ1157604 (reproduces full original English item text + factor loadings)](https://files.eric.ed.gov/fulltext/EJ1157604.pdf)
- [ERIC ED338122 — A Manual for the Use of the Motivated Strategies for Learning Questionnaire (MSLQ), Pintrich, Smith, Garcia & McKeachie (1991), full manual](https://archive.org/details/ERIC_ED338122)
- [ERIC ED338122 full text (djvu)](https://archive.org/stream/ERIC_ED338122/ERIC_ED338122_djvu.txt)
- [Reliability and Predictive Validity of the Motivated Strategies for Learning Questionnaire (MSLQ) — Pintrich, Smith, Garcia & McKeachie (1993), SAGE](https://journals.sagepub.com/doi/10.1177/0013164493053003024)
- [Are Attention Check Questions a Threat to Scale Validity? — Kung, Kwok & Brown (2018), Applied Psychology](https://iaap-journals.onlinelibrary.wiley.com/doi/10.1111/apps.12108)
- [Identifying Careless Responses in Survey Data — Meade & Craig (2012), Psychological Methods (PsycNET record)](https://psycnet.apa.org/record/2012-10015-001)

---

*Internal cross-reference: item IDs above (CRT_xx, SRQL_xx, MSLQ_xx, AMAS_xx) are suggested keys for `app/tests/battery.json` — see `product/Test_Battery_Plan.md` Part 1–2 for the stage/scoring contract these must slot into.*
