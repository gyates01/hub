# Cursor Trial Log

Spec: `docs/specs/2026-09-25-cursor-integration-design.md` §5
Day 0: 2026-09-25 · Review: ~2026-10-16
Re-run: `python scripts/usage_window.py <start> <end>` (end exclusive)

## Baseline (before cleanup)

### Week A — 2026-09-11 → 2026-09-18

```
Window 2026-09-11 -> 2026-09-18 (exclusive)
model                                     turns      tokens*  share   cache_read
TOTAL                                         0            0
```

Zero local-transcript turns this week — verified this is real, not a query
bug (daily breakdown confirms no rows). Usage was bursty this cycle (hits on
2026-08-04, 2026-08-10, then nothing until 2026-09-20), consistent with the
spec's known limitation: `usage.db` only sees local Claude Code transcripts,
not claude.ai chats or Cowork.

### Week B — 2026-09-18 → 2026-09-25

```
Window 2026-09-18 -> 2026-09-25 (exclusive)
model                                     turns      tokens*  share   cache_read
claude-sonnet-5                            1144    6,206,797  76.2%  353,035,794
claude-opus-4-8                             442    1,942,420  23.8%   95,611,006
TOTAL                                      1586    8,149,217
* tokens = input + output + cache_creation (cache reads listed separately)
```

Claude usage-cap hits in these 2 weeks (user's recollection): 10

## Trial entries

One line each: `YYYY-MM-DD | cap-hit / ctrl-k-save / cursor-limit / note | detail`

| Date | Kind | Detail |
|---|---|---|

## Review (fill ~2026-10-16)

| Week | Tokens | Opus share | Cap hits |
|---|---|---|---|

Decision (spec §5 table): ___
