# Skilljar notes

Learned building courses through the Skilljar MCP. Swap this file for your own LMS's quirks.

- **Create every lesson as a modular lesson.** A lesson's type can't change after it's created, and a plain HTML lesson can't take a video block later. Modular lessons hold HTML, video, quiz, and other blocks.
- **Verify every write by reading it back.** Unknown fields fail silently, so a call can report success and change nothing. Check the modified date or read the lesson again.
- **Updates replace the whole lesson.** Read the current content, edit it, and send all of it back.
- **Skilljar rewrites HTML on save.** Line breaks, curly quotes, and color codes change. Compare content, not raw HTML.
- **Lesson IDs can change** after a lesson is rebuilt in the dashboard. List lessons again before updating.
- **Publish hidden for review.** Hidden courses stay reachable by direct link and off the catalog.
- **Not available through the connector** (as of October 2026): lesson durations, optional lessons, instructor-led sessions, and attachments. Set these in the dashboard.
