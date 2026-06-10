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
- [ ] Confirm `H:\Other\Claude Projects` root git repo remote (`gyates01/pc-tracker` leftover) is never accidentally pushed
