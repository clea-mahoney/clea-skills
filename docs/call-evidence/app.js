'use strict';
const D = JSON.parse(document.getElementById('presentation-data').textContent);
const week = new EvidenceWeek(D);
const stages = [
  { key: 'story', label: 'The workflow', detail: 'The workflow', next: 'Start with Tuesday’s call' },
  { key: 'calls', label: 'Tuesday', detail: 'First call', next: 'Continue to Thursday' },
  { key: 'thursday', label: 'Thursday', detail: 'Second call', next: 'See Friday’s laptop alert' },
  { key: 'insights', label: 'Friday', detail: 'Laptop alert', next: 'Review the evidence' },
  { key: 'review', label: 'Evidence & decisions', detail: 'Evidence and decisions', next: '' }
];
const aliases = { tuesday: 'calls', friday: 'insights', research: 'review' };
const routeLabels = { education: 'Education priority', product: 'Product first', hold: 'Deliberate Hold', none: 'No education applies', docs: 'Documentation first', unknown: 'Open to explore' };
const choiceLabels = {
  'merge-2': 'Add evidence to “Checking AI-built workflows”',
  'merge-13': 'Add it to “AI judgment and human review”',
  'merge-7': 'Add it to “Starting with one small automation”',
  'subset-2': 'Create an approval subtheme within “Checking AI-built workflows”',
  'subset-7': 'Keep a separate example within “Starting with one small automation”',
  new: 'Keep it as a separate theme', defer: 'Leave it open for more evidence',
  retain: 'Keep the company unknown and retain Tom’s evidence',
  'follow-up': 'Follow up on the company; retain Tom’s evidence',
  unconfirmed: 'Keep Sam out of the customer count until identified',
  internal: 'Confirm Sam is internal and exclude from customer evidence',
  'customer-unconfirmed': 'Treat Sam as a possible customer; confirm the full name before counting',
  investigate: 'Ask product to investigate the timeout',
  expected: 'Confirm it is expected behavior and document it',
  bug: 'Confirm it is a bug and route it to product'
};
let index = stageFromHash(), activeQuestion = 'bounded', highlightedTheme = null, researchOpen = false, reviewOpen = false;
const stage = document.getElementById('stage'), notice = document.getElementById('notice');
function esc(x) { return String(x ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])); }
function stageFromHash() { const raw = location.hash.slice(1), key = aliases[raw] || raw; return Math.max(0, stages.findIndex(x => x.key === key)); }
function message(text = '', error = false) { notice.textContent = text; notice.className = 'notice' + (error ? ' error' : ''); }
function go(target) {
  captureDraft();
  index = Math.max(0, Math.min(stages.length - 1, target));
  history.replaceState(null, '', '#' + stages[index].key); message(); render();
  document.getElementById('nav-' + index).focus(); window.scrollTo({ top: 0, behavior: 'instant' });
}
function transcript(which) { return D.inputs.find(x => x.name === '2026-09-' + (which === 'tuesday' ? '22' : '24') + '-office-hours.md'); }
function transcriptBody(input) { return input.text.replace(/^# .+\n\nComplete fictional sample call\. All names, companies, dates, and dialogue are invented for this demonstration\.\n\n/, ''); }
function at(which, timestamp) { return week.lines().get(transcript(which).name + '|' + timestamp); }
function quote(e) {
  const date = e.call.includes('09-22') ? 'Tuesday' : 'Thursday';
  return `<blockquote class="quote"><div class="speaker">${esc(e.speaker)}</div><div class="organization">${esc(e.company)}</div><p>“${esc(e.quote)}”</p><button type="button" data-source="${esc(e.call)}" data-time="${esc(e.timestamp)}">${date}’s transcript · ${esc(e.timestamp)}</button></blockquote>`;
}
function evidence(items) { return items.map(quote).join(''); }
function story() {
  return `<h2>What I built</h2>
  <p class="intro">An AI-assisted workflow organizes customer calls into evidence so I can decide what needs education or product review. The findings helped me refocus training for the new platform on directing the AI and checking its work.</p>
  <h2>How the workflow evolved</h2>
  <div class="evolution">
    <details><summary><span class="evolution-title">Manual call review</span><span class="expand-hint">Read more</span></summary><p>I copied Gong transcripts into Notion AI, checked the findings, and added verified input to a Notion database. I then created a Notion agent to repeat the review.</p></details>
    <details><summary><span class="evolution-title">Rules I could check</span><span class="expand-hint">Read more</span></summary><p>The rules kept quotes and timestamps, compared findings with existing themes, and flagged uncertain speakers. I could check the recording, attendee details, or Gong against Fellow when both were available.</p><p><a href="workflow-rules.txt">Read the full rules</a></p></details>
    <details><summary><span class="evolution-title">Friday review</span><span class="expand-hint">Read more</span></summary><p>I moved the same rules into a scheduled Claude Code skill. Each Friday, a laptop alert showed me the new evidence and open questions.</p></details>
  </div>
  <section class="walkthrough-invite"><h2>Explore the sample week</h2><p>Follow two calls, open the Friday alert, and try the review decisions.</p></section>`;
}
function callDay(which) {
  const tuesday = which === 'tuesday', input = transcript(which);
  const samples = tuesday ? [at(which, '00:00:26'), at(which, '00:00:56')] : [at(which, '00:01:33'), at(which, '00:02:59')];
  return `<h2>${tuesday ? 'Tuesday: workspace confusion' : 'Thursday: testing habits'}</h2>
    ${tuesday ? '<p class="intro">This is something I’d flag for product feedback.</p>' : '<p class="intro">These examples point to skills worth teaching: start small, test with realistic data, and check the output before expanding.</p>'}
    <div class="quotes">${evidence(samples)}</div>
    <details><summary>Read the complete ${tuesday ? 'Tuesday' : 'Thursday'} sample call</summary><pre>${esc(transcriptBody(input))}</pre></details>`;
}
function friday() {
  return `<h2>Friday: four questions to review</h2>
    <p class="intro">Two calls had been reviewed and linked to research themes. The alert showed the open questions.</p>
    <p class="caption">${week.recorded()} of 4 responses recorded${week.followUps().length ? ` · ${week.followUps().length} follow-ups identified` : ''}</p>
    <div class="actions"><button class="button primary" id="${week.state.ran ? 'show-alert' : 'run-week'}">Open the weekly alert</button></div>
`;
}
const questions = {
  approval: { label: 'Approval ownership', title: 'Is approval ownership a new theme or part of the research we already have?', why: 'Aisha uses an approval step; Lena is unsure who should be allowed to approve. I can keep an approval checklist inside the existing verification topic, or treat choosing approvers as a separate learning need. I would check the available product permissions before teaching the setup.', evidence: () => week.evidence('approval-gates'), related: [2, 13], options: ['merge-2', 'subset-2', 'merge-13', 'new', 'defer'] },
  bounded: { label: 'Starting small', title: 'Is starting small already covered by an existing theme?', why: 'Lena’s team narrowed a whole help desk request to categorizing one sample ticket for a person to check. That is an example of the existing skill: build and test one small component before expanding.', evidence: () => week.evidence('start-small'), related: [7], options: ['merge-7', 'new', 'defer'] },
  sam: { label: 'Sam’s identity', title: 'Who is Sam, and is this a customer or someone internal?', why: 'The transcript gives only a first name. I would check the attendee record, listen to the recording, or compare Gong with Fellow when both were available before confirming the identity. Until then, this question can be investigated without counting Sam as a named customer.', evidence: () => [at('tuesday', '00:03:34')], related: [], options: ['unconfirmed', 'defer'] },
  timeout: { label: 'Connector timeout', title: 'Is the timeout expected behavior, a product bug, or still unclear?', why: 'The reported timeout does not establish its cause. I need to check the behavior before deciding whether a product investigation or documentation is the right response.', evidence: () => [at('tuesday', '00:03:34')], related: [], options: ['investigate', 'defer'] }
};
function decisionConsequence(id, choice) {
  if (choice === 'defer') return id === 'sam' ? 'Sam remains unconfirmed and excluded from customer counts.' : id === 'timeout' ? 'The timeout cause remains open for investigation.' : 'The evidence stays open. No new theme has been recorded.';
  if (id === 'bounded' && choice !== 'new') return 'The evidence stays with one existing theme. A possible learning activity is to build a ticket-category step, check it with sample tickets, and only then add routing.';
  if (id === 'bounded') return `“${week.themes().find(r => r.id === 23).title}” now holds Lena’s evidence. I would define how it differs from “Starting with one small automation” before planning education.`;
  if (id === 'approval') return choice === 'new' ? `“${week.themes().find(r => r.id === 22).title}” now holds the approval evidence. I would check product permissions and define how it differs from the existing verification theme.` : choice === 'subset-2' ? 'The verification topic would include a checklist: inspect the output, test it, and confirm who must approve the consequential action. Approval remains visible without becoming a separate top-level theme.' : 'This records where the approval evidence belongs. Product permissions still need checking before I choose what guidance to create.';
  if (id === 'timeout') return 'Product needs to establish the cause before I decide whether guidance would help. The report does not become an education priority.';
  return 'The evidence remains traceable while the identity or company information is handled separately.';
}
function review() {
  if (!week.state.ran) week.run();
  const q = questions[activeQuestion], saved = week.state.reviews[activeQuestion], draft = week.state.drafts?.[activeQuestion] || saved, rows = week.themes();
  return `<h2>From evidence to decisions</h2>
    <p>Choose either option below. Try making four decisions, or read examples of how I would respond to the findings. You can explore both.</p>
    <details class="review-detail" id="review-detail" ${reviewOpen ? 'open' : ''}><summary>Try it: make four review decisions</summary>
    <section class="weekly-review">
    <div class="workspace"><div class="workspace-heading"><div><h3>Weekly review</h3><p class="caption">Four selected questions from the two calls</p></div><span class="caption">${week.recorded()} of 4 responses recorded</span></div>
    <div class="review-layout"><nav class="question-list" aria-label="Review questions">${Object.entries(questions).sort(([a], [b]) => a === 'bounded' ? -1 : b === 'bounded' ? 1 : 0).map(([id, item]) => `<button data-question="${id}" aria-current="${id === activeQuestion}">${esc(item.label)}<small>${week.state.reviews[id] ? (week.followUp(id) || 'Decision recorded') : 'Needs review'}</small></button>`).join('')}</nav>
    <article class="question-content"><h3>${esc(q.title)}</h3><p>${esc(q.why)}</p>${evidence(q.evidence())}
    ${q.related.length ? `<div class="related"><p>Existing themes to compare</p>${q.related.map(id => `<button data-theme="${id}">${esc(rows.find(r => r.id === id).title)}</button>`).join('')}</div>` : ''}
    <form class="review-form" id="decision-form"><label for="decision">Decision</label><select id="decision" name="choice" required><option value="">Choose a response</option>${q.options.map(value => `<option value="${value}" ${draft?.choice === value ? 'selected' : ''}>${esc(choiceLabels[value])}</option>`).join('')}</select>${q.options.includes('new') ? `<div id="new-theme-field" ${draft?.choice === 'new' ? '' : 'hidden'}><label for="new-theme-name">New theme name</label><input id="new-theme-name" name="themeName" maxlength="120" value="${esc(draft?.themeName ?? (activeQuestion === 'bounded' ? 'Starting with one small workflow' : 'Approval ownership for consequential runs'))}" ${draft?.choice === 'new' ? 'required' : 'disabled'}></div>` : ''}<label for="decision-note">Review note (optional)</label><textarea name="note" id="decision-note" maxlength="1000">${esc(draft?.note || '')}</textarea><button class="button primary" type="submit">Record decision</button></form>
    ${saved ? `<div id="decision-result" class="decision-result" tabindex="-1" role="status"><p><strong>Decision recorded:</strong> ${esc(choiceLabels[saved.choice])}</p>${saved.note ? `<p>${esc(saved.note)}</p>` : ''}<p>${esc(decisionConsequence(activeQuestion, saved.choice))}</p>${week.affectedTheme(activeQuestion) ? `<button class="button" data-theme="${week.affectedTheme(activeQuestion)}">View the theme and its evidence</button>` : ''}${week.followUp(activeQuestion) ? `<p><strong>Follow-up:</strong> ${esc(week.followUp(activeQuestion))}</p>` : ''}</div>` : ''}
    </article></div></div></section>
    ${week.recorded() === 4 ? '<p class="decision-result" role="status"><strong>Sample review complete.</strong> Your decisions and follow-ups are recorded.</p>' : ''}
    ${week.followUps().length ? `<section class="decision-summary"><h3>Follow-ups identified</h3><p>These need work outside this sample review.</p><ul>${week.followUps().map(item => `<li><button data-question="${item.id}">${esc(questions[item.id].label)}</button>: ${esc(week.followUp(item.id))}</li>`).join('')}</ul></section>` : ''}</details>
    <details class="research-detail" id="research-detail" ${researchOpen ? 'open' : ''}><summary>Read examples: education, product, or documentation</summary>${database(rows)}</details>
    `;
}
function database(rows) {
  const shown = [7, 8, 21].map(id => rows.find(r => r.id === id)).filter(Boolean);
  const separate = [22, 23].map(id => rows.find(r => r.id === id)).filter(Boolean);
  return `<section class="database"><p class="caption">The calls also raise questions about checking AI output and approval permissions. These examples show three possible responses to findings. You do not need to complete the four decisions to read them.</p>
    <div class="theme-cards">${shown.map(r => {
      return `<article id="theme-row-${r.id}" class="theme-card ${r.id === highlightedTheme ? 'updated-row' : ''}"><h4><button class="theme-link" data-theme="${r.id}">${esc(r.title)}</button></h4><span class="status-word">${esc(routeLabels[r.sample_route] || 'Open to explore')}</span><p class="caption">${r.id === 21 ? 'From earlier research, not these sample calls' : 'From the sample calls'}</p><p class="theme-action">${esc(r.next_action || 'Review the evidence before choosing a response.')}</p>${r.id === highlightedTheme ? '<strong class="theme-update">Updated by your decision</strong>' : ''}</article>`;
    }).join('')}</div>${separate.length ? `<p class="separate-themes">Separate themes from your review: ${separate.map(r => `<button data-theme="${r.id}">${esc(r.title)}</button>`).join(', ')}</p>` : ''}<button class="button" id="export">Download full research register (CSV)</button></section>`;
}
function showSource(call, timestamp) {
  const input = D.inputs.find(x => x.name === call), which = call.includes('09-22') ? 'Tuesday' : 'Thursday';
  document.getElementById('source-title').textContent = which + '’s call transcript';
  document.getElementById('source-content').innerHTML = `<p class="source-meta caption">September ${which === 'Tuesday' ? '22' : '24'} · ${esc(timestamp)}</p><div class="transcript"><pre>${esc(transcriptBody(input)).split('\n').map(line => line.startsWith('[' + timestamp + ']') ? '<mark>' + line + '</mark>' : line).join('\n')}</pre></div>`;
  const dialog = document.getElementById('source-dialog');
  dialog.showModal();
  document.getElementById('source-content').querySelector('mark')?.scrollIntoView({ block: 'center' });
  dialog.scrollTop = 0;
}
function showTheme(id) {
  const row = week.themes().find(x => x.id === Number(id));
  const pendingEvidence = row.id === 7 && (!week.state.reviews.bounded || week.state.reviews.bounded.choice === 'defer') ? week.evidence('start-small') : [];
  document.getElementById('theme-title').textContent = row.title;
  document.getElementById('theme-content').innerHTML = `<p class="theme-status"><strong>${esc(routeLabels[row.sample_route] || 'Open to explore')}</strong> · Illustrative response</p><p>${esc(row.description || 'A separate theme approved during this sample week.')}</p><p><strong>Evidence handling:</strong> ${esc(row.recovered_route === 'hold' ? 'Deliberate Hold' : row.handling)}</p><p><strong>Possible next action:</strong> ${esc(row.next_action || 'Review the evidence before choosing a response.')}</p>${row.subthemes?.length ? '<p><strong>Subtheme from this review:</strong> ' + row.subthemes.map(s => esc(s.title)).join(', ') + '</p>' : ''}${row.evidence.length ? '<h3>Supporting evidence</h3>' + evidence(row.evidence) : pendingEvidence.length ? '<p><strong>Awaiting a placement decision:</strong> Lena’s starting-small example</p>' + evidence(pendingEvidence) : '<p>No new evidence from the two sample calls has been added to this theme yet.</p>'}${row.recovered_route === 'hold' ? '<p><strong>Recorded historical route:</strong> ' + esc(row.source_note) + '</p>' : ''}`;
  bindSources(document.getElementById('theme-content'));
  const dialog = document.getElementById('theme-dialog');
  dialog.showModal();
  dialog.scrollTop = 0;
}
function showAlert() {
  document.getElementById('alert-copy').textContent = `2 calls reviewed · ${week.recorded()} of 4 decisions recorded · ${week.followUps().length} follow-ups`;
  document.getElementById('alert-questions').innerHTML = week.handoffQuestions().map(q => `<li>${esc(q.title)}${week.state.reviews[q.id] ? `<p class="caption">Recorded: ${esc(choiceLabels[week.state.reviews[q.id].choice])}${week.followUp(q.id) ? '<br>Follow-up: ' + esc(week.followUp(q.id)) : ''}</p>` : ''}</li>`).join('');
  document.getElementById('copy-status').textContent = '';
  document.getElementById('copy-fallback').hidden = true;
  const dialog = document.getElementById('weekly-alert');
  dialog.showModal();
  dialog.scrollTop = 0;
}
async function copyQuestions() {
  const text = week.handoffText();
  try {
    await navigator.clipboard.writeText(text);
    if (!navigator.clipboard.readText) throw Error('Clipboard copy could not be verified.');
    const copied = await Promise.race([navigator.clipboard.readText(), new Promise((_, reject) => setTimeout(() => reject(Error('Clipboard read timed out.')), 1500))]);
    if (copied !== text) throw Error('Clipboard copy could not be verified.');
    document.getElementById('copy-status').textContent = 'Questions and evidence copied.';
  } catch {
    const fallback = document.getElementById('copy-fallback');
    fallback.hidden = false; fallback.value = text; fallback.focus(); fallback.select();
    document.getElementById('copy-status').textContent = 'Clipboard copy could not be verified. Select and copy the text below.';
  }
}
function bindSources(root = stage) { root.querySelectorAll('[data-source]').forEach(b => b.onclick = () => showSource(b.dataset.source, b.dataset.time)); }
function captureDraft() {
  const form = document.getElementById('decision-form');
  if (form) week.saveDraft(activeQuestion, form.elements.choice.value, form.elements.note.value, form.elements.themeName?.value);
}
function render() {
  document.body.dataset.stage = stages[index].key;
  document.getElementById('navigation').innerHTML = '<ol>' + stages.map((s, i) => `<li><button id="nav-${i}" aria-controls="stage" ${index === i ? 'aria-current="step"' : ''} data-nav="${i}"><span class="step-number" aria-hidden="true">${i + 1}</span><span><span class="step-title">${s.label}</span></span></button></li>`).join('') + '</ol>';
  stage.setAttribute('aria-labelledby', 'nav-' + index);
  stage.innerHTML = [story, () => callDay('tuesday'), () => callDay('thursday'), friday, review][index]();
  const reviewDetail = document.getElementById('review-detail');
  if (reviewDetail) reviewDetail.ontoggle = () => { reviewOpen = reviewDetail.open; };
  const researchDetail = document.getElementById('research-detail');
  if (researchDetail) researchDetail.ontoggle = () => { researchOpen = researchDetail.open; };
  document.querySelectorAll('[data-nav]').forEach(b => b.onclick = () => go(Number(b.dataset.nav)));
  stage.querySelectorAll('[data-go]').forEach(b => b.onclick = () => go(Number(b.dataset.go)));
  stage.querySelectorAll('[data-theme]').forEach(b => b.onclick = () => showTheme(b.dataset.theme));
  stage.querySelectorAll('[data-question]').forEach(b => b.onclick = () => { captureDraft(); activeQuestion = b.dataset.question; reviewOpen = true; message(); render(); document.querySelector('.question-content').scrollIntoView({ block: 'start' }); });
  bindSources();
  document.getElementById('previous').disabled = index === 0;
  document.getElementById('next').hidden = index === stages.length - 1;
  document.getElementById('next').textContent = stages[index].next;
  document.getElementById('position').textContent = (index + 1) + ' of ' + stages.length;
  const run = document.getElementById('run-week');
  if (run) run.onclick = () => { try { week.run(); render(); showAlert(); } catch (e) { message(e.message, true); } };
  const alert = document.getElementById('show-alert'); if (alert) alert.onclick = showAlert;
  const form = document.getElementById('decision-form');
  if (form) {
    form.oninput = captureDraft;
    form.elements.choice.onchange = () => {
      const field = document.getElementById('new-theme-field');
      if (field) {
        const isNew = form.elements.choice.value === 'new';
        field.hidden = !isNew;
        form.elements.themeName.disabled = !isNew;
        form.elements.themeName.required = isNew;
      }
      captureDraft();
    };
  }
  if (form) form.onsubmit = event => { event.preventDefault(); const values = new FormData(form); try { week.review(activeQuestion, values.get('choice'), values.get('note'), values.get('themeName') ?? undefined); highlightedTheme = week.affectedTheme(activeQuestion); render(); document.getElementById('decision-result').focus(); document.getElementById('decision-result').scrollIntoView({ block: 'center' }); } catch (e) { message(e.message, true); notice.scrollIntoView({ block: 'center' }); } };
  stage.querySelectorAll('[data-history]').forEach(form => form.onsubmit = event => { event.preventDefault(); const values = new FormData(form); try { week.reviewHistorical(Number(form.dataset.history), values.get('route'), values.get('note')); render(); message('Historical decision recorded. Include it in the downloaded register when you are ready to share it.'); } catch (e) { message(e.message, true); } });
  const exportButton = document.getElementById('export'); if (exportButton) exportButton.onclick = exportHistory;
}
function exportHistory() {
  const csv = week.exportCSV(routeLabels);
  const url = URL.createObjectURL(new Blob(['\ufeff' + csv], { type: 'text/csv;charset=utf-8' }));
  const a = document.createElement('a'); a.href = url; a.download = 'customer-evidence.csv'; a.click(); setTimeout(() => URL.revokeObjectURL(url), 1000);
}
function setBrand(value) {
  const brand = ['clea', 'zapier'].includes(value) ? value : 'clea';
  document.documentElement.dataset.brand = brand;
  document.querySelectorAll('[data-brand-choice]').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.brandChoice === brand)));
  try { localStorage.setItem('clea-call-evidence-brand', brand); } catch {}
  const url = new URL(location.href); url.searchParams.set('brand', brand); history.replaceState(null, '', url);
}
let initialBrand = 'clea'; try { initialBrand = localStorage.getItem('clea-call-evidence-brand') || initialBrand; } catch {}
setBrand(new URLSearchParams(location.search).get('brand') || initialBrand);
document.querySelectorAll('[data-brand-choice]').forEach(b => b.onclick = () => setBrand(b.dataset.brandChoice));
document.getElementById('previous').onclick = () => go(index - 1);
document.getElementById('next').onclick = () => go(index + 1);
document.getElementById('restart').onclick = () => { document.getElementById('decision-form')?.remove(); week.reset(); highlightedTheme = null; activeQuestion = 'bounded'; reviewOpen = false; researchOpen = false; go(0); };
document.getElementById('close-alert').onclick = () => document.getElementById('weekly-alert').close();
document.getElementById('copy-questions').onclick = copyQuestions;
document.getElementById('open-review').onclick = () => { document.getElementById('weekly-alert').close(); reviewOpen = true; go(4); document.querySelector('.weekly-review').scrollIntoView({ block: 'start' }); };
document.getElementById('close-source').onclick = () => document.getElementById('source-dialog').close();
document.getElementById('close-theme').onclick = () => document.getElementById('theme-dialog').close();
document.addEventListener('keydown', event => { if (document.querySelector('dialog[open]') || event.target.closest('input,select,textarea,button,summary,a')) return; if (event.key === 'ArrowRight') go(index + 1); if (event.key === 'ArrowLeft') go(index - 1); });
window.addEventListener('hashchange', () => { captureDraft(); index = stageFromHash(); message(); render(); });
render();
