Grade only what's on the page: the lesson draft, this file, and `references/voice-examples.md` (reference for check 4 only; don't grade the examples).

Skip any passage the human says they, a teammate, or an SME wrote or approved.

Two labels:
- **Fix:** blocks publishing.
- **Take a look:** the human decides.

**Output:** list problems only. Fix items first, then at most 5 Take a look items, most important first. Each one names the check and quotes the sentence. If nothing is wrong, output one line: `Nothing to fix.`

---

**1. Clear point (Take a look).**
Can you say in a sentence what this lesson helps the reader do or decide? It doesn't need to be narrow, and "In this lesson" openers are fine. Take a look only if the lesson has no point you can name, or it pulls in two directions that would each need their own lesson.

**2. Media placeholders are specific and in the right spot (Fix).**
Every `[Screenshot: ...]` and `[Video: ...]` must describe what to capture well enough that someone who didn't write the lesson could make it. "Screenshot of the Approvers field set to the on-call group" passes. "Add screenshot here" is a Fix. The placeholder must sit at the step or paragraph it supports, not at the end of a section.

**3. The ending points forward (Take a look if missing).**
A middle lesson ends with "Next up," which tells the reader what comes next or asks them to keep going. The last lesson ends with "Next steps," which gives them things to do from here. Generic wording is fine. Take a look only if the section is missing.

**4. Reads like a person teaching, not AI (Take a look).**
Take a look only when the same pattern shows up 3 or more times in the lesson. One or two instances are human writing. Quote the sentences. The patterns:
- Filler and signposting: "Let's dive in," "It's important to note," "Now that you've seen..."
- Contrast for effect, also called contrastive negation: "It's not X, it's Y," where the second half says nothing new. Also clipped negations tacked on the end: "no guessing," "no wasted motion."
- Dramatic fragments: "One step. One click. That's it."
- Inflated words: "leverage," "utilize," "seamless," "robust," "serves as," "crucial role," "evolving landscape."
- Fake-insight setups: "The real question is," "Here's the thing," "What really matters is."
- Business idioms and stock phrases: "first call," "fade into the background," "move the needle," "game changer." Say the literal thing.
- Tacked-on "-ing" phrases that add fake depth: "...ensuring consistency across your team."
- Forced threes: a list of three when the content has two or four things to say.
- Same thing, new name each time: "the assistant," then "the AI helper," then "the tool."
- Bold label opening every bullet when the list doesn't need labels.
- Generic upbeat endings, also called pseudo-CTAs: a closing line that sounds like a call to action but asks for nothing specific. "With these steps, you're ready to take your automation to the next level."
- Talking about the learning instead of the work: "the proof it stuck," "this builds the muscle."
- Nobody home: the whole lesson reads as instructions issued by nobody. Compare the sentence shape with the "Better" side of `voice-examples.md`.

Also Take a look for any em dash, title-case headings, or a list of 3+ items missing the Oxford comma.

**Also Fix:**
- A passage that restates the course overview, an earlier lesson, or the prerequisites. Quote it and name what it repeats, if you can see it.
- Inconsistent names for AI tools. If `[COMPANY]`'s product has its own built-in AI, use its name only for that feature. Call outside tools "the AI" or "your AI client," not "the agent."
