# Hub — Claude Instructions

## Skill routing
- Design decisions → invoke `design-consultation`
- Before deploy → invoke `superpowers:verification-before-completion`
- Adding a new project card → run through the Phase 5 checklist in TASKS.md

## Run commands
Use pnpm (npm broken globally):
```bash
cd "H:/Other/Claude Projects/hub"
export PATH="$PATH:/c/Users/yates/AppData/Local/pnpm" && pnpm install && pnpm run dev
```

## Deploy
- Auto-deploy from `main` branch on GitHub push
- GitHub: gyates01/hub
- Live: https://hub-phi-blush.vercel.app
- Vercel CLI available globally: `vercel` command

## Design system
- `BRAND.md` is the cross-project design system reference — read it before making any visual changes
- Hub uses its own lighter base tokens (`--bg #0d0d0f`, `--surface #16171d`) — slightly different from Warm Graphite
- system-ui font stack (no IBM Plex Sans on hub itself)
- Hero title: `clamp()` + `vw` for viewport scaling
- Max-width 1600px, header spans full viewport

## Git gotchas
- `H:\` root is a git repo — hub has its own `.git` pointing to `gyates01/hub`. Always verify `git remote -v` before committing.
- `H:\Other\Claude Projects` root git repo has remote `gyates01/pc-tracker` (leftover) — DO NOT push from there
- Craps/app and PC Tracker have their own `.git` repos; changes to those must be committed from their own directories

## Adding a new project card
1. Build and deploy the project
2. Take a screenshot / source card image
3. Add card to `src/` with project URL, description, tech stack
4. Update hub README.md linked projects table
5. Push to `main` — Vercel auto-deploys
6. Update BRAND.md Per-Project Notes section if the new project establishes design patterns
