---
name: course-dev
description: "Drafts and builds a customer education course from an approved outline: drafts lessons, runs lesson-eval, builds the course in the LMS through its MCP connector, and checks the LMS against the drafts before handing off to a reviewer. Use when someone says 'draft the lessons', 'build this course', 'push this to the LMS', 'ready for QA', or shares an approved course outline."
---

# Course dev

## Customize before you use it

Fill these in once. The skill reads them on every run.

- Company: `[COMPANY]`
- Education program name: `[ACADEMY]`
- Where drafts live: `[DOC TOOL, e.g. Notion or Google Docs]`
- LMS: `[LMS, e.g. Skilljar]`, and whether its MCP connector is set up: `[yes / no]`
- Who reviews courses before launch: `[ROLE, e.g. a product SME]`
- Your house writing rules: `[link or file]`. Without them, the skill uses `lesson-eval`'s checks.

**Scope:** turns an approved outline into drafted lessons and a course built in the LMS, ending at the hand-off to a reviewer. Does not redesign the outline or decide when the course goes live.

**Runs after:** an approved course outline. **Calls:** `lesson-eval` on each draft. **Runs before:** review and publish.

## Who decides what

SME input is product expertise, not a curriculum decision. Mid-draft SME input goes in as source material or an open question, never as a new lesson or a scope change. If it really changes the scope, send it back to course design.

## Hard rules

- Draft only from source material you were given or can fetch. Never from memory.
- Read before every write. Never overwrite a human's edits.
- Mark anything unresolved with 🔴. Use `[Screenshot: what to capture]` and `[Video: what to show]` for media.
- No em dashes.

---

## Step 1: Draft

For each lesson in the outline:
1. Read its outcome, source action, and drafter notes. Say what's in and what's cut before writing. Never restate the course overview or an earlier lesson.
2. Fetch the source material. Surface gaps before drafting.
3. Write a publication-ready draft in `[DOC TOOL]`.
4. Run `lesson-eval` once. Fix the Fix items. The human decides on the Take a look items.
5. Save the draft only after the human approves it.

## Step 2: Media

List every `[Screenshot: ...]` and `[Video: ...]` placeholder. Ask which are ready, which need capturing, and which to defer. Capture only in a demo or test account, never a customer's. Don't build in the LMS until each one is resolved or deferred.

## Step 3: Build in the LMS

**With the MCP connector:**
1. Create the course, unpublished, with its short and long description from the draft.
2. Create the lessons in one batch, in outline order. Create every lesson as a **modular lesson**, never a plain HTML lesson. A lesson's type can't change later, and a plain HTML lesson can't take a video. See `references/skilljar-notes.md`.
3. Add images directly to the lessons.
4. Publish the course **hidden**, so reviewers can open it by link and learners can't find it yet.
5. **Verify every write by reading it back.** A connector can report success when nothing changed.

**Without the connector:** convert each lesson to HTML and hand the files to the human to paste in. Then go to the manual checklist.

**Manual checklist.** Hand the human what the connector can't set, usually:
- [ ] Lesson durations
- [ ] Optional lessons
- [ ] Instructor-led sessions
- [ ] Attachments and downloads

## Step 4: Check the LMS against the drafts

Read `references/qa-check.md`. Pull every lesson from the LMS and compare it to its draft. Compare the lesson content: text, headings, callouts, and images. Ignore formatting the LMS changes when it saves. Report differences one line per lesson. Ask for human input only for what the connector can't read.

## Step 5: Hand off

Record the reviewer, the course link, and the date wherever your team tracks work. Say: "Ready for review: [link]. Reviewer: [name]." The course stays hidden until a person decides it goes live.
