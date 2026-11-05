export const STUDENT_TOPIC_GROUPS = [
 {id:'units',label:'Units',topics:['units']},
 {id:'bases',label:'Number bases',topics:['binary-decimal','binary-hex','hex-binary','hex-decimal','decimal-hex']},
 {id:'arithmetic',label:'Arithmetic',topics:['addition','shifts']},
 {id:'characters',label:'Characters',topics:['character-encoding']},
 {id:'images',label:'Images',topics:['bitmap']},
 {id:'sound',label:'Sound',topics:['sound']},
 {id:'compression',label:'Compression',topics:['data-compression','rle']},
 {id:'practice',label:'Practice',topics:['number-chain','all-practice']}
];

// The activity buttons and their original handlers remain the source of routing.
export function mountStudentTopicMenu(doc){
 const activityNav=doc.querySelector('nav.topic-nav.conversion-nav');
 if(!activityNav||activityNav.dataset.groupedMenu)return null;
 const buttons=new Map(STUDENT_TOPIC_GROUPS.flatMap(group=>group.topics).map(id=>[id,doc.getElementById(`${id}-tab`)]));
 if([...buttons.values()].some(button=>!button))return null;
 // The live page already contains this layout, so loading JavaScript never replaces a flat menu.
 let wrapper=doc.getElementById('student-topic-menu'),groupNav;
 if(wrapper){groupNav=doc.getElementById('student-topic-groups');if(!groupNav)return null;}
 else{
  wrapper=doc.createElement('section');wrapper.id='student-topic-menu';wrapper.className='student-topic-menu';wrapper.setAttribute('aria-label','Data representation practice menu');
  const label=doc.createElement('div');label.className='student-topic-menu-label';label.textContent='DATA REPRESENTATION';
  groupNav=doc.createElement('nav');groupNav.id='student-topic-groups';groupNav.className='student-topic-groups';groupNav.setAttribute('aria-label','Data representation topic groups');
  activityNav.before(wrapper);wrapper.append(label,groupNav,activityNav);
 }
 activityNav.dataset.groupedMenu='true';
 activityNav.classList.add('student-activity-menu');activityNav.setAttribute('role','tablist');
 const groupButtons=new Map(),remembered=new Map();let selected;
 for(const group of STUDENT_TOPIC_GROUPS){
  const button=doc.getElementById(`topic-group-${group.id}`)||doc.createElement('button');button.type='button';button.textContent=group.label;button.dataset.topicGroup=group.id;
  button.setAttribute('aria-pressed','false');button.setAttribute('aria-controls',group.topics.map(id=>`${id}-section`).join(' '));
  button.addEventListener('click',()=>{const topic=group.topics.includes(selected)?selected:remembered.get(group.id)||group.topics[0];buttons.get(topic).click();});
  groupNav.append(button);groupButtons.set(group.id,button);
 }
 for(const [id,button]of buttons){
  button.setAttribute('role','tab');button.setAttribute('aria-label',button.textContent.trim());
  const panel=doc.getElementById(`${id}-section`);if(panel){panel.setAttribute('role','tabpanel');panel.setAttribute('aria-labelledby',button.id);}
 }
 function sync(){
  selected=[...buttons].find(([,button])=>button.getAttribute('aria-selected')==='true')?.[0]||'units';
  const active=STUDENT_TOPIC_GROUPS.find(group=>group.topics.includes(selected));remembered.set(active.id,selected);
  for(const group of STUDENT_TOPIC_GROUPS){groupButtons.get(group.id).setAttribute('aria-pressed',String(group===active));for(const id of group.topics){const button=buttons.get(id);button.hidden=group!==active;button.tabIndex=id===selected?0:-1;}}
  activityNav.hidden=active.topics.length===1;activityNav.setAttribute('aria-label',`${active.label} activities`);
 }
 activityNav.addEventListener('click',sync);
 activityNav.addEventListener('keydown',event=>{
  const current=[...buttons].find(([,button])=>button===event.target);if(!current)return;
  const group=STUDENT_TOPIC_GROUPS.find(group=>group.topics.includes(current[0])),index=group.topics.indexOf(current[0]);let next;
  if(event.key==='ArrowRight')next=(index+1)%group.topics.length;
  else if(event.key==='ArrowLeft')next=(index+group.topics.length-1)%group.topics.length;
  else if(event.key==='Home')next=0;
  else if(event.key==='End')next=group.topics.length-1;
  else return;
  event.preventDefault();const button=buttons.get(group.topics[next]);button.click();button.focus();
 });
 // Also follow selections made by existing application code, without resetting any question.
 const Observer=doc.defaultView?.MutationObserver;
 if(Observer)new Observer(sync).observe(activityNav,{subtree:true,attributes:true,attributeFilter:['aria-selected']});
 sync();return {wrapper,sync};
}
if(typeof document!=='undefined')mountStudentTopicMenu(document);
