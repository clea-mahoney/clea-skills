# call-evidence sample output (example run on the files in calls/)

Calls processed: 2026-09-08, 2026-09-15, 2026-09-22 (auto-summary 2026-09-15 used only to cross-check attribution) · Speakers counted: 8 · Excluded: 3 (Dana Kim: internal COMPANY staff; Sam: first name only; "Speaker unknown": unidentified)

Rank | Theme | Speakers | Examples | Why this rank
1 | Verifying AI-built workflows before production | 4 | 6 | Judgment skill training can change directly. It has the most speakers of any skill theme and includes a risky-habit counterpoint.
2 | Approval gates and who approves destructive runs | 2 | 2 | Governance judgment skill. Ties with rank 3 on speakers and examples, so this order is provisional (see Decisions).
3 | Start with one small workflow and prove it | 2 | 2 | Rollout strategy habit. Ties with rank 2, provisional order (see Decisions).
4 | Connector and client-workspace mapping (Hold) | 6 | 6 | Most speakers, but setup and product-shaped. Relevance overrode count. Hold: docs or product fix first.

Verifying AI-built workflows before production
- 09-08 Aisha Okafor, Summitpoint Systems [00:09:02]: "I had the Assistant build a user offboarding workflow. It looked perfect, but it disabled the account before it moved the files. I only caught it because I ran it on a test user first." (confidence: high)
- 09-08 Tom Becker, company unknown [00:11:40]: "I just trust Claude at this point. If it builds it, I ship it." (confidence: high) counterpoint, teaching evidence
- 09-08 Tom Becker, company unknown [00:12:09]: "Anyway, it's been right every time so far." (confidence: medium) counterpoint, teaching evidence
- 09-15 Marcus Lee, Bluegate Networks [00:10:33]: "I've started asking the Assistant to explain each step before I run anything. Half the time the explanation shows me what it got wrong." (confidence: high)
- 09-15 Ben Carter, Harborview IT [00:19:20]: "Honestly, I haven't tested the new license workflow yet. I'm not putting it live until I do." (confidence: high)
- 09-22 Marcus Lee, Bluegate Networks [00:14:52]: "We caught a workflow that would have emailed every client at once. The Assistant's test run looked fine. The real data didn't." (confidence: high)

Approval gates and who approves destructive runs
- 09-15 Aisha Okafor, Summitpoint Systems [00:16:48]: "We put an approval step in front of anything that deletes or disables. I don't let the Assistant touch production without a person clicking approve." (confidence: high)
- 09-22 Lena Fischer, Westbrook Managed Services [00:18:30]: "Who approves what is the real question for us. Right now anyone on the team can approve a run that deletes things." (confidence: high)

Start with one small workflow and prove it
- 09-08 Priya Raman, Northfield IT [00:21:44]: "What helped us was starting with one boring workflow, password resets, before trying anything big." (confidence: high)
- 09-15 Lena Fischer, Westbrook Managed Services [00:22:02]: "My team wanted to automate everything at once. I made them pick one workflow and prove it first." (confidence: high)

Connector and client-workspace mapping (Hold: docs or product fix first)
- 09-08 Priya Raman, Northfield IT [00:03:45]: "We spent most of last week just getting the ticketing connector to map to the right client workspaces. Took three tries." (confidence: high)
- 09-08 Marcus Lee, Bluegate Networks [00:05:20]: "Same. Connecting the ticketing tool was the hardest part. Once it was mapped, building was quick." (confidence: high)
- 09-15 Ben Carter, Harborview IT [00:04:12]: "Tenant mapping again. We have forty clients and the connector setup screen doesn't make it obvious which workspace is which." (confidence: medium)
- 09-15 Lena Fischer, Westbrook Managed Services [00:06:50]: "We had the same mapping issue. We ended up writing our own spreadsheet to track it." (confidence: medium)
- 09-22 Omar Haddad, Riverline Tech [00:03:15]: "Our biggest blocker is the connector setup. We couldn't tell which client each workspace belonged to." (confidence: high)
- 09-22 Jo Alvarez, Cedarline Tech [00:07:40]: "Mapping took us a full day too." (confidence: medium)

Not counted as evidence: 09-22 Omar Haddad [00:11:25], rough demo built the night before. A messy early demo is not a skills gap.

Routed to product:
- 09-08 Sam (first name only, not counted) [00:15:30]: asks whether the connector should time out after an hour. Possible bug.
- 09-08 Jo Alvarez, Cedarline Tech [00:18:12]: Slack approval message shows UTC, not local time zone, so approvers miss the window. Bug.
- 09-15 Speaker unknown [00:13:05]: dark mode request. Feature request.
- Connector setup screen does not show which workspace belongs to which client (Ben Carter 09-15, Omar Haddad 09-22). Matches the auto-summary action item. Possible product fix (see Decisions).

Speaker mismatches (summary vs transcript):
- 2026-09-15: the auto-summary credits the approval step before anything that deletes or disables to Marcus Lee. The transcript gives it to Aisha Okafor (Summitpoint Systems) at [00:16:48]. Attributed to Aisha above.

Decisions for you:
1. New theme vs existing: "Approval gates" could be its own row or fold into "Verifying AI-built workflows." I kept it separate. Do you want to merge it?
2. Tie: ranks 2 and 3 are tied at 2 speakers and 2 examples. The order shown is provisional. Which comes first?
3. Relevance vs count: connector mapping has the most speakers (6) but ranks last on Hold. Confirm the Hold, or ask for a setup guide now?
4. Product bug vs skill gap: mapping confusion reads as a setup-screen problem (Ben Carter, Omar Haddad) more than a skills gap. Route all of it to product, or keep a docs/guide angle?
5. Product bug vs skill gap: Sam's connector timeout question. Bug or expected behavior to document?
6. Missing company: Tom Becker is counted (full name, external) with company unknown ("Small shop, we're still getting set up"). Confirm his company if you can.
