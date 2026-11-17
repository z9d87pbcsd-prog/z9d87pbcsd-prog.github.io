// Shared Boolean model for original practice questions and the separate modelling workshop.
export const INPUTS=Object.freeze(['A','B','C','D','E']);
export const GATES=Object.freeze({NOT:1,AND:2,OR:2,XOR:2});
export const gateArity=op=>Object.hasOwn(GATES,op)?GATES[op]:0;
export const logicNode=(op,...args)=>({op,args});
const symbols={AND:'.',OR:'+',XOR:'⊕'};
export const negationMark='<span class="logic-overbar-mark" aria-hidden="true"></span>';
export function expressionComplete(tree){
 return INPUTS.includes(tree)||(!!gateArity(tree?.op)&&Array.isArray(tree.args)&&tree.args.length===GATES[tree.op]&&tree.args.every(expressionComplete));
}
export function evaluateLogic(tree,inputs){
 if(INPUTS.includes(tree))return Number(inputs[tree]);
 const [a,b]=tree.args.map(child=>evaluateLogic(child,inputs));
 return tree.op==='NOT'?1-a:tree.op==='AND'?a&b:tree.op==='OR'?a|b:a^b;
}
export function logicInputs(tree){
 const used=new Set();
 function walk(n){if(INPUTS.includes(n))used.add(n);else n?.args?.forEach(walk);}
 walk(tree);return INPUTS.filter(x=>used.has(x));
}
export function logicRows(tree,names=logicInputs(tree)){
 return Array.from({length:2**names.length},(_,i)=>{
  const bits=names.map((_,j)=>(i>>(names.length-j-1))&1),inputs=Object.fromEntries(names.map((name,j)=>[name,bits[j]]));
  return {bits,output:evaluateLogic(tree,inputs)};
 });
}
export function logicExpressionHTML(tree,slot=null,path=[],root=true){
 const wrap=(label,contents)=>slot?slot(path,label,contents):contents;
 if(!tree)return wrap('Empty slot','□');
 if(INPUTS.includes(tree))return wrap(tree,tree);
 const args=tree.args.map((n,i)=>logicExpressionHTML(n,slot,[...path,i],false));
 if(tree.op==='NOT')return slot
  ?`<span class="logic-edit-negation">${slot(path,'Negation (NOT)',negationMark,'logic-negation-slot')}${args[0]}</span>`
  :`<span class="logic-overbar">${args[0]}</span>`;
 const op=wrap(tree.op,symbols[tree.op]);
 return `${root?'':'('}${args[0]} <span class="logic-op">${op}</span> ${args[1]}${root?'':')'}`;
}
export function setLogicSlot(tree,path,token){
 if(path.length>4)return tree;
 if(!path.length){
  if(token===null)return null;
  if(INPUTS.includes(token))return token;
  if(gateArity(token)&&path.length<4)return logicNode(token,...Array(GATES[token]).fill(null));
  return tree;
 }
 const [i,...rest]=path;
 if(!tree?.args||i<0||i>=tree.args.length)return tree;
 // Limit nesting to four gates above a leaf.
 if(path.length===4&&gateArity(token))return tree;
 return logicNode(tree.op,...tree.args.map((n,j)=>j===i?setLogicSlot(n,rest,token):n));
}
export function logicTable(tree,{blank=false,names=logicInputs(tree)}={}){
 const rows=logicRows(tree,names);
 return `<table class="logic-truth"><thead><tr>${names.map(n=>`<th scope="col">${n}</th>`).join('')}<th scope="col">Q</th></tr></thead><tbody>${rows.map(r=>`<tr>${r.bits.map(v=>`<td>${v}</td>`).join('')}<td>${blank?'&nbsp;':r.output}</td></tr>`).join('')}</tbody></table>`;
}
export function gateSymbol(op){
 const outline=op==='AND'?'<path d="M0 -14 H22 A14 14 0 0 1 22 14 H0 Z"/>':op==='NOT'?'<path d="M0 -14 L33 0 L0 14 Z"/><circle cx="37" cy="0" r="4"/>':'<path d="M0 -14 Q25 -17 42 0 Q25 17 0 14 Q12 0 0 -14 Z"/>'+(op==='XOR'?'<path d="M-6 -14 Q6 0 -6 14" fill="none"/>':'');
 return `<g stroke="currentColor" stroke-width="1.6" fill="white" stroke-linejoin="round">${outline}</g>`;
}
export const portOffset=(op,index)=>op==='NOT'||op==='Q'?0:index===0?-7:7;
export const gatePinX=(op,port)=>port==='out'?op==='AND'?36:op==='NOT'?41:42:op==='XOR'?0:op==='OR'?6:0;
export function logicCircuitFigure(tree){
 let row=0;const nodes=[],wires=[];
 function layout(n){
  if(INPUTS.includes(n)){const y=23+36*row++;nodes.push(`<text x="12" y="${y+4}">${n}</text>`);return {x:30,y};}
  const children=n.args.map(layout),x=Math.max(...children.map(p=>p.x))+32,y=children.reduce((total,p)=>total+p.y,0)/children.length;
  children.forEach((p,i)=>{const end=x+gatePinX(n.op,'in'),py=y+portOffset(n.op,i);wires.push(`<path d="M${p.x} ${p.y} H${x-16-i*5} V${py} H${end}"/>`);});
  nodes.push(`<g transform="translate(${x} ${y})">${gateSymbol(n.op)}</g>`);
  return {x:x+gatePinX(n.op,'out'),y};
 }
 const end=layout(tree),width=end.x+46,height=Math.max(46,36*row+10);
 return `<svg class="logic-diagram" viewBox="0 0 ${width} ${height}" role="img" aria-label="Logic circuit diagram. Input labels are on the left and output Q on the right." xmlns="http://www.w3.org/2000/svg"><g fill="none" stroke="currentColor" stroke-width="1.6">${wires.join('')}<path d="M${end.x} ${end.y} H${end.x+23}"/></g><g fill="currentColor" font-family="system-ui,sans-serif" font-size="12">${nodes.join('')}<text x="${end.x+28}" y="${end.y+4}">Q</text></g></svg>`;
}
// All links point from the output of a source node to a single input pin.
export function circuitExpression(nodes,wires){
 const found=new Map(nodes.map(n=>[n.id,n])),visiting=new Set(),cache=new Map();
 function visit(id){
  if(cache.has(id))return cache.get(id);
  if(visiting.has(id))return null;
  const node=found.get(id);
  if(!node)return null;
  if(INPUTS.includes(node.kind))return node.kind;
  const arity=node.kind==='Q'?1:gateArity(node.kind);
  if(!arity)return null;
  visiting.add(id);
  const args=Array.from({length:arity},(_,pin)=>visit(wires.find(w=>w.to===id&&w.pin===pin)?.from));
  visiting.delete(id);
  if(args.some(x=>x===null))return null;
  const tree=node.kind==='Q'?args[0]:logicNode(node.kind,...args);
  cache.set(id,tree);return tree;
 }
 return visit('Q');
}
export function canWire(nodes,wires,from,to,pin){
 const a=nodes.find(n=>n.id===from),b=nodes.find(n=>n.id===to);
 if(!a||!b||a===b||a.kind==='Q'||!Number.isInteger(pin)||pin<0||pin>=(b.kind==='Q'?1:gateArity(b.kind)))return false;
 const seen=new Set(),queue=[to];
 while(queue.length){
  const node=queue.pop();if(node===from)return false;
  if(seen.has(node))continue;seen.add(node);
  wires.filter(w=>w.from===node).forEach(w=>queue.push(w.to));
 }
 return true;
}
