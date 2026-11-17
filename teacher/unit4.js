import {logicNode as L, logicRows, logicInputs, logicTable, logicExpressionHTML, logicCircuitFigure} from './logic.js';

// Original Bytesize material aligned to AQA 8525 §§3.4.1–3.4.5, first exams June 2027.
export const SYSTEMS_SOURCE='https://www.aqa.org.uk/subjects/computer-science/gcse/computer-science-8525/specification/subject-content/computer-systems';
export const SYSTEMS_TOPICS=[
 ['hardware-software','3.4.1','Hardware and software','▣','Physical components and instructions','#6974c4'],
 ['boolean-logic','3.4.2','Boolean logic','⊕','Gates, truth tables, circuits and expressions','#9855a7'],
 ['software-classes','3.4.3','Software classification','▤','Operating systems, utilities and applications','#357e80'],
 ['translators','3.4.4','Languages and translators','↔','Machine code, assembly and high-level code','#845f32'],
 ['cpu-architecture','3.4.5','CPU and architecture','▦','CPU components, performance and instruction cycle','#4c72ab'],
 ['memory-storage','3.4.5','Memory and storage','▱','RAM, ROM, local storage and cloud storage','#568357'],
 ['embedded-systems','3.4.5','Embedded systems','◉','Dedicated and general-purpose computers','#a45e79']
];
const records={};
function skill(id,topic,title,objective,hint,variants=[]){
 records[id]={id,topic,title,objective,hint,variants};
}
skill('hardware-software-role','hardware-software','Hardware and software','Distinguish physical hardware from software and explain how they work together.','Which parts are physical? Which parts are instructions?',[
 ['A computer is running a drawing program. Explain the difference between the processor and the drawing program.','The processor is hardware, a physical component.','The drawing program is software, a set of instructions executed by the hardware.'],
 ['A tablet takes a photograph. Give one example of hardware and one example of software from this process. Explain how the two work together.','The physical camera is hardware.','The camera application is software. It instructs the hardware to capture and store the image.'],
 ['A pupil says that a keyboard and its driver are both hardware. Explain the mistake.','The keyboard is physical hardware.','The driver is software that helps the computer control or communicate with the keyboard.'],
 ['Explain why a computer needs both hardware and software to run a word processor.','Physical components include the processor and memory.','The program provides instructions; the processor executes them and memory holds the program and data while it runs.']
]);
skill('logic-gate-table','boolean-logic','Truth tables for gates','Complete output columns for individual NOT, AND, OR and XOR gates.','Evaluate the gate for each row in the order shown.');
skill('logic-circuit-table','boolean-logic','Truth tables for circuits','Construct a truth table for a simple circuit with up to three inputs.','Follow the wires from the inputs. Work out intermediate gate outputs first.');
skill('logic-table-read','boolean-logic','Interpret a truth table','Find the output for an input combination or count the rows with a particular output.','Read the input rows in the order shown and inspect Q.');
skill('logic-expression-output','boolean-logic','Evaluate a Boolean expression','Evaluate Boolean expressions using AQA notation.','Evaluate the bracketed parts and apply an overbar only to the part it covers.');
skill('logic-circuit-expression','boolean-logic','Circuit → Boolean expression','Write a Boolean expression that represents a supplied circuit.','Write an expression for each gate as you follow the wires towards Q.');
skill('logic-expression-circuit','boolean-logic','Boolean expression → circuit','Draw a circuit with AQA gate symbols from a supplied expression.','Work out the gate needed for each operator. Place the gate for the outermost operation nearest Q.');
skill('logic-modify','boolean-logic','Modify a logic circuit','Change a circuit in a stated way and describe the effect.','Keep the original inputs and work out where the new gate should go.');
skill('software-types','software-classes','System and application software','Classify software by whether it manages the system or helps the user perform a task.','Ask who or what the software directly supports.',[
 ['Explain how an operating system differs from a spreadsheet application.','An operating system is system software that manages resources and provides a platform for applications.','A spreadsheet is application software that helps a user organise and calculate with data.'],
 ['Classify a word processor and an operating system as system software or application software. Explain each choice.','The word processor is application software: it helps a user create documents.','The operating system is system software: it manages the computer and supports applications.'],
 ['A photo editor and a backup utility are installed on a laptop. Explain which is application software and which is system software.','The photo editor is application software for editing images.','The backup utility is system software that helps maintain or protect stored data.']
]);
skill('os-resources','software-classes','Operating system functions','Explain how an operating system manages processor time, memory, devices, running applications and security.','Name the resource and explain what the operating system does with it.',[
 ['A browser and a music player are open. Explain how the operating system allows both to make progress.','It schedules processor time for the running tasks.','It manages the applications and allocates memory to each.'],
 ['A print job starts while a document is being edited. Explain two ways the operating system helps.','It manages input/output by sending print data to the printer.','It manages the running applications or schedules processor time while the user continues editing.'],
 ['Explain how an operating system can manage access to files on a school computer.','It authenticates users or applies permissions to accounts.','It checks permissions before granting access to resources such as files.'],
 ['Explain why an operating system allocates main memory when an application opens.','A running application needs memory for instructions and data.','The operating system allocates available space and tracks which regions are in use.']
]);
skill('utility-purpose','software-classes','Utility programs','Explain why maintenance and protection utilities are used.','Name the maintenance task and explain the benefit.',[
 ['A teacher wants to recover the original version of a damaged file. Explain how a backup utility helps if it was run before the damage.','It creates a separate copy of the data.','A previously saved copy can be restored if the original is lost or corrupted.'],
 ['Explain the purpose of an antivirus utility on a computer.','It scans files or activity for signs of malicious software.','It can block, quarantine or remove detected threats.'],
 ['Explain why a disk cleanup utility might be run on a computer with little free storage.','It identifies removable items such as temporary files.','Removing unnecessary files frees space on secondary storage.']
]);
skill('language-levels','translators','High-level and low-level languages','Compare readability, portability and hardware control at different language levels.','Think about how close each language is to the processor’s instructions.',[
 ['A team wants to maintain one program for several platforms. Give one reason to choose a high-level language and one drawback of using a low-level language.','High-level code is generally easier to read, write and maintain. With suitable translators or runtimes it can be ported.','Low-level code takes more detail to write and is usually tied to a processor instruction set.'],
 ['A developer is programming a controller that needs direct access to processor-specific features. Explain one advantage and one disadvantage of using assembly language.','Assembly gives detailed control of instructions and hardware resources.','It is harder to write and maintain, and is specific to an instruction set.'],
 ['Compare a high-level language with a low-level language, including a benefit of each.','A high-level language provides abstractions that make programs easier for people to read and develop.','A low-level language is closer to machine instructions and allows more direct hardware control.']
]);
skill('machine-assembly','translators','Machine code and assembly','Explain executable machine code and the one-to-one relationship between assembly instructions and machine instructions.','Distinguish binary instructions from their mnemonic representations.',[
 ['Explain the relationship between an assembly instruction and a machine code instruction.','An assembly instruction uses a readable mnemonic for a processor operation.','Each assembly instruction is translated into a corresponding machine code instruction, which the processor can execute.'],
 ['A computer stores a program as binary machine code. Explain why the same program might be written in assembly first.','Machine code is expressed in binary and directly executed by the processor.','Assembly mnemonics make the instructions easier for a programmer to read and edit; an assembler translates them.'],
 ['A program written in assembly for one type of processor does not necessarily run on another. Explain why.','Machine instructions depend on the processor instruction set.','Assembly maps to that instruction set, so a different processor may require rewritten instructions.']
]);
skill('translator-choice','translators','Compilers, interpreters and assemblers','Explain the need for translation and distinguish the three translator types.','Identify the source language and when or how it is translated.',[
 ['A developer wants to translate a complete high-level program into executable machine code before running it. Name the translator and explain what it does.','A compiler.','It translates the high-level source across the program and produces machine code that can be run later.'],
 ['During testing a program is translated and executed one statement at a time. Name the translator and explain how this differs from compiling the whole program.','An interpreter.','It translates and runs statements during execution, rather than producing a separate complete compiled program first.'],
 ['A programmer has written code using assembly mnemonics. Name the translator needed and describe its input and output.','An assembler.','It takes assembly code and translates assembly instructions to the corresponding machine code instructions.'],
 ['Explain why a high-level program must be translated before its instructions can be executed by a processor.','Processors execute machine instructions expressed in binary.','A translator converts the human-readable source to instructions the processor can execute.']
]);
skill('cpu-components','cpu-architecture','Components of the CPU','Explain the roles of the ALU, control unit, clock, registers and buses.','Name the component and connect it to the specific job.',[
 ['A processor compares two values and then changes the order of execution. Explain one role of the ALU and one role of the control unit.','The ALU performs arithmetic and logical operations, such as the comparison.','The control unit coordinates execution and directs the processor to the next required instruction.'],
 ['Explain how a clock and registers help a processor carry out instructions.','The clock provides timing signals that synchronise processor operations.','Registers are small, fast locations within the CPU that temporarily hold data or instructions in use.'],
 ['Describe the role of a bus when an instruction moves from main memory to the CPU.','A bus provides shared signal paths between components.','Signals identifying the location and the instruction data can travel between main memory and the processor.'],
 ['Explain why both the control unit and ALU are needed for an instruction to add two values.','The control unit coordinates the stages and sends control signals.','The ALU carries out the addition.']
]);
skill('cpu-performance','cpu-architecture','CPU performance','Explain how clock speed, cores and cache can affect performance.','Link your answer to operations per second, parallel work or access to data.',[
 ['Two otherwise identical CPUs have different clock speeds. Explain why the one with the higher clock speed may finish a task sooner.','A higher clock speed provides more clock cycles per second.','The CPU can perform more operations in a given time if other factors are the same.'],
 ['Explain why increasing the number of cores may speed up some programs but not all programs.','Multiple cores allow tasks or parts of a program to run in parallel.','A program that cannot divide its work across cores may gain little or no speed from additional cores.'],
 ['Explain how a larger CPU cache may improve performance.','A larger cache can hold more frequently used instructions or data close to the CPU.','The CPU may spend less time waiting for access to slower main memory.'],
 ['For a program frequently reusing the same data, explain whether a larger cache or an extra core is more directly helpful.','A larger cache is more directly linked to faster access to reused data.','An extra core would help if the program could divide work into parallel tasks.']
]);
skill('fetch-execute','cpu-architecture','Fetch, decode, execute','Explain the stages of the repeated instruction cycle and the role of main memory.','Trace one instruction from main memory through the CPU.',[
 ['Describe the three stages the CPU repeats to process instructions.','Fetch the next instruction from main memory.','Decode it to determine the operation.','Execute the operation, which may read or write data.'],
 ['The CPU has fetched an instruction to add two values. Describe what happens during decoding and execution.','The CPU identifies the addition operation and any operands or locations it uses.','The ALU performs the addition and the result is stored or used as directed.'],
 ['Explain what is fetched, where it comes from, and why the processor then decodes it.','The CPU fetches the next instruction from main memory.','Decoding identifies what operation must be carried out and what data it uses.']
]);
skill('memory-types','memory-storage','RAM, ROM, cache and registers','Explain what each memory type is used for and why it is needed.','Consider where the data is needed, how quickly, and whether it must survive power loss.',[
 ['Explain why data and instructions for an open program are held in RAM, and why ROM can hold start-up instructions.','RAM is writable and holds instructions and data currently in use while power is on.','ROM is non-volatile and can retain start-up instructions while power is off.'],
 ['Explain the difference between cache and registers inside or close to a processor.','Cache keeps frequently needed instructions and data available faster than main memory.','Registers hold the specific values or instructions the processor is working with at that moment.'],
 ['A running program repeatedly uses the same instructions. Explain roles for RAM, cache and registers.','RAM holds programs and data currently in use.','Cache keeps frequently used instructions close to the CPU.','Registers hold individual instructions or values during processing.'],
 ['Compare RAM and ROM in terms of volatility and one typical use for each.','RAM is volatile: it loses contents when power is off. It is used for current programs and data.','ROM is non-volatile: it retains its contents without power. It may hold start-up instructions.']
]);
skill('memory-storage-distinction','memory-storage','Main memory and secondary storage','Distinguish processor-accessible main memory from the long-term storage needed for programs and data.','Compare direct access by the CPU and retention without power.',[
 ['A document disappears when a computer loses power before it is saved. Explain why saving it to an SSD prevents this loss.','The unsaved changes were held in volatile RAM.','The SSD is non-volatile secondary storage, so saved data remains after power is switched off.'],
 ['A program is stored on a drive. Explain why it is loaded into main memory when it is run.','The drive retains the program as secondary storage.','The CPU directly accesses main memory to fetch the instructions while the program is running.'],
 ['Give two differences between main memory and secondary storage and explain why a computer needs secondary storage.','The CPU can directly access main memory; secondary storage is not directly accessed in that way.','Secondary storage retains data when switched off. It is needed to keep programs and data for later use.']
]);
skill('storage-operation','memory-storage','Solid-state and magnetic storage','Explain the operation of SSDs and magnetic drives and compare suitability for a task.','Link how each stores data to a practical benefit or drawback.',[
 ['Explain how a solid-state drive stores data and why it can be suitable for a laptop carried every day.','An SSD uses electrical circuits to retain data without power.','It has no moving parts, making it more resistant to shocks than a mechanical hard disk.'],
 ['Describe how a magnetic hard disk reads and writes data.','The disk has spinning platters with magnetisable surfaces.','A moving head changes or senses magnetisation to write or read data.'],
 ['A school needs a large capacity at low cost for local backups. Compare an SSD and a magnetic hard disk for this task.','A magnetic hard disk typically costs less per unit of capacity.','An SSD often reads and writes faster and has no moving parts, but may cost more for the same capacity.'],
 ['Compare an SSD with a magnetic hard disk for a computer that must load large programs quickly.','An SSD can access stored data without waiting for a platter or head to move.','A magnetic disk has moving parts and usually has longer access times, but can offer cheaper high capacity.']
]);
skill('cloud-v-local','memory-storage','Cloud and local storage','Explain what cloud storage is and compare it with local storage.','Consider where files are stored, how users reach them and what can interrupt access.',[
 ['A pupil wants to edit their work from home and school. Explain one advantage and one drawback of storing it in the cloud instead of on a local drive.','Cloud files are held on remote storage and can be reached on different devices over a connection.','The pupil may lose access if the network or service is unavailable.'],
 ['Explain where data is physically held when saved to cloud storage. Give one difference from saving it on the computer’s SSD.','A provider stores it remotely on magnetic or solid-state equipment.','A local SSD is at the user’s device and can usually be accessed without an internet connection.'],
 ['A department needs to share files between sites. Compare cloud storage and local storage for this use.','Cloud storage can make controlled sharing and access across locations easier.','Local storage can work offline and keep files under local control, but sharing between sites requires another transfer method.']
]);
skill('embedded-purpose','embedded-systems','Embedded and general-purpose systems','Distinguish an embedded system from a general-purpose computer and give examples.','Ask whether the computer controls a specific function within another product.',[
 ['A washing machine controller and a desktop PC are both computers. Explain why only the washing machine controller is an embedded system.','The washing machine controller is built into the appliance and controls a dedicated set of functions.','A PC is general-purpose and can run many different applications.'],
 ['Give an example of an embedded system and a non-embedded system. Explain what makes the embedded example different.','A car’s anti-lock braking controller is built into the car for a specific control task.','A general-purpose laptop can be used for many tasks by installing different applications.'],
 ['A traffic light controller reads sensors and changes the lights. Explain how it differs from a general-purpose desktop computer.','The controller is integrated into the traffic light system and performs a specific control function.','A desktop is designed to support different programs and tasks.']
]);
export const SYSTEMS_SKILLS=Object.values(records).map(r=>[r.id,r.topic,r.title,r.objective,r.objective,r.hint]);
export const SYSTEMS_GUIDES={
 'hardware-software':['Hardware is made up of physical parts. Programs and other instructions are software.','Software relies on the hardware to execute instructions and handle data.'],
 'boolean-logic':['Trace from inputs towards Q. Evaluate each gate only after its inputs are known.','NOT reverses one bit. AND needs both 1s, OR needs at least one 1, and XOR needs exactly one 1.','Use up to three independent inputs. Use a dot for AND, + for OR, ⊕ for XOR and an overbar for NOT.'],
 'software-classes':['System software manages or maintains the computer. Application software performs tasks for the user.','Operating systems manage processor time, memory, input/output, applications and security. Utilities support maintenance and protection.'],
 translators:['Machine code is binary and directly executable. Assembly uses mnemonics that map to machine instructions.','High-level languages use abstractions. A compiler translates a program, an interpreter translates and executes statements as it goes, and an assembler translates assembly.'],
 'cpu-architecture':['The ALU performs arithmetic and logic. The control unit coordinates work. The clock synchronises operations; registers hold values in use and buses carry signals.','The instruction cycle repeats: fetch from main memory, decode, execute. Clock speed, cores and cache affect performance in different ways.'],
 'memory-storage':['RAM holds current data and instructions. ROM retains data without power. Cache holds frequently used values; registers hold values in immediate use.','Main memory is directly accessible to the CPU. Secondary storage is non-volatile. Solid state and magnetic devices store data in different ways.','Cloud storage holds data remotely on physical drives. Compare remote access and collaboration with connection dependence and local control.'],
 'embedded-systems':['An embedded computer controls a dedicated function within a larger device or system. A general-purpose computer supports many different applications.']
};
const BINARY=['AND','OR','XOR'];
const singles=[L('NOT','A'),L('AND','A','B'),L('OR','A','B'),L('XOR','A','B')];
const circuits=[
 L('AND',L('NOT','A'),'B'),L('OR','A',L('NOT','B')),L('XOR',L('NOT','A'),'B'),
 L('NOT',L('OR','A','B')),L('NOT',L('AND','A','B')),L('NOT',L('XOR','A','B')),
 ...BINARY.flatMap(outer=>BINARY.flatMap(inner=>[L(outer,L(inner,'A','B'),'C'),L(outer,'A',L(inner,'B','C')),L(outer,L(inner,'A','B'),L('NOT','C'))]))
];
const diagram=tree=>logicCircuitFigure(tree);
const expression=tree=>`<span class="logic-expression">${logicExpressionHTML(tree)}</span>`;
export function makeSystemsQuestion(id,level,pick,{q,written,field}){
 const record=records[id];
 const hint=record.hint;
 if(record.variants.length){
  const [prompt,...points]=pick(record.variants);
  return written(prompt,points,hint);
 }
 const tree=id==='logic-gate-table'?pick(singles):pick(level===1?circuits.slice(0,6):circuits.slice(level===2?0:6));
 const inputs=logicInputs(tree),rows=logicRows(tree),row=pick(rows),sequence=rows.map(r=>r.output).join('');
 const details={tree,inputs,rows};
 if(id==='logic-gate-table'||id==='logic-circuit-table'){
  const gate=id==='logic-gate-table';
  const prompt=gate?`Complete the Q column for the <strong>${tree.op}</strong> gate. Write the output bits from top to bottom.`:'Complete the Q column for this circuit. Write the output bits from top to bottom.';
  return q(prompt,[field('Q column (top to bottom)',sequence,'bitstream')],[`Evaluate each input row from left to right through the circuit.`,`The Q outputs in table order are <code>${sequence}</code>.`],hint,(gate?'':diagram(tree))+logicTable(tree,{blank:true}),details);
 }
 if(id==='logic-table-read'){
  const pattern=inputs.map((name,i)=>`${name} = ${row.bits[i]}`).join(', ');
  return q(`Use the truth table to find Q when <strong>${pattern}</strong>.`,[field('Output Q',row.output)],[`Find the row with ${pattern}.`,`Its Q value is ${row.output}.`],hint,logicTable(tree),details);
 }
 if(id==='logic-expression-output'){
  const pattern=inputs.map((name,i)=>`${name} = ${row.bits[i]}`).join(', ');
  return q(`For <strong>${pattern}</strong>, evaluate Q = ${expression(tree)}.`,[field('Output Q',row.output)],[`Substitute the given input bits into the expression.`,`Evaluate the inner operations first. Q = ${row.output}.`],hint,'',details);
 }
 if(id==='logic-circuit-expression')return {...written('Write the Boolean expression for output Q of this circuit. Use AQA notation.',[`Q = ${expression(tree)}`,'Check that your brackets and any overbar apply to the correct inputs or sub-expression.'],hint,diagram(tree)),meta:details};
 if(id==='logic-expression-circuit')return {...written(`On paper or a whiteboard, draw the circuit for Q = ${expression(tree)}. Label its inputs and Q.`,['Use the corresponding gate for each operator, wired from the inputs towards Q.','Compare your drawing with the model diagram.'],hint),meta:details,solutionFigure:diagram(tree)};
 const changed=L('NOT',tree);
 return {...written('Draw a modified circuit so that Q is the opposite of the original output for every input row. Label Q on your new circuit.',['Connect the original output to a NOT gate, then label its output Q.','Every original 0 becomes 1 and every original 1 becomes 0.'],hint,diagram(tree)),meta:details,solutionFigure:diagram(changed)};
}
