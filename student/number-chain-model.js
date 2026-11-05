export const toBinary=value=>value.toString(2).padStart(8,'0');
export const CHAIN_FINISHES=Object.freeze([
 {id:'hex',label:'Hexadecimal'},
 {id:'ascii',label:'ASCII character'},
 {id:'bitmap',label:'Bitmap image (2 × 4)'},
 {id:'mixed',label:'Random: hex, ASCII or bitmap'}
]);
export function normaliseChainSettings(options={}){
 return {finish:CHAIN_FINISHES.some(item=>item.id===options?.finish)?options.finish:'hex'};
}
function seededRandom(seed){
 let value=Number(seed)>>>0;
 return ()=>{value+=0x6D2B79F5;let t=value;t=Math.imul(t^(t>>>15),t|1);t^=t+Math.imul(t^(t>>>7),t|61);return ((t^(t>>>14))>>>0)/4294967296;};
}
function seedFromBrowser(){return crypto.getRandomValues(new Uint32Array(1))[0];}
const asciiCodes=[...Array.from({length:10},(_,i)=>48+i),...Array.from({length:26},(_,i)=>65+i),...Array.from({length:26},(_,i)=>97+i)];
const bitmapValues=Array.from({length:254},(_,i)=>i+1).filter(value=>{const ones=value.toString(2).replace(/0/g,'').length;return ones>=2&&ones<=6;});

// Work backwards from a valid ending. Every edge is reversible, integral and eight-bit safe.
function predecessors(value,used){
 const groups=[];
 const add=(operation,items)=>{const choices=items.filter(item=>item.previous>0&&item.previous<=255&&!used.has(item.previous));if(choices.length)groups.push({operation,choices});};
 add('add',Array.from({length:Math.min(63,value-1)},(_,i)=>({operand:i+1,previous:value-i-1})));
 add('shift-left',[1,2,3].filter(n=>value%2**n===0).map(n=>({operand:n,previous:value/2**n})));
 add('shift-right',[1,2,3].map(n=>({operand:n,previous:value*2**n})));
 add('multiply',[2,4,8].filter(n=>value%n===0).map(n=>({operand:n,previous:value/n})));
 add('divide',[2,4,8].map(n=>({operand:n,previous:value*n})));
 return groups;
}
function planMath(random,finish){
 const pick=items=>items[Math.floor(random()*items.length)];
 for(let attempt=0;attempt<64;attempt++){
  const target=finish==='ascii'?pick(asciiCodes):finish==='bitmap'?pick(bitmapValues):16+Math.floor(random()*224);
  let value=target;const used=new Set([target]),backwards=[];
  for(let i=0;i<3;i++){
   const groups=predecessors(value,used);if(!groups.length)break;
   const group=pick(groups),choice=pick(group.choices);
   backwards.push({operation:group.operation,operand:choice.operand,previous:choice.previous,value});
   value=choice.previous;used.add(value);
  }
  const actions=backwards.reverse();
  if(actions.length===3&&value>=16&&actions.some(step=>step.operation==='add')&&actions.some(step=>step.operation.startsWith('shift-')))return {start:value,target,actions};
 }
 // A bounded fallback valid for every ending, including a visible ASCII letter.
 return {start:64,target:72,actions:[{operation:'shift-left',operand:1,previous:64,value:128},{operation:'add',operand:16,previous:128,value:144},{operation:'shift-right',operand:1,previous:144,value:72}]};
}
function mathStep(action,index){
 const previous=index+1,{operation,operand,value}=action;
 const title=operation==='add'?`Add ${toBinary(operand)}`:operation==='shift-left'||operation==='shift-right'?`Logical shift ${operation==='shift-left'?'left':'right'} by ${operand}`:`${operation==='multiply'?'Multiply':'Divide'} by ${operand}`;
 const instruction=operation==='add'?`Add this binary number to your result from step ${previous}. Write your answer in eight-bit binary.`:operation.startsWith('shift-')?`Shift your result from step ${previous} ${operation==='shift-left'?'left':'right'} by ${operand} place${operand===1?'':'s'}. Fill the empty positions with zeros and keep eight bits.`:`${operation==='multiply'?'Multiply':'Divide'} your result from step ${previous} by ${operand}. Write the result in eight-bit binary.`;
 return {...action,title,instruction,format:'binary',answer:toBinary(value)};
}
export function createNumberChain(seed,options={}){
 const settings=normaliseChainSettings(options),random=seededRandom(seed);
 const finish=settings.finish==='mixed'?['hex','ascii','bitmap'][Math.floor(random()*3)]:settings.finish;
 const plan=planMath(random,finish),value=plan.target;
 const final=finish==='ascii'?{operation:'ascii',title:'Convert to an ASCII character',instruction:'Convert your result from step 4 to the matching ASCII character. Use the reference and keep the correct letter case.',format:'ascii',answer:String.fromCharCode(value)}:finish==='bitmap'?{operation:'bitmap',title:'Draw a bitmap image',instruction:'Use the eight bits from step 4. Fill a 2 × 4 bitmap, left to right across the top row, then the bottom row. 1 = black; 0 = white.',format:'bitmap',answer:toBinary(value),rows:2,columns:4}:{operation:'hex',title:'Convert to hexadecimal',instruction:'Convert your binary result from step 4 into two hexadecimal digits.',format:'hex',answer:value.toString(16).toUpperCase().padStart(2,'0')};
 const steps=[{operation:'binary',title:'Convert to binary',instruction:'Convert the starting decimal number into eight-bit binary.',format:'binary',value:plan.start,answer:toBinary(plan.start)},...plan.actions.map(mathStep),{...final,value}];
 return {seed:Number(seed)>>>0,settings,finish,start:plan.start,steps,key:JSON.stringify([finish,plan.start,plan.actions.map(step=>[step.operation,step.operand]),value])};
}
export function createChainState(seed,round=1,options={}){
 const chain=createNumberChain(seed,options);
 return {chain,settings:chain.settings,round,answers:chain.steps.map(()=>''),results:chain.steps.map(()=>null)};
}
export function editChainAnswer(state,index,value){
 if(!Number.isInteger(index)||index<0||index>=state.answers.length)return;
 state.answers[index]=String(value).slice(0,24);
 for(let i=index;i<state.results.length;i++)state.results[i]=null;
}
export function toggleChainPixel(state,index,pixel){
 if(state.chain.steps[index]?.format!=='bitmap'||!Number.isInteger(pixel)||pixel<0||pixel>=8)return;
 const previous=state.answers[index].replace(/\s/g,''),bits=(/^[01]{8}$/.test(previous)?previous:'00000000').split('');
 bits[pixel]=bits[pixel]==='1'?'0':'1';editChainAnswer(state,index,bits.join(''));
}
export function clearChainAnswers(state){state.answers.fill('');state.results.fill(null);return state;}
export function checkChainAnswer(state,index){
 const step=state.chain.steps[index];if(!step)return null;
 const raw=state.answers[index].trim(),bits=step.format==='binary'||step.format==='bitmap';
 const normalised=bits?raw.replace(/\s/g,''):step.format==='hex'?raw.toUpperCase():raw;
 const valid=bits?/^[01]{8}$/.test(normalised):step.format==='ascii'?/^[A-Za-z0-9]$/.test(normalised):/^[0-9A-F]{2}$/.test(normalised);
 const correct=valid&&normalised===step.answer;
 let message;
 if(!raw)message=step.format==='bitmap'?'Shade the bitmap squares, then check your answer.':'Type your answer in the box above.';
 else if(!valid)message=step.format==='ascii'?'Enter one ASCII letter or digit, with the correct case.':step.format==='bitmap'?'Build the image using its eight pixel squares.':step.format==='binary'?'Use exactly eight bits: only 0 and 1. Keep any leading zeros.':'Use exactly two hexadecimal digits: 0–9 or A–F.';
 else if(correct)message=index===state.chain.steps.length-1?'Correct! You reached the end of the chain.':'Correct! Carry this result to the next step.';
 else message=step.format==='ascii'?'Not quite. Check the ASCII reference and letter case.':step.format==='bitmap'?'Not quite. Check the bit order and the black/white key.':index===0?'Not quite. Check the place values and try again.':'Not quite. Check this operation and your previous step, then try again.';
 return state.results[index]={correct,empty:!raw,message};
}
export function checkWholeChain(state){state.chain.steps.forEach((_,index)=>checkChainAnswer(state,index));return chainProgress(state);}
export function chainProgress(state){
 const correct=state.results.filter(result=>result?.correct).length,checked=state.results.filter(Boolean).length;
 return {correct,checked,complete:correct===state.chain.steps.length};
}
export function nextChain(state,randomSeed=seedFromBrowser){
 let seed=Number(randomSeed())>>>0;
 for(let attempt=0;attempt<100;attempt++){
  const next=createChainState(seed,state.round+1,state.settings);
  if(next.chain.key!==state.chain.key)return next;
  seed=(seed+1)>>>0;
 }
 throw new Error('Could not create a fresh number chain.');
}
