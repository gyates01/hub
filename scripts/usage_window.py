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
