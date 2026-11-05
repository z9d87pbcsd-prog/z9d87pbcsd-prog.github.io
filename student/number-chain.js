import {CHAIN_FINISHES,normaliseChainSettings,createChainState,editChainAnswer,toggleChainPixel,clearChainAnswers,checkChainAnswer,checkWholeChain,chainProgress,nextChain} from './number-chain-model.js';
export {CHAIN_FINISHES,normaliseChainSettings,createNumberChain,createChainState,editChainAnswer,toggleChainPixel,clearChainAnswers,checkChainAnswer,checkWholeChain,chainProgress,nextChain} from './number-chain-model.js';
const escapeHTML=value=>String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function seedFromBrowser(){return crypto.getRandomValues(new Uint32Array(1))[0];}
const formatName=step=>({binary:'8-BIT BINARY',hex:'HEXADECIMAL',ascii:'ASCII CHARACTER',bitmap:'BITMAP · 2 × 4'}[step.format]);
const answerName=step=>({binary:'8 bits',hex:'2 hex digits',ascii:'1 ASCII character (case matters)',bitmap:'shade the 2 × 4 grid'}[step.format]);
const asciiReference=()=>'<aside class="chain-ascii-reference" aria-label="ASCII reference"><strong>ASCII reference</strong><table><thead><tr><th>Characters</th><th>Decimal codes</th></tr></thead><tbody><tr><td>0–9</td><td>48–57</td></tr><tr><td>A–Z</td><td>65–90</td></tr><tr><td>a–z</td><td>97–122</td></tr></tbody></table><p>Codes run in order within each group. A = 65; a = 97; the character 0 = 48.</p></aside>';

function methodHTML(step){
 const shift=step.operation==='shift-left'||step.operation==='multiply',places=step.operation.startsWith('shift-')?step.operand:Math.log2(step.operand);
 const methods={
  binary:['Write the eight place values: 128, 64, 32, 16, 8, 4, 2, 1.','Work from the largest value down. Write 1 when that value fits into the remaining total, subtract it, and write 0 when it does not.','Check that the values under your 1s add back to the starting number. Keep all eight positions.'],
  add:['Copy the previous result and line up the new binary number underneath it.','Add from the right, including any carry. For 1 + 1, write 0 and carry 1; for 1 + 1 + 1, write 1 and carry 1.','Continue across all eight columns and check the carry in each column.'],
  'shift-left':[`Move every bit ${places} place${places===1?'':'s'} to the left.`,'Fill the spaces on the right with zeros. Keep eight bit positions.','Check your result using multiplication by the matching power of two. No 1 bits are lost in this game.'],
  'shift-right':[`Move every bit ${places} place${places===1?'':'s'} to the right.`,'Fill the spaces on the left with zeros. Keep eight bit positions.','Check your result using division by the matching power of two. Only zero bits move off the right edge in this game.'],
  multiply:[`Multiplying by ${step.operand} is a logical left shift of ${places} place${places===1?'':'s'}.`,'Move every bit to the left by that many positions.','Fill the spaces on the right with zeros. No 1 bits are lost in this game.'],
  divide:[`Dividing by ${step.operand} is a logical right shift of ${places} place${places===1?'':'s'}.`,'Move every bit to the right, filling spaces on the left with zeros.','Only zero bits move off the right edge. The division gives a whole number.'],
  hex:['Split your eight-bit result into two groups of four.','For each group, add the 8, 4, 2 and 1 place values underneath its 1s.','Write one hexadecimal digit per group. Use A–F for values 10–15. Keep a leading 0 when needed.'],
  ascii:['Convert your previous binary result into a decimal character code using the bit weights.','Find which range in the supplied ASCII reference contains that code. Subtract the group’s first code to find the offset.','Count forward that many characters from the group’s first character. Write just that character, preserving its case.'],
  bitmap:['Keep all eight bits of the previous result, including leading zeros.','Use bits 1–4 across the top row from left to right. Use bits 5–8 across the bottom row.','Shade a square black for a 1; leave it white for a 0. Check one pixel at a time against the corresponding bit.']
 };
 const examples={binary:'Separate example outside eight bits: decimal 257 is 100000001 (256 + 1). This game asks for eight-bit results.',add:'Separate four-bit example: 0011 + 0001 = 0100.',hex:'Separate 12-bit example: 0010 1010 1111 becomes 2AF.',ascii:'Separate punctuation example: binary 00100001 is decimal 33, which represents !. This game uses letters and digits.',bitmap:'Separate three-pixel example: 101 means black, white, black. This game has eight pixels.'};
 const example=examples[step.operation]||(shift?'Separate four-bit example: 0011 shifted left by 1 becomes 0110.':'Separate four-bit example: 1100 shifted right by 2 becomes 0011.');
 return `<details class="chain-method"><summary>Worked method</summary><ol>${methods[step.operation].map(text=>`<li>${escapeHTML(text)}</li>`).join('')}</ol><p>${escapeHTML(example)}</p></details>`;
}

function pixelLabel(pixel,on){return `Row ${Math.floor(pixel/4)+1}, column ${pixel%4+1}: ${on?'black (1)':'white (0)'}`;}
function answerHTML(state,step,index){
 const label=`Your answer for step ${index+1} · ${answerName(step)}`;
 if(step.format==='bitmap'){
  const bits=state.answers[index].replace(/\s/g,'');
  return `<div class="chain-answer-field"><span class="chain-pixel-label" id="chain-bitmap-label-${index}">${label}</span><p class="chain-pixel-instruction">Tap a square to shade it. Tap again to leave it white.</p><div class="chain-pixel-grid" data-chain-bitmap="${index}" role="group" aria-labelledby="chain-bitmap-label-${index}" aria-describedby="chain-feedback-${index}">${Array.from({length:8},(_,pixel)=>{const on=bits[pixel]==='1';return `<button type="button" class="chain-pixel${on?' is-dark':''}" data-chain-pixel="${pixel}" data-chain-pixel-step="${index}" aria-label="${pixelLabel(pixel,on)}" aria-pressed="${on}"></button>`;}).join('')}</div><small>1 = black · 0 = white · Top row first, left to right.</small></div>`;
 }
 const binary=step.format==='binary',ascii=step.format==='ascii',placeholder=binary?'Type 8 bits here':ascii?'Type one character here':'Type 2 hex digits here';
 return `<div class="chain-answer-field"><label for="chain-answer-${index}">${label}</label><input type="text" id="chain-answer-${index}" class="chain-answer${step.format==='hex'?' chain-hex':''}" data-chain-answer="${index}" value="${escapeHTML(state.answers[index])}" placeholder="${placeholder}" inputmode="${binary?'numeric':'text'}" maxlength="${binary?24:ascii?1:8}" autocomplete="off" autocapitalize="${step.format==='hex'?'characters':'off'}" spellcheck="false" aria-describedby="chain-format-${index} chain-feedback-${index}"><small id="chain-format-${index}">${binary?'Use 0 and 1, including leading zeros.':ascii?'Use the ASCII reference. Upper-case and lower-case letters have different codes.':'Use 0–9 and A–F, including a leading zero if needed.'}</small></div>`;
}

export function numberChainPrintHTML(state){
 const ending=state.chain.finish==='bitmap'?'Shade 1 as black and leave 0 white.':state.chain.finish==='ascii'?'Finish with one ASCII character, keeping its case.':'Finish with two hexadecimal digits.';
 return `<article class="chain-print-sheet"><header class="chain-print-heading"><h1>Bytesize · Number Chain</h1><p>Carry each result forward. Follow the answer format at each step.</p><div class="chain-print-name">Name: __________________________ &nbsp; Class: __________ &nbsp; Date: __________</div></header><div class="chain-print-start">Starting number: <strong>${state.chain.start}</strong> <span>(decimal)</span></div><ol class="chain-print-steps">${state.chain.steps.map((step,index)=>{
  const bitmap=step.format==='bitmap',count=bitmap||step.format==='binary'?8:step.format==='ascii'?1:2;
  const reference=step.format==='ascii'?'<p class="chain-print-reference">ASCII: 0–9 = 48–57; A–Z = 65–90; a–z = 97–122. Codes run in order within each group.</p>':'';
  return `<li><div class="chain-print-task"><h2>${index+1}. ${escapeHTML(step.title)}</h2><p>${escapeHTML(step.instruction)}</p>${reference}</div><div class="chain-print-answer"><span>Your answer · ${answerName(step)}</span><div class="${bitmap?'chain-print-pixels':'chain-print-boxes'} ${step.format==='hex'?'chain-print-hex':step.format==='ascii'?'chain-print-ascii':''}" aria-label="Blank answer ${bitmap?'pixels':'boxes'} for step ${index+1}">${Array.from({length:count},()=>'<span></span>').join('')}</div></div></li>`;
 }).join('')}</ol><footer>Arithmetic stays within eight bits; every division and right shift is exact.<br>${ending}</footer></article>`;
}
export function numberChainHTML(state){
 const total=state.chain.steps.length;
 return `<div class="chain-controls"><div><span class="chain-kicker">CHAIN ${String(state.round).padStart(2,'0')}</span><p>Carry each result forward. Follow the answer format at each step.</p></div><div class="actions"><button type="button" class="button primary" data-chain-action="new">New chain</button><button type="button" class="button outline" data-chain-action="print">Print worksheet</button><button type="button" class="button outline" data-chain-action="clear">Clear answers</button></div></div>
 <div class="chain-settings"><label for="chain-finish-choice">Finish with<select id="chain-finish-choice" data-chain-finish>${CHAIN_FINISHES.map(option=>`<option value="${option.id}"${state.settings.finish===option.id?' selected':''}>${option.label}</option>`).join('')}</select></label><p>Actions vary after the opening conversion. Choose an optional ASCII or bitmap ending, or mix all three endings.</p></div>
 <div class="chain-progress"><progress max="${total}" value="0" aria-label="Steps correct"></progress><p class="chain-status" role="status" aria-live="polite">0 of ${total} steps correct. Start with the number below.</p></div>
 <form class="chain-form" novalidate><div class="chain-start"><span>START · DECIMAL</span><strong>${state.chain.start}</strong></div><ol class="chain-steps">${state.chain.steps.map((step,index)=>`<li class="chain-step" data-chain-step="${index}"><div class="chain-step-heading"><span class="chain-step-number" aria-hidden="true">${index+1}</span><div><h3 id="chain-prompt-${index}">${escapeHTML(step.title)}</h3><p>${escapeHTML(step.instruction)}</p></div><span class="chain-format">${formatName(step)}</span></div>${step.format==='ascii'?asciiReference():''}<div class="chain-answer-row">${answerHTML(state,step,index)}<button type="button" class="button secondary" data-chain-check="${index}">Check step ${index+1}</button></div><p class="chain-feedback" id="chain-feedback-${index}" role="status" aria-live="polite"></p>${methodHTML(step)}</li>`).join('')}</ol><div class="chain-finish"><button type="submit" class="button primary">Check whole chain</button><button type="button" class="button outline" data-chain-action="new">Try another chain</button><p class="chain-completion"></p><p>All calculations stay within eight bits. Every division and right shift gives an exact whole-number result.</p></div></form>`;
}

export function mountNumberChain(root,{seed=seedFromBrowser(),randomSeed=seedFromBrowser,settings={}}={}){
 let state=createChainState(seed,1,settings);
 const doc=root.ownerDocument,view=doc.defaultView;
 function cleanPrint(){doc.getElementById('number-chain-print')?.remove();doc.body.classList.remove('printing-number-chain');}
 function preparePrint(){
  if(doc.getElementById('number-chain-section')?.hidden){cleanPrint();return;}
  cleanPrint();const sheet=doc.createElement('section');sheet.id='number-chain-print';sheet.innerHTML=numberChainPrintHTML(state);doc.body.append(sheet);doc.body.classList.add('printing-number-chain');
 }
 view.addEventListener('beforeprint',preparePrint);view.addEventListener('afterprint',cleanPrint);
 function updateFeedback(){
  state.results.forEach((result,index)=>{
   const field=root.querySelector(`[data-chain-answer="${index}"]`)||root.querySelector(`[data-chain-bitmap="${index}"]`),card=root.querySelector(`[data-chain-step="${index}"]`),feedback=root.querySelector(`#chain-feedback-${index}`);
   feedback.textContent=result?.message||'';feedback.className=`chain-feedback${result?result.correct?' good':' bad':''}`;card.classList.toggle('chain-correct',result?.correct===true);
   if(result&&!result.correct)field.setAttribute('aria-invalid','true');else field.removeAttribute('aria-invalid');
   if(state.chain.steps[index].format==='bitmap'){
    const bits=state.answers[index].replace(/\s/g,'');
    field.querySelectorAll('[data-chain-pixel]').forEach(button=>{const pixel=Number(button.dataset.chainPixel),on=bits[pixel]==='1';button.classList.toggle('is-dark',on);button.setAttribute('aria-pressed',String(on));button.setAttribute('aria-label',pixelLabel(pixel,on));});
   }
  });
  const progress=chainProgress(state),total=state.chain.steps.length;root.querySelector('progress').value=progress.correct;
  root.querySelector('.chain-completion').textContent=progress.complete?`Chain complete! All ${total} steps are correct.`:progress.checked?`${progress.correct} of ${total} steps correct. Check the feedback above and keep going.`:'';
  root.querySelector('.chain-status').textContent=progress.complete?`Chain complete! All ${total} steps are correct. Choose New chain to play again.`:`${progress.correct} of ${total} steps correct. ${progress.checked?'Keep going — you can check and improve each step.':'Start with the number below.'}`;
 }
 function focusAnswer(index){(root.querySelector(`[data-chain-answer="${index}"]`)||root.querySelector(`[data-chain-pixel-step="${index}"]`))?.focus();}
 function render(focus=false){root.innerHTML=numberChainHTML(state);updateFeedback();if(focus)focusAnswer(0);}
 root.addEventListener('input',event=>{const field=event.target.closest('[data-chain-answer]');if(!field)return;editChainAnswer(state,Number(field.dataset.chainAnswer),field.value);updateFeedback();});
 root.addEventListener('change',event=>{const field=event.target.closest('[data-chain-finish]');if(!field)return;state.settings=normaliseChainSettings({finish:field.value});state=nextChain(state,randomSeed);cleanPrint();render();root.querySelector('[data-chain-finish]').focus();});
 root.addEventListener('click',event=>{
  const pixel=event.target.closest('[data-chain-pixel]');if(pixel){toggleChainPixel(state,Number(pixel.dataset.chainPixelStep),Number(pixel.dataset.chainPixel));updateFeedback();return;}
  const check=event.target.closest('[data-chain-check]');if(check){checkChainAnswer(state,Number(check.dataset.chainCheck));updateFeedback();return;}
  const action=event.target.closest('[data-chain-action]')?.dataset.chainAction;
  if(action==='print'){preparePrint();try{view.print();}catch(error){cleanPrint();throw error;}}
  if(action==='new'){state=nextChain(state,randomSeed);cleanPrint();render(true);}
  if(action==='clear'){clearChainAnswers(state);cleanPrint();render(true);}
 });
 root.addEventListener('submit',event=>{event.preventDefault();checkWholeChain(state);updateFeedback();});
 root.addEventListener('keydown',event=>{const field=event.target.closest('[data-chain-answer]');if(!field||event.key!=='Enter')return;event.preventDefault();const index=Number(field.dataset.chainAnswer),result=checkChainAnswer(state,index);updateFeedback();if(result.correct&&index<state.chain.steps.length-1)focusAnswer(index+1);});
 render();return {getState:()=>state};
}
if(typeof document!=='undefined'){const root=document.getElementById('number-chain-game');if(root)mountNumberChain(root);}
