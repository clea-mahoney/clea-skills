const DEFAULTS = {
  title: 'A peek into Clea\'s brain',
  intro: '<p>Clea is a learning experience designer. At her last job she built Claude skills for customer education and taught herself Claude Code.</p><p>She was recently laid off. Since then she\'s been building things for fun and sharing them with the L&amp;D community, including at the Learning Rejects Conference.</p><p>This walkthrough covers two of her skills: what didn\'t work at first, and what she changed. Along the way you\'ll mark up a sample lesson draft, sort what lesson-eval found, and match problems to their fixes.</p>',
  source: 'Vibe coded in Mighty Studio with Claude Code, October 2026.',
  coverImage: 'https://clea-mahoney.github.io/clea-skills/walkthrough/cover.png?v=2',
  coverAlt: 'Start the walkthrough: Clea peeking over a card from the sort game.',
  coverImageMobile: 'https://clea-mahoney.github.io/clea-skills/walkthrough/cover-mobile.png?v=2',
  draftHeading: 'Read the draft',
  draftIntro: 'Lesson-eval is a Claude skill Clea built to check a lesson draft before a person reviews it. In September it ran 15 checks. This is a draft it checked, for a made-up product called Flowstack. Tap any sentence you\'d change to see what lesson-eval said about it.',
  draftHits: [
    { phrase: 'Add An Approval Step Before Risky Actions', check: '10', note: 'The heading is in title case.' },
    { phrase: 'In this course, you\'ll learn what approval steps are, why they matter, and how to add them to your workflows. This course is for Flowstack admins who build workflows.', check: '3', note: 'It repeats the course overview and who the course is for. A lesson should start with a situation the learner recognizes.' },
    { phrase: 'Let\'s dive in.', check: '7', note: 'Filler. Nothing is lost if you cut it.' },
    { phrase: 'isn\'t a delay, it\'s a safety net', check: '11', note: '"Isn\'t X, it\'s Y" phrasing. Say what an approval step does.' },
    { phrase: '—', check: '7', note: 'An em dash.' },
    { phrase: 'One bad run. Hundreds of disabled accounts. No undo.', check: '11', note: 'Short dramatic fragments. One plain sentence says it better.' },
    { phrase: 'It\'s important to note', check: '7', note: 'Filler. If it\'s important, the sentence can just say it.' },
    { phrase: 'leverage', check: '14', note: 'Inflated words: "leverage" and "seamless."' },
    { phrase: 'pick the appropriate group', check: '6', note: 'Which group is appropriate? The learner can\'t tell.' },
    { phrase: '[Screenshot: add screenshot here]', check: '8', note: 'The placeholder doesn\'t say what to capture, and it\'s at the end of the section instead of at its step.' },
    { phrase: 'Now that you\'ve added the step', check: '7', note: 'Filler. The heading already says what\'s next.' },
    { phrase: 'isn\'t optional, it\'s how you know', check: '11', note: '"Isn\'t X, it\'s Y" phrasing again.' },
    { phrase: 'Utilize', check: '14', note: '"Utilize" means "use."' },
    { phrase: 'With these steps, you\'re ready', check: '9', note: 'An upbeat ending that asks for nothing, and no Next up section.' },
    { phrase: 'Why approval steps matter', check: '', note: 'She hates "Why X matters" headings.' }
  ],
  draftRevealLabel: 'Show everything lesson-eval flagged',
  checkersHeading: 'Lesson-eval in September and today',
  checkersStory: '<p>Claude writes each lesson draft from a set of instructions. In September, lesson-eval had 15 checks and graded each draft in a loop. The writer fixed what failed, then lesson-eval checked the whole draft again, until everything passed.</p><p>Then Clea moved the writing rules into those instructions, so drafts came out cleaner. Today lesson-eval runs once, with 4 checks.</p>',
  beforeTitle: 'September: 15 checks, 9 failed',
  beforeMeta: 'Tap a check to see what it found in the draft you just read.',
  checks: [
    { name: 'You can say in one sentence what the learner will do', result: 'pass', finding: '' },
    { name: 'The lesson teaches one task', result: 'pass', finding: '' },
    { name: 'The opening starts with a situation the learner recognizes', result: 'fail', finding: 'The first two sentences describe the course ("In this course, you\'ll learn...") instead of starting with a situation.' },
    { name: 'It explains why, then what, then how', result: 'pass', finding: '' },
    { name: 'The learner makes at least one decision, and the lesson fits its audience', result: 'pass', finding: '' },
    { name: 'Every step can be followed without guessing', result: 'fail', finding: '"Pick the appropriate group" assumes the learner knows which group that is.' },
    { name: 'No em dashes or filler', result: 'fail', finding: 'An em dash in "Workflows run fast — which is great...", and filler in "Let\'s dive in," "It\'s important to note," and "Now that you\'ve added the step."' },
    { name: 'Screenshot notes say what to capture and sit at the right step', result: 'fail', finding: '"[Screenshot: add screenshot here]" doesn\'t say what to capture, and it sits at the end of the section instead of at its step.' },
    { name: 'It ends with a Next up section', result: 'fail', finding: 'There\'s no Next up section. The lesson ends on a generic line.' },
    { name: 'Headings in sentence case, with Oxford commas', result: 'fail', finding: 'The title "Add An Approval Step Before Risky Actions" is in title case.' },
    { name: 'No contrast for effect or dramatic fragments', result: 'fail', finding: 'Contrast for effect ("isn\'t a delay, it\'s a safety net," "isn\'t optional, it\'s how you know") and dramatic fragments ("One bad run. Hundreds of disabled accounts. No undo.").' },
    { name: 'Key terms are explained', result: 'pass', finding: '' },
    { name: 'No teaching jargon aimed at the learner', result: 'pass', finding: '' },
    { name: 'Plain words, and it\'s clear who does what', result: 'fail', finding: 'Inflated words ("leverage," "seamless," "utilize") and the tacked-on ", ensuring the right person always sees the request."' },
    { name: 'It sounds like the example lessons lesson-eval compares against', result: 'fail', finding: 'Two of the longest paragraphs, under "Why approval steps matter" and at the end of "Test it," don\'t sound like the examples.' }
  ],
  afterTitle: 'Today: 4 checks',
  afterChecks: 'A clear point\nSpecific screenshot and video notes, at the step they support\nAn ending that points to what\'s next\nWriting that sounds like a person teaching',
  afterMeta: 'Lesson-eval labels each problem it finds <strong>Fix</strong> or <strong>Take a look</strong>. It skips anything a person already approved, like an em dash they chose to keep.',
  afterTeaser: 'Today\'s version found 6 problems in the September draft. Next, guess how it labeled each one.',
  sortHeading: 'Fix or take a look?',
  sortIntro: 'For each problem today\'s lesson-eval found, pick the label you think it gave. <strong>Fix</strong> means it has to change before the lesson goes live. <strong>Take a look</strong> means the writer decides.',
  flags: [
    { text: 'Screenshot placeholder is vague and in the wrong spot', answer: 'fix', why: 'No one would know what to capture.' },
    { text: 'Opens by repeating the course overview', answer: 'fix', why: 'It delays the lesson.' },
    { text: 'An em dash', answer: 'look', why: 'A style choice.' },
    { text: 'Reads like AI: filler, "isn\'t X, it\'s Y," inflated words', answer: 'look', why: 'The lesson still works.' },
    { text: 'A title-case heading', answer: 'look', why: 'A quick style fix.' },
    { text: 'No "Next up" section at the end', answer: 'look', why: 'The lesson works without it.' }
  ],
  rewriteHeading: 'The rewrite',
  rewriteIntro: 'The September draft and the rewrite, side by side. Highlights mark what lesson-eval flagged, what changed, and where a new learner would get stuck. Those learner notes come from an optional pass that reads the draft as a new learner, so they\'re written as "I." Step through the notes or tap a highlight.',
  beforeVerdict: '2 to fix, 4 to look at, 5 learner notes',
  afterVerdict: 'Checked again: nothing to fix',
  beforeDoc: '<h1>Add An Approval Step Before Risky Actions</h1><p>In this course, you\'ll learn what approval steps are, why they matter, and how to add them to your workflows. This course is for Flowstack admins who build workflows.</p><p>Let\'s dive in.</p><h2>Why approval steps matter</h2><p>An approval step isn\'t a delay, it\'s a safety net. Workflows run fast — which is great until one runs on the wrong data. One bad run. Hundreds of disabled accounts. No undo.</p><p>It\'s important to note that approval steps leverage Flowstack\'s seamless notification engine, ensuring the right person always sees the request.</p><h2>Add the step</h2><ol><li>Open the workflow in the builder.</li><li>Click the <strong>+</strong> between the trigger and the action you want to protect.</li><li>Choose <strong>Approval</strong> from the step list.</li><li>In <strong>Approvers</strong>, pick the appropriate group.</li><li>In <strong>Timeout</strong>, choose what happens if nobody responds within the time limit: <strong>Cancel run</strong> or <strong>Continue anyway</strong>.</li></ol><p>For anything destructive, pick <strong>Cancel run</strong>. A workflow that continues anyway after a timeout is the same as having no approval step.</p><p>[Screenshot: add screenshot here]</p><h2>Test it</h2><p>Now that you\'ve added the step, it\'s time to test it. Testing isn\'t optional, it\'s how you know the approval works.</p><p>Utilize a test user to run the workflow. The approver gets a notification in Slack and email. Click <strong>Approve</strong> and confirm the action ran. Then run it again and let it time out to confirm the run cancels.</p><p>With these steps, you\'re ready to take your automation safety to the next level.</p>',
  afterDoc: '<h1>Add an approval step before risky actions</h1><p>Some workflows do things you can\'t easily undo, like disabling user accounts. If one of those runs on the wrong data, it can lock out hundreds of people before anyone notices. An approval step makes Flowstack wait for a person to say yes before the risky action runs.</p><h2>Add the step</h2><ol><li>Open the workflow in the builder.</li><li>Click the <strong>+</strong> between the trigger and the action you want to protect.</li><li>Choose <strong>Approval</strong> from the step list.</li><li>In <strong>Approvers</strong>, pick a group that has someone available whenever this workflow runs, such as your on-call group. Anyone in the group can approve. If the group doesn\'t exist yet, create it first. [Screenshot: the Approval step\'s settings panel, with Approvers set to the on-call group]</li><li>In <strong>Timeout</strong>, set how long Flowstack waits for an answer. Then choose what happens if nobody responds in time: <strong>Cancel run</strong> or <strong>Continue anyway</strong>. [Screenshot: the Timeout setting with a 1-hour limit and Cancel run selected]</li></ol><p>For anything destructive, pick <strong>Cancel run</strong>. A workflow that continues anyway after a timeout is the same as having no approval step.</p><p>When the workflow reaches this step, everyone in the approver group gets the request in Slack and email.</p><h2>Test it</h2><p>Run the workflow once each way before you turn it on. Point it at a test user account, so the action only touches an account nobody depends on. To keep the timeout test short, set <strong>Timeout</strong> to a few minutes while you test.</p><ol><li>Run the workflow against the test user. Check that the approval request arrives in Slack and email.</li><li>Click <strong>Approve</strong>, then open the workflow\'s run history and confirm the action ran.</li><li>Run it again and don\'t respond. After the timeout passes, check run history to confirm the run was canceled and the test user wasn\'t changed.</li><li>Set <strong>Timeout</strong> back to the limit you want in production.</li></ol><h2>Next up</h2><p>Before you move on, add an approval step to the workflow in your account that would do the most damage if it ran on the wrong data. The next lesson builds on it.</p><p><em>Flowstack is fictional, so two product details in the rewrite are invented: the Timeout duration field and run history.</em></p>',
  annotations: [
    { side: 'before', kind: 'look', phrase: 'Add An Approval Step Before Risky Actions', note: 'Title-case heading.' },
    { side: 'before', kind: 'fix', phrase: 'In this course, you\'ll learn what approval steps are, why they matter, and how to add them to your workflows. This course is for Flowstack admins who build workflows.', note: 'Repeats the course overview and who the course is for.' },
    { side: 'before', kind: 'look', phrase: 'Let\'s dive in.', note: 'Filler (1 of 3).' },
    { side: 'before', kind: 'look', phrase: 'An approval step isn\'t a delay, it\'s a safety net.', note: 'Contrast for effect (1 of 3).' },
    { side: 'before', kind: 'look', phrase: '—', note: 'Em dash.' },
    { side: 'before', kind: 'look', phrase: 'No undo.', note: 'Contrast for effect (2 of 3).' },
    { side: 'before', kind: 'learn', phrase: 'It\'s important to note that approval steps leverage Flowstack\'s seamless notification engine, ensuring the right person always sees the request.', note: 'I\'d stop reading here. It sounds like marketing and doesn\'t tell me anything I need.' },
    { side: 'before', kind: 'look', phrase: 'It\'s important to note', note: 'Filler (2 of 3).' },
    { side: 'before', kind: 'look', phrase: 'leverage', note: 'Inflated word.' },
    { side: 'before', kind: 'look', phrase: 'seamless', note: 'Inflated word.' },
    { side: 'before', kind: 'learn', phrase: 'pick the appropriate group', note: 'I\'d get stuck here. Which group is appropriate? Do I have to make one?' },
    { side: 'before', kind: 'learn', phrase: 'within the time limit', note: 'Where do I set the time limit? What\'s the default?' },
    { side: 'before', kind: 'fix', phrase: '[Screenshot: add screenshot here]', note: 'Doesn\'t say what to capture, and it\'s at the end of the section instead of at its step.' },
    { side: 'before', kind: 'look', phrase: 'Now that you\'ve added the step, it\'s time to test it.', note: 'Filler (3 of 3).' },
    { side: 'before', kind: 'look', phrase: 'Testing isn\'t optional, it\'s how you know the approval works.', note: 'Contrast for effect (3 of 3).' },
    { side: 'before', kind: 'learn', phrase: 'Utilize a test user to run the workflow.', note: 'Is the test user the account the workflow changes, or the person running it? I don\'t want to disable a real account.' },
    { side: 'before', kind: 'look', phrase: 'Utilize', note: '"Utilize" means "use."' },
    { side: 'before', kind: 'learn', phrase: 'confirm the action ran', note: 'Where do I check that? Run history, or the test user\'s account?' },
    { side: 'before', kind: 'look', phrase: 'With these steps, you\'re ready to take your automation safety to the next level.', note: 'An upbeat ending that asks for nothing, and no Next up section.' },
    { side: 'after', kind: 'new', phrase: 'Some workflows do things you can\'t easily undo, like disabling user accounts. If one of those runs on the wrong data, it can lock out hundreds of people before anyone notices. An approval step makes Flowstack wait for a person to say yes before the risky action runs.', note: 'New opening: a situation the learner recognizes, then what to do. Replaces the course overview lines.' },
    { side: 'after', kind: 'new', phrase: 'pick a group that has someone available whenever this workflow runs, such as your on-call group. Anyone in the group can approve. If the group doesn\'t exist yet, create it first.', note: 'Says which group, and what to do if it doesn\'t exist yet.' },
    { side: 'after', kind: 'new', phrase: '[Screenshot: the Approval step\'s settings panel, with Approvers set to the on-call group]', note: 'A specific placeholder, at the step it supports.' },
    { side: 'after', kind: 'new', phrase: 'set how long Flowstack waits for an answer.', note: 'Says where the time limit is set.' },
    { side: 'after', kind: 'new', phrase: '[Screenshot: the Timeout setting with a 1-hour limit and Cancel run selected]', note: 'A specific placeholder, at the step it supports.' },
    { side: 'after', kind: 'new', phrase: 'When the workflow reaches this step, everyone in the approver group gets the request in Slack and email.', note: 'The Slack and email detail, moved out of the "notification engine" sentence.' },
    { side: 'after', kind: 'new', phrase: 'Run the workflow once each way before you turn it on. Point it at a test user account, so the action only touches an account nobody depends on.', note: 'Says which account the test user is, and how to keep the timeout test short.' },
    { side: 'after', kind: 'new', phrase: 'open the workflow\'s run history and confirm the action ran', note: 'Says where to check.' },
    { side: 'after', kind: 'new', phrase: 'Next up', note: 'New Next up section.' }
  ],
  courseHeading: 'Course-dev, July to October',
  courseIntro: 'Course-dev is a Claude skill Clea built to turn lesson drafts into a course in Skilljar, the LMS her team used. Slide through the months to see how it changed.',
  months: [
    { month: 'July', label: 'Mostly manual', title: 'Copy, paste, and check', body: '<p>Claude drafted lessons in Notion and turned them into HTML. Then someone pasted each one into Skilljar and compared it to its draft by eye.</p>', autoSteps: 'Draft in Notion\nTurn into HTML', handSteps: 'Paste each lesson\n👀 Check against the draft', note: '' },
    { month: 'August', label: 'The API', title: 'The Skilljar API', body: '<p>Clea used the Skilljar API to update 32 of 33 old courses in one run. The API only works from code, though, and she was the only one on the team using it.</p>', autoSteps: '', handSteps: '', note: 'Everyone else kept copying and pasting, so the team had two ways of building courses.' },
    { month: 'September', label: 'The MCP', title: 'The Skilljar MCP', body: '<p>The Skilljar MCP is a connector that lets Claude work in Skilljar directly. It works in any Claude app, so the whole team could build and check courses the same way.</p>', autoSteps: '', handSteps: '', note: '' },
    { month: 'October', label: 'Today', title: 'Claude builds and checks every lesson', body: '<p>A person still picks the reviewer, fills in the few settings the MCP can\'t reach, like how long a lesson takes, and decides when the course goes live.</p>', autoSteps: 'Draft in Notion\nBuild in Skilljar\nHide the course until it\'s reviewed\nCheck against the draft', handSteps: 'Pick the reviewer\nDecide when it goes live', note: '' }
  ],
  matchHeading: 'Match each problem to its fix',
  matchIntro: 'The first course built with the MCP had three problems. Pick the fix for each one.',
  problems: [
    { problem: 'Changes reported as saved sometimes weren\'t saved.', fix: 'Claude checks every change after making it.' },
    { problem: 'A lesson built as one block of HTML can\'t have a video added later.', fix: 'Every lesson is now built in sections, and any section can hold a video.' },
    { problem: 'Skilljar rewrites a lesson\'s HTML when it saves, so the checks flagged differences no reader would see.', fix: 'The checks compare only the lesson text.' }
  ],
  finishHeading: 'Thanks for trying it',
  finishBody: '<p>Both skills are free to copy and change. Lesson-eval works on any lesson draft.</p><p>If you\'re at Learning Rejects, come say hi.</p>',
  linkLabel: 'Get the skills on GitHub',
  linkUrl: 'https://github.com/clea-mahoney/clea-skills',
  stopStart: 'Start',
  stopDraft: 'Read the draft',
  stopCheckers: 'Two versions',
  stopSort: 'Sort it',
  stopRewrite: 'The rewrite',
  stopCourse: 'Course-dev',
  stopMatch: 'Match it',
  stopFinish: 'Finish',
  startLabel: 'Start the walkthrough',
  nextLabel: 'Next →',
  backLabel: '← Back',
  fixLabel: 'Fix',
  lookLabel: 'Take a look',
  rightLabel: 'Right.',
  wrongLabel: 'Not quite.',
  againLabel: 'Play again'
};

const KIND = { fix: 'Fix', look: 'Take a look', learn: 'Learner would get stuck', new: 'New or rewritten' };
const $ = id => document.getElementById(id);
const el = (tag, cls, text) => { const e = document.createElement(tag); if (cls) e.className = cls; if (text != null) e.textContent = text; return e; };
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
const shout = msg => { const s = $('shout'); s.textContent = ''; setTimeout(() => { s.textContent = msg; }, 30); };
const str = v => (v == null ? '' : String(v));
const lines = v => str(v).split('\n').map(s => s.trim()).filter(Boolean);

let S, sdk = window.mightyInteractiveSdk;
const scores = { sort: null, match: null };

function track(data) {
  try { if (sdk && sdk.tracking && sdk.tracking.isAvailable) sdk.tracking.upsertInteraction(data); } catch (e) { /* preview */ }
}

/* ---------- stops ---------- */
const STOPS = [
  { id: 'start', key: 'stopStart' }, { id: 'draft', key: 'stopDraft', game: true }, { id: 'checkers', key: 'stopCheckers' }, { id: 'sort', key: 'stopSort', game: true },
  { id: 'rewrite', key: 'stopRewrite' }, { id: 'course', key: 'stopCourse' }, { id: 'match', key: 'stopMatch', game: true },
  { id: 'finish', key: 'stopFinish' }
];
let cur = 0;
const visited = new Set();

function buildTabs() {
  const tabs = $('tabs'); tabs.innerHTML = '';
  STOPS.forEach((s, i) => {
    const b = el('button', 'tab'); b.type = 'button'; b.id = 't-' + s.id; b.setAttribute('role', 'tab');
    b.setAttribute('aria-controls', 'p-' + s.id); b.tabIndex = -1;
    const n = el('span', 'num', String(i + 1)); n.setAttribute('aria-hidden', 'true');
    b.append(n, el('span', null, str(S[s.key])));
    if (s.game) { const g = el('span', 'game', '🎯'); g.setAttribute('aria-hidden', 'true'); b.append(g, el('span', 'sr', ' (activity)')); }
    const v = el('span', 'sr vis', ''); b.append(v);
    b.addEventListener('click', () => show(i));
    b.addEventListener('keydown', e => {
      const k = e.key; let t = null;
      if (k === 'ArrowRight') t = (i + 1) % STOPS.length;
      if (k === 'ArrowLeft') t = (i - 1 + STOPS.length) % STOPS.length;
      if (k === 'Home') t = 0; if (k === 'End') t = STOPS.length - 1;
      if (t !== null) { e.preventDefault(); show(t); $('t-' + STOPS[t].id).focus(); }
    });
    tabs.appendChild(b);
  });
}

function show(i, focusHeading) {
  cur = Math.max(0, Math.min(STOPS.length - 1, i));
  visited.add(cur);
  STOPS.forEach((s, k) => {
    const t = $('t-' + s.id), p = $('p-' + s.id), on = k === cur;
    t.setAttribute('aria-selected', String(on)); t.tabIndex = on ? 0 : -1;
    t.classList.toggle('visited', visited.has(k) && !on);
    t.querySelector('.vis').textContent = visited.has(k) && !on ? ', visited' : '';
    p.hidden = !on;
  });
  const tab = $('t-' + STOPS[cur].id), strip = $('tabs');
  const l = tab.offsetLeft - strip.offsetLeft;
  if (l < strip.scrollLeft || l + tab.offsetWidth > strip.scrollLeft + strip.clientWidth) strip.scrollLeft = l - 12;
  $('meterFill').style.width = (visited.size / STOPS.length * 100) + '%';
  $('meterText').textContent = `${visited.size} of ${STOPS.length} sections viewed`;
  $('count').textContent = `Section ${cur + 1} of ${STOPS.length}`;
  $('back').disabled = cur === 0;
  $('next').disabled = cur === STOPS.length - 1;
  if (focusHeading) {
    // Moving by button: go back to the top, so the new section starts at its heading.
    const top = $('app').getBoundingClientRect().top + window.scrollY;
    if (window.scrollY > top) window.scrollTo({ top, behavior: 'auto' });
    const h = $('p-' + STOPS[cur].id).querySelector('h2'); if (h) h.focus({ preventScroll: true });
  }
  if (STOPS[cur].id === 'finish') finish();
}

/* ---------- start ---------- */
function renderStart() {
  bindText('title'); bindHTML('intro'); bindText('source');
  const hero = $('hero'), img = $('heroImg'), url = str(S.coverImage);
  hero.hidden = !url;
  $('p-start').querySelector('h2').classList.toggle('sr', !!url);
  if (url) {
    $('heroSrc').srcset = str(S.coverImageMobile) || url;
    img.src = url; img.alt = str(S.coverAlt) || str(S.startLabel);
    img.onerror = () => { hero.hidden = true; $('p-start').querySelector('h2').classList.remove('sr'); };
    hero.onclick = () => show(1, true);
  }
  $('secEval').textContent = `Checks a lesson draft before a person reviews it. It went from ${S.checks.length} checks to 4.`;
  $('secCourse').textContent = `Builds a course in the LMS and checks each lesson against its draft. ${S.months.length ? S.months[0].month + ' to ' + S.months[S.months.length - 1].month : ''}.`;
  $('startBtn').textContent = S.startLabel;
  $('startBtn').onclick = () => show(1, true);
  document.querySelectorAll('[data-jump]').forEach(b => { b.onclick = () => show(STOPS.findIndex(s => s.id === b.dataset.jump), true); });
}
function bindText(k) { document.querySelectorAll(`[data-form-key="${k}"]`).forEach(e => { e.textContent = str(S[k]); }); }
function bindHTML(k) { document.querySelectorAll(`[data-form-key="${k}"]`).forEach(e => { e.innerHTML = str(S[k]); }); }

/* ---------- read the draft ---------- */
function renderDraft() {
  bindText('draftHeading'); bindText('draftIntro');
  const doc = $('draftDoc'), note = el('div', 'tapnote'), tally = $('draftTally'), rv = $('draftReveal');
  note.setAttribute('aria-live', 'polite');
  doc.innerHTML = str(S.beforeDoc); doc.classList.remove('reveal');
  doc.querySelectorAll('h1,h2,p,li').forEach(b => {
    // One tap target per sentence, except a flagged phrase that spans sentences stays one target.
    const parts = b.innerHTML.split(/(?<=[.!?\]])\s+(?=[A-Z\[]|<strong>)/), plain = parts.map(p => p.replace(/<[^>]+>/g, ''));
    const units = [];
    for (let i = 0; i < parts.length; i++) {
      let j = i;
      S.draftHits.forEach(h => {
        const ph = str(h.phrase);
        if (!ph.startsWith(plain[i]) || ph.length <= plain[i].length) return;
        for (let k = i + 1; k < parts.length; k++) if (plain.slice(i, k + 1).join(' ').includes(ph)) { j = Math.max(j, k); break; }
      });
      units.push(parts.slice(i, j + 1).join(' ')); i = j;
    }
    b.innerHTML = units.map(t => `<span class="s" role="button" tabindex="0" aria-pressed="false">${t}</span>`).join(' ');
  });
  const learn = S.annotations.filter(a => a.side !== 'after' && a.kind === 'learn').map(a => str(a.phrase));
  const sents = [...doc.querySelectorAll('.s')];
  sents.forEach(b => {
    const t = b.textContent;
    const hits = S.draftHits.filter(h => str(h.phrase) && t.includes(str(h.phrase)) && S.checks[parseInt(h.check, 10) - 1]);
    const nums = [...new Set(hits.map(h => parseInt(h.check, 10)))].sort((a, c) => a - c);
    const said = [...new Set(hits.map(h => `${str(h.note) || str(S.checks[parseInt(h.check, 10) - 1].name)} (Check ${parseInt(h.check, 10)})`))];
    b.dataset.checks = nums.join(',');
    b.classList.toggle('caught', nums.length > 0);
    b.dataset.learn = learn.some(ph => ph && t.includes(ph)) ? '1' : '';
    const clea = S.draftHits.filter(h => str(h.phrase) && !str(h.check) && t.includes(str(h.phrase))).map(h => str(h.note));
    b.onclick = () => {
      const on = b.getAttribute('aria-pressed') !== 'true';
      b.setAttribute('aria-pressed', String(on));
      if (on) {
        note.innerHTML = '';
        if (nums.length) {
          note.append(el('strong', null, 'Flag: '), document.createTextNode(said.join(' ')));
        } else if (clea.length) {
          note.append(el('strong', null, 'Clea\'s flag: '), document.createTextNode(clea.join(' ')));
        } else if (b.dataset.learn) {
          note.append(el('strong', null, 'Missed in September: '), document.createTextNode('A new learner would get stuck here. Lesson-eval now has an optional pass that reads the draft as a new learner.'));
        } else {
          note.append(el('strong', null, 'No flag.'));
        }
        const blk = b.parentElement;
        if (blk.tagName === 'LI') blk.appendChild(note); else blk.after(note);
        note.dataset.for = String(sents.indexOf(b));
      } else if (note.dataset.for === String(sents.indexOf(b))) note.remove();
      drawTally();
    };
    b.onkeydown = e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); b.onclick(); } };
  });
  function drawTally() {
    const mine = sents.filter(b => b.getAttribute('aria-pressed') === 'true');
    tally.textContent = mine.length
      ? `You picked ${mine.length}. Lesson-eval flagged ${mine.filter(b => b.classList.contains('caught')).length} of them.`
      : 'Nothing picked yet.';
  }
  rv.textContent = S.draftRevealLabel; rv.setAttribute('aria-pressed', 'false');
  rv.onclick = () => {
    const on = !doc.classList.contains('reveal');
    doc.classList.toggle('reveal', on); rv.setAttribute('aria-pressed', String(on));
    if (on) shout(`Lesson-eval flagged ${sents.filter(b => b.classList.contains('caught')).length} of ${sents.length} passages. They're underlined in red.`);
  };
  drawTally();
}

/* ---------- checkers ---------- */
function renderCheckers() {
  ['checkersHeading', 'beforeTitle', 'beforeMeta', 'afterTitle', 'afterTeaser'].forEach(bindText); bindHTML('checkersStory'); bindHTML('afterMeta');
  const ac = $('afterChecks'); ac.innerHTML = ''; lines(S.afterChecks).forEach(t => ac.appendChild(el('li', null, t)));
  const grid = $('grid'), detail = $('detail'); grid.innerHTML = '';
  S.checks.forEach((c, i) => {
    const fail = c.result === 'fail';
    const b = el('button', 'chk ' + (fail ? 'fail' : 'pass'));
    b.type = 'button'; b.setAttribute('aria-pressed', 'false');
    b.innerHTML = `<span aria-hidden="true">${fail ? '✕' : '✓'}${i + 1}</span>`;
    b.setAttribute('aria-label', `Check ${i + 1} ${fail ? 'failed' : 'passed'}: ${c.name}`);
    b.onclick = () => {
      grid.querySelectorAll('.chk').forEach(x => x.setAttribute('aria-pressed', 'false'));
      b.setAttribute('aria-pressed', 'true');
      detail.innerHTML = '';
      detail.append(el('div', 'res ' + (fail ? 'fail' : ''), `Check ${i + 1} ${fail ? 'failed' : 'passed'}`), el('h4', null, 'The rule: ' + str(c.name)), el('p', null, fail ? 'What it found: ' + str(c.finding) : 'This draft follows it.'));
    };
    grid.appendChild(b);
  });
}

/* ---------- sort game ---------- */
let sortState;
function renderSort() {
  bindText('sortHeading'); bindHTML('sortIntro');
  $('bFixH').textContent = S.fixLabel; $('bLookH').textContent = S.lookLabel;
  sortState = { i: 0, right: 0, order: S.flags.map((_, k) => k), t0: performance.now() };
  $('bFix').innerHTML = ''; $('bLook').innerHTML = '';
  drawCard();
}
function drawCard() {
  const deck = $('deck'); deck.innerHTML = '';
  const n = S.flags.length;
  if (sortState.i >= n) {
    const sc = el('p', 'score', `You picked the same label on ${sortState.right} of ${n}.`);
    scores.sort = { right: sortState.right, total: n };
    const again = el('button', 'btn', S.againLabel); again.type = 'button';
    again.onclick = () => { renderSort(); $('deck').querySelector('.choice').focus(); };
    deck.append(sc, again);
    shout(sc.textContent);
    return;
  }
  const f = S.flags[sortState.order[sortState.i]];
  const ch = el('div', 'choices'); ch.setAttribute('role', 'group'); ch.setAttribute('aria-label', 'Pick a label');
  ['fix', 'look'].forEach(k => {
    const b = el('button', 'choice ' + k, k === 'fix' ? S.fixLabel : S.lookLabel); b.type = 'button';
    b.onclick = () => answerSort(k, b);
    ch.appendChild(b);
  });
  const fb = el('div', 'feedback'); fb.id = 'sortFb'; fb.setAttribute('aria-live', 'polite');
  deck.append(sortCard(f), ch, fb);
}
function sortCard(f) {
  const card = el('div', 'flag');
  card.append(el('span', 'of', `Problem ${sortState.i + 1} of ${S.flags.length}`), document.createTextNode(str(f.text)));
  return card;
}
function answerSort(k, btn) {
  const f = S.flags[sortState.order[sortState.i]];
  const ok = k === f.answer;
  if (ok) sortState.right++;
  track({ interactionId: 'sort-' + (sortState.order[sortState.i] + 1), type: 'choice', description: 'Fix or take a look: ' + str(f.text),
    choices: [{ id: 'fix', description: S.fixLabel }, { id: 'look', description: S.lookLabel }], correctResponse: [f.answer], response: [k],
    result: ok ? 'correct' : 'incorrect', latency: `PT${Math.round((performance.now() - sortState.t0) / 1000)}S` });
  const li = el('li', ok ? 'ok' : 'no'); const mk = el('span', 'mk', ok ? '\u2713' : '\u2715'); mk.setAttribute('aria-hidden', 'true');
  li.append(mk, el('span', null, str(f.text)));
  $(f.answer === 'fix' ? 'bFix' : 'bLook').appendChild(li);
  // Keep the answered card on screen with its feedback, then move on when the learner is ready.
  const deck = $('deck'); deck.innerHTML = '';
  const fb = el('div', 'feedback'); fb.setAttribute('aria-live', 'polite');
  const right = f.answer === 'fix' ? S.fixLabel : S.lookLabel;
  fb.append(el('strong', ok ? 'ok' : 'no', (ok ? S.rightLabel : S.wrongLabel) + ' '), document.createTextNode(`${right}: ${str(f.why)}`));
  const last = sortState.i + 1 >= S.flags.length;
  const next = el('button', 'btn primary', last ? 'See your score' : 'Next problem'); next.type = 'button';
  next.onclick = () => { drawCard(); const first = $('deck').querySelector('.choice') || $('deck').querySelector('.btn'); if (first) first.focus(); };
  deck.append(sortCard(f), fb, next);
  sortState.i++; sortState.t0 = performance.now();
  next.focus();
}

/* ---------- rewrite ---------- */
let marks = [], noteIdx = -1, view = 'both';
const layers = { fix: true, look: true, learn: true, new: true };
function markPhrase(root, phrase, kind, note) {
  if (!phrase) return null;
  const w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  let node;
  while ((node = w.nextNode())) {
    const idx = node.nodeValue.indexOf(phrase);
    if (idx < 0) continue;
    const p = node.parentElement;
    if (p && p.tagName === 'MARK' && p.dataset.phrase === phrase) continue;
    const r = document.createRange(); r.setStart(node, idx); r.setEnd(node, idx + phrase.length);
    const m = document.createElement('mark'); m.className = kind; m.dataset.note = note; m.dataset.kind = kind; m.dataset.phrase = phrase;
    r.surroundContents(m);
    return m;
  }
  return null;
}
function renderRewrite() {
  ['rewriteHeading', 'rewriteIntro', 'beforeVerdict', 'afterVerdict'].forEach(bindText);
  const rb = $('read-before'), ra = $('read-after');
  rb.innerHTML = str(S.beforeDoc); ra.innerHTML = str(S.afterDoc);
  const anns = S.annotations.map((a, i) => ({ ...a, i })).sort((a, b) => str(b.phrase).length - str(a.phrase).length);
  anns.forEach(a => {
    const m = markPhrase(a.side === 'after' ? ra : rb, str(a.phrase), a.kind || 'look', str(a.note));
    if (!m) console.warn('Annotation phrase not found in the draft:', a.phrase);
  });
  // chips with counts
  const chips = $('chips'); chips.innerHTML = '';
  Object.keys(KIND).forEach(k => {
    const n = document.querySelectorAll('#docs mark.' + k).length;
    if (!n) return;
    const b = el('button', 'chip'); b.type = 'button'; b.setAttribute('aria-pressed', String(layers[k]));
    const sw = el('span', 'sw ' + k); sw.setAttribute('aria-hidden', 'true');
    b.append(sw, el('span', null, KIND[k]), el('span', 'ct', String(n)));
    b.onclick = () => { layers[k] = !layers[k]; b.setAttribute('aria-pressed', String(layers[k])); $('docs').classList.toggle('off-' + k, !layers[k]); refreshMarks(true); };
    chips.appendChild(b);
  });
  document.querySelectorAll('#docs mark').forEach(m => m.addEventListener('click', e => {
    if (m.closest('.off-' + m.dataset.kind)) return;
    e.stopPropagation();
    const i = marks.indexOf(m); if (i >= 0) selectNote(i, false);
  }));
  document.querySelectorAll('.seg button').forEach(b => {
    b.onclick = () => {
      view = b.dataset.view;
      document.querySelectorAll('.seg button').forEach(x => x.setAttribute('aria-pressed', String(x === b)));
      $('doc-before').hidden = view === 'after'; $('doc-after').hidden = view === 'before';
      $('docs').classList.toggle('single', view !== 'both');
      refreshMarks(true);
    };
  });
  $('prevNote').onclick = () => selectNote(noteIdx <= 0 ? marks.length - 1 : noteIdx - 1, true);
  $('nextNote').onclick = () => selectNote(noteIdx >= marks.length - 1 ? 0 : noteIdx + 1, true);
  refreshMarks(true);
}
function refreshMarks(reset) {
  const cur = marks[noteIdx];
  marks = [...document.querySelectorAll('#docs mark')].filter(m => layers[m.dataset.kind] && !m.closest('.doc[hidden]'));
  document.querySelectorAll('#docs mark.on').forEach(m => m.classList.remove('on'));
  noteIdx = reset ? marks.indexOf(cur) : noteIdx;
  if (noteIdx >= 0) selectNote(noteIdx, false); else drawNote();
}
function drawNote() {
  const box = $('note'); box.innerHTML = '';
  const off = !marks.length;
  $('prevNote').disabled = off; $('nextNote').disabled = off;
  if (off) { box.append(el('span', 'n', 'Turn on a highlight type to step through its notes.')); return; }
  if (noteIdx < 0) {
    box.append(el('span', 'n', `${marks.length} notes. Press Next note, or tap a highlight.`));
    return;
  }
  const m = marks[noteIdx], k = m.dataset.kind, side = m.closest('#doc-after') ? 'After' : 'Before';
  const q = m.dataset.phrase.length > 110 ? m.dataset.phrase.slice(0, 107) + '…' : m.dataset.phrase;
  box.append(el('span', 'k ' + k, KIND[k]), el('span', 'q', `${side}: “${q}”`), el('span', 'n', m.dataset.note), el('span', 'pos', `Note ${noteIdx + 1} of ${marks.length}`));
}
function selectNote(i, scroll) {
  document.querySelectorAll('#docs mark.on').forEach(m => m.classList.remove('on'));
  noteIdx = i; const m = marks[i]; if (!m) return drawNote();
  m.classList.add('on');
  if (scroll) {
    const read = m.closest('.read');
    const top = m.getBoundingClientRect().top - read.getBoundingClientRect().top + read.scrollTop;
    read.scrollTo({ top: Math.max(0, top - read.clientHeight / 3), behavior: reduced ? 'auto' : 'smooth' });
  }
  drawNote();
}

/* ---------- course-dev ---------- */
function renderCourse() {
  bindText('courseHeading'); bindText('courseIntro');
  const range = $('monthRange'), ticks = $('ticks'), n = S.months.length;
  range.max = Math.max(0, n - 1); range.value = 0; ticks.innerHTML = '';
  S.months.forEach((m, i) => { const t = el('span', null, str(m.month)); t.onclick = () => { range.value = i; drawMonth(i); }; ticks.appendChild(t); });
  range.oninput = () => drawMonth(+range.value);
  drawMonth(0);
}
function drawMonth(i) {
  const m = S.months[i]; if (!m) return;
  const range = $('monthRange');
  range.setAttribute('aria-valuetext', `${m.month}: ${m.label}`);
  [...$('ticks').children].forEach((t, k) => t.classList.toggle('on', k === i));
  const card = $('monthCard'); card.innerHTML = '';
  const when = el('span', 'when', `${m.month} · ${m.label}`);
  const h = el('h3', null, str(m.title)); h.setAttribute('data-form-key', `months.${i}.title`);
  const body = el('div', 'lead'); body.innerHTML = str(m.body); body.setAttribute('data-form-key', `months.${i}.body`);
  card.append(when, h, body);
  // A step can start with its own emoji (like 👀) to override the default icon.
  const ICON = { auto: '\u{1F916}', hand: '\u270B' }, NAME = { '\u{1F916}': 'Done by AI', '\u270B': 'Done manually', '\u{1F440}': 'Checked by eye' };
  const parse = k => t => { const x = t.match(/^(\p{Extended_Pictographic}\uFE0F?)\s+(.+)$/u); return x ? [k, x[2], x[1].replace('\uFE0F', '')] : [k, t, ICON[k]]; };
  const auto = lines(m.autoSteps).map(parse('auto')), hand = lines(m.handSteps).map(parse('hand')), all = [...auto, ...hand];
  if (all.length) {
    const legend = el('p', 'legend');
    [...new Set(all.map(a => a[2]))].forEach(ic => { const sp = el('span', null, `${ic} ${NAME[ic] || ''}`); legend.appendChild(sp); });
    legend.setAttribute('aria-hidden', 'true');
    const flow = el('ol', 'flow'); flow.setAttribute('aria-label', 'Steps');
    all.forEach(([k, t, ic], j) => {
      const li = el('li', 'step ' + k); li.style.animationDelay = (j * 90) + 'ms';
      const icon = el('span', null, ic); icon.setAttribute('aria-hidden', 'true');
      li.append(icon, el('span', 'sr', (NAME[ic] || 'Step') + ': '), document.createTextNode(t));
      flow.appendChild(li);
      if (j < all.length - 1) { const a = el('li', 'arr', '\u2193'); a.setAttribute('aria-hidden', 'true'); flow.appendChild(a); }
    });
    const meter = el('div', 'handmeter');
    const bar = el('div', 'bar'); bar.setAttribute('aria-hidden', 'true'); const fill = el('i'); bar.appendChild(fill);
    meter.append(el('span', null, `Done manually: ${hand.length} of ${all.length} steps`), bar);
    card.append(legend, flow, meter);
    requestAnimationFrame(() => { fill.style.width = (hand.length / all.length * 100) + '%'; });
  }
  if (str(m.note)) { const p = el('p', 'meta', str(m.note)); p.setAttribute('data-form-key', `months.${i}.note`); card.appendChild(p); }
}

/* ---------- match ---------- */
let matchState;
function renderMatch() {
  bindText('matchHeading'); bindText('matchIntro');
  const probs = $('probs'); probs.innerHTML = '';
  const fixes = S.problems.map((p, i) => ({ i, text: str(p.fix) }));
  matchState = { firstTry: 0, done: 0 };
  S.problems.forEach((p, i) => {
    const card = el('div', 'card prob'); const t0 = performance.now(); let tries = 0;
    const h = el('h3', null, str(p.problem)); h.id = 'prob-' + i;
    const opts = el('div', 'opts'); opts.setAttribute('role', 'group'); opts.setAttribute('aria-labelledby', h.id);
    const fb = el('p', 'fb'); fb.setAttribute('aria-live', 'polite');
    const order = fixes.map((_, k) => fixes[(k + i + 1) % fixes.length]);
    order.forEach(f => {
      const b = el('button', 'opt', f.text); b.type = 'button';
      b.onclick = () => {
        tries++;
        const ok = f.i === i;
        if (ok) {
          b.classList.add('right'); opts.querySelectorAll('.opt').forEach(x => { x.disabled = true; });
          b.setAttribute('aria-label', f.text + ', correct');
          fb.textContent = S.rightLabel + (tries === 1 ? ' First try.' : '');
          fb.style.color = 'var(--sage-ink)'; card.classList.add('done');
          if (tries === 1) matchState.firstTry++;
          matchState.done++;
          track({ interactionId: 'match-' + (i + 1), type: 'choice', description: 'Pick the fix: ' + str(p.problem),
            choices: fixes.map(x => ({ id: 'fix-' + (x.i + 1), description: x.text })), correctResponse: ['fix-' + (i + 1)], response: ['fix-' + (i + 1)],
            result: tries === 1 ? 'correct' : 'incorrect', latency: `PT${Math.round((performance.now() - t0) / 1000)}S` });
          if (matchState.done === S.problems.length) {
            scores.match = { right: matchState.firstTry, total: S.problems.length };
            const s = el('p', 'score', `You matched ${matchState.firstTry} of ${S.problems.length} on the first try.`);
            probs.appendChild(s); shout(s.textContent);
          } else {
            const nextOpen = probs.querySelector('.prob:not(.done) .opt:not(:disabled)'); if (nextOpen) setTimeout(() => nextOpen.focus(), 600);
          }
        } else {
          b.classList.add('wrong'); b.disabled = true; b.setAttribute('aria-label', f.text + ', not this one');
          if (!reduced) { card.classList.remove('shake'); void card.offsetWidth; card.classList.add('shake'); }
          fb.textContent = S.wrongLabel + ' Try another.'; fb.style.color = 'var(--coral-ink)';
          const left = opts.querySelector('.opt:not(:disabled)'); if (left) left.focus();
        }
      };
      opts.appendChild(b);
    });
    card.append(h, opts, fb);
    probs.appendChild(card);
  });
}

/* ---------- finish ---------- */
function finish() {
  const tally = $('tally'); tally.innerHTML = '';
  if (scores.sort) tally.append(el('div', null, `Sorted ${scores.sort.right} of ${scores.sort.total}`));
  if (scores.match) tally.append(el('div', null, `Matched ${scores.match.right} of ${scores.match.total} first try`));
  tally.append(el('div', null, `${visited.size} of ${STOPS.length} sections viewed`));
  if (!reduced) {
    const c = $('confetti'); c.innerHTML = '';
    const cols = ['#3CC9A4', '#F7B8A0', '#0A5A48', '#82352A', '#E2F6EF'];
    for (let k = 0; k < 46; k++) {
      const p = el('i'); p.style.left = Math.random() * 100 + '%'; p.style.background = cols[k % cols.length];
      p.style.animationDelay = (Math.random() * .6) + 's'; p.style.transform = `rotate(${Math.random() * 360}deg)`;
      c.appendChild(p);
    }
  }
  if (sdk && sdk.markAsComplete) sdk.markAsComplete();
}
function renderFinish() {
  bindText('finishHeading'); bindHTML('finishBody');
  const a = $('repo'); a.textContent = str(S.linkLabel); a.href = str(S.linkUrl) || '#'; a.hidden = !str(S.linkUrl);
}

/* ---------- boot ---------- */
function init(state) {
  S = Object.assign({}, DEFAULTS, state || {});
  ['checks', 'draftHits', 'flags', 'annotations', 'months', 'problems'].forEach(k => { if (!Array.isArray(S[k])) S[k] = []; });
  buildTabs(); renderStart(); renderDraft(); renderCheckers(); renderSort(); renderRewrite(); renderCourse(); renderMatch(); renderFinish();
  $('back').textContent = S.backLabel; $('next').textContent = S.nextLabel;
  $('back').onclick = () => show(cur - 1, true);
  $('next').onclick = () => show(cur + 1, true);
  show(cur);
}

if (sdk && sdk.onSdkReady) {
  sdk.onSdkReady(async () => {
    if (sdk.registerTracking) sdk.registerTracking({
      completion: { description: 'Completes when the learner reaches the last section' },
      tracking: { description: 'Records each sort and match answer' }
    });
    let state = {};
    try { state = await sdk.state.getState(DEFAULTS, 4000); } catch (e) { state = {}; }
    init(state);
  });
} else {
  sdk = null; init({});
}
