var util = require("../lib/util");
var track = util.track;
var regex = util.regex;
var excludeBefore = util.excludeBefore;

track("vegan","veganismo", "vegano", "vegana");

var negations = ["não", "nao", "n", "nunca", "nem", "jeito nenhum"];

var adverbs = [
    'realmente', 'provavelmente', 'definitivamente', 'absolutamente', 'honestamente',
    'certamente', 'literalmente', 'genuinamente', 'sem duvida', 'sem dúvida',
    'sem questao', 'sem questão'
];
var adverbsRegexSet = adverbs.join('|');


var wantingVerbs = [
    'quero', 'queria', 'gostaria', 'gostaria de', 'me gostaria de', 'vou', 'preciso', 'preciso de'
];
var wantingVerbsRegexSet = wantingVerbs.join('|');

var adoptVerbs = [
    'adotar', 'em aderir', 'me aderir', 'aderir ae', 'aderir', 'virar', 'tornar-se', 'se tornar', 'tornar-me', 'me tornar'
];
var adoptVerbsRegexSet = adoptVerbs.join('|');

var am = [
    'estou','estive'
];
var amRegexSet = am.join('|');

var thinking = [
    'pensando','considerando'
];
var thinkingRegexSet = thinking.join('|');

var being = [
    'ser','virar','me virar','virar-me','tornar','me tornar'
];
var beingRegexSet = being.join('|');

var about = [
    'sobre','em'
];
var aboutRegexSet = about.join('|');

var help = [
    'ajuda', 'ajude', 'auxília', 'auxílio', 'auxilio', 'auxilio', 'ajuda-me', 'ajude-me'
]
var helpRegexSet = help.join('|');

var need = [
    'preciso', 'necessito'
]
var needRegexSet = need.join('|');

var advice = [
    'conselho', 'um conselho', 'conselhos', 'uns conselhos'
]
var conselhoRegexSet = need.join('|');

var give = [
    'da', 'dá',
]
var giveRegexSet = need.join('|');



module.exports = [

    // wanting to go vegan
    excludeBefore( regex( "(eu)? ?(" + adverbsRegexSet + ")? ?(" + wantingVerbsRegexSet + ") (" + beingRegexSet +") #?vegan(a|o)?" ), negations),

    // thinking about going vegan
    excludeBefore( regex( "(eu)? ?(" + amRegexSet + ")? ?(" + thinkingRegexSet + ") (" + aboutRegexSet + ")? (" + beingRegexSet +") #?vegan(a|o)?" ), negations),

    // considering turning vegan
    excludeBefore( regex( "(eu)? ?(" + amRegexSet + ")? ?(" + thinkingRegexSet + ") (" + aboutRegexSet + ")? (" + adoptVerbsRegexSet +") #?vegan(a|o)?" ), negations),

    // help going vegan
    excludeBefore( regex( "(eu)? ?(" + wantingVerbsRegexSet + ")? ?(" + helpRegexSet + ") (a|para|pra) ("+beingRegexSet+") #?vegan(a|o)?" ), negations),
    excludeBefore( regex( "(eu)? ?(" + needRegexSet + ")? (de)? ?(" + helpRegexSet + ") (a|para|pra) ("+beingRegexSet+") #?vegan(a|o)?" ), negations),
    excludeBefore( regex( "(me)? ?(" + helpRegexSet + ")? (a|para|pra) ("+beingRegexSet+") #?vegan(a|o)?" ), negations),

    // wanting to adopt veganism
    excludeBefore( regex( "(eu)? ?(" + adverbsRegexSet + ")? ?(" + wantingVerbsRegexSet + ") ("+adoptVerbsRegexSet+") (o|ao)? ?#?vegan(ismo)?" ), negations),

    // thinking to adopt veganism
    excludeBefore( regex( "(eu)? ?(" + amRegexSet + ")? ?(" + thinkingRegexSet + ") (" + aboutRegexSet + ")? ("+adoptVerbsRegexSet+") (o|ao)? ?#?vegan(ismo)?" ), negations),

    // help adopt veganism
    excludeBefore( regex( "(eu)? ?(" + wantingVerbsRegexSet + ")? ?(" + helpRegexSet + ") (a|para|pra) ("+adoptVerbsRegexSet+") (o|ao)? ?#?vegan(ismo)?" ), negations),
    excludeBefore( regex( "(eu)? ?(" + needRegexSet + ")? (de)? ?(" + helpRegexSet + ") (a|para|pra) ("+adoptVerbsRegexSet+") (o|ao)? ?#?vegan(ismo)?" ), negations),
    excludeBefore( regex( "(me)? ?(" + helpRegexSet + ")? (a|para|pra) ("+adoptVerbsRegexSet+") (o|ao)? ?#?vegan(ismo)?" ), negations),

    // need advice going vegan
    excludeBefore( regex( "(eu)? ?(" + wantingVerbsRegexSet + ")? ?(" + conselhoRegexSet + ") (a|para|pra) ("+adoptVerbsRegexSet+") (o|ao)? ?#?vegan(ismo)?" ), negations),
    excludeBefore( regex( "(eu)? ?(" + adverbsRegexSet + ")? ?(" + wantingVerbsRegexSet + ") (" + conselhoRegexSet + ") (a|para|pra) (" + beingRegexSet +") #?vegan(a|o)?" ), negations),
    excludeBefore( regex( "(eu)? ?(" + giveRegexSet + ") (" + conselhoRegexSet + ") (a|para|pra) ("+adoptVerbsRegexSet+") (o|ao)? ?#?vegan(ismo)?" ), negations),
    excludeBefore( regex( "(me)? ?(" + giveRegexSet + ") (" + conselhoRegexSet + ") (a|para|pra) (" + beingRegexSet +") #?vegan(a|o)?" ), negations),
];
