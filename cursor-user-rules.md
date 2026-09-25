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
