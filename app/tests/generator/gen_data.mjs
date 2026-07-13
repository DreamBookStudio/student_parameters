// ============================================================================
// gen_data.mjs — hand-authored content for battery.json
// All performance items ORIGINAL (ICAR-style, per research/tests/01–04).
// Scales: NGSE (Chen et al. 2001, cited), SRQ-L adaptation (SDT, free for
// research), Mini-IPIP (public domain), AMAS adapted (Hopko et al. 2003),
// MSLQ short (Pintrich et al. 1991 public manual).
// ============================================================================

// ---------- Stage 1 · Reasoning (A1) ----------------------------------------
// Matrix cell spec: array of element objects
//  {s:'tri|sq|pent|hex|cir', f:'out|sol|hat|half', z:'s|m|l', r:deg, n:count, in:'none|dot|x|star|dia|bar', ib:'solid|dash'}
// Options: 6 cell-specs, ans = index of correct.
export const MATRIX_ITEMS = [
  {
    id: "MX_E1", type: "matrix", difficulty: 1, tier: "e",
    rule: "count +1 across each row, continuing row to row (shape constant)",
    grid: [
      [{ s: "cir", f: "sol", z: "s", n: 1 }], [{ s: "cir", f: "sol", z: "s", n: 2 }], [{ s: "cir", f: "sol", z: "s", n: 3 }],
      [{ s: "cir", f: "sol", z: "s", n: 4 }], [{ s: "cir", f: "sol", z: "s", n: 5 }], [{ s: "cir", f: "sol", z: "s", n: 6 }],
      [{ s: "cir", f: "sol", z: "s", n: 7 }], [{ s: "cir", f: "sol", z: "s", n: 8 }], null
    ],
    options: [
      [{ s: "cir", f: "sol", z: "s", n: 9 }],
      [{ s: "cir", f: "sol", z: "s", n: 10 }],
      [{ s: "cir", f: "sol", z: "s", n: 8 }],
      [{ s: "sq",  f: "sol", z: "s", n: 9 }],
      [{ s: "cir", f: "sol", z: "s", n: 6 }],
      [{ s: "cir", f: "out", z: "s", n: 9 }]
    ], ans: 0
  },
  {
    id: "MX_E2", type: "matrix", difficulty: 2, tier: "e",
    rule: "shape constant per row; size grows small→medium→large across row",
    grid: [
      [{ s: "tri", f: "sol", z: "s" }], [{ s: "tri", f: "sol", z: "m" }], [{ s: "tri", f: "sol", z: "l" }],
      [{ s: "pent", f: "sol", z: "s" }], [{ s: "pent", f: "sol", z: "m" }], [{ s: "pent", f: "sol", z: "l" }],
      [{ s: "hex", f: "sol", z: "s" }], [{ s: "hex", f: "sol", z: "m" }], null
    ],
    options: [
      [{ s: "hex", f: "sol", z: "m" }],
      [{ s: "hex", f: "sol", z: "l" }],
      [{ s: "pent", f: "sol", z: "l" }],
      [{ s: "tri", f: "sol", z: "l" }],
      [{ s: "hex", f: "sol", z: "s" }],
      [{ s: "hex", f: "out", z: "l" }]
    ], ans: 1
  },
  {
    id: "MX_M1", type: "matrix", difficulty: 3, tier: "m",
    rule: "shape Latin-square (each of circle/square/triangle once per row+column); fill constant per row",
    grid: [
      [{ s: "cir", f: "out", z: "m" }], [{ s: "sq", f: "out", z: "m" }], [{ s: "tri", f: "out", z: "m" }],
      [{ s: "tri", f: "sol", z: "m" }], [{ s: "cir", f: "sol", z: "m" }], [{ s: "sq", f: "sol", z: "m" }],
      [{ s: "sq", f: "hat", z: "m" }], [{ s: "tri", f: "hat", z: "m" }], null
    ],
    options: [
      [{ s: "tri", f: "hat", z: "m" }],
      [{ s: "sq", f: "hat", z: "m" }],
      [{ s: "cir", f: "out", z: "m" }],
      [{ s: "cir", f: "hat", z: "m" }],
      [{ s: "pent", f: "hat", z: "m" }],
      [{ s: "cir", f: "sol", z: "m" }]
    ], ans: 3
  },
  {
    id: "MX_M2", type: "matrix", difficulty: 3, tier: "m",
    rule: "column3 = column1 minus column2 (inner mark subtraction); outer shape constant per row",
    grid: [
      [{ s: "sq", f: "out", z: "m", in: "x" }, { s: "sq", f: "out", z: "m", in: "bar" }], [{ s: "sq", f: "out", z: "m", in: "x" }], [{ s: "sq", f: "out", z: "m", in: "bar" }],
      [{ s: "pent", f: "out", z: "m", in: "dot" }, { s: "pent", f: "out", z: "m", in: "star" }], [{ s: "pent", f: "out", z: "m", in: "dot" }], [{ s: "pent", f: "out", z: "m", in: "star" }],
      [{ s: "hex", f: "out", z: "m", in: "dia" }, { s: "hex", f: "out", z: "m", in: "x" }], [{ s: "hex", f: "out", z: "m", in: "dia" }], null
    ],
    // NOTE: grid cells with 2 elements = overlaid marks inside one outline (renderer merges: outer drawn once, both inner marks shown)
    options: [
      [{ s: "hex", f: "out", z: "m", in: "x" }],
      [{ s: "hex", f: "out", z: "m", in: "dia" }],
      [{ s: "hex", f: "out", z: "m", in: "dia" }, { s: "hex", f: "out", z: "m", in: "x" }],
      [{ s: "hex", f: "out", z: "m", in: "none" }],
      [{ s: "sq", f: "out", z: "m", in: "x" }],
      [{ s: "pent", f: "out", z: "m", in: "x" }]
    ], ans: 0
  },
  {
    id: "MX_M3", type: "matrix", difficulty: 3, tier: "m",
    rule: "rotation +90° per column (wrapping); fill Latin-square by row+column",
    grid: [
      [{ s: "tri", f: "out", z: "m", r: 0 }], [{ s: "tri", f: "sol", z: "m", r: 90 }], [{ s: "tri", f: "hat", z: "m", r: 180 }],
      [{ s: "tri", f: "sol", z: "m", r: 90 }], [{ s: "tri", f: "hat", z: "m", r: 180 }], [{ s: "tri", f: "out", z: "m", r: 270 }],
      [{ s: "tri", f: "hat", z: "m", r: 180 }], [{ s: "tri", f: "out", z: "m", r: 270 }], null
    ],
    options: [
      [{ s: "tri", f: "sol", z: "m", r: 0 }],
      [{ s: "tri", f: "sol", z: "m", r: 270 }],
      [{ s: "tri", f: "hat", z: "m", r: 0 }],
      [{ s: "tri", f: "sol", z: "m", r: 90 }],
      [{ s: "tri", f: "out", z: "m", r: 0 }],
      [{ s: "tri", f: "hat", z: "m", r: 90 }]
    ], ans: 0
  },
  {
    id: "MX_H1", type: "matrix", difficulty: 4, tier: "h",
    rule: "shape Latin-square + fill Latin-square (both row+column); size constant per row",
    grid: [
      [{ s: "tri", f: "out", z: "l" }], [{ s: "pent", f: "half", z: "l" }], [{ s: "hex", f: "sol", z: "l" }],
      [{ s: "pent", f: "sol", z: "m" }], [{ s: "hex", f: "out", z: "m" }], [{ s: "tri", f: "half", z: "m" }],
      [{ s: "hex", f: "half", z: "s" }], [{ s: "tri", f: "sol", z: "s" }], null
    ],
    options: [
      [{ s: "pent", f: "out", z: "s" }],
      [{ s: "pent", f: "out", z: "m" }],
      [{ s: "hex", f: "out", z: "s" }],
      [{ s: "pent", f: "half", z: "s" }],
      [{ s: "tri", f: "out", z: "s" }],
      [{ s: "pent", f: "sol", z: "s" }]
    ], ans: 0
  },
  {
    id: "MX_H2", type: "matrix", difficulty: 5, tier: "h",
    rule: "count +1 per column (rows start 1,2,3); fill Latin-square; rotation is random noise (unruled)",
    grid: [
      [{ s: "sq", f: "out", z: "s", n: 1, r: 15 }], [{ s: "sq", f: "sol", z: "s", n: 2, r: 40 }], [{ s: "sq", f: "hat", z: "s", n: 3, r: 70 }],
      [{ s: "sq", f: "sol", z: "s", n: 2, r: 70 }], [{ s: "sq", f: "hat", z: "s", n: 3, r: 15 }], [{ s: "sq", f: "out", z: "s", n: 4, r: 40 }],
      [{ s: "sq", f: "hat", z: "s", n: 3, r: 40 }], [{ s: "sq", f: "out", z: "s", n: 4, r: 70 }], null
    ],
    options: [
      [{ s: "sq", f: "sol", z: "s", n: 5, r: 15 }],
      [{ s: "sq", f: "sol", z: "s", n: 4, r: 15 }],
      [{ s: "sq", f: "hat", z: "s", n: 5, r: 40 }],
      [{ s: "sq", f: "out", z: "s", n: 5, r: 70 }],
      [{ s: "sq", f: "sol", z: "s", n: 6, r: 40 }],
      [{ s: "tri", f: "sol", z: "s", n: 5, r: 15 }]
    ], ans: 0
  },
  {
    id: "MX_H3", type: "matrix", difficulty: 5, tier: "h",
    rule: "outer shape constant per row; inner mark Latin-square; inner count +1 per column",
    grid: [
      [{ s: "sq", f: "out", z: "l", in: "dot", n: 1 }], [{ s: "sq", f: "out", z: "l", in: "x", n: 2 }], [{ s: "sq", f: "out", z: "l", in: "star", n: 3 }],
      [{ s: "cir", f: "out", z: "l", in: "x", n: 1 }], [{ s: "cir", f: "out", z: "l", in: "star", n: 2 }], [{ s: "cir", f: "out", z: "l", in: "dot", n: 3 }],
      [{ s: "hex", f: "out", z: "l", in: "star", n: 1 }], [{ s: "hex", f: "out", z: "l", in: "dot", n: 2 }], null
    ],
    options: [
      [{ s: "hex", f: "out", z: "l", in: "x", n: 3 }],
      [{ s: "hex", f: "out", z: "l", in: "x", n: 2 }],
      [{ s: "hex", f: "out", z: "l", in: "dot", n: 3 }],
      [{ s: "hex", f: "out", z: "l", in: "star", n: 3 }],
      [{ s: "cir", f: "out", z: "l", in: "x", n: 3 }],
      [{ s: "hex", f: "out", z: "l", in: "x", n: 1 }]
    ], ans: 0
  }
];

export const MATRIX_PRACTICE = {
  id: "MX_P1", type: "matrix", practice: true,
  rule: "shape constant per row",
  grid: [
    [{ s: "cir", f: "sol", z: "m" }], [{ s: "cir", f: "sol", z: "m" }], [{ s: "cir", f: "sol", z: "m" }],
    [{ s: "sq", f: "sol", z: "m" }], [{ s: "sq", f: "sol", z: "m" }], [{ s: "sq", f: "sol", z: "m" }],
    [{ s: "tri", f: "sol", z: "m" }], [{ s: "tri", f: "sol", z: "m" }], null
  ],
  options: [
    [{ s: "tri", f: "sol", z: "m" }], [{ s: "cir", f: "sol", z: "m" }], [{ s: "sq", f: "sol", z: "m" }],
    [{ s: "pent", f: "sol", z: "m" }], [{ s: "hex", f: "sol", z: "m" }], [{ s: "tri", f: "out", z: "m" }]
  ], ans: 0
};

// Series: options 6, verified programmatically in gen_battery.mjs where numeric
export const SERIES_ITEMS = [
  { id: "SR_E1", type: "series", difficulty: 1, tier: "e", seq: ["4", "9", "14", "19", "24"], options: ["29", "27", "28", "30", "25", "34"], ans: 0, rule: "+5", check: { kind: "arith", k: 5 } },
  { id: "SR_E2", type: "series", difficulty: 2, tier: "e", seq: ["2", "6", "18", "54", "162"], options: ["486", "324", "432", "648", "222", "540"], ans: 0, rule: "×3", check: { kind: "geom", k: 3 } },
  { id: "SR_M1", type: "series", difficulty: 3, tier: "m", seq: ["2", "3", "5", "8", "13"], options: ["21", "18", "20", "22", "19", "26"], ans: 0, rule: "Fibonacci-type: each term = sum of previous two", check: { kind: "fib" } },
  { id: "SR_M2", type: "series", difficulty: 3, tier: "m", seq: ["5", "6", "9", "14", "21"], options: ["30", "28", "29", "32", "27", "35"], ans: 0, rule: "gaps 1,3,5,7 → +9", check: { kind: "gap2", k: 2 } },
  { id: "SR_M3", type: "series", difficulty: 3, tier: "m", seq: ["B", "D", "G", "K", "P"], options: ["V", "U", "T", "W", "S", "X"], ans: 0, rule: "alphabet gaps 2,3,4,5 → +6", check: { kind: "lettergap2" } },
  { id: "SR_H1", type: "series", difficulty: 4, tier: "h", seq: ["3", "20", "6", "17", "9", "14", "12"], options: ["11", "15", "9", "8", "13", "19"], ans: 0, rule: "two interleaved series: 3,6,9,12 (+3) and 20,17,14,(11) (−3)", check: { kind: "interleave" } },
  { id: "SR_H2", type: "series", difficulty: 5, tier: "h", seq: ["2", "5", "11", "23", "47"], options: ["95", "94", "71", "93", "96", "101"], ans: 0, rule: "each term = 2×previous + 1 (gaps double: 3,6,12,24 → 48)", check: { kind: "affine", a: 2, b: 1 } }
];
export const SERIES_PRACTICE = { id: "SR_P1", type: "series", practice: true, seq: ["2", "4", "6", "8"], options: ["10", "9", "12", "11", "14", "8"], ans: 0, rule: "+2" };

export const ANALOGY_ITEMS = [
  { id: "AN_E1", type: "analogy", difficulty: 1, tier: "e", stem: ["MANGO", "FRUIT", "CARROT"], options: ["VEGETABLE", "ORANGE", "FARM", "SALAD", "ROOT", "PLANT"], ans: 0, rule: "item : its category" },
  { id: "AN_M1", type: "analogy", difficulty: 3, tier: "m", stem: ["CARPENTER", "SAW", "TAILOR"], options: ["NEEDLE", "CLOTH", "SHIRT", "SHOP", "BUTTON", "MACHINE"], ans: 0, rule: "worker : characteristic tool" },
  { id: "AN_M2", type: "analogy", difficulty: 3, tier: "m", stem: ["WARM", "HOT", "COOL"], options: ["COLD", "ICE", "WINTER", "MILD", "WET", "DARK"], ans: 0, rule: "degree / intensification" },
  { id: "AN_H1", type: "analogy", difficulty: 4, tier: "h", stem: ["BLIND", "SIGHT", "DEAF"], options: ["HEARING", "SOUND", "SILENCE", "EAR", "NOISE", "SPEECH"], ans: 0, rule: "condition : the faculty that is absent" }
];

export const ODDONE_ITEMS = [
  { id: "OO_M1", type: "oddoneout", difficulty: 3, tier: "m", options: ["SPARROW", "EAGLE", "PENGUIN", "CROW", "PIGEON"], ans: 2, rule: "all are birds; only one cannot fly" },
  { id: "OO_M2", type: "oddoneout", difficulty: 3, tier: "m", options: ["KNIFE", "SCISSORS", "SAW", "AXE", "SPOON"], ans: 4, rule: "all others cut / have a blade" },
  { id: "OO_H1", type: "oddoneout", difficulty: 5, tier: "h", options: ["DOCTOR", "TEACHER", "ENGINEER", "PATIENT", "LAWYER"], ans: 3, rule: "all others are service-providers; one is a service-recipient" },
  { id: "OO_H2", type: "oddoneout", difficulty: 4, tier: "h", options: ["DRIZZLE", "SHOWER", "DOWNPOUR", "SPRINKLE", "MIST"], ans: 2, rule: "all others are light rain; one is heavy — intensity outlier" }
];
export const ODDONE_PRACTICE = { id: "OO_P1", type: "oddoneout", practice: true, options: ["RED", "BLUE", "HAPPY", "GREEN", "YELLOW"], ans: 2, rule: "an emotion among colours" };

// Stage-1 scored-form composition: [type, tier, count]
export const STAGE1_SLOTS = [
  ["matrix", "e", 2], ["matrix", "m", 2], ["matrix", "h", 2],
  ["series", "e", 1], ["series", "m", 2], ["series", "h", 1],
  ["analogy", "e", 1], ["analogy", "m", 2],
  ["oddoneout", "m", 2], ["oddoneout", "h", 1]
];

// ---------- Stage 4/9 · Paired associates (A4) -------------------------------
// Glyph spec rendered by app as SVG: outer shape + inner mark + rotation.
// 20 pairs; 12 randomly selected per session. Words: concrete, culture-neutral.
export const PA_PAIRS = [
  { id: "PA_01", glyph: { o: "hex", i: "dot", r: 0 }, word: "river" },
  { id: "PA_02", glyph: { o: "hex", i: "x", r: 0 }, word: "copper" },
  { id: "PA_03", glyph: { o: "hex", i: "bar", r: 45 }, word: "spring" },
  { id: "PA_04", glyph: { o: "dia", i: "dot", r: 0 }, word: "ladder" },
  { id: "PA_05", glyph: { o: "dia", i: "ring", r: 0 }, word: "mirror" },
  { id: "PA_06", glyph: { o: "dia", i: "bar", r: 90 }, word: "salt" },
  { id: "PA_07", glyph: { o: "tri", i: "dot", r: 0 }, word: "wheel" },
  { id: "PA_08", glyph: { o: "tri", i: "ring", r: 180 }, word: "cloud" },
  { id: "PA_09", glyph: { o: "tri", i: "bar", r: 90 }, word: "needle" },
  { id: "PA_10", glyph: { o: "sq", i: "x", r: 45 }, word: "drum" },
  { id: "PA_11", glyph: { o: "sq", i: "ring", r: 0 }, word: "lamp" },
  { id: "PA_12", glyph: { o: "sq", i: "bar", r: 45 }, word: "rope" },
  { id: "PA_13", glyph: { o: "cir", i: "x", r: 0 }, word: "kite" },
  { id: "PA_14", glyph: { o: "cir", i: "bar", r: 0 }, word: "well" },
  { id: "PA_15", glyph: { o: "cir", i: "dot", r: 0 }, word: "bridge" },
  { id: "PA_16", glyph: { o: "pent", i: "x", r: 0 }, word: "stone" },
  { id: "PA_17", glyph: { o: "pent", i: "dot", r: 180 }, word: "bell" },
  { id: "PA_18", glyph: { o: "pent", i: "bar", r: 0 }, word: "chair" },
  { id: "PA_19", glyph: { o: "hex", i: "ring", r: 90 }, word: "garden" },
  { id: "PA_20", glyph: { o: "dia", i: "x", r: 0 }, word: "basket" }
];

// ---------- Stage 6 · Number sense (C1) --------------------------------------
export const NLE_TARGETS = { practice: [130, 720], bank: [47, 112, 179, 246, 308, 392, 468, 537, 615, 683, 741, 826, 887, 934], scored: 10 };

export const ESTIMATION_ITEMS = [
  { id: "ES_01", difficulty: 2, prompt: "34 × 19", exact: 646, options: [650, 570, 6500], ans: 0, lures: { near: 570, oom: 6500 } },
  { id: "ES_02", difficulty: 3, prompt: "47 × 21", exact: 987, options: [840, 990, 9900], ans: 1, lures: { near: 840, oom: 9900 } },
  { id: "ES_03", difficulty: 3, prompt: "18% of 450", exact: 81, options: [80, 90, 800], ans: 0, lures: { near: 90, oom: 800 } },
  { id: "ES_04", difficulty: 3, prompt: "612 ÷ 29", exact: 21.1, options: [30, 21, 210], ans: 1, lures: { near: 30, oom: 210 } },
  { id: "ES_05", difficulty: 4, prompt: "78 × 52", exact: 4056, options: [4000, 3500, 400], ans: 0, lures: { near: 3500, oom: 400 } },
  { id: "ES_06", difficulty: 2, prompt: "5% of 1840", exact: 92, options: [90, 180, 920], ans: 0, lures: { near: 180, oom: 920 } },
  { id: "ES_07", difficulty: 3, prompt: "23 × 26", exact: 598, options: [460, 600, 6000], ans: 1, lures: { near: 460, oom: 6000 } },
  { id: "ES_08", difficulty: 4, prompt: "1287 ÷ 42", exact: 30.6, options: [31, 40, 310], ans: 0, lures: { near: 40, oom: 310 } },
  { id: "ES_09", difficulty: 4, prompt: "62 × 88", exact: 5456, options: [5500, 4800, 550], ans: 0, lures: { near: 4800, oom: 550 } }
];
export const ESTIMATION_PRACTICE = [
  { id: "ES_P1", prompt: "10% of 250", exact: 25, options: [25, 50, 250], ans: 0 },
  { id: "ES_P2", prompt: "21 × 19", exact: 399, options: [400, 300, 4000], ans: 0 }
];

// ---------- Stage 8 · Reflection traps (D1) ----------------------------------
// Original items (research/tests/04 §1.7), arithmetic re-verified in generator.
export const CRT_ITEMS = [
  { id: "CRT_01", difficulty: 3, format: "numeric", unit: "₹", prompt: "A samosa and a cold drink cost ₹66 together. The samosa costs ₹50 more than the cold drink. How much does the cold drink cost?", answer: 8, lure: 16, archetype: "additive-partition", check: { kind: "partition", total: 66, diff: 50 } },
  { id: "CRT_02", difficulty: 2, format: "numeric", unit: "min", prompt: "If 6 sewing machines take 6 minutes to stitch 6 shirts, how long (in minutes) would 200 machines take to stitch 200 shirts?", answer: 6, lure: 200, archetype: "rate-invariance" },
  { id: "CRT_03", difficulty: 3, format: "numeric", unit: "hrs", prompt: "A funny video shared in a college WhatsApp group doubles its viewers every hour. If it takes 30 hours for the whole college to see it, how many hours for half the college to have seen it?", answer: 29, lure: 15, archetype: "exponential-doubling" },
  { id: "CRT_04", difficulty: 4, format: "numeric", unit: "hrs", prompt: "Priya can weed a garden plot alone in 6 hours. Rohan can weed the same plot alone in 12 hours. Working together at their own steady rates, how many hours will they take?", answer: 4, lure: 9, archetype: "combined-rate", check: { kind: "together", a: 6, b: 12 } },
  { id: "CRT_05", difficulty: 3, format: "numeric", unit: "students", prompt: "In a class test, Ananya scored both the 8th highest and the 8th lowest mark. How many students took the test?", answer: 15, lure: 16, archetype: "off-by-one", check: { kind: "rank", k: 8 } },
  { id: "CRT_06", difficulty: 3, format: "numeric", unit: "₹", prompt: "A trader buys a bicycle for ₹4,000, sells it for ₹4,500, buys it back for ₹5,000, and sells it again for ₹5,500. What is the trader's overall profit in ₹?", answer: 1000, lure: 500, archetype: "ledger", check: { kind: "ledger", legs: [-4000, 4500, -5000, 5500] } },
  { id: "CRT_07", difficulty: 4, format: "mcq", prompt: "Meera invested ₹10,000 in a mutual fund. In the first 6 months its value fell 50%. In the next 6 months it rose 60%. At year-end, has Meera…", options: ["broken even", "made a profit", "made a loss"], ans: 2, lureIdx: 0, archetype: "sequential-percent", check: { kind: "seqpct", start: 10000, changes: [-0.5, 0.6], expect: "loss" } },
  { id: "CRT_08", difficulty: 2, format: "mcq", prompt: "In the final lap of a 400 m race, Kabir overtakes the runner in 3rd place. What position is Kabir in now?", options: ["1st", "2nd", "3rd", "4th"], ans: 2, lureIdx: 1, archetype: "rank-position" },
  { id: "CRT_09", difficulty: 2, format: "mcq", prompt: "A canteen had 18 packets of biscuits. All but 5 were sold. How many packets are left unsold?", options: ["5", "13", "18", "23"], ans: 0, lureIdx: 1, archetype: "all-but-n" },
  { id: "CRT_10", difficulty: 3, format: "mcq", prompt: "How many cubic feet of mud are there in a pit that is 4 ft deep × 4 ft wide × 4 ft long?", options: ["0", "16", "64", "4"], ans: 0, lureIdx: 2, archetype: "empty-volume" },
  { id: "CRT_11", difficulty: 4, format: "numeric", unit: "prizes", prompt: "In a debate club, tall members are three times as likely to win a prize as short members. The club has won 60 prizes so far. How many were won by short members?", answer: 15, lure: 20, archetype: "ratio-share", check: { kind: "ratio", total: 60, ratio: 3 } },
  { id: "CRT_12", difficulty: 4, format: "numeric", unit: "tailors", prompt: "If 4 tailors can stitch 4 shirts in 4 hours, how many tailors are needed to stitch 8 shirts in 8 hours?", answer: 4, lure: 8, archetype: "rate-two-quantity" }
];
export const CRT_PRACTICE = { id: "CRT_P1", format: "numeric", unit: "₹", prompt: "A notebook costs ₹25. You buy 2 notebooks. What is the total cost in ₹?", answer: 50 };

// ---------- Stage 10 · Self-report -------------------------------------------
export const SCALES = {
  NGSE: {
    code: "E1", name: "Self-belief", points: 5,
    anchors: ["Strongly disagree", "Disagree", "Neither", "Agree", "Strongly agree"],
    cite: "Chen, Gully & Eden (2001) — New General Self-Efficacy Scale, used verbatim with citation.",
    items: [
      { id: "NGSE_1", text: "I will be able to achieve most of the goals that I set for myself." },
      { id: "NGSE_2", text: "When facing difficult tasks, I am certain that I will accomplish them." },
      { id: "NGSE_3", text: "In general, I think that I can obtain outcomes that are important to me." },
      { id: "NGSE_4", text: "I believe I can succeed at most any endeavor to which I set my mind." },
      { id: "NGSE_5", text: "I will be able to successfully overcome many challenges." },
      { id: "NGSE_6", text: "I am confident that I can perform effectively on many different tasks." },
      { id: "NGSE_7", text: "Compared to other people, I can do most tasks very well." },
      { id: "NGSE_8", text: "Even when things are tough, I can perform quite well." }
    ]
  },
  SRQL: {
    code: "E2", name: "Why you study", points: 7,
    anchors: ["Not at all true", "", "", "Somewhat true", "", "", "Very true"],
    cite: "Adapted from SRQ-L (Williams & Deci 1996; Black & Deci 2000; selfdeterminationtheory.org — free for research; engineering adaptation, revalidate at pilot).",
    stems: {
      A: "I put in effort on my exam preparation (studying, practice problems, attending class)…",
      B: "I am likely to follow my teacher's / mentor's suggestions for how to study…",
      C: "The reason I keep working to expand my knowledge of these subjects is…"
    },
    items: [
      { id: "SRQL_01", stem: "A", sub: "aut", text: "Because it's a good way to improve my understanding of the material." },
      { id: "SRQL_02", stem: "A", sub: "ctrl", text: "Because others might think badly of me if I didn't." },
      { id: "SRQL_03", stem: "A", sub: "ctrl", text: "Because I would feel proud of myself if I did well." },
      { id: "SRQL_04", stem: "A", sub: "aut", text: "Because a solid understanding of these subjects matters for my growth, not just the exam." },
      { id: "SRQL_05", stem: "B", sub: "ctrl", text: "Because I would get a bad result if I didn't do what they suggest." },
      { id: "SRQL_06", stem: "B", sub: "ctrl", text: "Because I am worried that I am not going to perform well." },
      { id: "SRQL_07", stem: "B", sub: "ctrl", text: "Because it's easier to follow their suggestions than work out my own study strategy." },
      { id: "SRQL_08", stem: "B", sub: "aut", text: "Because they seem to have real insight about how best to learn the material." },
      { id: "SRQL_09", stem: "B", sub: "aut", text: "Because it's important to me personally to do well at this." },
      { id: "SRQL_10", stem: "C", sub: "aut", text: "Because it's interesting to learn more about how these subjects work." },
      { id: "SRQL_11", stem: "C", sub: "aut", text: "Because it's a challenge to really understand how to solve these problems." },
      { id: "SRQL_12", stem: "C", sub: "ctrl", text: "Because I want others to see that I am intelligent." }
    ]
  },
  MINIIPIP_C: {
    code: "E3", name: "How you operate", points: 5,
    anchors: ["Very inaccurate", "Moderately inaccurate", "Neither", "Moderately accurate", "Very accurate"],
    cite: "Mini-IPIP Conscientiousness (Donnellan et al. 2006; IPIP — public domain). 'I' prefix added for clarity.",
    items: [
      { id: "IPIP_1", text: "I get chores done right away." },
      { id: "IPIP_2", text: "I like order." },
      { id: "IPIP_3", text: "I often forget to put things back in their proper place.", reverse: true },
      { id: "IPIP_4", text: "I make a mess of things.", reverse: true }
    ]
  },
  AMAS: {
    code: "E5", name: "How these feel", points: 5,
    anchors: ["Low anxiety", "Some anxiety", "Moderate anxiety", "Quite anxious", "High anxiety"],
    prompt: "How anxious would each of these situations make you feel?",
    cite: "Adapted from AMAS (Hopko et al. 2003) — generic exam/test wording, LMA/MEA structure preserved; provisional cutoff ≈ +1 SD (total ≥ 29).",
    items: [
      { id: "AMAS_1", sub: "LMA", text: "Having to look up a formula, constant, or value in the reference tables at the back of your textbook." },
      { id: "AMAS_2", sub: "LMA", text: "Watching a teacher solve a problem step-by-step on the board." },
      { id: "AMAS_3", sub: "LMA", text: "Listening to a lecture in a class you find difficult." },
      { id: "AMAS_4", sub: "LMA", text: "Listening to a classmate explain a concept or method you haven't understood yet." },
      { id: "AMAS_5", sub: "LMA", text: "Starting a new, unfamiliar chapter in your textbook." },
      { id: "AMAS_6", sub: "MEA", text: "Thinking about an upcoming exam one day before you take it." },
      { id: "AMAS_7", sub: "MEA", text: "Taking an important exam or test." },
      { id: "AMAS_8", sub: "MEA", text: "Being given a set of many difficult problems to complete before the next class." },
      { id: "AMAS_9", sub: "MEA", text: "Being given a surprise (\"pop\") test or quiz in class." }
    ]
  },
  MSLQ: {
    code: "D2", name: "How you study", points: 5,
    anchors: ["Not at all true of me", "Slightly true", "Somewhat true", "Mostly true", "Very true of me"],
    cite: "MSLQ metacognitive self-regulation short form — 3 planning + 3 monitoring items (Pintrich et al. 1991, public manual ED338122), 5-point collapse.",
    items: [
      { id: "MSLQ_1", text: "Before I study new material thoroughly, I often skim it to see how it is organized." },
      { id: "MSLQ_2", text: "I try to think through a topic and decide what I am supposed to learn from it, rather than just reading it over." },
      { id: "MSLQ_3", text: "When I study, I set goals for myself in order to direct my activities in each study period." },
      { id: "MSLQ_4", text: "I ask myself questions to make sure I understand the material I have been studying." },
      { id: "MSLQ_5", text: "When studying, I try to determine which concepts I don't understand well." },
      { id: "MSLQ_6", text: "If I get confused taking notes in class, I make sure I sort it out afterwards." }
    ]
  }
};

// CHK_1 sits in SRQL (global position ≈12 of 41) so its instruction targets the 7-pt "Very true" anchor;
// CHK_2 sits in MSLQ (position ≈37) on the 5-pt truth anchors, pass = 1–2 (disagree side).
export const ATTENTION_CHECKS = [
  { id: "CHK_1", kind: "instructed", hostScale: "SRQL", position: 4, text: "To show you are reading carefully, please select \"Very true\" for this statement.", passValue: 7 },
  { id: "CHK_2", kind: "infrequency", hostScale: "MSLQ", position: 4, text: "I have never used a mobile phone.", passMax: 2 }
];

// ---------- Anchors (plan §3.2, provisional literature v1) -------------------
// Each metric: values at percentiles [10,25,50,75,90]. dir:-1 = lower raw is better.
export const ANCHORS = {
  A1: { metric: "proportion_correct", v: [0.25, 0.38, 0.50, 0.63, 0.78], dir: 1 },
  A2: { metric: "partial_credit_unit", v: [0.42, 0.55, 0.68, 0.80, 0.90], dir: 1 },
  A3: { metric: "rate_correct_per_s", v: [0.35, 0.45, 0.55, 0.68, 0.80], dir: 1 },
  A4: {
    sub: {
      imm: { metric: "immediate_recall_pct", v: [35, 45, 58, 72, 85], dir: 1, w: 1 },
      ret: { metric: "retention_ratio", v: [0.60, 0.70, 0.80, 0.90, 0.95], dir: 1, w: 1 },
      dpr: { metric: "recognition_dprime", v: [1.0, 1.5, 2.0, 2.6, 3.2], dir: 1, w: 1 }
    }
  },
  A5: {
    sub: {
      cov: { metric: "rt_cov", v: [0.45, 0.38, 0.30, 0.24, 0.18], dir: -1, w: 2 },
      com: { metric: "commission_rate", v: [0.60, 0.48, 0.35, 0.22, 0.10], dir: -1, w: 1 }
    }
  },
  C1: {
    sub: {
      cmp: { metric: "comparison_accuracy", v: [0.78, 0.84, 0.90, 0.94, 0.97], dir: 1, w: 2 },
      pae: { metric: "numberline_pae_pct", v: [6.0, 4.5, 3.5, 2.5, 1.5], dir: -1, w: 1 },
      est: { metric: "estimation_accuracy", v: [0.33, 0.50, 0.67, 0.83, 1.0], dir: 1, w: 1 }
    }
  },
  C2: { metric: "spatial_accuracy", v: [0.42, 0.55, 0.67, 0.80, 0.90], dir: 1 },
  D1: {
    sub: {
      crt: { metric: "reflective_correct_of6", v: [1, 2, 3, 4, 5], dir: 1, w: 1 },
      com: { metric: "sart_commission_rate", v: [0.60, 0.48, 0.35, 0.22, 0.10], dir: -1, w: 1 }
    }
  },
  D3res: { metric: "goodman_kruskal_gamma", v: [0.10, 0.30, 0.50, 0.70, 0.85], dir: 1 },
  E1: { metric: "ngse_mean", v: [3.1, 3.5, 3.9, 4.3, 4.6], dir: 1 },
  E3: { metric: "miniipip_c_mean", v: [2.4, 2.9, 3.4, 3.9, 4.4], dir: 1 },
  E5: { metric: "amas_total", v: [12, 16, 21, 26, 31], dir: 1, note: "higher = more anxious; band stored raw-direction per tutor contract" },
  D2: {
    sub: {
      mslq: { metric: "mslq_mean_5pt", v: [2.6, 3.0, 3.5, 3.9, 4.3], dir: 1, w: 0.4 },
      // behavioural sub-anchors: ENGINEERING PROVISIONAL (no literature table exists) — replace at pilot
      rtdif: { metric: "rt_difficulty_r", v: [-0.10, 0.05, 0.20, 0.35, 0.50], dir: 1, w: 0.2, provisional: true },
      pep: { metric: "post_error_persistence", v: [0.70, 0.82, 0.92, 1.00, 1.06], dir: 1, w: 0.2, provisional: true },
      skq: { metric: "skip_quality", v: [0, 0.25, 0.5, 0.75, 1.0], dir: 1, w: 0.2, provisional: true, optional: true }
    }
  }
};

// Master percentile→band (rubric §0)
export const MASTER_BANDS = [
  { band: 0, max: 2 }, { band: 1, max: 8 }, { band: 2, max: 15 }, { band: 3, max: 24 },
  { band: 4, max: 39 }, { band: 5, max: 59 }, { band: 6, max: 74 }, { band: 7, max: 83 },
  { band: 8, max: 90 }, { band: 9, max: 97 }, { band: 10, max: 100 }
];

export const LENSES = {
  none: { label: "No lens", weights: {} },
  jee: { label: "JEE lens", weights: { A1: 1.5, A2: 1.5, C2: 1.5, C1: 1.5, D1: 1.5 } },
  neet: { label: "NEET lens", weights: { A4: 1.5, A3: 1.5, D3: 1.5, E5: 1.5 } }
};

// ---------- Per-axis readouts (rubric bands + tutor low/high lines) ----------
export const READOUTS = {
  A1: { name: "Fluid Reasoning", grade: "F", malleable: false,
    low: "Novel multi-step problems are costly right now — set strategy around this: worked examples first, pattern drilling, templates, scaffolding faded slowly.",
    mid: "Handles grade-level novel problems with normal support. Standard problem-solving instruction with hints available.",
    high: "Rapidly infers rules and transfers to new contexts. Skip to challenging novel problems quickly; minimal hand-holding.",
    strength: "Novel, multi-concept problems are your engine — lean into JEE-Advanced-style questions early.",
    leak: "Don't brute-force novelty: build a template library and drill patterns — strategy beats raw struggle here." },
  A2: { name: "Working Memory", grade: "F", malleable: false,
    low: "Steps drop mid-problem. Externalise everything: micro-steps, written intermediates, one idea at a time, frequent recaps.",
    mid: "Holds typical multi-step problems. Standard pacing.",
    high: "Juggles many elements mentally — long multi-step chains are fine with less externalisation.",
    strength: "You can carry long solution chains in your head — use it for multi-constraint problems.",
    leak: "Write intermediate results down — losing a held value mid-chain is your most likely error mode." },
  A3: { name: "Processing Speed", grade: "F", malleable: false,
    low: "Slow ≠ weak — accuracy-first strategy. Learn time-triage: bank the fast marks, park the slow ones, never rush the method.",
    mid: "Age-typical fluency. Standard timed practice.",
    high: "Fast, fluent scanning and retrieval — rapid-fire drills and timed mocks play to strength.",
    strength: "Speed is a weapon: high attempt-rates are available to you — pair it with calibration so it doesn't leak marks.",
    leak: "Time pressure costs you attempts. Triage ruthlessly and separate speed from accuracy in practice." },
  A4: { name: "Learning Efficiency / Retrieval", grade: "F", malleable: true,
    low: "Needs many exposures to retain — switch to spaced retrieval, mnemonics, and low-stakes recall checks inside every session.",
    mid: "Typical acquisition and retention. Standard review cadence.",
    high: "Acquires and retains quickly — compress review cycles, move faster, enrich rather than repeat.",
    strength: "You encode fast and keep it — volume subjects (NEET Bio, inorganic) are a scoring opportunity.",
    leak: "Retention is the lever: spaced retrieval practice will buy you more marks per hour than more reading." },
  A5: { name: "Attentional Control", grade: "S", malleable: true,
    low: "Focus lapses cause errors skill doesn't explain. Chunk study into short blocks with active checkpoints and minimal distractors.",
    mid: "Sustains attention for typical periods. Standard session length.",
    high: "Sustains focus through long, complex work — extended deep-work blocks are fine.",
    strength: "Long papers won't wear you down — you can hold quality attention across a full 3-hour sitting.",
    leak: "Lapses, not ability, are leaking marks — shorter chunks, active checkpoints, and deliberate re-focus rituals." },
  C1: { name: "Number Sense / Mental Math", grade: "F", malleable: true,
    low: "Build magnitude sense explicitly: estimation tricks, order-of-magnitude checks, number-line intuition before procedures.",
    mid: "Typical number sense. Keep estimation in the toolkit.",
    high: "Sharp magnitude intuition — use estimation-first approaches to eliminate options and sanity-check fast.",
    strength: "You can kill wrong options by estimation before solving — a direct speed and accuracy edge in MCQs.",
    leak: "Sanity-check answers by order of magnitude — silly numeric slips are cheap to prevent here." },
  C2: { name: "Spatial Ability", grade: "F", malleable: true,
    low: "Trainable (training effect g ≈ 0.47): sketching, rotation practice, manipulatives. Pair every verbal explanation with a slow, step-by-step diagram.",
    mid: "Typical spatial skill. Include diagrams routinely.",
    high: "Strong visualisation — lean on diagrams, geometric intuition and visual arguments; a real STEM strength.",
    strength: "3D geometry, vectors, rotational mechanics, stereochemistry — visual arguments are your fast lane.",
    leak: "Spatial skill is the most trainable axis here — 10 minutes of rotation/sketching practice daily moves it." },
  D1: { name: "Executive Function / Inhibition", grade: "S", malleable: true,
    low: "Intuitive-but-wrong answers slip through. Build a checking ritual into every solution; flag classic trap patterns before starting.",
    mid: "Typical control. Keep a light final-check habit.",
    high: "Reliable self-checker — rarely falls for designed distractors.",
    strength: "Trap questions are where you gain rank — others donate negatives there; you don't.",
    leak: "'Silly mistakes' are a designed leak: slow down at the last step and re-read what was actually asked." },
  D2: { name: "Metacognition & Self-Regulated Learning", grade: "S", malleable: true,
    low: "Plan-monitor-check isn't habitual yet. Use explicit strategies: goals per session, self-testing, error logs — modelled, then faded.",
    mid: "Some planning and checking with prompting. Fade the prompts gradually.",
    high: "Plans, monitors and self-corrects independently — can be handed open-ended goals.",
    strength: "You already study like a self-regulated learner — autonomy and open-ended goals will accelerate you.",
    leak: "'Focus on weak areas' has no engine without self-monitoring — adopt a plan→test→review loop this week." },
  D3: { name: "Monitoring Calibration", grade: "F", malleable: true,
    over: "Overconfident: your confidence outruns your accuracy — under negative marking that costs real marks. Require a one-line justification before finalising answers you feel sure about.",
    under: "Underconfident: you skip marks you already own. Surface your actual success rate — attempt more of the items you'd normally leave.",
    good: "Well-calibrated: your confidence tracks your accuracy — trust your attempt/skip instinct under negative marking.",
    resLow: "Resolution is low: confidence barely distinguishes your right answers from wrong ones — self-testing will sharpen the signal.",
    resHigh: "Resolution is high: your confidence knows when you're right — use it to drive attempt/skip decisions." },
  E1: { name: "Academic Self-Efficacy", grade: "self-report", malleable: true,
    low: "Belief is the bottleneck before ability is. Engineer early wins; attribute success to strategy and effort, explicitly.",
    mid: "Task-dependent confidence. Calibrate challenge to keep wins frequent.",
    high: "Confident under challenge — can be pushed hard without denting motivation.",
    strength: "You believe you can crack hard things — that belief buys persistence when problems fight back.",
    leak: "Low self-efficacy quits early even when ability is there — stack small wins before hard sets." },
  E2: { name: "Motivation Quality (SDT)", grade: "self-report", malleable: true,
    Autonomous: "Driven by interest and own goals — sustainable. Provide choice, depth, and self-directed projects.",
    Mixed: "Both internal and external drivers. Nudge framing toward interest and personal relevance.",
    Controlled: "Running mainly on external pressure (results, approval) — a burnout-risk signal over a 2-year grind. Add choice and personal relevance.",
    Amotivated: "Drive is currently low. Rebuild competence and relevance with very small wins before anything else." },
  E3: { name: "Conscientiousness", grade: "self-report", malleable: false,
    low: "Consistency needs external structure: small concrete commitments, checklists, routines — not vague 'go practise'.",
    mid: "Typically reliable. Standard structure.",
    high: "Organised and persistent — long-horizon independent plans will hold.",
    strength: "The 2-year grind is won on consistency — you have it; protect the routine.",
    leak: "Discipline gaps compound over months — externalise structure now (fixed slots, checklists, commitments)." },
  E5: { name: "Exam / Test Anxiety", grade: "self-report", malleable: true,
    low: "Calm in evaluative settings — normal challenge and mock-test framing is fine.",
    mid: "Some tension; occasional avoidance. Reduce time pressure in practice; normalise errors.",
    high: "Anxiety is hijacking working memory in evaluative moments. Address this first: low-stakes practice, no time pressure initially, small wins — and do not read any low performance score as ability until this is handled. If it feels overwhelming, talking to a counsellor or a trusted adult genuinely helps.",
    strength: "Composure under exam pressure is a real edge — your working memory stays available when it counts.",
    leak: "Anxiety, not ability, may be suppressing scores — treat composure as the first fix, everything else second." },
  E6: { name: "Academic Engagement", grade: "S", malleable: true,
    low: "Engagement dropped during the session — investigate cause (too hard? not relevant? anxiety?) before pushing harder.",
    mid: "Typical involvement with some drift — shorter segments and quick feedback loops will hold attention.",
    high: "Stayed engaged end-to-end — can handle long-form rigorous material.",
    strength: "You showed up for every stage at full effort — that transfers directly to long study blocks.",
    leak: "Engagement faded across the session — chunk work and re-hook with interactive practice." }
};

export const PARAM_META = {
  order: ["A1", "A2", "A3", "A4", "A5", "C1", "C2", "D1", "D2", "E1", "E3", "E5", "E6"], // radar spokes (D3, E2 shown separately)
  tiers: { A2: 1, A3: 1, A4: 1, D2: 1, D3: 1, E3: 1, E5: 1, A1: 1, D1: 2, C2: 2, C1: 2, A5: 2, E1: 2, E2: 2, E6: 3 }
};
