import {INPUTS,GATES,gateArity,gateSymbol,portOffset,gatePinX,setLogicSlot,expressionComplete,logicExpressionHTML,logicInputs,logicTable,logicCircuitFigure,evaluateLogic,circuitExpression,canWire,logicNode,negationMark} from './logic.js';

const gateNames=Object.keys(GATES);
const inputCounts=INPUTS.map((_,i)=>i+1);
const width=900,height=375;
function inputY(i,count){
 const spacing=Math.min(95,(height-96)/Math.max(1,count-1));
 return Math.round(height/2+(i-(count-1)/2)*spacing);
}
const emptyCircuit=(count=3)=>({
 nodes:[...INPUTS.slice(0,count).map((kind,i)=>({id:kind,kind,x:65,y:inputY(i,count)})),{id:'Q',kind:'Q',x:815,y:188}],
 wires:[],bits:Object.fromEntries(INPUTS.map(name=>[name,0])),sequence:0
});
const binaryGates=['OR','AND','XOR'];
const oneInputExamples=[
 logicNode('NOT','A'),
 ...binaryGates.flatMap(gate=>[logicNode(gate,'A','A'),logicNode('NOT',logicNode(gate,'A','A'))]),
 logicNode('NOT',logicNode('NOT','A')),logicNode('OR','A',logicNode('NOT','A')),
 logicNode('XOR',logicNode('NOT','A'),logicNode('NOT','A'))
];
function exampleExpression(count,index){
 if(count===1)return oneInputExamples[index%oneInputExamples.length];
 const names=INPUTS.slice(0,count),combinations=3**(count-1);
 let code=index%combinations;
 // Change operators before starting the next round of input inversions.
 const inverted=(Math.floor(index/combinations)+count)%(count+1);
 const reversed=Math.floor(index/(combinations*(count+1)))%2===1;
 function build(list){
  if(list.length===1)return list[0]===names[inverted]?logicNode('NOT',list[0]):list[0];
  const gate=binaryGates[code%3];code=Math.floor(code/3);
  const split=reversed?Math.floor(list.length/2):Math.ceil(list.length/2);
  return logicNode(gate,build(list.slice(0,split)),build(list.slice(split)));
 }
 return build(names);
}
function exampleCircuit(count,index){
 const c=emptyCircuit(count);
 // Model each binary circuit before and after negating its final output.
 const base=exampleExpression(count,count===1?index:Math.floor(index/2));
 const tree=count>1&&index%2===1?logicNode('NOT',base):base;
 const gateDepth=n=>typeof n==='string'?0:1+Math.max(...n.args.map(gateDepth));
 const columnGap=Math.min(137,509/Math.max(1,gateDepth(tree)-1));
 const layout=tree=>{
  if(INPUTS.includes(tree))return {id:tree,y:c.nodes.find(n=>n.id===tree).y,depth:0};
  const inputs=tree.args.map(layout),depth=1+Math.max(...inputs.map(input=>input.depth));
  const id='g'+(++c.sequence),y=Math.round(inputs.reduce((n,input)=>n+input.y,0)/inputs.length);
  c.nodes.push({id,kind:tree.op,x:205+Math.round((depth-1)*columnGap),y});
  inputs.forEach((input,pin)=>c.wires.push({from:input.id,to:id,pin}));
  return {id,y,depth};
 };
 c.wires.push({from:layout(tree).id,to:'Q',pin:0});
 return c;
}
const button=(text,action,extra='',kind='')=>`<button class="btn small ${kind}" type="button" data-lw="${action}" ${extra}>${text}</button>`;
const at=(x,y)=>`left:${x/width*100}%;top:${y/height*100}%`;
const bound=(v,min,max)=>Math.max(min,Math.min(max,Math.round(v)));
const svgGate=op=>`<svg viewBox="-9 -17 56 34" aria-hidden="true">${gateSymbol(op)}</svg>`;
const escAttr=s=>String(s).replaceAll('&','&amp;').replaceAll('"','&quot;').replaceAll('<','&lt;');

export function createLogicWorkshop(){
 let mode='circuit',circuit=emptyCircuit(),expr=null,exprToken=null,exprSelected=null,source=null,gate=null,drag=null,message='';
 const hiddenResults=()=>({representation:false,table:false});
 const reveal={circuit:hiddenResults(),expression:hiddenResults()};
 const circuitExamples=Array(INPUTS.length+1).fill(0);
 const expressionExampleCounts=[3,4,5,2];
 let expressionExamples=0;
 const circuitInputs=()=>circuit.nodes.filter(n=>INPUTS.includes(n.kind));
 const history={circuit:[],expression:[]};
 const snapshot=()=>{history[mode].push(JSON.stringify(mode==='circuit'?circuit:expr));if(history[mode].length>24)history[mode].shift();};
 const tell=s=>{message=s;};
 function setToken(path,token){
  if(path.length===4&&gateArity(token)){tell('Use a variable here. Keep this expression to four nested gate levels.');return;}
  snapshot();expr=setLogicSlot(expr,path,token);exprSelected=path;exprToken=null;tell(token?'Expression updated.':'Slot cleared.');
 }
 function addGate(kind,x=230+(circuit.sequence%4)*125,y=105+(circuit.sequence%3)*77){
  if(!gateArity(kind))return;
  if(circuit.nodes.filter(n=>gateArity(n.kind)).length>=8){tell('This board supports up to eight gates. Remove one before adding another.');return;}
  snapshot();gate='g'+(++circuit.sequence);
  circuit.nodes.push({id:gate,kind,x:bound(x,124,714),y:bound(y,56,337)});
  tell(kind+' placed. Select an output dot, then an input dot to connect it.');
 }
 function moveGate(id,x,y){
  const n=circuit.nodes.find(n=>n.id===id&&gateArity(n.kind));if(!n)return;
  const xx=bound(x,124,714),yy=bound(y,56,337);if(n.x===xx&&n.y===yy)return;
  snapshot();n.x=xx;n.y=yy;gate=id;tell(n.kind+' moved.');
 }
 function wire(from,to,pin){
  if(!canWire(circuit.nodes,circuit.wires,from,to,pin)){source=null;tell('Cannot connect those pins. Connect an output to an input without making a loop.');return;}
  snapshot();circuit.wires=circuit.wires.filter(w=>w.to!==to||w.pin!==pin);
  circuit.wires.push({from,to,pin});source=null;tell('Wire connected.');
 }
 function inputClick(id,pin){
  if(source){wire(source,id,pin);return;}
  if(circuit.wires.some(w=>w.to===id&&w.pin===pin)){
   snapshot();circuit.wires=circuit.wires.filter(w=>w.to!==id||w.pin!==pin);tell('Wire removed.');
  }else tell('Select an output dot first, or drag an output dot to this input.');
 }
 function circuitBoard(){
  const names=circuitInputs();
  const pinX=(n,side)=>n.x+(gateArity(n.kind)?gatePinX(n.kind,side):0);
  const paths=circuit.wires.map(w=>{
   const a=circuit.nodes.find(n=>n.id===w.from),b=circuit.nodes.find(n=>n.id===w.to),x=pinX(a,'out'),end=pinX(b,'in'),y=b.y+portOffset(b.kind,w.pin),mid=(x+end)/2;
   return `<path d="M${x} ${a.y} H${mid} V${y} H${end}"/>`;
  }).join('');
  const shapes=circuit.nodes.filter(n=>gateArity(n.kind)).map(n=>`<g transform="translate(${n.x} ${n.y})">${gateSymbol(n.kind)}</g>`).join('');
  const ports=circuit.nodes.map(n=>{
   const label=gateArity(n.kind)?`${n.kind} gate ${n.id.slice(1)}`:n.kind;
   const ins=Array.from({length:n.kind==='Q'?1:gateArity(n.kind)},(_,i)=>{
    const connected=circuit.wires.some(w=>w.to===n.id&&w.pin===i);
    return `<button type="button" class="lw-port in ${connected?'wired':''}" style="${at(pinX(n,'in'),n.y+portOffset(n.kind,i))}" data-lw="pin-in" data-node="${n.id}" data-pin="${i}" data-focus="in-${n.id}-${i}" aria-label="${label} input ${i+1}${connected?', connected':''}" title="${label} input ${i+1}"></button>`;
   }).join('');
   const out=n.kind==='Q'?'':`<button type="button" draggable="true" class="lw-port out ${source===n.id?'picked':''}" style="${at(pinX(n,'out'),n.y)}" data-lw="pin-out" data-node="${n.id}" data-focus="out-${n.id}" aria-pressed="${source===n.id}" aria-label="${label} output" title="${label} output"></button>`;
   const tag=gateArity(n.kind)?`<button type="button" draggable="true" class="lw-gate-label ${gate===n.id?'picked':''}" style="${at(n.x+18,n.y-26)}" data-lw="select-gate" data-node="${n.id}" data-focus="gate-${n.id}" aria-label="Select ${label}. Use arrow keys to move." aria-pressed="${gate===n.id}" title="Drag or use the arrow keys to move">${n.kind}</button>`:
    n.kind==='Q'?`<span class="lw-endpoint" style="${at(n.x+26,n.y)}">Q</span>`:`<span class="lw-endpoint" style="${at(n.x-27,n.y)}">${n.kind}</span>`;
   return tag+ins+out;
  }).join('');
  return `<div class="lw-toolbar"><div class="lw-palette" aria-label="Gate palette">${gateNames.map(op=>button(svgGate(op)+op,'add-gate',`draggable="true" data-token="${op}" title="Add or drag a ${op} gate"`)).join('')}</div><label class="lw-input-count">Inputs <select data-lw-inputs aria-label="Number of circuit inputs">${inputCounts.map(n=>`<option ${n===names.length?'selected':''}>${n}</option>`).join('')}</select></label></div>
  <p class="lw-instructions">Drag a gate onto the board, or click to add it. Connect an output dot to an input dot by dragging or tapping them in order. Tap a connected input on its own to remove its wire.</p>
  <div class="lw-scroll" tabindex="0" aria-label="Scrollable circuit board"><div class="lw-board" data-lw-board><svg viewBox="0 0 ${width} ${height}" aria-hidden="true"><g fill="none" stroke="currentColor" stroke-width="2.5" stroke-linejoin="round">${paths}</g>${shapes}</svg>${ports}</div></div>
  <div class="lw-controls" aria-label="Circuit inputs and gate controls"><span>Input values</span>${names.map(n=>button(`${n.id} = ${circuit.bits[n.id]}`,'bit',`data-node="${n.id}" aria-pressed="${!!circuit.bits[n.id]}"`)).join('')}${button('Remove selected gate','delete-gate',gate?'':'disabled')}</div>`;
 }
 function expressionBoard(){
  const tokens=[...INPUTS,...gateNames];
  const label=token=>token==='NOT'?negationMark:token==='AND'?'AND · .':token==='OR'?'OR · +':token==='XOR'?'XOR · ⊕':token;
  const slot=(path,desc,contents,kind='')=>{
   const key=path.join('.');
   return `<button class="lw-slot ${kind|| (desc==='Empty slot'?'empty-slot':'')} ${exprSelected?.join('.')===key?'picked':''}" type="button" data-lw="slot" data-path="${key}" data-focus="slot-${key}" aria-label="${desc}, ${path.length?'expression slot '+path.map(n=>n+1).join('.'):'main expression slot'}">${contents}</button>`;
  };
  return `<div class="lw-palette" aria-label="Expression tokens">${tokens.map(t=>button(label(t),'choose-token',`data-token="${t}" draggable="true" aria-pressed="${exprToken===t}" ${t==='NOT'?'aria-label="Overbar (NOT)" title="Negate with an overbar"':''}`,exprToken===t?'primary':'')).join('')}</div>
  <p class="lw-instructions">Drop a variable or operation into a slot, or select a token and tap the slot. The overbar negates what it covers. Select it or any other token to replace or remove it.</p>
  <div class="lw-expression" aria-label="Expression workspace"><span class="lw-q">Q =</span><div class="logic-expression">${logicExpressionHTML(expr,slot)}</div></div>
  <div class="lw-controls">${button('Clear selected slot','delete-slot',exprSelected!==null?'':'disabled')}</div>`;
 }
 function output(){
  const {representation,table}=reveal[mode];
  if(!representation&&!table)return '<p class="lw-instructions">Reveal each result when the class is ready.</p>';
  const tree=mode==='circuit'?circuitExpression(circuit.nodes,circuit.wires):expr;
  if(!expressionComplete(tree))return `<p class="lw-instructions">${mode==='circuit'?'Connect Q and every input of the gates on its path.':'Fill all expression slots first.'}</p>`;
  const inputs=mode==='circuit'?circuitInputs().map(n=>n.kind):logicInputs(tree);
  const graphic=representation?(mode==='circuit'?`<div class="logic-expression">Q = ${logicExpressionHTML(tree)}</div><p>Output for the current input values: <strong>${evaluateLogic(tree,circuit.bits)}</strong></p>`:logicCircuitFigure(tree)):'';
  return `<section class="lw-output" aria-label="Model results">${representation?`<div><h3>${mode==='circuit'?'Matching expression':'Matching circuit'}</h3>${graphic}</div>`:''}${table?`<div><h3>Truth table · ${2**inputs.length} rows</h3><div class="lw-truth-scroll" role="region" tabindex="0" aria-label="Truth table rows">${logicTable(tree,{names:inputs})}</div></div>`:''}</section>`;
 }
 function body(){
  return `<div class="lw-toolbar"><div class="lw-mode" role="group" aria-label="Modelling tool">${button('Circuit builder','mode','data-mode="circuit" aria-pressed="'+(mode==='circuit')+'"',mode==='circuit'?'primary':'')}${button('Expression builder','mode','data-mode="expression" aria-pressed="'+(mode==='expression')+'"',mode==='expression'?'primary':'')}</div><div class="lw-controls">${button('Load example','example')}${button('Undo','undo',history[mode].length?'':'disabled')}${button('Clear board','clear')}</div></div>
  ${mode==='circuit'?circuitBoard():expressionBoard()}
  <p class="lw-status" role="status">${message}</p>
  <div class="lw-controls" role="group" aria-label="Reveal results">${[['representation',mode==='circuit'?'expression':'circuit'],['table','truth table']].map(([key,label])=>button(`${reveal[mode][key]?'Hide':'Reveal'} ${label}`,'reveal',`data-result="${key}" aria-pressed="${reveal[mode][key]}"`,'primary')).join('')}</div>
  ${output()}`;
 }
 function bind(root){
  if(!root)return;
  function draw(focus,previous=null){
   const position=root.querySelector('.lw-scroll')?.scrollLeft??0;
   root.innerHTML=body();
   const scroll=root.querySelector('.lw-scroll');if(scroll)scroll.scrollLeft=position;
   const replacement=focus?root.querySelector(`[data-focus="${escAttr(focus)}"]`):previous?[...root.querySelectorAll('[data-lw]')].find(el=>['lw','mode','node','token','result'].every(k=>el.dataset[k]===previous[k])):null;
   replacement?.focus({preventScroll:true});
  }
  root.addEventListener('click',e=>{
   const el=e.target.closest('[data-lw]');if(!el)return;
   const {lw,mode:next,token,node,pin,path,focus,result}=el.dataset;
   const route=path===undefined?null:path===''?[]:path.split('.').map(Number);
   if(lw==='mode'){mode=next;source=null;exprToken=null;tell('');}
   else if(lw==='example'){
    snapshot();
    if(mode==='circuit'){
     const count=circuitInputs().length;
     circuit=exampleCircuit(count,circuitExamples[count]++);
    }else{
     const index=expressionExamples++,count=expressionExampleCounts[index%expressionExampleCounts.length];
     expr=exampleExpression(count,Math.floor(index/expressionExampleCounts.length));
    }
    source=null;gate=null;exprToken=null;exprSelected=null;tell('New example loaded.');
   }
   else if(lw==='clear'){snapshot();if(mode==='circuit')circuit=emptyCircuit(circuitInputs().length);else expr=null;source=null;gate=null;exprSelected=null;exprToken=null;reveal[mode]=hiddenResults();tell('Board cleared.');}
   else if(lw==='undo'){const last=history[mode].pop();if(last!==undefined){if(mode==='circuit')circuit=JSON.parse(last);else expr=JSON.parse(last);source=null;gate=null;exprSelected=null;tell('Last change undone.');}}
   else if(lw==='reveal'&&Object.hasOwn(reveal[mode],result)){reveal[mode][result]=!reveal[mode][result];tell('');}
   else if(lw==='add-gate')addGate(token);
   else if(lw==='select-gate'){gate=node;tell('Gate selected. Drag it or use the arrow keys to move it.');}
   else if(lw==='delete-gate'&&gate){snapshot();circuit.nodes=circuit.nodes.filter(n=>n.id!==gate);circuit.wires=circuit.wires.filter(w=>w.from!==gate&&w.to!==gate);source=null;gate=null;tell('Gate removed.');}
   else if(lw==='pin-out'){source=source===node?null:node;tell(source?'Output selected. Choose an input dot.':'Output deselected.');}
   else if(lw==='pin-in')inputClick(node,Number(pin));
   else if(lw==='bit'){snapshot();circuit.bits[node]=1-circuit.bits[node];tell(`${node} is now ${circuit.bits[node]}.`);}
   else if(lw==='choose-token'){exprToken=exprToken===token?null:token;tell(exprToken?`${token==='NOT'?'Overbar':token} selected. Choose an expression slot.`:'Token deselected.');}
   else if(lw==='slot'){if(exprToken)setToken(route,exprToken);else{exprSelected=route;tell('Slot selected. Choose a replacement or clear it.');}}
   else if(lw==='delete-slot'&&exprSelected!==null)setToken(exprSelected,null);
   draw(focus,el.dataset);
  });
  root.addEventListener('change',e=>{
   if(!e.target.matches('[data-lw-inputs]'))return;
   const n=Number(e.target.value);if(!inputCounts.includes(n))return;
   snapshot();const enabled=INPUTS.slice(0,n);
   circuit.nodes=circuit.nodes.filter(node=>!INPUTS.includes(node.kind));
   circuit.nodes.unshift(...emptyCircuit(n).nodes.filter(node=>INPUTS.includes(node.kind)));
   circuit.wires=circuit.wires.filter(w=>!INPUTS.includes(w.from)||enabled.includes(w.from));source=null;tell(`${n} inputs on the circuit board.`);draw();
  });
  root.addEventListener('keydown',e=>{
   const el=e.target.closest('[data-lw="select-gate"]'),delta={ArrowLeft:[-15,0],ArrowRight:[15,0],ArrowUp:[0,-15],ArrowDown:[0,15]}[e.key];
   if(!el||!delta)return;e.preventDefault();
   const n=circuit.nodes.find(n=>n.id===el.dataset.node);
   if(n){moveGate(n.id,n.x+delta[0],n.y+delta[1]);draw(el.dataset.focus);}
  });
  root.addEventListener('dragstart',e=>{
   const el=e.target.closest('[draggable="true"][data-lw]');if(!el)return;
   drag={action:el.dataset.lw,token:el.dataset.token,node:el.dataset.node};
   e.dataTransfer.setData('text/plain',drag.token||drag.node);e.dataTransfer.effectAllowed='copyMove';
  });
  root.addEventListener('dragend',()=>{drag=null;});
  function dropTarget(e){
   if(!drag)return null;
   if(drag.action==='pin-out')return e.target.closest('[data-lw="pin-in"]');
   if(drag.action==='choose-token')return e.target.closest('[data-lw="slot"]');
   return e.target.closest('[data-lw-board]');
  }
  root.addEventListener('dragover',e=>{if(dropTarget(e))e.preventDefault();});
  root.addEventListener('drop',e=>{
   const target=dropTarget(e);if(!target)return;e.preventDefault();
   if(drag.action==='pin-out')wire(drag.node,target.dataset.node,Number(target.dataset.pin));
   else if(drag.action==='choose-token')setToken(target.dataset.path===''?[]:target.dataset.path.split('.').map(Number),drag.token);
   else{
    const r=target.getBoundingClientRect(),x=(e.clientX-r.left)*width/r.width-18,y=(e.clientY-r.top)*height/r.height+26;
    if(drag.action==='add-gate')addGate(drag.token,x,y);else if(drag.action==='select-gate')moveGate(drag.node,x,y);
   }
   drag=null;draw();
  });
 }
 return {html:()=>`<div class="page logic-workshop"><div class="page-heading"><div><div class="eyebrow">UNIT 4 · 3.4.2 BOOLEAN LOGIC</div><h1>Logic workshop</h1><p>Build and test circuits or expressions with up to five inputs. AQA practice questions use up to three.</p></div></div><section class="panel lw-panel" id="logic-tool" aria-label="Logic modelling workspace">${body()}</section></div>`,bind};
}
