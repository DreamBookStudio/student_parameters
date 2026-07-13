# battery.json generator & tests

- `node gen_battery.mjs ../battery.json` — regenerates the item database (validates: span-sequence rules, opspan equations, rotation-shape asymmetry, paper-fold unfold math, comparison distance×compatibility grid, series/CRT/estimation arithmetic, scale composition, anchor monotonicity).
- After regenerating, re-embed into `../../battery.html` (the app fetches `tests/battery.json` first and falls back to its embedded copy — keep both in sync).
- `node test_scoring.mjs` — 125 assertions: synthetic high/mid/low sessions, band ordering, tutor.html PARAMS contract, D3/E2 semantics, attention-check invalidation, ceiling guardrails, percentile math.
- `node smoke_test.mjs` — jsdom end-to-end boot + results render (needs `npm i jsdom`).
- Item QA renders: `research/tests/qa_renders/*.png`.
