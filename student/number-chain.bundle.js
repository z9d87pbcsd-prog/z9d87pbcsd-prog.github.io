"use strict";
(() => {
  // ../bytesize-hub/dist/student/number-chain-model.js
  var toBinary = (value) => value.toString(2).padStart(8, "0");
  var CHAIN_FINISHES = Object.freeze([
    { id: "hex", label: "Hexadecimal" },
    { id: "ascii", label: "ASCII character" },
    { id: "bitmap", label: "Bitmap image (2 × 4)" },
    { id: "mixed", label: "Random: hex, ASCII or bitmap" }
  ]);
  function normaliseChainSettings(options = {}) {
    return { finish: CHAIN_FINISHES.some((item) => item.id === options?.finish) ? options.finish : "hex" };
  }
  function seededRandom(seed) {
    let value = Number(seed) >>> 0;
    return () => {
      value += 1831565813;
      let t = value;
      t = Math.imul(t ^ t >>> 15, t | 1);
      t ^= t + Math.imul(t ^ t >>> 7, t | 61);
      return ((t ^ t >>> 14) >>> 0) / 4294967296;
    };
  }
  function seedFromBrowser() {
    return crypto.getRandomValues(new Uint32Array(1))[0];
  }
  var asciiCodes = [...Array.from({ length: 10 }, (_, i) => 48 + i), ...Array.from({ length: 26 }, (_, i) => 65 + i), ...Array.from({ length: 26 }, (_, i) => 97 + i)];
  var bitmapValues = Array.from({ length: 254 }, (_, i) => i + 1).filter((value) => {
    const ones = value.toString(2).replace(/0/g, "").length;
    return ones >= 2 && ones <= 6;
  });
  function predecessors(value, used) {
    const groups = [];
    const add = (operation, items) => {
      const choices = items.filter((item) => item.previous > 0 && item.previous <= 255 && !used.has(item.previous));
      if (choices.length) groups.push({ operation, choices });
    };
    add("add", Array.from({ length: Math.min(63, value - 1) }, (_, i) => ({ operand: i + 1, previous: value - i - 1 })));
    add("shift-left", [1, 2, 3].filter((n) => value % 2 ** n === 0).map((n) => ({ operand: n, previous: value / 2 ** n })));
    add("shift-right", [1, 2, 3].map((n) => ({ operand: n, previous: value * 2 ** n })));
    add("multiply", [2, 4, 8].filter((n) => value % n === 0).map((n) => ({ operand: n, previous: value / n })));
    add("divide", [2, 4, 8].map((n) => ({ operand: n, previous: value * n })));
    return groups;
  }
  function planMath(random, finish) {
    const pick = (items) => items[Math.floor(random() * items.length)];
    for (let attempt = 0; attempt < 64; attempt++) {
      const target = finish === "ascii" ? pick(asciiCodes) : finish === "bitmap" ? pick(bitmapValues) : 16 + Math.floor(random() * 224);
      let value = target;
      const used = /* @__PURE__ */ new Set([target]), backwards = [];
      for (let i = 0; i < 3; i++) {
        const groups = predecessors(value, used);
        if (!groups.length) break;
        const group = pick(groups), choice = pick(group.choices);
        backwards.push({ operation: group.operation, operand: choice.operand, previous: choice.previous, value });
        value = choice.previous;
        used.add(value);
      }
      const actions = backwards.reverse();
      if (actions.length === 3 && value >= 16 && actions.some((step) => step.operation === "add") && actions.some((step) => step.operation.startsWith("shift-"))) return { start: value, target, actions };
    }
    return { start: 64, target: 72, actions: [{ operation: "shift-left", operand: 1, previous: 64, value: 128 }, { operation: "add", operand: 16, previous: 128, value: 144 }, { operation: "shift-right", operand: 1, previous: 144, value: 72 }] };
  }
  function mathStep(action, index) {
    const previous = index + 1, { operation, operand, value } = action;
    const title = operation === "add" ? `Add ${toBinary(operand)}` : operation === "shift-left" || operation === "shift-right" ? `Logical shift ${operation === "shift-left" ? "left" : "right"} by ${operand}` : `${operation === "multiply" ? "Multiply" : "Divide"} by ${operand}`;
    const instruction = operation === "add" ? `Add this binary number to your result from step ${previous}. Write your answer in eight-bit binary.` : operation.startsWith("shift-") ? `Shift your result from step ${previous} ${operation === "shift-left" ? "left" : "right"} by ${operand} place${operand === 1 ? "" : "s"}. Fill the empty positions with zeros and keep eight bits.` : `${operation === "multiply" ? "Multiply" : "Divide"} your result from step ${previous} by ${operand}. Write the result in eight-bit binary.`;
    return { ...action, title, instruction, format: "binary", answer: toBinary(value) };
  }
  function createNumberChain(seed, options = {}) {
    const settings = normaliseChainSettings(options), random = seededRandom(seed);
    const finish = settings.finish === "mixed" ? ["hex", "ascii", "bitmap"][Math.floor(random() * 3)] : settings.finish;
    const plan = planMath(random, finish), value = plan.target;
    const final = finish === "ascii" ? { operation: "ascii", title: "Convert to an ASCII character", instruction: "Convert your result from step 4 to the matching ASCII character. Use the reference and keep the correct letter case.", format: "ascii", answer: String.fromCharCode(value) } : finish === "bitmap" ? { operation: "bitmap", title: "Draw a bitmap image", instruction: "Use the eight bits from step 4. Fill a 2 × 4 bitmap, left to right across the top row, then the bottom row. 1 = black; 0 = white.", format: "bitmap", answer: toBinary(value), rows: 2, columns: 4 } : { operation: "hex", title: "Convert to hexadecimal", instruction: "Convert your binary result from step 4 into two hexadecimal digits.", format: "hex", answer: value.toString(16).toUpperCase().padStart(2, "0") };
    const steps = [{ operation: "binary", title: "Convert to binary", instruction: "Convert the starting decimal number into eight-bit binary.", format: "binary", value: plan.start, answer: toBinary(plan.start) }, ...plan.actions.map(mathStep), { ...final, value }];
    return { seed: Number(seed) >>> 0, settings, finish, start: plan.start, steps, key: JSON.stringify([finish, plan.start, plan.actions.map((step) => [step.operation, step.operand]), value]) };
  }
  function createChainState(seed, round = 1, options = {}) {
    const chain = createNumberChain(seed, options);
    return { chain, settings: chain.settings, round, answers: chain.steps.map(() => ""), results: chain.steps.map(() => null) };
  }
  function editChainAnswer(state, index, value) {
    if (!Number.isInteger(index) || index < 0 || index >= state.answers.length) return;
    state.answers[index] = String(value).slice(0, 24);
    for (let i = index; i < state.results.length; i++) state.results[i] = null;
  }
  function toggleChainPixel(state, index, pixel) {
    if (state.chain.steps[index]?.format !== "bitmap" || !Number.isInteger(pixel) || pixel < 0 || pixel >= 8) return;
    const previous = state.answers[index].replace(/\s/g, ""), bits = (/^[01]{8}$/.test(previous) ? previous : "00000000").split("");
    bits[pixel] = bits[pixel] === "1" ? "0" : "1";
    editChainAnswer(state, index, bits.join(""));
  }
  function clearChainAnswers(state) {
    state.answers.fill("");
    state.results.fill(null);
    return state;
  }
  function checkChainAnswer(state, index) {
    const step = state.chain.steps[index];
    if (!step) return null;
    const raw = state.answers[index].trim(), bits = step.format === "binary" || step.format === "bitmap";
    const normalised = bits ? raw.replace(/\s/g, "") : step.format === "hex" ? raw.toUpperCase() : raw;
    const valid = bits ? /^[01]{8}$/.test(normalised) : step.format === "ascii" ? /^[A-Za-z0-9]$/.test(normalised) : /^[0-9A-F]{2}$/.test(normalised);
    const correct = valid && normalised === step.answer;
    let message;
    if (!raw) message = step.format === "bitmap" ? "Shade the bitmap squares, then check your answer." : "Type your answer in the box above.";
    else if (!valid) message = step.format === "ascii" ? "Enter one ASCII letter or digit, with the correct case." : step.format === "bitmap" ? "Build the image using its eight pixel squares." : step.format === "binary" ? "Use exactly eight bits: only 0 and 1. Keep any leading zeros." : "Use exactly two hexadecimal digits: 0–9 or A–F.";
    else if (correct) message = index === state.chain.steps.length - 1 ? "Correct! You reached the end of the chain." : "Correct! Carry this result to the next step.";
    else message = step.format === "ascii" ? "Not quite. Check the ASCII reference and letter case." : step.format === "bitmap" ? "Not quite. Check the bit order and the black/white key." : index === 0 ? "Not quite. Check the place values and try again." : "Not quite. Check this operation and your previous step, then try again.";
    return state.results[index] = { correct, empty: !raw, message };
  }
  function checkWholeChain(state) {
    state.chain.steps.forEach((_, index) => checkChainAnswer(state, index));
    return chainProgress(state);
  }
  function chainProgress(state) {
    const correct = state.results.filter((result) => result?.correct).length, checked = state.results.filter(Boolean).length;
    return { correct, checked, complete: correct === state.chain.steps.length };
  }
  function nextChain(state, randomSeed = seedFromBrowser) {
    let seed = Number(randomSeed()) >>> 0;
    for (let attempt = 0; attempt < 100; attempt++) {
      const next = createChainState(seed, state.round + 1, state.settings);
      if (next.chain.key !== state.chain.key) return next;
      seed = seed + 1 >>> 0;
    }
    throw new Error("Could not create a fresh number chain.");
  }

  // ../bytesize-hub/dist/student/number-chain.js
  var escapeHTML = (value) => String(value).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
  function seedFromBrowser2() {
    return crypto.getRandomValues(new Uint32Array(1))[0];
  }
  var formatName = (step) => ({ binary: "8-BIT BINARY", hex: "HEXADECIMAL", ascii: "ASCII CHARACTER", bitmap: "BITMAP · 2 × 4" })[step.format];
  var answerName = (step) => ({ binary: "8 bits", hex: "2 hex digits", ascii: "1 ASCII character (case matters)", bitmap: "shade the 2 × 4 grid" })[step.format];
  var asciiReference = () => '<aside class="chain-ascii-reference" aria-label="ASCII reference"><strong>ASCII reference</strong><table><thead><tr><th>Characters</th><th>Decimal codes</th></tr></thead><tbody><tr><td>0–9</td><td>48–57</td></tr><tr><td>A–Z</td><td>65–90</td></tr><tr><td>a–z</td><td>97–122</td></tr></tbody></table><p>Codes run in order within each group. A = 65; a = 97; the character 0 = 48.</p></aside>';
  function methodHTML(step) {
    const shift = step.operation === "shift-left" || step.operation === "multiply", places = step.operation.startsWith("shift-") ? step.operand : Math.log2(step.operand);
    const methods = {
      binary: ["Write the eight place values: 128, 64, 32, 16, 8, 4, 2, 1.", "Work from the largest value down. Write 1 when that value fits into the remaining total, subtract it, and write 0 when it does not.", "Check that the values under your 1s add back to the starting number. Keep all eight positions."],
      add: ["Copy the previous result and line up the new binary number underneath it.", "Add from the right, including any carry. For 1 + 1, write 0 and carry 1; for 1 + 1 + 1, write 1 and carry 1.", "Continue across all eight columns and check the carry in each column."],
      "shift-left": [`Move every bit ${places} place${places === 1 ? "" : "s"} to the left.`, "Fill the spaces on the right with zeros. Keep eight bit positions.", "Check your result using multiplication by the matching power of two. No 1 bits are lost in this game."],
      "shift-right": [`Move every bit ${places} place${places === 1 ? "" : "s"} to the right.`, "Fill the spaces on the left with zeros. Keep eight bit positions.", "Check your result using division by the matching power of two. Only zero bits move off the right edge in this game."],
      multiply: [`Multiplying by ${step.operand} is a logical left shift of ${places} place${places === 1 ? "" : "s"}.`, "Move every bit to the left by that many positions.", "Fill the spaces on the right with zeros. No 1 bits are lost in this game."],
      divide: [`Dividing by ${step.operand} is a logical right shift of ${places} place${places === 1 ? "" : "s"}.`, "Move every bit to the right, filling spaces on the left with zeros.", "Only zero bits move off the right edge. The division gives a whole number."],
      hex: ["Split your eight-bit result into two groups of four.", "For each group, add the 8, 4, 2 and 1 place values underneath its 1s.", "Write one hexadecimal digit per group. Use A–F for values 10–15. Keep a leading 0 when needed."],
      ascii: ["Convert your previous binary result into a decimal character code using the bit weights.", "Find which range in the supplied ASCII reference contains that code. Subtract the group’s first code to find the offset.", "Count forward that many characters from the group’s first character. Write just that character, preserving its case."],
      bitmap: ["Keep all eight bits of the previous result, including leading zeros.", "Use bits 1–4 across the top row from left to right. Use bits 5–8 across the bottom row.", "Shade a square black for a 1; leave it white for a 0. Check one pixel at a time against the corresponding bit."]
    };
    const examples = { binary: "Separate example outside eight bits: decimal 257 is 100000001 (256 + 1). This game asks for eight-bit results.", add: "Separate four-bit example: 0011 + 0001 = 0100.", hex: "Separate 12-bit example: 0010 1010 1111 becomes 2AF.", ascii: "Separate punctuation example: binary 00100001 is decimal 33, which represents !. This game uses letters and digits.", bitmap: "Separate three-pixel example: 101 means black, white, black. This game has eight pixels." };
    const example = examples[step.operation] || (shift ? "Separate four-bit example: 0011 shifted left by 1 becomes 0110." : "Separate four-bit example: 1100 shifted right by 2 becomes 0011.");
    return `<details class="chain-method"><summary>Worked method</summary><ol>${methods[step.operation].map((text) => `<li>${escapeHTML(text)}</li>`).join("")}</ol><p>${escapeHTML(example)}</p></details>`;
  }
  function pixelLabel(pixel, on) {
    return `Row ${Math.floor(pixel / 4) + 1}, column ${pixel % 4 + 1}: ${on ? "black (1)" : "white (0)"}`;
  }
  function answerHTML(state, step, index) {
    const label = `Your answer for step ${index + 1} · ${answerName(step)}`;
    if (step.format === "bitmap") {
      const bits = state.answers[index].replace(/\s/g, "");
      return `<div class="chain-answer-field"><span class="chain-pixel-label" id="chain-bitmap-label-${index}">${label}</span><p class="chain-pixel-instruction">Tap a square to shade it. Tap again to leave it white.</p><div class="chain-pixel-grid" data-chain-bitmap="${index}" role="group" aria-labelledby="chain-bitmap-label-${index}" aria-describedby="chain-feedback-${index}">${Array.from({ length: 8 }, (_, pixel) => {
        const on = bits[pixel] === "1";
        return `<button type="button" class="chain-pixel${on ? " is-dark" : ""}" data-chain-pixel="${pixel}" data-chain-pixel-step="${index}" aria-label="${pixelLabel(pixel, on)}" aria-pressed="${on}"></button>`;
      }).join("")}</div><small>1 = black · 0 = white · Top row first, left to right.</small></div>`;
    }
    const binary = step.format === "binary", ascii = step.format === "ascii", placeholder = binary ? "Type 8 bits here" : ascii ? "Type one character here" : "Type 2 hex digits here";
    return `<div class="chain-answer-field"><label for="chain-answer-${index}">${label}</label><input type="text" id="chain-answer-${index}" class="chain-answer${step.format === "hex" ? " chain-hex" : ""}" data-chain-answer="${index}" value="${escapeHTML(state.answers[index])}" placeholder="${placeholder}" inputmode="${binary ? "numeric" : "text"}" maxlength="${binary ? 24 : ascii ? 1 : 8}" autocomplete="off" autocapitalize="${step.format === "hex" ? "characters" : "off"}" spellcheck="false" aria-describedby="chain-format-${index} chain-feedback-${index}"><small id="chain-format-${index}">${binary ? "Use 0 and 1, including leading zeros." : ascii ? "Use the ASCII reference. Upper-case and lower-case letters have different codes." : "Use 0–9 and A–F, including a leading zero if needed."}</small></div>`;
  }
  function numberChainPrintHTML(state) {
    const ending = state.chain.finish === "bitmap" ? "Shade 1 as black and leave 0 white." : state.chain.finish === "ascii" ? "Finish with one ASCII character, keeping its case." : "Finish with two hexadecimal digits.";
    return `<article class="chain-print-sheet"><header class="chain-print-heading"><h1>Bytesize · Number Chain</h1><p>Carry each result forward. Follow the answer format at each step.</p><div class="chain-print-name">Name: __________________________ &nbsp; Class: __________ &nbsp; Date: __________</div></header><div class="chain-print-start">Starting number: <strong>${state.chain.start}</strong> <span>(decimal)</span></div><ol class="chain-print-steps">${state.chain.steps.map((step, index) => {
      const bitmap = step.format === "bitmap", count = bitmap || step.format === "binary" ? 8 : step.format === "ascii" ? 1 : 2;
      const reference = step.format === "ascii" ? '<p class="chain-print-reference">ASCII: 0–9 = 48–57; A–Z = 65–90; a–z = 97–122. Codes run in order within each group.</p>' : "";
      return `<li><div class="chain-print-task"><h2>${index + 1}. ${escapeHTML(step.title)}</h2><p>${escapeHTML(step.instruction)}</p>${reference}</div><div class="chain-print-answer"><span>Your answer · ${answerName(step)}</span><div class="${bitmap ? "chain-print-pixels" : "chain-print-boxes"} ${step.format === "hex" ? "chain-print-hex" : step.format === "ascii" ? "chain-print-ascii" : ""}" aria-label="Blank answer ${bitmap ? "pixels" : "boxes"} for step ${index + 1}">${Array.from({ length: count }, () => "<span></span>").join("")}</div></div></li>`;
    }).join("")}</ol><footer>Arithmetic stays within eight bits; every division and right shift is exact.<br>${ending}</footer></article>`;
  }
  function numberChainHTML(state) {
    const total = state.chain.steps.length;
    return `<div class="chain-controls"><div><span class="chain-kicker">CHAIN ${String(state.round).padStart(2, "0")}</span><p>Carry each result forward. Follow the answer format at each step.</p></div><div class="actions"><button type="button" class="button primary" data-chain-action="new">New chain</button><button type="button" class="button outline" data-chain-action="print">Print worksheet</button><button type="button" class="button outline" data-chain-action="clear">Clear answers</button></div></div>
 <div class="chain-settings"><label for="chain-finish-choice">Finish with<select id="chain-finish-choice" data-chain-finish>${CHAIN_FINISHES.map((option) => `<option value="${option.id}"${state.settings.finish === option.id ? " selected" : ""}>${option.label}</option>`).join("")}</select></label><p>Actions vary after the opening conversion. Choose an optional ASCII or bitmap ending, or mix all three endings.</p></div>
 <div class="chain-progress"><progress max="${total}" value="0" aria-label="Steps correct"></progress><p class="chain-status" role="status" aria-live="polite">0 of ${total} steps correct. Start with the number below.</p></div>
 <form class="chain-form" novalidate><div class="chain-start"><span>START · DECIMAL</span><strong>${state.chain.start}</strong></div><ol class="chain-steps">${state.chain.steps.map((step, index) => `<li class="chain-step" data-chain-step="${index}"><div class="chain-step-heading"><span class="chain-step-number" aria-hidden="true">${index + 1}</span><div><h3 id="chain-prompt-${index}">${escapeHTML(step.title)}</h3><p>${escapeHTML(step.instruction)}</p></div><span class="chain-format">${formatName(step)}</span></div>${step.format === "ascii" ? asciiReference() : ""}<div class="chain-answer-row">${answerHTML(state, step, index)}<button type="button" class="button secondary" data-chain-check="${index}">Check step ${index + 1}</button></div><p class="chain-feedback" id="chain-feedback-${index}" role="status" aria-live="polite"></p>${methodHTML(step)}</li>`).join("")}</ol><div class="chain-finish"><button type="submit" class="button primary">Check whole chain</button><button type="button" class="button outline" data-chain-action="new">Try another chain</button><p class="chain-completion"></p><p>All calculations stay within eight bits. Every division and right shift gives an exact whole-number result.</p></div></form>`;
  }
  function mountNumberChain(root, { seed = seedFromBrowser2(), randomSeed = seedFromBrowser2, settings = {} } = {}) {
    let state = createChainState(seed, 1, settings);
    const doc = root.ownerDocument, view = doc.defaultView;
    function cleanPrint() {
      doc.getElementById("number-chain-print")?.remove();
      doc.body.classList.remove("printing-number-chain");
    }
    function preparePrint() {
      if (doc.getElementById("number-chain-section")?.hidden) {
        cleanPrint();
        return;
      }
      cleanPrint();
      const sheet = doc.createElement("section");
      sheet.id = "number-chain-print";
      sheet.innerHTML = numberChainPrintHTML(state);
      doc.body.append(sheet);
      doc.body.classList.add("printing-number-chain");
    }
    view.addEventListener("beforeprint", preparePrint);
    view.addEventListener("afterprint", cleanPrint);
    function updateFeedback() {
      state.results.forEach((result, index) => {
        const field = root.querySelector(`[data-chain-answer="${index}"]`) || root.querySelector(`[data-chain-bitmap="${index}"]`), card = root.querySelector(`[data-chain-step="${index}"]`), feedback = root.querySelector(`#chain-feedback-${index}`);
        feedback.textContent = result?.message || "";
        feedback.className = `chain-feedback${result ? result.correct ? " good" : " bad" : ""}`;
        card.classList.toggle("chain-correct", result?.correct === true);
        if (result && !result.correct) field.setAttribute("aria-invalid", "true");
        else field.removeAttribute("aria-invalid");
        if (state.chain.steps[index].format === "bitmap") {
          const bits = state.answers[index].replace(/\s/g, "");
          field.querySelectorAll("[data-chain-pixel]").forEach((button) => {
            const pixel = Number(button.dataset.chainPixel), on = bits[pixel] === "1";
            button.classList.toggle("is-dark", on);
            button.setAttribute("aria-pressed", String(on));
            button.setAttribute("aria-label", pixelLabel(pixel, on));
          });
        }
      });
      const progress = chainProgress(state), total = state.chain.steps.length;
      root.querySelector("progress").value = progress.correct;
      root.querySelector(".chain-completion").textContent = progress.complete ? `Chain complete! All ${total} steps are correct.` : progress.checked ? `${progress.correct} of ${total} steps correct. Check the feedback above and keep going.` : "";
      root.querySelector(".chain-status").textContent = progress.complete ? `Chain complete! All ${total} steps are correct. Choose New chain to play again.` : `${progress.correct} of ${total} steps correct. ${progress.checked ? "Keep going — you can check and improve each step." : "Start with the number below."}`;
    }
    function focusAnswer(index) {
      (root.querySelector(`[data-chain-answer="${index}"]`) || root.querySelector(`[data-chain-pixel-step="${index}"]`))?.focus();
    }
    function render(focus = false) {
      root.innerHTML = numberChainHTML(state);
      updateFeedback();
      if (focus) focusAnswer(0);
    }
    root.addEventListener("input", (event) => {
      const field = event.target.closest("[data-chain-answer]");
      if (!field) return;
      editChainAnswer(state, Number(field.dataset.chainAnswer), field.value);
      updateFeedback();
    });
    root.addEventListener("change", (event) => {
      const field = event.target.closest("[data-chain-finish]");
      if (!field) return;
      state.settings = normaliseChainSettings({ finish: field.value });
      state = nextChain(state, randomSeed);
      cleanPrint();
      render();
      root.querySelector("[data-chain-finish]").focus();
    });
    root.addEventListener("click", (event) => {
      const pixel = event.target.closest("[data-chain-pixel]");
      if (pixel) {
        toggleChainPixel(state, Number(pixel.dataset.chainPixelStep), Number(pixel.dataset.chainPixel));
        updateFeedback();
        return;
      }
      const check = event.target.closest("[data-chain-check]");
      if (check) {
        checkChainAnswer(state, Number(check.dataset.chainCheck));
        updateFeedback();
        return;
      }
      const action = event.target.closest("[data-chain-action]")?.dataset.chainAction;
      if (action === "print") {
        preparePrint();
        try {
          view.print();
        } catch (error) {
          cleanPrint();
          throw error;
        }
      }
      if (action === "new") {
        state = nextChain(state, randomSeed);
        cleanPrint();
        render(true);
      }
      if (action === "clear") {
        clearChainAnswers(state);
        cleanPrint();
        render(true);
      }
    });
    root.addEventListener("submit", (event) => {
      event.preventDefault();
      checkWholeChain(state);
      updateFeedback();
    });
    root.addEventListener("keydown", (event) => {
      const field = event.target.closest("[data-chain-answer]");
      if (!field || event.key !== "Enter") return;
      event.preventDefault();
      const index = Number(field.dataset.chainAnswer), result = checkChainAnswer(state, index);
      updateFeedback();
      if (result.correct && index < state.chain.steps.length - 1) focusAnswer(index + 1);
    });
    render();
    return { getState: () => state };
  }
  if (typeof document !== "undefined") {
    const root = document.getElementById("number-chain-game");
    if (root) mountNumberChain(root);
  }
})();
