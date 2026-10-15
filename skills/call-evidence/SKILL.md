---
name: call-evidence
description: "Turns customer call transcripts into ranked, source-linked evidence themes for a customer education team, so new content is prioritized from what customers actually said. Counts distinct customer speakers, ranks by what education can act on, and lists decisions for a human. Use when someone says 'run call-evidence', 'what are customers telling us', 'process these calls', or shares a set of call transcripts."
---

# call-evidence

## Customize before you use it

Fill these in once. The skill reads them on every run.

- Company: `[COMPANY]`
- Education program name: `[ACADEMY]`
- Where transcripts come from: `[CALL TOOL, e.g. a meeting recorder export]`
- Where evidence is saved: `[e.g. a database, a doc, or just this chat]`

**Scope:** reads customer call transcripts and produces a ranked list of evidence themes, each with quotes, timestamps, and a count of distinct customers. It does not decide what gets built. Its output feeds course planning and `course-dev`.

**Runs:** by hand on a batch of calls, or on a schedule (see the end of this file).

## Sources

- **The transcript is the source of truth.** Speaker labels come from the transcript only. Use auto-generated call notes and summaries to find moments, never to attribute them. When a summary credits a quote to a different person than the transcript does, use the transcript and list the mismatch.
- Every evidence line quotes the transcript word for word. No quote, no evidence.

## Who counts

- A speaker counts once per theme: a distinct, full-name, external customer.
- Count them even if their company is unknown. Flag the missing company; never drop the person from the count.
- Never count: `[COMPANY]` staff, "Speaker unknown," or first-name-only speakers.

## What counts as education evidence

- A teachable skill, judgment, or habit, or a gap in one.
- **Risky behavior counts.** A customer showing a bad habit ("I just trust it") is teaching evidence. Label it "counterpoint, teaching evidence."
- Caution counts as positive evidence ("I haven't tested this yet").
- A messy early demo is not a skills gap. Office hours exist for feedback on rough work.
- **Not education evidence:** product bugs and feature requests. List them under "Routed to product," one line each.

## Ranking

1. **Education relevance first.** Can training, a guide, or a live session change this? A strategy or judgment skill ranks above a setup or product theme, even with fewer speakers.
2. Then distinct speakers, then total examples.
3. Ranks are unique. Give the reason for each rank in one line, including any case where relevance overrode the count.
4. Setup or product-shaped themes can be marked **Hold**, with the reason ("docs or product fix first").

## Output

```
Calls processed: [dates] · Speakers counted: [n] · Excluded: [n, with reasons]

Rank | Theme | Speakers | Examples | Why this rank
...

[Theme name]
- [MM-DD] [speaker, company or "company unknown"] [timestamp]: "[verbatim quote]" (confidence: high/medium) [counterpoint label if any]

Routed to product: ...
Speaker mismatches (summary vs transcript): ...
Decisions for you: ...
```

## Where a human decides

Stop and list these under "Decisions for you." Don't resolve them yourself:
- Creating a new theme versus adding to an existing one
- Ties, or any rank where relevance and count disagree sharply
- Anything that might be a product bug rather than a skill gap
- A speaker whose identity you can't confirm from the transcript

Routine evidence on existing themes needs no approval.

## Run it on a schedule (optional)

In Claude Code, the skill can run weekly with no one watching: a scheduled task (cron, launchd, or your tool's scheduler) processes the new calls and writes routine evidence on its own. It writes nothing that needs a decision. Instead, it saves the "Decisions for you" list and sends one notification saying how many decisions are waiting, for example a desktop pop-up. A person reviews those when the notification comes in.
