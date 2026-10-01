# Hub — Active Tasks

_Phase 4 is complete. These are Phase 5 maintenance items._

## Hub Cards — New Projects (not yet added)

- [x] Add Chicago Trip 2026 card → https://chicago-trip-nine.vercel.app
- [x] Add Swing Lab card → local CLI only (show `uv run swing-lab` command, link to GitHub)

## og:image (deferred from Phase 4)

- [x] Design a reusable 1200×630 card template (dark theme, project name + description)
- [x] Generate og:image PNGs for Hub, Craps, PC Tracker, Chicago Trip
- [x] Add `<meta property="og:image" content="...">` to hub, Craps, PC Tracker, Chicago Trip index/head

## Project Template

- [x] Create a `gyates01/project-template` repo with: Vite + React scaffold, BRAND.md tokens pre-wired, CLAUDE.md template, favicon placeholder, meta tags, hub back link
- [x] Document the checklist for adding a new project:
  1. Build it
  2. Deploy it (Vercel or Railway)
  3. Source a card screenshot or og:image
  4. Add card to hub `src/`
  5. Update hub README.md linked projects table
  6. Push to `main` — Vercel auto-deploys

## Maintenance

- [x] Establish a review cadence — quarterly cron job checks all project URLs
- [x] Confirm `H:\Other\Claude Projects` root git repo remote (`gyates01/pc-tracker` leftover) is never accidentally pushed — no root .git exists, all project remotes correct

## Cursor Integration + Claude Usage Cleanup

_Spec: `docs/specs/2026-09-25-cursor-integration-design.md` (approved). Plan: `PLAN.md`._

- [x] Brainstorm + design approved in chat (2026-09-25) — Approach A: Cursor as cockpit + Claude-side cleanup
- [x] Write design spec
- [x] User reviews written spec (approved 2026-09-25)
- [x] Write implementation plan (`superpowers:writing-plans`) → copy to `PLAN.md`
- [x] Record usage.db baseline (last ~2 wks) into `cursor-trial-log.md` BEFORE any settings change (2026-09-25)
- [x] Apply 6 Claude-side cleanup changes (settings.json backup first; verify cbm MCP location before removing) (2026-09-25)
- [x] Create `cursor-user-rules.md` (2026-09-25)
- [x] Paste `cursor-user-rules.md` into Cursor User Rules (2026-09-25)
- [x] Update `project-template` with AGENTS.md + `@AGENTS.md` CLAUDE.md (2026-09-25)
- [x] Update `model-routing.md` + CHANGELOG (2026-09-25)
- [x] Verify fresh Claude session shows Sonnet 5 default (2026-09-25)
- [x] Verify Claude Code extension in Cursor connects + `project-template` agent sees `AGENTS.md` (2026-09-25)
- [x] Fill in `cursor-trial-log.md` cap-hit recollection for the baseline weeks (2026-09-25) — 10 cap hits in the 2-week baseline
- [ ] Trial review ~2026-10-16 → Cursor Pro decision
- [ ] Stop the project-template dev server Cursor left running on port 5173 (started unprompted 2026-09-25)
