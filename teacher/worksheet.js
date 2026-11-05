import {SKILLS,makeQuestion,rng} from './bank.js';

// Identity is based on the task and the supplied information, never its seed or ID.
export function worksheetQuestionKey(question){
 const clean=text=>String(text||'').replace(/\s+/g,' ').trim();
 if(Number.isFinite(question.meta?.n))return `${question.skill}:${question.meta.n}`;
 const needsFigure=['add-two','add-three','bitmap-encode','bitmap-decode'].includes(question.skill)||question.skill.startsWith('huffman-');
 return JSON.stringify([question.skill,clean(question.prompt),needsFigure?clean(question.figure):'']);
}

export function makeWorksheet(ids,count,seed){
 const random=rng(seed),valid=new Set(SKILLS.map(skill=>skill.id));
 const active=[...new Set(ids)].filter(id=>valid.has(id));
 for(let i=active.length-1;i>0;i--){const j=Math.floor(random()*(i+1));[active[i],active[j]]=[active[j],active[i]];}
 const requested=Math.max(0,Math.min(24,Math.floor(Number(count)||0)));
 const questions=[],seen=new Set(),usedWords=new Set(),turns=new Map();
 const attemptsPerSkill=240;
 let cursor=0;
 while(questions.length<requested&&active.length){
  const id=active[cursor];let accepted=null;
  for(let attempt=0;attempt<attemptsPerSkill;attempt++){
   const level=1+(((turns.get(id)||0)+attempt)%3),questionSeed=Math.floor(random()*0x100000000)>>>0;
   let question;
   try{question=makeQuestion(id,level,questionSeed,{excludeWords:usedWords,preferComputing:true});}
   catch(error){if(error.code==='WORD_POOL_EXHAUSTED')continue;throw error;}
   const key=worksheetQuestionKey(question),word=question.meta?.word?.toLowerCase();
   if(seen.has(key)||(word&&usedWords.has(word)))continue;
   seen.add(key);if(word)usedWords.add(word);
   turns.set(id,level);accepted=question;break;
  }
  if(accepted){questions.push(accepted);cursor=(cursor+1)%active.length;}
  else{active.splice(cursor,1);if(active.length)cursor%=active.length;}
 }
 return {questions,requested,notice:questions.length<requested?`Created ${questions.length} unique questions out of ${requested} requested. Add more skills or choose fewer questions to make a full worksheet.`:''};
}
