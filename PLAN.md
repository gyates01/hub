# Cursor Integration + Claude Usage Cleanup — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Apply the approved Claude-side cleanup, set up shared rules for Cursor, and start a measured 3-week trial that decides whether Cursor Pro is worth buying.

**Architecture:** Config and docs only — no product code. Record a usage baseline first, then edit `H:\.claude\settings.json` and the constitution (backed up, JSON-validated), then add the Cursor-facing files (`hub/cursor-user-rules.md`, `project-template/AGENTS.md`). "Tests" here are verification commands with expected output, plus a fresh-session check.

**Tech Stack:** Claude Code settings JSON, Markdown, Python 3 + SQLite (claude-usage `usage.db`), Git (hub and project-template repos), Cursor.

**Spec:** `hub/docs/specs/2026-09-25-cursor-integration-design.md`

## Global Constraints

- Record the usage.db baseline **before** any change to `settings.json`.
- Back up `settings.json` to `H:\.claude\backups\` (timestamped copy) before editing it.
- **Keep vexp.** Remove only codebase-memory (cbm).
- Put all constitution edits **above** the `## vexp - Context-Aware AI Coding` marker (currently line 134 of `H:\.claude\CLAUDE.md`).
- `H:\.claude` is not a git repo. Its backups are the only undo, so never delete, only move into `backups\`.
- Out of scope: disconnecting claude.ai connectors (Gmail, FMP, bio-research).
- Do **not** bulk-convert the existing projects to `AGENTS.md`. Only `project-template` gets it now.
- Hub repo: run `git -C hub remote -v` and confirm `gyates01/hub` before committing. Stage only the files named in the task (see memory: commit hygiene).
- pnpm, not npm. PowerShell has no `&&`. Quote paths, because "Claude Projects" contains a space.

**Verified facts (2026-09-25):**
- `CLAUDE_CONFIG_DIR=H:\.claude`. `C:\Users\yates\.claude` is a **junction** to `H:\.claude`.
- The active MCP config is `H:\.claude\.claude.json` and has no cbm server. The only `codebase-memory-mcp` entry is in the inactive `C:\Users\yates\.claude.json`.
- cbm has 5 hook entries in `settings.json` (1 PreToolUse and 4 SessionStart), 2 scripts in `H:\.claude\hooks\`, and a skill at `H:\.claude\skills\codebase-memory\`.
- `settings.json` already has `modelSettings.claude-sonnet-5.effortLevel = "high"`.
- usage.db (`H:\.claude\usage.db`) currently ends at `2026-09-24T06:27Z`.

## Review Focus

1. **`settings.json` becomes invalid JSON after hand-editing.** Claude Code then falls back silently. Expected: every edit is followed by a `python -m json.tool` check (Task 2, Step 4).
2. **The vexp hook gets removed along with the cbm hooks.** Both live under `PreToolUse`. Expected: the vexp-guard entry survives (Task 2, Step 4 asserts this).
3. **The baseline misses recent sessions because usage.db is stale.** Expected: run `scan` before querying, and the window ends before Day 0 (Task 1, Steps 1–3).
4. **The `"model": "sonnet"` alias doesn't resolve to Sonnet 5.** Possible because other tiers use prefixed IDs like `deepseek/...`. Expected: a fresh session reports Sonnet 5. Fallback is `"claude-sonnet-5"` (Task 6, Step 1).
5. **Constitution edits land below the vexp marker, and a vexp update overwrites them.** Expected: the marker is still the first vexp line and all new text sits above it (Task 3, Step 6).

---

## File Map

| File | Action | Task |
|---|---|---|
| `hub/scripts/usage_window.py` | Create — token totals for a date window (reused at trial review) | 1 |
| `hub/cursor-trial-log.md` | Create — baseline + log template | 1 |
| `H:\.claude\backups\settings.json.2026-09-25-pre-cursor` | Create (backup) | 2 |
| `H:\.claude\settings.json` | Modify — model, effort, cbm hooks, learning plugin | 2 |
| `H:\.claude\hooks\cbm-*`, `H:\.claude\skills\codebase-memory\` | Move to `H:\.claude\backups\cbm-removed\` | 2 |
| `C:\Users\yates\.claude.json` | Modify — remove inactive `codebase-memory-mcp` entry (backup first) | 2 |
| `H:\.claude\CLAUDE.md` | Modify — §1 nudge, §2 table, §6 soften, §7 lessons | 3 |
| `H:\Other\Claude Projects\CLAUDE.md` | Modify — soften "ALWAYS invoke skill FIRST" to match §6 | 3 |
| `hub/model-routing.md` | Modify — Opus 5.5 / Sonnet 5, Cursor routing, fix `H:\CLAUDE.md` pointer | 3 |
| `hub/cursor-user-rules.md` | Create | 4 |
| `project-template/AGENTS.md` | Create | 5 |
| `project-template/CLAUDE.md` | Modify — `@AGENTS.md` + Claude-only content | 5 |
| `hub/CHANGELOG.md`, `hub/TASKS.md`, `hub/PLAN.md` | Modify | 6 |

---

### Task 1: Usage baseline (BEFORE any settings change)

**Files:**
- Create: `hub/scripts/usage_window.py`
- Create: `hub/cursor-trial-log.md`

**Interfaces:**
- Produces: `python hub/scripts/usage_window.py START END`, where START and END are ISO dates and END is exclusive. It prints per-model turns and tokens plus a total line. Task 6 and the 2026-10-16 review reuse it.

- [ ] **Step 1: Refresh usage.db**

Run: `python "H:/Other/Claude Projects/claude-usage/cli.py" scan`
Expected: finishes without a traceback and reports new turns.

- [ ] **Step 2: Write the window script**

```python
"""Token usage for a date window from claude-usage's usage.db.

Usage: python usage_window.py 2026-09-11 2026-09-25   (end date exclusive)
"""
import sqlite3
import sys
from pathlib import Path

DB = Path.home() / ".claude" / "usage.db"


def main(start, end):
    con = sqlite3.connect(DB)
    rows = con.execute(
        """
        SELECT COALESCE(model, '?') AS m,
               COUNT(*),
               SUM(input_tokens + output_tokens + cache_creation_tokens),
               SUM(cache_read_tokens)
        FROM turns
        WHERE timestamp >= ? AND timestamp < ?
        GROUP BY m ORDER BY 3 DESC
        """,
        (start, end),
    ).fetchall()
    total = sum(r[2] or 0 for r in rows)
    print(f"Window {start} -> {end} (exclusive)")
    print(f"{'model':<40} {'turns':>6} {'tokens*':>12} {'share':>6} {'cache_read':>12}")
    for m, turns, tok, cr in rows:
        share = (tok or 0) / total * 100 if total else 0
        print(f"{m:<40} {turns:>6} {tok or 0:>12,} {share:>5.1f}% {cr or 0:>12,}")
    print(f"{'TOTAL':<40} {sum(r[1] for r in rows):>6} {total:>12,}")
    print("* tokens = input + output + cache_creation (cache reads listed separately)")


if __name__ == "__main__":
    if len(sys.argv) != 3:
        sys.exit(__doc__)
    main(sys.argv[1], sys.argv[2])
```

- [ ] **Step 3: Run it for the two baseline weeks**

Run: `python "H:/Other/Claude Projects/hub/scripts/usage_window.py" 2026-09-11 2026-09-18`, then the same with `2026-09-18 2026-09-25`.
Expected: two tables with a non-zero TOTAL. If a TOTAL is 0, Step 1 didn't pick up transcripts. Stop and investigate.
Edge check: `python .../usage_window.py 2030-01-01 2030-01-02` prints a TOTAL of 0 and no traceback.

- [ ] **Step 4: Write `hub/cursor-trial-log.md`**

Paste both Step 3 outputs verbatim into the Baseline section:

```markdown
# Cursor Trial Log

Spec: `docs/specs/2026-09-25-cursor-integration-design.md` §5
Day 0: 2026-09-25 · Review: ~2026-10-16
Re-run: `python scripts/usage_window.py <start> <end>` (end exclusive)

## Baseline (before cleanup)

### Week A — 2026-09-11 → 2026-09-18
<paste output>

### Week B — 2026-09-18 → 2026-09-25
<paste output>

Claude usage-cap hits in these 2 weeks (user's recollection): ___

## Trial entries

One line each: `YYYY-MM-DD | cap-hit / ctrl-k-save / cursor-limit / note | detail`

| Date | Kind | Detail |
|---|---|---|

## Review (fill ~2026-10-16)

| Week | Tokens | Opus share | Cap hits |
|---|---|---|---|

Decision (spec §5 table): ___
```

(`<paste output>` stands for the Step 3 output. The executor fills it in. It is not a placeholder left in the plan.)

- [ ] **Step 5: Commit**

```bash
git -C "H:/Other/Claude Projects/hub" remote -v
git -C "H:/Other/Claude Projects/hub" add scripts/usage_window.py cursor-trial-log.md
git -C "H:/Other/Claude Projects/hub" commit -m "trial: usage.db baseline + window script for Cursor trial"
```

---

### Task 2: settings.json cleanup + cbm removal

**Files:**
- Create: `H:\.claude\backups\settings.json.2026-09-25-pre-cursor`
- Modify: `H:\.claude\settings.json`
- Move: `H:\.claude\hooks\cbm-code-discovery-gate`, `H:\.claude\hooks\cbm-session-reminder`, `H:\.claude\skills\codebase-memory\` → `H:\.claude\backups\cbm-removed\`
- Modify: `C:\Users\yates\.claude.json` (backup to `H:\.claude\backups\home-claude.json.2026-09-25`)

**Interfaces:**
- Consumes: Task 1 committed. The baseline must exist first.

- [ ] **Step 1: Backups**

```bash
mkdir -p H:/.claude/backups/cbm-removed
cp H:/.claude/settings.json H:/.claude/backups/settings.json.2026-09-25-pre-cursor
cp C:/Users/yates/.claude.json H:/.claude/backups/home-claude.json.2026-09-25
```

- [ ] **Step 2: Edit `settings.json`**

1. Delete the `PreToolUse` entry whose matcher is `"Grep|Glob|Read|Search"` (the `cbm-code-discovery-gate` hook). **Keep** the `"Grep|Glob|Regex"` vexp-guard entry.
2. Delete the whole `"SessionStart"` array. All 4 entries run `cbm-session-reminder`.
3. Set `"learning-output-style@claude-plugins-official": false`.
4. Change `"effortLevel": "xhigh"` → `"effortLevel": "high"`.
5. Add the top-level key `"model": "sonnet"` next to `effortLevel`.

The resulting `hooks` block must be exactly:

```json
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Grep|Glob|Regex",
        "hooks": [
          {
            "type": "command",
            "command": "~/.claude/hooks/vexp-guard.sh",
            "timeout": 3000
          }
        ]
      }
    ]
  },
```

- [ ] **Step 3: Move the cbm files and remove the inactive MCP entry**

```bash
mv H:/.claude/hooks/cbm-code-discovery-gate H:/.claude/hooks/cbm-session-reminder H:/.claude/backups/cbm-removed/
mv H:/.claude/skills/codebase-memory H:/.claude/backups/cbm-removed/
python -c "import json,io;p=r'C:\Users\yates\.claude.json';d=json.load(io.open(p,encoding='utf-8'));d.get('mcpServers',{}).pop('codebase-memory-mcp',None);io.open(p,'w',encoding='utf-8').write(json.dumps(d,indent=2))"
```

- [ ] **Step 4: Verify**

```bash
python -m json.tool H:/.claude/settings.json > /dev/null && echo VALID
python -c "import json;s=json.load(open(r'H:\.claude\settings.json'));h=json.dumps(s['hooks']);assert 'cbm' not in h;assert 'vexp-guard' in h;assert s['model']=='sonnet';assert s['effortLevel']=='high';assert s['enabledPlugins']['learning-output-style@claude-plugins-official'] is False;print('OK')"
python -c "import json;d=json.load(open(r'C:\Users\yates\.claude.json',encoding='utf-8'));assert 'codebase-memory-mcp' not in d.get('mcpServers',{});assert 'vexp' in d.get('mcpServers',{});print('MCP OK')"
ls H:/.claude/hooks H:/.claude/backups/cbm-removed
```

Expected: `VALID`, `OK`, `MCP OK`. `hooks/` contains only `vexp-guard.sh`. `cbm-removed/` contains the 2 scripts and `codebase-memory/`.
Rollback if anything fails: `cp H:/.claude/backups/settings.json.2026-09-25-pre-cursor H:/.claude/settings.json`.

(No commit, because `H:\.claude` is not a git repo. The fresh-session check is in Task 6.)

---

### Task 3: Constitution + model-routing updates

**Files:**
- Modify: `H:\.claude\CLAUDE.md` (§1, §2, §6, §7, all above line 134 `## vexp`)
- Modify: `H:\Other\Claude Projects\CLAUDE.md:14-17`
- Modify: `hub/model-routing.md` (lines 4, 14–15, 93, 95, 148, 150, 205, 208)

- [ ] **Step 1: Back up the constitution**

`cp H:/.claude/CLAUDE.md H:/.claude/backups/CLAUDE.md.2026-09-25-pre-cursor`

- [ ] **Step 2: Add the §1 nudge.** Append it as the last bullet of §1:

```markdown
- **Learning-mode nudge**: Output style defaults to normal. If the user asks several why/how questions about a task, or the task is educational, suggest switching on the Learning output style (`/config` → Output style).
```

- [ ] **Step 3: Replace the §2 rows for tiers 3 and 4 plus the hard rule, and add a Cursor note**

```markdown
| 3 | General coding, code review, tool implementation, intensive file searching | Sonnet 5 | `/model sonnet` — **default** (set in settings.json) |
| 4 | Complex reasoning, detailed research, large-scale planning | Opus 5.5 | `/model opus` — **use sparingly** |

**Hard rule:** Never use Opus for implementation. Plan with Opus if needed, build with Sonnet. Cap implementation at Sonnet 5.

**Cursor (separate budget):** tiny edits (rename, typo, color, string) → Cursor Ctrl+K; "what does this do / where is X" → Cursor Ask. Don't spend a Claude turn on these.
```

- [ ] **Step 4: Soften §6.** Replace the line `Before responding to any task, check if a skill applies. Invoke via Skill tool FIRST.` with:

```markdown
For non-trivial tasks, check if a skill applies and invoke it via the Skill tool FIRST. Small fixes (typo, rename, one-line change) don't need a skill — and usually belong in Cursor Ctrl+K.
```

In `H:\Other\Claude Projects\CLAUDE.md`, replace lines 16–18 (`When the user's request matches ... The skill has specialized workflows ...`) with:

```markdown
For non-trivial requests that match an available skill, invoke it using the Skill tool
as your FIRST action. Small fixes (typo, rename, one-liner) don't need a skill.
```

- [ ] **Step 5: Add two bullets to the end of the §7 list**

```markdown
- Changed global rules? Re-paste `hub/cursor-user-rules.md` into Cursor User Rules.
- `C:\Users\yates\.claude` is a junction to `H:\.claude`; `C:\Users\yates\.claude.json` is inactive.
```

- [ ] **Step 6: Verify the constitution**

```bash
grep -n -E "4\.6|4\.8" H:/.claude/CLAUDE.md || echo "no stale models"
grep -n "Learning-mode nudge\|non-trivial tasks\|cursor-user-rules\|junction\|Sonnet 5" H:/.claude/CLAUDE.md
grep -n "^## vexp" H:/.claude/CLAUDE.md
```

Expected: `no stale models`. All 5 new strings have line numbers **smaller** than the `## vexp` line.

- [ ] **Step 7: Update `hub/model-routing.md`**
- Line 4: `H:\CLAUDE.md` → `H:\.claude\CLAUDE.md`.
- Lines 14, 93, 205: `Sonnet 4.6` → `Sonnet 5`. Line 95: `/model anthropic/claude-sonnet-4-6` → `/model sonnet` (`claude-sonnet-5`).
- Lines 15, 148, 208: `Opus 4.8` → `Opus 5.5`. Line 150: `/model anthropic/claude-opus-4-8` → `/model opus` (`claude-opus-5-5`).
- After the Quick Reference table's hard-rule line, add:

```markdown
**Cursor (Free tier, separate budget):** Ctrl+K for tiny edits; Ask for code questions; editor for reviewing Claude's diffs. See `cursor-user-rules.md` and `docs/specs/2026-09-25-cursor-integration-design.md` §2.
```

Verify: `grep -n -E "4\.6|4\.8|H:\\\\CLAUDE" hub/model-routing.md || echo clean` → `clean`.

- [ ] **Step 8: Commit (hub only)**

```bash
git -C "H:/Other/Claude Projects/hub" add model-routing.md
git -C "H:/Other/Claude Projects/hub" commit -m "docs: model routing → Opus 5.5 / Sonnet 5 + Cursor routing"
```

---

### Task 4: Cursor User Rules

**Files:**
- Create: `hub/cursor-user-rules.md`

- [ ] **Step 1: Write the file**

```markdown
# Cursor User Rules — master copy

> Paste everything below the line into **Cursor Settings → Rules → User Rules**.
> Source of truth for these rules is `H:\.claude\CLAUDE.md`; re-paste when it changes.

---

- Use pnpm, never npm (npm is broken globally). pnpm lives at `C:\Users\yates\AppData\Local\pnpm`.
- Shell is Windows PowerShell 5.1: no `&&` — run commands separately or use `;`.
- Quote every path: the projects folder is `H:\Other\Claude Projects` (contains a space).
- Put files in their project folder, never at `H:\` root or a parent directory.
- Stop any dev server you start. Known ports: study-dashboard 5180/3011; Finance Tracker 5173/3001.
- Don't implement until ~95% confident in the approach — ask a clarifying question instead of guessing.
- Keep edits minimal and scoped to what was asked; match the surrounding code style.
```

- [ ] **Step 2: Commit**

```bash
git -C "H:/Other/Claude Projects/hub" add cursor-user-rules.md
git -C "H:/Other/Claude Projects/hub" commit -m "docs: Cursor user rules master copy"
```

- [ ] **Step 3: USER ACTION.** Paste the rules into Cursor Settings → Rules → User Rules. Verify by opening Cursor Ask in any project and asking "Which package manager should you use here?" Expected answer: pnpm.

---

### Task 5: Dual-tool project template

**Files:**
- Create: `project-template/AGENTS.md`
- Modify: `project-template/CLAUDE.md` (full rewrite)

- [ ] **Step 1: Create `project-template/AGENTS.md`**. This is the tool-agnostic content moved from CLAUDE.md:

````markdown
# [Project Name] — Agent Instructions

Read by Cursor (natively) and Claude Code (via `@AGENTS.md` in CLAUDE.md).

## Run commands
```bash
cd "H:/Other/Claude Projects/[project-folder]"
export PATH="$PATH:/c/Users/yates/AppData/Local/pnpm" && pnpm run dev
```

## Deploy
- Auto-deploy from `main` branch on GitHub push
- GitHub: gyates01/[repo-name]
- Live: https://[project].vercel.app
- Design system: Warm Graphite (see BRAND.md and design-tokens.css)

## Conventions
- CSS Modules for all styles (`.module.css`)
- Use `var(--*)` CSS custom properties from `design-tokens.css`
- Dark theme default (see BRAND.md for exceptions)
- `← back to hub` link in navigation pointing to `https://hub-phi-blush.vercel.app`

## Adding this project to the hub checklist
1.  Build and deploy the project
2.  Generate og:image via hub's `public/og-template.html` (1200×630 PNG)
3.  Add og:image to `hub-phi-blush.vercel.app/images/`
4.  Add card to hub `src/` with project URL, description, tech stack
5.  Update hub README.md linked projects table
6.  Push to `main` — Vercel auto-deploys
7.  Update BRAND.md Per-Project Notes section if new design patterns emerge
````

(The `[Project Name]` style brackets are the template's existing fill-in convention. They are not plan placeholders.)

- [ ] **Step 2: Replace `project-template/CLAUDE.md` with**

```markdown
# [Project Name] — Claude Instructions

@AGENTS.md

## Claude-only
- Skill routing: follow the global constitution §6 (skills first for non-trivial tasks).
- Tiny edits belong in Cursor Ctrl+K, not a Claude turn.
- Keep tool-agnostic facts (commands, ports, gotchas) in AGENTS.md so Cursor sees them too.
```

- [ ] **Step 3: Verify**

`grep -c "pnpm run dev" project-template/AGENTS.md project-template/CLAUDE.md` → `AGENTS.md:1`, `CLAUDE.md:0` (nothing duplicated).

- [ ] **Step 4: Commit (template repo)**

```bash
git -C "H:/Other/Claude Projects/project-template" add AGENTS.md CLAUDE.md
git -C "H:/Other/Claude Projects/project-template" commit -m "template: AGENTS.md for Cursor + @AGENTS.md import in CLAUDE.md"
```

---

### Task 6: Fresh-session verification, docs, tracking

**Files:**
- Modify: `hub/CHANGELOG.md`, `hub/TASKS.md`, `hub/PLAN.md`
- Modify: memory `project_cursor_integration.md`

- [ ] **Step 1: USER + CLAUDE. Check a fresh session.** Open a new terminal and run `claude` in `H:\Other\Claude Projects\hub`, then `/status`.
Expected:
  - The model is Sonnet 5. If it isn't, change `"model"` to `"claude-sonnet-5"`, re-run Task 2 Step 4, and retry.
  - There's no "Code Discovery Protocol" / cbm SessionStart text.
  - There are no `★ Insight` blocks (output style is default).
  - A `Grep` call isn't blocked by a cbm gate, and the vexp guard is still configured.
  - Check how the Learning style is re-enabled (`/config` → Output style). If that path doesn't exist in this version, fix the §1 nudge wording to the path that works.

- [ ] **Step 2: USER. Check Cursor.** Install the Claude Code extension in Cursor, open `hub` in Cursor, and run `claude` in the integrated terminal. Expected: `/ide` shows it connected to Cursor, so the `ide` MCP no longer fails. Open `project-template` in Cursor, ask the agent "How do I run this project?", and expect the `pnpm run dev` command from AGENTS.md.

- [ ] **Step 3: Update the CHANGELOG.** Add this row to the `hub/CHANGELOG.md` table:

```markdown
| 2026-09-25 | — | functional | Cursor integration Day 0: usage baseline + trial log, Claude cleanup (Sonnet default, effort high, cbm removed, learning style off), cursor-user-rules.md, model-routing → Opus 5.5/Sonnet 5, template AGENTS.md. Next: trial review ~2026-10-16 |
```

- [ ] **Step 4: Update TASKS and PLAN.** Tick the completed items in the Cursor section of `hub/TASKS.md`. Mark each milestone ✅ with its date in the `hub/PLAN.md` Milestone Status table.

- [ ] **Step 5: Update memory.** In `project_cursor_integration.md`, replace "NOT yet applied" with "applied 2026-09-25 (Day 0)". Add that cbm removal = hooks + skill only, with backups in `H:\.claude\backups\cbm-removed\`.

- [ ] **Step 6: Commit**

```bash
git -C "H:/Other/Claude Projects/hub" add CHANGELOG.md TASKS.md PLAN.md
git -C "H:/Other/Claude Projects/hub" commit -m "docs: Cursor integration Day 0 complete"
```

---

## Milestone Status

| # | Milestone | Status |
|---|---|---|
| 1 | Usage baseline recorded | ✅ 2026-09-25 |
| 2 | settings.json cleanup + cbm removed | ✅ 2026-09-25 |
| 3 | Constitution + model-routing updated | ✅ 2026-09-25 |
| 4 | Cursor User Rules created + pasted | 🔶 2026-09-25 (created; paste into Cursor is a pending user action) |
| 5 | project-template dual-tool | ✅ 2026-09-25 |
| 6 | Verified + documented (Day 0) | 🔶 2026-09-25 (docs done; fresh-session + Cursor verification pending user) |
| — | Trial review (~2026-10-16) | ⏳ Pending |
