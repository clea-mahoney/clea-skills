"""Render matches.csv into board.html: a filterable apply-ASAP board.

Skips every row whose status starts with "skip". Tiers come from config.json "board":
  asap   = status starts with apply_status_prefix (already chosen to apply)
  strong = title contains one of strong_terms
  maybe  = everything else still open
Usage: python3 scripts/build_board.py   (paths are relative to the job-me folder)
"""
import csv, json, datetime as dt
from pathlib import Path

HERE = Path(__file__).resolve().parent.parent
BOARD = json.loads((HERE / "config.json").read_text())["board"]
SRC = HERE / "matches.csv"
OUT = HERE / "board.html"

def tier(status, title):
    if status.lower().startswith(BOARD["apply_status_prefix"]):
        return "asap"
    t = title.lower()
    if any(term in t for term in BOARD["strong_terms"]):
        return "strong"
    return "maybe"


rows = []
for r in csv.DictReader(open(SRC, newline="")):
    if r["status"].lower().startswith("skip"):
        continue
    rows.append({
        "company": r["company"],
        "title": r["title"],
        "location": r["location"],
        "salary": r["salary"],
        "posted": r["posted"],
        "first_seen": r["first_seen"],
        "url": r["url"],
        "status": r["status"],
        "tier": tier(r["status"], r["title"]),
    })

order = {"asap": 0, "strong": 1, "maybe": 2}
rows.sort(key=lambda x: (order[x["tier"]], x["posted"] or "0000"), reverse=False)
rows.sort(key=lambda x: order[x["tier"]])

# "</" is escaped so the JSON cannot close the script tag early
data = json.dumps(rows, ensure_ascii=False).replace("</", "<\\/")
stamp = dt.datetime.now().strftime("%Y-%m-%d %H:%M")

HTML = """<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="claude:viewport-fit-sides" content="cover">
<title>Job Apply Board</title>
<style>
:root {
  --bg: #f6f5f1; --surface: #ffffff; --fg: #1d1c19; --muted: #6b6860;
  --line: #e2dfd6; --accent: #2f5d50; --asap: #b5452b; --strong: #2f5d50; --maybe: #8a6d1f;
  color-scheme: light;
}
@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]) {
    --bg: #161614; --surface: #201f1c; --fg: #ecebe6; --muted: #9b988f;
    --line: #34322d; --accent: #7fb8a5; --asap: #e8806a; --strong: #7fb8a5; --maybe: #d2b465;
    color-scheme: dark;
  }
}
:root[data-theme="dark"] {
  --bg: #161614; --surface: #201f1c; --fg: #ecebe6; --muted: #9b988f;
  --line: #34322d; --accent: #7fb8a5; --asap: #e8806a; --strong: #7fb8a5; --maybe: #d2b465;
  color-scheme: dark;
}
* { box-sizing: border-box; }
body {
  margin: 0; background: var(--bg); color: var(--fg);
  font: 14px/1.5 -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  padding-left: max(16px, env(safe-area-inset-left, 0px));
  padding-right: max(16px, env(safe-area-inset-right, 0px));
  padding-block: 20px 40px;
}
header { max-width: 860px; margin: 0 auto 16px; }
h1 { font-size: 22px; margin: 0 0 4px; letter-spacing: -0.01em; }
.meta { color: var(--muted); font-size: 13px; }
.controls { max-width: 860px; margin: 0 auto 16px; display: flex; flex-wrap: wrap; gap: 8px; align-items: center; }
input[type="search"] {
  flex: 1 1 220px; min-width: 0; padding: 9px 12px; border-radius: 8px;
  border: 1px solid var(--line); background: var(--surface); color: var(--fg); font: inherit;
}
.chips { display: flex; gap: 6px; flex-wrap: wrap; }
.chip {
  padding: 7px 12px; border-radius: 999px; border: 1px solid var(--line);
  background: var(--surface); color: var(--fg); font: inherit; cursor: pointer;
}
.chip[aria-pressed="true"] { border-color: var(--accent); box-shadow: inset 0 0 0 1px var(--accent); }
.count { color: var(--muted); font-size: 13px; }
ul {
  list-style: none; margin: 0 auto; padding: 0; max-width: 860px;
  display: grid; gap: 10px; grid-template-columns: repeat(auto-fill, minmax(190px, 1fr));
}
li { min-width: 0; }
a.tile {
  display: flex; flex-direction: column; gap: 6px; height: 100%; min-width: 0;
  background: var(--surface); border: 1px solid var(--line); border-radius: 10px;
  padding: 12px 14px; color: var(--fg); text-decoration: none;
}
a.tile:hover, a.tile:focus-visible { border-color: var(--accent); }
.pill {
  align-self: flex-start; font-size: 10px; font-weight: 600; letter-spacing: 0.05em; text-transform: uppercase;
  padding: 2px 7px; border-radius: 999px; border: 1px solid currentColor; white-space: nowrap;
}
.t-asap { color: var(--asap); }
.t-strong { color: var(--strong); }
.t-maybe { color: var(--maybe); }
.title { font-weight: 600; font-size: 14px; line-height: 1.3; overflow-wrap: anywhere; }
.company { color: var(--muted); font-size: 13px; overflow-wrap: anywhere; }
.facts { margin-top: auto; color: var(--muted); font-size: 12px; overflow-wrap: anywhere; }
.empty { color: var(--muted); text-align: center; padding: 30px 0; }
[hidden] { display: none !important; }
</style>
</head>
<body>
<header>
  <h1>Job Apply Board</h1>
  <div class="meta">Skipped roles are hidden. Updated __STAMP__ from matches.csv.</div>
</header>
<div class="controls">
  <input type="search" id="q" placeholder="Search title, company, location" aria-label="Search roles">
  <div class="chips" role="group" aria-label="Priority">
    <button class="chip" data-tier="all" aria-pressed="true">All</button>
    <button class="chip" data-tier="asap" aria-pressed="false">Apply ASAP</button>
    <button class="chip" data-tier="strong" aria-pressed="false">Strong fit</button>
    <button class="chip" data-tier="maybe" aria-pressed="false">Maybe</button>
  </div>
  <div class="count" id="count"></div>
</div>
<ul id="list"></ul>
<div class="empty" id="empty" hidden>No roles match these filters.</div>
<script>
const ROWS = __DATA__;
const LABEL = { asap: "Apply ASAP", strong: "Strong fit", maybe: "Maybe" };
const list = document.getElementById("list");
const q = document.getElementById("q");
const count = document.getElementById("count");
const empty = document.getElementById("empty");
let tier = "all";

function el(tag, cls, text) {
  const n = document.createElement(tag);
  if (cls) n.className = cls;
  if (text != null) n.textContent = text;
  return n;
}

function card(r) {
  // whole tile is the link to the posting
  const li = el("li");
  const a = el("a", "tile");
  a.href = r.url; a.target = "_blank"; a.rel = "noopener";
  a.setAttribute("aria-label", r.title + " at " + r.company);
  const facts = el("div", "facts", [r.location, r.salary].filter(Boolean).join(" · "));
  a.append(el("span", "pill t-" + r.tier, LABEL[r.tier]),
           el("div", "title", r.title), el("div", "company", r.company), facts);
  li.append(a);
  return li;
}

function render() {
  const term = q.value.trim().toLowerCase();
  const shown = ROWS.filter(r =>
    (tier === "all" || r.tier === tier) &&
    (!term || (r.title + " " + r.company + " " + r.location).toLowerCase().includes(term)));
  list.replaceChildren(...shown.map(card));
  count.textContent = shown.length + " of " + ROWS.length + " roles";
  empty.hidden = shown.length > 0;
}

document.querySelectorAll(".chip").forEach(b => b.addEventListener("click", () => {
  tier = b.dataset.tier;
  document.querySelectorAll(".chip").forEach(c => c.setAttribute("aria-pressed", String(c === b)));
  render();
}));
q.addEventListener("input", render);
render();
</script>
</body>
</html>
"""

OUT.write_text(HTML.replace("__DATA__", data).replace("__STAMP__", stamp), encoding="utf-8")
print(f"wrote {OUT.name}: {len(rows)} open roles "
      f"(asap {sum(r['tier']=='asap' for r in rows)}, strong {sum(r['tier']=='strong' for r in rows)}, "
      f"maybe {sum(r['tier']=='maybe' for r in rows)})")
