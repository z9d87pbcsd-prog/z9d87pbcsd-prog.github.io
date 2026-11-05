"use strict";
(() => {
  // ../bytesize-hub/dist/student/worked-methods.js
  (function(root) {
    "use strict";
    if (root.BytesizeMethods) return;
    const methods = {};
    const add = (ids, title, steps, example = "") => ids.split(" ").forEach((id) => {
      methods[id] = { title, steps, example };
    });
    const code = (value) => `<code>${value}</code>`;
    add("addition", "Add binary numbers", [
      "Line up the columns. Start with the column furthest to the right.",
      "Add the digits in that column and any carry. A total of 2 means write 0 and carry 1; a total of 3 means write 1 and carry 1.",
      "Repeat to the left. Keep the number of answer bits requested, including leading zeros. Check your sum by converting both sides to decimal."
    ], `Separate four-bit example: ${code("0101 + 0011 = 1000")}. In the rightmost column, 1 + 1 gives 0 with a carry of 1. In decimal, 5 + 3 = 8.`);
    add("logical-shift", "Move each bit", ["Write the original bit pattern and mark the requested direction and number of places.", "Move every bit the same number of places. Fill the empty positions with zeros and discard any bits that move beyond the fixed width.", "Count the answer positions and check that you have kept the required width."], `Separate four-bit example: ${code("0011")} shifted left once becomes ${code("0110")}. Each bit moves one place; the empty rightmost position becomes 0.`);
    add("shift-effect unit-divide-shift unit-shift-effect", "Find a shift’s arithmetic effect", ["Count the left and right places separately.", "Each left place contributes a factor of 2; each right place contributes a division by 2. Combine the factors, or cancel opposite places.", "State the remaining multiplication, division or unchanged value. Apply any assumptions about discarded bits in the question."], "Separate example with more shift places: left by 9 and then right by 2 gives ×512 followed by ÷4, so the overall factor is ×128.");
    add("base-binary-decimal", "Convert binary to decimal", ["Write the place values above the bits, starting with 1 on the right and doubling to the left.", "Select the place values whose bits are 1.", "Add those values. Zero bits contribute nothing."], `Separate nine-bit example: ${code("100000001")} = 256 + 1 = 257.`);
    add("base-decimal-binary", "Convert decimal to binary", ["Write a row of powers of two, from the largest required place down to 1.", "Starting at the left, write 1 if that place value fits into the remaining amount, then subtract it. Otherwise write 0.", "Continue to the units place. Add the selected values to check your result and retain the requested width."], `Separate nine-bit example: 257 = 256 + 1, so its binary pattern is ${code("100000001")}.`);
    add("base-binary-hex", "Convert binary to hexadecimal", ["Group the binary digits into blocks of four, starting at the right. Add leading zeros only if a group is incomplete.", "Use the weights 8, 4, 2 and 1 within each group to calculate its value.", "Write one hexadecimal digit for each group. Values 10 to 15 use A to F."], `Separate larger example: ${code("0001 0010 1100")} gives 1, 2 and 12, so the hexadecimal result is ${code("12C")}.`);
    add("base-hex-binary", "Convert hexadecimal to binary", ["Take one hexadecimal digit at a time.", "Write that digit as exactly four binary bits, using weights 8, 4, 2 and 1.", "Join the four-bit groups in the original order and check the requested total width."], `Separate larger example: ${code("12C")} becomes ${code("0001 0010 1100")}. Keep all four positions in each group.`);
    add("base-hex-decimal", "Convert hexadecimal to decimal", ["Write hexadecimal place values from the right: 1, 16, 256 and so on.", "Replace A to F with their numerical values, then multiply each digit by its place value.", "Add the products."], `Separate larger example: ${code("12C")} = (1 × 256) + (2 × 16) + 12 = 300.`);
    add("base-decimal-hex", "Convert decimal to hexadecimal", ["Divide the decimal number by 16 and record the remainder.", "Repeat with each quotient until it is zero. Convert remainders 10 to 15 into A to F.", "Read the remainders from last to first. Retain the requested number of hexadecimal digits."], "Separate larger example: 300 ÷ 16 = 18 remainder 12 (C); 18 ÷ 16 = 1 remainder 2; 1 ÷ 16 = 0 remainder 1. Reading back gives 12C.");
    add("unit-convert", "Convert storage units", ["Identify the starting unit and target unit, including the case of b or B.", "Use 8 bits per byte and 1,000 for each decimal prefix step. Write the conversion as one step at a time.", "Multiply when expressing the same amount in smaller units; divide when moving to larger units. Check the unit on your result."], "Separate example: 3.125 kB = 3,125 B, then 3,125 × 8 = 25,000 bits.");
    add("unit-compare unit-rank", "Compare storage capacities", ["Choose one common unit for every amount.", "Convert each amount into that unit before comparing the numbers.", "For a ranking question, put the converted amounts in order and copy the ranks back to their original rows. For a comparison, select the matching comparison symbol."], "Separate example: 2.5 kB = 2,500 B, which is smaller than 2,600 B. Compare the converted numbers, not the printed unit names.");
    add("unit-symbol", "Write a storage-unit symbol", ["Separate the prefix from the word byte.", "Use the prefix scale in the reference, then combine its symbol with the byte symbol.", "Check upper and lower case carefully: a bit and a byte use different symbols."], "Separate reference: the symbol for a byte is B, while a bit is b. Case is part of the unit.");
    add("unit-values", "Count possible bit patterns", ["Count how many bit positions the question provides.", "Each additional position doubles the number of patterns. Calculate 2 raised to the number of bits.", "Do not subtract one when the question asks how many different values are possible."], "Separate nine-bit example: 2⁹ = 512 possible patterns.");
    add("unit-maximum", "Find the largest unsigned value", ["Count the bit positions and imagine every position set to 1.", "Add their place values, or calculate 2 raised to the number of bits and subtract one.", "Check whether the question asks for the largest value or the total number of possible values."], "Separate nine-bit example: 2⁹ − 1 = 511. There are 512 patterns, but the values start at zero.");
    const asciiSteps = ["Keep the exact characters, including upper and lower case, in their original order.", "Find each character in the supplied reference. When a group is consecutive, count its offset from the group’s starting character.", "Write one code per character. Check both the order and the requested number base."];
    add("encode-text ascii-word-decimal", "Encode characters as ASCII", asciiSteps, `Separate two-letter example: ${code("Hi")} gives ${"H".charCodeAt(0)} ${"i".charCodeAt(0)} in decimal ASCII. Use the capital H and lower-case i groups separately.`);
    add("ascii-word-binary", "Encode seven-bit ASCII", [...asciiSteps.slice(0, 2), "Convert each decimal code to exactly seven bits using weights 64, 32, 16, 8, 4, 2 and 1. Keep the character groups separate."], `Separate two-letter example: ${code("Hi")} → ${code(["H", "i"].map((c) => c.charCodeAt(0).toString(2).padStart(7, "0")).join(" "))}. Each group has seven positions.`);
    add("decode-text", "Decode character codes", ["Split the data into the character-code groups requested by the question.", "If a group is binary, calculate its decimal value using the bit weights.", "Find each value in the supplied character reference. Write its character with the correct case and preserve the order."], `Separate example: decimal codes ${code("72 105")} represent ${code("Hi")}. The two codes identify two characters.`);
    add("ascii-word-size", "Calculate a word’s storage size", ["Count only the characters the question says to include.", "Identify the number of bits used per character in this question.", "Multiply the character count by the bits per character. Keep the result in the requested unit and follow any instruction about metadata or padding."], "Separate two-letter example: Hi has 2 letters. In 7-bit ASCII, 2 × 7 = 14 bits.");
    add("code-sequences", "Use a consecutive character group", ["Identify the starting character and its supplied code.", "Count the offset within the same group. The starting character has offset zero.", "Add the offset to encode a later character, or subtract the starting code to work out the character’s position. Do not jump between unrelated character groups."], `Separate punctuation example: ${code(":")} has ASCII code ${":".charCodeAt(0)} and the next code, ${";".charCodeAt(0)}, represents ${code(";")}. One position corresponds to an increase of one.`);
    add("unicode", "Plan a character-set explanation", ["Identify the writing systems and symbols required by the application.", "Compare the coverage of the character sets described in the question, then connect that difference to the application’s needs.", "Address the question about existing ASCII codes separately. Review that every part of the question has been answered."], "Response planner: “This character set suits [named application] because [coverage], which allows [required text]. Existing ASCII characters [explain the code relationship].” Fill the gaps with your own explanation.");
    add("rle-encode", "Encode consecutive runs", ["Start with the leftmost bit and count its uninterrupted run.", "Write a count/value pair with the count first. Start a new pair whenever the bit changes.", "Continue to the end, without combining separated runs. Add the counts to check that they cover every input bit."], `Separate example with two runs: ${code("000000001111111")} becomes ${code("(8, 0) (7, 1)")}. The counts add to 15 bits.`);
    add("rle-decode", "Expand count/value pairs", ["Read the first pair: identify its count and its bit value.", "Write that bit as many times as the count states, then do the same for each remaining pair.", "Join the runs in order. Check the reconstructed length against the sum of the counts."], `Separate example: ${code("(8, 0) (7, 1)")} expands to ${code("000000001111111")}. Do not reverse the count and value.`);
    add("bitmap-pixels", "Count bitmap pixels", ["Count the number of columns and the number of rows.", "Multiply width by height to find the number of pixel positions.", "Keep pixels separate from bits and bytes in your working."], "Separate example: a 13 × 17 image has 13 × 17 = 221 pixels.");
    add("bitmap-depth", "Find the minimum colour depth", ["Count the different colours in the complete displayed palette.", "List the capacities for increasing bit depths using 2ⁿ.", "Choose the smallest number of bits whose capacity can represent every palette colour."], "Separate example: a palette of 512 colours requires 9 bits per pixel because 2⁹ = 512. A palette is a list of distinct colours, not a count of pixels.");
    add("bitmap-total", "Calculate bitmap storage in bits", ["Work out the pixel count as width × height.", "Find the bits needed for each pixel from the stated depth or complete palette.", "Multiply pixel count by bits per pixel. Follow any instruction about headers or metadata."], "Separate example: 13 × 17 pixels at 5 bits per pixel use 13 × 17 × 5 = 1,105 bits of pixel data.");
    add("bitmap-bytes", "Convert pixel-data bits to bytes", ["Calculate the complete pixel-data size in bits first.", "Use 8 bits per byte to convert that total.", "Check whether an exact value or rounding instruction is requested."], "Separate example: 1,128 bits ÷ 8 = 141 bytes.");
    add("bitmap-change", "Explain a bitmap file-size change", ["Write width × height × colour depth for the original image.", "Replace only the values that the question changes and calculate the new product.", "Compare new size with original size. Explain whether the change affects the number of pixels, the bits per pixel or both."], "Separate example: 13 × 17 × 5 = 1,105 bits. Changing width to 26 while keeping the other values gives 26 × 17 × 5 = 2,210 bits. The pixel count changes by the same factor.");
    add("bitmap-draw", "Rebuild a bitmap from binary data", ["Read the colour key and note how many bits identify one pixel.", "Split the row into groups of that width, preserving any leading zeros.", "Translate one group at a time into a colour. Work left to right and move to the next image row only at the row boundary."], "Separate example key: 00 = red, 01 = blue, 10 = green, 11 = yellow. Data 00 10 01 gives red, green, blue in that order.");
    add("bitmap-encode", "Convert a bitmap into binary data", ["Use the supplied key to match each pixel colour to its bit pattern.", "Work from left to right, one row at a time.", "Write every bit in each pixel group, including leading zeros. Check bits per row as width × bits per pixel."], "Separate example key: 00 = red, 01 = blue, 10 = green, 11 = yellow. A row red, green, blue is encoded as 00 10 01.");
    add("compression-definition", "Identify what compression does", ["Focus on the quantity the question asks about: data size.", "For each option, consider whether it reduces the representation needed for the file.", "Keep compression separate from encryption, renaming or changing a device’s capacity."]);
    add("compression-benefits", "Link compression to an application", ["Identify the limited resources in the scenario, such as storage, connection speed or a data allowance.", "Trace how sending or storing less data would affect each resource.", "Choose or explain distinct benefits that address the stated situation, rather than repeating one benefit."]);
    add("huffman-principle", "Reason about Huffman coding", ["Compare the frequencies of the characters.", "Consider how a shorter code affects the total when a character occurs many times.", "Relate the different code lengths to the total encoded message, following the tree supplied in the question."]);
    add("huffman-read huffman-match", "Read a Huffman tree", ["Start at the root and trace the path to the required leaf, following the actual branch labels.", "Write each bit on that path in order. Stop at the leaf and keep leading zeros.", "When matching a code to a missing leaf, start at the root for each supplied code and follow it to the labelled position."], "Separate path example: branches 0, then 1, then 0 produce the code 010. A new character starts from the root again.");
    add("huffman-encode", "Encode a message using its tree", ["Find the supplied tree code for each character in the message.", "Write the codes in character order without inserting extra bits.", "Join the codes and check that the number of bits equals the sum of their individual lengths."], "Separate code table: L = 0, M = 10, N = 11. The message LMNL becomes 0 | 10 | 11 | 0, or 010110.");
    add("huffman-decode", "Decode a message using its tree", ["Start at the root and follow one supplied bit at a time.", "When you reach a leaf, record its character and return to the root.", "Continue from the next unused bit. The last character should finish at a leaf, with no bits left over."], "Separate code table: L = 0, M = 10, N = 11. Split 010110 as 0 | 10 | 11 | 0 to decode LMNL.");
    add("huffman-size", "Calculate a compressed message size", ["Count the length of each character’s supplied code.", "For each table row, multiply its frequency by its code length.", "Add those row totals. Include only the data and overheads the question specifies."], "Separate example: frequencies L = 3, M = 2, N = 1 with codes 0, 10 and 11 use (3 × 1) + (2 × 2) + (1 × 2) = 9 bits.");
    add("huffman-ascii", "Compare compressed and ASCII sizes", ["Count the total characters, including any repeated copies stated in the question.", "Multiply the character count by the stated ASCII bits per character.", "Subtract the compressed size from the uncompressed size. Use the same unit for both."], "Separate example: 6 characters in 7-bit ASCII use 42 bits. If their compressed representation uses 9 bits, the saving is 42 − 9 = 33 bits.");
    add("sound-digital", "Reason about digital sound", ["Separate the physical signal from the representation a computer stores.", "Consider whether the signal varies continuously or is a collection of measurements.", "Connect the required storage format to a suitable representation of those measurements."]);
    add("sound-sample sound-read", "Read one sound sample", ["Identify the sample number or time requested.", "Find its plotted point and follow across to the amplitude scale.", "Read that amplitude, rather than the horizontal position, recording duration or overall file size."], "Separate chart example: if a point is halfway between amplitude labels 10 and 12, its amplitude is 11 in that chart’s units.");
    add("sound-rate", "Interpret a sampling rate", ["Identify the quantity measured by the rate and the time interval used.", "Distinguish a count per second from bits per measurement and total recording duration.", "Apply that interpretation to the rate in the question."], "Separate example: 6 measurements each second for 3 seconds gives 6 × 3 = 18 measurements.");
    add("sound-resolution", "Interpret sample resolution", ["Identify what a single stored sample represents.", "Distinguish bits allocated to that one sample from how frequently samples are taken.", "Relate the available bit patterns to the levels that can be represented."], "Separate example: 3 binary positions provide 2³ = 8 different stored patterns.");
    add("sound-count", "Count samples in a recording", ["Write the sampling rate in samples per second.", "Convert the duration into seconds if needed.", "Multiply samples per second by seconds; the time units cancel."], "Separate example: 6,000 samples per second × 2 seconds = 12,000 samples.");
    add("sound-size", "Calculate sound-data file size", ["For uncompressed mono sound, multiply rate × bits per sample × duration in seconds.", "Keep the initial product in bits. Convert afterwards if the question asks for bytes or decimal kB.", "Use ÷8 for bytes and a further ÷1,000 for kB. Include extra channels or overheads only when specified."], "Separate example: 6,000 × 10 × 2 = 120,000 bits; ÷8 = 15,000 bytes; ÷1,000 = 15 kB.");
    add("sound-change", "Calculate a change in sound size", ["Write the original rate × resolution × duration product.", "Substitute the new values, leaving unchanged settings alone.", "Calculate the new size. If asked for a ratio, divide new size by original size and explain which factors changed."], "Separate example: 6,000 × 10 × 2 = 120,000 bits. With rate 9,000 and the other values unchanged, the size is 180,000 bits and the ratio is 1.5.");
    add("sound-duration", "Find a recording’s duration", ["Start with size in bits = rate × resolution × duration for the stated mono format.", "Rearrange to duration = size in bits ÷ (rate × resolution).", "Convert any byte-based file size to bits before substituting, then check the result is in seconds."], "Separate example: 120,000 ÷ (6,000 × 10) = 2 seconds.");
    add("sound-rate-find", "Find a sampling rate", ["Start with size in bits = rate × resolution × duration for the stated mono format.", "Rearrange to rate = size in bits ÷ (resolution × duration).", "Keep duration in seconds and report the resulting rate in Hz."], "Separate example: 120,000 ÷ (10 × 2) = 6,000 Hz.");
    add("sound-resolution-find", "Find the bits per sample", ["Calculate how many samples were stored using rate × duration.", "Divide the complete size in bits by that sample count.", "Report the result as bits per sample, checking that all file-size units were converted first."], "Separate example: 120,000 ÷ (6,000 × 2) = 10 bits per sample.");
    add("sound-quality", "Connect sound settings and storage", ["Identify whether the change concerns measurements per second or the precision of each measurement.", "Keep the unchanged settings fixed when comparing file-size products.", "For amplitude-level questions, compare 2 raised to each resolution, rather than assuming the number of levels grows linearly."], "Separate example: 3 bits give 8 levels and 5 bits give 32 levels. At unchanged rate and duration, the storage factor is 5 ÷ 3.");
    add("general", "Work through the question", ["Identify what is given and what you need to find.", "Choose the rule, reference table or diagram that connects them, then set out each step.", "Check the requested unit, format and order before checking your response."]);
    const compressionKinds = { "What is data compression?": "compression-definition", "Why compression helps": "compression-benefits", "How Huffman coding reduces size": "huffman-principle", "Read character codes": "huffman-read", "Encode a word": "huffman-encode", "Decode a message": "huffman-decode", "Calculate the compressed size": "huffman-size", "Compare with ASCII": "huffman-ascii", "Match codes to leaf positions": "huffman-match" };
    const bitmapKinds = { "q-pixels": "bitmap-pixels", "q-depth": "bitmap-depth", "q-total": "bitmap-total", "q-bytes": "bitmap-bytes", "bitmap-draw-card": "bitmap-draw", "bitmap-encode-card": "bitmap-encode" };
    const soundKinds = ["sound-digital", "sound-sample", "sound-rate", "sound-resolution", "sound-read", "sound-count", "sound-size", "sound-size", "sound-size", "sound-change", "sound-change", "sound-change", "sound-duration", "sound-rate-find", "sound-resolution-find", "sound-quality", "sound-quality", "sound-change"];
    function kindForQuestion(q2) {
      return q2.kind === "base" ? `base-${q2.from}-${q2.to}` : q2.kind === "addition" ? "addition" : q2.kind === "shift" ? "logical-shift" : q2.kind === "shift-effect" ? "shift-effect" : `unit-${q2.kind}`;
    }
    function kindForCard(card) {
      if (card.dataset.methodKind) return card.dataset.methodKind;
      if (card.classList.contains("scenario")) return "shift-effect";
      if (bitmapKinds[card.id]) return bitmapKinds[card.id];
      if (card.dataset.bitmapTopic) return "bitmap-change";
      if (card.closest("#data-compression-section")) return compressionKinds[card.querySelector("h3")?.textContent.trim()] || "general";
      return "general";
    }
    function get(kind) {
      const method = methods[kind] || methods.general;
      return `<strong>${method.title}</strong><p>Follow these steps using the information in your question.</p><ol>${method.steps.map((step) => `<li>${step}</li>`).join("")}</ol>${method.example ? `<div class="student-method-example"><strong>Separate worked example</strong><p>${method.example}</p></div>` : ""}`;
    }
    function toggle(card) {
      const body = card.querySelector(".student-method-body"), button = card.querySelector(".method-help");
      body.hidden = !body.hidden;
      if (!body.hidden) body.innerHTML = get(kindForCard(card));
      button.textContent = body.hidden ? "Worked method" : "Hide worked method";
      button.setAttribute("aria-expanded", String(!body.hidden));
    }
    function attach(card) {
      if (card.classList.contains("bank-question") || card.querySelector(".method-help,.student-method")) return;
      const details = document.createElement("details");
      details.className = "student-method";
      details.innerHTML = `<summary>Worked method</summary><div class="student-method-body">${get(kindForCard(card))}</div>`;
      card.append(details);
    }
    function mount() {
      const selector = ".question,.sound-card";
      document.querySelectorAll(selector).forEach(attach);
      new MutationObserver((changes) => changes.forEach((change) => change.addedNodes.forEach((node) => {
        if (node.nodeType !== 1) return;
        if (node.matches(selector)) attach(node);
        node.querySelectorAll(selector).forEach(attach);
      }))).observe(document.body, { childList: true, subtree: true });
    }
    root.BytesizeMethods = { get, toggle, kindForQuestion, kindForCard, kindForSound: (type) => soundKinds[type] || "general", kindForCompression: (title) => compressionKinds[title] || "general", forCard: (card) => get(kindForCard(card)), methods };
    if (typeof document !== "undefined") {
      if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", mount, { once: true });
      else mount();
    }
  })(globalThis);

  // ../bytesize-hub/dist/teacher/word-bank.js
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
  function chooseEncodingWord(random, lengths = [3, 4, 5, 6], { excludeWords = /* @__PURE__ */ new Set(), preferComputing = false } = {}) {
    const excluded = excludeWords instanceof Set ? excludeWords : new Set(excludeWords);
    const eligible = (word2) => lengths.includes(word2.length) && !excluded.has(word2);
    const computing = COMPUTING_WORDS.filter(eligible), common = COMMON_WORDS.filter(eligible);
    const pool = computing.length && (preferComputing || !common.length || random() < 0.8) ? computing : common;
    if (!pool.length) throw excludedWord();
    const word = pool[Math.floor(random() * pool.length)];
    return { word, wordCategory: COMPUTING_WORDS.includes(word) ? "computing" : "common" };
  }

  // ../bytesize-hub/dist/teacher/bank.js
  var TOPICS = [
    ["bases", "3.3.1", "Number bases", "01", "What a bit pattern means", "#7260cf"],
    ["conversions", "3.3.2", "Base conversions", "⇄", "Binary, decimal and hexadecimal", "#536acb"],
    ["units", "3.3.3", "Units of information", "B", "Bits, bytes and decimal prefixes", "#25818b"],
    ["arithmetic", "3.3.4", "Binary arithmetic", "+", "Addition and logical shifts", "#a46b20"],
    ["characters", "3.3.5", "Character encoding", "Aa", "ASCII, sequences and Unicode", "#ac5278"],
    ["images", "3.3.6", "Representing images", "▦", "Pixels, colour depth and bitmaps", "#3a8a67"],
    ["sound", "3.3.7", "Representing sound", "∿", "Sampling and file sizes", "#386f9c"],
    ["compression", "3.3.8", "Data compression", "⋈", "Huffman coding and RLE", "#8a61ab"]
  ].map(([id, ref, title, icon, desc, color]) => ({ id, ref, title, icon, desc, color }));
  var skill = (id, topic, title, desc, objective, misconception) => ({ id, topic, title, desc, objective, misconception, ref: TOPICS.find((t) => t.id === topic).ref });
  var SKILLS = [
    skill("base-facts", "bases", "Recognise number bases", "Digits, base values and place value.", "Recognise base 2, base 10 and base 16.", "The base describes the number of available digits, not the number of digits in a value."),
    skill("binary-data", "bases", "Why computers use binary", "Data, instructions and two states.", "Explain how two states can represent bits.", "Binary is used for instructions as well as stored data."),
    skill("hex-purpose", "bases", "Why use hexadecimal?", "Compact, readable bit patterns.", "Explain why hexadecimal is useful to people.", "Hexadecimal is a convenient representation; the computer still uses binary."),
    skill("bit-context", "bases", "One pattern, different meanings", "Interpret binary using its context.", "Explain why a bit pattern needs an interpretation.", "A bit pattern does not identify its own data type."),
    skill("bin-dec", "conversions", "Binary → decimal", "Add the place values containing a 1.", "Convert an eight-bit binary value to decimal.", "The rightmost place has a value of 1, not 2."),
    skill("dec-bin", "conversions", "Decimal → binary", "Build a complete eight-bit answer.", "Represent decimal values from 0 to 255 using eight bits.", "Keep the zero placeholders between the ones."),
    skill("bin-hex", "conversions", "Binary → hexadecimal", "Split into two groups of four.", "Convert each four-bit group to a hexadecimal digit.", "Each hexadecimal digit represents four bits, not eight."),
    skill("hex-bin", "conversions", "Hexadecimal → binary", "Expand each digit to four bits.", "Convert a two-digit hexadecimal number to eight bits.", "A leading zero inside a four-bit group is significant as a placeholder."),
    skill("hex-dec", "conversions", "Hexadecimal → decimal", "Use the 16 and 1 place values.", "Convert a hexadecimal value in the range 00 to FF.", "A means 10; F means 15."),
    skill("dec-hex", "conversions", "Decimal → hexadecimal", "Find the quotient and remainder.", "Convert a decimal value to two hexadecimal digits.", "A remainder of 10 is written A, not 10."),
    skill("bits-bytes", "units", "Bits ↔ bytes", "Eight bits make one byte.", "Convert correctly between bits and bytes.", "b is a bit; B is a byte. Divide bits by eight to find bytes."),
    skill("prefixes", "units", "Convert storage units", "kB, MB, GB and TB using 1,000.", "Apply the decimal prefixes required by AQA.", "Use 1,000 for these decimal prefixes, not 1,024."),
    skill("compare-units", "units", "Compare capacities", "Put different units on the same scale.", "Compare quantities expressed in different storage units.", "Convert to a shared unit before comparing the numbers."),
    skill("add-two", "arithmetic", "Add two binary numbers", "Column addition with safe eight-bit totals.", "Add two binary values without a ninth-bit carry.", "1 + 1 is 10 in binary: write 0 and carry 1."),
    skill("add-three", "arithmetic", "Add three binary numbers", "Track each column and its incoming carry.", "Add three binary values with a maximum eight-bit answer.", "1 + 1 + 1 is 11: write 1 and carry 1."),
    skill("shift-left", "arithmetic", "Logical shift left", "Move bits and fill the right with zeros.", "Apply a logical left shift within an eight-bit register.", "A bit shifted off the left edge is lost."),
    skill("shift-right", "arithmetic", "Logical shift right", "Move bits and fill the left with zeros.", "Apply a logical right shift within an eight-bit register.", "Logical shifts always fill vacated positions with zeros."),
    skill("shift-effect", "arithmetic", "Explain a shift’s effect", "Powers of two and discarded bits.", "Relate logical shifts to multiplication and whole-number division.", "A left shift only gives the expected multiplication when no 1 bits are lost."),
    skill("encode-text", "characters", "Characters → ASCII codes", "Use a supplied character table.", "Encode a short text as decimal or binary ASCII codes.", "Upper-case and lower-case letters have different codes."),
    skill("ascii-word-size", "characters", "Word file size · 7-bit ASCII", "Count letters, then multiply by seven.", "Calculate the size in bits of a 3–6 letter word stored using 7-bit ASCII.", "Each character uses seven bits in this question, not eight. Exclude metadata and padding."),
    skill("ascii-word-decimal", "characters", "Word → decimal ASCII", "Convert 3–6 letters into decimal character codes.", "Encode a 3–6 letter word using the supplied ASCII group reference.", "Keep the letter case and the order of the characters."),
    skill("ascii-word-binary", "characters", "Word → 7-bit ASCII binary", "Write one seven-bit code for each of 3–6 letters.", "Encode a 3–6 letter word as seven-bit binary ASCII codes.", "Each character needs exactly seven bits; do not add an eighth bit."),
    skill("decode-text", "characters", "ASCII codes → characters", "Decode a sequence with a table.", "Read decimal and binary character codes.", "Digits such as 7 have character codes; that code is not the number 7."),
    skill("code-sequences", "characters", "Use character sequences", "Upper case, lower case and digits.", "Calculate neighbouring codes within a character group.", "The gap between A and a is not part of one continuous alphabet."),
    skill("unicode", "characters", "ASCII and Unicode", "Character sets and wider language support.", "Explain Unicode’s purpose and its relationship to ASCII.", "Unicode uses the same codes as ASCII from 0 to 127; it is not always a fixed 16-bit format."),
    skill("pixels", "images", "Pixels and image dimensions", "Picture elements, width and height.", "Explain how a bitmap is made from pixels.", "Image dimensions are width × height; count both dimensions."),
    skill("colour-depth", "images", "Colour depth", "Bits per pixel and possible colours.", "Connect colour depth to the range of pixel values.", "Colour depth counts bits for each pixel, not bytes for the whole image."),
    skill("image-size", "images", "Calculate bitmap file size", "Width × height × colour depth.", "Calculate raw bitmap sizes in bits and bytes.", "Divide by eight only when converting bits to bytes. Ignore metadata unless stated."),
    skill("bitmap-encode", "images", "Bitmap → binary data", "Read pixels row by row using a key.", "Encode a simple monochrome bitmap.", "Use the stated colour key and reset at the start of each row."),
    skill("bitmap-decode", "images", "Binary data → bitmap", "Turn each bit into a pixel.", "Draw a simple bitmap from its binary data.", "A zero is still a pixel; it is not a gap."),
    skill("image-change", "images", "Changes to image size", "Explain and calculate the impact.", "Relate pixel count and colour depth to file size.", "Doubling both width and height quadruples the number of pixels."),
    skill("sampling", "sound", "How sound is sampled", "Amplitude, sampling rate and resolution.", "Describe analogue sound represented by digital samples.", "Sampling rate is samples per second; sample resolution is bits per sample."),
    skill("sound-size", "sound", "Calculate sound file size", "Rate × resolution × duration.", "Calculate raw sound size using the AQA formula.", "Convert minutes to seconds, and bits to bytes when requested."),
    skill("sound-change", "sound", "Change the sound settings", "Predict size and representation effects.", "Explain the effect of changing rate or sample resolution.", "Higher sample resolution measures amplitude more precisely; it does not make the sound louder."),
    skill("sound-missing", "sound", "Find a missing sound value", "Rearrange the file-size calculation.", "Find rate, resolution or duration from the other values.", "Keep file size in bits when using the rate × resolution × seconds formula."),
    skill("compression-purpose", "compression", "Explain data compression", "Storage, transfer and exact recovery.", "Explain reasons for reducing the bits needed to store data.", "Compression is about the representation, not simply deleting meaningful content."),
    skill("huffman-read", "compression", "Read a Huffman tree", "Follow the 0 and 1 branches.", "Read a character code from a labelled tree.", "Start at the root for every character."),
    skill("huffman-explain", "compression", "Why Huffman coding works", "Frequency, short codes and exact recovery.", "Explain how variable-length codes can reduce storage.", "The most frequent characters should not be given the longest codes."),
    skill("huffman-encode", "compression", "Encode using Huffman", "Join variable-length character codes.", "Encode a message using its supplied tree.", "Do not assume all characters use the same number of bits."),
    skill("huffman-decode", "compression", "Decode a Huffman message", "Return to the root after each leaf.", "Decode an encoded bitstream using its supplied tree.", "A code ends when a leaf is reached, not after a fixed number of bits."),
    skill("huffman-size", "compression", "Calculate Huffman savings", "Frequency × code length, then compare ASCII.", "Calculate compressed size, ASCII size and the bits saved.", "Count bits, not the decimal value of the bitstream. The ASCII width is stated in the question."),
    skill("rle-encode", "compression", "Encode using RLE", "Store consecutive count/value pairs.", "Express a binary row using run length encoding.", "Only combine adjacent identical values; do not merge separated runs."),
    skill("rle-decode", "compression", "Decode using RLE", "Expand every frequency/data pair.", "Reconstruct binary data from count/value pairs.", "The first value in a pair is the count; the second is the data value.")
  ];
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
  var bin = (n, width = 8) => n.toString(2).padStart(width, "0");
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
  function treeFigure(data) {
    let leaf = 0, depth = 0;
    const nodes = [], edges = [];
    function layout(n, d) {
      const o = { n, y: 34 + d * 74 };
      depth = Math.max(depth, d);
      if (n.c !== void 0) o.x = 42 + leaf++ * 88;
      else {
        const l = layout(n.left, d + 1), r = layout(n.right, d + 1);
        o.x = (l.x + r.x) / 2;
        edges.push([o, l, 0], [o, r, 1]);
      }
      nodes.push(o);
      return o;
    }
    layout(data.root, 0);
    const w = Math.max(180, leaf * 88), h = depth * 74 + 74;
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
    if (skillId === "base-facts") {
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
      const rate = pick(level === 1 ? [1e3, 2e3, 8e3] : [8e3, 16e3, 22050, 44100]), res = pick([8, 16]), secs = pick([2, 5, 10, 20, 30, 60]), size = rate * res * secs;
      if (skillId === "sound-size") {
        const unit = level === 1 ? "bits" : level === 2 ? "bytes" : "kB", ans = unit === "bits" ? size : unit === "bytes" ? size / 8 : size / 8e3;
        r = q(`An uncompressed sound recording lasts <strong>${secs === 60 ? "1 minute" : secs + " seconds"}</strong>. Its sampling rate is <strong>${fmt(rate)} Hz</strong> and sample resolution is <strong>${res} bits</strong>. Calculate its size in <strong>${unit}</strong>. Use one stream of samples and ignore metadata.`, [field(`File size (${unit})`, ans)], [`Use ${secs} seconds. Size in bits = sampling rate × sample resolution × duration.`, `${fmt(rate)} × ${res} × ${secs} = ${fmt(size)} bits.`, unit === "bits" ? `Answer: ${fmt(size)} bits.` : unit === "bytes" ? `${fmt(size)} ÷ 8 = ${fmt(ans)} bytes.` : `${fmt(size)} ÷ 8 ÷ 1,000 = ${fmt(ans)} kB.`], "The rate is already samples per second; multiply it by bits per sample and seconds.", "", { rate, res, secs, size });
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
      const chosen = chooseEncodingWord(rand, level === 1 ? [3, 4] : [3, 4, 5, 6], options), text = chosen.word.toUpperCase(), data = huffmanData(text), chars = Object.keys(data.codes), target = pick(chars), message = text, encoded = [...message].map((c) => data.codes[c]).join(""), figure = treeFigure(data);
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
    } else if (skillId === "rle-encode" || skillId === "rle-decode") {
      let runs = Array.from({ length: level === 1 ? 3 : 5 }, (_, i) => ({ count: int(1, 6), value: i % 2 }));
      if (rand() < 0.5) runs = runs.map((x) => ({ ...x, value: 1 - x.value }));
      const data = runs.map((x) => String(x.value).repeat(x.count)).join(""), pairs = runs.map((x) => `${x.count} ${x.value}`).join(" | ");
      if (skillId === "rle-encode") r = q(`Encode this single binary row using RLE <strong>count/value</strong> pairs.${big(data)}`, [field("Count/value pairs", pairs, "rle")], [...runs.map((x) => `${x.count} consecutive ${x.value}${x.count === 1 ? "" : "s"} → (${x.count}, ${x.value}).`), `Pairs in order: ${pairs}.`], "Count one uninterrupted run at a time. Write the count before the value.", "", { runs, data });
      else r = q(`Decode these RLE count/value pairs to one binary row.${big(runs.map((x) => `(${x.count}, ${x.value})`).join(" "))}`, [field("Binary row", data, "bitstream")], [...runs.map((x) => `(${x.count}, ${x.value}) → ${String(x.value).repeat(x.count)}.`), `Join the runs: ${data}.`], "Repeat the second value as many times as the first value states.", "", { runs, data });
    }
    if (!r) throw Error("Generator missing: " + skillId);
    return { ...r, id: `${skillId}-${level}-${seed}`, skill: skillId, level, seed, objective: sk.objective, misconception: sk.misconception, title: sk.title, ref: sk.ref };
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

  // ../bytesize-hub/dist/student/practice-questions.js
  var GROUPS = {
    characters: { title: "Character encoding practice", prefix: "characterpractice", skills: SKILLS.filter((s) => s.topic === "characters") },
    rle: { title: "Run length encoding practice", prefix: "rle", skills: SKILLS.filter((s) => ["rle-encode", "rle-decode"].includes(s.id)) }
  };
  var COUNTS = [6, 10, 15, 20];
  var shuffle = (values, random) => {
    const result = [...values];
    for (let i = result.length - 1; i > 0; i--) {
      const j = Math.floor(random() * (i + 1));
      [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
  };
  function normaliseSettings(group, options = {}) {
    const config = GROUPS[group];
    if (!config) throw new Error("Unknown practice group.");
    return {
      type: config.skills.some((s) => s.id === options.type) ? options.type : "all",
      count: COUNTS.includes(Number(options.count)) ? Number(options.count) : 10,
      seed: Number(options.seed) >>> 0
    };
  }
  function createPracticeSet(group, options = {}) {
    const settings = normaliseSettings(group, options), random = rng(settings.seed);
    const skills = GROUPS[group].skills.filter((s) => settings.type === "all" || s.id === settings.type);
    const levels = shuffle([1, 2, 3], random);
    let deck = [];
    return Array.from({ length: settings.count }, (_, i) => {
      if (!deck.length) deck = shuffle(skills, random);
      const skill2 = deck.pop();
      return makeQuestion(skill2.id, levels[i % levels.length], Math.floor(random() * 4294967296));
    });
  }
  function createResponse(question) {
    return { question, answers: question.fields.map(() => ""), written: "", results: [], checked: false, complete: false, feedback: "", tone: "", working: false };
  }
  function resetFeedback(record) {
    record.results = [];
    record.checked = false;
    record.complete = false;
    record.feedback = "";
    record.tone = "";
  }
  function checkResponse(record) {
    resetFeedback(record);
    if (!record.question.fields.length) {
      record.feedback = "Use the worked method to plan and review your explanation.";
      return record;
    }
    record.results = record.question.fields.map((field2, i) => checkField(field2, record.answers[i]));
    if (record.results.some((result) => result.empty)) {
      record.feedback = "Complete every answer before checking.";
      record.tone = "bad";
    } else {
      record.checked = true;
      record.complete = record.results.every((result) => result.correct);
      record.tone = record.complete ? "good" : "bad";
      record.feedback = record.complete ? "Correct! Your answer matches." : "Not quite. Check your method, code format and letter case, or use the worked method.";
    }
    return record;
  }
  var actionButton = (action, text, primary = false) => `<button class="button ${primary ? "secondary" : "outline"}" type="button" data-bank-action="${action}">${text}</button>`;
  function fieldHTML(record, field2, index, prefix) {
    const id = `${prefix}-answer-${index}`, result = record.results[index];
    return `<div class="bank-field"><label for="${id}">${esc(field2.label)}</label><input id="${id}" type="text" data-bank-answer="${index}" value="${esc(record.answers[index])}" ${field2.kind === "number" ? 'inputmode="decimal"' : field2.kind === "bitstream" ? 'inputmode="numeric"' : ""} autocomplete="off" spellcheck="false" ${result && !result.correct ? 'aria-invalid="true"' : ""}><span class="bank-print-space" aria-hidden="true"></span></div>`;
  }
  function rleEditor(record) {
    if (record.question.skill !== "rle-decode") return "";
    const bits = record.answers[0].replace(/\s/g, "");
    return `<div class="bank-rle-editor"><p>Tap a square to switch between 0 and 1, or type your binary row below.</p><div class="bank-bit-row" role="group" aria-label="Build your decoded binary row">${Array.from({ length: record.question.meta.data.length }, (_, i) => {
      const bit = bits[i] === "1" ? "1" : "0";
      return `<button type="button" class="bank-bit" data-bank-bit="${i}" data-value="${bit}" aria-label="Bit ${i + 1}, currently ${bit}" aria-pressed="${bit === "1"}">${bit}</button>`;
    }).join("")}</div></div>`;
  }
  function questionHTML(record, index, group) {
    const q2 = record.question, prefix = `bank-${group}-${index}`;
    const methodKey = q2.skill === "encode-text" && q2.level === 3 ? "ascii-word-binary" : q2.skill;
    const method = record.working ? `<div class="bank-help"><div class="student-method-body">${globalThis.BytesizeMethods.get(methodKey)}</div></div>` : "";
    return `<div class="q-top"><span class="badge">QUESTION ${String(index + 1).padStart(2, "0")}</span><small>${q2.fields.length ? "Exact answer" : "Written explanation"}</small></div><h3>${esc(q2.title)}</h3><div class="bank-prompt">${q2.prompt}</div>${q2.figure ? `<div class="bank-figure">${q2.figure}</div>` : ""}${rleEditor(record)}${q2.fields.length ? q2.fields.map((field2, i) => fieldHTML(record, field2, i, prefix)).join("") : `<div class="bank-field"><label for="${prefix}-written">Your explanation</label><textarea id="${prefix}-written" data-bank-written rows="5">${esc(record.written)}</textarea><span class="bank-print-workspace" aria-hidden="true"></span></div>`}<div class="q-actions">${q2.fields.length ? actionButton("check", "Check answer", true) : ""}${actionButton("working", record.working ? "Hide worked method" : "Worked method")}${actionButton("new", "New question")}</div><p class="feedback ${record.tone}" role="status">${esc(record.feedback)}</p>${method}`;
  }
  function practiceHTML(group, settings, records) {
    const config = GROUPS[group];
    return `<div class="set-head bank-heading"><div><h2>${config.title}</h2><p>Choose a question type or practise a mix.</p></div><div class="actions"><button class="button outline" type="button" data-bank-action="print">Print worksheet</button></div></div><div class="bank-settings"><label>Question type<select data-bank-type><option value="all" ${settings.type === "all" ? "selected" : ""}>Mixed question types</option>${config.skills.map((skill2) => `<option value="${skill2.id}" ${settings.type === skill2.id ? "selected" : ""}>${esc(skill2.title)}</option>`).join("")}</select></label><label>How many questions?<select data-bank-count>${COUNTS.map((count) => `<option ${settings.count === count ? "selected" : ""}>${count}</option>`).join("")}</select></label><button class="button primary" type="button" data-bank-action="generate">Generate new questions</button></div><p class="bank-print-name">Name: ____________________ Class: __________ Date: __________</p><div class="questions bank-questions">${records.map((record, i) => `<article class="question bank-question" data-bank-index="${i}">${questionHTML(record, i, group)}</article>`).join("")}</div><div class="bank-controls">${records.some((record) => record.question.fields.length) ? '<button class="button primary" type="button" data-bank-action="check-all">Check exact answers</button>' : ""}<button class="button outline" type="button" data-bank-action="clear">Clear answers</button><p class="bank-summary" role="status" aria-live="polite"></p></div>`;
  }
  function freshSeed(previous) {
    let seed = crypto.getRandomValues(new Uint32Array(1))[0];
    if (seed === previous) seed = seed + 1 >>> 0;
    return seed;
  }
  function mountPractice(root) {
    const group = root.dataset.bankGroup, config = GROUPS[group], params = new URLSearchParams(location.search);
    const savedSeed = params.get(config.prefix + "code");
    let settings = normaliseSettings(group, { type: params.get(config.prefix + "type"), count: params.get(config.prefix + "count"), seed: savedSeed && /^\d{1,10}$/.test(savedSeed) ? Number(savedSeed) : freshSeed() });
    let records = [];
    function summary() {
      const exact = records.filter((r) => r.question.fields.length), written2 = records.filter((r) => !r.question.fields.length);
      root.querySelector(".bank-summary").textContent = `${exact.length ? `Exact answers: ${exact.filter((r) => r.complete).length} / ${exact.length} correct (${exact.filter((r) => r.checked).length} checked). ` : ""}${written2.length ? `${written2.length} written explanation${written2.length === 1 ? "" : "s"}: use the worked methods to plan and review.` : ""}`;
    }
    function saveSettings() {
      const url = new URL(location.href);
      for (const [key2, value] of Object.entries({ code: settings.seed, type: settings.type, count: settings.count })) url.searchParams.set(config.prefix + key2, String(value));
      history.replaceState(null, "", url);
    }
    function generate(newSeed = false, save = false) {
      settings = normaliseSettings(group, { ...settings, seed: newSeed ? freshSeed(settings.seed) : settings.seed });
      records = createPracticeSet(group, settings).map(createResponse);
      root.innerHTML = practiceHTML(group, settings, records);
      summary();
      if (save) saveSettings();
    }
    function redraw(index, focusAction = "") {
      const card = root.querySelector(`[data-bank-index="${index}"]`);
      card.innerHTML = questionHTML(records[index], index, group);
      if (focusAction) card.querySelector(`[data-bank-action="${focusAction}"]`)?.focus();
      summary();
    }
    function refreshFeedback(card, record) {
      const feedback = card.querySelector(".feedback");
      feedback.className = "feedback";
      feedback.textContent = "";
      card.querySelectorAll("[data-bank-answer]").forEach((input) => input.removeAttribute("aria-invalid"));
      summary();
    }
    function syncBits(card, record) {
      const bits = record.answers[0]?.replace(/\s/g, "") || "";
      card.querySelectorAll("[data-bank-bit]").forEach((button, i) => {
        const bit = bits[i] === "1" ? "1" : "0";
        button.dataset.value = bit;
        button.textContent = bit;
        button.setAttribute("aria-label", `Bit ${i + 1}, currently ${bit}`);
        button.setAttribute("aria-pressed", String(bit === "1"));
      });
    }
    root.addEventListener("input", (event) => {
      const card = event.target.closest("[data-bank-index]");
      if (!card) return;
      const record = records[Number(card.dataset.bankIndex)];
      if (event.target.matches("[data-bank-answer]")) {
        record.answers[Number(event.target.dataset.bankAnswer)] = event.target.value;
        resetFeedback(record);
        refreshFeedback(card, record);
        syncBits(card, record);
      } else if (event.target.matches("[data-bank-written]")) {
        record.written = event.target.value;
        resetFeedback(record);
        refreshFeedback(card, record);
      }
    });
    root.addEventListener("change", (event) => {
      if (event.target.matches("[data-bank-type], [data-bank-count]")) {
        settings.type = root.querySelector("[data-bank-type]").value;
        settings.count = Number(root.querySelector("[data-bank-count]").value);
        generate(true, true);
      }
    });
    root.addEventListener("keydown", (event) => {
      if (event.key !== "Enter" || !event.target.matches("[data-bank-answer]")) return;
      event.preventDefault();
      const index = Number(event.target.closest("[data-bank-index]").dataset.bankIndex);
      checkResponse(records[index]);
      redraw(index, "check");
    });
    root.addEventListener("click", (event) => {
      const bitButton = event.target.closest("[data-bank-bit]");
      if (bitButton) {
        const card2 = bitButton.closest("[data-bank-index]"), record2 = records[Number(card2.dataset.bankIndex)];
        const bits = Array.from({ length: record2.question.meta.data.length }, (_, i) => record2.answers[0].replace(/\s/g, "")[i] === "1" ? "1" : "0");
        const index2 = Number(bitButton.dataset.bankBit);
        bits[index2] = bits[index2] === "1" ? "0" : "1";
        record2.answers[0] = bits.join("");
        card2.querySelector("[data-bank-answer]").value = record2.answers[0];
        resetFeedback(record2);
        refreshFeedback(card2, record2);
        syncBits(card2, record2);
        return;
      }
      const button = event.target.closest("[data-bank-action]");
      if (!button) return;
      const action = button.dataset.bankAction;
      if (action === "print") {
        window.print();
        return;
      }
      if (action === "generate") {
        generate(true, true);
        return;
      }
      if (action === "clear") {
        records = records.map((record2) => createResponse(record2.question));
        root.innerHTML = practiceHTML(group, settings, records);
        summary();
        root.querySelector('[data-bank-action="clear"]').focus();
        return;
      }
      if (action === "check-all") {
        records.forEach((record2, index2) => {
          if (record2.question.fields.length) {
            checkResponse(record2);
            redraw(index2);
          }
        });
        summary();
        return;
      }
      const card = button.closest("[data-bank-index]");
      if (!card) return;
      const index = Number(card.dataset.bankIndex), record = records[index];
      if (action === "check") checkResponse(record);
      if (action === "working") record.working = !record.working;
      if (action === "new") {
        let next;
        for (let attempt = 0; attempt < 12; attempt++) {
          next = makeQuestion(record.question.skill, record.question.level % 3 + 1, freshSeed());
          if (next.prompt !== record.question.prompt) break;
        }
        records[index] = createResponse(next);
      }
      redraw(index, action);
    });
    generate();
    return { get records() {
      return records;
    }, get settings() {
      return settings;
    } };
  }
  if (typeof document !== "undefined") {
    document.querySelectorAll("[data-bank-group]").forEach(mountPractice);
  }
})();
