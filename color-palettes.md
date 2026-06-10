# Color Palettes — Curated Design Themes

> Reference for `/new-project` Phase 4 token selection and Phase 5.5 mockup generation.
> Each palette supplies 6 tokens: BG, Surface, Accent, Text, Muted, Secondary Accent.
> All palettes are dark-first. For light variants, invert BG/Surface with Text/Muted.

---

## Palette 1 — Warm Graphite (Default)

**Vibe:** Professional, understated, data-dense. Warm blacks with a purple identity.
**Best for:** Dashboards, finance tools, data-heavy UIs, admin panels.

| Token | Hex | Swatch |
|---|---|---|
| `--bg` | `#111216` | ████████ |
| `--surface` | `#1a1c22` | ████████ |
| `--accent` | `#7c6af7` | ████████ |
| `--text` | `#f2f2f5` | ████████ |
| `--muted` | `#9da0b8` | ████████ |
| `--accent-2` | `#6366f1` | ████████ |

---

## Palette 2 — Ocean Depths

**Vibe:** Calm, focused, cool. Deep navy with teal/cyan accents.
**Best for:** Productivity tools, writing apps, analytics, health/fitness.

| Token | Hex | Swatch |
|---|---|---|
| `--bg` | `#0f1729` | ████████ |
| `--surface` | `#1a2740` | ████████ |
| `--accent` | `#0ea5e9` | ████████ |
| `--text` | `#e8ecf1` | ████████ |
| `--muted` | `#6b8aad` | ████████ |
| `--accent-2` | `#14b8a6` | ████████ |

---

## Palette 3 — Ember

**Vibe:** Warm, bold, energetic. Dark brown-black with amber/orange fire accents.
**Best for:** Creative tools, gaming dashboards, social apps, anything passion-driven.

| Token | Hex | Swatch |
|---|---|---|
| `--bg` | `#1a1210` | ████████ |
| `--surface` | `#261d18` | ████████ |
| `--accent` | `#f97316` | ████████ |
| `--text` | `#f5f0eb` | ████████ |
| `--muted` | `#a89b8c` | ████████ |
| `--accent-2` | `#eab308` | ████████ |

---

## Palette 4 — Forest

**Vibe:** Natural, grounded, calm. Deep green-black with sage/lime accents.
**Best for:** Recipe/food apps, gardening, sustainability, wellness, journaling.

| Token | Hex | Swatch |
|---|---|---|
| `--bg` | `#0f1611` | ████████ |
| `--surface` | `#18241b` | ████████ |
| `--accent` | `#22c55e` | ████████ |
| `--text` | `#eef2ef` | ████████ |
| `--muted` | `#7d9685` | ████████ |
| `--accent-2` | `#84cc16` | ████████ |

---

## Palette 5 — Rose Gold

**Vibe:** Premium, elegant, warm luxury. Deep aubergine with rose/pink accents.
**Best for:** E-commerce, lifestyle, travel, personal brands, portfolio sites.

| Token | Hex | Swatch |
|---|---|---|
| `--bg` | `#1a1118` | ████████ |
| `--surface` | `#261b23` | ████████ |
| `--accent` | `#f43f5e` | ████████ |
| `--text` | `#f5eef1` | ████████ |
| `--muted` | `#b896a3` | ████████ |
| `--accent-2` | `#d946ef` | ████████ |

---

## Palette 6 — Mono Slate

**Vibe:** Minimalist, serious, no-distraction. True grayscale with a single accent.
**Best for:** Code editors, terminals, documentation, CLI tools, developer tools.

| Token | Hex | Swatch |
|---|---|---|
| `--bg` | `#0d0d0f` | ████████ |
| `--surface` | `#16171d` | ████████ |
| `--accent` | `#3b82f6` | ████████ |
| `--text` | `#d4d4d8` | ████████ |
| `--muted` | `#71717a` | ████████ |
| `--accent-2` | `#8b5cf6` | ████████ |

---

## How to Use

### Basic CSS Output

```css
:root {
  --bg: #111216;
  --surface: #1a1c22;
  --accent: #7c6af7;
  --text: #f2f2f5;
  --muted: #9da0b8;
  --accent-2: #6366f1;
  --border: color-mix(in srgb, var(--surface) 90%, var(--text));
  --danger: #ef4444;
  --success: #22c55e;
  --warning: #eab308;
}
```

### Mixing Palettes

You can pull individual tokens from different palettes:
- "Warm Graphite base with Ocean Depths accent" → `--bg #111216`, `--accent #0ea5e9`
- "Mono Slate surface with Ember accent" → clean layout, energetic CTAs

### Light Mode Variants

Invert the relationship:
- `--bg` ↔ `--text` (swap)
- `--surface` ↔ `--muted` (swap)
- Keep `--accent` and `--accent-2` as-is

---

## Relationship to BRAND.md

This file is a **palette picker** — a quick-selection menu for new projects. The definitive design system (typography, spacing, component patterns) lives in `BRAND.md`. Palettes chosen here feed into the token generation step in Phase 4 of `/new-project`.

Once a palette is chosen for a project, it should be locked in that project's `DESIGN.md` or `design-tokens.css`. Do not change a project's palette mid-stream without user sign-off.
