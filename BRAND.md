# Project Hub — Brand Guidelines

> Living reference for color, typography, layout, and component patterns across all hub projects.
> Update this doc when any project intentionally diverges or establishes a new pattern.

---

## 1. Design Philosophy

- **Dark-first.** All projects default to a dark theme. PC Tracker is the intentional exception (data-dense utility tool).
- **Warm graphite, not cold.** Background tones lean slightly warm (#111216 not #000011). Avoid pure blacks or blue-tinted darks unless building a new theme variant.
- **Minimal chrome.** No decorative gradients, no heavy shadows, no rounded blobs. Let content breathe.
- **Purple identity.** `#7c6af7` is the system-wide accent — buttons, focus rings, active states. Projects can have their own accent on top of this.
- **Functional motion.** Transitions exist to orient the user, not to impress. Keep them under 0.2s.

---

## 2. Color System

### 2a. Warm Graphite Base (Recipe Logger, Finance Tracker)

| Token | Hex | Usage |
|---|---|---|
| `--bg` | `#111216` | Page background |
| `--card` / `--surface` | `#1a1c22` | Primary card / surface |
| `--card2` | `#20222a` | Secondary card, nested surfaces |
| `--border` | `#272931` | Primary borders |
| `--border2` | `#363940` | Secondary borders, dividers |
| `--text` | `#f2f2f5` | Primary text |
| `--muted` | `#9da0b8` | Secondary text, labels |
| `--dim` | `#7a7e96` | Tertiary text, placeholders |
| `--faint` | `#55586e` | Very faint, disabled states |
| `--sidebar` | `#0e0f13` | Sidebar / deepest surface |

### 2b. Hub Base (slightly lighter)

| Token | Hex | Usage |
|---|---|---|
| `--bg` | `#0d0d0f` | Page background |
| `--surface` | `#16171d` | Card base |
| `--surface-2` | `#1e1f28` | Lighter card / hover state |
| `--border` | `#2a2b35` | Borders |
| `--text` | `#9ca3af` | Regular text |
| `--text-strong` | `#f3f4f6` | Bright text, headings |
| `--text-muted` | `#6b7280` | Dimmed text |

### 2c. Accent — Purple Identity

| Token | Hex | Usage |
|---|---|---|
| `--accent` | `#7c6af7` | Primary — buttons, active states, focus rings |
| `--accent-light` | `#a78bfa` | Lighter — hover highlights, subtle tints |

### 2d. Category Accents (Recipe Logger — general-purpose categorical palette)

| Category | Token | Hex | Swatch |
|---|---|---|---|
| Breakfast | `--accent-breakfast` | `#f59e0b` | amber |
| Lunch | `--accent-lunch` | `#22c55e` | green |
| Dinner | `--accent-dinner` | `#7c6af7` | purple |
| Dessert | `--accent-dessert` | `#f43f5e` | rose |
| Snack | `--accent-snack` | `#0ea5e9` | sky blue |
| Side | `--accent-side` | `#f97316` | orange |
| Default | `--accent-default` | `#7a7e96` | dim gray |

This palette also works as a general multi-series data viz palette. Use in order for bar/line charts when categories don't have inherent meaning.

### 2e. Semantic Colors

| Token | Hex | Usage |
|---|---|---|
| `--success` / `--green` | `#22c55e` | Success, positive values, purchased state |
| `--danger` / `--red` | `#ef4444` | Errors, destructive actions |
| `--warning` / `--yellow` | `#eab308` | Warnings |
| `--amber` | `#f59e0b` | Caution, "TBD" states, pending |
| `--indigo` | `#6366f1` | Chart highlights, secondary data series |
| `--blue` | `#3b82f6` | Links, secondary accent |

### 2f. Cuisine / Sequential Palette (5-color cycling)

Use when you need colors for unlabeled sequential data (e.g., bar chart by cuisine type):

```
#f59e0b  →  #22c55e  →  #0ea5e9  →  #f43f5e  →  #a78bfa
amber        green        sky          rose         lavender
```

### 2g. PC Tracker — Light Theme

| Hex | Usage |
|---|---|
| `#f5f5f5` | Page background |
| `#ffffff` | Card background |
| `#2563eb` | Primary blue (headings, buttons, links) |
| `#10b981` | Success green (purchased items) |
| `#ef4444` | Danger red (reset) |
| `#6b7280` | Muted text |
| `#d1d5db` | Borders |

---

## 3. Typography

### Font Stacks

| Role | Stack | Used by |
|---|---|---|
| Premium | `'IBM Plex Sans', system-ui, sans-serif` | Recipe Logger, Finance Tracker |
| Lightweight | `system-ui, 'Segoe UI', Roboto, sans-serif` | Hub, PC Tracker |
| Monospace | `ui-monospace, 'Consolas', monospace` | Code blocks, chart tooltips, command strings |

**Rule:** New dark-theme projects default to IBM Plex Sans. Lightweight projects (single-file HTML, no build) use system-ui.

### Type Scale

| Role | Size | Weight | Notes |
|---|---|---|---|
| Hero / Page title | `clamp(2rem, 3.5vw, 3.25rem)` | 700 | Scales with viewport |
| Section heading | `1.25rem` / `1.5rem` | 600–700 | |
| Card title | `1rem` | 600 | |
| Body | `14px` | 400 | Base for most UI |
| Label / Meta | `12px` | 400–500 | Dates, tags, captions |
| Badge / Tag | `11px` | 500 | Compact labels |

### Line Heights

- Body: 1.5–1.6
- Headings: 1.2–1.3
- Compact UI (tables, lists): 1.4

### Global Reset

```css
-webkit-font-smoothing: antialiased;
-moz-osx-font-smoothing: grayscale;
```

---

## 4. Spacing & Layout

### Border Radius Scale

| Scale | Value | Usage |
|---|---|---|
| xs | `4px` | Dense inputs, inline tags |
| sm | `6px` | Buttons, small badges, logo marks |
| md | `8px` | Form inputs, tooltips, chips |
| lg | `12px` | Cards, panels, modals |

### Max Widths

| Name | Value | Usage |
|---|---|---|
| Content | `900px` | Single-column content (Recipe Logger) |
| Wide | `1600px` | Full dashboard / hub layout |

### Navigation Heights

| Name | Value | Usage |
|---|---|---|
| Top nav | `56px` | Desktop top bar |
| Bottom nav | `64px` | Mobile bottom tab bar |

### Standard Breakpoint

**768px** — switches between mobile and desktop layouts across all projects.

### Responsive Card Grid

```css
display: grid;
grid-template-columns: repeat(auto-fill, minmax(clamp(280px, 28vw, 380px), 1fr));
gap: clamp(16px, 2vw, 24px);
```

### Responsive Padding

```css
padding: clamp(16px, 2.5vw, 40px);  /* horizontal */
padding: clamp(32px, 5vw, 64px);    /* section vertical */
```

### Custom Scrollbar (dark theme projects)

```css
::-webkit-scrollbar { width: 5px; height: 5px; }
::-webkit-scrollbar-track { background: var(--card); }
::-webkit-scrollbar-thumb { background: var(--border); border-radius: 3px; }
::-webkit-scrollbar-thumb:hover { background: var(--border2); }
```

---

## 5. Components

### Card

```
Background:    var(--card) / var(--surface)
Border:        1px solid var(--border)
Border-radius: 12px
Padding:       20px
Accent bar:    4px height at top, color from category accent or --accent
Hover:         border-color brightens, translateY(-2px)
```

The 4px top accent bar is the project's signature card pattern. Color it with the relevant accent (category, project identity, or semantic).

### Button

```
Base:      display flex, align center, gap 8px, radius 6–8px, padding 10px 20px, weight 600, font-size 14px
Primary:   background --accent, color white
Secondary: background transparent, border 1px solid --border, color --text
Danger:    background --danger, color white
Disabled:  opacity 0.5, cursor not-allowed
Hover:     opacity 0.85 (primary/danger), border-color brightens (secondary)
Transition: opacity 0.15s
```

### Input / Form Field

```
Background:  var(--card)
Border:      1px solid var(--border)
Radius:      8px
Padding:     10px 14px
Font-size:   15px
Color:       var(--text)
Focus:       outline 2px solid var(--accent), border-color transparent
Placeholder: var(--muted)
```

### Navigation

```
Top bar height:    56px
Bottom bar height: 64px (mobile)
Background:        var(--sidebar) / var(--bg)
Active tab:        --accent color, weight 600
Inactive tab:      --muted color
Transition:        color 0.15s
```

### Badge / Tag

```
Font-size:   11px
Radius:      4px
Padding:     2px 6px
Background:  rgba(accent, 0.12–0.15)
Color:       accent hex
Weight:      500
```

### Left-Border Accent (PC Tracker pattern)

```
Default: border-left 4px solid var(--border)   | background var(--bg-light)
Active:  border-left 4px solid var(--success)  | background var(--bg-success)
```

Good for list items that have a binary on/off state (purchased, completed, active).

---

## 6. Motion

| Property | Duration | Usage |
|---|---|---|
| `opacity` | `0.15s` | Button hover, link hover |
| `color` | `0.15s` | Nav tab, link color transitions |
| `border-color` | `0.2s` | Card hover |
| `transform` | `0.15s` | Card lift (`translateY(-2px)`) |

**Default easing:** `ease` (browser default) is fine for these short durations. No custom cubic-bezier needed.

---

## 7. Per-Project Notes

### Hub (`hub-phi-blush.vercel.app`)
- Lighter dark base (`#0d0d0f`) — slightly different token naming from other projects (`--surface` not `--card`)
- system-ui font stack — no IBM Plex Sans dependency (pure static site)
- No defined accent — uses `--text-strong` for emphasis
- Hero title scales with `clamp()` + `vw`; gradient shimmer animation (`--text-strong` → `--accent-light`, 7s loop) + ambient purple radial glow behind hero
- Max-width 1600px, header spans full viewport
- **Spotlight card pattern (v1.4):** cards expose project accent as `--card-accent`; a `::before` radial gradient follows the cursor (`--mx`/`--my` set via `onMouseMove`), tinted `color-mix(in srgb, var(--card-accent) 10%, transparent)`. Hover border mixes accent 40% into `--border`. All disabled under `prefers-reduced-motion`.
- **Status pills (v1.4):** Live (green, pulsing dot) / Local (amber) / Private (lavender) — derived from `liveUrl`/`protected`, replaces 🔒 emoji badge
- **Copy button (v1.4.1):** small secondary button inside command blocks; `navigator.clipboard`, 1.5s "Copied ✓" state in `--green`

### Recipe Logger (`shiny-enigma-production-ee0c.up.railway.app`)
- Warm Graphite (`#111216`) — deepest/warmest dark
- IBM Plex Sans — premium feel
- Purple as primary identity accent (`--accent #7c6af7`)
- Full 6-category accent system
- Mobile-first: bottom nav on mobile, top nav on desktop
- Custom scrollbar styled to match theme

### Finance Tracker (`finance-tracker-production-a193.up.railway.app`)
- Identical tokens to Recipe Logger — both use Warm Graphite + IBM Plex Sans
- Additional semantic tokens: `--indigo`, `--blue`, `--yellow`, `--amber` (for financial data viz)
- Chart tooltips override: navy `#0f172a` bg, DM Mono font, via `.recharts-default-tooltip`

### PC Tracker (`pc-tracker-orpin.vercel.app`)
- **Light theme exception** — the only light-background project
- Primary blue `#2563eb` as identity color
- Standalone `index.html` — no build step, embedded styles
- Left-border accent pattern on list items (state-driven color)
- Future: if redesigned, adopt dark theme + `--accent` purple

### Craps (`craps-simulator-rose.vercel.app`)
- Tailwind CSS only — no custom CSS vars
- Stays in sync with Tailwind's own design system
- Future: if custom UI is needed, add a `tailwind.config.js` theme extension to reference the token hex values above

### claude-usage (local only)
- Python CLI + minimal server-rendered HTML dashboard
- No formal design system yet
- Future: if a web UI is added, use Warm Graphite + Hub tokens as starting point

---

## 8. Starting a New Project

1. Copy `design-tokens.css` (in this directory) into your project's styles folder
2. Choose IBM Plex Sans (premium) or system-ui (lightweight) — add font import if IBM Plex
3. Pick an **identity accent** — purple (`--accent`) by default, or override with a project-specific hue
4. Use the card + button patterns from Section 5 as your base component kit
5. Add this project to the hub and update this doc's Per-Project Notes section

---

*Last updated: 2026-06-12*
