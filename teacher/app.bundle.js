(() => {
  // bytesize-pages-v27/dist/teacher/word-bank.js
  var words = (text) => [...new Set(text.trim().split(/\s+/))];
  var COMPUTING_WORDS = Object.freeze(words(`
 alu array ascii base bases binary bit bits bubble byte bytes cache clock cloud
 code codes colour copper count cpu data decode depth device digit digits driver
 email error errors fetch fibre field file files float gate gates group host hosts
 http https image imap index input lan layer length linear link local logic mac
 memory merge nested nic number order output packet pan pixel pixels query ram
 random real record repeat return rom sample scale search secure select shift
 shifts smtp solid sort sound store string syntax system table tcp trace truth
 units until value values wan where while wired word words
`));
  var COMMON_WORDS = Object.freeze(words(`
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
`).filter((word) => word.length >= 3 && word.length <= 6 && !COMPUTING_WORDS.includes(word)));
  var ENCODING_WORDS = Object.freeze([...COMPUTING_WORDS, ...COMMON_WORDS]);
  var excludedWord = () => Object.assign(new RangeError("No unused words remain for this word length."), { code: "WORD_POOL_EXHAUSTED" });
  function chooseEncodingWord(random, lengths = [3, 4, 5, 6], { excludeWords = /* @__PURE__ */ new Set(), preferComputing = false, requireRepeatedLetter = false } = {}) {
    const excluded = excludeWords instanceof Set ? excludeWords : new Set(excludeWords);
    const eligible = (word2) => lengths.includes(word2.length) && !excluded.has(word2) && (!requireRepeatedLetter || new Set(word2).size < word2.length);
    const computing = COMPUTING_WORDS.filter(eligible), common = COMMON_WORDS.filter(eligible);
    const pool = computing.length && (preferComputing || !common.length || random() < 0.8) ? computing : common;
    if (!pool.length) throw excludedWord();
    const word = pool[Math.floor(random() * pool.length)];
    return { word, wordCategory: COMPUTING_WORDS.includes(word) ? "computing" : "common" };
  }

  // bytesize-pages-v27/dist/teacher/logic.js
  var INPUTS = Object.freeze(["A", "B", "C", "D", "E"]);
  var GATES = Object.freeze({ NOT: 1, AND: 2, OR: 2, XOR: 2 });
  var gateArity = (op) => Object.hasOwn(GATES, op) ? GATES[op] : 0;
  var logicNode = (op, ...args) => ({ op, args });
  var symbols = { AND: ".", OR: "+", XOR: "⊕" };
  var negationMark = '<span class="logic-overbar-mark" aria-hidden="true"></span>';
  function expressionComplete(tree) {
    return INPUTS.includes(tree) || !!gateArity(tree?.op) && Array.isArray(tree.args) && tree.args.length === GATES[tree.op] && tree.args.every(expressionComplete);
  }
  function evaluateLogic(tree, inputs) {
    if (INPUTS.includes(tree)) return Number(inputs[tree]);
    const [a, b] = tree.args.map((child) => evaluateLogic(child, inputs));
    return tree.op === "NOT" ? 1 - a : tree.op === "AND" ? a & b : tree.op === "OR" ? a | b : a ^ b;
  }
  function logicInputs(tree) {
    const used = /* @__PURE__ */ new Set();
    function walk(n) {
      if (INPUTS.includes(n)) used.add(n);
      else n?.args?.forEach(walk);
    }
    walk(tree);
    return INPUTS.filter((x) => used.has(x));
  }
  function logicRows(tree, names = logicInputs(tree)) {
    return Array.from({ length: 2 ** names.length }, (_, i) => {
      const bits = names.map((_2, j) => i >> names.length - j - 1 & 1), inputs = Object.fromEntries(names.map((name, j) => [name, bits[j]]));
      return { bits, output: evaluateLogic(tree, inputs) };
    });
  }
  function logicExpressionHTML(tree, slot = null, path = [], root = true) {
    const wrap = (label, contents) => slot ? slot(path, label, contents) : contents;
    if (!tree) return wrap("Empty slot", "□");
    if (INPUTS.includes(tree)) return wrap(tree, tree);
    const args = tree.args.map((n, i) => logicExpressionHTML(n, slot, [...path, i], false));
    if (tree.op === "NOT") return slot ? `<span class="logic-edit-negation">${slot(path, "Negation (NOT)", negationMark, "logic-negation-slot")}${args[0]}</span>` : `<span class="logic-overbar">${args[0]}</span>`;
    const op = wrap(tree.op, symbols[tree.op]);
    return `${root ? "" : "("}${args[0]} <span class="logic-op">${op}</span> ${args[1]}${root ? "" : ")"}`;
  }
  function setLogicSlot(tree, path, token) {
    if (path.length > 4) return tree;
    if (!path.length) {
      if (token === null) return null;
      if (INPUTS.includes(token)) return token;
      if (gateArity(token) && path.length < 4) return logicNode(token, ...Array(GATES[token]).fill(null));
      return tree;
    }
    const [i, ...rest] = path;
    if (!tree?.args || i < 0 || i >= tree.args.length) return tree;
    if (path.length === 4 && gateArity(token)) return tree;
    return logicNode(tree.op, ...tree.args.map((n, j) => j === i ? setLogicSlot(n, rest, token) : n));
  }
  function logicTable(tree, { blank = false, names = logicInputs(tree) } = {}) {
    const rows = logicRows(tree, names);
    return `<table class="logic-truth"><thead><tr>${names.map((n) => `<th scope="col">${n}</th>`).join("")}<th scope="col">Q</th></tr></thead><tbody>${rows.map((r) => `<tr>${r.bits.map((v) => `<td>${v}</td>`).join("")}<td>${blank ? "&nbsp;" : r.output}</td></tr>`).join("")}</tbody></table>`;
  }
  function gateSymbol(op) {
    const outline = op === "AND" ? '<path d="M0 -14 H22 A14 14 0 0 1 22 14 H0 Z"/>' : op === "NOT" ? '<path d="M0 -14 L33 0 L0 14 Z"/><circle cx="37" cy="0" r="4"/>' : '<path d="M0 -14 Q25 -17 42 0 Q25 17 0 14 Q12 0 0 -14 Z"/>' + (op === "XOR" ? '<path d="M-6 -14 Q6 0 -6 14" fill="none"/>' : "");
    return `<g stroke="currentColor" stroke-width="1.6" fill="white" stroke-linejoin="round">${outline}</g>`;
  }
  var portOffset = (op, index) => op === "NOT" || op === "Q" ? 0 : index === 0 ? -7 : 7;
  var gatePinX = (op, port) => port === "out" ? op === "AND" ? 36 : op === "NOT" ? 41 : 42 : op === "XOR" ? 0 : op === "OR" ? 6 : 0;
  function logicCircuitFigure(tree) {
    let row = 0;
    const nodes = [], wires = [];
    function layout(n) {
      if (INPUTS.includes(n)) {
        const y2 = 23 + 36 * row++;
        nodes.push(`<text x="12" y="${y2 + 4}">${n}</text>`);
        return { x: 30, y: y2 };
      }
      const children = n.args.map(layout), x = Math.max(...children.map((p) => p.x)) + 32, y = children.reduce((total, p) => total + p.y, 0) / children.length;
      children.forEach((p, i) => {
        const end2 = x + gatePinX(n.op, "in"), py = y + portOffset(n.op, i);
        wires.push(`<path d="M${p.x} ${p.y} H${x - 16 - i * 5} V${py} H${end2}"/>`);
      });
      nodes.push(`<g transform="translate(${x} ${y})">${gateSymbol(n.op)}</g>`);
      return { x: x + gatePinX(n.op, "out"), y };
    }
    const end = layout(tree), width2 = end.x + 46, height2 = Math.max(46, 36 * row + 10);
    return `<svg class="logic-diagram" viewBox="0 0 ${width2} ${height2}" role="img" aria-label="Logic circuit diagram. Input labels are on the left and output Q on the right." xmlns="http://www.w3.org/2000/svg"><g fill="none" stroke="currentColor" stroke-width="1.6">${wires.join("")}<path d="M${end.x} ${end.y} H${end.x + 23}"/></g><g fill="currentColor" font-family="system-ui,sans-serif" font-size="12">${nodes.join("")}<text x="${end.x + 28}" y="${end.y + 4}">Q</text></g></svg>`;
  }
  function circuitExpression(nodes, wires) {
    const found = new Map(nodes.map((n) => [n.id, n])), visiting = /* @__PURE__ */ new Set(), cache = /* @__PURE__ */ new Map();
    function visit(id) {
      if (cache.has(id)) return cache.get(id);
      if (visiting.has(id)) return null;
      const node = found.get(id);
      if (!node) return null;
      if (INPUTS.includes(node.kind)) return node.kind;
      const arity = node.kind === "Q" ? 1 : gateArity(node.kind);
      if (!arity) return null;
      visiting.add(id);
      const args = Array.from({ length: arity }, (_, pin) => visit(wires.find((w) => w.to === id && w.pin === pin)?.from));
      visiting.delete(id);
      if (args.some((x) => x === null)) return null;
      const tree = node.kind === "Q" ? args[0] : logicNode(node.kind, ...args);
      cache.set(id, tree);
      return tree;
    }
    return visit("Q");
  }
  function canWire(nodes, wires, from, to, pin) {
    const a = nodes.find((n) => n.id === from), b = nodes.find((n) => n.id === to);
    if (!a || !b || a === b || a.kind === "Q" || !Number.isInteger(pin) || pin < 0 || pin >= (b.kind === "Q" ? 1 : gateArity(b.kind))) return false;
    const seen = /* @__PURE__ */ new Set(), queue = [to];
    while (queue.length) {
      const node = queue.pop();
      if (node === from) return false;
      if (seen.has(node)) continue;
      seen.add(node);
      wires.filter((w) => w.from === node).forEach((w) => queue.push(w.to));
    }
    return true;
  }

  // bytesize-pages-v27/dist/teacher/unit4.js
  var SYSTEMS_SOURCE = "https://www.aqa.org.uk/subjects/computer-science/gcse/computer-science-8525/specification/subject-content/computer-systems";
  var SYSTEMS_TOPICS = [
    ["hardware-software", "3.4.1", "Hardware and software", "▣", "Physical components and instructions", "#6974c4"],
    ["boolean-logic", "3.4.2", "Boolean logic", "⊕", "Gates, truth tables, circuits and expressions", "#9855a7"],
    ["software-classes", "3.4.3", "Software classification", "▤", "Operating systems, utilities and applications", "#357e80"],
    ["translators", "3.4.4", "Languages and translators", "↔", "Machine code, assembly and high-level code", "#845f32"],
    ["cpu-architecture", "3.4.5", "CPU and architecture", "▦", "CPU components, performance and instruction cycle", "#4c72ab"],
    ["memory-storage", "3.4.5", "Memory and storage", "▱", "RAM, ROM, local storage and cloud storage", "#568357"],
    ["embedded-systems", "3.4.5", "Embedded systems", "◉", "Dedicated and general-purpose computers", "#a45e79"]
  ];
  var records = {};
  function skill(id, topic, title, objective, hint, variants = []) {
    records[id] = { id, topic, title, objective, hint, variants };
  }
  skill("hardware-software-role", "hardware-software", "Hardware and software", "Distinguish physical hardware from software and explain how they work together.", "Which parts are physical? Which parts are instructions?", [
    ["A computer is running a drawing program. Explain the difference between the processor and the drawing program.", "The processor is hardware, a physical component.", "The drawing program is software, a set of instructions executed by the hardware."],
    ["A tablet takes a photograph. Give one example of hardware and one example of software from this process. Explain how the two work together.", "The physical camera is hardware.", "The camera application is software. It instructs the hardware to capture and store the image."],
    ["A pupil says that a keyboard and its driver are both hardware. Explain the mistake.", "The keyboard is physical hardware.", "The driver is software that helps the computer control or communicate with the keyboard."],
    ["Explain why a computer needs both hardware and software to run a word processor.", "Physical components include the processor and memory.", "The program provides instructions; the processor executes them and memory holds the program and data while it runs."]
  ]);
  skill("logic-gate-table", "boolean-logic", "Truth tables for gates", "Complete output columns for individual NOT, AND, OR and XOR gates.", "Evaluate the gate for each row in the order shown.");
  skill("logic-circuit-table", "boolean-logic", "Truth tables for circuits", "Construct a truth table for a simple circuit with up to three inputs.", "Follow the wires from the inputs. Work out intermediate gate outputs first.");
  skill("logic-table-read", "boolean-logic", "Interpret a truth table", "Find the output for an input combination or count the rows with a particular output.", "Read the input rows in the order shown and inspect Q.");
  skill("logic-expression-output", "boolean-logic", "Evaluate a Boolean expression", "Evaluate Boolean expressions using AQA notation.", "Evaluate the bracketed parts and apply an overbar only to the part it covers.");
  skill("logic-circuit-expression", "boolean-logic", "Circuit → Boolean expression", "Write a Boolean expression that represents a supplied circuit.", "Write an expression for each gate as you follow the wires towards Q.");
  skill("logic-expression-circuit", "boolean-logic", "Boolean expression → circuit", "Draw a circuit with AQA gate symbols from a supplied expression.", "Work out the gate needed for each operator. Place the gate for the outermost operation nearest Q.");
  skill("logic-modify", "boolean-logic", "Modify a logic circuit", "Change a circuit in a stated way and describe the effect.", "Keep the original inputs and work out where the new gate should go.");
  skill("software-types", "software-classes", "System and application software", "Classify software by whether it manages the system or helps the user perform a task.", "Ask who or what the software directly supports.", [
    ["Explain how an operating system differs from a spreadsheet application.", "An operating system is system software that manages resources and provides a platform for applications.", "A spreadsheet is application software that helps a user organise and calculate with data."],
    ["Classify a word processor and an operating system as system software or application software. Explain each choice.", "The word processor is application software: it helps a user create documents.", "The operating system is system software: it manages the computer and supports applications."],
    ["A photo editor and a backup utility are installed on a laptop. Explain which is application software and which is system software.", "The photo editor is application software for editing images.", "The backup utility is system software that helps maintain or protect stored data."]
  ]);
  skill("os-resources", "software-classes", "Operating system functions", "Explain how an operating system manages processor time, memory, devices, running applications and security.", "Name the resource and explain what the operating system does with it.", [
    ["A browser and a music player are open. Explain how the operating system allows both to make progress.", "It schedules processor time for the running tasks.", "It manages the applications and allocates memory to each."],
    ["A print job starts while a document is being edited. Explain two ways the operating system helps.", "It manages input/output by sending print data to the printer.", "It manages the running applications or schedules processor time while the user continues editing."],
    ["Explain how an operating system can manage access to files on a school computer.", "It authenticates users or applies permissions to accounts.", "It checks permissions before granting access to resources such as files."],
    ["Explain why an operating system allocates main memory when an application opens.", "A running application needs memory for instructions and data.", "The operating system allocates available space and tracks which regions are in use."]
  ]);
  skill("utility-purpose", "software-classes", "Utility programs", "Explain why maintenance and protection utilities are used.", "Name the maintenance task and explain the benefit.", [
    ["A teacher wants to recover the original version of a damaged file. Explain how a backup utility helps if it was run before the damage.", "It creates a separate copy of the data.", "A previously saved copy can be restored if the original is lost or corrupted."],
    ["Explain the purpose of an antivirus utility on a computer.", "It scans files or activity for signs of malicious software.", "It can block, quarantine or remove detected threats."],
    ["Explain why a disk cleanup utility might be run on a computer with little free storage.", "It identifies removable items such as temporary files.", "Removing unnecessary files frees space on secondary storage."]
  ]);
  skill("language-levels", "translators", "High-level and low-level languages", "Compare readability, portability and hardware control at different language levels.", "Think about how close each language is to the processor’s instructions.", [
    ["A team wants to maintain one program for several platforms. Give one reason to choose a high-level language and one drawback of using a low-level language.", "High-level code is generally easier to read, write and maintain. With suitable translators or runtimes it can be ported.", "Low-level code takes more detail to write and is usually tied to a processor instruction set."],
    ["A developer is programming a controller that needs direct access to processor-specific features. Explain one advantage and one disadvantage of using assembly language.", "Assembly gives detailed control of instructions and hardware resources.", "It is harder to write and maintain, and is specific to an instruction set."],
    ["Compare a high-level language with a low-level language, including a benefit of each.", "A high-level language provides abstractions that make programs easier for people to read and develop.", "A low-level language is closer to machine instructions and allows more direct hardware control."]
  ]);
  skill("machine-assembly", "translators", "Machine code and assembly", "Explain executable machine code and the one-to-one relationship between assembly instructions and machine instructions.", "Distinguish binary instructions from their mnemonic representations.", [
    ["Explain the relationship between an assembly instruction and a machine code instruction.", "An assembly instruction uses a readable mnemonic for a processor operation.", "Each assembly instruction is translated into a corresponding machine code instruction, which the processor can execute."],
    ["A computer stores a program as binary machine code. Explain why the same program might be written in assembly first.", "Machine code is expressed in binary and directly executed by the processor.", "Assembly mnemonics make the instructions easier for a programmer to read and edit; an assembler translates them."],
    ["A program written in assembly for one type of processor does not necessarily run on another. Explain why.", "Machine instructions depend on the processor instruction set.", "Assembly maps to that instruction set, so a different processor may require rewritten instructions."]
  ]);
  skill("translator-choice", "translators", "Compilers, interpreters and assemblers", "Explain the need for translation and distinguish the three translator types.", "Identify the source language and when or how it is translated.", [
    ["A developer wants to translate a complete high-level program into executable machine code before running it. Name the translator and explain what it does.", "A compiler.", "It translates the high-level source across the program and produces machine code that can be run later."],
    ["During testing a program is translated and executed one statement at a time. Name the translator and explain how this differs from compiling the whole program.", "An interpreter.", "It translates and runs statements during execution, rather than producing a separate complete compiled program first."],
    ["A programmer has written code using assembly mnemonics. Name the translator needed and describe its input and output.", "An assembler.", "It takes assembly code and translates assembly instructions to the corresponding machine code instructions."],
    ["Explain why a high-level program must be translated before its instructions can be executed by a processor.", "Processors execute machine instructions expressed in binary.", "A translator converts the human-readable source to instructions the processor can execute."]
  ]);
  skill("cpu-components", "cpu-architecture", "Components of the CPU", "Explain the roles of the ALU, control unit, clock, registers and buses.", "Name the component and connect it to the specific job.", [
    ["A processor compares two values and then changes the order of execution. Explain one role of the ALU and one role of the control unit.", "The ALU performs arithmetic and logical operations, such as the comparison.", "The control unit coordinates execution and directs the processor to the next required instruction."],
    ["Explain how a clock and registers help a processor carry out instructions.", "The clock provides timing signals that synchronise processor operations.", "Registers are small, fast locations within the CPU that temporarily hold data or instructions in use."],
    ["Describe the role of a bus when an instruction moves from main memory to the CPU.", "A bus provides shared signal paths between components.", "Signals identifying the location and the instruction data can travel between main memory and the processor."],
    ["Explain why both the control unit and ALU are needed for an instruction to add two values.", "The control unit coordinates the stages and sends control signals.", "The ALU carries out the addition."]
  ]);
  skill("cpu-performance", "cpu-architecture", "CPU performance", "Explain how clock speed, cores and cache can affect performance.", "Link your answer to operations per second, parallel work or access to data.", [
    ["Two otherwise identical CPUs have different clock speeds. Explain why the one with the higher clock speed may finish a task sooner.", "A higher clock speed provides more clock cycles per second.", "The CPU can perform more operations in a given time if other factors are the same."],
    ["Explain why increasing the number of cores may speed up some programs but not all programs.", "Multiple cores allow tasks or parts of a program to run in parallel.", "A program that cannot divide its work across cores may gain little or no speed from additional cores."],
    ["Explain how a larger CPU cache may improve performance.", "A larger cache can hold more frequently used instructions or data close to the CPU.", "The CPU may spend less time waiting for access to slower main memory."],
    ["For a program frequently reusing the same data, explain whether a larger cache or an extra core is more directly helpful.", "A larger cache is more directly linked to faster access to reused data.", "An extra core would help if the program could divide work into parallel tasks."]
  ]);
  skill("fetch-execute", "cpu-architecture", "Fetch, decode, execute", "Explain the stages of the repeated instruction cycle and the role of main memory.", "Trace one instruction from main memory through the CPU.", [
    ["Describe the three stages the CPU repeats to process instructions.", "Fetch the next instruction from main memory.", "Decode it to determine the operation.", "Execute the operation, which may read or write data."],
    ["The CPU has fetched an instruction to add two values. Describe what happens during decoding and execution.", "The CPU identifies the addition operation and any operands or locations it uses.", "The ALU performs the addition and the result is stored or used as directed."],
    ["Explain what is fetched, where it comes from, and why the processor then decodes it.", "The CPU fetches the next instruction from main memory.", "Decoding identifies what operation must be carried out and what data it uses."]
  ]);
  skill("memory-types", "memory-storage", "RAM, ROM, cache and registers", "Explain what each memory type is used for and why it is needed.", "Consider where the data is needed, how quickly, and whether it must survive power loss.", [
    ["Explain why data and instructions for an open program are held in RAM, and why ROM can hold start-up instructions.", "RAM is writable and holds instructions and data currently in use while power is on.", "ROM is non-volatile and can retain start-up instructions while power is off."],
    ["Explain the difference between cache and registers inside or close to a processor.", "Cache keeps frequently needed instructions and data available faster than main memory.", "Registers hold the specific values or instructions the processor is working with at that moment."],
    ["A running program repeatedly uses the same instructions. Explain roles for RAM, cache and registers.", "RAM holds programs and data currently in use.", "Cache keeps frequently used instructions close to the CPU.", "Registers hold individual instructions or values during processing."],
    ["Compare RAM and ROM in terms of volatility and one typical use for each.", "RAM is volatile: it loses contents when power is off. It is used for current programs and data.", "ROM is non-volatile: it retains its contents without power. It may hold start-up instructions."]
  ]);
  skill("memory-storage-distinction", "memory-storage", "Main memory and secondary storage", "Distinguish processor-accessible main memory from the long-term storage needed for programs and data.", "Compare direct access by the CPU and retention without power.", [
    ["A document disappears when a computer loses power before it is saved. Explain why saving it to an SSD prevents this loss.", "The unsaved changes were held in volatile RAM.", "The SSD is non-volatile secondary storage, so saved data remains after power is switched off."],
    ["A program is stored on a drive. Explain why it is loaded into main memory when it is run.", "The drive retains the program as secondary storage.", "The CPU directly accesses main memory to fetch the instructions while the program is running."],
    ["Give two differences between main memory and secondary storage and explain why a computer needs secondary storage.", "The CPU can directly access main memory; secondary storage is not directly accessed in that way.", "Secondary storage retains data when switched off. It is needed to keep programs and data for later use."]
  ]);
  skill("storage-operation", "memory-storage", "Solid-state and magnetic storage", "Explain the operation of SSDs and magnetic drives and compare suitability for a task.", "Link how each stores data to a practical benefit or drawback.", [
    ["Explain how a solid-state drive stores data and why it can be suitable for a laptop carried every day.", "An SSD uses electrical circuits to retain data without power.", "It has no moving parts, making it more resistant to shocks than a mechanical hard disk."],
    ["Describe how a magnetic hard disk reads and writes data.", "The disk has spinning platters with magnetisable surfaces.", "A moving head changes or senses magnetisation to write or read data."],
    ["A school needs a large capacity at low cost for local backups. Compare an SSD and a magnetic hard disk for this task.", "A magnetic hard disk typically costs less per unit of capacity.", "An SSD often reads and writes faster and has no moving parts, but may cost more for the same capacity."],
    ["Compare an SSD with a magnetic hard disk for a computer that must load large programs quickly.", "An SSD can access stored data without waiting for a platter or head to move.", "A magnetic disk has moving parts and usually has longer access times, but can offer cheaper high capacity."]
  ]);
  skill("cloud-v-local", "memory-storage", "Cloud and local storage", "Explain what cloud storage is and compare it with local storage.", "Consider where files are stored, how users reach them and what can interrupt access.", [
    ["A pupil wants to edit their work from home and school. Explain one advantage and one drawback of storing it in the cloud instead of on a local drive.", "Cloud files are held on remote storage and can be reached on different devices over a connection.", "The pupil may lose access if the network or service is unavailable."],
    ["Explain where data is physically held when saved to cloud storage. Give one difference from saving it on the computer’s SSD.", "A provider stores it remotely on magnetic or solid-state equipment.", "A local SSD is at the user’s device and can usually be accessed without an internet connection."],
    ["A department needs to share files between sites. Compare cloud storage and local storage for this use.", "Cloud storage can make controlled sharing and access across locations easier.", "Local storage can work offline and keep files under local control, but sharing between sites requires another transfer method."]
  ]);
  skill("embedded-purpose", "embedded-systems", "Embedded and general-purpose systems", "Distinguish an embedded system from a general-purpose computer and give examples.", "Ask whether the computer controls a specific function within another product.", [
    ["A washing machine controller and a desktop PC are both computers. Explain why only the washing machine controller is an embedded system.", "The washing machine controller is built into the appliance and controls a dedicated set of functions.", "A PC is general-purpose and can run many different applications."],
    ["Give an example of an embedded system and a non-embedded system. Explain what makes the embedded example different.", "A car’s anti-lock braking controller is built into the car for a specific control task.", "A general-purpose laptop can be used for many tasks by installing different applications."],
    ["A traffic light controller reads sensors and changes the lights. Explain how it differs from a general-purpose desktop computer.", "The controller is integrated into the traffic light system and performs a specific control function.", "A desktop is designed to support different programs and tasks."]
  ]);
  var SYSTEMS_SKILLS = Object.values(records).map((r) => [r.id, r.topic, r.title, r.objective, r.objective, r.hint]);
  var SYSTEMS_GUIDES = {
    "hardware-software": ["Hardware is made up of physical parts. Programs and other instructions are software.", "Software relies on the hardware to execute instructions and handle data."],
    "boolean-logic": ["Trace from inputs towards Q. Evaluate each gate only after its inputs are known.", "NOT reverses one bit. AND needs both 1s, OR needs at least one 1, and XOR needs exactly one 1.", "Use up to three independent inputs. Use a dot for AND, + for OR, ⊕ for XOR and an overbar for NOT."],
    "software-classes": ["System software manages or maintains the computer. Application software performs tasks for the user.", "Operating systems manage processor time, memory, input/output, applications and security. Utilities support maintenance and protection."],
    translators: ["Machine code is binary and directly executable. Assembly uses mnemonics that map to machine instructions.", "High-level languages use abstractions. A compiler translates a program, an interpreter translates and executes statements as it goes, and an assembler translates assembly."],
    "cpu-architecture": ["The ALU performs arithmetic and logic. The control unit coordinates work. The clock synchronises operations; registers hold values in use and buses carry signals.", "The instruction cycle repeats: fetch from main memory, decode, execute. Clock speed, cores and cache affect performance in different ways."],
    "memory-storage": ["RAM holds current data and instructions. ROM retains data without power. Cache holds frequently used values; registers hold values in immediate use.", "Main memory is directly accessible to the CPU. Secondary storage is non-volatile. Solid state and magnetic devices store data in different ways.", "Cloud storage holds data remotely on physical drives. Compare remote access and collaboration with connection dependence and local control."],
    "embedded-systems": ["An embedded computer controls a dedicated function within a larger device or system. A general-purpose computer supports many different applications."]
  };
  var BINARY = ["AND", "OR", "XOR"];
  var singles = [logicNode("NOT", "A"), logicNode("AND", "A", "B"), logicNode("OR", "A", "B"), logicNode("XOR", "A", "B")];
  var circuits = [
    logicNode("AND", logicNode("NOT", "A"), "B"),
    logicNode("OR", "A", logicNode("NOT", "B")),
    logicNode("XOR", logicNode("NOT", "A"), "B"),
    logicNode("NOT", logicNode("OR", "A", "B")),
    logicNode("NOT", logicNode("AND", "A", "B")),
    logicNode("NOT", logicNode("XOR", "A", "B")),
    ...BINARY.flatMap((outer) => BINARY.flatMap((inner) => [logicNode(outer, logicNode(inner, "A", "B"), "C"), logicNode(outer, "A", logicNode(inner, "B", "C")), logicNode(outer, logicNode(inner, "A", "B"), logicNode("NOT", "C"))]))
  ];
  var diagram = (tree) => logicCircuitFigure(tree);
  var expression = (tree) => `<span class="logic-expression">${logicExpressionHTML(tree)}</span>`;
  function makeSystemsQuestion(id, level, pick, { q: q2, written: written2, field: field2 }) {
    const record = records[id];
    const hint = record.hint;
    if (record.variants.length) {
      const [prompt, ...points] = pick(record.variants);
      return written2(prompt, points, hint);
    }
    const tree = id === "logic-gate-table" ? pick(singles) : pick(level === 1 ? circuits.slice(0, 6) : circuits.slice(level === 2 ? 0 : 6));
    const inputs = logicInputs(tree), rows = logicRows(tree), row = pick(rows), sequence = rows.map((r) => r.output).join("");
    const details = { tree, inputs, rows };
    if (id === "logic-gate-table" || id === "logic-circuit-table") {
      const gate = id === "logic-gate-table";
      const prompt = gate ? `Complete the Q column for the <strong>${tree.op}</strong> gate. Write the output bits from top to bottom.` : "Complete the Q column for this circuit. Write the output bits from top to bottom.";
      return q2(prompt, [field2("Q column (top to bottom)", sequence, "bitstream")], [`Evaluate each input row from left to right through the circuit.`, `The Q outputs in table order are <code>${sequence}</code>.`], hint, (gate ? "" : diagram(tree)) + logicTable(tree, { blank: true }), details);
    }
    if (id === "logic-table-read") {
      const pattern = inputs.map((name, i) => `${name} = ${row.bits[i]}`).join(", ");
      return q2(`Use the truth table to find Q when <strong>${pattern}</strong>.`, [field2("Output Q", row.output)], [`Find the row with ${pattern}.`, `Its Q value is ${row.output}.`], hint, logicTable(tree), details);
    }
    if (id === "logic-expression-output") {
      const pattern = inputs.map((name, i) => `${name} = ${row.bits[i]}`).join(", ");
      return q2(`For <strong>${pattern}</strong>, evaluate Q = ${expression(tree)}.`, [field2("Output Q", row.output)], [`Substitute the given input bits into the expression.`, `Evaluate the inner operations first. Q = ${row.output}.`], hint, "", details);
    }
    if (id === "logic-circuit-expression") return { ...written2("Write the Boolean expression for output Q of this circuit. Use AQA notation.", [`Q = ${expression(tree)}`, "Check that your brackets and any overbar apply to the correct inputs or sub-expression."], hint, diagram(tree)), meta: details };
    if (id === "logic-expression-circuit") return { ...written2(`On paper or a whiteboard, draw the circuit for Q = ${expression(tree)}. Label its inputs and Q.`, ["Use the corresponding gate for each operator, wired from the inputs towards Q.", "Compare your drawing with the model diagram."], hint), meta: details, solutionFigure: diagram(tree) };
    const changed = logicNode("NOT", tree);
    return { ...written2("Draw a modified circuit so that Q is the opposite of the original output for every input row. Label Q on your new circuit.", ["Connect the original output to a NOT gate, then label its output Q.", "Every original 0 becomes 1 and every original 1 becomes 0."], hint, diagram(tree)), meta: details, solutionFigure: diagram(changed) };
  }

  // bytesize-pages-v27/dist/teacher/bank.js
  var SOURCE = "https://www.aqa.org.uk/subjects/computer-science/gcse/computer-science-8525/specification/subject-content/fundamentals-of-data-representation";
  var TOPICS = [
    ["bases", "3.3.1", "Number bases", "01", "What a bit pattern means", "#7260cf"],
    ["conversions", "3.3.2", "Base conversions", "⇄", "Binary, decimal and hexadecimal", "#536acb"],
    ["units", "3.3.3", "Units of information", "B", "Bits, bytes and decimal prefixes", "#25818b"],
    ["arithmetic", "3.3.4", "Binary arithmetic", "+", "Addition and logical shifts", "#a46b20"],
    ["characters", "3.3.5", "Character encoding", "Aa", "ASCII, sequences and Unicode", "#ac5278"],
    ["images", "3.3.6", "Representing images", "▦", "Pixels, colour depth and bitmaps", "#3a8a67"],
    ["sound", "3.3.7", "Representing sound", "∿", "Sampling and file sizes", "#386f9c"],
    ["compression", "3.3.8", "Data compression", "⋈", "Huffman coding and RLE", "#8a61ab"],
    ...SYSTEMS_TOPICS
  ].map(([id, ref, title, icon, desc, color]) => ({ id, ref, title, icon, desc, color, unit: ref.startsWith("3.4.") ? "4" : "3" }));
  var UNITS = [{ id: "3", title: "Data representation" }, { id: "4", title: "Computer systems" }];
  var skill2 = (id, topic, title, desc, objective, misconception) => ({ id, topic, title, desc, objective, misconception, ref: TOPICS.find((t) => t.id === topic).ref });
  var SKILLS = [
    skill2("base-facts", "bases", "Recognise number bases", "Digits, base values and place value.", "Recognise base 2, base 10 and base 16.", "The base describes the number of available digits, not the number of digits in a value."),
    skill2("binary-data", "bases", "Why computers use binary", "Data, instructions and two states.", "Explain how two states can represent bits.", "Binary is used for instructions as well as stored data."),
    skill2("hex-purpose", "bases", "Why use hexadecimal?", "Compact, readable bit patterns.", "Explain why hexadecimal is useful to people.", "Hexadecimal is a convenient representation; the computer still uses binary."),
    skill2("bit-context", "bases", "One pattern, different meanings", "Interpret binary using its context.", "Explain why a bit pattern needs an interpretation.", "A bit pattern does not identify its own data type."),
    skill2("bin-dec", "conversions", "Binary → decimal", "Add the place values containing a 1.", "Convert an eight-bit binary value to decimal.", "The rightmost place has a value of 1, not 2."),
    skill2("dec-bin", "conversions", "Decimal → binary", "Build a complete eight-bit answer.", "Represent decimal values from 0 to 255 using eight bits.", "Keep the zero placeholders between the ones."),
    skill2("bin-hex", "conversions", "Binary → hexadecimal", "Split into two groups of four.", "Convert each four-bit group to a hexadecimal digit.", "Each hexadecimal digit represents four bits, not eight."),
    skill2("hex-bin", "conversions", "Hexadecimal → binary", "Expand each digit to four bits.", "Convert a two-digit hexadecimal number to eight bits.", "A leading zero inside a four-bit group is significant as a placeholder."),
    skill2("hex-dec", "conversions", "Hexadecimal → decimal", "Use the 16 and 1 place values.", "Convert a hexadecimal value in the range 00 to FF.", "A means 10; F means 15."),
    skill2("dec-hex", "conversions", "Decimal → hexadecimal", "Find the quotient and remainder.", "Convert a decimal value to two hexadecimal digits.", "A remainder of 10 is written A, not 10."),
    skill2("bits-bytes", "units", "Bits ↔ bytes", "Eight bits make one byte.", "Convert correctly between bits and bytes.", "b is a bit; B is a byte. Divide bits by eight to find bytes."),
    skill2("prefixes", "units", "Convert storage units", "kB, MB, GB and TB using 1,000.", "Apply the decimal prefixes required by AQA.", "Use 1,000 for these decimal prefixes, not 1,024."),
    skill2("compare-units", "units", "Compare capacities", "Put different units on the same scale.", "Compare quantities expressed in different storage units.", "Convert to a shared unit before comparing the numbers."),
    skill2("add-two", "arithmetic", "Add two binary numbers", "Column addition with safe eight-bit totals.", "Add two binary values without a ninth-bit carry.", "1 + 1 is 10 in binary: write 0 and carry 1."),
    skill2("add-three", "arithmetic", "Add three binary numbers", "Track each column and its incoming carry.", "Add three binary values with a maximum eight-bit answer.", "1 + 1 + 1 is 11: write 1 and carry 1."),
    skill2("shift-left", "arithmetic", "Logical shift left", "Move bits and fill the right with zeros.", "Apply a logical left shift within an eight-bit register.", "A bit shifted off the left edge is lost."),
    skill2("shift-right", "arithmetic", "Logical shift right", "Move bits and fill the left with zeros.", "Apply a logical right shift within an eight-bit register.", "Logical shifts always fill vacated positions with zeros."),
    skill2("shift-effect", "arithmetic", "Explain a shift’s effect", "Powers of two and discarded bits.", "Relate logical shifts to multiplication and whole-number division.", "A left shift only gives the expected multiplication when no 1 bits are lost."),
    skill2("encode-text", "characters", "Characters → ASCII codes", "Use a supplied character table.", "Encode a short text as decimal or binary ASCII codes.", "Upper-case and lower-case letters have different codes."),
    skill2("ascii-word-size", "characters", "Word file size · 7-bit ASCII", "Count letters, then multiply by seven.", "Calculate the size in bits of a 3–6 letter word stored using 7-bit ASCII.", "Each character uses seven bits in this question, not eight. Exclude metadata and padding."),
    skill2("ascii-word-decimal", "characters", "Word → decimal ASCII", "Convert 3–6 letters into decimal character codes.", "Encode a 3–6 letter word using the supplied ASCII group reference.", "Keep the letter case and the order of the characters."),
    skill2("ascii-word-binary", "characters", "Word → 7-bit ASCII binary", "Write one seven-bit code for each of 3–6 letters.", "Encode a 3–6 letter word as seven-bit binary ASCII codes.", "Each character needs exactly seven bits; do not add an eighth bit."),
    skill2("decode-text", "characters", "ASCII codes → characters", "Decode a sequence with a table.", "Read decimal and binary character codes.", "Digits such as 7 have character codes; that code is not the number 7."),
    skill2("code-sequences", "characters", "Use character sequences", "Upper case, lower case and digits.", "Calculate neighbouring codes within a character group.", "The gap between A and a is not part of one continuous alphabet."),
    skill2("unicode", "characters", "ASCII and Unicode", "Character sets and wider language support.", "Explain Unicode’s purpose and its relationship to ASCII.", "Unicode uses the same codes as ASCII from 0 to 127; it is not always a fixed 16-bit format."),
    skill2("pixels", "images", "Pixels and image dimensions", "Picture elements, width and height.", "Explain how a bitmap is made from pixels.", "Image dimensions are width × height; count both dimensions."),
    skill2("colour-depth", "images", "Colour depth", "Bits per pixel and possible colours.", "Connect colour depth to the range of pixel values.", "Colour depth counts bits for each pixel, not bytes for the whole image."),
    skill2("image-size", "images", "Calculate bitmap file size", "Width × height × colour depth.", "Calculate raw bitmap sizes in bits and bytes.", "Divide by eight only when converting bits to bytes. Ignore metadata unless stated."),
    skill2("bitmap-encode", "images", "Bitmap → binary data", "Read pixels row by row using a key.", "Encode a simple monochrome bitmap.", "Use the stated colour key and reset at the start of each row."),
    skill2("bitmap-decode", "images", "Binary data → bitmap", "Turn each bit into a pixel.", "Draw a simple bitmap from its binary data.", "A zero is still a pixel; it is not a gap."),
    skill2("image-change", "images", "Changes to image size", "Explain and calculate the impact.", "Relate pixel count and colour depth to file size.", "Doubling both width and height quadruples the number of pixels."),
    skill2("sampling", "sound", "How sound is sampled", "Amplitude, sampling rate and resolution.", "Describe analogue sound represented by digital samples.", "Sampling rate is samples per second; sample resolution is bits per sample."),
    skill2("sound-size", "sound", "Calculate sound file size", "Rate × resolution × duration.", "Calculate raw sound size using the AQA formula.", "Convert minutes to seconds, and bits to bytes when requested."),
    skill2("sound-change", "sound", "Change the sound settings", "Predict size and representation effects.", "Explain the effect of changing rate or sample resolution.", "Higher sample resolution measures amplitude more precisely; it does not make the sound louder."),
    skill2("sound-missing", "sound", "Find a missing sound value", "Rearrange the file-size calculation.", "Find rate, resolution or duration from the other values.", "Keep file size in bits when using the rate × resolution × seconds formula."),
    skill2("compression-purpose", "compression", "Explain data compression", "Storage, transfer and exact recovery.", "Explain reasons for reducing the bits needed to store data.", "Compression is about the representation, not simply deleting meaningful content."),
    skill2("huffman-read", "compression", "Read a Huffman tree", "Follow the 0 and 1 branches.", "Read a character code from a labelled tree.", "Start at the root for every character."),
    skill2("huffman-explain", "compression", "Why Huffman coding works", "Frequency, short codes and exact recovery.", "Explain how variable-length codes can reduce storage.", "The most frequent characters should not be given the longest codes."),
    skill2("huffman-encode", "compression", "Encode using Huffman", "Join variable-length character codes.", "Encode a message using its supplied tree.", "Do not assume all characters use the same number of bits."),
    skill2("huffman-decode", "compression", "Decode a Huffman message", "Return to the root after each leaf.", "Decode an encoded bitstream using its supplied tree.", "A code ends when a leaf is reached, not after a fixed number of bits."),
    skill2("huffman-size", "compression", "Calculate Huffman savings", "Frequency × code length, then compare ASCII.", "Calculate compressed size, ASCII size and the bits saved.", "Count bits, not the decimal value of the bitstream. The ASCII width is stated in the question."),
    skill2("rle-encode", "compression", "Encode using RLE", "Store consecutive count/value pairs.", "Express a binary row using run length encoding.", "Only combine adjacent identical values; do not merge separated runs."),
    skill2("rle-decode", "compression", "Decode using RLE", "Expand every frequency/data pair.", "Reconstruct binary data from count/value pairs.", "The first value in a pair is the count; the second is the data value."),
    ...SYSTEMS_SKILLS.map((args) => skill2(...args))
  ];
  var UNIT3_IDS = Object.freeze(SKILLS.filter((s) => s.ref.startsWith("3.3.")).map((s) => s.id));
  function interleaveUnits(ids) {
    const data = [], systems = [];
    for (const id of ids) (UNIT3_IDS.includes(id) ? data : systems).push(id);
    if (!data.length || !systems.length) return ids;
    const [first, second] = UNIT3_IDS.includes(ids[0]) ? [data, systems] : [systems, data];
    return Array.from({ length: Math.max(first.length, second.length) }, (_, i) => [first[i], second[i]]).flat().filter(Boolean);
  }
  var TOPIC_GUIDES = {
    ...SYSTEMS_GUIDES,
    bases: ["Binary uses two digits, 0 and 1; decimal uses ten; hexadecimal uses sixteen, 0–9 and A–F.", "Computers store data and instructions as bit patterns. Two distinguishable electronic states can represent the two bit values.", "Interpretation depends on the encoding and context. The same bits can be read as a number, a character or part of an image or sound.", "A hexadecimal digit represents four bits, giving people a shorter representation of long binary patterns."],
    conversions: ["Eight bits represent values from 0 to 255. The eight place values are 128, 64, 32, 16, 8, 4, 2 and 1.", "To read binary, add the place values containing 1. To write binary, select the place values that sum to the decimal value.", "Convert between binary and hexadecimal in groups of four bits. Use leading zero placeholders within a group.", "For a two-digit hexadecimal value, multiply the left digit’s value by 16 and add the right digit’s value. A–F represent 10–15."],
    units: ["A bit is one binary digit; a byte is eight bits. The symbols b and B have different meanings.", "The decimal prefixes in this unit use factors of 1,000: kB, MB, GB and TB.", "To convert to a smaller byte unit, multiply by 1,000 for each step; to a larger unit, divide. Convert bytes to bits separately using eight.", "Put quantities in the same unit before comparing them."],
    arithmetic: ["In binary addition, 1 + 1 = 10; 1 + 1 + 1 = 11. Write the units bit and carry to the next column.", "These generators use at most three values, at most eight bits per value, a maximum total of three in each full column and no carry beyond bit eight.", "A logical shift moves all bits and fills the vacated positions with zeros. Bits that leave the register are discarded.", "A left shift by n places multiplies by 2^n only if no 1 bits are lost. A logical right shift gives whole-number division by 2^n, discarding any remainder."],
    characters: ["A character set assigns numeric codes to characters so they can be stored as binary.", "7-bit ASCII has 128 codes. Capital letters, lower-case letters and digits each form their own sequential groups.", "A = 65, a = 97 and the character 0 = 48. Add the character’s offset within the group to calculate its code.", "For a word stored as 7-bit ASCII, data size in bits = number of characters × 7. These word-size questions exclude metadata and padding. Write each binary character code using exactly seven bits.", "Unicode includes characters from many writing systems and special symbols. Its codes 0–127 match ASCII. No fixed Unicode bit width or UTF variant is assumed here."],
    images: ["A pixel is one picture element. A bitmap stores an image as a grid of pixel values.", "Image dimensions are width × height in pixels. Colour depth is the number of bits used for each pixel.", "With d bits per pixel, there are up to 2^d different pixel values or colours.", "Raw size in bits = width × height × colour depth. Divide by eight for bytes. These questions exclude metadata.", "Increasing pixel count or colour depth increases raw storage size. Doubling both dimensions quadruples pixel count. Use the supplied colour key when reading binary pixel data."],
    sound: ["Sound is analogue; a digital recording stores a sequence of measurements of its amplitude.", "A sample is the amplitude measured at one point in time. Sampling rate is the number of samples each second, measured in Hz.", "Sample resolution is the number of bits used for each sample. More bits allow more distinct amplitude values and a more precise measurement.", "A higher sampling rate takes more frequent measurements, following changes in the signal more closely.", "Raw size in bits = sampling rate × sample resolution × duration in seconds. These questions use one stream of samples and exclude metadata."],
    compression: ["Compression reduces the number of bits needed to represent data. Smaller files use less storage and can transfer more quickly over the same connection.", "Huffman coding uses variable-length character codes. Frequent characters receive shorter codes, reducing the weighted total of frequency × code length.", "A Huffman tree is built by repeatedly combining the two least frequent available nodes. A character’s code is its path from the root to its leaf using the labelled branches.", "Decode by following bits to a leaf, writing that character and returning to the root. No complete character code is a prefix of another.", "For a message, Huffman size = the sum of frequency × code length. Compare with characters × stated ASCII width; subtract to find the bits saved. These exercises exclude the tree and metadata.", "RLE replaces consecutive identical values with count/value pairs. It works well for long repeated runs; runs reset when the value changes. Exact original data can be reconstructed from both of these encodings."]
  };
  function rng(seed) {
    let a = Number(seed) >>> 0;
    return () => {
      a += 1831565813;
      let t = a;
      t = Math.imul(t ^ t >>> 15, t | 1);
      t ^= t + Math.imul(t ^ t >>> 7, t | 61);
      return ((t ^ t >>> 14) >>> 0) / 4294967296;
    };
  }
  var bin = (n, width2 = 8) => n.toString(2).padStart(width2, "0");
  var hex = (n) => n.toString(16).toUpperCase().padStart(2, "0");
  var fmt = (n) => Number(n).toLocaleString("en-GB", { maximumFractionDigits: 6 });
  var esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
  var big = (s) => `<div class="number-display">${s}</div>`;
  var table = (heads, rows) => `<div class="table-wrap"><table><thead><tr>${heads.map((x) => `<th>${x}</th>`).join("")}</tr></thead><tbody>${rows.map((r) => `<tr>${r.map((x) => `<td>${x}</td>`).join("")}</tr>`).join("")}</tbody></table></div>`;
  var weights = [128, 64, 32, 16, 8, 4, 2, 1];
  var placeTable = (n) => table(weights, [[...bin(n)].map((x) => `<b>${x}</b>`)]);
  function bitmapFigure(bits, w = 4, interactive = false, id = "") {
    return `<div class="bitmap-grid ${interactive ? "editable" : ""}" style="--cols:${w}" ${interactive ? 'role="group" aria-label="Bitmap answer"' : ""}>${[...bits].map((b, i) => interactive ? `<button type="button" class="pixel ${b === "1" ? "on" : ""}" data-pixel="${i}" data-group="${id}" aria-label="Row ${Math.floor(i / w) + 1}, column ${i % w + 1}" aria-pressed="${b === "1"}"></button>` : `<span class="pixel ${b === "1" ? "on" : ""}"></span>`).join("")}</div>`;
  }
  var key = '<p class="figure-caption">Key: 0 = white · 1 = dark. Read each row from left to right.</p>';
  function huffmanData(text) {
    const counts = {};
    for (const c of text) counts[c] = (counts[c] || 0) + 1;
    let serial = 0;
    const queue = Object.entries(counts).map(([c, f]) => ({ c, f, order: serial++ }));
    while (queue.length > 1) {
      queue.sort((a, b) => a.f - b.f || a.order - b.order);
      const left = queue.shift(), right = queue.shift();
      queue.push({ f: left.f + right.f, left, right, order: serial++ });
    }
    const root = queue[0], codes = {};
    function walk(n, p) {
      if (n.c !== void 0) codes[n.c] = p || "0";
      else {
        walk(n.left, p + "0");
        walk(n.right, p + "1");
      }
    }
    walk(root, "");
    return { root, codes, counts, encoded: [...text].map((c) => codes[c]).join(""), text };
  }
  function treeFigure(data, { leafSpacing = 88 } = {}) {
    let leaf = 0, depth = 0;
    const nodes = [], edges = [];
    function layout(n, d) {
      const o = { n, y: 34 + d * 74 };
      depth = Math.max(depth, d);
      if (n.c !== void 0) o.x = 42 + leaf++ * leafSpacing;
      else {
        const l = layout(n.left, d + 1), r = layout(n.right, d + 1);
        o.x = (l.x + r.x) / 2;
        edges.push([o, l, 0], [o, r, 1]);
      }
      nodes.push(o);
      return o;
    }
    layout(data.root, 0);
    const w = Math.max(180, 88 + (leaf - 1) * leafSpacing), h = depth * 74 + 74;
    return `<svg class="huffman-tree" viewBox="0 0 ${w} ${h}" role="img" aria-label="Huffman tree. Each node shows its frequency; left branches are 0 and right branches are 1.">${edges.map(([a, b, v]) => `<line x1="${a.x}" y1="${a.y}" x2="${b.x}" y2="${b.y}" stroke="currentColor" stroke-width="1.6"/><text x="${(a.x + b.x) / 2 + (v ? 9 : -9)}" y="${(a.y + b.y) / 2}" text-anchor="middle" class="edge-label">${v}</text>`).join("")}${nodes.map(({ n, x, y }) => `<circle cx="${x}" cy="${y}" r="20" fill="${n.c !== void 0 ? "#ede8ff" : "#f4f6fa"}" stroke="#8e81b3"/><text x="${x}" y="${y + 5}" text-anchor="middle">${n.f}</text>${n.c !== void 0 ? `<text class="leaf-label" x="${x}" y="${y + 39}" text-anchor="middle">${n.c === " " ? "space" : esc(n.c)}</text>` : ""}`).join("")}</svg>`;
  }
  function samplingFigure(rate = 8) {
    const points = Array.from({ length: 61 }, (_, i) => {
      const x = 20 + i * 4;
      return [x, 64 - 36 * Math.sin(i / 60 * Math.PI * 3)];
    });
    const sampled = Array.from({ length: rate }, (_, i) => {
      const p = i / (rate - 1);
      return [20 + p * 240, 64 - 36 * Math.sin(p * Math.PI * 3)];
    });
    return `<svg class="waveform" viewBox="0 0 290 150" role="img" aria-label="An analogue wave with amplitude measurements at equally spaced sampling times"><line x1="20" y1="118" x2="275" y2="118" stroke="#9aa7b6"/><line x1="20" y1="14" x2="20" y2="118" stroke="#9aa7b6"/><polyline points="${points.map((p) => p.join(",")).join(" ")}" fill="none" stroke="#9183c4" stroke-width="2.5"/>${sampled.map(([x, y]) => `<line x1="${x}" y1="118" x2="${x}" y2="${y}" stroke="#2d8d78" stroke-dasharray="3 3"/><circle cx="${x}" cy="${y}" r="4" fill="#2d8d78"/>`).join("")}<text x="145" y="142" text-anchor="middle">time →</text><text x="30" y="14">amplitude</text></svg>`;
  }
  var ascii = () => `<div class="ascii-ref">${table(["Group", "First code", "Last code"], [["A–Z", "A = 65", "Z = 90"], ["a–z", "a = 97", "z = 122"], ["0–9", "0 = 48", "9 = 57"], ["space", "32", "32"]])}</div>`;
  var field = (label, answer, kind = "number") => ({ label, answer: String(answer), kind });
  function q(prompt, fields, steps, hint, figure = "", meta = {}) {
    return { prompt, fields, steps: steps.map((s, i) => ({ title: `Step ${i + 1}`, body: s })), hint, figure, meta, kind: fields.length ? "exact" : "written" };
  }
  function written(prompt, points, hint, figure = "") {
    const r = q(prompt, [], points, hint, figure);
    r.points = points;
    return r;
  }
  function makeQuestion(skillId, level = 2, seed = 1, options = {}) {
    const sk = SKILLS.find((s) => s.id === skillId);
    if (!sk) throw Error("Unknown skill");
    level = Math.min(3, Math.max(1, Number(level) || 2));
    const rand = rng(seed), int = (a, b) => Math.floor(rand() * (b - a + 1)) + a, pick = (a) => a[int(0, a.length - 1)];
    const n = int(level === 1 ? 0 : 16, level === 1 ? 63 : 255), bits = bin(n), hx = hex(n);
    let r;
    if (sk.ref.startsWith("3.4.")) {
      r = makeSystemsQuestion(skillId, level, pick, { q, written, field });
    } else if (skillId === "base-facts") {
      const b = pick([2, 10, 16]), digits = b === 2 ? "0 and 1" : b === 10 ? "0 to 9" : "0 to 9 and A to F";
      r = q(`State the base of <strong>${b === 2 ? "binary" : b === 10 ? "decimal" : "hexadecimal"}</strong>. Then state how many different digit symbols it uses.`, [field("Base", b), field("Number of digit symbols", b)], [`The base is ${b}.`, `There are ${b} symbols: ${digits}.`], "The base tells you how many different digit symbols are available.");
      if (level === 3) r = written(`A learner says “${b === 2 ? "10 in binary means ten" : b === 16 ? "10 in hexadecimal means ten" : "10 has the same value in every number base"}”. Explain the error.`, ["The place values depend on the base.", "10 represents one group of the base and zero units: binary 10 is decimal 2; hexadecimal 10 is decimal 16."], "Consider the value of the left-hand place in a two-digit number.");
    } else if (skillId === "binary-data") {
      const thing = pick(["a photograph", "a spoken message", "a computer instruction", "a paragraph of text", "a game sound effect"]);
      r = written(`Explain how a computer can represent ${thing} using binary.`, ["A bit has one of two values, 0 or 1.", "Electronic components can reliably distinguish two states, such as a high or low voltage.", "Patterns of bits represent data and instructions according to an agreed encoding."], "Connect two physical states to two bit values, then to longer patterns.");
    } else if (skillId === "hex-purpose") {
      r = written(`A technician is reading the bit pattern <code>${bits}</code>. Explain why writing it as hexadecimal <code>${hx}</code> can be useful.`, ["One hexadecimal digit represents four binary bits.", "The same eight-bit pattern takes two hexadecimal digits.", "The shorter representation is easier for a person to read, copy and check."], "Compare the number of written symbols.");
    } else if (skillId === "bit-context") {
      const value = pick([65, 66, 67, 90, 97, 98, 48, 49]), character = String.fromCharCode(value);
      r = written(`The pattern <code>${bin(value)}</code> can represent the decimal integer ${value} or the character ${character}. Explain why the same pattern can have different meanings.`, ["A bit pattern is a sequence of 0s and 1s.", "Software interprets the pattern using its data type or encoding.", `Interpreted as a decimal integer it is ${value}; interpreted as ASCII it is ${character}.`], "Does the bit pattern itself contain a label saying what kind of data it is?");
    } else if (["bin-dec", "dec-bin", "bin-hex", "hex-bin", "hex-dec", "dec-hex"].includes(skillId)) {
      const sum = weights.filter((v, i) => bits[i] === "1");
      const total = sum.length ? sum.join(" + ") : "0";
      const lo = n % 16, hi = Math.floor(n / 16), digit = (v) => v.toString(16).toUpperCase();
      if (skillId === "bin-dec") r = q(`Convert this binary number to decimal.${big(bits)}`, [field("Decimal value", n)], [`Use the place values 128, 64, 32, 16, 8, 4, 2, 1.`, `Select the columns containing 1: ${total}.`, `${total} = ${n}.`], "Add only the place values whose bits are 1.", placeTable(n));
      if (skillId === "dec-bin") r = q(`Write <strong>${n}</strong> in binary. Use exactly eight bits.`, [field("Eight-bit binary", bits, "binary")], [`Start with the place values 128, 64, 32, 16, 8, 4, 2, 1.`, `${n} = ${total}; place 1 in those columns and 0 in the others.`, `The eight-bit result is ${bits}.`], "Work from the largest place value down to 1.", level === 1 ? placeTable(0) : "");
      if (skillId === "bin-hex") r = q(`Convert this binary value to two hexadecimal digits.${big(bits.slice(0, 4) + " " + bits.slice(4))}`, [field("Hexadecimal value", hx, "hex")], [`Split the bits into ${bits.slice(0, 4)} and ${bits.slice(4)}.`, `The groups have decimal values ${hi} and ${lo}.`, `Write the hexadecimal digits ${digit(hi)} and ${digit(lo)}: ${hx}.`], "Treat each group of four bits as a separate value from 0 to 15.");
      if (skillId === "hex-bin") r = q(`Convert hexadecimal <strong>${hx}</strong> to eight-bit binary.`, [field("Eight-bit binary", bits, "binary")], [`${hx[0]} represents ${hi}; ${hx[1]} represents ${lo}.`, `Write each digit using four bits: ${bits.slice(0, 4)} and ${bits.slice(4)}.`, `Join the groups: ${bits}.`], "Give each hexadecimal digit its own four-bit group.");
      if (skillId === "hex-dec") r = q(`Convert hexadecimal <strong>${hx}</strong> to decimal.`, [field("Decimal value", n)], [`The left digit is worth ${hi} × 16.`, `The right digit is worth ${lo} × 1.`, `${hi * 16} + ${lo} = ${n}.`], "Use 16 and 1 as the two place values.");
      if (skillId === "dec-hex") r = q(`Convert decimal <strong>${n}</strong> to two hexadecimal digits.`, [field("Hexadecimal value", hx, "hex")], [`${n} ÷ 16 gives ${hi} with remainder ${lo}.`, `The quotient is digit ${digit(hi)}; the remainder is digit ${digit(lo)}.`, `The answer is ${hx}.`], "Find how many complete groups of 16 there are, then the remainder.");
      if (level === 3) {
        const extraKind = { "bin-dec": "hex", "dec-bin": "hex", "bin-hex": "number", "hex-bin": "number", "hex-dec": "binary", "dec-hex": "binary" }[skillId], label = extraKind === "binary" ? "Eight-bit binary" : extraKind === "hex" ? "Hexadecimal value" : "Decimal value";
        r.prompt += `<p>Also write the same value in <strong>${extraKind === "binary" ? "eight-bit binary" : extraKind === "hex" ? "two-digit hexadecimal" : "decimal"}</strong>.</p>`;
        r.fields.push(field(label, extraKind === "binary" ? bits : extraKind === "hex" ? hx : n, extraKind));
        r.steps.push({ title: "Cross-check", body: `The equivalent representations are ${bits} in binary, ${n} in decimal and ${hx} in hexadecimal.` });
      }
      r.meta = { n, bits, hx };
    } else if (skillId === "bits-bytes") {
      const bytes = int(1, level === 1 ? 20 : 250), toBits = rand() < 0.5;
      r = q(`Convert <strong>${fmt(toBits ? bytes : bytes * 8)} ${toBits ? "bytes (B)" : "bits (b)"}</strong> to ${toBits ? "bits (b)" : "bytes (B)"}.`, [field(toBits ? "Bits (b)" : "Bytes (B)", toBits ? bytes * 8 : bytes)], [`One byte contains eight bits.`, `${fmt(toBits ? bytes : bytes * 8)} ${toBits ? "×" : "÷"} 8 = ${fmt(toBits ? bytes * 8 : bytes)} ${toBits ? "b" : "B"}.`], "Going from bytes to bits increases the number.");
    } else if (skillId === "prefixes") {
      const u = ["B", "kB", "MB", "GB", "TB"], a = int(0, 3), b = level === 1 ? a + 1 : Math.min(4, a + int(1, 2)), reverse = rand() < 0.5, from = reverse ? b : a, to = reverse ? a : b;
      const base = int(1, 25), given = reverse ? base : base * 1e3 ** (b - a), ans = reverse ? base * 1e3 ** (b - a) : base;
      r = q(`Convert <strong>${fmt(given)} ${u[from]}</strong> to <strong>${u[to]}</strong>. Use decimal prefixes.`, [field(`Capacity (${u[to]})`, ans)], [`Each step between B, kB, MB, GB and TB is a factor of 1,000.`, `There are ${b - a} unit steps. ${reverse ? "Multiply" : "Divide"} by ${fmt(1e3 ** (b - a))}.`, `${fmt(given)} ${reverse ? "×" : "÷"} ${fmt(1e3 ** (b - a))} = ${fmt(ans)} ${u[to]}.`], "Larger units require a smaller numerical value.");
    } else if (skillId === "compare-units") {
      const a = int(1, 9), delta = pick([-100, 0, 100, 500]), b = a * 1e3 + delta, op = a * 1e3 === b ? "=" : a * 1e3 > b ? ">" : "<";
      r = q(`Insert <strong>&lt;, = or &gt;</strong>.${big(`${a} GB &nbsp; ? &nbsp; ${fmt(b)} MB`)}`, [field("Comparison symbol", op, "operator")], [`Convert ${a} GB to ${fmt(a * 1e3)} MB.`, `Compare ${fmt(a * 1e3)} MB with ${fmt(b)} MB.`, `${a} GB ${op} ${fmt(b)} MB.`], "First convert gigabytes to megabytes.");
    } else if (skillId === "add-two" || skillId === "add-three") {
      const count = skillId === "add-two" ? 2 : 3;
      let values, total, columnTotals, attempt = 0;
      do {
        values = Array.from({ length: count }, () => int(1, level === 1 ? 31 : 127));
        total = values.reduce((a, b) => a + b, 0);
        let carry = 0;
        columnTotals = [];
        for (let i = 0; i < 8; i++) {
          const t = values.reduce((s, v) => s + (v >> i & 1), carry);
          columnTotals.push(t);
          carry = Math.floor(t / 2);
        }
        attempt++;
      } while ((total > 255 || columnTotals.some((v) => v > 3)) && attempt < 1e4);
      const rows = values.map((binValue) => bin(binValue));
      const steps = columnTotals.map((t, i) => `Column ${i + 1} from the right (place ${2 ** i}): total ${t} = ${t.toString(2)} in binary. Write ${t % 2}${t >= 2 ? " and carry 1" : " with no carry"}.`);
      steps.push(`The answer is ${bin(total)} (${total} in decimal).`);
      r = q(`Add these ${count === 2 ? "two" : "three"} eight-bit binary numbers.`, [field("Eight-bit sum", bin(total), "addition")], steps, "Work from the right. Include any incoming carry.", `<div class="binary-sum">${rows.map((b, i) => `<div>${i === rows.length - 1 ? "<span>+</span>" : ""}${b}</div>`).join("")}<hr/></div>`, { values, total, columnTotals });
    } else if (skillId === "shift-left" || skillId === "shift-right") {
      const left = skillId === "shift-left", amount = int(1, level === 1 ? 2 : 4), value = level === 1 ? int(1, 15) : n, ans = left ? value << amount & 255 : value >>> amount, out = bin(ans);
      r = q(`Apply a logical <strong>${left ? "left" : "right"}</strong> shift of <strong>${amount}</strong> place${amount > 1 ? "s" : ""}. Keep eight bits.${big(bin(value))}`, [field("Eight-bit result", out, "binary")], [`Move every bit ${amount} place${amount > 1 ? "s" : ""} to the ${left ? "left" : "right"}.`, `Discard the ${amount} bit${amount > 1 ? "s" : ""} that move off the ${left ? "left" : "right"} edge.`, `Fill the vacated positions on the ${left ? "right" : "left"} with ${amount} zero${amount > 1 ? "s" : ""}. Result: ${out}.`], "Bits move, zeros fill the spaces, and bits beyond the edge are discarded.", "", { value, amount, left, ans });
    } else if (skillId === "shift-effect") {
      const amount = int(1, 3), left = rand() < 0.5, value = left ? int(1, Math.floor(255 / 2 ** amount)) : int(1, 31) * 2 ** amount, ans = left ? value * 2 ** amount : value / 2 ** amount;
      r = q(`An eight-bit number has decimal value <strong>${value}</strong>. It is logically shifted <strong>${left ? "left" : "right"} ${amount}</strong> places. No 1 bits are discarded. What is its new decimal value?`, [field("New decimal value", ans)], [`A ${left ? "left" : "right"} shift of one place ${left ? "multiplies" : "divides"} by 2.`, `${amount} places ${left ? "multiply" : "divide"} by 2^${amount} = ${2 ** amount}.`, `${value} ${left ? "×" : "÷"} ${2 ** amount} = ${ans}.`], "Use a power of two, not multiplication by the number of places.");
      if (level === 3) {
        const v = int(129, 250), a = v << 1 & 255;
        r = written(`A learner says “a logical left shift always doubles the value”. Use the eight-bit value <code>${bin(v)}</code> (${v}) to evaluate this statement.`, [`The original value ${v} would double to ${v * 2}.`, `In eight bits, the leftmost 1 is discarded and a zero enters on the right: ${bin(a)}, which is ${a}.`, "The claim is only true when no 1 bits are shifted out of the register."], "Track what happens at the left edge.");
      }
    } else if (["ascii-word-size", "ascii-word-decimal", "ascii-word-binary"].includes(skillId)) {
      const length = options.wordLength || (level === 1 ? 3 : level === 2 ? 4 : pick([5, 6])), chosen = chooseEncodingWord(rand, [length], options), base = chosen.word, style = int(0, 2), word = style === 0 ? base.toUpperCase() : style === 1 ? base : base[0].toUpperCase() + base.slice(1), codes = [...word].map((c) => c.charCodeAt(0)), binaryCodes = codes.map((c) => bin(c, 7)), size = word.length * 7, meta = { word, wordCategory: chosen.wordCategory, codes, binaryCodes, size, bitsPerCharacter: 7 };
      if (skillId === "ascii-word-size") r = q(`The word <strong>${word}</strong> is stored using <strong>7-bit ASCII</strong>. Calculate its file size in <strong>bits</strong>. Count only the word’s letters; ignore metadata and padding.`, [field("File size (bits)", size)], [`The word ${word} contains ${word.length} characters.`, `Each character uses 7 bits.`, `${word.length} × 7 = ${size} bits.`], "Count every letter, then multiply by seven.", "", meta);
      else {
        const binary = skillId === "ascii-word-binary";
        r = q(`Use the supplied ASCII reference to convert the ${word.length}-letter word <strong>${word}</strong> into <strong>${binary ? "7-bit binary ASCII" : "decimal ASCII"}</strong> codes. Keep the letter case and separate the codes with spaces.`, [field(binary ? "7-bit ASCII codes" : "Decimal ASCII codes", (binary ? binaryCodes : codes).join(" "), "sequence")], [...codes.map((c, i) => `${word[i]} → ${c}${binary ? ` → ${binaryCodes[i]}` : ""}.`), `Keep the word’s order: ${(binary ? binaryCodes : codes).join(" ")}.`], binary ? "Find each decimal character code, then write it using the seven place values 64, 32, 16, 8, 4, 2 and 1." : "Use A = 65 or a = 97, then add the letter’s offset within that group.", ascii(), meta);
      }
    } else if (skillId === "encode-text" || skillId === "decode-text") {
      const chosen = chooseEncodingWord(rand, level === 1 ? [3, 4] : [3, 4, 5, 6], options), base = chosen.word, style = int(0, 2), word = style === 0 ? base.toUpperCase() : style === 1 ? base : base[0].toUpperCase() + base.slice(1), codes = [...word].map((c) => c.charCodeAt(0)), binary = level === 3;
      if (skillId === "encode-text") r = q(`Use the character table to encode <strong>${word}</strong> as ${binary ? "7-bit binary" : "decimal"} ASCII codes, separated by spaces.`, [field("ASCII codes", codes.map((c) => binary ? bin(c, 7) : c).join(" "), "sequence")], [`Find each character using the appropriate group.`, `The decimal codes are ${codes.join(", ")}.`, binary ? `Convert each code to seven bits: ${codes.map((c) => bin(c, 7)).join(" ")}.` : `Keep the original order: ${codes.join(" ")}.`], "Use A = 65, a = 97 or 0 = 48 as your starting point.", ascii(), { word, wordCategory: chosen.wordCategory, codes });
      else r = q(`Use the supplied table to decode these ${binary ? "7-bit binary" : "decimal"} ASCII codes.${big(codes.map((c) => binary ? bin(c, 7) : c).join(" "))}`, [field("Decoded text", word, "text-exact")], [binary ? `Convert to decimal: ${codes.join(", ")}.` : "Find the matching group for each code.", ...codes.map((c, i) => `${c} represents ${word[i]}.`), `Read the characters in order: ${word}.`], "Capitalisation matters; use the group boundaries in the table.", ascii(), { word, wordCategory: chosen.wordCategory, codes });
    } else if (skillId === "code-sequences") {
      const group = pick([{ start: 65, first: "A", length: 26 }, { start: 97, first: "a", length: 26 }, { start: 48, first: "0", length: 10 }]), offset = int(1, group.length - 1), c = String.fromCharCode(group.start + offset), decode = rand() < 0.5;
      r = q(`In ASCII, <strong>${group.first}</strong> has code <strong>${group.start}</strong>. ${decode ? `Which character has code ${group.start + offset}?` : `What is the decimal code for ${c}?`}`, [field(decode ? "Character" : "Decimal character code", decode ? c : group.start + offset, decode ? "text-exact" : "number")], [`Codes within this group run in sequence.`, `${c} is ${offset} position${offset > 1 ? "s" : ""} after ${group.first}.`, `${group.start} + ${offset} = ${group.start + offset}, the code for ${c}.`], "Count the offset within the same group; the starting character has offset zero.");
    } else if (skillId === "unicode") {
      const context = pick(["a website displaying English, Greek and Arabic", "a messaging app displaying several writing systems and symbols", "a library catalogue with names in many languages"]);
      r = written(`Explain why Unicode is more suitable than 7-bit ASCII for ${context}. Include how its first 128 codes relate to ASCII.`, ["A character set assigns codes to characters.", "7-bit ASCII provides 128 codes, which cannot cover all these writing systems and symbols.", "Unicode provides a much wider range of characters from different languages and special symbols.", "Unicode uses the same codes as ASCII from 0 to 127."], "Discuss range of characters, then the shared codes.");
    } else if (skillId === "pixels") {
      const w = int(3, 20) * 10, h = int(3, 15) * 10;
      r = q(`A bitmap is <strong>${w} pixels wide</strong> and <strong>${h} pixels high</strong>. How many pixels does it contain?`, [field("Number of pixels", w * h)], [`A pixel is a single picture element.`, `Multiply width by height: ${w} × ${h} = ${fmt(w * h)} pixels.`], "Count every row and every column, not just the edges.");
      if (level === 3) r = written(`Describe how a <strong>${w} × ${h} pixel</strong> bitmap represents an image. It uses <strong>4 bits per pixel</strong>. Include what a pixel is and how its colour is represented.`, ["A pixel is a single picture element; the bitmap is a grid of these elements.", `There are ${w} × ${h} = ${fmt(w * h)} pixel positions.`, "A four-bit pattern represents the colour of each pixel, allowing up to 16 different colours.", "Storing the pixel values in order allows the image to be reconstructed."], "Connect the grid of picture elements to the bits stored for each element.");
    } else if (skillId === "colour-depth") {
      const d = pick(level === 1 ? [1, 2, 3] : [1, 2, 4, 8]), inverse = level === 3;
      r = q(inverse ? `A bitmap needs to represent <strong>${2 ** d} different colours</strong>. What is the minimum colour depth?` : `A bitmap has a colour depth of <strong>${d} bits per pixel</strong>. What is the maximum number of different colours?`, [field(inverse ? "Colour depth (bits per pixel)" : "Number of colours", inverse ? d : 2 ** d)], [`${d} bits can form 2^${d} = ${2 ** d} distinct patterns.`, inverse ? `The minimum colour depth is ${d} bits per pixel.` : `The maximum number of colours is ${2 ** d}.`], "Each extra bit doubles the number of possible pixel values.");
    } else if (skillId === "image-size" || skillId === "image-change") {
      const w = pick([16, 32, 40, 64, 80, 120, 200]), h = pick([16, 24, 40, 64, 80, 100]), d = pick([1, 2, 4, 8]), size = w * h * d, bytes = level !== 1;
      if (skillId === "image-size") r = q(`An uncompressed bitmap is <strong>${w} × ${h} pixels</strong> with <strong>${d}-bit colour depth</strong>. Calculate its size in <strong>${bytes ? "bytes" : "bits"}</strong>. Ignore metadata.`, [field(`File size (${bytes ? "bytes" : "bits"})`, bytes ? size / 8 : size)], [`Count pixels: ${w} × ${h} = ${fmt(w * h)}.`, `Multiply by colour depth: ${fmt(w * h)} × ${d} = ${fmt(size)} bits.`, bytes ? `Convert to bytes: ${fmt(size)} ÷ 8 = ${fmt(size / 8)} bytes.` : `The raw bitmap data needs ${fmt(size)} bits.`], "First find the number of pixels, then the bits for each pixel.", "", { w, h, d, size });
      else {
        const which = pick(["width", "depth", "both"]), factor = which === "both" ? 4 : 2, newW = which === "depth" ? w : w * 2, newH = which === "both" ? h * 2 : h, newD = which === "depth" ? d * 2 : d;
        r = q(`A ${w} × ${h} bitmap uses ${d} bits per pixel. ${which === "width" ? "Its width doubles; height and colour depth stay the same." : which === "depth" ? "Its colour depth doubles; dimensions stay the same." : "Its width and height both double; colour depth stays the same."} Calculate its new raw size in bits.`, [field("New size (bits)", size * factor)], [`Original size = ${w} × ${h} × ${d} = ${fmt(size)} bits.`, `New size = ${newW} × ${newH} × ${newD} = ${fmt(size * factor)} bits.`, `The file size increases by a factor of ${factor}.`], "Identify how many factors in width × height × depth have changed.");
      }
    } else if (skillId === "bitmap-encode" || skillId === "bitmap-decode") {
      const w = level === 1 ? 4 : 6, h = 4, data = Array.from({ length: w * h }, () => rand() < 0.5 ? "0" : "1").join(""), rows = Array.from({ length: h }, (_, i) => data.slice(i * w, (i + 1) * w));
      if (skillId === "bitmap-encode") r = q("Write the binary data for this bitmap, with one group per row.", [field("Binary rows, separated by spaces", rows.join(" "), "sequence")], rows.map((row, i) => `Row ${i + 1}: ${row}.`), "Use 0 for white and 1 for dark. Read left to right, top to bottom.", bitmapFigure(data, w) + key, { w, h, data });
      else {
        r = q("Use the row data to draw the bitmap. Click a cell to make it dark; click again to make it white.", [field("Bitmap", data, "bitmap")], rows.map((row, i) => `Row ${i + 1}: ${row}; shade the cells with value 1.`), "Use one cell per bit. Work across each row before moving down.", big(rows.join("<br>")) + key, { w, h, data });
        r.solutionFigure = bitmapFigure(data, w);
      }
    } else if (skillId === "sampling") {
      const rate = pick([8e3, 11025, 22050, 44100, 48e3]), res = pick([8, 12, 16]);
      r = written(`A digital recording uses a sampling rate of <strong>${fmt(rate)} Hz</strong> and sample resolution of <strong>${res} bits</strong>. Explain both settings and what a sample measures.`, [`The sampling rate means ${fmt(rate)} samples are taken each second.`, `Each sample uses ${res} bits to represent its measured amplitude.`, "A sample measures the amplitude of the analogue signal at a particular point in time."], "Distinguish how often a measurement is taken from how many bits store it.", samplingFigure(level === 1 ? 6 : 11));
    } else if (["sound-size", "sound-change", "sound-missing"].includes(skillId)) {
      const rate = pick(level === 1 ? [1e3, 2e3, 8e3] : [8e3, 16e3, 22050, 44100]), res = pick([8, 16]), secs = pick(skillId === "sound-size" && level === 3 ? [60, 120, 180, 240] : [2, 5, 10, 20, 30, 60]), size = rate * res * secs;
      if (skillId === "sound-size") {
        const bytes = level !== 1, unit = bytes ? "bytes" : "bits", ans = bytes ? size / 8 : size;
        const inMinutes = secs % 60 === 0, duration = inMinutes ? `${secs / 60} minute${secs === 60 ? "" : "s"}` : `${secs} seconds`;
        r = q(`An uncompressed sound recording lasts <strong>${duration}</strong>. Its sampling rate is <strong>${fmt(rate)} Hz</strong> and sample resolution is <strong>${res} bits</strong>. Calculate its size in <strong>${unit}</strong>. Use one stream of samples and ignore metadata.`, [field(`File size (${unit})`, ans)], [`${inMinutes ? `${duration} = ${secs} seconds. ` : ""}Size in bits = sampling rate × sample resolution × duration in seconds.`, `${fmt(rate)} × ${res} × ${secs} = ${fmt(size)} bits.`, bytes ? `${fmt(size)} ÷ 8 = ${fmt(ans)} bytes.` : `Answer: ${fmt(size)} bits.`], "The rate is already samples per second; multiply it by bits per sample and seconds.", "", { rate, res, secs, size });
      } else if (skillId === "sound-missing") {
        const missing = pick(["rate", "resolution", "duration"]), ans = missing === "rate" ? rate : missing === "resolution" ? res : secs;
        r = q(`A raw sound file contains <strong>${fmt(size)} bits</strong>. ${missing === "rate" ? `It lasts ${secs} seconds and uses ${res} bits per sample. Find its sampling rate.` : missing === "resolution" ? `It lasts ${secs} seconds and uses a sampling rate of ${fmt(rate)} Hz. Find its sample resolution.` : `It uses ${fmt(rate)} Hz and ${res} bits per sample. Find its duration.`} Ignore metadata; use one stream of samples.`, [field(missing === "rate" ? "Sampling rate (Hz)" : missing === "resolution" ? "Resolution (bits per sample)" : "Duration (seconds)", ans)], [`File size (bits) = rate × resolution × seconds.`, `Divide ${fmt(size)} by ${missing === "rate" ? `${res} × ${secs}` : missing === "resolution" ? `${fmt(rate)} × ${secs}` : `${fmt(rate)} × ${res}`}.`, `The missing ${missing} is ${fmt(ans)}.`], "Divide by the two known factors.");
      } else {
        const which = pick(["rate", "resolution", "duration", "cancel"]), factor = which === "cancel" ? 1 : 2;
        r = written(`A recording uses ${fmt(rate)} Hz, ${res} bits per sample and lasts ${secs} seconds. ${which === "cancel" ? "The sampling rate doubles and the duration halves." : `Its ${which === "rate" ? "sampling rate" : which === "resolution" ? "sample resolution" : "duration"} doubles; everything else stays the same.`} Explain the effect on raw file size${which === "duration" || which === "cancel" ? "" : ", and on how the sound is represented"}.`, [`Original size = ${fmt(rate)} × ${res} × ${secs} = ${fmt(size)} bits.`, `The new size is ${fmt(size * factor)} bits: ${factor === 1 ? "the two changes cancel each other out" : "doubling one factor doubles the product"}.`, which === "rate" ? "More amplitude measurements are taken each second, capturing changes in the signal more closely." : which === "resolution" ? "Each sample has more possible amplitude values, allowing finer amplitude measurements." : which === "duration" ? "Twice as many seconds of samples are stored." : "The same number of samples is stored over half the recording time."], "Use the product of the three factors, then explain which factor has changed.");
      }
    } else if (skillId === "compression-purpose") {
      const context = pick(["a school uploading teaching recordings over a slow connection", "a phone storing many photographs with limited space", "a website delivering image files to visitors", "a school archiving many text documents"]);
      r = written(`Explain two benefits of compressing data for ${context}.`, ["Compression represents the data using fewer bits.", "Smaller files need less storage space.", "With the same connection speed, fewer bits can be transferred in less time and use less data."], "Link the reduction in bits to this situation.");
    } else if (skillId.startsWith("huffman-")) {
      const repeated = !options.legacyHuffman, lengths = level === 1 && (!options.preferComputing || !repeated) ? [3, 4] : [3, 4, 5, 6];
      const chosen = chooseEncodingWord(rand, lengths, { ...options, requireRepeatedLetter: repeated }), text = chosen.word.toUpperCase(), data = huffmanData(text), chars = Object.keys(data.codes), target = pick(chars), message = text, encoded = [...message].map((c) => data.codes[c]).join(""), figure = treeFigure(data);
      if (skillId === "huffman-read") r = q(`Using this Huffman tree, write the code for <strong>${target}</strong>.`, [field("Huffman code", data.codes[target], "bitstream")], [`Start at the root, which has frequency ${text.length}.`, `Follow branches to the leaf labelled ${target}; record each 0 or 1.`, `The code is ${data.codes[target]}.`], "A character code is the path from the root to that character’s leaf.", figure, { data });
      if (skillId === "huffman-explain") {
        const sorted = chars.toSorted((a, b) => data.counts[b] - data.counts[a]), common = sorted[0], rare = sorted.at(-1);
        r = written(`The message <strong>${text}</strong> is represented by this Huffman tree. Explain how the coding can reduce its storage compared with 7-bit ASCII, and how the original message can be recovered.`, [`Huffman codes can have different lengths. Here, ${common} appears ${data.counts[common]} times and uses ${data.codes[common].length} bits; ${rare} appears ${data.counts[rare]} times and uses ${data.codes[rare].length} bits.`, "Giving frequent characters shorter codes reduces the total number of bits needed for the message.", `ASCII uses 7 bits for each character; these Huffman character codes each use fewer than 7 bits.`, "The supplied tree allows exact decoding: follow the bits to a leaf, record the character and return to the root. Count only message data when comparing these sizes."], "Compare frequency and code length, then explain how the decoder identifies each character.", figure);
      }
      if (skillId === "huffman-encode") r = q(`Encode the message <strong>${message}</strong> using this Huffman tree. Write one continuous bitstream.`, [field("Encoded bitstream", encoded, "bitstream")], [...message.split("").map((c) => `${c} → ${data.codes[c]}.`), `Join in order: ${encoded}.`], "Return to the root before looking up each character.", figure, { data, message, encoded });
      if (skillId === "huffman-decode") r = q(`Decode this bitstream using the supplied tree.${big(encoded)}`, [field("Decoded message", message, "text-exact")], [`Start at the root and follow the first bits until you reach a leaf.`, ...message.split("").map((c) => `${data.codes[c]} → ${c}; return to the root.`), `The message is ${message}.`], "Stop each code at a leaf; codes do not all have the same length.", figure, { data, message, encoded });
      if (skillId === "huffman-size") {
        const compressed = data.encoded.length, original = text.length * 7, saved = original - compressed, rows = chars.map((c) => [c, data.counts[c], data.codes[c], data.codes[c].length]);
        r = q(`The text <strong>${text}</strong> uses these Huffman codes. Calculate the compressed size, the size using <strong>7-bit ASCII</strong>, and the bits saved. Count only the message data; ignore the tree and metadata.`, [field("Huffman size (bits)", compressed), field("ASCII size (bits)", original), field("Bits saved", saved)], [...chars.map((c) => `${c}: ${data.counts[c]} occurrences × ${data.codes[c].length} bits = ${data.counts[c] * data.codes[c].length} bits.`), `Add the contributions: ${compressed} bits.`, `ASCII: ${text.length} characters × 7 = ${original} bits.`, `Saving: ${original} − ${compressed} = ${saved} bits.`], "Multiply each character’s frequency by its own code length, then add.", table(["Character", "Frequency", "Code", "Code length"], rows), { data, compressed, original, saved });
      }
      r.meta = { ...r.meta, word: text, wordCategory: chosen.wordCategory };
      if (!repeated) r.legacyHuffman = true;
    } else if (skillId === "rle-encode" || skillId === "rle-decode") {
      let runs = Array.from({ length: level === 1 ? 3 : 5 }, (_, i) => ({ count: int(1, 6), value: i % 2 }));
      if (rand() < 0.5) runs = runs.map((x) => ({ ...x, value: 1 - x.value }));
      const data = runs.map((x) => String(x.value).repeat(x.count)).join(""), pairs = runs.map((x) => `${x.count} ${x.value}`).join(" | ");
      if (skillId === "rle-encode") r = q(`Encode this single binary row using RLE <strong>count/value</strong> pairs.${big(data)}`, [field("Count/value pairs", pairs, "rle")], [...runs.map((x) => `${x.count} consecutive ${x.value}${x.count === 1 ? "" : "s"} → (${x.count}, ${x.value}).`), `Pairs in order: ${pairs}.`], "Count one uninterrupted run at a time. Write the count before the value.", "", { runs, data });
      else r = q(`Decode these RLE count/value pairs to one binary row.${big(runs.map((x) => `(${x.count}, ${x.value})`).join(" "))}`, [field("Binary row", data, "bitstream")], [...runs.map((x) => `(${x.count}, ${x.value}) → ${String(x.value).repeat(x.count)}.`), `Join the runs: ${data}.`], "Repeat the second value as many times as the first value states.", "", { runs, data });
    }
    if (!r) throw Error("Generator missing: " + skillId);
    return { ...r, id: `${skillId}-${level}-${seed}${skillId.startsWith("huffman-") && !r.legacyHuffman ? "-h2" : ""}`, skill: skillId, level, seed, objective: sk.objective, misconception: sk.misconception, title: sk.title, ref: sk.ref };
  }
  function checkField(f, value) {
    const raw = String(value ?? "").trim();
    if (!raw) return { correct: false, empty: true, message: "Enter a response first." };
    const compact = (s) => s.replace(/\s+/g, "");
    let correct = false;
    if (f.kind === "number") {
      const s = raw.replace(/[,\s]/g, "");
      correct = /^[+-]?(?:\d+(?:\.\d*)?|\.\d+)$/.test(s) && Math.abs(Number(s) - Number(f.answer)) < 1e-7;
    } else if (f.kind === "hex") correct = /^[0-9a-f]{2}$/i.test(raw) && raw.toUpperCase() === f.answer;
    else if (["binary", "addition"].includes(f.kind)) correct = /^[01]{8}$/.test(compact(raw)) && compact(raw) === f.answer;
    else if (["bitstream", "bitmap"].includes(f.kind)) correct = compact(raw) === f.answer;
    else if (f.kind === "sequence") correct = raw.replace(/[\s,;|]+/g, " ").trim() === f.answer;
    else if (f.kind === "rle") correct = raw.replace(/[\s,|;()]+/g, " ").trim() === f.answer.replace(/[\s,|;()]+/g, " ").trim();
    else correct = raw === f.answer;
    return { correct, empty: false, message: correct ? "Correct. Well done." : f.kind === "hex" ? "Check both hexadecimal digits." : f.kind === "binary" || f.kind === "addition" ? "Check the eight bits and any zero placeholders." : "Check your method and try again." };
  }

  // bytesize-pages-v27/dist/teacher/worksheet.js
  function worksheetQuestionKey(question) {
    const clean = (text) => String(text || "").replace(/\s+/g, " ").trim();
    if (Number.isFinite(question.meta?.n)) return `${question.skill}:${question.meta.n}`;
    const needsFigure = ["add-two", "add-three", "bitmap-encode", "bitmap-decode"].includes(question.skill) || question.skill.startsWith("huffman-") || question.ref === "3.4.2";
    return JSON.stringify([question.skill, clean(question.prompt), needsFigure ? clean(question.figure) : ""]);
  }
  function makeWorksheet(ids, count, seed) {
    const random = rng(seed), valid = new Set(SKILLS.map((skill3) => skill3.id));
    let active = [...new Set(ids)].filter((id) => valid.has(id));
    for (let i = active.length - 1; i > 0; i--) {
      const j = Math.floor(random() * (i + 1));
      [active[i], active[j]] = [active[j], active[i]];
    }
    active = interleaveUnits(active);
    const requested = Math.max(0, Math.min(24, Math.floor(Number(count) || 0)));
    const questions = [], seen = /* @__PURE__ */ new Set(), usedWords = /* @__PURE__ */ new Set(), turns = /* @__PURE__ */ new Map();
    const attemptsPerSkill = 240;
    let cursor = 0;
    while (questions.length < requested && active.length) {
      const id = active[cursor];
      let accepted = null;
      for (let attempt = 0; attempt < attemptsPerSkill; attempt++) {
        const level = 1 + ((turns.get(id) || 0) + attempt) % 3, questionSeed = Math.floor(random() * 4294967296) >>> 0;
        let question;
        try {
          question = makeQuestion(id, level, questionSeed, { excludeWords: usedWords, preferComputing: true });
        } catch (error) {
          if (error.code === "WORD_POOL_EXHAUSTED") continue;
          throw error;
        }
        const key2 = worksheetQuestionKey(question), word = question.meta?.word?.toLowerCase();
        if (seen.has(key2) || word && usedWords.has(word)) continue;
        seen.add(key2);
        if (word) usedWords.add(word);
        turns.set(id, level);
        accepted = question;
        break;
      }
      if (accepted) {
        questions.push(accepted);
        cursor = (cursor + 1) % active.length;
      } else {
        active.splice(cursor, 1);
        if (active.length) cursor %= active.length;
      }
    }
    return { questions, requested, notice: questions.length < requested ? `Created ${questions.length} unique questions out of ${requested} requested. Add more skills or choose fewer questions to make a full worksheet.` : "" };
  }

  // bytesize-pages-v27/dist/teacher/logic-workshop.js
  var gateNames = Object.keys(GATES);
  var inputCounts = INPUTS.map((_, i) => i + 1);
  var width = 900;
  var height = 375;
  function inputY(i, count) {
    const spacing = Math.min(95, (height - 96) / Math.max(1, count - 1));
    return Math.round(height / 2 + (i - (count - 1) / 2) * spacing);
  }
  var emptyCircuit = (count = 3) => ({
    nodes: [...INPUTS.slice(0, count).map((kind, i) => ({ id: kind, kind, x: 65, y: inputY(i, count) })), { id: "Q", kind: "Q", x: 815, y: 188 }],
    wires: [],
    bits: Object.fromEntries(INPUTS.map((name) => [name, 0])),
    sequence: 0
  });
  var binaryGates = ["OR", "AND", "XOR"];
  var oneInputExamples = [
    logicNode("NOT", "A"),
    ...binaryGates.flatMap((gate) => [logicNode(gate, "A", "A"), logicNode("NOT", logicNode(gate, "A", "A"))]),
    logicNode("NOT", logicNode("NOT", "A")),
    logicNode("OR", "A", logicNode("NOT", "A")),
    logicNode("XOR", logicNode("NOT", "A"), logicNode("NOT", "A"))
  ];
  function exampleExpression(count, index) {
    if (count === 1) return oneInputExamples[index % oneInputExamples.length];
    const names = INPUTS.slice(0, count), combinations = 3 ** (count - 1);
    let code = index % combinations;
    const inverted = (Math.floor(index / combinations) + count) % (count + 1);
    const reversed = Math.floor(index / (combinations * (count + 1))) % 2 === 1;
    function build(list) {
      if (list.length === 1) return list[0] === names[inverted] ? logicNode("NOT", list[0]) : list[0];
      const gate = binaryGates[code % 3];
      code = Math.floor(code / 3);
      const split = reversed ? Math.floor(list.length / 2) : Math.ceil(list.length / 2);
      return logicNode(gate, build(list.slice(0, split)), build(list.slice(split)));
    }
    return build(names);
  }
  function exampleCircuit(count, index) {
    const c = emptyCircuit(count);
    const base = exampleExpression(count, count === 1 ? index : Math.floor(index / 2));
    const tree = count > 1 && index % 2 === 1 ? logicNode("NOT", base) : base;
    const gateDepth = (n) => typeof n === "string" ? 0 : 1 + Math.max(...n.args.map(gateDepth));
    const columnGap = Math.min(137, 509 / Math.max(1, gateDepth(tree) - 1));
    const layout = (tree2) => {
      if (INPUTS.includes(tree2)) return { id: tree2, y: c.nodes.find((n) => n.id === tree2).y, depth: 0 };
      const inputs = tree2.args.map(layout), depth = 1 + Math.max(...inputs.map((input) => input.depth));
      const id = "g" + ++c.sequence, y = Math.round(inputs.reduce((n, input) => n + input.y, 0) / inputs.length);
      c.nodes.push({ id, kind: tree2.op, x: 205 + Math.round((depth - 1) * columnGap), y });
      inputs.forEach((input, pin) => c.wires.push({ from: input.id, to: id, pin }));
      return { id, y, depth };
    };
    c.wires.push({ from: layout(tree).id, to: "Q", pin: 0 });
    return c;
  }
  var button = (text, action, extra = "", kind = "") => `<button class="btn small ${kind}" type="button" data-lw="${action}" ${extra}>${text}</button>`;
  var at = (x, y) => `left:${x / width * 100}%;top:${y / height * 100}%`;
  var bound = (v, min, max) => Math.max(min, Math.min(max, Math.round(v)));
  var svgGate = (op) => `<svg viewBox="-9 -17 56 34" aria-hidden="true">${gateSymbol(op)}</svg>`;
  var escAttr = (s) => String(s).replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;");
  function createLogicWorkshop() {
    let mode = "circuit", circuit = emptyCircuit(), expr = null, exprToken = null, exprSelected = null, source = null, gate = null, drag = null, message = "";
    const hiddenResults = () => ({ representation: false, table: false });
    const reveal = { circuit: hiddenResults(), expression: hiddenResults() };
    const circuitExamples = Array(INPUTS.length + 1).fill(0);
    const expressionExampleCounts = [3, 4, 5, 2];
    let expressionExamples = 0;
    const circuitInputs = () => circuit.nodes.filter((n) => INPUTS.includes(n.kind));
    const history = { circuit: [], expression: [] };
    const snapshot = () => {
      history[mode].push(JSON.stringify(mode === "circuit" ? circuit : expr));
      if (history[mode].length > 24) history[mode].shift();
    };
    const tell = (s) => {
      message = s;
    };
    function setToken(path, token) {
      if (path.length === 4 && gateArity(token)) {
        tell("Use a variable here. Keep this expression to four nested gate levels.");
        return;
      }
      snapshot();
      expr = setLogicSlot(expr, path, token);
      exprSelected = path;
      exprToken = null;
      tell(token ? "Expression updated." : "Slot cleared.");
    }
    function addGate(kind, x = 230 + circuit.sequence % 4 * 125, y = 105 + circuit.sequence % 3 * 77) {
      if (!gateArity(kind)) return;
      if (circuit.nodes.filter((n) => gateArity(n.kind)).length >= 8) {
        tell("This board supports up to eight gates. Remove one before adding another.");
        return;
      }
      snapshot();
      gate = "g" + ++circuit.sequence;
      circuit.nodes.push({ id: gate, kind, x: bound(x, 124, 714), y: bound(y, 56, 337) });
      tell(kind + " placed. Select an output dot, then an input dot to connect it.");
    }
    function moveGate(id, x, y) {
      const n = circuit.nodes.find((n2) => n2.id === id && gateArity(n2.kind));
      if (!n) return;
      const xx = bound(x, 124, 714), yy = bound(y, 56, 337);
      if (n.x === xx && n.y === yy) return;
      snapshot();
      n.x = xx;
      n.y = yy;
      gate = id;
      tell(n.kind + " moved.");
    }
    function wire(from, to, pin) {
      if (!canWire(circuit.nodes, circuit.wires, from, to, pin)) {
        source = null;
        tell("Cannot connect those pins. Connect an output to an input without making a loop.");
        return;
      }
      snapshot();
      circuit.wires = circuit.wires.filter((w) => w.to !== to || w.pin !== pin);
      circuit.wires.push({ from, to, pin });
      source = null;
      tell("Wire connected.");
    }
    function inputClick(id, pin) {
      if (source) {
        wire(source, id, pin);
        return;
      }
      if (circuit.wires.some((w) => w.to === id && w.pin === pin)) {
        snapshot();
        circuit.wires = circuit.wires.filter((w) => w.to !== id || w.pin !== pin);
        tell("Wire removed.");
      } else tell("Select an output dot first, or drag an output dot to this input.");
    }
    function circuitBoard() {
      const names = circuitInputs();
      const pinX = (n, side) => n.x + (gateArity(n.kind) ? gatePinX(n.kind, side) : 0);
      const paths = circuit.wires.map((w) => {
        const a = circuit.nodes.find((n) => n.id === w.from), b = circuit.nodes.find((n) => n.id === w.to), x = pinX(a, "out"), end = pinX(b, "in"), y = b.y + portOffset(b.kind, w.pin), mid = (x + end) / 2;
        return `<path d="M${x} ${a.y} H${mid} V${y} H${end}"/>`;
      }).join("");
      const shapes = circuit.nodes.filter((n) => gateArity(n.kind)).map((n) => `<g transform="translate(${n.x} ${n.y})">${gateSymbol(n.kind)}</g>`).join("");
      const ports = circuit.nodes.map((n) => {
        const label = gateArity(n.kind) ? `${n.kind} gate ${n.id.slice(1)}` : n.kind;
        const ins = Array.from({ length: n.kind === "Q" ? 1 : gateArity(n.kind) }, (_, i) => {
          const connected = circuit.wires.some((w) => w.to === n.id && w.pin === i);
          return `<button type="button" class="lw-port in ${connected ? "wired" : ""}" style="${at(pinX(n, "in"), n.y + portOffset(n.kind, i))}" data-lw="pin-in" data-node="${n.id}" data-pin="${i}" data-focus="in-${n.id}-${i}" aria-label="${label} input ${i + 1}${connected ? ", connected" : ""}" title="${label} input ${i + 1}"></button>`;
        }).join("");
        const out = n.kind === "Q" ? "" : `<button type="button" draggable="true" class="lw-port out ${source === n.id ? "picked" : ""}" style="${at(pinX(n, "out"), n.y)}" data-lw="pin-out" data-node="${n.id}" data-focus="out-${n.id}" aria-pressed="${source === n.id}" aria-label="${label} output" title="${label} output"></button>`;
        const tag = gateArity(n.kind) ? `<button type="button" draggable="true" class="lw-gate-label ${gate === n.id ? "picked" : ""}" style="${at(n.x + 18, n.y - 26)}" data-lw="select-gate" data-node="${n.id}" data-focus="gate-${n.id}" aria-label="Select ${label}. Use arrow keys to move." aria-pressed="${gate === n.id}" title="Drag or use the arrow keys to move">${n.kind}</button>` : n.kind === "Q" ? `<span class="lw-endpoint" style="${at(n.x + 26, n.y)}">Q</span>` : `<span class="lw-endpoint" style="${at(n.x - 27, n.y)}">${n.kind}</span>`;
        return tag + ins + out;
      }).join("");
      return `<div class="lw-toolbar"><div class="lw-palette" aria-label="Gate palette">${gateNames.map((op) => button(svgGate(op) + op, "add-gate", `draggable="true" data-token="${op}" title="Add or drag a ${op} gate"`)).join("")}</div><label class="lw-input-count">Inputs <select data-lw-inputs aria-label="Number of circuit inputs">${inputCounts.map((n) => `<option ${n === names.length ? "selected" : ""}>${n}</option>`).join("")}</select></label></div>
  <p class="lw-instructions">Drag a gate onto the board, or click to add it. Connect an output dot to an input dot by dragging or tapping them in order. Tap a connected input on its own to remove its wire.</p>
  <div class="lw-scroll" tabindex="0" aria-label="Scrollable circuit board"><div class="lw-board" data-lw-board><svg viewBox="0 0 ${width} ${height}" aria-hidden="true"><g fill="none" stroke="currentColor" stroke-width="2.5" stroke-linejoin="round">${paths}</g>${shapes}</svg>${ports}</div></div>
  <div class="lw-controls" aria-label="Circuit inputs and gate controls"><span>Input values</span>${names.map((n) => button(`${n.id} = ${circuit.bits[n.id]}`, "bit", `data-node="${n.id}" aria-pressed="${!!circuit.bits[n.id]}"`)).join("")}${button("Remove selected gate", "delete-gate", gate ? "" : "disabled")}</div>`;
    }
    function expressionBoard() {
      const tokens = [...INPUTS, ...gateNames];
      const label = (token) => token === "NOT" ? negationMark : token === "AND" ? "AND · ." : token === "OR" ? "OR · +" : token === "XOR" ? "XOR · ⊕" : token;
      const slot = (path, desc, contents, kind = "") => {
        const key2 = path.join(".");
        return `<button class="lw-slot ${kind || (desc === "Empty slot" ? "empty-slot" : "")} ${exprSelected?.join(".") === key2 ? "picked" : ""}" type="button" data-lw="slot" data-path="${key2}" data-focus="slot-${key2}" aria-label="${desc}, ${path.length ? "expression slot " + path.map((n) => n + 1).join(".") : "main expression slot"}">${contents}</button>`;
      };
      return `<div class="lw-palette" aria-label="Expression tokens">${tokens.map((t) => button(label(t), "choose-token", `data-token="${t}" draggable="true" aria-pressed="${exprToken === t}" ${t === "NOT" ? 'aria-label="Overbar (NOT)" title="Negate with an overbar"' : ""}`, exprToken === t ? "primary" : "")).join("")}</div>
  <p class="lw-instructions">Drop a variable or operation into a slot, or select a token and tap the slot. The overbar negates what it covers. Select it or any other token to replace or remove it.</p>
  <div class="lw-expression" aria-label="Expression workspace"><span class="lw-q">Q =</span><div class="logic-expression">${logicExpressionHTML(expr, slot)}</div></div>
  <div class="lw-controls">${button("Clear selected slot", "delete-slot", exprSelected !== null ? "" : "disabled")}</div>`;
    }
    function output() {
      const { representation, table: table2 } = reveal[mode];
      if (!representation && !table2) return '<p class="lw-instructions">Reveal each result when the class is ready.</p>';
      const tree = mode === "circuit" ? circuitExpression(circuit.nodes, circuit.wires) : expr;
      if (!expressionComplete(tree)) return `<p class="lw-instructions">${mode === "circuit" ? "Connect Q and every input of the gates on its path." : "Fill all expression slots first."}</p>`;
      const inputs = mode === "circuit" ? circuitInputs().map((n) => n.kind) : logicInputs(tree);
      const graphic = representation ? mode === "circuit" ? `<div class="logic-expression">Q = ${logicExpressionHTML(tree)}</div><p>Output for the current input values: <strong>${evaluateLogic(tree, circuit.bits)}</strong></p>` : logicCircuitFigure(tree) : "";
      return `<section class="lw-output" aria-label="Model results">${representation ? `<div><h3>${mode === "circuit" ? "Matching expression" : "Matching circuit"}</h3>${graphic}</div>` : ""}${table2 ? `<div><h3>Truth table · ${2 ** inputs.length} rows</h3><div class="lw-truth-scroll" role="region" tabindex="0" aria-label="Truth table rows">${logicTable(tree, { names: inputs })}</div></div>` : ""}</section>`;
    }
    function body() {
      return `<div class="lw-toolbar"><div class="lw-mode" role="group" aria-label="Modelling tool">${button("Circuit builder", "mode", 'data-mode="circuit" aria-pressed="' + (mode === "circuit") + '"', mode === "circuit" ? "primary" : "")}${button("Expression builder", "mode", 'data-mode="expression" aria-pressed="' + (mode === "expression") + '"', mode === "expression" ? "primary" : "")}</div><div class="lw-controls">${button("Load example", "example")}${button("Undo", "undo", history[mode].length ? "" : "disabled")}${button("Clear board", "clear")}</div></div>
  ${mode === "circuit" ? circuitBoard() : expressionBoard()}
  <p class="lw-status" role="status">${message}</p>
  <div class="lw-controls" role="group" aria-label="Reveal results">${[["representation", mode === "circuit" ? "expression" : "circuit"], ["table", "truth table"]].map(([key2, label]) => button(`${reveal[mode][key2] ? "Hide" : "Reveal"} ${label}`, "reveal", `data-result="${key2}" aria-pressed="${reveal[mode][key2]}"`, "primary")).join("")}</div>
  ${output()}`;
    }
    function bind(root) {
      if (!root) return;
      function draw(focus, previous = null) {
        const position = root.querySelector(".lw-scroll")?.scrollLeft ?? 0;
        root.innerHTML = body();
        const scroll = root.querySelector(".lw-scroll");
        if (scroll) scroll.scrollLeft = position;
        const replacement = focus ? root.querySelector(`[data-focus="${escAttr(focus)}"]`) : previous ? [...root.querySelectorAll("[data-lw]")].find((el) => ["lw", "mode", "node", "token", "result"].every((k) => el.dataset[k] === previous[k])) : null;
        replacement?.focus({ preventScroll: true });
      }
      root.addEventListener("click", (e) => {
        const el = e.target.closest("[data-lw]");
        if (!el) return;
        const { lw, mode: next, token, node, pin, path, focus, result } = el.dataset;
        const route2 = path === void 0 ? null : path === "" ? [] : path.split(".").map(Number);
        if (lw === "mode") {
          mode = next;
          source = null;
          exprToken = null;
          tell("");
        } else if (lw === "example") {
          snapshot();
          if (mode === "circuit") {
            const count = circuitInputs().length;
            circuit = exampleCircuit(count, circuitExamples[count]++);
          } else {
            const index = expressionExamples++, count = expressionExampleCounts[index % expressionExampleCounts.length];
            expr = exampleExpression(count, Math.floor(index / expressionExampleCounts.length));
          }
          source = null;
          gate = null;
          exprToken = null;
          exprSelected = null;
          tell("New example loaded.");
        } else if (lw === "clear") {
          snapshot();
          if (mode === "circuit") circuit = emptyCircuit(circuitInputs().length);
          else expr = null;
          source = null;
          gate = null;
          exprSelected = null;
          exprToken = null;
          reveal[mode] = hiddenResults();
          tell("Board cleared.");
        } else if (lw === "undo") {
          const last = history[mode].pop();
          if (last !== void 0) {
            if (mode === "circuit") circuit = JSON.parse(last);
            else expr = JSON.parse(last);
            source = null;
            gate = null;
            exprSelected = null;
            tell("Last change undone.");
          }
        } else if (lw === "reveal" && Object.hasOwn(reveal[mode], result)) {
          reveal[mode][result] = !reveal[mode][result];
          tell("");
        } else if (lw === "add-gate") addGate(token);
        else if (lw === "select-gate") {
          gate = node;
          tell("Gate selected. Drag it or use the arrow keys to move it.");
        } else if (lw === "delete-gate" && gate) {
          snapshot();
          circuit.nodes = circuit.nodes.filter((n) => n.id !== gate);
          circuit.wires = circuit.wires.filter((w) => w.from !== gate && w.to !== gate);
          source = null;
          gate = null;
          tell("Gate removed.");
        } else if (lw === "pin-out") {
          source = source === node ? null : node;
          tell(source ? "Output selected. Choose an input dot." : "Output deselected.");
        } else if (lw === "pin-in") inputClick(node, Number(pin));
        else if (lw === "bit") {
          snapshot();
          circuit.bits[node] = 1 - circuit.bits[node];
          tell(`${node} is now ${circuit.bits[node]}.`);
        } else if (lw === "choose-token") {
          exprToken = exprToken === token ? null : token;
          tell(exprToken ? `${token === "NOT" ? "Overbar" : token} selected. Choose an expression slot.` : "Token deselected.");
        } else if (lw === "slot") {
          if (exprToken) setToken(route2, exprToken);
          else {
            exprSelected = route2;
            tell("Slot selected. Choose a replacement or clear it.");
          }
        } else if (lw === "delete-slot" && exprSelected !== null) setToken(exprSelected, null);
        draw(focus, el.dataset);
      });
      root.addEventListener("change", (e) => {
        if (!e.target.matches("[data-lw-inputs]")) return;
        const n = Number(e.target.value);
        if (!inputCounts.includes(n)) return;
        snapshot();
        const enabled = INPUTS.slice(0, n);
        circuit.nodes = circuit.nodes.filter((node) => !INPUTS.includes(node.kind));
        circuit.nodes.unshift(...emptyCircuit(n).nodes.filter((node) => INPUTS.includes(node.kind)));
        circuit.wires = circuit.wires.filter((w) => !INPUTS.includes(w.from) || enabled.includes(w.from));
        source = null;
        tell(`${n} inputs on the circuit board.`);
        draw();
      });
      root.addEventListener("keydown", (e) => {
        const el = e.target.closest('[data-lw="select-gate"]'), delta = { ArrowLeft: [-15, 0], ArrowRight: [15, 0], ArrowUp: [0, -15], ArrowDown: [0, 15] }[e.key];
        if (!el || !delta) return;
        e.preventDefault();
        const n = circuit.nodes.find((n2) => n2.id === el.dataset.node);
        if (n) {
          moveGate(n.id, n.x + delta[0], n.y + delta[1]);
          draw(el.dataset.focus);
        }
      });
      root.addEventListener("dragstart", (e) => {
        const el = e.target.closest('[draggable="true"][data-lw]');
        if (!el) return;
        drag = { action: el.dataset.lw, token: el.dataset.token, node: el.dataset.node };
        e.dataTransfer.setData("text/plain", drag.token || drag.node);
        e.dataTransfer.effectAllowed = "copyMove";
      });
      root.addEventListener("dragend", () => {
        drag = null;
      });
      function dropTarget(e) {
        if (!drag) return null;
        if (drag.action === "pin-out") return e.target.closest('[data-lw="pin-in"]');
        if (drag.action === "choose-token") return e.target.closest('[data-lw="slot"]');
        return e.target.closest("[data-lw-board]");
      }
      root.addEventListener("dragover", (e) => {
        if (dropTarget(e)) e.preventDefault();
      });
      root.addEventListener("drop", (e) => {
        const target = dropTarget(e);
        if (!target) return;
        e.preventDefault();
        if (drag.action === "pin-out") wire(drag.node, target.dataset.node, Number(target.dataset.pin));
        else if (drag.action === "choose-token") setToken(target.dataset.path === "" ? [] : target.dataset.path.split(".").map(Number), drag.token);
        else {
          const r = target.getBoundingClientRect(), x = (e.clientX - r.left) * width / r.width - 18, y = (e.clientY - r.top) * height / r.height + 26;
          if (drag.action === "add-gate") addGate(drag.token, x, y);
          else if (drag.action === "select-gate") moveGate(drag.node, x, y);
        }
        drag = null;
        draw();
      });
    }
    return { html: () => `<div class="page logic-workshop"><div class="page-heading"><div><div class="eyebrow">UNIT 4 · 3.4.2 BOOLEAN LOGIC</div><h1>Logic workshop</h1><p>Build and test circuits or expressions with up to five inputs. AQA practice questions use up to three.</p></div></div><section class="panel lw-panel" id="logic-tool" aria-label="Logic modelling workspace">${body()}</section></div>`, bind };
  }

  // bytesize-pages-v27/dist/teacher/app.js
  var $ = (s) => document.querySelector(s);
  var $$ = (s) => [...document.querySelectorAll(s)];
  var iconPaths = { minus: '<path d="M5 12h14"/>', grid: '<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>', board: '<rect x="3" y="3" width="18" height="13" rx="2"/><path d="M8 21l4-5 4 5M7 8h10M7 11h6"/>', recall: '<path d="M3 10a9 9 0 1 1 2 8M3 4v6h6M12 7v5l3 2"/>', paper: '<path d="M7 3h9l4 4v14H4V3zM15 3v5h5M8 12h8M8 16h6"/>', pen: '<path d="M4 20l4-1 12-12-3-3L5 16zM14 7l3 3M4 20l1-4"/>', folder: '<path d="M3 7V4h7l3 3h8v13H3zM3 9h18"/>', help: '<circle cx="12" cy="12" r="9"/><path d="M9.5 9a2.5 2.5 0 1 1 4 2c-1.5 1-1.5 1-1.5 3M12 17h.01"/>', arrow: '<path d="M5 12h14M14 7l5 5-5 5"/>', search: '<circle cx="10.5" cy="10.5" r="6.5"/><path d="M16 16l5 5"/>', plus: '<path d="M12 4v16M4 12h16"/>', play: '<path d="M8 4l12 8-12 8z"/>', refresh: '<path d="M20 7v5h-5M4 17v-5h5M5 8a8 8 0 0 1 13-3l2 2M4 17l2 2a8 8 0 0 0 13-3"/>', eye: '<path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>', focus: '<path d="M8 3H3v5M16 3h5v5M3 16v5h5M21 16v5h-5"/>', close: '<path d="M5 5l14 14M19 5L5 19"/>', timer: '<circle cx="12" cy="13" r="8"/><path d="M12 9v5l3 2M9 2h6M12 2v3M18 5l2-2"/>', print: '<path d="M7 8V3h10v5M7 17H3V9h18v8h-4M7 14h10v7H7zM17 11h1"/>', link: '<path d="M9 15l6-6M8 17l-1 1a4 4 0 0 1-6-6l5-5a4 4 0 0 1 6 0M12 17a4 4 0 0 0 6 0l5-5a4 4 0 0 0-6-6l-1 1"/>', notes: '<path d="M4 3h16v18H4zM8 7h8M8 11h8M8 15h5"/>', pointer: '<path d="M5 3l14 9-7 1-3 7z"/>', eraser: '<path d="M3 15L14 4l7 7-10 10H8zM8 10l7 7M11 21h10"/>', undo: '<path d="M3 5v6h6M3 11l4-4a8 8 0 1 1 0 12"/>', trash: '<path d="M3 6h18M9 6V3h6v3M6 6l1 15h10l1-15M10 10v7M14 10v7"/>', download: '<path d="M12 3v12M7 10l5 5 5-5M4 16v5h16v-5"/>', upload: '<path d="M12 16V4M7 9l5-5 5 5M4 16v5h16v-5"/>', up: '<path d="M5 15l7-7 7 7"/>', down: '<path d="M5 9l7 7 7-7"/>', check: '<path d="M4 12l5 5L20 6"/>', text: '<path d="M4 4h16M12 4v17M8 21h8"/>', line: '<path d="M4 20L20 4M3 19l2 2M19 3l2 2"/>', highlighter: '<path d="M5 15L15 5l5 5-10 10zM5 15l-2 5h6M13 7l5 5"/>', menu: '<path d="M3 6h18M3 12h18M3 18h18"/>', moon: '<path d="M20 15A9 9 0 0 1 9 4a9 9 0 1 0 11 11z"/>', back: '<path d="M19 12H5M10 7l-5 5 5 5"/>', save: '<path d="M4 3h14l3 3v15H3V3zM7 3v7h10V3M7 21v-7h10v7"/>' };
  var ic = (n, sm = false) => `<svg class="ico${sm ? " sm" : ""}" viewBox="0 0 24 24" aria-hidden="true">${iconPaths[n] || iconPaths.grid}</svg>`;
  var btn = (label, action, icon = "", cls = "", extra = "") => `<button type="button" class="btn ${cls}" data-action="${action}" ${extra}>${icon ? ic(icon) : ""}<span>${label}</span></button>`;
  var ib = (label, action, icon, extra = "", active = false) => `<button type="button" class="icon-btn${active ? " active" : ""}" data-action="${action}" title="${label}" aria-label="${label}" ${extra}>${ic(icon)}</button>`;
  var freshSeed = () => crypto.getRandomValues(new Uint32Array(1))[0];
  var STORAGE = "bytesize-whiteboard-v1";
  var canSave = true;
  function readStorage() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE)) || {};
    } catch {
      return {};
    }
  }
  var stored = readStorage();
  var validSkill = (id) => SKILLS.some((s) => s.id === id);
  var prefs = { favorites: Array.isArray(stored.favorites) ? stored.favorites.filter(validSkill) : [], queue: Array.isArray(stored.queue) ? stored.queue.filter(validSkill).slice(0, 50) : [], lessons: [], timerSound: stored.timerSound !== false, font: Number(stored.font) >= 0.85 && Number(stored.font) <= 1.5 ? Number(stored.font) : 1, lastSkill: validSkill(stored.lastSkill) ? stored.lastSkill : "bin-dec", boards: [] };
  function cleanLesson(x) {
    return x && typeof x.title === "string" && Array.isArray(x.skills) && x.skills.length > 0 && x.skills.length <= 50 && x.skills.every(validSkill) && [0, 1, 2, 3].includes(Number(x.level ?? 0)) ? { title: x.title.slice(0, 100), skills: x.skills, level: 0, seed: Number(x.seed) >>> 0 } : null;
  }
  if (Array.isArray(stored.lessons)) prefs.lessons = stored.lessons.map(cleanLesson).filter(Boolean).slice(0, 100);
  var BOARD_TREES = [
    { id: "four", label: "4 symbols · mixed frequencies", characters: 4, equal: false, text: "CACHE" },
    { id: "balanced", label: "4 symbols · equal frequencies", characters: 4, equal: true, text: "TEAMMATE" },
    { id: "five", label: "5 symbols · mixed frequencies", characters: 5, equal: false, text: "BALLOON" },
    { id: "six", label: "6 symbols · mixed frequencies", characters: 6, equal: false, text: "BOOKKEEPER" }
  ];
  var BOARD_PHRASES = [
    ["she-sells-shells", "She sells shells"],
    ["she-sells-sea-shells", "She sells sea shells"],
    ["she-sells-sea-shore", "She sells sea shells by the sea shore"],
    ["peter-piper", "Peter Piper"],
    ["peter-piper-peck", "Peter Piper picked a peck"],
    ["red-lorry", "Red lorry yellow lorry"],
    ["toy-boat", "Toy boat toy boat"],
    ["truly-rural", "Truly rural"],
    ["big-black-bug", "A big black bug"],
    ["betty-botter", "Betty Botter"]
  ].map(([id, label]) => ({ id: "phrase-" + id, label, text: label.toUpperCase() }));
  var boardPhraseByText = new Map(BOARD_PHRASES.map((phrase) => [phrase.text, phrase]));
  var boardTreeFrequencies = (text) => Object.values(huffmanData(text).counts);
  var balancedCounts = (counts) => counts.every((n) => n === counts[0]);
  var BOARD_TREE_SOURCES = [.../* @__PURE__ */ new Set([
    ...BOARD_TREES.map((t) => t.text),
    ...BOARD_PHRASES.map((phrase) => phrase.text),
    "BLUE BELL",
    "RED DEER",
    "SEE THE SEA",
    "GOOD DOG",
    "CLASS ACT",
    "KEEP COOL",
    "BOOK CLUB",
    "LOOP THE LOOP",
    "CODE A CODE",
    "PAPER",
    "MISSISSIPPI",
    "APPLE",
    "LETTER",
    "SCHOOL",
    "TOMATO",
    "COOKBOOK",
    "PEPPERMINT",
    "PEPPER",
    // These words keep four symbols tied even when phrases count their spaces.
    "REAPPEAR",
    "COUSCOUS",
    "BYTE BYTE",
    "CODE CODE",
    "BITS BITS",
    "FILE FILE",
    "LINK LINK",
    "DISK DISK",
    "PLAY PLAY",
    "READ READ",
    ...ENCODING_WORDS.map((word) => word.toUpperCase())
  ])].map((text) => ({ text, counts: boardTreeFrequencies(text) })).filter(({ text, counts }) => text.length > counts.length);
  var boardTreeTexts = new Set([...BOARD_TREE_SOURCES, ...BOARD_PHRASES].map(({ text }) => text));
  var boardTreeSourceLabel = (text) => `${boardTreeTexts.has(text) ? text.includes(" ") ? "Phrase" : "Word" : "Saved text"}: ${text}`;
  var legacyBoardDefaults = { four: "AAAABBCD", balanced: "AAAABBBBCCCCDDDD", five: "AAAAAAAAAAAABBBBBBCCCCDDDE", six: "AAAAAAAABBBBBBCCCCDDDDEEF" };
  function boardTreeCategory(text, preset) {
    if (preset === "phrases" && boardPhraseByText.has(text)) return "phrases";
    const category = BOARD_TREES.find((t) => t.id === preset);
    if (!category) return "random";
    const counts = boardTreeFrequencies(text), equal = balancedCounts(counts);
    return counts.length === category.characters && equal === category.equal ? category.id : "random";
  }
  var BOARD_TEMPLATES = [["none", "No template"], ["binary", "Binary columns"], ["addition-two", "Addition · 2 numbers"], ["addition-three", "Addition · 3 numbers"], ["bitmap", "Bitmap grid"], ["ascii", "ASCII groups"], ["ascii-word-size", "ASCII · word file size"], ["ascii-word-decimal", "ASCII · word to decimal"], ["ascii-word-binary", "ASCII · word to 7-bit binary"], ["huffman", "Huffman tree"], ["rle-encode", "RLE encoding"], ["rle-decode", "RLE decoding"], ["sound", "Sound sampling"]];
  var boardDimension = (n) => Number.isFinite(Number(n)) ? Math.max(1, Math.min(16, Math.round(Number(n)))) : 8;
  function boardBitmapGeometry(page) {
    const w = boardDimension(page.bitmapWidth), h = boardDimension(page.bitmapHeight);
    return { w, h, cell: Math.min(58, 480 / w, 500 / h) };
  }
  var defaultBoardTree = () => ({ preset: "four", text: BOARD_TREES[0].text });
  var boardHuffmanTrees = (page) => page.huffmanTrees?.length ? page.huffmanTrees : [defaultBoardTree()];
  var emptyBoard = () => ({ strokes: [], background: "plain", template: "none", bitmapWidth: 8, bitmapHeight: 8, bitmapPixels: "0".repeat(256), huffmanTrees: [defaultBoardTree()], huffmanIndex: 0, additionSeed: 84231, additionAnswer: false, rleSeed: 81379, rleAnswer: false, rleResponse: "", rleChecked: false, asciiSeed: 48193, asciiAnswer: false, asciiLength: 4 });
  function cleanBoard(x) {
    if (!x || !Array.isArray(x.strokes)) return emptyBoard();
    const huffmanTrees = Array.isArray(x.huffmanTrees) ? x.huffmanTrees.filter((t) => t && typeof t.text === "string" && t.text.length <= 120 && /^[A-Z]+(?: [A-Z]+)*$/.test(t.text) && new Set(t.text).size >= 2).slice(0, 2).map((t) => {
      const preset = boardTreeCategory(t.text, t.preset), category = BOARD_TREES.find((example) => example.id === preset);
      const text = category && x.strokes.length === 0 && t.text === legacyBoardDefaults[preset] ? category.text : t.text;
      return { preset, text };
    }) : [];
    if (!huffmanTrees.length) huffmanTrees.push(defaultBoardTree());
    return { strokes: x.strokes.filter((s) => s && ["pen", "line", "highlighter", "text"].includes(s.tool) && typeof s.color === "string" && /^#[0-9a-f]{6}$/i.test(s.color) && Number.isFinite(s.width) && Array.isArray(s.points) && s.points.length < 2e4 && s.points.every((p) => Array.isArray(p) && p.length === 2 && p.every(Number.isFinite))).slice(0, 1e3).map((s) => ({ ...s, text: String(s.text || "").slice(0, 1e3) })), background: ["plain", "dots", "square"].includes(x.background) ? x.background : "plain", template: BOARD_TEMPLATES.some(([id]) => id === x.template) ? x.template : "none", bitmapWidth: boardDimension(x.bitmapWidth), bitmapHeight: boardDimension(x.bitmapHeight), bitmapPixels: typeof x.bitmapPixels === "string" && /^[01]{256}$/.test(x.bitmapPixels) ? x.bitmapPixels : "0".repeat(256), huffmanTrees, huffmanIndex: Math.min(huffmanTrees.length - 1, Math.max(0, Math.round(Number(x.huffmanIndex) || 0))), additionSeed: Number.isFinite(Number(x.additionSeed)) ? Number(x.additionSeed) >>> 0 : 84231, additionAnswer: x.additionAnswer === true, rleSeed: Number.isFinite(Number(x.rleSeed)) ? Number(x.rleSeed) >>> 0 : 81379, rleAnswer: x.rleAnswer === true, rleResponse: typeof x.rleResponse === "string" && /^[01]{0,30}$/.test(x.rleResponse) ? x.rleResponse : "", rleChecked: x.rleChecked === true, asciiSeed: Number.isFinite(Number(x.asciiSeed)) ? Number(x.asciiSeed) >>> 0 : 48193, asciiAnswer: x.asciiAnswer === true, asciiLength: [3, 4, 5, 6].includes(Number(x.asciiLength)) ? Number(x.asciiLength) : 4 };
  }
  prefs.boards = Array.isArray(stored.boards) && stored.boards.length ? stored.boards.slice(0, 20).map(cleanBoard) : [emptyBoard()];
  function persist() {
    try {
      localStorage.setItem(STORAGE, JSON.stringify(prefs));
    } catch {
      canSave = false;
      toast("This browser could not save the changes. Export your lesson or board to keep a copy.");
    }
  }
  var state = { view: "library", skill: prefs.lastSkill, level: 2, seed: 718245, rounds: [0, 0, 0], search: "", topic: "all", libraryUnit: "all", favOnly: false, focus: -1, scaffold: false, pen: "pointer", color: "#7352ad", inkWidth: 3, showAll: false, projector: false, sixScreen: false, sixPage: 0, sixNative: false, lesson: null, practiceSkill: null, practiceSeed: 581933, practiceCount: 6, practiceIds: [...UNIT3_IDS], practiceOptionsOpen: false, practiceQs: [], worksheetIds: [...UNIT3_IDS], worksheetCount: 12, worksheetSeed: 249016, worksheetQs: [], worksheetNotice: "", worksheetTitle: "Bytesize practice worksheet", boardIndex: 0, boardTool: "pen", boardColor: "#3c2b50", boardWidth: 3 };
  var logicWorkshop = createLogicWorkshop();
  var openUnitGroups = /* @__PURE__ */ new Set(["practice-topics-3", "practice-types-3", "worksheet-topics-3"]);
  var qState = /* @__PURE__ */ new Map();
  var qIndex = /* @__PURE__ */ new Map();
  var boardHistory = /* @__PURE__ */ new Map();
  var modelQs = [];
  var sixInkHistory = [];
  var deletedBoardPages = [];
  var bitmapResizeEdit = null;
  var boardTreeRound = 0;
  var toastTimeout;
  var timer = { remaining: 300, duration: 300, running: false, deadline: 0, done: false };
  function qa(q2) {
    if (!qState.has(q2.id)) qState.set(q2.id, { answers: q2.fields.map((f) => f.kind === "bitmap" ? "0".repeat(q2.meta.data.length) : ""), written: "", steps: 0, model: false, hint: false, feedback: null, success: false, ink: [] });
    qIndex.set(q2.id, q2);
    return qState.get(q2.id);
  }
  function makeModelQuestions() {
    const signatures = /* @__PURE__ */ new Set();
    return [0, 1, 2].map((i) => {
      let q2;
      for (let attempt = 0; attempt < 100; attempt++) {
        q2 = makeQuestion(state.skill, state.level, state.seed + i * 81737 + state.rounds[i] * 100003 + attempt * 97 >>> 0, { legacyHuffman: state.legacyHuffman && state.rounds[i] === state.legacyHuffmanRounds[i] });
        const signature = q2.prompt + q2.figure;
        if (!signatures.has(signature)) {
          signatures.add(signature);
          break;
        }
      }
      return q2;
    });
  }
  function toast(s) {
    const el = $("#toast");
    el.textContent = s;
    el.classList.add("show");
    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => el.classList.remove("show"), 3300);
  }
  function route(view, params = {}) {
    const p = new URLSearchParams(params);
    location.hash = view + (p.size ? "?" + p.toString() : "");
  }
  function teachRoute(id = state.skill, level = 0, seed = freshSeed(), rounds = [0, 0, 0], legacyRounds = null) {
    route("teach", { skill: id, seed, r: rounds.join(","), ...id.startsWith("huffman-") ? { huffman: legacyRounds?.join(",") || "2" } : {} });
  }
  function readRoute() {
    const raw = location.hash.slice(1) || "library", [v, query = ""] = raw.split("?"), p = new URLSearchParams(query);
    let invalidSet = false;
    state.view = ["library", "teach", "practice", "worksheets", "blank", "logic", "lessons"].includes(v) ? v : "library";
    if (state.sixScreen && state.view !== "practice") exitSixQuestionScreen();
    if (state.view === "teach") {
      state.skill = validSkill(p.get("skill")) ? p.get("skill") : state.skill;
      state.seed = p.has("seed") ? Number(p.get("seed")) >>> 0 : state.seed;
      state.level = [1, 2, 3].includes(Number(p.get("level"))) ? Number(p.get("level")) : 1 + state.seed % 3;
      state.rounds = (p.get("r") || "0,0,0").split(",").slice(0, 3).map((x) => Math.max(0, Math.min(999, parseInt(x) || 0)));
      while (state.rounds.length < 3) state.rounds.push(0);
      const huffman = p.get("huffman");
      state.legacyHuffman = state.skill.startsWith("huffman-") && p.has("seed") && (huffman === null || /^\d{1,3}(?:,\d{1,3}){2}$/.test(huffman));
      state.legacyHuffmanRounds = huffman && state.legacyHuffman ? huffman.split(",").map(Number) : [...state.rounds];
      prefs.lastSkill = state.skill;
      persist();
      modelQs = makeModelQuestions();
    }
    if (state.view === "practice") {
      if (p.has("set")) invalidSet = !restorePracticeSet(p);
      if (!p.has("set") || invalidSet) {
        state.practiceSkill = validSkill(p.get("skill")) ? p.get("skill") : null;
        if (invalidSet) {
          state.practiceIds = [...UNIT3_IDS];
          state.practiceQs = [];
          state.sixPage = 0;
          refreshPracticeSeed();
        }
        if (!state.practiceQs.length || state.practiceSkill !== state.practiceQs[0]?.sourceSkill) generatePractice();
      }
    }
    render();
    if (invalidSet) toast("This question set link is invalid or unsupported. A fresh set is shown instead.");
    window.scrollTo(0, 0);
  }
  window.addEventListener("hashchange", readRoute);
  function render() {
    document.documentElement.style.setProperty("--qscale", prefs.font);
    document.body.classList.toggle("presentation", state.projector);
    document.body.classList.toggle("six-question-mode", state.sixScreen && state.view === "practice");
    if (state.sixScreen && state.view === "practice") {
      $("#app").innerHTML = sixQuestionScreen();
      bindDrawing();
      timerTick();
      return;
    }
    const names = { library: "Activity library", teach: "Teaching board", practice: state.practiceSkill ? "Independent practice" : "Mixed retrieval", worksheets: "Worksheets", blank: "Blank board", logic: "Logic workshop", lessons: "Saved lessons" };
    $("#app").innerHTML = `<div class="layout"><aside class="sidebar" aria-label="Main navigation"><button class="brand" data-action="nav" data-view="library" aria-label="Bytesize Whiteboard home"><span class="brand-mark">B.</span><span><strong>Bytesize</strong><small>WHITEBOARD</small></span></button><div class="nav-label">YOUR TEACHING SPACE</div><nav class="nav">${[["library", "Activity library", "grid"], ["teach", "Teaching board", "board"], ["practice", "Mixed retrieval", "recall"], ["worksheets", "Worksheets", "paper"], ["blank", "Blank board", "pen"], ["logic", "Logic workshop", "grid"], ["lessons", "Saved lessons", "folder"]].map(([id, label, icon]) => `<button type="button" data-action="nav" data-view="${id}" class="${state.view === id ? "active" : ""}" ${state.view === id ? 'aria-current="page"' : ""}>${ic(icon)}${label}${id === "lessons" ? `<span class="count" id="queue-count">${prefs.queue.length}</span>` : ""}</button>`).join("")}</nav><div class="unit-tag"><span>AQA 8525 · UNITS 3 &amp; 4</span><strong>Data representation<br>and computer systems</strong><p>One classroom workspace.</p></div><div class="sidebar-bottom"><button data-action="about">${ic("help")} Guide & specification</button><div class="sidebar-foot">Made for modelling and practice.<br>Original Bytesize teaching questions.<br>Independent of AQA and BBC Bitesize.</div></div></aside><div class="content"><header class="topbar"><div class="breadcrumb">${ib("Open navigation", "menu", "menu", "", false).replace('class="icon-btn', 'class="icon-btn mobile-menu')}<span class="muted">${state.view === "logic" ? "Unit 4" : "AQA 8525"}</span><span class="crumb-sep muted">/</span><strong>${names[state.view]}</strong></div><div class="top-actions"><a class="pill hub-return hub-return-teacher" href="../index.html" aria-label="Back to Bytesize Student and Teacher selection"><span aria-hidden="true">←</span> Bytesize home</a><span class="font-tools">${ib("Decrease question text size", "font-down", "minus")}${ib("Increase question text size", "font-up", "plus")}</span><button class="btn small timer-badge${timer.done ? " done" : ""}" data-action="timer" aria-label="Open classroom timer">${ic("timer", true)}<span id="timer-text">${timeText(timer.remaining)}</span></button>${ib(state.projector ? "Leave projector mode" : "Projector mode", "projector", "focus", "", state.projector)}</div></header><main id="main" tabindex="-1">${state.view === "library" ? library() : state.view === "teach" ? teaching() : state.view === "practice" ? practice() : state.view === "worksheets" ? worksheets() : state.view === "blank" ? blankBoard() : state.view === "logic" ? logicWorkshop.html() : lessons()}</main></div></div>`;
    if (state.view === "practice") syncPracticeChoices();
    if (state.view === "logic") logicWorkshop.bind($("#logic-tool"));
    if (state.view === "teach" || state.view === "blank") bindDrawing();
  }
  function filteredSkills() {
    return SKILLS.filter((s) => (state.libraryUnit === "all" || s.ref.startsWith("3." + state.libraryUnit + ".")) && (state.topic === "all" || s.topic === state.topic) && (!state.favOnly || prefs.favorites.includes(s.id)) && `${s.title} ${s.desc} ${s.ref} ${s.objective} ${TOPICS.find((t) => t.id === s.topic).title}`.toLowerCase().includes(state.search.toLowerCase()));
  }
  function libraryList() {
    const filtered = filteredSkills();
    return filtered.length ? UNITS.map((unit) => TOPICS.some((t) => t.unit === unit.id && filtered.some((s) => s.topic === t.id)) ? `<section aria-label="Unit ${unit.id} · ${unit.title}"><div class="unit-heading"><span class="tag">UNIT ${unit.id}</span><h2>${unit.title}</h2></div>${TOPICS.filter((t) => t.unit === unit.id).map((t) => {
      const skills = filtered.filter((s) => s.topic === t.id);
      return skills.length ? `<section class="topic-block" style="--topic:${t.color}"><header class="topic-head"><div class="topic-symbol">${t.icon}</div><div><h2>${t.title}</h2><p>${t.ref} · ${t.desc}</p></div><span class="tag">${skills.length} teaching skills</span></header>${skills.map((s, i) => `<div class="skill-row"><span class="row-number">${String(i + 1).padStart(2, "0")}</span><div class="skill-meta"><strong>${s.title}</strong><small>${s.desc}</small></div><button type="button" class="fav ${prefs.favorites.includes(s.id) ? "selected" : ""}" data-action="favorite" data-skill="${s.id}" aria-label="${prefs.favorites.includes(s.id) ? "Remove from" : "Add to"} favourites: ${s.title}" aria-pressed="${prefs.favorites.includes(s.id)}">${prefs.favorites.includes(s.id) ? "★" : "☆"}</button><div class="buttons">${btn("Model", "launch", "board", "small", `data-skill="${s.id}" title="I do, We do, You do: ${s.title}"`)}${btn("Practise", "practise", "play", "small ghost", `data-skill="${s.id}" title="Independent practice: ${s.title}"`)}${ib("Add to lesson", "add-queue", "plus", `data-skill="${s.id}"`)}</div></div>`).join("")}</section>` : "";
    }).join("")}</section>` : "").join("") : `<div class="empty"><h2>No matching skills</h2><p>Try another topic or search term, or turn off the favourites filter.</p>${btn("Reset filters", "reset-filters", "refresh", "small")}</div>`;
  }
  function library() {
    return `<div class="page"><section class="hero"><div class="hero-copy"><div class="eyebrow">THE COMPUTER SCIENCE CLASSROOM</div><h1>A clear path from<br>“I do” to “You do”.</h1><p>Model the method. Work through it together. Give every learner a fresh question to make it their own.</p><div class="buttons">${btn("Start teaching", "launch", "board", "dark", `data-skill="${prefs.lastSkill}"`)}${btn("Open blank board", "nav", "pen", "", `data-view="blank"`)}</div></div><div class="hero-art" aria-hidden="true"><span class="sparkle">✧</span><div class="mini-board"><div class="mini-label">BINARY ADDITION · I DO</div><div class="mini-binary">&nbsp;00101101<br>+00010011</div><div class="mini-answer">&nbsp;01000000</div></div><div class="floating-tag">Small steps. Clear thinking. ✓</div></div></section><div class="quick-strip"><button class="quick-card" data-action="nav" data-view="practice"><span class="quick-icon">${ic("recall")}</span><span><strong>A fresh Do Now</strong><small>Unit 3 and Unit 4 questions</small></span>${ic("arrow")}</button><button class="quick-card" data-action="nav" data-view="worksheets"><span class="quick-icon">${ic("paper")}</span><span><strong>Build a worksheet</strong><small>Questions & teacher answers</small></span>${ic("arrow")}</button><button class="quick-card" data-action="nav" data-view="lessons"><span class="quick-icon">${ic("folder")}</span><span><strong>Plan a sequence</strong><small>Save your teaching flow</small></span>${ic("arrow")}</button></div><div class="section-title"><h2>Find your next teaching moment</h2><p>${TOPICS.length} topic areas · ${SKILLS.length} skills · Fresh question variants</p></div><div class="library-toolbar"><div class="search-wrap">${ic("search")}<input type="search" id="skill-search" aria-label="Search teaching skills" placeholder="Search a skill, concept or specification point…" value="${esc(state.search)}"></div><select id="topic-select" aria-label="Filter topic"><option value="all">All topics in view</option>${UNITS.filter((u) => state.libraryUnit === "all" || state.libraryUnit === u.id).map((u) => `<optgroup label="Unit ${u.id} · ${u.title}">${TOPICS.filter((t) => t.unit === u.id).map((t) => `<option value="${t.id}" ${state.topic === t.id ? "selected" : ""}>${t.title}</option>`).join("")}</optgroup>`).join("")}</select><button class="btn ${state.favOnly ? "primary" : ""}" data-action="fav-filter" aria-pressed="${state.favOnly}">☆ Favourites</button></div><div class="unit-filter" role="group" aria-label="Filter by unit">${[["all", "Both units"], ...UNITS.map((u) => [u.id, `Unit ${u.id} · ${u.title}`])].map(([id, label]) => btn(label, "library-unit", "", "small", `data-unit="${id}" aria-pressed="${state.libraryUnit === id}"`)).join("")}</div><div id="topic-list">${libraryList()}</div><div class="library-summary"><span><i class="dot"></i>AQA 8525 · Sections 3.3 and 3.4</span><span>Original Bytesize teaching and practice questions</span><button class="btn small ghost" data-action="about">Content guide ${ic("arrow", true)}</button></div></div>`;
  }
  function fieldHTML(q2, f, i) {
    const s = qa(q2), v = s.answers[i] || "", id = `f-${q2.id}-${i}`, common = `data-q="${q2.id}" data-field="${i}"`;
    if (f.kind === "bitmap") return `<div class="answer-field"><label>${f.label}</label>${bitmapFigure(v || "0".repeat(q2.meta.data.length), q2.meta.w, true, q2.id)}<p class="answer-help">Click or use Tab and Space to toggle each pixel.</p></div>`;
    if (f.kind === "addition") {
      return `<div class="answer-field"><label id="${id}-label">${f.label}</label><div class="bit-labels" aria-hidden="true">${[128, 64, 32, 16, 8, 4, 2, 1].map((w) => `<span>${w}</span>`).join("")}</div><div class="bit-inputs" role="group" aria-labelledby="${id}-label">${Array.from({ length: 8 }, (_, j) => `<input type="text" inputmode="numeric" pattern="[01]" maxlength="1" autocomplete="off" spellcheck="false" aria-label="Answer bit at place ${2 ** (7 - j)}" value="${esc(v[j] || "")}" ${common} data-bit="${j}">`).join("")}</div><p class="answer-help">Start in the rightmost box. Each digit moves you one box to the left. Paste a complete answer into any box.</p></div>`;
    }
    return `<div class="answer-field"><label for="${id}">${f.label}</label><input id="${id}" type="text" ${f.kind === "number" ? 'inputmode="decimal"' : f.kind === "binary" || f.kind === "bitstream" ? 'inputmode="numeric"' : ""} autocomplete="off" spellcheck="false" value="${esc(v)}" ${common}/></div>`;
  }
  function modelHTML(q2) {
    return `<div class="model-answer"><strong>Model response</strong>${q2.fields.length ? q2.fields.map((f) => f.kind === "bitmap" ? q2.solutionFigure : `<div class="model-row"><span>${f.label}</span><code>${esc(f.answer)}</code></div>`).join("") : `<ul>${q2.points.map((p) => `<li>${p}</li>`).join("")}</ul>${q2.solutionFigure || ""}`}</div>`;
  }
  function questionContent(q2, card = false) {
    const s = qa(q2), showModel = s.model || card && state.showAll;
    return `<div class="question-copy">${q2.prompt}</div>${q2.figure ? `<div class="figure">${q2.figure}</div>` : ""}${q2.fields.length ? `<div class="answer-fields">${q2.fields.map((f, i) => fieldHTML(q2, f, i)).join("")}</div>` : `<div class="answer-field"><label for="written-${q2.id}">Your explanation / class notes</label><textarea id="written-${q2.id}" data-written="${q2.id}" rows="3">${esc(s.written)}</textarea><p class="answer-help">Written responses are compared with the model and assessed by you.</p></div>`}<div class="buttons">${q2.fields.length ? btn("Check", "check", "check", "small primary", `data-q="${q2.id}"`) : btn("Compare response", "reveal", "eye", "small", `data-q="${q2.id}"`)}${btn(s.hint ? "Hide hint" : "Hint", "hint", "help", "small ghost", `data-q="${q2.id}"`)}</div>${s.feedback ? `<p class="feedback ${s.success ? "good" : "bad"}" role="status">${s.feedback}</p>` : ""}${s.hint || state.scaffold && card ? `<div class="hint"><strong>Think about:</strong> ${q2.hint}</div>` : ""}${s.steps ? `<div class="working-label">Worked method</div><ol class="step-list">${q2.steps.slice(0, s.steps).map((step, i) => `<li><span class="step-dot">${i + 1}</span>${step.body}</li>`).join("")}</ol>` : ""}${showModel ? modelHTML(q2) : ""}${!q2.fields.length && showModel ? `<div class="buttons">${btn("Meets the key points", "self-good", "check", "small", `data-q="${q2.id}"`)}${btn("Needs more work", "self-redo", "refresh", "small ghost", `data-q="${q2.id}"`)}</div>` : ""}`;
  }
  function drawingToolbar() {
    return `<div class="drawing-tools" aria-label="Annotation tools">${ib("Pointer: interact with questions", "ink-pointer", "pointer", "", state.pen === "pointer")}${ib("Pen: draw over the question", "ink-pen", "pen", "", state.pen === "pen")}${state.sixScreen ? `${ib("Highlighter", "ink-highlighter", "highlighter", "", state.pen === "highlighter")}${ib("Straight line", "ink-line", "line", "", state.pen === "line")}` : ""}${ib("Erase an annotation", "ink-eraser", "eraser", "", state.pen === "eraser")}${["#7352ad", "#287e69", "#cf6949", "#352343"].map((c) => `<button class="swatch ${state.color === c ? "active" : ""}" style="--swatch:${c}" data-action="ink-color" data-color="${c}" aria-label="${{ "#7352ad": "Purple", "#287e69": "Green", "#cf6949": "Orange", "#352343": "Dark" }[c]} annotation ink" aria-pressed="${state.color === c}"></button>`).join("")}${state.sixScreen ? `<label class="ink-width-label">Width <input id="ink-width" type="range" min="1" max="8" value="${state.inkWidth}" aria-label="Annotation line width"></label>` : ""}${ib(state.sixScreen ? "Undo latest visible annotation" : "Undo last annotation in each visible column", "ink-undo", "undo")}${ib(state.sixScreen ? "Clear annotations on visible questions" : "Clear annotations", "ink-clear", "trash")}</div>`;
  }
  function rememberSixInk(qs) {
    sixInkHistory.push(qs.map((q2) => ({ id: q2.id, ink: JSON.parse(JSON.stringify(qa(q2).ink)) })));
    if (sixInkHistory.length > 30) sixInkHistory.shift();
  }
  function undoSixInk() {
    const visible = new Set(visibleSixQuestions().map((q2) => q2.id)), index = sixInkHistory.findLastIndex((changes2) => changes2.some((c) => visible.has(c.id)));
    if (index < 0) return;
    const changes = sixInkHistory.splice(index, 1)[0];
    for (const c of changes) if (visible.has(c.id)) qState.get(c.id).ink = c.ink;
  }
  function teaching() {
    const sk = SKILLS.find((s) => s.id === state.skill);
    if (!modelQs.length) modelQs = makeModelQuestions();
    return `<div class="page teach-page"><div class="teach-heading"><div><div class="eyebrow">${sk.ref} · ${TOPICS.find((t) => t.id === sk.topic).title}</div><h1>${sk.title}</h1><p>${sk.objective}</p></div><div class="buttons">${btn("Browse skills", "nav", "grid", "small", `data-view="library"`)}${btn("Add to lesson", "add-queue", "plus", "small", `data-skill="${sk.id}"`)}${ib("Teacher notes", "teacher-notes", "notes")}${sk.topic === "boolean-logic" ? btn("Logic workshop", "nav", "grid", "small", `data-view="logic"`) : ""}</div></div>${state.lesson ? `<div class="lesson-nav"><strong>${esc(state.lesson.title)}</strong><span>${state.lesson.index + 1} of ${state.lesson.skills.length}</span><div class="buttons">${btn("Previous", "lesson-prev", "back", "small", state.lesson.index === 0 ? "disabled" : "")}${btn("Next skill", "lesson-next", "arrow", "small", state.lesson.index === state.lesson.skills.length - 1 ? "disabled" : "")}${ib("Leave sequence", "leave-lesson", "close")}</div></div>` : ""}<div class="controls"><div class="buttons">${btn("New set", "new-set", "refresh", "small")}<span class="sep"></span>${ib(state.showAll ? "Hide all answers" : "Reveal all answers", "all-answers", "eye", "", state.showAll)}${ib("Copy this activity link", "copy-link", "link")}${ib("Print these questions", "print-teach", "print")}</div>${drawingToolbar()}</div><div class="buttons" style="margin-bottom:14px;justify-content:space-between"><label class="toggle-label"><input type="checkbox" id="scaffolds" ${state.scaffold ? "checked" : ""}> Show scaffolds in all columns</label><div class="buttons">${state.focus >= 0 ? btn("Show all three columns", "unfocus", "grid", "small ghost") : ""}<span class="kbd-hint"><kbd>N</kbd> new set · <kbd>A</kbd> answers</span></div></div><div class="stage-grid ${state.focus >= 0 ? "focus-view" : ""}">${modelQs.map((q2, i) => {
      const s = qa(q2);
      return `<article class="stage-card ${["i", "we", "you"][i]} ${s.success ? "success" : ""} ${state.focus === i ? "focused" : ""}"><header class="stage-head"><span class="stage-number">0${i + 1}</span><div><strong>${["I do", "We do", "You do"][i]}</strong><small>${["Watch the method", "Think it through together", "Have a go independently"][i]}</small></div><div class="stage-actions"><button data-action="regen-card" data-index="${i}" aria-label="New ${["I do", "We do", "You do"][i]} question" title="New question">${ic("refresh")}</button><button data-action="focus-card" data-index="${i}" aria-label="Focus ${["I do", "We do", "You do"][i]}" title="Focus this column">${ic("focus")}</button></div></header><div class="stage-body">${questionContent(q2, true)}<svg class="ink-layer ${state.pen !== "pointer" ? "enabled" : ""}" data-ink="${q2.id}" viewBox="0 0 1000 1000" preserveAspectRatio="none" aria-label="Drawing annotations"><g class="ink-content">${strokesHTML(s.ink)}</g></svg></div><footer class="stage-foot"><div class="buttons">${btn(s.steps >= q2.steps.length ? "Hide working" : "Next step", "step", "play", "small", `data-q="${q2.id}"`)}${btn(s.model || state.showAll ? "Hide answer" : "Answer", "reveal", "eye", "small ghost", `data-q="${q2.id}"`)}</div><span class="step-count">${s.steps}/${q2.steps.length} steps</span></footer></article>`;
    }).join("")}</div><div class="teacher-note">${ic("help", true)}<span><strong>Listen for the misconception:</strong> ${sk.misconception}</span></div><div class="buttons" style="margin-top:16px;justify-content:flex-end">${btn("Six practice questions", "practise", "paper", "small", `data-skill="${sk.id}"`)}${btn("Full screen · 6 questions", "six-screen-skill", "focus", "small primary", `data-skill="${sk.id}"`)}${btn("Use this skill in a worksheet", "skill-worksheet", "print", "small ghost", `data-skill="${sk.id}"`)}</div></div>`;
  }
  function shuffled(a, random) {
    const b = [...a];
    for (let i = b.length - 1; i > 0; i--) {
      const j = Math.floor(random() * (i + 1));
      [b[i], b[j]] = [b[j], b[i]];
    }
    return b;
  }
  function buildSet(ids, count, level, seed) {
    const random = rng(seed), deck = interleaveUnits(shuffled(ids, random));
    return Array.from({ length: count }, (_, i) => makeQuestion(deck[i % deck.length], level || i % 3 + 1, seed + i * 104729 >>> 0));
  }
  function refreshPracticeSeed() {
    const next = freshSeed();
    state.practiceSeed = next === state.practiceSeed ? next + 1 >>> 0 : next;
  }
  function practiceQuestionIds() {
    return state.practiceSkill ? [state.practiceSkill] : SKILLS.filter((s) => state.practiceIds.includes(s.id)).map((s) => s.id);
  }
  function practiceTopicSelection(topic) {
    const skills = SKILLS.filter((s) => s.topic === topic), count = skills.filter((s) => state.practiceIds.includes(s.id)).length;
    return { skills, count, all: count === skills.length, mixed: count > 0 && count < skills.length };
  }
  function practiceSelectionStatus() {
    const topics = TOPICS.filter((t) => practiceTopicSelection(t.id).count > 0).length;
    return `${topics} of ${TOPICS.length} topics selected · ${state.practiceIds.length} of ${SKILLS.length} question types.`;
  }
  function syncPracticeChoices() {
    $$("[data-practice-topic]").forEach((el) => {
      const selection = practiceTopicSelection(el.dataset.practiceTopic);
      el.checked = selection.all;
      el.indeterminate = selection.mixed;
      el.setAttribute("aria-checked", selection.mixed ? "mixed" : String(selection.all));
    });
    $$("[data-practice-type]").forEach((el) => el.checked = state.practiceIds.includes(el.dataset.practiceType));
    $$("[data-practice-topic-count]").forEach((el) => {
      const { skills, count } = practiceTopicSelection(el.dataset.practiceTopicCount);
      el.textContent = `${count}/${skills.length}`;
    });
    if ($("#practice-selection-status")) $("#practice-selection-status").textContent = practiceSelectionStatus();
    if ($("#practice-types-count")) $("#practice-types-count").textContent = `${state.practiceIds.length} selected`;
    syncUnitCounts("practice-topics", state.practiceIds);
    syncUnitCounts("practice-types", state.practiceIds);
  }
  function selectPracticeTopic(topic, selected) {
    const ids = new Set(state.practiceIds);
    SKILLS.filter((s) => s.topic === topic).forEach((s) => selected ? ids.add(s.id) : ids.delete(s.id));
    state.practiceIds = SKILLS.filter((s) => ids.has(s.id)).map((s) => s.id);
    syncPracticeChoices();
  }
  var skillIdsForUnit = (unit) => SKILLS.filter((s) => s.ref.startsWith("3." + unit + ".")).map((s) => s.id);
  function countForUnit(unit, ids) {
    return skillIdsForUnit(unit).filter((id) => ids.includes(id)).length;
  }
  function unitMenu(section, ids, content) {
    return UNITS.map((u) => {
      const key2 = section + "-" + u.id, max = skillIdsForUnit(u.id).length;
      return `<details class="unit-options" data-unit-group="${key2}" ${openUnitGroups.has(key2) ? "open" : ""}><summary>Unit ${u.id} · ${u.title}<span data-unit-count="${section}-${u.id}">${countForUnit(u.id, ids)}/${max} selected</span></summary><div class="unit-option-body">${content(TOPICS.filter((t) => t.unit === u.id))}</div></details>`;
    }).join("");
  }
  function syncUnitCounts(section, ids) {
    for (const unit of UNITS) {
      const target = $(`[data-unit-count="${section}-${unit.id}"]`);
      if (target) target.textContent = `${countForUnit(unit.id, ids)}/${skillIdsForUnit(unit.id).length} selected`;
    }
  }
  function unitShortcuts(scope) {
    return `<div class="buttons topic-selection-actions" role="group" aria-label="Select questions by unit">${UNITS.map((u) => btn("Unit " + u.id + " only", "choose-unit", "", "small ghost", `data-unit="${u.id}" data-scope="${scope}"`)).join("")}${btn("Both units", scope === "practice" ? "practice-topics-all" : "ws-all", "", "small ghost")}${btn("Clear all", scope === "practice" ? "practice-topics-none" : "ws-none", "", "small ghost")}</div>`;
  }
  function practiceTopicOptions() {
    return unitMenu("practice-topics", state.practiceIds, (topics) => `<div class="check-group practice-topic-choices">${topics.map((t) => {
      const { skills, count, all, mixed } = practiceTopicSelection(t.id);
      return `<label><input type="checkbox" data-practice-topic="${t.id}" ${all ? "checked" : ""} aria-checked="${mixed ? "mixed" : String(all)}">${t.title}<span data-practice-topic-count="${t.id}">${count}/${skills.length}</span></label>`;
    }).join("")}</div>`);
  }
  function worksheetTopicOptions() {
    return unitMenu("worksheet-topics", state.worksheetIds, (topics) => topics.map((t) => `<details data-unit-group="worksheet-topic-${t.id}" ${openUnitGroups.has("worksheet-topic-" + t.id) ? "open" : ""}><summary>${t.title}</summary><div class="check-group">${SKILLS.filter((s) => s.topic === t.id).map((s) => `<label><input type="checkbox" data-worksheet-skill="${s.id}" ${state.worksheetIds.includes(s.id) ? "checked" : ""}>${s.title}</label>`).join("")}</div></details>`).join(""));
  }
  function practiceTypeOptions() {
    return `<details class="practice-type-options" id="practice-types" ${state.practiceOptionsOpen ? "open" : ""}><summary><span>Choose specific question types</span><span class="practice-types-count" id="practice-types-count">${state.practiceIds.length} selected</span></summary><p class="practice-types-help">Pick individual question types across any topics. Select Generate fresh set to apply your choices.</p>${unitMenu("practice-types", state.practiceIds, (topics) => `<div class="practice-type-groups">${topics.map((t) => {
      const { skills, count } = practiceTopicSelection(t.id);
      return `<fieldset class="practice-type-group"><legend>${t.title} <span data-practice-topic-count="${t.id}">${count}/${skills.length}</span></legend><div class="buttons practice-type-actions">${btn("Select all", "practice-type-topic-all", "", "small ghost", `data-topic="${t.id}" aria-label="Select all ${t.title} question types"`)}${btn("Clear all", "practice-type-topic-none", "", "small ghost", `data-topic="${t.id}" aria-label="Clear all ${t.title} question types"`)}</div><div class="practice-type-list">${skills.map((s) => `<label title="${esc(s.desc)}"><input type="checkbox" data-practice-type="${s.id}" ${state.practiceIds.includes(s.id) ? "checked" : ""}><span>${s.title}</span></label>`).join("")}</div></fieldset>`;
    }).join("")}</div>`)}</details>`;
  }
  function generatePractice() {
    const ids = practiceQuestionIds();
    if (!ids.length) {
      toast("Choose at least one question type.");
      return false;
    }
    state.practiceQs = buildSet(ids, state.practiceCount, 0, state.practiceSeed);
    state.practiceQs.forEach((q2) => q2.sourceSkill = state.practiceSkill);
    return true;
  }
  var practiceCounts = [4, 6, 10, 12, 16, 20];
  function practiceSetUrl() {
    const url = new URL(location.href), params = new URLSearchParams();
    params.set("set", "1~" + state.practiceQs.map((q2) => `${q2.skill}.${q2.level}.${q2.seed.toString(36)}`).join("~"));
    const updatedHuffman = state.practiceQs.flatMap((q2, i) => q2.skill.startsWith("huffman-") && !q2.legacyHuffman ? [i + 1] : []);
    if (updatedHuffman.length) params.set("huffman", updatedHuffman.join(","));
    if (state.practiceSkill) params.set("skill", state.practiceSkill);
    else if (state.practiceIds.length !== UNIT3_IDS.length || state.practiceIds.some((id) => !UNIT3_IDS.includes(id))) params.set("types", state.practiceIds.join("~"));
    url.hash = "practice?" + params.toString();
    return url.href;
  }
  function restorePracticeSet(params) {
    const encoded = params.get("set"), types = params.get("types"), skill3 = params.get("skill");
    if (!encoded || encoded.length > 1400 || (types?.length ?? 0) > 2400 || skill3 !== null && !validSkill(skill3)) return false;
    const [version, ...entries] = encoded.split("~");
    if (version !== "1" || !practiceCounts.includes(entries.length) || new Set(entries).size !== entries.length) return false;
    const selected = types === null ? [...UNIT3_IDS] : types ? types.split("~") : [];
    if (new Set(selected).size !== selected.length || selected.some((id) => !validSkill(id))) return false;
    const specs = entries.map((entry) => {
      const match = /^([a-z0-9-]+)\.([1-3])\.(0|[1-9a-z][0-9a-z]{0,6})$/.exec(entry);
      if (!match || !validSkill(match[1]) || skill3 !== null && match[1] !== skill3) return null;
      const seed = parseInt(match[3], 36);
      return seed <= 4294967295 ? [match[1], Number(match[2]), seed] : null;
    });
    if (specs.some((spec) => !spec)) return false;
    const huffman = params.get("huffman"), updatedHuffman = huffman === null ? [] : huffman.split(",").map(Number);
    if (huffman !== null && (!/^[1-9]\d?(?:,[1-9]\d?)*$/.test(huffman) || new Set(updatedHuffman).size !== updatedHuffman.length || updatedHuffman.some((i) => !specs[i - 1]?.[0].startsWith("huffman-")))) return false;
    const questions = specs.map(([id, level, seed], i) => ({ ...makeQuestion(id, level, seed, { legacyHuffman: !updatedHuffman.includes(i + 1) }), sourceSkill: skill3 }));
    for (const q2 of questions) {
      qState.delete(q2.id);
      qIndex.delete(q2.id);
    }
    state.practiceQs = questions;
    state.practiceCount = questions.length;
    state.practiceSkill = skill3;
    state.practiceIds = selected;
    state.sixPage = 0;
    sixInkHistory = [];
    return true;
  }
  async function copyPracticeSetLink() {
    if (!state.practiceQs.length) return;
    const link = practiceSetUrl();
    try {
      await navigator.clipboard.writeText(link);
      toast("Link copied for this exact question set.");
    } catch {
      showModal("Copy question set link", `<p>Copy this link to reopen the same questions in order. Responses and whiteboard marks aren’t included.</p><div class="field"><label for="practice-share-url">Question set link</label><input id="practice-share-url" type="text" readonly value="${esc(link)}"></div>`);
      $("#practice-share-url").focus();
      $("#practice-share-url").select();
    }
  }
  function practiceRefreshButton(index) {
    return btn("Refresh", "refresh-practice-question", "refresh", "small ghost practice-question-refresh", `data-index="${index}" aria-label="Refresh question ${index + 1}" title="Refresh question ${index + 1} from your selected categories"`);
  }
  function refreshPracticeQuestion(index) {
    if (state.view !== "practice" || !Number.isInteger(index) || index < 0 || index >= state.practiceQs.length) return false;
    const active = practiceQuestionIds();
    if (!active.length) {
      toast("Choose at least one question type.");
      return false;
    }
    const previous = state.practiceQs[index], blocked = new Set(state.practiceQs.map((q2) => q2.prompt + q2.figure)), ids = new Set(state.practiceQs.map((q2) => q2.id)), seed = freshSeed();
    const topic = SKILLS.find((skill3) => skill3.id === previous.skill).topic, random = rng(seed);
    const otherTopics = active.filter((id) => SKILLS.find((skill3) => skill3.id === id).topic !== topic), otherTypes = active.filter((id) => id !== previous.skill && !otherTopics.includes(id));
    const categories = [...shuffled(otherTopics, random), ...shuffled(otherTypes, random), ...active.filter((id) => id === previous.skill)];
    for (const skill3 of categories) for (let attempt = 0; attempt < 240; attempt++) {
      const replacement = makeQuestion(skill3, previous.level, seed + attempt * 104729 >>> 0);
      if (ids.has(replacement.id) || blocked.has(replacement.prompt + replacement.figure)) continue;
      replacement.sourceSkill = previous.sourceSkill;
      state.practiceQs[index] = replacement;
      qState.delete(previous.id);
      qIndex.delete(previous.id);
      sixInkHistory = sixInkHistory.map((changes) => changes.filter((change) => change.id !== previous.id)).filter((changes) => changes.length);
      const scrollPositions = $$(".six-card-content").map((el) => el.scrollTop);
      render();
      $$(".six-card-content").forEach((el, i) => {
        el.scrollTop = i === index - state.sixPage * 6 ? 0 : scrollPositions[i] || 0;
      });
      $(`[data-action="refresh-practice-question"][data-index="${index}"]`)?.focus({ preventScroll: true });
      return true;
    }
    toast("No different question is available for the selected question types right now. Try another type or generate a fresh set.");
    return false;
  }
  function practice() {
    if (!state.practiceQs.length) generatePractice();
    const title = state.practiceSkill ? SKILLS.find((s) => s.id === state.practiceSkill).title : "A fresh start. A little retrieval.";
    const count = state.practiceQs.filter((q2) => qa(q2).success).length;
    return `<div class="page"><div class="page-heading"><div><div class="eyebrow">${state.practiceSkill ? "INDEPENDENT PRACTICE" : "DO NOW · RETRIEVAL PRACTICE"}</div><h1>${title}</h1><p>${state.practiceSkill ? "Practise this skill with fresh values and your own working." : "Mix topics, revisit methods and check understanding across data representation and computer systems."}</p></div><div class="buttons">${btn("Full screen", "six-screen", "focus", "small primary")}${btn("Timer", "timer", "timer", "small")}${btn("Print questions", "print-practice", "print", "small")}</div></div>
 <div class="practice-workspace">
  <section class="panel practice-settings-bar" aria-labelledby="practice-settings-title">
   <div class="practice-settings-main"><h2 id="practice-settings-title">Your question set</h2><div class="field"><label for="practice-count">Number of questions</label><select id="practice-count">${practiceCounts.map((n) => `<option ${n === state.practiceCount ? "selected" : ""}>${n}</option>`).join("")}</select></div>${btn("Generate fresh set", "generate-practice", "refresh", "primary small")}${btn("Copy question set link", "copy-practice-link", "link", "small")}</div>
   ${state.practiceSkill ? `<div class="practice-focused-skill"><p>Focused skill: <strong>${title}</strong></p>${btn("Switch to mixed retrieval", "mixed-practice", "recall", "small ghost")}</div>` : `<div class="practice-topic-options" role="group" aria-labelledby="practice-topics-title"><div class="practice-topic-heading"><span class="field-label" id="practice-topics-title">Topics to include</span>${unitShortcuts("practice")}<p class="topic-selection-status" id="practice-selection-status" role="status">${practiceSelectionStatus()}</p></div>${practiceTopicOptions()}${practiceTypeOptions()}</div>`}
   <p class="status-line">Answers stay hidden until you choose to reveal them. Written explanations use a model response and self assessment.</p>
  </section>
  <section aria-label="Practice questions"><div class="set-toolbar"><p><strong>${count} / ${state.practiceQs.length}</strong> checked successfully</p><div class="buttons">${btn("Reveal answers", "reveal-practice", "eye", "small")}${btn("Clear responses", "clear-practice", "refresh", "small ghost")}</div></div><div class="practice-grid">${state.practiceQs.map((q2, i) => `<article class="practice-card ${qa(q2).success ? "success" : ""}"><div class="q-meta"><span class="badge">${String(i + 1).padStart(2, "0")}</span><h3>${q2.title}</h3>${practiceRefreshButton(i)}</div>${questionContent(q2)}<div class="buttons">${btn(qa(q2).model ? "Hide answer" : "Model answer", "reveal", "eye", "small ghost", `data-q="${q2.id}"`)}${btn(qa(q2).steps ? "Hide method" : "Worked method", "method", "play", "small ghost", `data-q="${q2.id}"`)}</div></article>`).join("")}</div></section>
 </div></div>`;
  }
  function visibleSixQuestions() {
    return state.practiceQs.slice(state.sixPage * 6, state.sixPage * 6 + 6);
  }
  function sixQuestionScreen() {
    const qs = visibleSixQuestions(), pages = Math.ceil(state.practiceQs.length / 6), start = state.sixPage * 6, title = state.practiceSkill ? SKILLS.find((s) => s.id === state.practiceSkill).title : "Mixed retrieval", allRevealed = qs.every((q2) => qa(q2).model);
    return `<main class="six-screen" id="main" tabindex="-1" aria-label="Full-screen question board"><header class="six-header"><div class="six-title"><span class="eyebrow">BYTESIZE WHITEBOARD · AQA 8525</span><h1>${title}</h1><span class="six-page-label">Questions ${start + 1}–${start + qs.length} of ${state.practiceQs.length} · Write your responses on your whiteboard</span></div><div class="six-timer"><button class="six-countdown ${timer.done ? "done" : ""}" data-action="timer" aria-label="Set classroom timer"><span class="six-clock-label">CLASSROOM TIMER · <span id="six-timer-state">${timer.done ? "Time is up" : timer.running ? "Running" : timer.remaining === timer.duration ? "Ready" : "Paused"}</span></span><span id="six-timer-text" role="timer" aria-label="Time remaining">${timeText(timer.remaining)}</span></button><div class="six-timer-buttons">${btn(timer.running ? "Pause" : "Start", "timer-toggle", timer.running ? "timer" : "play", "small primary", 'id="six-timer-toggle"')}${ib("Reset classroom timer", "timer-reset", "refresh")}${ib("Set timer duration", "timer", "timer")}</div></div><div class="six-actions"><div class="buttons">${btn(allRevealed ? "Hide answers" : "Show answers", "six-answers", "eye", "small")}${btn("More questions", "six-fresh", "refresh", "small primary", 'title="Refresh all six questions"')}${ib("Copy question set link", "copy-practice-link", "link")}${ib("Decrease question text size", "font-down", "minus")}${ib("Increase question text size", "font-up", "plus")}${btn("Exit full screen", "six-exit", "close", "small")}</div>${pages > 1 ? `<div class="six-pagination">${btn("Previous six", "six-prev", "back", "small", state.sixPage === 0 ? "disabled" : "")}<span>Page ${state.sixPage + 1} of ${pages}</span>${btn("Next six", "six-next", "arrow", "small", state.sixPage === pages - 1 ? "disabled" : "")}</div>` : '<span class="six-exit-hint">Esc to exit · Timer stays visible</span>'}</div><div class="six-whiteboard-tools"><span class="six-whiteboard-label">Whiteboard tools</span>${drawingToolbar()}<span class="six-drawing-tip">Choose the pointer to scroll a question</span></div></header><div class="six-grid" role="group" aria-label="Questions in three columns and two rows">${qs.map((q2, i) => {
      const s = qa(q2);
      return `<article class="six-card"><header class="six-card-head"><span class="badge">${String(start + i + 1).padStart(2, "0")}</span><h2>${q2.title}</h2>${practiceRefreshButton(start + i)}</header><div class="six-card-content" tabindex="0" aria-label="Question ${start + i + 1}"><div class="six-annotatable"><div class="six-question-text"><div class="question-copy">${q2.prompt.replace("Click a cell to make it dark; click again to make it white.", "Draw the bitmap on your whiteboard.")}</div>${q2.figure ? `<div class="figure">${q2.figure}</div>` : ""}${s.hint ? `<div class="hint">${q2.hint}</div>` : ""}${s.model ? modelHTML(q2) : ""}</div><svg class="ink-layer ${state.pen !== "pointer" ? "enabled" : ""}" data-ink="${q2.id}" viewBox="0 0 1000 1000" preserveAspectRatio="none" aria-label="Question ${start + i + 1} annotations"><g class="ink-content">${strokesHTML(s.ink)}</g></svg></div></div><footer class="six-card-foot"><span>${q2.ref}</span><div class="buttons">${btn(s.hint ? "Hide hint" : "Hint", "hint", "help", "small ghost", `data-q="${q2.id}"`)}${btn(s.model ? "Hide answer" : "Answer", "reveal", "eye", "small", `data-q="${q2.id}"`)}</div></footer></article>`;
    }).join("")}${Array.from({ length: 6 - qs.length }, () => '<div class="six-empty" aria-hidden="true">End of question set</div>').join("")}</div></main>`;
  }
  function nativeFullscreenElement() {
    return document.fullscreenElement || document.webkitFullscreenElement;
  }
  async function enterSixQuestionScreen() {
    if (!state.practiceQs.length && !generatePractice()) return;
    if (state.practiceQs.length < 6) {
      const selected = practiceQuestionIds(), ids = selected.length ? selected : [...new Set(state.practiceQs.map((q2) => q2.skill))], extra = buildSet(ids, 6, 0, state.practiceSeed);
      extra.slice(state.practiceQs.length).forEach((q2) => {
        q2.sourceSkill = state.practiceSkill;
        state.practiceQs.push(q2);
      });
      state.practiceCount = 6;
    }
    state.sixPage = 0;
    state.sixScreen = true;
    state.sixNative = false;
    render();
    const root = document.documentElement, request = root.requestFullscreen || root.webkitRequestFullscreen;
    if (nativeFullscreenElement() === root) {
      state.sixNative = true;
      return;
    }
    if (request) {
      try {
        await request.call(root);
        state.sixNative = nativeFullscreenElement() === root;
      } catch {
        toast("The full-screen board is open. Your browser kept its toolbar visible.");
      }
    }
  }
  async function exitSixQuestionScreen() {
    const exitNative = state.sixNative;
    state.sixScreen = false;
    state.sixNative = false;
    state.pen = "pointer";
    render();
    const exit = document.exitFullscreen || document.webkitExitFullscreen;
    if (exitNative && nativeFullscreenElement() && exit) {
      try {
        await exit.call(document);
      } catch {
      }
    }
  }
  function syncSixFullscreen() {
    if (!state.sixScreen) return;
    if (nativeFullscreenElement() === document.documentElement) {
      state.sixNative = true;
    } else if (state.sixNative) {
      state.sixScreen = false;
      state.sixNative = false;
      state.pen = "pointer";
      render();
    }
  }
  document.addEventListener("fullscreenchange", syncSixFullscreen);
  document.addEventListener("webkitfullscreenchange", syncSixFullscreen);
  function worksheetQuestions(qs, answers = false) {
    return qs.map((q2, i) => `<article class="worksheet-item ${q2.kind === "written" ? "written" : ""}"><span class="question-number">${i + 1}. ${q2.title} · ${q2.ref}</span><div class="question-copy">${q2.prompt.replace("Click a cell to make it dark; click again to make it white.", "Shade the cells with value 1.")}</div><div class="figure">${q2.figure}</div>${answers ? modelHTML(q2) + `<ol class="step-list">${q2.steps.map((s) => `<li>${s.body}</li>`).join("")}</ol>` : q2.fields.some((f) => f.kind === "bitmap") ? bitmapFigure("0".repeat(q2.meta.data.length), q2.meta.w) : q2.fields.length ? `${q2.fields.map((f) => `<p style="font-size:.85em;color:#897394;margin:14px 0">${f.label}: __________________________________________________</p>`).join("")}<div class="answer-space"></div>` : '<div class="answer-space"></div>'}</article>`).join("");
  }
  function worksheets() {
    return `<div class="page"><div class="page-heading"><div><div class="eyebrow">PRINT · PRACTISE · REVIEW</div><h1>Build a worksheet that fits.</h1><p>Choose the skills. Generate unique questions. Print a clean pupil copy and a separate answer sheet.</p></div></div><div class="builder-grid"><aside class="panel settings-panel worksheet-options"><h2>Worksheet builder</h2><div class="field"><label for="worksheet-title">Worksheet title</label><input id="worksheet-title" type="text" maxlength="100" value="${esc(state.worksheetTitle)}"></div><div class="field"><label for="worksheet-count">Number of questions</label><select id="worksheet-count">${[4, 6, 8, 10, 12, 16, 20, 24].map((n) => `<option ${state.worksheetCount === n ? "selected" : ""}>${n}</option>`).join("")}</select></div><span class="field-label">Skills to include (<span id="selected-count">${state.worksheetIds.length}</span>)</span>${unitShortcuts("worksheet")}${worksheetTopicOptions()}<div class="divider"></div>${btn("Generate worksheet", "generate-worksheet", "refresh", "primary", 'style="width:100%"')}<p class="status-line">No repeated questions or words within a worksheet. Encoding words have 3–6 letters, with computing terms used first.</p><p class="status-line">Choose Print, then your browser’s “Save as PDF” option to keep a PDF copy.</p></aside><section>${state.worksheetQs.length ? `<div class="set-toolbar"><p>${state.worksheetQs.length} questions · Ready to print</p><div class="buttons">${btn("Pupil copy", "print-worksheet", "print", "small primary")}${btn("Teacher answers", "print-answers", "notes", "small")}</div></div>${state.worksheetNotice ? `<p class="status-line" role="status">${esc(state.worksheetNotice)}</p>` : ""}<div class="worksheet-preview"><h2>${esc(state.worksheetTitle)}</h2><p class="intro-line">Name: ____________________ &nbsp; Class: __________ &nbsp; Date: __________</p><p class="intro-line">Show your working. Original Bytesize questions aligned to AQA 8525 sections 3.3 and 3.4.</p>${worksheetQuestions(state.worksheetQs)}</div>` : `<div class="empty" style="padding:80px 30px"><h2>Your next worksheet starts here.</h2><p>Select a few skills, or include the whole unit.<br>Questions will appear here, ready for printing.</p>${btn("Generate worksheet", "generate-worksheet", "paper", "primary")}</div><div class="info-grid" style="margin-top:17px"><div class="panel"><strong>Clean pupil copies</strong><p>Diagrams, answer space and working lines. No hints or revealed answers.</p></div><div class="panel"><strong>Separate teacher answers</strong><p>Exact solutions, model explanations and worked methods.</p></div></div>`}</section></div></div>`;
  }
  var starterLessons = [{ title: "Number foundations", skills: ["base-facts", "bin-dec", "dec-bin", "bin-hex", "bits-bytes", "add-two", "shift-left"], level: 0, seed: 608143 }, { title: "From characters to media", skills: ["code-sequences", "encode-text", "ascii-word-decimal", "ascii-word-binary", "ascii-word-size", "unicode", "colour-depth", "image-size", "sampling", "sound-size"], level: 0, seed: 357201 }, { title: "Make fewer bits do more", skills: ["compression-purpose", "huffman-read", "huffman-encode", "huffman-decode", "huffman-size", "rle-encode", "rle-decode"], level: 0, seed: 882741 }];
  function lessons() {
    return `<div class="page"><div class="page-heading"><div><div class="eyebrow">YOUR TEACHING FLOW</div><h1>Good lessons have a sequence.</h1><p>Add skills from the library, arrange them and save a ready-to-teach lesson.</p></div><div class="buttons">${btn("Import lesson", "import-lesson", "upload", "small")}<input type="file" id="import-file" class="file-input" accept="application/json,.json">${btn("Browse skills", "nav", "grid", "small", `data-view="library"`)}</div></div><div class="split"><section><div class="section-title"><h2>Current sequence</h2><span class="tag">${prefs.queue.length} skills</span></div>${prefs.queue.length ? prefs.queue.map((id, i) => {
      const s = SKILLS.find((x) => x.id === id);
      return `<div class="queue-item"><span class="queue-no">${String(i + 1).padStart(2, "0")}</span><div><strong>${s.title}</strong><small>${s.ref}</small></div><div class="buttons">${ib("Move skill up", "queue-up", "up", `data-index="${i}" ${i === 0 ? "disabled" : ""}`)}${ib("Move skill down", "queue-down", "down", `data-index="${i}" ${i === prefs.queue.length - 1 ? "disabled" : ""}`)}${ib("Remove from sequence", "queue-remove", "close", `data-index="${i}"`)}</div></div>`;
    }).join("") + `<div class="buttons" style="margin-top:18px">${btn("Teach this sequence", "teach-queue", "play", "primary")}${btn("Save lesson", "save-lesson", "save")}${btn("Export lesson", "export-queue", "download", "small ghost")}</div>` : `<div class="empty"><h2>Build your teaching sequence</h2><p>Use the + button beside any skill in the activity library.</p>${btn("Choose skills", "nav", "plus", "small", `data-view="library"`)}</div>`}<p class="cover-note">Saved lessons, favourites and blank boards stay in this browser. Export a lesson to move it to another device or browser.</p><div class="section-title"><h2>Your saved lessons</h2><span class="tag">${prefs.lessons.length}</span></div>${prefs.lessons.length ? prefs.lessons.map((l, i) => lessonCard(l, i, false)).join("") : '<p class="intro-line">Your saved lessons will appear here.</p>'}</section><aside><div class="section-title"><h2>Ready-made sequences</h2></div>${starterLessons.map((l, i) => lessonCard(l, i, true)).join("")}<div class="help-note">A saved sequence opens the same question sets each time. Use “New set” during teaching whenever you want fresh values.</div></aside></div></div>`;
  }
  function lessonCard(l, i, starter) {
    return `<article class="lesson-card"><div class="tag">${starter ? "STARTER SEQUENCE" : "SAVED LESSON"}</div><h2>${esc(l.title)}</h2><p>${l.skills.length} skills · ${l.skills.slice(0, 3).map((id) => SKILLS.find((s) => s.id === id).title).join(", ")}${l.skills.length > 3 ? "…" : ""}</p><div class="buttons">${btn("Teach", "load-lesson", "play", "small primary", `data-index="${i}" data-starter="${starter}"`)}${btn("Add skills", "lesson-to-queue", "plus", "small ghost", `data-index="${i}" data-starter="${starter}"`)}${!starter ? `${ib("Export this lesson", "export-lesson", "download", `data-index="${i}"`)}${ib("Delete saved lesson", "delete-lesson", "trash", `data-index="${i}"`)}` : ""}</div></article>`;
  }
  function strokesHTML(strokes) {
    return strokes.map((s) => s.tool === "text" ? `<text x="${s.points[0][0]}" y="${s.points[0][1]}" fill="${s.color}" font-size="${s.width * 7 + 18}" font-family="system-ui,sans-serif">${esc(s.text)}</text>` : `<path d="${s.points.map((p, i) => `${i ? "L" : "M"}${p[0].toFixed(2)},${p[1].toFixed(2)}`).join(" ")}${s.points.length === 1 ? `l.01,.01` : ""}" fill="none" stroke="${s.color}" stroke-width="${s.width}" stroke-linecap="round" stroke-linejoin="round" opacity="${s.tool === "highlighter" ? 0.28 : 1}"/>`).join("");
  }
  function boardExampleQuestion(page) {
    const skill3 = { "addition-two": "add-two", "addition-three": "add-three", "rle-encode": "rle-encode", "rle-decode": "rle-decode", "ascii-word-size": "ascii-word-size", "ascii-word-decimal": "ascii-word-decimal", "ascii-word-binary": "ascii-word-binary" }[page.template], keys = boardExampleKeys(page);
    return skill3 ? makeQuestion(skill3, page.template.startsWith("ascii-word-") ? (page.asciiLength ?? 4) - 2 : 2, page[keys.seed] ?? (keys.seed === "additionSeed" ? 84231 : keys.seed === "asciiSeed" ? 48193 : 81379), { wordLength: page.asciiLength ?? 4 }) : null;
  }
  function boardExampleKeys(page) {
    return page.template.startsWith("addition-") ? { seed: "additionSeed", answer: "additionAnswer" } : page.template.startsWith("ascii-word-") ? { seed: "asciiSeed", answer: "asciiAnswer" } : { seed: "rleSeed", answer: "rleAnswer" };
  }
  function boardASCIIWordTemplate(page, q2) {
    const { word, codes, binaryCodes, size } = q2.meta, show = page.asciiAnswer, sizeQuestion = q2.skill === "ascii-word-size", binary = q2.skill === "ascii-word-binary", cell = Math.min(214, 1080 / word.length), start = (1200 - word.length * cell) / 2;
    const heading = sizeQuestion ? "WORD FILE SIZE" : binary ? "WORD TO 7-BIT BINARY" : "WORD TO DECIMAL CODES";
    const letters = [...word].map((letter, i) => `<text class="board-ascii-letter" x="${start + i * cell + cell / 2}" y="205" text-anchor="middle" font-size="58" fill="#48345d">${esc(letter)}</text>`).join("");
    const codeRow = (values, y, kind) => values.map((value, i) => `<rect x="${start + i * cell + 8}" y="${y}" width="${cell - 16}" height="68" rx="6" fill="white" stroke="#c3afd5"/>${show ? `<text class="board-ascii-${kind}" x="${start + i * cell + cell / 2}" y="${y + 46}" text-anchor="middle" font-size="${kind === "binary" ? 30 : 36}" fill="#287e69">${value}</text>` : ""}`).join("");
    return `<text x="65" y="65" font-size="25" fill="#745d8d">7-BIT ASCII · ${heading}</text><text x="65" y="110" font-size="22" fill="#745d8d">${sizeQuestion ? "Calculate the data size in bits. Ignore metadata and padding." : "Convert the word below. Keep its letter case and character order."}</text>${letters}${sizeQuestion ? `<text x="85" y="300" font-size="26" fill="#745d8d">Number of characters:</text><rect x="520" y="260" width="170" height="60" rx="6" fill="white" stroke="#c3afd5"/>${show ? `<text class="board-ascii-count" x="605" y="302" text-anchor="middle" font-size="34" fill="#287e69">${word.length}</text>` : ""}<text x="85" y="400" font-size="26" fill="#745d8d">File size (bits):</text><rect x="520" y="355" width="340" height="70" rx="6" fill="white" stroke="#c3afd5"/>${show ? `<text class="board-ascii-size" x="690" y="402" text-anchor="middle" font-size="34" fill="#287e69">${size}</text><text x="85" y="490" font-size="28" fill="#287e69">${word.length} characters × 7 bits = ${size} bits</text>` : '<path d="M85 490h1000" stroke="#ded4e7"/>'}<text x="65" y="580" font-size="23" fill="#745d8d">Each letter uses exactly 7 bits. Calculate characters × 7.</text><text x="65" y="625" font-size="22" fill="#745d8d">Count only the letters shown. No spaces, file headers or padding.</text>` : `<text x="65" y="255" font-size="22" fill="#745d8d">${binary ? "Decimal code · working step" : "Decimal ASCII code"}</text>${codeRow(codes, 275, "decimal")}${binary ? `<text x="65" y="395" font-size="22" fill="#745d8d">7-bit binary ASCII code</text>${codeRow(binaryCodes, 415, "binary")}` : '<path d="M85 440h1030M85 490h1030" stroke="#ded4e7"/>'}<text x="65" y="575" font-size="23" fill="#745d8d">Reference: A–Z = 65–90 · a–z = 97–122</text><text x="65" y="625" font-size="22" fill="#745d8d">${binary ? "Use seven bits for each letter: 64, 32, 16, 8, 4, 2, 1." : "Codes run in sequence within each letter group."}</text>`}`;
  }
  function boardAdditionTemplate(page, q2) {
    const rows = q2.meta.values.map((n) => n.toString(2).padStart(8, "0")), three = rows.length === 3, rowY = three ? [215, 295, 375] : [230, 320], lineY = three ? 420 : 365, answerY = lineY + 80;
    return `<text x="65" y="65" font-size="24" fill="#745d8d">BINARY ADDITION · ${rows.length} NUMBERS</text><text x="65" y="108" font-size="19" fill="#745d8d">Add the eight-bit numbers. Show your working on the board.</text>${[128, 64, 32, 16, 8, 4, 2, 1].map((v, i) => `<text x="${285 + i * 100}" y="155" text-anchor="middle" font-size="20" fill="#9b83b1">${v}</text>`).join("")}${rows.map((bits, r) => `<g class="board-addend" data-row="${r}">${[...bits].map((bit, i) => `<rect x="${243 + i * 100}" y="${rowY[r] - 46}" width="84" height="62" rx="5" fill="white" stroke="#ded4e7"/><text x="${285 + i * 100}" y="${rowY[r]}" text-anchor="middle" font-size="43" fill="#48345d">${bit}</text>`).join("")}</g>`).join("")}<text x="140" y="${rowY.at(-1)}" font-size="48" fill="#745d8d">+</text><path d="M215 ${lineY}h830" stroke="#9b83b1" stroke-width="3"/>${Array.from({ length: 8 }, (_, i) => `<rect class="board-sum-cell" x="${243 + i * 100}" y="${answerY - 46}" width="84" height="67" rx="5" fill="white" stroke="#bda8d0"/>${page.additionAnswer ? `<text class="board-sum-bit" x="${285 + i * 100}" y="${answerY}" text-anchor="middle" font-size="43" fill="#287e69">${q2.fields[0].answer[i]}</text>` : ""}`).join("")}<text x="65" y="${answerY + 80}" font-size="20" fill="#745d8d">${page.additionAnswer ? `Sum: ${q2.meta.total} in decimal.` : "Write the answer in eight bits."}</text>`;
  }
  function boardRLEResponse(page, length) {
    return typeof page.rleResponse === "string" && page.rleResponse.length === length ? page.rleResponse : "0".repeat(length);
  }
  function boardRLEFeedback(page) {
    if (page.template !== "rle-decode" || !page.rleChecked || page.rleAnswer) return null;
    const data = boardExampleQuestion(page).meta.data, correct = boardRLEResponse(page, data.length) === data;
    return { correct, text: correct ? "Correct. Your decoded binary row matches the pairs." : "Not quite. Check the count and value in each pair." };
  }
  function boardRLETemplate(page, q2, interactive = true) {
    const decode = q2.skill === "rle-decode", data = q2.meta.data, runs = q2.meta.runs, cell = Math.min(48, 1060 / data.length), rowY = decode ? 335 : 160, pairY = decode ? 175 : 325, show = page.rleAnswer;
    const displayed = decode && !show ? boardRLEResponse(page, data.length) : data, editable = decode && !show && interactive, feedback = boardRLEFeedback(page);
    const bits = [...displayed].map((bit, i) => {
      const dark = bit === "1";
      return `<g ${editable ? `class="board-rle-cell" data-board-rle="${i}" role="button" tabindex="0" aria-label="Decoded bit ${i + 1}: ${bit}" aria-pressed="${dark}"` : ""}><rect class="board-rle-bit" x="${65 + i * cell}" y="${rowY}" width="${cell}" height="52" fill="${dark ? "#252638" : "white"}" stroke="#a994be"/><text class="board-rle-digit" x="${65 + (i + 0.5) * cell}" y="${rowY + 35}" text-anchor="middle" font-size="${Math.min(29, cell * 0.7)}" fill="${dark ? "white" : "#48345d"}" pointer-events="none">${bit}</text></g>`;
    }).join("");
    const pairs = runs.map((run, i) => `<rect x="${65 + i * 208}" y="${pairY}" width="190" height="60" rx="7" fill="white" stroke="#c3afd5"/><text class="board-rle-pair" x="${160 + i * 208}" y="${pairY + 39}" text-anchor="middle" font-size="27" fill="${show ? "#287e69" : "#604884"}">${decode || show ? `(${run.count}, ${run.value})` : "(  ,  )"}</text>`).join("");
    return `<text x="65" y="65" font-size="24" fill="#745d8d">RUN LENGTH ENCODING · ${decode ? "DECODE" : "ENCODE"}</text><text x="65" y="110" font-size="19" fill="#745d8d">${decode ? "Expand each (count, value) pair into one binary row." : "Encode the binary row as (count, value) pairs."}</text><text x="65" y="${rowY - 15}" font-size="18" fill="#8d739f">${decode ? `Decoded binary row${show ? " · model answer" : ""}` : "Original binary row"}</text>${bits}<text x="65" y="${pairY - 20}" font-size="18" fill="#8d739f">${decode ? "Given (count, value) pairs" : "Your (count, value) pairs"}</text>${pairs}<text x="65" y="465" font-size="18" fill="#745d8d">${decode ? "The first number is the count; the second is the bit value." : "Only combine consecutive identical bits. Keep the runs in order."}</text>${decode && !show && interactive ? '<text x="65" y="505" font-size="18" fill="#745d8d">Tap a cell to switch 0 / 1, or focus it and press Space or Enter.</text>' : ""}${feedback ? `<text x="65" y="555" font-size="18" fill="${feedback.correct ? "#287e69" : "#a14d50"}">${feedback.text}</text>` : ""}`;
  }
  function boardTemplate(type, page = {}, interactive = true) {
    if (type === "addition-two" || type === "addition-three") return boardAdditionTemplate(page, boardExampleQuestion({ ...page, template: type }));
    if (type === "rle-encode" || type === "rle-decode") return boardRLETemplate(page, boardExampleQuestion({ ...page, template: type }), interactive);
    if (type.startsWith("ascii-word-")) return boardASCIIWordTemplate(page, boardExampleQuestion({ ...page, template: type }));
    if (type === "binary") return `<g fill="#745d8d" font-family="monospace"><text x="70" y="70" font-size="22">EIGHT-BIT PLACE VALUE</text>${[128, 64, 32, 16, 8, 4, 2, 1].map((w, i) => `<text x="110" y="150" transform="translate(${i * 125},0)" font-size="26" text-anchor="middle">${w}</text><rect x="${55 + i * 125}" y="185" width="110" height="80" rx="6" fill="none" stroke="#cbb9dc"/><rect x="${55 + i * 125}" y="290" width="110" height="80" rx="6" fill="none" stroke="#cbb9dc"/>`).join("")}<path d="M55 400h985" stroke="#9b83b1" stroke-width="2"/><text x="70" y="460" font-size="20">Answer:</text></g>`;
    if (type === "bitmap") {
      const { w, h, cell } = boardBitmapGeometry(page);
      return `<text x="65" y="65" font-size="22" fill="#745d8d">BITMAP · 0 = WHITE, 1 = DARK</text><text x="65" y="96" font-size="18" fill="#745d8d">${w} columns × ${h} rows · ${w * h} pixels</text><g stroke="#cbb9dc" role="group" aria-label="${w} by ${h} bitmap grid">${Array.from({ length: w * h }, (_, i) => {
        const row = Math.floor(i / w), col = i % w, index = row * 16 + col, on = page.bitmapPixels?.[index] === "1";
        return `<rect class="board-bitmap-cell" x="${65 + col * cell}" y="${125 + row * cell}" width="${cell}" height="${cell}" fill="${on ? "#222" : "white"}" ${interactive ? `data-board-pixel="${index}" role="button" tabindex="0" aria-label="Row ${row + 1}, column ${col + 1}, ${on ? "black" : "white"}" aria-pressed="${on}"` : ""}/>`;
      }).join("")}</g><g fill="#9b83b1" font-size="${Math.min(18, cell * 0.5)}">${Array.from({ length: h }, (_, i) => `<text x="620" y="${125 + (i + 0.65) * cell}">Row ${i + 1}:</text><path d="M730 ${125 + (i + 0.75) * cell}h395" fill="none" stroke="#d5c7e0"/>`).join("")}</g>`;
    }
    if (type === "ascii") return `<g fill="#745d8d" font-size="22"><text x="65" y="65">ASCII CHARACTER GROUPS</text>${[["A–Z", "65–90"], ["a–z", "97–122"], ["0–9", "48–57"], ["space", "32"]].map(([a, b], i) => `<text x="85" y="${150 + i * 85}">${a}</text><text x="330" y="${150 + i * 85}">${b}</text><path d="M65 ${170 + i * 85}h430" stroke="#d4c4e1"/>`).join("")}<text x="620" y="150" font-size="20">7-bit ASCII: 128 codes</text><text x="620" y="220" font-size="20">Unicode shares codes 0–127.</text></g>`;
    if (type === "huffman") {
      const trees = boardHuffmanTrees(page);
      return `<text x="65" y="65" font-size="22" fill="#745d8d">HUFFMAN ${trees.length > 1 ? "TREES" : "TREE"} · LEFT 0, RIGHT 1</text>${trees.map((tree, i) => {
        const data = huffmanData(tree.text), x = trees.length === 1 ? 55 : 55 + i * 570, width2 = trees.length === 1 ? 1090 : 520;
        const symbols = Object.keys(data.codes).length, spaces = data.counts[" "] ?? 0, compact = trees.length > 1 && symbols > 6;
        const svg = treeFigure(data, compact ? { leafSpacing: 56 } : void 0).replace('class="huffman-tree"', `class="board-huffman-tree" x="${x}" y="157" width="${width2}" height="453" style="color:#776489"`).replaceAll("<text ", '<text fill="#554366" font-family="monospace" font-size="16" ');
        const label = boardTreeSourceLabel(tree.text), size = label.length <= 34 ? 24 : 18, fit = label.length > 45 ? ` textLength="${width2 - 20}" lengthAdjust="spacingAndGlyphs"` : "";
        const summary = `Tree ${i + 1} · ${symbols} symbols · ${data.text.length} characters${spaces ? ` · ${spaces} ${spaces === 1 ? "space" : "spaces"}` : ""}`;
        return `<text x="${x + 10}" y="108" font-size="${size}" font-weight="bold" fill="#554366"${fit} data-huffman-source="">${esc(label)}</text><text x="${x + 10}" y="137" font-size="17" fill="#745d8d">${summary}</text>${svg}`;
      }).join("")}`;
    }
    if (type === "sound") return `<g fill="#745d8d"><text x="65" y="65" font-size="22">SOUND SAMPLING</text><text x="65" y="125" font-size="18">amplitude</text><text x="1010" y="565" font-size="18">time →</text></g><path d="M100 160v360h950" fill="none" stroke="#b9a3cb" stroke-width="2"/><path d="M100 340C200 140 300 140 400 340S600 540 700 340S900 140 1050 340" fill="none" stroke="#9b83b1" stroke-width="3"/><text x="100" y="630" font-size="23" fill="#745d8d">Size (bits) = sampling rate × sample resolution × seconds</text>`;
    return "";
  }
  function boardSVG(page, exporting = false) {
    const label = page.template === "huffman" ? `Huffman board. ${boardHuffmanTrees(page).map(({ text }, i) => `Tree ${i + 1}: ${boardTreeSourceLabel(text)}.`).join(" ")}` : "Editable drawing board";
    const attributes = exporting ? 'xmlns="http://www.w3.org/2000/svg" width="1200" height="700"' : `class="board-svg" id="board-svg" role="${["bitmap", "rle-decode"].includes(page.template) ? "group" : "img"}" aria-label="${esc(label)}"`;
    return `<svg ${attributes} viewBox="0 0 1200 700" font-family="monospace"><defs><pattern id="board-grid" width="25" height="25" patternUnits="userSpaceOnUse">${page.background === "square" ? '<path d="M25 0H0V25" fill="none" stroke="#e7deee" stroke-width="1"/>' : '<circle cx="2" cy="2" r="1.5" fill="#dacee4"/>'}</pattern></defs><rect width="1200" height="700" fill="white"/>${page.background === "plain" ? "" : '<rect width="1200" height="700" fill="url(#board-grid)"/>'}<g id="board-template-layer">${boardTemplate(page.template, page, !exporting)}</g><g class="ink-content">${strokesHTML(page.strokes)}</g></svg>`;
  }
  function boardTemplateControls(page) {
    if (page.template.startsWith("ascii-word-")) return `<section class="board-template-controls example-settings" aria-label="ASCII word controls"><label for="board-ascii-length">Word length<select id="board-ascii-length">${[3, 4, 5, 6].map((n) => `<option value="${n}" ${page.asciiLength === n ? "selected" : ""}>${n} letters</option>`).join("")}</select></label><div class="buttons">${btn("New example", "board-example-new", "refresh", "small")}${btn(page.asciiAnswer ? "Hide answer" : "Show answer", "board-example-answer", "eye", "small")}</div><span class="board-template-note">${page.template === "ascii-word-size" ? "7 bits per character · Word data only; no metadata or padding." : "Upper-case and lower-case letters have different ASCII codes."}</span></section>`;
    if (page.template === "rle-decode") {
      const feedback = boardRLEFeedback(page);
      return `<section class="board-template-controls example-settings" aria-label="RLE decoding controls"><div class="buttons">${btn("New example", "board-example-new", "refresh", "small")}${btn(page.rleAnswer ? "Hide answer" : "Show answer", "board-example-answer", "eye", "small")}${btn("Check row", "board-rle-check", "check", "small primary", page.rleAnswer ? "disabled" : "")}${btn("Clear row", "board-rle-clear", "refresh", "small ghost", page.rleAnswer ? "disabled" : "")}</div><span class="board-template-note">${page.rleAnswer ? "Model answer shown. Hide answer to edit your own row." : "Tap cells to toggle 0 (white) and 1 (black). Drag with the pen to annotate."}</span><p id="board-rle-feedback" class="board-rle-feedback ${feedback?.correct ? "good" : "bad"}" role="status">${feedback?.text || ""}</p></section>`;
    }
    if (page.template.startsWith("addition-") || page.template.startsWith("rle-")) {
      const addition = page.template.startsWith("addition-"), shown = addition ? page.additionAnswer : page.rleAnswer;
      return `<section class="board-template-controls example-settings" aria-label="Generated example controls"><div class="buttons">${btn("New example", "board-example-new", "refresh", "small")}${btn(shown ? "Hide answer" : "Show answer", "board-example-answer", "eye", "small")}</div><span class="board-template-note">${addition ? "Eight-bit answers · Add two or three numbers using the template menu." : "RLE uses (count, value) pairs · Choose encoding or decoding from the template menu."}</span></section>`;
    }
    if (page.template === "bitmap") return `<section class="board-template-controls bitmap-settings" aria-label="Bitmap dimensions"><label for="board-bitmap-width">Width (pixels)<input type="range" id="board-bitmap-width" min="1" max="16" step="1" value="${page.bitmapWidth}"><output id="board-bitmap-width-value" for="board-bitmap-width">${page.bitmapWidth}</output></label><label for="board-bitmap-height">Height (pixels)<input type="range" id="board-bitmap-height" min="1" max="16" step="1" value="${page.bitmapHeight}"><output id="board-bitmap-height-value" for="board-bitmap-height">${page.bitmapHeight}</output></label><span class="board-template-note" id="board-bitmap-size">${page.bitmapWidth} × ${page.bitmapHeight} · ${page.bitmapWidth * page.bitmapHeight} pixels</span><span class="board-template-note">Tap a pixel to toggle black or white. Drag with the pen to annotate.</span></section>`;
    if (page.template === "huffman") {
      const selected = page.huffmanTrees[page.huffmanIndex];
      const activePhrase = selected.preset === "phrases" ? boardPhraseByText.get(selected.text) : null;
      const phraseOptions = BOARD_PHRASES.map((phrase) => `<option value="${phrase.id}" ${activePhrase?.id === phrase.id ? "selected" : ""}>${esc(phrase.label)}</option>`).join("");
      return `<section class="board-template-controls huffman-settings" aria-label="Huffman tree options"><label for="board-tree-active">Edit tree<select id="board-tree-active">${page.huffmanTrees.map((_, i) => `<option value="${i}" ${i === page.huffmanIndex ? "selected" : ""}>Tree ${i + 1}</option>`).join("")}</select></label><label for="board-tree-example">Example<select id="board-tree-example">${BOARD_TREES.map((t) => `<option value="${t.id}" ${selected.preset === t.id ? "selected" : ""}>${t.label}</option>`).join("")}<option value="random" ${selected.preset === "random" ? "selected" : ""}>Mixed words and phrases</option><optgroup label="Familiar phrases"><option value="phrases">Random familiar phrase</option>${phraseOptions}</optgroup></select></label><div class="buttons">${btn("New tree", "board-tree-new", "refresh", "small", 'title="Choose another word or phrase for this tree"')}${btn("Add tree", "board-tree-add", "plus", "small", page.huffmanTrees.length >= 2 ? 'disabled title="Use another page for more trees"' : 'title="Add a second tree beside the first"')}${ib("Remove selected tree", "board-tree-remove", "trash", page.huffmanTrees.length < 2 ? "disabled" : "")}</div><span class="board-template-note">Spaces count as characters and appear as a leaf labelled “space”. Compare up to two trees per page.</span></section>`;
    }
    return "";
  }
  function blankBoard() {
    const p = prefs.boards[state.boardIndex];
    return `<div class="page"><div class="page-heading"><div><div class="eyebrow">SPACE TO THINK</div><h1>Your board. Your explanation.</h1><p>Write, sketch and build an explanation. Add a data representation template or open the Logic workshop.</p></div><div class="buttons">${btn("Logic workshop", "nav", "grid", "small", `data-view="logic"`)}${btn("Export SVG", "export-board", "download", "small")}${ib("Blank board help", "board-help", "help")}</div></div>
 <div class="blank-toolbar" aria-label="Blank board tools"><div class="blank-controls"><div class="drawing-tools" aria-label="Drawing tools">${[["pointer", "Pointer", "pointer"], ["pen", "Pen", "pen"], ["highlighter", "Highlighter", "highlighter"], ["line", "Straight line", "line"], ["text", "Add text", "text"], ["eraser", "Erase stroke", "eraser"]].map(([tool, label, icon]) => ib(label, "board-tool", icon, `data-tool="${tool}"`, state.boardTool === tool)).join("")}</div><div class="group">${["#3c2b50", "#7352ad", "#287e69", "#cf6949", "#356eae"].map((c, i) => `<button class="swatch ${state.boardColor === c ? "active" : ""}" style="--swatch:${c}" data-action="board-color" data-color="${c}" aria-label="${["Dark", "Purple", "Green", "Orange", "Blue"][i]} drawing ink" aria-pressed="${state.boardColor === c}"></button>`).join("")}<input type="range" min="1" max="10" value="${state.boardWidth}" id="board-width" aria-label="Drawing line width"></div><div class="group"><select id="board-background" aria-label="Board background">${[["plain", "Plain paper"], ["dots", "Dot grid"], ["square", "Square grid"]].map(([v, l]) => `<option value="${v}" ${p.background === v ? "selected" : ""}>${l}</option>`).join("")}</select><select id="board-template" aria-label="Unit 3 board template">${BOARD_TEMPLATES.map(([v, l]) => `<option value="${v}" ${p.template === v ? "selected" : ""}>${l}</option>`).join("")}</select></div><div class="group">${ib("Undo board change", "board-undo", "undo")}${ib("Clear drawing on this page", "board-clear", "trash")}</div></div>
 ${boardTemplateControls(p)}</div><div class="board-paper">${boardSVG(p)}</div>
 <div class="blank-footer"><div class="board-page-controls"><div class="board-page-tabs"><span>Page</span>${prefs.boards.map((_, i) => `<button class="${i === state.boardIndex ? "active" : ""}" data-action="board-page" data-index="${i}" aria-label="Board page ${i + 1}" aria-pressed="${i === state.boardIndex}">${i + 1}</button>`).join("")}${prefs.boards.length < 20 ? ib("Add a board page", "board-add", "plus") : ""}</div><div class="buttons">${btn("Delete page", "board-delete", "trash", "small danger", prefs.boards.length <= 1 ? 'disabled title="Keep at least one page; use Clear drawing to erase this page"' : `title="Delete page ${state.boardIndex + 1}"`)}${deletedBoardPages.length ? btn("Undo delete", "board-restore-page", "undo", "small ghost", prefs.boards.length >= 20 ? 'disabled title="The board already has its maximum of 20 pages"' : "") : ""}</div></div><span class="blank-save-note">${canSave ? "Automatically saved in this browser." : "Browser saving unavailable; export to keep your board."} · Pen, touch or mouse.</span></div></div>`;
  }
  function showModal(title, html) {
    const modal = $("#modal");
    modal.innerHTML = `<div class="dialog-top"><h2 id="dialog-title">${title}</h2>${ib("Close dialog", "close-modal", "close")}</div>${html}`;
    if (!modal.open) modal.showModal();
  }
  function closeModal() {
    $("#modal").close();
  }
  function toggleAllAnswers() {
    state.showAll = !state.showAll;
    modelQs.forEach((q2) => qa(q2).model = false);
    render();
  }
  function about() {
    showModal("Bytesize content guide", `<p>Bytesize Whiteboard follows <strong>AQA GCSE Computer Science 8525, sections 3.3 and 3.4</strong>. It covers data representation and computer systems.</p><div class="info-grid"><div class="panel"><strong>I do → We do → You do</strong><p>Related question variants for the same skill. Reveal methods one step at a time and focus a column for whole-class teaching.</p></div><div class="panel"><strong>All question variants included</strong><p>Activities automatically draw on straightforward, core and multi-step questions. No level selection is needed.</p></div></div><h3>Unit 3 boundaries</h3><ul><li>Conversions use values from 0 to 255. Addition uses up to three eight-bit values and no ninth-bit carry.</li><li>Shifts are logical only. Multiplication or division effects state their assumptions.</li><li>Storage prefixes use decimal factors of 1,000. Bitmap and sound calculations ignore metadata unless stated.</li><li>Character work covers 7-bit ASCII, 3–6 letter word conversion to decimal and seven-bit binary codes, word file sizes in bits, sequences and Unicode’s shared codes 0–127. No UTF encoding variants are required.</li><li>Compression includes Huffman trees, bit savings and RLE count/value pairs. ASCII width is stated in every comparison.</li></ul><h3>Unit 4 · Computer systems</h3><p>Hardware and software, Boolean logic, software classification, translators, and systems architecture. AQA logic practice uses up to three inputs. The Logic workshop also supports four and five inputs for free modelling. These are original Bytesize activities, not official AQA questions.</p><p><a href="${SYSTEMS_SOURCE}" target="_blank" rel="noopener noreferrer">AQA computer systems specification</a></p><h3>Using the workspace</h3><p><kbd>N</kbd> creates a new teaching set. <kbd>A</kbd> reveals or hides all three answers. <kbd>Esc</kbd> leaves a focused column. Select the pointer before interacting with answers after drawing.</p><p>Exact answers are checked automatically. Written responses use a model and your judgement. Favourites, lessons and board pages are saved on this browser. Export a lesson or SVG to keep a portable copy. The site is a teacher workspace.</p><h3>Verified sources</h3><ul class="sources-list"><li><a href="${SOURCE}" target="_blank" rel="noopener noreferrer">AQA 8525: Fundamentals of data representation</a></li><li><a href="https://www.rfc-editor.org/rfc/rfc20.html" target="_blank" rel="noopener noreferrer">RFC 20: standard 7-bit ASCII table</a></li><li><a href="../student/index.html" target="_blank" rel="noopener noreferrer">Your existing Bytesize practice site</a></li></ul><p class="status-line">Scope reviewed 14 October 2026. These are original teaching questions, not official AQA examination items. This site is independent of AQA, Maths Whiteboard and BBC Bitesize.</p>`);
  }
  function timeText(n) {
    return `${String(Math.floor(n / 60)).padStart(2, "0")}:${String(n % 60).padStart(2, "0")}`;
  }
  var timerAudio = null;
  var alarmNodes = [];
  var alarmEpoch = 0;
  function stopTimerAlarm() {
    alarmEpoch++;
    for (const node of alarmNodes) {
      try {
        if (typeof node.stop === "function") node.stop();
        node.disconnect();
      } catch {
      }
    }
    alarmNodes = [];
  }
  async function prepareTimerSound(force = false) {
    if (!prefs.timerSound && !force) return null;
    try {
      const Audio = window.AudioContext || window.webkitAudioContext;
      if (!Audio) return null;
      if (!timerAudio || timerAudio.state === "closed") timerAudio = new Audio();
      if (timerAudio.state === "suspended") await timerAudio.resume();
      return timerAudio.state === "running" ? timerAudio : null;
    } catch {
      return null;
    }
  }
  async function playTimerAlarm(force = false) {
    stopTimerAlarm();
    const epoch = alarmEpoch;
    if (!prefs.timerSound && !force) return false;
    const audio = await prepareTimerSound(force);
    if (!audio || epoch !== alarmEpoch || !force && !prefs.timerSound) return false;
    try {
      const now = audio.currentTime;
      [0, 0.3, 0.6, 1.05, 1.35, 1.65].forEach((offset, i) => {
        const oscillator = audio.createOscillator(), gain = audio.createGain(), start = now + offset;
        oscillator.type = "sine";
        oscillator.frequency.setValueAtTime(i % 3 === 2 ? 1174 : 880, start);
        gain.gain.setValueAtTime(0, start);
        gain.gain.linearRampToValueAtTime(0.2, start + 0.015);
        gain.gain.exponentialRampToValueAtTime(1e-3, start + 0.22);
        oscillator.connect(gain);
        gain.connect(audio.destination);
        alarmNodes.push(oscillator, gain);
        oscillator.onended = () => {
          oscillator.disconnect();
          gain.disconnect();
          alarmNodes = alarmNodes.filter((n) => n !== oscillator && n !== gain);
        };
        oscillator.start(start);
        oscillator.stop(start + 0.25);
      });
      return true;
    } catch {
      stopTimerAlarm();
      return false;
    }
  }
  function timerModal() {
    showModal("Classroom timer", `<p>Set a short thinking, discussion or independent practice interval.</p><div id="timer-readout" class="timer-large" role="timer">${timeText(timer.remaining)}</div><div class="timer-presets">${[1, 2, 3, 5, 7, 10].map((n) => `<button data-action="timer-preset" data-minutes="${n}">${n} min</button>`).join("")}</div><div class="timer-setup"><div><label for="timer-minutes" class="field-label">Custom minutes</label><input id="timer-minutes" type="number" min="1" max="120" value="${Math.floor(timer.duration / 60)}"></div>${btn("Set", "timer-set", "", "")}</div><div class="buttons">${btn(timer.running ? "Pause" : "Start", "timer-toggle", timer.running ? "timer" : "play", "primary", 'id="timer-toggle"')}${btn("Reset", "timer-reset", "refresh")}</div><div class="timer-sound-controls"><label class="toggle-label"><input type="checkbox" id="timer-sound" ${prefs.timerSound ? "checked" : ""}> Sound when the timer finishes</label>${btn("Test sound", "timer-test-sound", "timer", "small")}</div><p class="status-line">The timer remains visible in the header. It does not reveal answers automatically.</p>`);
  }
  function timerTick() {
    if (timer.running) {
      timer.remaining = Math.max(0, Math.ceil((timer.deadline - Date.now()) / 1e3));
      if (timer.remaining === 0) {
        timer.running = false;
        timer.done = true;
        void playTimerAlarm();
        toast("Time is up.");
      }
    }
    if ($("#six-timer-text")) $("#six-timer-text").textContent = timeText(timer.remaining);
    if ($("#six-timer-state")) $("#six-timer-state").textContent = timer.done ? "Time is up" : timer.running ? "Running" : timer.remaining === timer.duration ? "Ready" : "Paused";
    if ($("#six-timer-toggle")) {
      $("#six-timer-toggle").innerHTML = `${ic(timer.running ? "timer" : "play")}<span>${timer.running ? "Pause" : "Start"}</span>`;
      $("#six-timer-toggle").setAttribute("aria-label", timer.running ? "Pause classroom timer" : "Start classroom timer");
    }
    if ($(".six-countdown")) $(".six-countdown").classList.toggle("done", timer.done);
    if ($("#timer-text")) $("#timer-text").textContent = timeText(timer.remaining);
    if ($("#timer-readout")) $("#timer-readout").textContent = timeText(timer.remaining);
    const b = $(".timer-badge");
    if (b) b.classList.toggle("done", timer.done);
    if ($("#timer-toggle")) $("#timer-toggle").innerHTML = `${ic(timer.running ? "timer" : "play")}<span>${timer.running ? "Pause" : "Start"}</span>`;
  }
  setInterval(timerTick, 500);
  function setTimer(minutes) {
    stopTimerAlarm();
    timer.duration = Math.min(120, Math.max(1, Math.round(Number(minutes) || 5))) * 60;
    timer.remaining = timer.duration;
    timer.running = false;
    timer.done = false;
    timerModal();
    timerTick();
  }
  function printQuestionCell(q2, index, answers = false) {
    const prompt = q2.prompt.replace("Click a cell to make it dark; click again to make it white.", "Shade the cells with value 1.");
    let figure = q2.figure;
    if (q2.skill === "huffman-size") {
      const chars = Object.keys(q2.meta.data.codes);
      const rows = [["Character", ...chars], ["Frequency", ...chars.map((c) => q2.meta.data.counts[c])], ["Code", ...chars.map((c) => q2.meta.data.codes[c])], ["Code length", ...chars.map((c) => q2.meta.data.codes[c].length)]];
      figure = `<div class="table-wrap"><table><tbody>${rows.map((row) => `<tr><th scope="row">${esc(row[0])}</th>${row.slice(1).map((value) => `<td>${esc(value)}</td>`).join("")}</tr>`).join("")}</tbody></table></div>`;
    }
    const responses = q2.fields.some((f) => f.kind === "bitmap") ? bitmapFigure("0".repeat(q2.meta.data.length), q2.meta.w) : q2.fields.length ? `<div class="print-response-fields">${q2.fields.map((f) => `<div class="print-response-line"><span>${esc(f.label)}:</span><span class="print-response-blank"></span></div>`).join("")}</div>` : "";
    return `<div class="print-question-cell" data-print-question="${index + 1}"><article class="print-question ${q2.kind === "written" ? "written" : ""} ${q2.skill === "huffman-size" ? "print-question-dense" : ""}"><div class="print-question-content"><h2 class="print-question-title">${index + 1}. ${esc(q2.title)} <span>${esc(q2.ref)}</span></h2><div class="question-copy">${prompt}</div><div class="figure">${figure}</div>${answers ? modelHTML(q2) + `<ol class="step-list">${q2.steps.map((s) => `<li>${s.body}</li>`).join("")}</ol>` : responses}</div>${answers ? "" : '<div class="print-working-space" aria-label="Space for your working"></div>'}</article></div>`;
  }
  function questionPrintPages(qs, title, { showTitle = true, answers = false, perPage = qs.length } = {}) {
    const pageSize = Math.max(1, Math.trunc(perPage)), pageCount = Math.ceil(qs.length / pageSize);
    const columns = pageSize <= 2 ? pageSize : pageSize <= 4 ? 2 : pageSize <= 12 ? 3 : 4, rows = Math.ceil(pageSize / columns);
    return Array.from({ length: pageCount }, (_, page) => {
      const offset = page * pageSize;
      const cells = Array.from({ length: columns * rows }, (_2, i) => qs[offset + i] && i < pageSize ? printQuestionCell(qs[offset + i], offset + i, answers) : '<div class="print-question-cell print-empty-cell" aria-hidden="true"></div>');
      return `<section class="print-question-page" aria-label="${answers ? "Teacher answers" : "Pupil questions"} · A4 landscape sheet ${page + 1} of ${pageCount}"><header class="print-header">${showTitle ? `<h1>${esc(title)}</h1>` : ""}<div class="print-page-details"><p>Name: ____________________________________</p><p>Class: ______________</p><p>Date: ______________</p></div></header><div class="print-question-grid" style="--print-columns:${columns};--print-rows:${rows}" aria-label="Questions ${offset + 1} to ${Math.min(offset + pageSize, qs.length)}">${cells.join("")}</div></section>`;
    }).join("");
  }
  function fitPrintQuestions(root) {
    if (!root?.querySelectorAll) return;
    root.classList.add("print-measuring");
    try {
      root.querySelectorAll(".print-question").forEach((article) => {
        const content = article.querySelector(".print-question-content"), working = article.querySelector(".print-working-space");
        content.style.zoom = "1";
        const reserve = working ? parseFloat(getComputedStyle(working).minHeight) + parseFloat(getComputedStyle(working).marginTop) : 0;
        const height2 = article.clientHeight - reserve, width2 = article.clientWidth;
        if (height2 <= 0 || width2 <= 0) return;
        const fits = (scale) => {
          content.style.zoom = String(scale);
          const bounds = content.getBoundingClientRect();
          return bounds.height <= height2 + 0.25 && Math.max(bounds.width, content.scrollWidth * scale) <= width2 + 0.75;
        };
        if (fits(1)) return;
        let low = 0, high = 1;
        for (let attempt = 0; attempt < 12; attempt++) {
          const middle = (low + high) / 2;
          if (fits(middle)) low = middle;
          else high = middle;
        }
        content.style.zoom = String(low * 0.995);
      });
    } finally {
      root.classList.remove("print-measuring");
    }
  }
  window.addEventListener("beforeprint", () => fitPrintQuestions($("#print-root")));
  function printSet(qs, answers = false, title = "Unit 3 · Data representation", options = {}) {
    if (!qs.length) return;
    const root = $("#print-root");
    root.className = answers ? "answer-sheet" : "question-sheet";
    root.innerHTML = questionPrintPages(qs, title, { ...options, answers });
    const run = () => {
      fitPrintQuestions(root);
      window.print();
    };
    if (document.fonts?.ready) return document.fonts.ready.then(run);
    run();
  }
  function download(name, text, type) {
    const blob = new Blob([text], { type }), a = document.createElement("a"), url = URL.createObjectURL(blob);
    a.href = url;
    a.download = name;
    document.body.append(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1e3);
  }
  function exportLesson(l) {
    download("bytesize-lesson.json", JSON.stringify({ format: "bytesize-whiteboard-lesson", version: 1, ...l }, null, 2), "application/json");
  }
  function startLesson(l, index = 0) {
    state.lesson = { ...l, index };
    state.focus = -1;
    state.showAll = false;
    teachRoute(l.skills[index], l.level, l.seed + index * 104729 >>> 0);
  }
  function saveBoardHistory() {
    const i = state.boardIndex, h = boardHistory.get(i) || [];
    h.push(JSON.parse(JSON.stringify(prefs.boards[i])));
    if (h.length > 30) h.shift();
    boardHistory.set(i, h);
  }
  function shiftBoardHistory(from, amount) {
    const entries = [...boardHistory].map(([i, h]) => [i >= from ? i + amount : i, h]);
    boardHistory.clear();
    entries.forEach(([i, h]) => boardHistory.set(i, h));
  }
  function deleteBoardPage() {
    if (prefs.boards.length <= 1) return;
    const index = state.boardIndex, page = prefs.boards.splice(index, 1)[0];
    deletedBoardPages.push({ index, page, history: boardHistory.get(index) || [] });
    if (deletedBoardPages.length > 20) deletedBoardPages.shift();
    boardHistory.delete(index);
    shiftBoardHistory(index + 1, -1);
    state.boardIndex = Math.min(index, prefs.boards.length - 1);
    bitmapResizeEdit = null;
    persist();
    render();
    toast(`Page ${index + 1} deleted. Use Undo delete to restore it.`);
  }
  function restoreBoardPage() {
    if (!deletedBoardPages.length || prefs.boards.length >= 20) return;
    const removed = deletedBoardPages.pop(), index = Math.min(removed.index, prefs.boards.length);
    shiftBoardHistory(index, 1);
    boardHistory.set(index, removed.history);
    prefs.boards.splice(index, 0, removed.page);
    state.boardIndex = index;
    bitmapResizeEdit = null;
    persist();
    render();
    toast(`Page ${index + 1} restored.`);
  }
  function refreshBoardTemplate() {
    const layer = $("#board-template-layer"), page = prefs.boards[state.boardIndex];
    if (layer) layer.innerHTML = boardTemplate(page.template, page);
  }
  function boardPixelAt(page, point) {
    const { w, h, cell } = boardBitmapGeometry(page), col = Math.floor((point[0] - 65) / cell), row = Math.floor((point[1] - 125) / cell);
    return col >= 0 && col < w && row >= 0 && row < h ? row * 16 + col : -1;
  }
  function toggleBoardPixel(index, focus = false) {
    const page = prefs.boards[state.boardIndex];
    if (state.view !== "blank" || page.template !== "bitmap" || !Number.isInteger(index) || index < 0 || index >= 256 || index % 16 >= page.bitmapWidth || Math.floor(index / 16) >= page.bitmapHeight) return false;
    saveBoardHistory();
    const pixels = (page.bitmapPixels || "0".repeat(256)).split("");
    pixels[index] = pixels[index] === "1" ? "0" : "1";
    page.bitmapPixels = pixels.join("");
    persist();
    refreshBoardTemplate();
    if (focus) $(`#board-template-layer [data-board-pixel="${index}"]`)?.focus();
    return true;
  }
  function boardRLEBitAt(page, point) {
    if (page.template !== "rle-decode" || page.rleAnswer || point[1] < 335 || point[1] >= 387) return -1;
    const length = boardExampleQuestion(page).meta.data.length, cell = Math.min(48, 1060 / length), index = Math.floor((point[0] - 65) / cell);
    return index >= 0 && index < length ? index : -1;
  }
  function toggleBoardRLEBit(index, focus = false) {
    const page = prefs.boards[state.boardIndex];
    if (state.view !== "blank" || page.template !== "rle-decode" || page.rleAnswer) return false;
    const length = boardExampleQuestion(page).meta.data.length;
    if (!Number.isInteger(index) || index < 0 || index >= length) return false;
    saveBoardHistory();
    const response = boardRLEResponse(page, length).split("");
    response[index] = response[index] === "1" ? "0" : "1";
    page.rleResponse = response.join("");
    page.rleChecked = false;
    persist();
    refreshBoardTemplate();
    const feedback = $("#board-rle-feedback");
    if (feedback) feedback.textContent = "";
    if (focus) $(`#board-template-layer [data-board-rle="${index}"]`)?.focus();
    return true;
  }
  function freshBoardExample() {
    const page = prefs.boards[state.boardIndex], previous = boardExampleQuestion(page);
    if (!previous) return;
    const { seed: key2, answer } = boardExampleKeys(page);
    let seed = freshSeed();
    for (let i = 0; i < 100; i++) {
      if (JSON.stringify(boardExampleQuestion({ ...page, [key2]: seed }).meta) !== JSON.stringify(previous.meta)) break;
      seed = seed + 7919 >>> 0;
    }
    saveBoardHistory();
    page[key2] = seed;
    page[answer] = false;
    if (page.template.startsWith("rle-")) {
      page.rleResponse = "";
      page.rleChecked = false;
    }
    persist();
    render();
  }
  function resizeBoardBitmap(el, commit = false) {
    const page = prefs.boards[state.boardIndex];
    if (page.template !== "bitmap") return;
    const key2 = el.id === "board-bitmap-width" ? "bitmapWidth" : "bitmapHeight", value = boardDimension(el.value);
    if (page[key2] !== value) {
      if (!bitmapResizeEdit || bitmapResizeEdit.el !== el || bitmapResizeEdit.index !== state.boardIndex) {
        saveBoardHistory();
        bitmapResizeEdit = { el, index: state.boardIndex };
      }
      page[key2] = value;
      refreshBoardTemplate();
      $("#board-bitmap-width-value").textContent = page.bitmapWidth;
      $("#board-bitmap-height-value").textContent = page.bitmapHeight;
      $("#board-bitmap-size").textContent = `${page.bitmapWidth} × ${page.bitmapHeight} · ${page.bitmapWidth * page.bitmapHeight} pixels`;
    }
    if (commit) {
      bitmapResizeEdit = null;
      persist();
    }
  }
  function randomBoardTree(existing, preset = "random") {
    const random = rng(freshSeed() + ++boardTreeRound * 104729 >>> 0), blocked = new Set(existing.map((t) => t.text)), category = BOARD_TREES.find((t) => t.id === preset);
    const sources = preset === "phrases" ? BOARD_PHRASES : BOARD_TREE_SOURCES;
    const pool = sources.filter(({ text, counts }) => !blocked.has(text) && (preset === "phrases" || (category ? counts.length === category.characters && balancedCounts(counts) === category.equal : counts.length >= 3 && counts.length <= 6)));
    const choice = pool[Math.floor(random() * pool.length)];
    return { preset: category?.id || (preset === "phrases" ? "phrases" : "random"), text: choice.text };
  }
  function replaceBoardTree(preset, generate = false) {
    const page = prefs.boards[state.boardIndex];
    if (page.template !== "huffman") return;
    const example = BOARD_TREES.find((t) => t.id === preset), phrase = BOARD_PHRASES.find((t) => t.id === preset);
    const tree = generate || preset === "random" || preset === "phrases" ? randomBoardTree(page.huffmanTrees, preset) : phrase ? { preset: "phrases", text: phrase.text } : example ? { preset: example.id, text: example.text } : null;
    if (!tree) return;
    saveBoardHistory();
    page.huffmanTrees[page.huffmanIndex] = tree;
    persist();
    render();
  }
  function refreshInk() {
    if (state.view === "blank") {
      const el = $("#board-svg .ink-content");
      if (el) el.innerHTML = strokesHTML(prefs.boards[state.boardIndex].strokes);
    } else $$(".ink-layer").forEach((svg) => {
      const s = qState.get(svg.dataset.ink);
      svg.querySelector(".ink-content").innerHTML = strokesHTML(s.ink);
    });
  }
  function nearStroke(stroke, p, tolerance) {
    if (stroke.tool === "text") return Math.hypot(stroke.points[0][0] - p[0], stroke.points[0][1] - p[1]) < 80;
    return stroke.points.some((a, i) => {
      const b = stroke.points[i + 1] || a, dx = b[0] - a[0], dy = b[1] - a[1], len = dx * dx + dy * dy, t = len ? Math.max(0, Math.min(1, ((p[0] - a[0]) * dx + (p[1] - a[1]) * dy) / len)) : 0;
      return Math.hypot(p[0] - a[0] - t * dx, p[1] - a[1] - t * dy) < tolerance;
    });
  }
  function bindDrawing() {
    const svgs = state.view === "blank" ? [$("#board-svg")] : $$(".ink-layer");
    svgs.forEach((svg) => {
      if (!svg) return;
      let current = null, active = false, pendingPixel = null;
      function coords(e) {
        const p = svg.createSVGPoint();
        p.x = e.clientX;
        p.y = e.clientY;
        const m = svg.getScreenCTM();
        if (!m) return [0, 0];
        const r = p.matrixTransform(m.inverse());
        return [Math.round(r.x * 10) / 10, Math.round(r.y * 10) / 10];
      }
      function arr() {
        return state.view === "blank" ? prefs.boards[state.boardIndex].strokes : qState.get(svg.dataset.ink).ink;
      }
      function beginDrawing(e, p) {
        const tool = state.view === "blank" ? state.boardTool : state.pen;
        if (tool === "pointer") return;
        e.preventDefault();
        if (state.view === "blank") saveBoardHistory();
        else if (state.sixScreen) rememberSixInk([qIndex.get(svg.dataset.ink)]);
        active = true;
        svg.setPointerCapture(e.pointerId);
        if (tool === "text") {
          active = false;
          showModal("Add text to the board", `<form id="board-text-form"><div class="field"><label for="board-text">Text</label><input id="board-text" type="text" maxlength="300" autofocus autocomplete="off"></div>${btn("Place text", "place-board-text", "text", "primary", `data-x="${p[0]}" data-y="${p[1]}"`)}</form>`);
          return;
        }
        if (tool === "eraser") {
          const a = arr(), i = a.findLastIndex((s) => nearStroke(s, p, 25));
          if (i >= 0) a.splice(i, 1);
          refreshInk();
          return;
        }
        current = { tool, color: state.view === "blank" ? state.boardColor : state.color, width: state.view === "blank" ? tool === "highlighter" ? 22 : state.boardWidth : state.inkWidth * (tool === "highlighter" ? 5 : 1) * 1e3 / svg.getBoundingClientRect().width, points: [p] };
        arr().push(current);
        refreshInk();
      }
      svg.addEventListener("pointerdown", (e) => {
        if (e.button !== void 0 && e.button !== 0) return;
        const p = coords(e), tool = state.view === "blank" ? state.boardTool : state.pen;
        if (state.view === "blank" && !["text", "eraser"].includes(tool)) {
          const page = prefs.boards[state.boardIndex], kind = page.template === "bitmap" ? "bitmap" : "rle", index = kind === "bitmap" ? boardPixelAt(page, p) : boardRLEBitAt(page, p);
          if (index >= 0) {
            e.preventDefault();
            svg.setPointerCapture(e.pointerId);
            pendingPixel = { kind, index, point: p, x: e.clientX, y: e.clientY, page: state.boardIndex };
            return;
          }
        }
        beginDrawing(e, p);
      });
      svg.addEventListener("pointermove", (e) => {
        if (pendingPixel) {
          if (Math.hypot(e.clientX - pendingPixel.x, e.clientY - pendingPixel.y) < 5) return;
          const start = pendingPixel;
          pendingPixel = null;
          beginDrawing(e, start.point);
        }
        if (!active) return;
        const p = coords(e), tool = state.view === "blank" ? state.boardTool : state.pen;
        if (tool === "eraser") {
          const a = arr(), i = a.findLastIndex((s) => nearStroke(s, p, 25));
          if (i >= 0) {
            a.splice(i, 1);
            refreshInk();
          }
        } else if (current) {
          if (tool === "line") current.points = [current.points[0], p];
          else current.points.push(p);
          refreshInk();
        }
      });
      const end = (toggle) => {
        const pixel = pendingPixel;
        pendingPixel = null;
        if (toggle && pixel && state.view === "blank" && state.boardIndex === pixel.page) {
          if (pixel.kind === "rle") toggleBoardRLEBit(pixel.index);
          else toggleBoardPixel(pixel.index);
        }
        if (active && state.view === "blank") persist();
        active = false;
        current = null;
      };
      svg.addEventListener("pointerup", () => end(true));
      svg.addEventListener("pointercancel", () => end(false));
    });
  }
  document.addEventListener("input", (e) => {
    const el = e.target;
    if (el.id === "board-bitmap-width" || el.id === "board-bitmap-height") {
      resizeBoardBitmap(el);
      return;
    }
    if (el.id === "skill-search") {
      state.search = el.value;
      $("#topic-list").innerHTML = libraryList();
      return;
    }
    if (el.dataset.q && el.dataset.field !== void 0) {
      const q2 = qIndex.get(el.dataset.q), s = qa(q2), i = Number(el.dataset.field);
      if (el.dataset.bit !== void 0) {
        const bits = $$(`input[data-q="${q2.id}"][data-field="${i}"][data-bit]`);
        el.value = el.value.replace(/[^01]/g, "").slice(-1);
        s.answers[i] = bits.map((x) => x.value || "_").join("");
        if (el.value) {
          const n = Number(el.dataset.bit);
          if (n > 0) bits[n - 1].focus();
        }
      } else s.answers[i] = el.value;
      s.success = false;
      s.feedback = null;
      el.closest("article")?.classList.remove("success");
    }
    if (el.dataset.written) {
      const s = qa(qIndex.get(el.dataset.written));
      s.written = el.value;
      s.success = false;
      s.feedback = null;
      el.closest("article")?.classList.remove("success");
      el.closest("article")?.querySelector(".feedback")?.remove();
    }
    if (el.id === "worksheet-title") state.worksheetTitle = el.value;
    if (el.id === "board-width") state.boardWidth = Number(el.value);
    if (el.id === "ink-width") state.inkWidth = Number(el.value);
  });
  document.addEventListener("paste", (e) => {
    const el = e.target;
    if (el.dataset.bit === void 0) return;
    const text = e.clipboardData.getData("text").replace(/\s/g, "");
    if (!/^[01]{8}$/.test(text)) {
      e.preventDefault();
      toast("Paste exactly eight binary digits.");
      return;
    }
    e.preventDefault();
    const q2 = qIndex.get(el.dataset.q), i = Number(el.dataset.field), bits = $$(`input[data-q="${q2.id}"][data-field="${i}"][data-bit]`);
    bits.forEach((b, j) => b.value = text[j]);
    qa(q2).answers[i] = text;
    qa(q2).success = false;
    qa(q2).feedback = null;
    el.closest("article")?.classList.remove("success");
  });
  document.addEventListener("keydown", (e) => {
    const el = e.target;
    if (el.dataset.boardRle !== void 0 && (e.key === "Enter" || e.key === " ")) {
      e.preventDefault();
      toggleBoardRLEBit(Number(el.dataset.boardRle), true);
      return;
    }
    if (el.dataset.boardPixel !== void 0 && (e.key === "Enter" || e.key === " ")) {
      e.preventDefault();
      toggleBoardPixel(Number(el.dataset.boardPixel), true);
      return;
    }
    if (el.dataset.bit !== void 0) {
      const n = Number(el.dataset.bit), q2 = el.dataset.q, i = el.dataset.field, bits = $$(`input[data-q="${q2}"][data-field="${i}"][data-bit]`);
      if (e.key === "Backspace" && !el.value && n < 7) {
        bits[n + 1].focus();
      }
      if (e.key === "ArrowLeft" && n > 0) {
        e.preventDefault();
        bits[n - 1].focus();
      }
      if (e.key === "ArrowRight" && n < 7) {
        e.preventDefault();
        bits[n + 1].focus();
      }
    }
    if (e.key === "Enter" && el.dataset.q) {
      e.preventDefault();
      checkQuestion(qIndex.get(el.dataset.q));
      return;
    }
    if (["INPUT", "TEXTAREA", "SELECT"].includes(el.tagName) || $("#modal").open || e.ctrlKey || e.metaKey || e.altKey) return;
    if (state.sixScreen && e.key === "Escape") {
      e.preventDefault();
      exitSixQuestionScreen();
      return;
    }
    if (state.view === "teach") {
      if (e.key.toLowerCase() === "n") {
        e.preventDefault();
        state.showAll = false;
        teachRoute(state.skill, state.level);
      }
      if (e.key.toLowerCase() === "a") {
        e.preventDefault();
        toggleAllAnswers();
      }
      if (e.key === "Escape") {
        state.focus = -1;
        state.pen = "pointer";
        render();
      }
    }
  });
  document.addEventListener("toggle", (e) => {
    if (e.target.id === "practice-types") state.practiceOptionsOpen = e.target.open;
    const key2 = e.target.dataset?.unitGroup;
    if (key2) e.target.open ? openUnitGroups.add(key2) : openUnitGroups.delete(key2);
  }, true);
  document.addEventListener("change", (e) => {
    const el = e.target;
    if (el.id === "board-bitmap-width" || el.id === "board-bitmap-height") {
      resizeBoardBitmap(el, true);
      return;
    }
    if (el.id === "board-tree-active") {
      const page = prefs.boards[state.boardIndex], index = Number(el.value);
      if (Number.isInteger(index) && index >= 0 && index < page.huffmanTrees.length) {
        page.huffmanIndex = index;
        persist();
        render();
      }
      return;
    }
    if (el.id === "board-tree-example") {
      replaceBoardTree(el.value);
      return;
    }
    if (el.id === "topic-select") {
      state.topic = el.value;
      render();
    }
    if (el.id === "timer-sound") {
      prefs.timerSound = el.checked;
      persist();
      if (el.checked) void prepareTimerSound();
      else stopTimerAlarm();
    }
    if (el.id === "scaffolds") {
      state.scaffold = el.checked;
      render();
    }
    if (el.id === "practice-count") state.practiceCount = Number(el.value);
    if (el.dataset.practiceTopic) selectPracticeTopic(el.dataset.practiceTopic, el.checked);
    if (el.dataset.practiceType && validSkill(el.dataset.practiceType)) {
      state.practiceIds = el.checked ? [.../* @__PURE__ */ new Set([...state.practiceIds, el.dataset.practiceType])] : state.practiceIds.filter((id) => id !== el.dataset.practiceType);
      syncPracticeChoices();
    }
    if (el.id === "worksheet-count") state.worksheetCount = Number(el.value);
    if (el.dataset.worksheetSkill) {
      const id = el.dataset.worksheetSkill;
      state.worksheetIds = el.checked ? [.../* @__PURE__ */ new Set([...state.worksheetIds, id])] : state.worksheetIds.filter((x) => x !== id);
      $("#selected-count").textContent = state.worksheetIds.length;
      syncUnitCounts("worksheet-topics", state.worksheetIds);
    }
    if (el.id === "board-ascii-length" && [3, 4, 5, 6].includes(Number(el.value))) {
      const page = prefs.boards[state.boardIndex];
      if (page.template.startsWith("ascii-word-")) {
        saveBoardHistory();
        page.asciiLength = Number(el.value);
        page.asciiAnswer = false;
        persist();
        render();
      }
    }
    if (el.id === "board-background" || el.id === "board-template") {
      saveBoardHistory();
      bitmapResizeEdit = null;
      const page = prefs.boards[state.boardIndex];
      page[el.id === "board-background" ? "background" : "template"] = el.value;
      if (el.id === "board-template") {
        page.additionAnswer = false;
        page.rleAnswer = false;
        page.rleChecked = false;
        page.asciiAnswer = false;
      }
      persist();
      render();
    }
    if (el.id === "import-file") importLesson(el.files[0]);
  });
  function checkQuestion(q2) {
    if (!q2) return;
    const s = qa(q2);
    const results = q2.fields.map((f, i) => checkField(f, s.answers[i]));
    if (results.some((r) => r.empty)) {
      s.feedback = "Complete every answer before checking.";
      s.success = false;
    } else {
      s.success = results.every((r) => r.correct);
      s.feedback = s.success ? "Correct. Your answer matches." : q2.fields.length > 1 ? `${results.filter((r) => r.correct).length} of ${results.length} answers correct. Recheck the others, or use a hint.` : results[0].message;
    }
    render();
  }
  async function importLesson(file) {
    if (!file) return;
    if (file.size > 15e4) {
      toast("Choose a Bytesize lesson JSON file of 150,000 bytes or less.");
      return;
    }
    try {
      const x = JSON.parse(await file.text()), l = x.format === "bytesize-whiteboard-lesson" && x.version === 1 ? cleanLesson(x) : null;
      if (!l) throw Error();
      prefs.lessons.push(l);
      persist();
      render();
      toast("Lesson imported.");
    } catch {
      toast("That file is not a valid Bytesize lesson.");
    }
  }
  document.addEventListener("submit", (e) => {
    if (e.target.id === "save-lesson-form") {
      e.preventDefault();
      saveNamedLesson();
    }
    if (e.target.id === "board-text-form") {
      e.preventDefault();
      $('[data-action="place-board-text"]')?.click();
    }
  });
  function saveNamedLesson() {
    const name = $("#lesson-name")?.value.trim();
    if (!name) {
      $("#lesson-name")?.focus();
      return;
    }
    prefs.lessons.push({ title: name, skills: [...prefs.queue], level: 0, seed: state.seed });
    persist();
    closeModal();
    render();
    toast("Lesson saved.");
  }
  document.addEventListener("click", async (e) => {
    const boardRle = e.target.closest("[data-board-rle]");
    if (boardRle) {
      if (e.detail === 0) toggleBoardRLEBit(Number(boardRle.dataset.boardRle), true);
      return;
    }
    const boardPixel = e.target.closest("[data-board-pixel]");
    if (boardPixel) {
      if (e.detail === 0) toggleBoardPixel(Number(boardPixel.dataset.boardPixel), true);
      return;
    }
    const pixel = e.target.closest("[data-pixel]");
    if (pixel) {
      const q3 = qIndex.get(pixel.dataset.group), s2 = qa(q3), i = q3.fields.findIndex((f) => f.kind === "bitmap"), data = (s2.answers[i] || "0".repeat(q3.meta.data.length)).split(""), pos = Number(pixel.dataset.pixel);
      data[pos] = data[pos] === "1" ? "0" : "1";
      s2.answers[i] = data.join("");
      s2.success = false;
      s2.feedback = null;
      pixel.classList.toggle("on", data[pos] === "1");
      pixel.setAttribute("aria-pressed", data[pos] === "1");
      pixel.closest("article")?.classList.remove("success");
      return;
    }
    const el = e.target.closest("[data-action]");
    if (!el || el.disabled) return;
    const a = el.dataset.action, q2 = el.dataset.q ? qIndex.get(el.dataset.q) : null, s = q2 ? qa(q2) : null, idx = Number(el.dataset.index), id = el.dataset.skill;
    if (a === "nav") {
      $(".sidebar")?.classList.remove("open");
      if (el.dataset.view === "teach") {
        state.showAll = false;
        state.focus = -1;
        teachRoute();
      } else if (el.dataset.view === "practice") {
        state.practiceSkill = null;
        state.practiceQs = [];
        route("practice");
        if (state.view === "practice") {
          generatePractice();
          render();
        }
      } else route(el.dataset.view);
      return;
    }
    if (a === "menu") {
      $(".sidebar").classList.toggle("open");
      return;
    }
    if (a === "launch") {
      state.lesson = null;
      state.focus = -1;
      state.showAll = false;
      state.pen = "pointer";
      teachRoute(id);
      return;
    }
    if (a === "practise") {
      state.practiceQs = [];
      route("practice", { skill: id });
      if (state.view === "practice" && state.practiceSkill === id) {
        generatePractice();
        render();
      }
      return;
    }
    if (a === "favorite") {
      prefs.favorites = prefs.favorites.includes(id) ? prefs.favorites.filter((x) => x !== id) : [...prefs.favorites, id];
      persist();
      $("#topic-list").innerHTML = libraryList();
      return;
    }
    if (a === "add-queue") {
      if (prefs.queue.length >= 50) {
        toast("A sequence can contain up to 50 skills.");
        return;
      }
      prefs.queue.push(id);
      persist();
      if ($("#queue-count")) $("#queue-count").textContent = prefs.queue.length;
      toast("Added to your lesson sequence.");
      return;
    }
    if (a === "library-unit") {
      state.libraryUnit = el.dataset.unit;
      state.topic = "all";
      render();
      return;
    }
    if (a === "fav-filter") {
      state.favOnly = !state.favOnly;
      render();
      return;
    }
    if (a === "reset-filters") {
      state.topic = "all";
      state.libraryUnit = "all";
      state.search = "";
      state.favOnly = false;
      render();
      return;
    }
    if (a === "six-screen") {
      await enterSixQuestionScreen();
      return;
    }
    if (a === "six-screen-skill") {
      state.practiceSkill = id;
      state.practiceCount = 6;
      state.practiceSeed = freshSeed();
      generatePractice();
      state.view = "practice";
      route("practice", { skill: id });
      await enterSixQuestionScreen();
      return;
    }
    if (a === "six-exit") {
      await exitSixQuestionScreen();
      return;
    }
    if (a === "six-prev" || a === "six-next") {
      state.sixPage = Math.max(0, Math.min(Math.ceil(state.practiceQs.length / 6) - 1, state.sixPage + (a === "six-next" ? 1 : -1)));
      render();
      return;
    }
    if (a === "six-answers") {
      const qs = visibleSixQuestions(), show = !qs.every((q3) => qa(q3).model);
      qs.forEach((q3) => qa(q3).model = show);
      render();
      return;
    }
    if (a === "six-fresh") {
      refreshPracticeSeed();
      if (generatePractice()) {
        state.sixPage = 0;
        render();
      }
      return;
    }
    if (a === "copy-practice-link") {
      await copyPracticeSetLink();
      return;
    }
    if (a === "refresh-practice-question") {
      refreshPracticeQuestion(idx);
      return;
    }
    if (a === "font-up" || a === "font-down") {
      prefs.font = Math.max(0.85, Math.min(1.5, Math.round((prefs.font + (a === "font-up" ? 0.1 : -0.1)) * 100) / 100));
      persist();
      document.documentElement.style.setProperty("--qscale", prefs.font);
      toast(`Question text: ${Math.round(prefs.font * 100)}%`);
      return;
    }
    if (a === "projector") {
      if (state.view === "practice") {
        await enterSixQuestionScreen();
      } else {
        state.projector = !state.projector;
        render();
      }
      return;
    }
    if (a === "about") {
      about();
      return;
    }
    if (a === "close-modal") {
      closeModal();
      return;
    }
    if (a === "new-set") {
      state.showAll = false;
      state.pen = "pointer";
      teachRoute(state.skill, state.level);
      return;
    }
    if (a === "regen-card") {
      const rounds = [...state.rounds];
      rounds[idx]++;
      state.showAll = false;
      teachRoute(state.skill, state.level, state.seed, rounds, state.legacyHuffman ? state.legacyHuffmanRounds : null);
      return;
    }
    if (a === "focus-card") {
      state.focus = state.focus === idx ? -1 : idx;
      render();
      return;
    }
    if (a === "unfocus") {
      state.focus = -1;
      render();
      return;
    }
    if (a === "all-answers") {
      toggleAllAnswers();
      return;
    }
    if (a === "copy-link") {
      try {
        await navigator.clipboard.writeText(location.href);
        toast("Activity link copied, including these question variants.");
      } catch {
        showModal("Copy activity link", `<p>Copy this link to reopen the same three questions.</p><div class="field"><input type="text" readonly value="${esc(location.href)}" aria-label="Activity link"></div>`);
      }
      return;
    }
    if (a === "print-teach") {
      printSet(modelQs, false, SKILLS.find((x) => x.id === state.skill).title);
      return;
    }
    if (a === "teacher-notes") {
      const sk = SKILLS.find((x) => x.id === state.skill);
      showModal(sk.title, `<div class="tag">AQA 8525 · ${sk.ref}</div><h3>Learning goal</h3><p>${sk.objective}</p><h3>Key knowledge</h3><ul>${TOPIC_GUIDES[sk.topic].map((p) => `<li>${p}</li>`).join("")}</ul><h3>Listen and look for</h3><p>${sk.misconception}</p><h3>Suggested flow</h3><ol><li>Use I do to make each step and decision explicit.</li><li>Ask learners to predict the next step in We do before revealing it.</li><li>Use You do to check whether they can transfer the method to fresh values.</li></ol><p>The three columns model the same skill with related question variants. New questions are generated from the displayed activity link. Explanations use teacher or pupil judgement against the model response.</p><p><a href="${SOURCE}" target="_blank" rel="noopener noreferrer">View the AQA content scope</a></p>`);
      return;
    }
    if (a === "check") {
      checkQuestion(q2);
      return;
    }
    if (a === "reveal") {
      if (state.view === "teach" && state.showAll) {
        state.showAll = false;
        modelQs.forEach((x) => qa(x).model = true);
      }
      s.model = !s.model;
      render();
      return;
    }
    if (a === "hint") {
      s.hint = !s.hint;
      render();
      return;
    }
    if (a === "step") {
      s.steps = s.steps >= q2.steps.length ? 0 : s.steps + 1;
      render();
      return;
    }
    if (a === "method") {
      s.steps = s.steps ? 0 : q2.steps.length;
      render();
      return;
    }
    if (a === "self-good" || a === "self-redo") {
      s.success = a === "self-good";
      s.feedback = s.success ? "Self assessed: the response meets the model’s key points." : "Add or improve the missing points in your explanation.";
      render();
      return;
    }
    if (a.startsWith("ink-")) {
      if (["ink-pointer", "ink-pen", "ink-highlighter", "ink-line", "ink-eraser"].includes(a)) state.pen = a.slice(4);
      if (a === "ink-color") {
        state.color = el.dataset.color;
        if (!["pen", "highlighter", "line"].includes(state.pen)) state.pen = "pen";
      }
      if (a === "ink-undo" || a === "ink-clear") {
        if (state.sixScreen) {
          if (a === "ink-undo") undoSixInk();
          else {
            const qs = visibleSixQuestions();
            rememberSixInk(qs);
            qs.forEach((q3) => qa(q3).ink = []);
          }
        } else modelQs.forEach((q3, i) => {
          if (state.focus < 0 || i === state.focus) {
            const s2 = qa(q3);
            if (a === "ink-undo") s2.ink.pop();
            else s2.ink = [];
          }
        });
      }
      render();
      return;
    }
    if (a === "mixed-practice") {
      state.practiceSkill = null;
      state.practiceQs = [];
      generatePractice();
      route("practice");
      if (state.view === "practice") render();
      return;
    }
    if (a === "choose-unit") {
      const unit = el.dataset.unit, scope = el.dataset.scope;
      if (!UNITS.some((u) => u.id === unit) || !["practice", "worksheet"].includes(scope)) return;
      state[scope === "practice" ? "practiceIds" : "worksheetIds"] = skillIdsForUnit(unit);
      for (const key2 of [scope + "-topics", scope + "-types"]) {
        for (const u of UNITS) u.id === unit ? openUnitGroups.add(key2 + "-" + u.id) : openUnitGroups.delete(key2 + "-" + u.id);
      }
      render();
      return;
    }
    if (a === "practice-topics-all" || a === "practice-topics-none") {
      state.practiceIds = a === "practice-topics-all" ? SKILLS.map((s2) => s2.id) : [];
      render();
      return;
    }
    if (a === "practice-type-topic-all" || a === "practice-type-topic-none") {
      selectPracticeTopic(el.dataset.topic, a === "practice-type-topic-all");
      return;
    }
    if (a === "generate-practice") {
      refreshPracticeSeed();
      if (generatePractice()) render();
      return;
    }
    if (a === "reveal-practice") {
      const all = state.practiceQs.every((q3) => qa(q3).model);
      state.practiceQs.forEach((q3) => qa(q3).model = !all);
      render();
      return;
    }
    if (a === "clear-practice") {
      state.practiceQs.forEach((q3) => qState.delete(q3.id));
      render();
      return;
    }
    if (a === "print-practice") {
      printSet(state.practiceQs, false, "", { showTitle: false });
      return;
    }
    if (a === "skill-worksheet") {
      state.worksheetIds = [id];
      state.worksheetQs = [];
      state.worksheetNotice = "";
      state.worksheetTitle = SKILLS.find((x) => x.id === id).title;
      route("worksheets");
      return;
    }
    if (a === "ws-all" || a === "ws-none") {
      state.worksheetIds = a === "ws-all" ? SKILLS.map((s2) => s2.id) : [];
      render();
      return;
    }
    if (a === "generate-worksheet") {
      if (!state.worksheetIds.length) {
        toast("Choose at least one skill.");
        return;
      }
      const seed = freshSeed();
      state.worksheetSeed = seed === state.worksheetSeed ? seed + 1 >>> 0 : seed;
      const result = makeWorksheet(state.worksheetIds, state.worksheetCount, state.worksheetSeed);
      state.worksheetQs = result.questions;
      state.worksheetNotice = result.notice;
      render();
      return;
    }
    if (a === "print-worksheet" || a === "print-answers") {
      printSet(state.worksheetQs, a === "print-answers", state.worksheetTitle, { perPage: 6 });
      return;
    }
    if (a === "queue-up" || a === "queue-down") {
      const j = a === "queue-up" ? idx - 1 : idx + 1;
      if (j >= 0 && j < prefs.queue.length) [prefs.queue[idx], prefs.queue[j]] = [prefs.queue[j], prefs.queue[idx]];
      persist();
      render();
      return;
    }
    if (a === "queue-remove") {
      prefs.queue.splice(idx, 1);
      persist();
      render();
      return;
    }
    if (a === "save-lesson") {
      showModal("Save this lesson", `<p>Keep this ${prefs.queue.length}-skill sequence with a fixed starting question set.</p><form id="save-lesson-form"><div class="field"><label for="lesson-name">Lesson name</label><input type="text" id="lesson-name" maxlength="100" required placeholder="e.g. Year 10 · Binary consolidation"></div><button type="submit" class="btn primary">${ic("save")} Save lesson</button></form>`);
      return;
    }
    if (a === "teach-queue") {
      startLesson({ title: "Current teaching sequence", skills: [...prefs.queue], level: 0, seed: state.seed });
      return;
    }
    if (a === "load-lesson") {
      startLesson(el.dataset.starter === "true" ? starterLessons[idx] : prefs.lessons[idx]);
      return;
    }
    if (a === "lesson-to-queue") {
      const l = el.dataset.starter === "true" ? starterLessons[idx] : prefs.lessons[idx];
      prefs.queue.push(...l.skills.slice(0, 50 - prefs.queue.length));
      persist();
      render();
      toast("Skills added to the current sequence.");
      return;
    }
    if (a === "export-queue") {
      exportLesson({ title: "My teaching sequence", skills: prefs.queue, level: 0, seed: state.seed });
      return;
    }
    if (a === "export-lesson") {
      exportLesson(prefs.lessons[idx]);
      return;
    }
    if (a === "delete-lesson") {
      showModal("Delete saved lesson?", `<p>Remove “${esc(prefs.lessons[idx].title)}” from this browser’s saved lessons.</p><div class="buttons">${btn("Cancel", "close-modal")}${btn("Delete lesson", "confirm-delete-lesson", "trash", "danger", `data-index="${idx}"`)}</div>`);
      return;
    }
    if (a === "confirm-delete-lesson") {
      prefs.lessons.splice(idx, 1);
      persist();
      closeModal();
      render();
      return;
    }
    if (a === "import-lesson") {
      $("#import-file").click();
      return;
    }
    if (a === "lesson-prev" || a === "lesson-next") {
      const l = state.lesson;
      startLesson(l, l.index + (a === "lesson-next" ? 1 : -1));
      return;
    }
    if (a === "leave-lesson") {
      state.lesson = null;
      render();
      return;
    }
    if (a === "board-tool") {
      state.boardTool = el.dataset.tool;
      render();
      return;
    }
    if (a === "board-color") {
      state.boardColor = el.dataset.color;
      if (["pointer", "eraser"].includes(state.boardTool)) state.boardTool = "pen";
      render();
      return;
    }
    if (a === "board-page") {
      if (Number.isInteger(idx) && idx >= 0 && idx < prefs.boards.length) {
        state.boardIndex = idx;
        bitmapResizeEdit = null;
        render();
      }
      return;
    }
    if (a === "board-add") {
      if (prefs.boards.length < 20) {
        prefs.boards.push(emptyBoard());
        state.boardIndex = prefs.boards.length - 1;
        bitmapResizeEdit = null;
        persist();
        render();
      }
      return;
    }
    if (a === "board-delete") {
      deleteBoardPage();
      return;
    }
    if (a === "board-restore-page") {
      restoreBoardPage();
      return;
    }
    if (a === "board-example-new") {
      freshBoardExample();
      return;
    }
    if (a === "board-rle-check") {
      const page = prefs.boards[state.boardIndex];
      if (page.template === "rle-decode" && !page.rleAnswer) {
        saveBoardHistory();
        page.rleChecked = true;
        persist();
        render();
      }
      return;
    }
    if (a === "board-rle-clear") {
      const page = prefs.boards[state.boardIndex];
      if (page.template === "rle-decode" && !page.rleAnswer) {
        saveBoardHistory();
        page.rleResponse = "";
        page.rleChecked = false;
        persist();
        render();
      }
      return;
    }
    if (a === "board-example-answer") {
      const page = prefs.boards[state.boardIndex];
      if (boardExampleQuestion(page)) {
        saveBoardHistory();
        const key2 = boardExampleKeys(page).answer;
        page[key2] = !page[key2];
        persist();
        render();
      }
      return;
    }
    if (a === "board-tree-new") {
      const page = prefs.boards[state.boardIndex];
      replaceBoardTree(page.huffmanTrees[page.huffmanIndex].preset, true);
      return;
    }
    if (a === "board-tree-add") {
      const page = prefs.boards[state.boardIndex];
      if (page.template === "huffman" && page.huffmanTrees.length < 2) {
        saveBoardHistory();
        page.huffmanTrees.push(randomBoardTree(page.huffmanTrees, page.huffmanTrees[page.huffmanIndex].preset));
        page.huffmanIndex = page.huffmanTrees.length - 1;
        persist();
        render();
      }
      return;
    }
    if (a === "board-tree-remove") {
      const page = prefs.boards[state.boardIndex];
      if (page.template === "huffman" && page.huffmanTrees.length > 1) {
        saveBoardHistory();
        page.huffmanTrees.splice(page.huffmanIndex, 1);
        page.huffmanIndex = Math.min(page.huffmanIndex, page.huffmanTrees.length - 1);
        persist();
        render();
      }
      return;
    }
    if (a === "board-undo") {
      const h = boardHistory.get(state.boardIndex);
      if (h?.length) {
        prefs.boards[state.boardIndex] = h.pop();
        bitmapResizeEdit = null;
        persist();
        render();
      } else toast("Nothing to undo on this page.");
      return;
    }
    if (a === "board-clear") {
      saveBoardHistory();
      const page = prefs.boards[state.boardIndex];
      page.strokes = [];
      if (page.template === "bitmap") page.bitmapPixels = "0".repeat(256);
      if (page.template === "rle-decode") {
        page.rleResponse = "";
        page.rleChecked = false;
      }
      persist();
      render();
      toast("Drawing cleared. Use Undo to restore it.");
      return;
    }
    if (a === "place-board-text") {
      const text = $("#board-text").value.trim();
      if (!text) return;
      prefs.boards[state.boardIndex].strokes.push({ tool: "text", color: state.boardColor, width: state.boardWidth, points: [[Number(el.dataset.x), Number(el.dataset.y)]], text });
      persist();
      closeModal();
      refreshInk();
      return;
    }
    if (a === "export-board") {
      download(`bytesize-board-${state.boardIndex + 1}.svg`, boardSVG(prefs.boards[state.boardIndex], true), "image/svg+xml");
      return;
    }
    if (a === "board-help") {
      showModal("Teaching with the blank board", `<p>Select Pen, Highlighter or Straight line, then drag with a mouse, pen or finger. Eraser removes a whole stroke. Use Text, then click the board to place a typed label.</p><p>Choose a plain, dotted or square background. Templates add eight-bit columns, generated two- or three-number binary addition, bitmap grids, ASCII groups and generated word exercises, Huffman trees, RLE encoding and decoding, or a sound sampling diagram. Addition, RLE and ASCII word examples keep their answers hidden until you choose Show answer; New example generates fresh values. Choose ASCII word file size, word to decimal or word to 7-bit binary, then choose 3, 4, 5 or 6 letters. ASCII file sizes count exactly seven bits per character and exclude metadata and padding. Binary ASCII codes use exactly seven bits for each letter. Letter case is preserved. In RLE decoding, tap row cells to toggle 0 and 1, use Check row to check your decoding, or Clear row to start again. Space and Enter also toggle focused cells. Showing the model preserves your own row, which returns when you hide the answer. Bitmap width and height sliders each run from 1 to 16 pixels. Tap a grid cell to switch between white and black, or focus a cell and press Space or Enter. Drag with the pen to annotate. Painted pixels stay in their row and column when the grid is resized. Huffman trees are built from the displayed word or phrase, each with at least one repeated letter. Choose an example from Familiar phrases to use a tongue twister or a short excerpt. Spaces count as characters and share a leaf labelled “space”. New tree chooses another example in the same category, and Add tree places a second tree beside it.</p><p>Use + to add a page and Delete page to remove the current page. Keep at least one page. Undo delete restores removed pages during this visit. Each page keeps its own template settings and drawing.</p><p>Pages are saved automatically in this browser. Undo board change restores drawings, cleared ink and template changes. Export SVG saves the current page, including its background, template settings and annotations.</p>`);
      return;
    }
    if (a === "timer") {
      timerModal();
      return;
    }
    if (a === "timer-test-sound") {
      if (!await playTimerAlarm(true)) toast("Sound is not available in this browser right now.");
      return;
    }
    if (a === "timer-preset") {
      setTimer(el.dataset.minutes);
      return;
    }
    if (a === "timer-set") {
      setTimer($("#timer-minutes").value);
      return;
    }
    if (a === "timer-toggle") {
      if (timer.running) {
        timerTick();
        timer.running = false;
      } else {
        stopTimerAlarm();
        void prepareTimerSound();
        if (timer.remaining === 0) timer.remaining = timer.duration;
        timer.deadline = Date.now() + timer.remaining * 1e3;
        timer.running = true;
        timer.done = false;
      }
      timerTick();
      return;
    }
    if (a === "timer-reset") {
      stopTimerAlarm();
      timer.remaining = timer.duration;
      timer.running = false;
      timer.done = false;
      timerTick();
      return;
    }
  });
  readRoute();
})();
