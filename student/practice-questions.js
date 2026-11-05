import './worked-methods.js';
import {SKILLS, makeQuestion, checkField, rng, esc} from '../teacher/bank.js';

export const GROUPS = {
  characters: {title: 'Character encoding practice', prefix: 'characterpractice', skills: SKILLS.filter(s => s.topic === 'characters')},
  rle: {title: 'Run length encoding practice', prefix: 'rle', skills: SKILLS.filter(s => ['rle-encode', 'rle-decode'].includes(s.id))}
};
const COUNTS = [6, 10, 15, 20];
const shuffle = (values, random) => {
  const result = [...values];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
};
export function normaliseSettings(group, options = {}) {
  const config = GROUPS[group];
  if (!config) throw new Error('Unknown practice group.');
  return {
    type: config.skills.some(s => s.id === options.type) ? options.type : 'all',
    count: COUNTS.includes(Number(options.count)) ? Number(options.count) : 10,
    seed: Number(options.seed) >>> 0
  };
}
export function createPracticeSet(group, options = {}) {
  const settings = normaliseSettings(group, options), random = rng(settings.seed);
  const skills = GROUPS[group].skills.filter(s => settings.type === 'all' || s.id === settings.type);
  const levels = shuffle([1, 2, 3], random);
  let deck = [];
  return Array.from({length: settings.count}, (_, i) => {
    if (!deck.length) deck = shuffle(skills, random);
    const skill = deck.pop();
    return makeQuestion(skill.id, levels[i % levels.length], Math.floor(random() * 4294967296));
  });
}
export function createResponse(question) {
  return {question, answers: question.fields.map(() => ''), written: '', results: [], checked: false, complete: false, feedback: '', tone: '', working: false};
}
export function resetFeedback(record) {
  record.results = []; record.checked = false; record.complete = false; record.feedback = ''; record.tone = '';
}
export function checkResponse(record) {
  resetFeedback(record);
  if (!record.question.fields.length) {
    record.feedback = 'Use the worked method to plan and review your explanation.';
    return record;
  }
  record.results = record.question.fields.map((field, i) => checkField(field, record.answers[i]));
  if (record.results.some(result => result.empty)) {
    record.feedback = 'Complete every answer before checking.'; record.tone = 'bad';
  } else {
    record.checked = true;
    record.complete = record.results.every(result => result.correct);
    record.tone = record.complete ? 'good' : 'bad';
    record.feedback = record.complete ? 'Correct! Your answer matches.' : 'Not quite. Check your method, code format and letter case, or use the worked method.';
  }
  return record;
}
const actionButton = (action, text, primary = false) => `<button class="button ${primary ? 'secondary' : 'outline'}" type="button" data-bank-action="${action}">${text}</button>`;
function fieldHTML(record, field, index, prefix) {
  const id = `${prefix}-answer-${index}`, result = record.results[index];
  return `<div class="bank-field"><label for="${id}">${esc(field.label)}</label><input id="${id}" type="text" data-bank-answer="${index}" value="${esc(record.answers[index])}" ${field.kind === 'number' ? 'inputmode="decimal"' : field.kind === 'bitstream' ? 'inputmode="numeric"' : ''} autocomplete="off" spellcheck="false" ${result && !result.correct ? 'aria-invalid="true"' : ''}><span class="bank-print-space" aria-hidden="true"></span></div>`;
}
function rleEditor(record) {
  if (record.question.skill !== 'rle-decode') return '';
  const bits = record.answers[0].replace(/\s/g, '');
  return `<div class="bank-rle-editor"><p>Tap a square to switch between 0 and 1, or type your binary row below.</p><div class="bank-bit-row" role="group" aria-label="Build your decoded binary row">${Array.from({length: record.question.meta.data.length}, (_, i) => {
    const bit = bits[i] === '1' ? '1' : '0';
    return `<button type="button" class="bank-bit" data-bank-bit="${i}" data-value="${bit}" aria-label="Bit ${i + 1}, currently ${bit}" aria-pressed="${bit === '1'}">${bit}</button>`;
  }).join('')}</div></div>`;
}
export function questionHTML(record, index, group) {
  const q = record.question, prefix = `bank-${group}-${index}`;
  const methodKey = q.skill === 'encode-text' && q.level === 3 ? 'ascii-word-binary' : q.skill;
  const method = record.working ? `<div class="bank-help"><div class="student-method-body">${globalThis.BytesizeMethods.get(methodKey)}</div></div>` : '';
  return `<div class="q-top"><span class="badge">QUESTION ${String(index + 1).padStart(2, '0')}</span><small>${q.fields.length ? 'Exact answer' : 'Written explanation'}</small></div><h3>${esc(q.title)}</h3><div class="bank-prompt">${q.prompt}</div>${q.figure ? `<div class="bank-figure">${q.figure}</div>` : ''}${rleEditor(record)}${q.fields.length ? q.fields.map((field, i) => fieldHTML(record, field, i, prefix)).join('') : `<div class="bank-field"><label for="${prefix}-written">Your explanation</label><textarea id="${prefix}-written" data-bank-written rows="5">${esc(record.written)}</textarea><span class="bank-print-workspace" aria-hidden="true"></span></div>`}<div class="q-actions">${q.fields.length ? actionButton('check', 'Check answer', true) : ''}${actionButton('working', record.working ? 'Hide worked method' : 'Worked method')}${actionButton('new', 'New question')}</div><p class="feedback ${record.tone}" role="status">${esc(record.feedback)}</p>${method}`;
}
export function practiceHTML(group, settings, records) {
  const config = GROUPS[group];
  return `<div class="set-head bank-heading"><div><h2>${config.title}</h2><p>Choose a question type or practise a mix.</p></div><div class="actions"><button class="button outline" type="button" data-bank-action="print">Print worksheet</button></div></div><div class="bank-settings"><label>Question type<select data-bank-type><option value="all" ${settings.type === 'all' ? 'selected' : ''}>Mixed question types</option>${config.skills.map(skill => `<option value="${skill.id}" ${settings.type === skill.id ? 'selected' : ''}>${esc(skill.title)}</option>`).join('')}</select></label><label>How many questions?<select data-bank-count>${COUNTS.map(count => `<option ${settings.count === count ? 'selected' : ''}>${count}</option>`).join('')}</select></label><button class="button primary" type="button" data-bank-action="generate">Generate new questions</button></div><p class="bank-print-name">Name: ____________________ Class: __________ Date: __________</p><div class="questions bank-questions">${records.map((record, i) => `<article class="question bank-question" data-bank-index="${i}">${questionHTML(record, i, group)}</article>`).join('')}</div><div class="bank-controls">${records.some(record => record.question.fields.length) ? '<button class="button primary" type="button" data-bank-action="check-all">Check exact answers</button>' : ''}<button class="button outline" type="button" data-bank-action="clear">Clear answers</button><p class="bank-summary" role="status" aria-live="polite"></p></div>`;
}
function freshSeed(previous) {
  let seed = crypto.getRandomValues(new Uint32Array(1))[0];
  if (seed === previous) seed = (seed + 1) >>> 0;
  return seed;
}
export function mountPractice(root) {
  const group = root.dataset.bankGroup, config = GROUPS[group], params = new URLSearchParams(location.search);
  const savedSeed = params.get(config.prefix + 'code');
  let settings = normaliseSettings(group, {type: params.get(config.prefix + 'type'), count: params.get(config.prefix + 'count'), seed: savedSeed && /^\d{1,10}$/.test(savedSeed) ? Number(savedSeed) : freshSeed()});
  let records = [];
  function summary() {
    const exact = records.filter(r => r.question.fields.length), written = records.filter(r => !r.question.fields.length);
    root.querySelector('.bank-summary').textContent = `${exact.length ? `Exact answers: ${exact.filter(r => r.complete).length} / ${exact.length} correct (${exact.filter(r => r.checked).length} checked). ` : ''}${written.length ? `${written.length} written explanation${written.length === 1 ? '' : 's'}: use the worked methods to plan and review.` : ''}`;
  }
  function saveSettings() {
    const url = new URL(location.href);
    for (const [key, value] of Object.entries({code: settings.seed, type: settings.type, count: settings.count})) url.searchParams.set(config.prefix + key, String(value));
    history.replaceState(null, '', url);
  }
  function generate(newSeed = false, save = false) {
    settings = normaliseSettings(group, {...settings, seed: newSeed ? freshSeed(settings.seed) : settings.seed});
    records = createPracticeSet(group, settings).map(createResponse);
    root.innerHTML = practiceHTML(group, settings, records);
    summary();
    if (save) saveSettings();
  }
  function redraw(index, focusAction = '') {
    const card = root.querySelector(`[data-bank-index="${index}"]`);
    card.innerHTML = questionHTML(records[index], index, group);
    if (focusAction) card.querySelector(`[data-bank-action="${focusAction}"]`)?.focus();
    summary();
  }
  function refreshFeedback(card, record) {
    const feedback = card.querySelector('.feedback');
    feedback.className = 'feedback'; feedback.textContent = '';
    card.querySelectorAll('[data-bank-answer]').forEach(input => input.removeAttribute('aria-invalid'));
    summary();
  }
  function syncBits(card, record) {
    const bits = record.answers[0]?.replace(/\s/g, '') || '';
    card.querySelectorAll('[data-bank-bit]').forEach((button, i) => {
      const bit = bits[i] === '1' ? '1' : '0';
      button.dataset.value = bit; button.textContent = bit;
      button.setAttribute('aria-label', `Bit ${i + 1}, currently ${bit}`);
      button.setAttribute('aria-pressed', String(bit === '1'));
    });
  }
  root.addEventListener('input', event => {
    const card = event.target.closest('[data-bank-index]');
    if (!card) return;
    const record = records[Number(card.dataset.bankIndex)];
    if (event.target.matches('[data-bank-answer]')) {
      record.answers[Number(event.target.dataset.bankAnswer)] = event.target.value;
      resetFeedback(record); refreshFeedback(card, record); syncBits(card, record);
    } else if (event.target.matches('[data-bank-written]')) {
      record.written = event.target.value;
      resetFeedback(record); refreshFeedback(card, record);
    }
  });
  root.addEventListener('change', event => {
    if (event.target.matches('[data-bank-type], [data-bank-count]')) {
      settings.type = root.querySelector('[data-bank-type]').value;
      settings.count = Number(root.querySelector('[data-bank-count]').value);
      generate(true, true);
    }
  });
  root.addEventListener('keydown', event => {
    if (event.key !== 'Enter' || !event.target.matches('[data-bank-answer]')) return;
    event.preventDefault();
    const index = Number(event.target.closest('[data-bank-index]').dataset.bankIndex);
    checkResponse(records[index]); redraw(index, 'check');
  });
  root.addEventListener('click', event => {
    const bitButton = event.target.closest('[data-bank-bit]');
    if (bitButton) {
      const card = bitButton.closest('[data-bank-index]'), record = records[Number(card.dataset.bankIndex)];
      const bits = Array.from({length: record.question.meta.data.length}, (_, i) => record.answers[0].replace(/\s/g, '')[i] === '1' ? '1' : '0');
      const index = Number(bitButton.dataset.bankBit); bits[index] = bits[index] === '1' ? '0' : '1';
      record.answers[0] = bits.join(''); card.querySelector('[data-bank-answer]').value = record.answers[0];
      resetFeedback(record); refreshFeedback(card, record); syncBits(card, record); return;
    }
    const button = event.target.closest('[data-bank-action]');
    if (!button) return;
    const action = button.dataset.bankAction;
    if (action === 'print') { window.print(); return; }
    if (action === 'generate') { generate(true, true); return; }
    if (action === 'clear') {
      records = records.map(record => createResponse(record.question));
      root.innerHTML = practiceHTML(group, settings, records); summary(); root.querySelector('[data-bank-action="clear"]').focus(); return;
    }
    if (action === 'check-all') {
      records.forEach((record, index) => { if (record.question.fields.length) { checkResponse(record); redraw(index); } });
      summary(); return;
    }
    const card = button.closest('[data-bank-index]');
    if (!card) return;
    const index = Number(card.dataset.bankIndex), record = records[index];
    if (action === 'check') checkResponse(record);
    if (action === 'working') record.working = !record.working;
    if (action === 'new') {
      let next;
      for (let attempt = 0; attempt < 12; attempt++) {
        next = makeQuestion(record.question.skill, record.question.level % 3 + 1, freshSeed());
        if (next.prompt !== record.question.prompt) break;
      }
      records[index] = createResponse(next);
    }
    redraw(index, action);
  });
  generate();
  return {get records() { return records; }, get settings() { return settings; }};
}
if (typeof document !== 'undefined') {
  document.querySelectorAll('[data-bank-group]').forEach(mountPractice);
}
