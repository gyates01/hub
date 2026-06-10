# Model Routing — Task-to-Model Categories

> Definitive tier system for all Claude Code sessions. Match the task to its category, use the assigned model.
> Reference: `H:\CLAUDE.md` §2 — this file is the expanded taxonomy.

---

## Quick Reference Card

| Tier | Model | Cost | Use When... |
|------|-------|------|-------------|
| 1 | DeepSeek V4 Flash | $ | Task is mechanical, small, or local |
| 2 | DeepSeek V4 Pro | $$ | Task needs exploration or moderate reasoning |
| 3 | Sonnet 4.6 | $$$ | Task produces or reviews code (implementation cap) |
| 4 | Opus 4.8 | $$$$ | Task requires deep reasoning or cross-project planning |

**Hard rule:** Never use Opus for implementation. Plan with Opus, build with Sonnet.

---

## Tier 1 — DeepSeek V4 Flash

**Switch:** `/model deepseek/deepseek-v4-flash`
**Use when the task is mechanical, small, or operates on local-only data.**

### Category A — Content Extraction & Transcription

- Fetching YouTube video transcripts
- Extracting text from web pages (single page, no analysis needed)
- Converting file formats (PDF → text, JSON → CSV)
- Reading RSS feeds or blog content

### Category B — Note-Taking & Documentation

- Adding/editing Obsidian notes
- Creating simple markdown files from templates
- Writing changelog entries
- Updating PLANNING.md status tables

### Category C — Simple Lookups & Reads

- Reading a single known file path
- Checking git status or branch name
- Listing files in a known directory
- Running `--help` on a CLI tool
- Echoing environment variables

### Category D — Mechanical Edits

- Find-and-replace across known files (single pattern)
- Renaming files or variables (when scope is clear)
- Stripping trailing whitespace
- Adding/removing comments

---

## Tier 2 — DeepSeek V4 Pro

**Switch:** `/model deepseek/deepseek-v4-pro`
**Use when the task requires navigating the codebase or moderate reasoning.**

### Category E — Codebase Exploration

- Finding where a function/component is defined or used
- Tracing data flow through multiple files
- Understanding project structure ("how is this organized?")
- Identifying all files that touch a feature
- Searching for patterns across a project

### Category F — Moderate Data Processing

- Filtering/transforming structured data (JSON, CSV)
- Aggregating metrics from multiple sources
- Generating reports from structured input
- Parsing logs or config files

### Category G — Documentation Generation

- Creating README from codebase inspection
- Generating API docs from source
- Writing architecture overview documents
- Producing dependency graphs or relationship maps

### Category H — Stub & Skeleton Generation

- Creating file/folder structures for new projects
- Writing boilerplate config files (tsconfig, vite, tailwind)
- Generating .env templates
- Scaffolding component file trees

---

## Tier 3 — Sonnet 4.6

**Switch:** `/model anthropic/claude-sonnet-4-6`
**Use when the task produces, reviews, or modifies production code. This is the implementation cap.**

### Category I — Feature Implementation

- Writing new components, routes, or modules
- Implementing business logic
- Adding API endpoints
- Database schema changes and migrations
- Wiring up frontend to backend

### Category J — Code Review & Quality

- Reviewing pull requests or diffs
- Identifying bugs, edge cases, or security issues
- Suggesting refactors
- Running `/simplify` on recent changes
- Checking for adherence to project conventions

### Category K — Testing

- Writing unit tests
- Writing integration tests
- Debugging test failures
- Test-driven development (RED-GREEN-REFACTOR)
- Test coverage analysis

### Category L — Debugging (Standard)

- Investigating error messages or stack traces
- Fixing broken functionality
- Resolving dependency conflicts
- Patching type errors or lint issues
- Fixing build failures

### Category M — Tool Implementation

- Creating or modifying Claude Code skills/commands
- Writing Hermes skills
- Configuring MCP servers
- Setting up CI/CD pipelines
- Writing build scripts or automation

### Category N — UI Polish

- Adjusting spacing, shadows, colors
- Fixing responsive breakpoints
- Animation tweaks (transitions, hover states)
- Accessibility improvements
- Cross-browser fixes

---

## Tier 4 — Opus 4.8

**Switch:** `/model anthropic/claude-opus-4-8`
**Use ONLY for tasks requiring deep reasoning or cross-project synthesis. Never for writing code.**

### Category O — Complex Reasoning

- Multi-step algorithmic design
- Trade-off analysis with competing constraints
- Security threat modeling
- Performance optimization strategy (not implementation)
- Data model design with complex relationships

### Category P — Detailed Research & Analysis

- Competitive analysis across multiple products
- Technology evaluation and comparison
- Deep-dive investigation into a library/framework
- Regulatory/compliance analysis
- Market or domain research for a new project

### Category Q — Large-Scale Project Planning

- Full `/new-project` Phase 1-5 orchestration
- Multi-project dependency mapping
- Architecture decisions with cross-project impact
- Migration strategy (framework upgrade, DB change)
- Roadmap planning across versions

### Category R — Cross-Project Synthesis

- Updating BRAND.md with patterns observed across projects
- Auditing consistency across the Hub family
- Designing shared component libraries
- Establishing cross-project conventions

---

## Escalation Rules

1. **Start low.** Begin at the lowest tier that could handle the task. If Tier 1 fails, escalate to Tier 2, etc.
2. **Escalate on struggle.** If the current model produces wrong answers twice on the same task, bump up one tier.
3. **De-escalate when done.** After the complex reasoning is complete (e.g., Opus produced a plan), switch back to Sonnet for implementation.
4. **One task, one model.** Don't switch models mid-task — finish the current subtask, then re-evaluate.
5. **Opus gate.** If a session starts with Opus, the first action after the plan/analysis is complete is to switch to Sonnet. Never let an Opus session drift into implementation.

### Decision Flow

```
Task received
  │
  ├─ Is it mechanical/local/small? ────► Tier 1: DeepSeek Flash
  │   (transcript, note, read, rename)
  │
  ├─ Is it exploration/moderate-reasoning? ─► Tier 2: DeepSeek Pro
  │   (search codebase, trace flow, generate docs)
  │
  ├─ Is it implementation/code/review? ──► Tier 3: Sonnet 4.6
  │   (write code, review, test, debug, UI)
  │
  └─ Is it deep-reasoning/planning/research? ─► Tier 4: Opus 4.8
      (architecture, research, cross-project)
```

---

## Example Mappings

| User Says | Category | Tier | Model |
|-----------|----------|------|-------|
| "Summarize this YouTube video" | A — Content Extraction | 1 | Flash |
| "Add this to my Obsidian vault" | B — Note-Taking | 1 | Flash |
| "Where is the auth logic defined?" | E — Codebase Exploration | 2 | Pro |
| "Generate a README for this project" | G — Doc Generation | 2 | Pro |
| "Build the login form component" | I — Feature Implementation | 3 | Sonnet |
| "Review this PR" | J — Code Review | 3 | Sonnet |
| "Why is this test failing?" | L — Debugging | 3 | Sonnet |
| "Should we use Postgres or MongoDB?" | O — Complex Reasoning | 4 | Opus |
| "Plan the v2 migration" | Q — Project Planning | 4 | Opus |
| "Audit all projects for color consistency" | R — Cross-Project | 4 | Opus |

---

## Session Start Checklist

At the beginning of every Claude Code session:

1. Read the user's request
2. Map it to a category above
3. If the current model doesn't match, recommend the switch: *"This is a Tier {N} {category} task — switching to {model}."*
4. If unclear, default to Tier 3 (Sonnet) and escalate if needed
