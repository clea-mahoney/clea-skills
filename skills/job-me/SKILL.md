---
name: job-me
description: "Scans public company job boards (Ashby, Greenhouse, Lever, Breezy, Workable, SmartRecruiters, Recruitee, Rippling) for roles that fit your search, keeps one running list with a status per role, and builds a filterable apply board. Set up for L&D, training, instructional design and customer education by default; change the title terms to fit your own search. Use when someone says 'job scan', '/job-me', 'find me jobs', 'any new jobs', or 'check job boards'."
---

# Job me

Finds new roles on public job boards and keeps one running list. Standard-library Python, no installs, no paid tools, no LinkedIn (it is not scanned). The first run is a short setup; after that it is one command.

## Files

All data lives in this `job-me/` folder, next to `SKILL.md`:

- `config.json`: your filters (title terms, exclusions, salary floor, remote or local hybrid, age limit) and the board tiers
- `companies.csv`: the job boards to watch (platform, slug, company, API URL). The sample has 12 boards; bring your own list
- `matches.csv`: created on the first scan. Every match, with a `status` column
- `board.html`: created by `build_board.py`. A filterable board of open roles
- `scripts/scan.py`: the scanner
- `scripts/build_board.py`: builds `board.html` from `matches.csv`

## First run: set up for you

If `config.json` still has the sample terms, ask before scanning:

1. **Titles:** which role names do you want? Keep the L&D preset, or replace it (for example "learning designer", "enablement lead", "onboarding manager").
2. **Exclude:** which words should never match? (Seniority you don't want, unrelated functions, your own dealbreakers.)
3. **Pay and place:** salary floor (USD), remote only or remote plus local hybrid. For hybrid, list the towns in `hybrid_locations` in lowercase.
4. **Boards:** do you have a list of company job-board API URLs? If not, add the boards you care about to `companies.csv`. The API URL format is in the sample rows.

Make the edits, then run the scan.

## Steps

1. Run `python3 job-me/scripts/scan.py` from the folder that holds `job-me/`, in the background (it takes a few minutes). It needs network access.
2. Read only the rows with `first_seen` = today from `matches.csv`.
3. Show a short list, best fit first: title, company, location, salary, link. Group into **Strong fit** (the `strong_terms` in config) and **Maybe**. At most 15 lines; say how many more are in the file.
4. Ask which to mark `applied`, `skip` or `maybe`, and update their `status` in `matches.csv`. Keep the reason in the status, for example `skip (VP)`. Rows whose status starts with `skip` are hidden from the board.
5. Run `python3 job-me/scripts/build_board.py` and open `job-me/board.html`. Rebuild after every scan or status change.
6. If the user flags a pattern of bad matches, propose one change to `config.json`, apply it on a yes, and say what you changed.

## Notes

- Salary is checked only when the posting lists one; roles with no salary are kept.
- Workday, Oracle, Gem, Eightfold, Phenom and BambooHR boards are skipped (they need complex requests).
- `matches.csv` and `board.html` hold a personal job search. Don't commit them to a public repo, and don't share them.
- Each board is one public API call. Keep `companies.csv` to boards you actually care about.
