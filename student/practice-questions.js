import './worked-methods.js';
import {SKILLS, makeQuestion, checkField, rng, esc, bitmapFigure} from '../teacher/bank.js';

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
export const FULL_PRACTICE_TOPICS = [
  {id:'images', label:'Images', skills: SKILLS.filter(s => s.topic === 'images')},
  {id:'sound', label:'Sound', skills: SKILLS.filter(s => s.topic === 'sound')},
  {id:'compression', label:'Compression', skills: SKILLS.filter(s => s.topic === 'compression')},
  {id:'ascii', label:'ASCII', skills: SKILLS.filter(s => s.topic === 'characters' && s.id !== 'unicode')}
];
export function createFullPracticeGenerator(seed, {legacyHuffman=false} = {}) {
  const random = rng(seed), decks = new Map();
  return id => {
    const topic = FULL_PRACTICE_TOPICS.find(t => t.id === id);
    if (!topic) return null;
    if (!decks.get(id)?.length) decks.set(id, shuffle(topic.skills, random));
    return makeQuestion(decks.get(id).pop().id, 1 + Math.floor(random() * 3), Math.floor(random() * 4294967296), {legacyHuffman});
  };
}
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
  return {question, answers: question.fields.map(field => field.kind === 'bitmap' ? '0'.repeat(question.meta.w * question.meta.h) : ''), written: '', results: [], checked: false, complete: false, feedback: '', tone: '', working: false};
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
function methodForBankQuestion(q) {
  const variants = {
    'pixels': q.level === 3 ? 'bitmap-representation' : 'bitmap-pixels',
    'colour-depth': q.level === 3 ? 'bitmap-depth' : 'unit-values',
    'image-size': q.level === 1 ? 'bitmap-total' : 'bitmap-bytes',
    'image-change': 'bitmap-change', 'bitmap-decode': 'bitmap-draw',
    'compression-purpose': 'compression-benefits', 'huffman-explain': 'huffman-principle',
    'huffman-size': 'huffman-savings', 'sampling': 'sound-sampling',
    'sound-missing': {'Sampling rate (Hz)':'sound-rate-find', 'Resolution (bits per sample)':'sound-resolution-find', 'Duration (seconds)':'sound-duration'}[q.fields[0]?.label]
  };
  return q.skill === 'encode-text' && q.level === 3 ? 'ascii-word-binary' : variants[q.skill] || q.skill;
}
export function questionHTML(record, index, group, {topicLabel='', allowNew=true} = {}) {
  const q = record.question, prefix = `bank-${group}-${index}`;
  const method = record.working ? `<div class="bank-help"><div class="student-method-body">${globalThis.BytesizeMethods.get(methodForBankQuestion(q))}</div></div>` : '';
  const figure = q.skill === 'bitmap-encode'
    ? `<div class="bank-figure" role="img" aria-label="${bitmapDescription(q.meta)}">${q.figure}</div>`
    : q.figure ? `<div class="bank-figure">${q.figure}</div>` : '';
  const response = q.fields[0]?.kind === 'bitmap'
    ? bitmapFigure(record.answers[0], q.meta.w, true, prefix)
    : q.fields.length ? q.fields.map((field, i) => fieldHTML(record, field, i, prefix)).join('')
    : `<div class="bank-field"><label for="${prefix}-written">Your explanation</label><textarea id="${prefix}-written" data-bank-written rows="5">${esc(record.written)}</textarea><span class="bank-print-workspace" aria-hidden="true"></span></div>`;
  return `<div class="q-top"><span class="badge">QUESTION ${String(index + 1).padStart(2, '0')}</span><small>${topicLabel ? esc(topicLabel) + ' · ' : ''}${q.fields.length ? 'Exact answer' : 'Written explanation'}</small></div><h3>${esc(q.title)}</h3><div class="bank-prompt">${q.prompt}</div>${figure}${rleEditor(record)}${response}<div class="q-actions">${q.fields.length ? actionButton('check', 'Check answer', true) : ''}${actionButton('working', record.working ? 'Hide worked method' : 'Worked method')}${allowNew ? actionButton('new', 'New question') : ''}</div><p class="feedback ${record.tone}" role="status">${esc(record.feedback)}</p>${method}`;
}
function bitmapDescription({w,h,data}) {
  const rows = Array.from({length:h}, (_, i) => `Row ${i+1}: ${[...data.slice(i*w,(i+1)*w)].map(bit => bit==='0' ? 'white' : 'dark').join(', ')}.`);
  return `Bitmap: ${rows.join(' ')} Key: 0 is white, 1 is dark.`;
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
function bindBankCards(root, {getRecord, redraw, onChange=()=>{}, onAction=()=>{}, onNew}) {
  const indexOf = card => Number(card.dataset.bankIndex);
  function edit(card, record) {
    resetFeedback(record);
    const feedback = card.querySelector('.feedback');
    feedback.className = 'feedback'; feedback.textContent = '';
    card.querySelectorAll('[data-bank-answer]').forEach(input => input.removeAttribute('aria-invalid'));
    const bits = record.answers[0]?.replace(/\s/g, '') || '';
    card.querySelectorAll('[data-bank-bit]').forEach((button, i) => {
      const bit = bits[i] === '1' ? '1' : '0';
      button.dataset.value = bit; button.textContent = bit;
      button.setAttribute('aria-label', `Bit ${i + 1}, currently ${bit}`);
      button.setAttribute('aria-pressed', String(bit === '1'));
    });
    onChange();
  }
  root.addEventListener('input', event => {
    const card = event.target.closest('[data-bank-index]');
    if (!card) return;
    const record = getRecord(indexOf(card));
    if (event.target.matches('[data-bank-answer]')) {
      record.answers[Number(event.target.dataset.bankAnswer)] = event.target.value;
      edit(card, record);
    } else if (event.target.matches('[data-bank-written]')) {
      record.written = event.target.value;
      edit(card, record);
    }
  });
  root.addEventListener('keydown', event => {
    if (event.key !== 'Enter' || !event.target.matches('[data-bank-answer]')) return;
    event.preventDefault();
    const index = indexOf(event.target.closest('[data-bank-index]'));
    checkResponse(getRecord(index)); redraw(index, 'check');
  });
  root.addEventListener('click', event => {
    const pixel = event.target.closest('[data-pixel]'), bitButton = event.target.closest('[data-bank-bit]');
    if (pixel || bitButton) {
      const card = (pixel || bitButton).closest('[data-bank-index]'), record = getRecord(indexOf(card));
      const bits = Array.from({length: record.question.meta.data.length}, (_, i) => record.answers[0].replace(/\s/g, '')[i] === '1' ? '1' : '0');
      const index = Number(pixel ? pixel.dataset.pixel : bitButton.dataset.bankBit);
      bits[index] = bits[index] === '1' ? '0' : '1';
      record.answers[0] = bits.join('');
      if (pixel) {
        pixel.classList.toggle('on', bits[index] === '1');
        pixel.setAttribute('aria-pressed', String(bits[index] === '1'));
      } else card.querySelector('[data-bank-answer]').value = record.answers[0];
      edit(card, record); return;
    }
    const button = event.target.closest('[data-bank-action]');
    if (!button) return;
    const action = button.dataset.bankAction, card = button.closest('[data-bank-index]');
    if (!card) { onAction(action); return; }
    const index = indexOf(card), record = getRecord(index);
    if (action === 'check') checkResponse(record);
    else if (action === 'working') record.working = !record.working;
    else if (action === 'new' && onNew) onNew(index, record);
    else return;
    redraw(index, action);
  });
}
export function mountFullPracticeCard(card, question, index, topicLabel) {
  const record = createResponse(question);
  card.className = 'question bank-question full-practice-bank';
  card.dataset.bankIndex = String(index);
  function redraw(_, action='') {
    card.innerHTML = questionHTML(record, index, 'full-practice', {topicLabel, allowNew:false});
    if (action) card.querySelector(`[data-bank-action="${action}"]`)?.focus();
  }
  bindBankCards(card, {getRecord: () => record, redraw});
  redraw(index);
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
  root.addEventListener('change', event => {
    if (event.target.matches('[data-bank-type], [data-bank-count]')) {
      settings.type = root.querySelector('[data-bank-type]').value;
      settings.count = Number(root.querySelector('[data-bank-count]').value);
      generate(true, true);
    }
  });
  bindBankCards(root, {
    getRecord: index => records[index], redraw, onChange: summary,
    onAction(action) {
      if (action === 'print') window.print();
      if (action === 'generate') generate(true, true);
      if (action === 'clear') {
        records = records.map(record => createResponse(record.question));
        root.innerHTML = practiceHTML(group, settings, records); summary(); root.querySelector('[data-bank-action="clear"]').focus();
      }
      if (action === 'check-all') {
        records.forEach((record, index) => { if (record.question.fields.length) { checkResponse(record); redraw(index); } });
        summary();
      }
    },
    onNew(index, record) {
      let next;
      for (let attempt = 0; attempt < 12; attempt++) {
        next = makeQuestion(record.question.skill, record.question.level % 3 + 1, freshSeed());
        if (next.prompt !== record.question.prompt) break;
      }
      records[index] = createResponse(next);
    }
  });
  generate();
  return {get records() { return records; }, get settings() { return settings; }};
}
if (typeof document !== 'undefined') {
  globalThis.BytesizeFullPracticeBank = {topics: FULL_PRACTICE_TOPICS, generator: createFullPracticeGenerator, mountCard: mountFullPracticeCard};
  document.querySelectorAll('[data-bank-group]').forEach(mountPractice);
}
