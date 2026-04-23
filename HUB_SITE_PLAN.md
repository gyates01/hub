# Project Hub Site — Build Plan

A central website to host and showcase all your projects.

---

## Resume Notes (for continuing in a new chat)

**GitHub username:** `gyates01`
**Domain:** not picked yet (can be done any time, doesn't block progress)
**Hosting:** Vercel (frontends) + Railway (backends)
**URL structure:** Subpaths for static, subdomains for full-stack

**Currently working on:** Phase 4 polish — back links ✅ favicons ✅ meta tags ✅ done, next: mobile test / Lighthouse

**Status:**
- ✅ PC Tracker — https://pc-tracker-orpin.vercel.app (redesign logged for later)
- ❌ CSMoney Crash Tracker — removed, no longer relevant
- ✅ Craps — https://craps-simulator-rose.vercel.app
- ✅ Finance Tracker — https://finance-tracker-production-a193.up.railway.app (private, basic auth)
- ✅ Recipe Logger (shiny-enigma) — https://shiny-enigma-production-ee0c.up.railway.app
- ✅ Hub site — https://hub-phi-blush.vercel.app — GitHub: https://github.com/gyates01/hub

**Next step:** Phase 4 — mobile test + Lighthouse, then optional: og:image (1200×630 preview images).

---

## Phase 1 — Decisions (do this first)

- [ ] Pick a domain name (e.g. `garrettyates.dev`, `garrett.codes`) — *changeable later, so don't overthink*
- [x] URL structure: **Subpaths** for static projects, **subdomains** for full-stack apps
  - Static: `garrett.dev/craps`, `garrett.dev/pc-tracker`, `garrett.dev/csmoney`
  - Full-stack: `finance.garrett.dev`, `recipes.garrett.dev` (backends need their own host)
  - Hub links can still look like subpaths to the visitor — redirect under the hood
- [x] Hosting:
  - **Vercel** — hub + static/Vite frontends (free tier, GitHub auto-deploy)
  - **Railway** — backends (Finance + Recipe)
- [x] GitHub account — already connected

---

## Phase 2 — Get each project online

### Quick wins (static HTML — deploy in minutes)

**CSMoney Crash Tracker** — ❌ Removed (no longer relevant)

**PC Tracker** — ✅ DONE
- [x] GitHub repo: https://github.com/gyates01/pc-tracker
- [x] Deployed to Vercel: https://pc-tracker-orpin.vercel.app
- [ ] **Redesign** — UI is outdated, revisit when ready. Ideas to explore:
  - Fresh visual design (darker theme? better layout?)
  - Additional features (price history, links to buy, build comparison chart)
  - Mobile polish

### Needs scaffolding

**Craps** — ✅ DONE
- [x] Scaffold a Vite + React project
- [x] Move `craps-simulator-most recent.jsx` in as the main component
- [x] Clean up the `old/` folder (keep only the latest version)
- [x] Test build locally
- [x] Create GitHub repo + deploy to Vercel: https://craps-simulator-rose.vercel.app

### Medium lift

**Finance Tracker** — 🔄 In progress (see `FINANCE_TRACKER_DEPLOY.md`)
- [x] Decide: private with basic auth
- [x] Keep SQLite with Railway persistent volume (no DB migration needed)
- [x] Code changes made (auth, static serving, env vars, configurable DB path)
- [x] GitHub repo created: https://github.com/gyates01/finance-tracker (private)
- [x] Pushed to Railway — build failing due to shell command syntax, fix committed
- [x] Verify Railway build succeeds after fix
- [x] Set env vars in Railway (NODE_ENV, AUTH_USER, AUTH_PASS, DB_PATH)
- [x] Add persistent volume in Railway (mount path: /data)
- [x] Test login + app end-to-end
- [x] Live URL: https://finance-tracker-production-a193.up.railway.app

### Already done

**Recipe Logger (shiny-enigma)**
- [x] Verify Railway deployment is still live — https://shiny-enigma-production-ee0c.up.railway.app
- [x] Note the production URL for the hub

### Link-only (not hosted as a web app)

**claude-usage**
- [x] GitHub repo: https://github.com/gyates01/claude-usage (moved from phuryn/claude-usage)
- [x] Hub card shows `python cli.py dashboard` command + links to localhost:8080

---

## Phase 3 — Build the hub site ✅ DONE (2026-04-22)

- [x] Create repo: `gyates01/hub`
- [x] Stack: Vite + React, dark theme
- [x] Project cards: Finance Tracker, Recipe Logger, Craps, PC Tracker, claude-usage
- [x] Deploy to Vercel: https://hub-phi-blush.vercel.app

---

## Phase 4 — Polish & unify

- [x] Add a small "← back to hub" link on each project
  - [x] Craps — added to App.jsx (fixed positioned, Tailwind)
  - [x] PC Tracker — added to index.html (inline style, fixed positioned)
  - [x] Finance Tracker — added to sidebar footer (← hub link, styled with hubLink class)
  - [x] Recipe Logger (shiny-enigma) — added to desktop top nav left side
        **Note:** shiny-enigma serves pre-built dist/ committed to git — must `npm run build` in frontend/ and commit dist/ to production branch before pushing
- [x] Hub responsive layout — clamp-based widths, header full viewport width, hero title scales with viewport, card grid fluid
- [ ] Pick a shared color palette/font and apply lightly across projects (optional)
- [x] Add favicon to every project
  - Hub: existing SVG (Claude lightning bolt ✅)
  - Craps: die face (dark bg, 5 dots) ✅
  - PC Tracker: CPU chip (blue) ✅
  - Finance Tracker: bar chart (dark bg, green) ✅
  - Recipe Logger: fork & knife (brown) ✅
- [x] Add meta tags (title, description, og:) for link previews — all 5 projects done
  - og:image deferred: needs proper 1200×630 PNG images
- [ ] Test on mobile
- [ ] Run through Lighthouse for each project

### Git gotchas discovered (2026-04-22)
- `H:\` root is a git repo — running `git` from any subdirectory without its own `.git` uses the H:\ root repo (remote was wrongly set to craps-simulator)
- Craps/app and PC Tracker now have their own `.git` repos pointing to their correct remotes
- craps-simulator GitHub repo has 2 stray commits with wrong file paths (`Other/Claude Projects/...`) — Vercel deployment still working; clean up when convenient
- PC Tracker folder owned by Administrator; needed `git config --global --add safe.directory`

---

## Phase 5 — Maintenance

- [ ] Create a project template repo for future projects (saves setup time)
- [ ] Checklist for adding a new project:
  1. Build it
  2. Deploy it
  3. Take a screenshot
  4. Add a card to the hub
  5. Push both
- [ ] Pick a cadence to revisit and prune old projects

---

## Reference — Project status snapshot

| Project | Type | Current State | Effort to Deploy |
|---|---|---|---|
| CSMoney Crash Tracker | Static HTML | Local only | Low |
| PC Tracker | Static HTML | Local only | Low |
| Craps | React (Vite) | Deployed on Vercel | Done |
| Finance Tracker | Full-stack (Node + Vite + SQLite) | GitHub + Railway (build fixing) | In progress |
| Recipe Logger (shiny-enigma) | Full-stack (Python + Vite) | Deployed on Railway | Done |
| claude-usage | Python CLI | On GitHub | Link only |
