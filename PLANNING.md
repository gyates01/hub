# Hub — Planning

## Overview
Personal project hub built in 5 phases: deploy all existing projects, build the hub site, polish/unify branding across projects, and establish a maintenance workflow for adding new projects. Fully deployed as of Phase 4 (2026-04-23).

_Historical detail (per-project deploy notes, QA findings, git gotcha log) archived in `HUB_SITE_PLAN.md`._

## Phase Status

| Phase | Description | Status | Completed |
|---|---|---|---|
| 1 | Decisions: hosting, URL structure, domain | ✅ Complete | 2026-04 |
| 2 | Deploy all projects: PC Tracker, Craps, Finance Tracker, Recipe Logger, claude-usage | ✅ Complete | 2026-04 |
| 3 | Build hub site: React + Vite, project cards, Vercel deploy | ✅ Complete | 2026-04-22 |
| 4 | Polish: back links, favicons, meta tags, responsive layout, mobile QA, Lighthouse | ✅ Complete | 2026-04-23 |
| 5 | Maintenance: project template, new-project checklist, og:image, hub cards for new projects | 🔄 Ongoing | — |

---

## Phase 1 — Decisions
- Hosting: Vercel for static/frontend, Railway for full-stack backends
- URL structure: subpaths for static, subdomains for full-stack
- GitHub account: gyates01 (already connected to Vercel and Railway)

---

## Phase 2 — Get All Projects Online
All six projects deployed:
- PC Tracker → https://pc-tracker-orpin.vercel.app
- Craps → https://craps-simulator-rose.vercel.app
- Finance Tracker → https://finance-tracker-production-a193.up.railway.app (private)
- Recipe Logger → https://shiny-enigma-production-ee0c.up.railway.app
- claude-usage → local only (GitHub link + `python cli.py dashboard` on card)
- CSMoney Crash Tracker → removed (no longer relevant)

---

## Phase 3 — Hub Site (2026-04-22)
React + Vite, dark theme, no UI framework. Project cards for all live projects. Deployed to Vercel at https://hub-phi-blush.vercel.app.

---

## Phase 4 — Polish & Unify (2026-04-23)
- ← back to hub links on all projects
- Warm Graphite theme applied to Recipe Logger (IBM Plex Sans + CSS vars)
- Favicons added to all 5 projects
- Meta tags (title, description, og:) added — og:image deferred
- Responsive hub layout: clamp-based widths, fluid card grid, hero scales with vw
- Mobile QA: all projects tested; PC Tracker branch mismatch fixed
- Lighthouse: Hub 150ms, Craps 323ms, Recipe Logger 41ms — no JS errors

---

## Phase 5 — Maintenance 🔄
See TASKS.md for actionable items.

**Scope:**
- og:image (1200×630 PNG) for all projects — blocked on template/tooling approach
- Project template repo for future projects
- Standard checklist: build → deploy → screenshot → hub card → push
- Hub cards for new projects (Chicago Trip, Swing Lab — not yet added)
- Prune/review cadence for existing projects

---

## v2 Ideas (not scheduled)
- Custom domain (`garrettyates.dev` or similar)
- Animated project cards on scroll
- "Status" badge per project (live, in progress, archived)
- Dark/light toggle on hub itself
