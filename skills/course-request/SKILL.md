---
name: course-request
description: "Triage a request for a course, lesson, workshop, or other training before design starts. Use the user's audience, goals, evidence, and work context to recommend an appropriate response, then draft an action map if practice is needed. Works for customer education, internal L&D, partner education, and other settings. Does not draft lessons or build a course."
---

# Course request

Turn a training request into a reasoned decision about what will help people do their work. A course can be part of the response, but the request itself is not evidence that a course is needed.

**Output:** a request brief, a human-confirmed recommendation, and, when learning is part of the response, a draft action map for human review. No particular app or companion skill is required.

## Customize to the situation

Use context the user supplies in chat, files, or their saved setup. A setup form is optional. Do not ask them to repeat information you already have. Carry confirmed context forward within the conversation; save reusable setup only when requested.

- **Setting:** customer education, internal L&D, partner education, or another setting.
- **Organization or product:** only the context needed to understand the work.
- **Audience:** roles, experience, prerequisites, work environment, and access to tools.
- **Requester and decision-maker:** who wants training, and who can approve the response. These may be different from the audience.
- **Request and desired result:** what was asked for, what prompted it, and what needs to improve.
- **Evidence and resources:** observations, examples, existing learning or reference material, and constraints such as timing, budget, accessibility, or practice environments.
- **Available support:** which roles or channels can actually help the audience and what the education team can influence.
- **Destination:** this chat by default, or a document, tracker, or board the user selects.

Help the user fill gaps rather than handing them a long questionnaire. Ask one focused question at a time, starting with the missing answer most likely to change the recommendation. Explain unfamiliar distinctions through their situation. Do not assume every field must be filled before useful work begins.

If the setting is unclear, clarify it before choosing interventions. If other facts are missing, make a provisional recommendation with explicit assumptions and a concrete way to check them. Never invent sources, figures, product behavior, or agreement.

## Context changes the recommendation

Match interventions, owners, evidence, and application opportunities to the user's actual relationship with the audience. Do not infer a cause from the setting alone.

| Setting | Possible evidence, if available | Support to consider only when it exists |
|---|---|---|
| Customer education | Support cases, customer work samples, interviews, product usage, customer-facing team observations | Product or UX changes, documentation, in-product help, customer success, implementation support, optional practice sessions |
| Internal L&D | Work samples, process observations, quality reviews, employee interviews, operational measures | Workflow and access changes, job aids, role clarity, manager support, coaching, practice with feedback |
| Partner or another setting | Examples of the audience's work and evidence the user can access | The roles and channels the user identifies as available |

Do not assume customer education can assign customer managers work, require customer coaching, or inspect customer performance. Manager support and coaching are options only when the user confirms a suitable relationship, access, and capacity. The same check applies to customer success, implementation, or any other proposed owner. Use "proposed owner, unconfirmed" until responsibility is accepted.

## Working rules

- Separate the requester's proposed solution from the problem and evidence.
- Keep distinct audiences and their required actions separate.
- Connect every recommended learning activity to an observable action and a business or operational goal.
- Distinguish supplied evidence, interpretation, unvalidated assumptions, and proposed measures. Do not present a diagnosis as observed fact.
- A problem can have several causes and need several responses. Do not discard an important action because one obstacle needs a non-training fix.
- Use plain words and roles instead of personal names in the brief. Follow the user's house writing rules when supplied.
- Pause for the recommendation decision and the final action-map decision. Do not require approval after every small step or treat silence as agreement.
- Work in chat unless another destination is requested. Before external writes, read the existing content and live schema, preserve human edits, and read the result back. Do not assign work, change statuses, publish, or retire resources merely because triage is complete.

## 1. Frame the request and goal

Capture what was asked, who asked by role, who the audience is, and what prompted the request. Record the evidence supplied and any missing evidence that matters.

Separate two things:

- **Business or operational goal:** the result that should improve, with a measure and timeframe where available. For example, fewer custom reports returned for correction.
- **Learner performance:** what people need to do differently to contribute to that result. For example, choose filters that match the reporting question and validate the result before sharing it.

Do not invent a baseline, target, or deadline. If they are missing, mark them "to confirm" and propose how to establish them. Completions and satisfaction can describe the learning experience, but do not establish the operational result.

Name a plausible measurement source, the role that could check it, and any access limits. Distinguish a proposed source from one actually available. Learning may contribute to a business result without being its only cause.

## 2. Diagnose the gap and recommend a response

Identify the critical actions people need to take. For each, ask what is getting in the way and what evidence supports that explanation. Consider missing skill or judgment, unavailable information, confusing tools, access, workflow, time, incentives, and unclear expectations only as relevant to this request.

Check existing resources the user supplies or authorizes you to access. A matching title does not prove coverage; check audience, actions, accuracy, and practice. If you cannot check, record "existing coverage not checked."

Recommend the smallest response likely to address the observed obstacles. Explain only the options that matter here:

- Practice with feedback when people need to develop skill or judgment. Choose a short activity, live session, self-paced resource, or course based on the work, scale, feedback needs, stability, and constraints.
- A reference, job aid, documentation update, or in-product help when information is needed while doing the work.
- A product, workflow, access, or expectation change when the environment prevents the desired action.
- Support through roles or channels confirmed as available in this setting.
- Reuse or revise existing learning when it fits the audience and required actions.
- Gather evidence or hold the decision when an unresolved fact could materially change the response. Name the fact, who could confirm it, and the next check.

Allow combinations. A short video can explain something, but is not automatically practice. A live session does not resolve unconfirmed product behavior. Do not assume high stakes or unstable features automatically dictate a course format.

Show the proposed response, reasoning, evidence limits, owners by role, and what remains outside the education team's control. Name the smaller option considered when recommending a course.

**Decision checkpoint:** ask whether the decision-maker accepts or changes the recommendation. Keep it labeled proposed until confirmed. Do not proceed into detailed action-map development on an assumed decision. If they request a complete speculative draft, provide it with decisions marked pending.

If no learning is needed, finish with the confirmed brief and next actions. Do not manufacture a learning activity. Finishing triage does not mean the underlying problem is solved.

## 3. Draft the action map when learning is part of the response

Use [references/output-template.md](references/output-template.md) for the brief and map. Keep one primary goal per learning experience. Split audiences or goals when their required performance differs.

For each critical action:

- State what the person does on the job, including judgment or decisions. Replace "understand" or "know" with observable performance.
- Name the obstacle and evidence status. Keep non-training dependencies visible alongside any skill gap.
- Design practice that resembles the job, with a decision or task, a success criterion, and useful feedback. Use a safe practice environment when needed.
- Include only the information needed for the action and practice. Move reference material to the point of use where appropriate.

Name the real task learners should be able to complete and their next realistic opportunity to apply it. Do not impose a fixed number of days. Note existing assets that can be reused and assumptions still needing validation.

## 4. Review and hand off

The map is usable as a table in chat. Offer a board only if useful to the user's working process. With an available connector, use a user-selected board and keep goal, action, practice, information, and open questions movable and connected. Without one, provide the table or copy-ready items. A board is optional, not a completion requirement.

**Action-map checkpoint:** invite the decision-maker and relevant collaborators to revise the draft. If they edit a document or board, read it back and summarize changes before final confirmation. Do not call the map team-confirmed without that confirmation.

End with the decision status, the brief or map, unresolved questions, and the next owner and action. For approved learning, hand the map to whoever designs the experience and lesson sequence. Lesson drafting begins after an outline is approved. Do not require unavailable skills or jump directly from intake to LMS building.
