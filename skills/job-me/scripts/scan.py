#!/usr/bin/env python3
"""Scan public company job boards for roles that fit your search.

Reads companies.csv (job-board API URLs) and config.json (your filters, in the job-me
folder one level up), fetches every board, keeps matching roles, and appends new ones
to matches.csv. Standard library only. Usage: python3 scripts/scan.py [--limit N]
"""
import csv, json, re, sys, time, datetime as dt
from concurrent.futures import ThreadPoolExecutor, as_completed
from pathlib import Path
from urllib.request import Request, urlopen

HERE = Path(__file__).resolve().parent.parent  # the job-me folder: config, companies, matches
CFG = json.loads((HERE / "config.json").read_text())
MATCHES = HERE / "matches.csv"
FIELDS = ["first_seen", "status", "company", "title", "location", "remote", "salary", "posted", "url", "platform"]
NOW = dt.datetime.now(dt.timezone.utc)


def fetch(url):
    req = Request(url, headers={"User-Agent": "Mozilla/5.0 (job-me)", "Accept": "application/json"})
    with urlopen(req, timeout=15) as r:
        return json.loads(r.read().decode("utf-8", "replace"))


def parse_date(v):
    if v in (None, ""):
        return None
    try:
        if isinstance(v, (int, float)):
            return dt.datetime.fromtimestamp(v / 1000 if v > 1e11 else v, dt.timezone.utc)
        d = dt.datetime.fromisoformat(str(v).replace("Z", "+00:00")[:25])
        return d if d.tzinfo else d.replace(tzinfo=dt.timezone.utc)
    except Exception:
        return None


def money(lo, hi, cur="USD"):
    if not (lo or hi):
        return "", None
    top = hi or lo
    return f"{cur} {int(lo or 0):,}-{int(top):,}", float(top)


def salary_from_text(s):
    """Best-effort yearly top of a salary string, e.g. '$120K - $150K' or '$45 - $80 per hour'."""
    if not s:
        return None
    hourly = bool(re.search(r"per hour|/\s*hr|/\s*hour|hourly", str(s), re.I))
    nums = []
    for n, k in re.findall(r"\$?\s?(\d[\d,\.]*)\s*([kK])?", str(s)):
        try:
            v = float(n.replace(",", ""))
        except ValueError:
            continue
        v = v * 1000 if k else v
        v = v * 2080 if hourly and v < 1000 else v
        if v >= 20000:
            nums.append(v)
    return max(nums) if nums else None


def jobs_for(platform, slug, data):
    """Yield dicts with title, location, remote, salary, salary_top, posted, url."""
    if platform == "Ashby":
        for j in data.get("jobs", []):
            comp = (j.get("compensation") or {}).get("compensationTierSummary") or ""
            yield dict(title=j.get("title"), location=j.get("location") or "",
                       remote=(j.get("workplaceType") == "Remote") if j.get("workplaceType") else bool(j.get("isRemote")),
                       salary=comp, salary_top=salary_from_text(comp),
                       posted=j.get("publishedAt"), url=j.get("jobUrl"))
    elif platform == "Greenhouse":
        for j in data.get("jobs", []):
            loc = (j.get("location") or {}).get("name", "")
            yield dict(title=j.get("title"), location=loc, remote="remote" in loc.lower(),
                       salary="", salary_top=None, posted=j.get("updated_at"), url=j.get("absolute_url"))
    elif platform == "Lever":
        for j in data if isinstance(data, list) else []:
            cat = j.get("categories") or {}
            sr = j.get("salaryRange") or {}
            sal, top = money(sr.get("min"), sr.get("max"), sr.get("currency") or "USD")
            loc = cat.get("location") or ""
            yield dict(title=j.get("text"), location=loc,
                       remote=j.get("workplaceType") == "remote" or "remote" in loc.lower(),
                       salary=sal, salary_top=top, posted=j.get("createdAt"), url=j.get("hostedUrl"))
    elif platform == "Breezy":
        for j in data if isinstance(data, list) else []:
            loc = j.get("location") or {}
            name = loc.get("name", "") if isinstance(loc, dict) else str(loc)
            sal = j.get("salary") or ""
            yield dict(title=j.get("name"), location=name,
                       remote=bool(isinstance(loc, dict) and loc.get("is_remote")) or "remote" in name.lower(),
                       salary=sal, salary_top=salary_from_text(sal), posted=j.get("published_date"), url=j.get("url"))
    elif platform == "Workable":
        for j in data.get("jobs", []):
            loc = ", ".join(x for x in [j.get("city"), j.get("state"), j.get("country")] if x)
            yield dict(title=j.get("title"), location=loc, remote=bool(j.get("telecommuting")),
                       salary="", salary_top=None, posted=j.get("published_on"), url=j.get("url"))
    elif platform == "SmartRecruiters":
        for j in data.get("content", []):
            loc = j.get("location") or {}
            yield dict(title=j.get("name"), location=loc.get("fullLocation") or loc.get("city") or "",
                       remote=bool(loc.get("remote")), salary="", salary_top=None, posted=j.get("releasedDate"),
                       url=f"https://jobs.smartrecruiters.com/{slug}/{j.get('id')}")
    elif platform == "Recruitee":
        for j in data.get("offers", []):
            s = j.get("salary") or {}
            sal, top = money(s.get("min"), s.get("max"), s.get("currency") or "USD")
            yield dict(title=j.get("title"), location=j.get("location") or "", remote=bool(j.get("remote")),
                       salary=sal, salary_top=top, posted=j.get("published_at"), url=j.get("careers_url"))
    else:  # Rippling, Dover and anything else: best-effort generic reader
        items = data if isinstance(data, list) else next(
            (v for v in data.values() if isinstance(v, list)), []) if isinstance(data, dict) else []
        for j in items:
            if not isinstance(j, dict):
                continue
            loc = j.get("location") or j.get("workLocation") or ""
            if isinstance(loc, dict):
                loc = loc.get("name") or loc.get("label") or ""
            if isinstance(loc, list):
                loc = "; ".join(str(x.get("name", x) if isinstance(x, dict) else x) for x in loc)
            yield dict(title=j.get("title") or j.get("name"), location=str(loc),
                       remote="remote" in str(loc).lower(), salary="", salary_top=None,
                       posted=j.get("created_at") or j.get("publishedAt"),
                       url=j.get("url") or j.get("absolute_url") or j.get("hostedUrl") or "")


US_STATE = re.compile(r",\s*(A[LKZR]|C[AOT]|D[EC]|FL|GA|HI|I[DLNA]|K[SY]|LA|M[EDAINSOT]|N[EVHJMYCD]|O[HKR]|PA|RI|S[CD]|T[NX]|UT|V[TA]|W[AVIY])\b")
NEUTRAL = re.compile(r"^[\s\-/,()|]*(remote|anywhere|fully remote|distributed|virtual|work from home|wfh|hybrid)?[\s\-/,()|]*$", re.I)


def us_ok(raw):
    """Remote role open to someone in the US: names the US, a US state, or no country at all."""
    low = " " + raw.lower() + " "
    if re.search(r"united states|\bu\.?s\.?a?\b|north america|americas", low) or US_STATE.search(raw):
        return True
    if any(m in low for m in CFG["non_us_markers"]):
        return False
    return bool(NEUTRAL.match(raw))


def keep(j):
    t = (j.get("title") or "").lower()
    if not t or not any(k in t for k in CFG["title_include"]):
        return False
    if any(k in t for k in CFG["title_exclude"]):
        return False
    raw = j.get("location") or ""
    loc = " " + raw.lower()
    if any(c in loc for c in CFG.get("location_exclude", [])):
        return False
    near = any(h in loc for h in CFG["hybrid_locations"])
    remote = CFG["remote_ok"] and (j.get("remote") or "remote" in loc)
    if not (remote or near):
        return False
    if remote and not near and not us_ok(raw):
        return False
    if j.get("salary_top") and j["salary_top"] < CFG["salary_min_usd"]:
        return False
    posted = parse_date(j.get("posted"))
    if posted and (NOW - posted).days > CFG["max_age_days"]:
        return False
    return True


def scan_one(row):
    if any(x in (row["company"] + row["slug"]).lower() for x in CFG.get("company_exclude", [])):
        return row, [], None
    try:
        data = fetch(row["api_url"])
        return row, [j for j in jobs_for(row["platform"], row["slug"], data) if keep(j)], None
    except Exception as e:
        return row, [], type(e).__name__


def main():
    limit = int(sys.argv[sys.argv.index("--limit") + 1]) if "--limit" in sys.argv else None
    rows = list(csv.DictReader(open(HERE / "companies.csv")))[:limit]
    seen = set()
    if MATCHES.exists():
        for r in csv.DictReader(open(MATCHES)):
            seen |= {r["url"], (r["company"].lower(), r["title"].strip().lower())}
    new, errors, start = [], 0, time.time()
    with ThreadPoolExecutor(max_workers=32) as pool:
        for i, fut in enumerate(as_completed(pool.submit(scan_one, r) for r in rows), 1):
            row, jobs, err = fut.result()
            errors += bool(err)
            for j in jobs:
                key = (row["company"].lower(), (j["title"] or "").strip().lower())
                if j["url"] and j["url"] not in seen and key not in seen:
                    seen |= {j["url"], key}
                    p = parse_date(j.get("posted"))
                    new.append(dict(first_seen=NOW.date().isoformat(), status="new", company=row["company"],
                                    title=j["title"].strip(), location=j["location"], remote="yes" if j["remote"] else "",
                                    salary=j["salary"], posted=p.date().isoformat() if p else "",
                                    url=j["url"], platform=row["platform"]))
            if i % 1000 == 0:
                print(f"  {i}/{len(rows)} boards checked, {len(new)} new matches so far", flush=True)
    write_header = not MATCHES.exists()
    with open(MATCHES, "a", newline="") as f:
        w = csv.DictWriter(f, fieldnames=FIELDS)
        if write_header:
            w.writeheader()
        w.writerows(sorted(new, key=lambda r: r["posted"], reverse=True))
    print(f"Done in {time.time() - start:.0f}s: {len(rows)} boards, {errors} unreachable, {len(new)} new matches -> matches.csv")
    for r in sorted(new, key=lambda r: r["posted"], reverse=True)[:40]:
        print(f"- {r['title']} | {r['company']} | {r['location'] or '-'} | {r['salary'] or 'salary n/a'} | {r['url']}")


if __name__ == "__main__":
    main()
