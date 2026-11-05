// Curated allowlist only: no generated letter strings or external dictionary input.
// AQA vocabulary sources and selection policy: docs/worksheet-generation.md.
const words=text=>[...new Set(text.trim().split(/\s+/))];
export const COMPUTING_WORDS=Object.freeze(words(`
 alu array ascii base bases binary bit bits bubble byte bytes cache clock cloud
 code codes colour copper count cpu data decode depth device digit digits driver
 email error errors fetch fibre field file files float gate gates group host hosts
 http https image imap index input lan layer length linear link local logic mac
 memory merge nested nic number order output packet pan pixel pixels query ram
 random real record repeat return rom sample scale search secure select shift
 shifts smtp solid sort sound store string syntax system table tcp trace truth
 units until value values wan where while wired word words
`));
export const COMMON_WORDS=Object.freeze(words(`
 acorn across action active actor adapt add admire adult after again age ago ahead
 air airy alarm album alert alike alive allow almond almost alone along aloud
 always amaze amber among anchor angel animal ankle annual answer ant any apart
 apple apron arch arctic area arm around arrive arrow art artist aspen attend
 aunt autumn awake award aware away baby back badge bag bake baker ballet ball
 bamboo banana band bank banner bar barn base basic basket bat bath beach bead
 bean bear beauty bed bee beech beetle before begin bell below belt bench bend
 berry best better beyond bike bird birth biscuit blade blanket blend block blue
 boat body book border borrow bottle bottom bowl box brain branch brass brave
 bread breeze brick bridge bright bring broad bronze brook broom brown brush
 bucket bud build bun bunch bundle bunny burn bus bush butter button cabin cactus
 cafe cake calm camera camp can canal candle canoe canvas cap cape captain car
 carbon card care carpet carrot carry cart case castle cat catch cave cedar cell
 centre cereal chain chair chalk chance change chant charm chase chat cheek cheer
 cheese cherry chess chest chick chief child chime chin choose circle city clap
 class clay clean clear clerk climb close coat cocoa coin cold collie colony
 come comet common cook cookie cool coral cork corn corner cotton couch could
 county cover cosy craft crane crayon cream create creek cricket crisp cross
 crowd crown cube cup curly curve cycle daily dairy daisy dance dawn day dear
 decide deep deer degree denim desk detail dew dial diary dinner dish dive dog
 doll dolphin door dot double dough dove down draw dream dress dried drift drill
 drink drive drum dry duck during dusk each eager eagle ear early earth east
 easy eat echo edge eel egg eight elder elm empty end energy engine enjoy enough
 enter equal equip eraser even event ever every exact except excite expect
 expert extra eye fabric face fact fair fairy fall family famous fan farm farmer
 fast father fault favour feast feather feed feel fern ferry few fiddle fig
 fill film fin find fine finger finish first fish fit five flag flame flat
 fleet flight flock flood floor floral flower flute fly foam fold follow food
 foot forest fork form forty fossil found four fox fresh friend frog from front
 frost fruit full fun funny fur future gain galaxy game garden garlic gather
 gaze gem gentle gift giggle ginger giraffe give glad glance globe glove glow
 goal goat gold golden golf good goose grain grand grape grass gravel great
 green greet grey grin ground grow growth guard guess guide gum habit hair half
 hall hammer hand handle happy harbour hard hare harp harvest hat hatch have
 hay head heal health hear heart heat hedge height hello help hen herd here
 heron hidden high hill hint hobby hold hole hollow home honey hood hoop hope
 horn horse hose hotel hour house huge human humble hunt hurry husky hut ice
 icy idea idle igloo ink inner insect inside into invent invite iris island
 item jacket jade jam jar jaw jazz jeans jelly jet jewel jog join joke jolly
 joy joyful judge jug juice juicy jump junior just kangaroo keep keeper kelp
 kettle kick kid kind king kitten kiwi knee knit koala label lace ladder lady
 lake lamb lamp land lane large lark last later laugh launch lawn lay lead
 leaf learn least leave left leg lemon lend lens less lesson let letter level
 lid lift light lilac lime line lion lip liquid listen little live lizard loaf
 loan lock lodge log long look lotus loud love lovely low lower loyal luck
 lucky lunch lunar lung lynx made magic magnet main maize make mall manage
 mango many maple marble march mark market marsh mask master mat match matter
 may maze meadow meal mean medal meet melon melt member menu merry metal
 method middle might mild mile milk mill mind mint minute mirror mist mix model
 modern moon more moss most mother motion motor mound mount mouse mouth move
 much muffin mug mule music must name napkin narrow nature near neat neck need
 nest net new next nice niece night nine noble nod noise north nose note novel
 now nut oak oats ocean octopus odd offer often oil olive once one onion only
 onto open opera orange orbit orchid otter our outer oval over owl own oxen
 pace pack page paint pair palace palm panda panel pansy paper parade parcel
 parent park parrot part party pass pasta patch path pause pave paw pay pea
 peace peach pearl pebble pen pencil people pepper perch pet petal piano pick
 picnic pie pigeon pile pillow pine pink pipe pitch place plain plait plan
 plane planet plant plate play please plenty plum poem poet point polar pond
 pony pool poppy porch port pose post pot potato power praise press pretty
 price pride print prize proud prove puddle puffin pull pump pupil puppy purple
 push puzzle quail queen quick quiet quilt quiz rabbit race racket radar radio
 raft rail rain raise rake rally ranch range rapid rare reach react read ready
 reason red reed reef region relax rely remain remind renew rent repair reply
 rescue rest result ribbon rice rich ride ridge right ring rinse rise river
 road robin robot rock rocket roll roof room root rope rose round route row
 royal rub ruby rug rule run rush rustic sad safe sage sail salad salmon salt
 same sand sandy save say scarf scene school scoop score scout screen sea seal
 seat second seed seem sense sent series serve set seven shade shadow shake
 shall shape share shark sharp shawl shed sheep sheet shell shine shiny ship
 shirt shoe shop shore short should shout show shrub shy side sight sign silk
 silver simple since sing singer single sip sir six skate ski skill skin sky
 slate sleep slide slim slope slow small smart smell smile smooth snack snail
 snake snap snow snowy snug soap sock sofa soft soil solar sold solve some
 song soon south space spade spark speak speed spell spend spice spider spike
 spin spiral splash split sponge spoon sport spot spring sprout square stable
 stage stair stamp stand star start state statue stay steam steel stem step
 stick still stitch stone stool stop story stove straw stream street string
 stripe strong studio study stump style sugar summer sun sunny sunset supper
 sure surf swan sweet swim swing switch sword syrup take tale talk tall tame
 tap target task taste tea teach team tear teddy teeth tell ten tennis tent
 thank that them then theory there these thick thin thing think third this
 thorn those thread three thrive throat thumb tidy tie tiger tile time tiny
 tired tissue title toast today toe toffee tomato tone tongue tonight tool
 tooth top topic torch total touch tour towel tower town toy track trail train
 travel tray treat tree trial trick trip trophy trout true trunk trust try
 tulip tune tunnel turn turtle twelve twenty twice twin two uncle under undo
 unfold union unique unit unless untie unto unwind update upset urban useful
 usual valley van vary vase velvet venue verb very vest view villa vine violet
 violin visit voice vote vowel voyage wagon wait wake walk wall walnut warm
 wash watch water wave wax way weasel weather weave web week well west wet
 whale wheat wheel when where which while white whole wide width wild willow
 win wind window wing wink winter wise wish with wolf wonder wood wool work
 world worm would wrap wren wrist write yacht yard yarn year yellow yes yet
 yield young youth zebra zero zest zigzag zip zone zoom
`).filter(word=>word.length>=3&&word.length<=6&&!COMPUTING_WORDS.includes(word)));
export const ENCODING_WORDS=Object.freeze([...COMPUTING_WORDS,...COMMON_WORDS]);
const excludedWord=()=>Object.assign(new RangeError('No unused words remain for this word length.'),{code:'WORD_POOL_EXHAUSTED'});
export function chooseEncodingWord(random,lengths=[3,4,5,6],{excludeWords=new Set(),preferComputing=false}={}){
 const excluded=excludeWords instanceof Set?excludeWords:new Set(excludeWords);
 const eligible=word=>lengths.includes(word.length)&&!excluded.has(word);
 const computing=COMPUTING_WORDS.filter(eligible),common=COMMON_WORDS.filter(eligible);
 // Worksheets consume the computing vocabulary first, then the common-word reserve.
 const pool=computing.length&&(preferComputing||!common.length||random()<.8)?computing:common;
 if(!pool.length)throw excludedWord();
 const word=pool[Math.floor(random()*pool.length)];
 return {word,wordCategory:COMPUTING_WORDS.includes(word)?'computing':'common'};
}
