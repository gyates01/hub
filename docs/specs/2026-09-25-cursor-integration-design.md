# Cursor Integration + Claude Usage Cleanup — Design

**Date:** 2026-09-25
**Status:** Design approved in chat, awaiting written-spec review
**Scope:** Workflow/config across all projects under `H:\Other\Claude Projects\` — no product code

---

## 1. Intent

**Goal:** Stop hitting Claude subscription usage limits (primary) and reduce session bloat (secondary), using Cursor as a second, separately-billed tool — and decide with data whether Cursor Pro is worth $20/mo.

**What the user said:**
- On Cursor **Free (Hobby)** for now; will upgrade to Pro only if the workflow justifies it.
- **Mostly directs Claude** — rarely types code by hand.
- Pain: hitting usage caps (main), sessions bloating (sometimes). Already works one task at a time with `/recap` + `/clear`.

**Assumptions (verified 2026-09-25):**
- Cursor Free = "limited Agent requests" + Composer (Cursor's in-house model); frontier models (incl. Claude) are paid-only. ([cursor.com/pricing](https://cursor.com/pricing))
- Cursor **ignores CLAUDE.md**; it reads `AGENTS.md`, `.cursor/rules/*.mdc`, and User Rules (settings UI). Claude Code does not read `AGENTS.md` natively but imports it via `@AGENTS.md` in CLAUDE.md.
- `H:\.claude\settings.json` has no `model` key (defaults to Opus) and `"effortLevel": "xhigh"`.

**Success criteria:**
- Claude usage-cap hits drop noticeably over a 3-week trial.
- Cursor Pro decision made from the trial log + `usage.db`, not guesswork.

**Chosen approach:** A — Cursor as cockpit (editor + Claude Code in its terminal) + Claude-side overhead cleanup. Approach B (Cursor agent executes `PLAN.md`) deferred until/unless Pro is justified.

---

## 2. Routing — who does what

| Work | Tool | Why |
|---|---|---|
| Reading/reviewing what Claude changed | Cursor editor (no AI) | Zero budget; inline diffs via Claude Code IDE integration |
| Tiny tweaks (rename, color, typo, string) | Cursor **Ctrl+K** | Not worth a Claude turn that re-sends the whole context |
| "What does this do / where is X?" | Cursor **Ask/Chat** | Keeps exploration out of Claude context |
| Planning, architecture, research | Claude Code — **Opus** | Sparingly, only this |
| Implementation, multi-file changes, debugging | Claude Code — **Sonnet** (default) | Skills, hooks, memory, `/recap` live here |
| Tier 1–2 (transcripts, Obsidian, exploration) | Unchanged — DeepSeek | Already cheap |

**Daily flow:** open project folder in Cursor → run `claude` in Cursor's integrated terminal → Claude builds, diffs appear in the editor → follow-up small fixes via Ctrl+K instead of another Claude prompt.

---

## 3. Shared rules

**Global layer**
- New file `hub/cursor-user-rules.md` = master copy of tool-agnostic rules only:
  - pnpm not npm (npm broken globally; pnpm at `C:\Users\yates\AppData\Local\pnpm`)
  - PowerShell has no `&&`
  - Files go in their project folder, never `H:\` root
  - Stop dev servers you start (study-dashboard 5180/3011; Finance Tracker 5173/3001)
  - Quote paths — "Claude Projects" contains a space
  - 95% confidence before implementing; ask if unsure
- User pastes it into **Cursor Settings → Rules → User Rules**.
- Claude continues to get these from `H:\.claude\CLAUDE.md` (unchanged source).
- Add §7 lesson to constitution: *"Changed global rules? Re-paste `hub/cursor-user-rules.md` into Cursor."*

**Project layer (lazy — only when a project is first opened in Cursor)**
- Move tool-agnostic project facts (stack, commands, ports, gotchas) from `CLAUDE.md` → new `AGENTS.md`.
- `CLAUDE.md` becomes `@AGENTS.md` + Claude-only content (skill routing, etc.).
- Update `project-template/` with this structure now so new projects start dual-tool.
- Do **not** bulk-convert the 11 existing projects.

---

## 4. Claude-side cleanup (all six approved)

| # | Change | Where |
|---|---|---|
| 1 | Set default model to Sonnet: `"model": "sonnet"` | `H:\.claude\settings.json` |
| 2 | Lower global effort `xhigh` → `high` (per-session `/effort` for hard problems) | `H:\.claude\settings.json` |
| 3 | Remove codebase-memory (cbm): its PreToolUse `cbm-code-discovery-gate` hook and 4 SessionStart `cbm-session-reminder` hooks; disable/remove its MCP server. **Keep vexp.** | `H:\.claude\settings.json` + MCP config |
| 4 | Disable learning output style by default: `learning-output-style` plugin → `false`. Toggle on per session via `/output-style`. | `H:\.claude\settings.json` |
| 4b | Nudge rule in constitution §1: *"If the user asks several why/how questions about a task, or the task is educational, suggest turning on the learning output style."* | `H:\.claude\CLAUDE.md` |
| 5 | Soften §6 skill routing: invoke skills FIRST **for non-trivial tasks**; small fixes don't need a skill (and mostly go to Cursor) | `H:\.claude\CLAUDE.md` |
| 6 | Update §2 model table: Opus 4.8 → Opus 5.5, Sonnet 4.6 → Sonnet 5 (IDs `claude-opus-5-5`, `claude-sonnet-5`); add Cursor as a routing column/note | `H:\.claude\CLAUDE.md` + `hub/model-routing.md` |

**Constraints:**
- Back up `settings.json` before editing (timestamped copy in `H:\.claude\backups\`).
- Keep all constitution edits **above** the `<!-- vexp -->` markers.
- The cbm MCP server location must be verified (user-scope MCP config vs plugin) before removal — do not guess the path.
- Out of scope: disconnecting claude.ai connectors (Gmail, FMP, bio-research) — low cost, optional later.

---

## 5. Trial & Pro decision

**Measurement tool:** existing `claude-usage` project (`python cli.py stats|today`, DB at `~/.claude/usage.db`).

1. **Baseline:** record last ~2 weeks from `usage.db` (tokens/week, Opus vs Sonnet share) into `hub/cursor-trial-log.md`.
2. **Day 0:** apply §4 cleanup; install Claude Code extension in Cursor; start routing per §2.
3. **Weeks 1–3:** append one-line entries to the trial log when relevant: cap hits, Ctrl+K saves, Cursor free-limit hits.
4. **Review (~2026-10-16 if Day 0 is 2026-09-25):** compare `usage.db` before/after + log.

| Result | Decision |
|---|---|
| Claude cap hits mostly stopped | Skip Pro; keep Cursor Free as editor |
| Still capping **and** hit Cursor Free limit | Get Pro; revisit Approach B |
| Still capping, Cursor barely used | Don't buy Pro; compare against a higher Claude plan |

**Known limitation:** `usage.db` only sees local Claude Code transcripts — not claude.ai chats or Cowork — so the manual cap-hit tally is the ground truth.

---

## 6. Deliverables

| File | Action |
|---|---|
| `H:\.claude\settings.json` | Edit (§4 #1–4), backup first |
| `H:\.claude\CLAUDE.md` | Edit (§4 #4b, 5, 6; §3 lesson) |
| `hub/model-routing.md` | Update models + Cursor routing |
| `hub/cursor-user-rules.md` | New |
| `hub/cursor-trial-log.md` | New (baseline + log template) |
| `project-template/AGENTS.md` + `CLAUDE.md` | New / edit |
| `hub/CHANGELOG.md` | Entry |

**Verification:**
- Fresh `claude` session shows Sonnet as the model and no cbm SessionStart reminder.
- Grep/Glob no longer triggers the cbm gate; vexp guard still works.
- Output style is default (no Insight blocks) in a fresh session.
- In Cursor: `claude` in the integrated terminal connects (the `ide` MCP no longer fails); User Rules pasted.
- Cursor agent in `project-template` sees `AGENTS.md` content.

## 7. Open follow-ups (not in this effort)
- Approach B (Cursor executes `PLAN.md`) — only if Pro is bought.
- Per-project `AGENTS.md` migration happens organically as projects are opened in Cursor.
