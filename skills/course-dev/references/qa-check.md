# QA check: LMS against drafts

Run before handing a course to a reviewer. The drafts and the LMS must match.

## 1. Pull from the LMS

Read the course, the lesson list, and each lesson's content through the connector. Run the lesson list fresh before any update; lesson IDs can change if someone rebuilds a lesson in the dashboard.

## 2. Compare

Check each item against the draft:

| Item | Check |
|---|---|
| Course description | Matches the draft? |
| Lessons | Same titles, order, and count? |
| Lesson content | Text, headings, callouts, and images match? |
| Media | No placeholders left? |
| 🔴 flags | None left. If any are open, list them by lesson and ask the human. |

Compare content, not raw code. When the LMS saves a lesson it rewrites parts of the HTML (line breaks, quote marks, color codes) without changing what a reader sees. Ignore those changes.

## 3. Report

One line per lesson that differs, naming where the change is:

`[Lesson title]: [what differs] in [drafts or LMS] under [heading]`

Lessons that match get no line. Give detail only when asked.

## 4. Human input

Ask the human only for what the connector can't read: usually lesson durations, instructor-led sessions, and attachments.
