# CLEA skills: Customer Learning Experience Agents

AI skills for customer education (mostly) and job search, by Clea Mahoney. Each skill does one job and leaves the judgment calls to a person. Adapt them to your own company, audience, and tools.

Some skills were built and used on a real customer education team, then rewritten for sharing without company, customer, or employee data. I shared lesson-eval and course-dev in the Skilljar by Gainsight webinar *"Wait, How Did You Get AI to Do That?: AI Workflows for Customer Education"* (October 15, 2026), co-presented with [Christie DeCarolis](https://christiedecarolis.com/aiworkflows.html).

[![A peek into Clea's brain: click to start the interactive walkthrough](docs/walkthrough/cover.png)](https://clea-mahoney.github.io/clea-skills/walkthrough/)

**[Click through the webinar walkthrough](https://clea-mahoney.github.io/clea-skills/)** to see how lesson-eval and course-dev changed over time, or **[try the interactive version](https://clea-mahoney.github.io/clea-skills/walkthrough/)** to sort the findings and match the fixes yourself.

## The skills

| Skill | What it does | Where a person decides | Download |
|---|---|---|---|
| [course-request](skills/course-request/SKILL.md) | Uses your audience, goals, evidence, and work context to triage a training request and draft an action map when learning is needed | Confirming the recommended response and the final action map | [Download](https://github.com/clea-mahoney/clea-skills/raw/main/downloads/course-request.zip) |
| [course-dev](skills/course-dev/SKILL.md) | Drafts lessons from an approved outline, runs lesson-eval, builds the course in your LMS through its MCP connector, and checks the LMS against the drafts | Approving each draft, choosing the reviewer, and when the course goes live | [Download](https://github.com/clea-mahoney/clea-skills/raw/main/downloads/course-dev.zip) |
| [lesson-eval](skills/lesson-eval/SKILL.md) | Checks a lesson draft in one pass and lists only what needs fixing: a clear point, specific media placeholders, a forward-pointing ending, and writing that sounds like a person | Only Fix items block. Take a look items are your call. | [Download](https://github.com/clea-mahoney/clea-skills/raw/main/downloads/lesson-eval.zip) |
| [job-me](skills/job-me/SKILL.md) | Checks public company job boards for roles that fit your search, keeps one list with a status per role, and builds a filterable board. Set up for L&D, training, instructional design, and customer education titles. Your matches stay on your machine. | Which roles to apply to and which to skip | [Download](https://github.com/clea-mahoney/clea-skills/raw/main/downloads/job-me.zip) |

## Start with the request

A request for a course usually arrives with a solution already attached. Product wants training because customers are making mistakes. Operations wants onboarding because new hires are routing work incorrectly. Before building anything, I want to know what people need to do, what's getting in their way, and whether learning would help.

That's the job of **course-request**. Give it your audience, goals, setting, and whatever evidence you have. It helps you fill in missing context, considers the smallest useful response, and keeps assumptions visible. The answer might be practice, clearer documentation, a product or workflow change, or a combination. You confirm the recommendation. When learning is part of the answer, it drafts an action map connecting the goal, job actions, practice, and minimum information needed. You review that map before design starts.

The shared version works for customer education, internal L&D, and other settings. It checks which support options are actually available instead of assuming every team can assign coaching or involve a learner's manager. You can use it entirely in chat.

This comes before course-dev. An approved action map guides the design of the learning experience and its outline. Once that outline is approved, course-dev drafts and builds the lessons, using lesson-eval to check the drafts. You can also use each skill on its own.

### Try it

These two fictional examples show how different evidence leads to different recommendations. The inputs and example outputs were written to illustrate the workflow; they are not recorded model tests or real customer or employee records.

- **Customer education:** Product asks for a course because customers are making custom-report errors. [Input](examples/course-request/customer-education-input.md) · [Example draft output](examples/course-request/customer-education-output.md)
- **Internal L&D:** Operations asks for onboarding training after routing mistakes. [Input](examples/course-request/internal-ld-input.md) · [Example draft output](examples/course-request/internal-ld-output.md)

## Add a skill to Claude

1. Click **Download** in the table above. You get a compressed folder (a `.zip` file). Don't unzip it.
2. In Claude, open **Settings → Capabilities → Skills** and upload that file.
3. Open the skill's `SKILL.md` and follow its setup instructions before you use it.
4. Swap in your own examples where the skill asks.
5. Try it on real work and watch the first run. Check what it flags against your own judgment, then adjust the instructions.

## Tips

- Give each skill your context: company, learners, and tools.
- Keep skills focused. Hand off between them instead of building one huge prompt.
- When a skill keeps growing, look for where the mistake starts before you add another check.
- Watch the first run yourself before you put a skill on a schedule.

## License

MIT License: you can use, copy, change, and share these skills for free, including at work, as long as you keep the license notice with them. They come as is, with no warranty. Credit is appreciated but not required. See [LICENSE](LICENSE).

Created by Clea Mahoney.
