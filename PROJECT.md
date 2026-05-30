# Hub — Project

## Purpose & Goals
Central landing page that links to all personal projects. Serves as a portfolio home and quick-access directory. Goals: clean dark-theme presentation, responsive across mobile/desktop, consistent branding across linked projects, easy to extend as new projects are added.

## Target User
Public-facing — anyone visiting Garrett's projects. Also personal — a quick launchpad during development.

## Tech Stack
| Layer | Choice |
|---|---|
| Core | React + Vite — no UI framework |
| Styling | CSS custom properties (hub-specific token set, see `BRAND.md`) |
| Font | system-ui (no external font dependency) |
| Deploy | Vercel — auto-deploy from `main` branch |
| GitHub | gyates01/hub |
| Live URL | https://hub-phi-blush.vercel.app |

## Architecture Decisions

**Why React + Vite instead of static HTML?**
Hub needed a component model for project cards (repeated structure with different content). React makes card iteration clean without manual HTML duplication. Vite provides fast dev/build with minimal config. Trade-off: slightly heavier than pure HTML, but negligible given Vercel CDN delivery.

**Why Vercel for hub (and static projects) vs Railway (for backends)?**
Vercel's free tier is ideal for static/frontend deploys — zero config, GitHub integration, global CDN. Railway is better for persistent services (Node/Python + SQLite). Clean separation: static on Vercel, full-stack on Railway.

**Why separate `.git` repos per project instead of a monorepo?**
Discovered the hard way: `H:\` root is a git repo, and subdirs without their own `.git` absorb git commands into it. Craps and PC Tracker had commits accidentally land in the wrong remote. Each project now has its own `.git` pointing to its correct GitHub remote. Clean isolation is worth the extra setup.

**Why defer og:image (1200×630 PNG) generation?**
Hub cards need real preview images for link unfurling. Options explored: Vercel OG API, screenshot tool, hand-crafted PNGs. All require per-project effort. Deferred until a reusable template approach is found. Current state: meta tags set up without og:image property.

## Key Dependencies & Gotchas
- pnpm (not npm) — npm broken globally on this machine
- `H:\` root git trap — subdirs without own `.git` absorb into root repo (remote was wrongly `gyates01/pc-tracker`)
- `H:\Other\Claude Projects` root repo has 13 unpushed commits, diverged from `gyates01/pc-tracker` — do NOT push from there
- PC Tracker folder is admin-owned: needs `git config --global --add safe.directory`
- Vercel watches branch by name: PC Tracker watches `main`, commits must land on `main` not `master`

## Lessons Learned
- **H:\ root git trap (2026-04-22):** Running `git` from `H:\Other\Claude Projects\Craps\` (before it had its own `.git`) committed to the `H:\` root repo with remote set to `craps-simulator`. Cleaned up by force-pushing a clean state to craps-simulator's `main`. Lesson: always `git remote -v` before committing in a new project directory.
- **Vercel branch mismatch (2026-04-23):** PC Tracker was deployed from `master`, but Vercel was watching `main`. Force-push alone didn't trigger a new deploy — needed a real commit on `main`. Lesson: Vercel deploys on webhook events, not just branch state.
- **Recipe Logger mobile ← hub:** "← back to hub" link is desktop-only (in top nav hidden on mobile). Acceptable trade-off since the mobile bottom tab bar has no room. Lesson: back links need to be placed in mobile-visible UI, or omitted intentionally.
