# CLEA skills: Customer Learning Experience Agents

Three AI skills for customer education teams, by Clea Mahoney. Each one does one job and leaves the judgment calls to a person. Use them as they are, or adapt them to your own company, learners, and tools.

They were built and used on a real customer education team, then rewritten for sharing. No company, customer, or employee data is included. I shared them in the Skilljar by Gainsight webinar *"Wait, How Did You Get AI to Do That?: AI Workflows for Customer Education"* (October 15, 2026), co-presented with [Christie DeCarolis](https://christiedecarolis.com/aiworkflows.html).

**[Click through the walkthrough](https://clea-mahoney.github.io/clea-skills/)** to see how lesson-eval and course-dev changed over time.

## How they fit together

The skills follow the order you work in:

1. **call-evidence** reads customer calls and tells you what customers are stuck on, so you know what to build.
2. **course-dev** turns an approved outline into drafted lessons and builds the course in your LMS. It runs lesson-eval on every draft.
3. **lesson-eval** checks a lesson draft before a person reviews it. It also works on its own, on a draft from any source.

## The skills

| Skill | What it does | Where a person decides | Download |
|---|---|---|---|
| [call-evidence](skills/call-evidence/SKILL.md) | Turns customer call transcripts into ranked themes, ordered by what education can act on rather than by volume. Can run weekly on a schedule. | New themes, ties, themes put on Hold, and anything that may be a product bug | [call-evidence.zip](https://github.com/clea-mahoney/clea-skills/raw/main/downloads/call-evidence.zip) |
| [course-dev](skills/course-dev/SKILL.md) | Drafts lessons from an approved outline, runs lesson-eval, builds the course in your LMS through its MCP connector, and checks the LMS against the drafts | Approving each draft, choosing the reviewer, and when the course goes live | [course-dev.zip](https://github.com/clea-mahoney/clea-skills/raw/main/downloads/course-dev.zip) |
| [lesson-eval](skills/lesson-eval/SKILL.md) | Checks a lesson draft in one pass and lists only what needs fixing: a clear point, specific media placeholders, a forward-pointing ending, and writing that sounds like a person | Only Fix items block. Take a look items are your call. | [lesson-eval.zip](https://github.com/clea-mahoney/clea-skills/raw/main/downloads/lesson-eval.zip) |

## Add a skill to Claude

1. Download the skill's ZIP from the table above.
2. In Claude, open **Settings → Capabilities → Skills** and upload the ZIP.
3. Open the skill's `SKILL.md` and fill in **Customize before you use it**: your company, program name, tools, and learners.
4. Swap in your own examples where the skill asks.
5. Try it on real work and watch the first run. Check what it flags against your own judgment, then adjust the instructions.

### Claude Code or Codex

Copy the skill folders from `skills/` into `~/.claude/skills/` (Claude Code) or `~/.agents/skills/` (Codex):

```bash
git clone https://github.com/clea-mahoney/clea-skills.git
```

```bash
cp -r clea-skills/skills/* ~/.claude/skills/
```

Then describe the task, or run `/call-evidence`, `/course-dev`, or `/lesson-eval`.

### ChatGPT, Gemini, Copilot, or another AI

The skills are plain Markdown. Create a custom GPT, Gem, or project, paste the skill's `SKILL.md` into its instructions, and add the files in its `references/` folder (and `evals.md` for lesson-eval) as knowledge files.

## Make it yours

- **call-evidence:** start with a few real transcripts from your own calls. Check the speaker counts and exclusions against what you know before you trust the ranking, and edit the exclusion rules to match who counts as a customer for you.
- **course-dev:** replace `references/skilljar-notes.md` with your own LMS's quirks. Without an MCP connector, it hands you HTML to paste in.
- **lesson-eval:** replace the pairs in `references/voice-examples.md` with before and after sentences from your own lessons. They teach it your voice better than any rule list.

## Try the examples

`examples/` has fictional inputs with problems planted on purpose. The company is written as COMPANY.

- `examples/call-evidence/calls/`: three office-hours transcripts and a call summary that disagrees with them about who said a quote. The transcript should win. The loudest theme should land on Hold, below a smaller one education can act on. `sample-output.md` shows a real run.
- `examples/lesson-eval/lesson-draft.md`: AI-sounding writing, a vague screenshot placeholder, and a missing "Next up." lesson-eval should list them without rewriting the lesson.

## What changed along the way

- **call-evidence** used to drop real customers from the count when their company was unknown. Now every named customer counts, and a missing company gets flagged.
- **course-dev** went from pasting every lesson into the LMS and checking it by hand, to building and checking the course through the MCP. Every lesson is now a modular lesson so it can take video, and every change is read back to confirm it saved.
- **lesson-eval** went from 15 checks and a grading loop to 4 checks in one pass. Drafts kept coming back with lines like "It's not a delay, it's a safety net," so I kept adding checks to catch them. Then I found the cause: my drafting instructions told the AI to "express value through contrast," so it was writing those lines on purpose. Once I fixed the drafting instructions, most of the checks had nothing left to catch, and I cut them.

## Tips

- Give each skill your context: company, learners, and tools.
- Keep skills focused. Hand off between them instead of building one huge prompt.
- When a skill keeps growing, look for where the mistake starts before you add another check.
- Watch the first run yourself before you put a skill on a schedule.

## License

MIT License: you can use, copy, change, and share these skills for free, including at work, as long as you keep the license notice with them. They come as is, with no warranty. Credit is appreciated but not required. See [LICENSE](LICENSE).

Created by Clea Mahoney.
