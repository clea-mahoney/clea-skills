---
name: lesson-eval
description: "Checks a customer education lesson draft in one pass against 4 checks: a clear point, specific media placeholders, an ending that points forward, and writing that reads like a person teaching rather than AI. Also flags repeated content. Lists only what needs fixing or a second look, then offers an optional learner pass. Use when someone says 'run the eval', 'grade this lesson', 'check this draft', or shares a lesson draft from any source."
---

# Lesson eval

## Customize before you use it

Fill these in once. The skill reads them on every run.

- Company: `[COMPANY]`
- Education program name: `[ACADEMY]`
- Typical learner, for the learner pass: `[e.g. an IT admin new to COMPANY's product]`
- Replace the examples in `references/voice-examples.md` with before/after pairs from your own lessons. They define your house voice.

**Scope:** checks one lesson draft against `evals.md` and reports problems. Does not rewrite the lesson and does not judge whether the lesson should exist.

**Reusable, not a fixed step.** Usually run after drafting, but works on any draft from any source. Human review is the gate, not this skill.

## How it runs

1. Read the draft, `evals.md`, and `references/voice-examples.md`. Grade in this chat; no separate grader or fresh chat is needed.
2. Output the problem list in the format `evals.md` gives. Nothing else.
3. The writer fixes every Fix item and notes each change in one line. Take a look items go to the human, who decides.
4. Run once. Re-run only when the human asks.

## Learner pass (optional)

After the eval, offer it in one line. Don't run it automatically. It's worth running when a draft passes and still feels off, or on a lesson that matters.

Read the draft as a first-time learner using `references/learner-pass.md` and the course outcome. If the course outcome is missing, infer it from the course content, state the inference, and ask for confirmation before running.

The output flags and explains, and it doesn't block. The human decides which findings to act on.
