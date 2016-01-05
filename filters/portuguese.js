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


module.exports = [
    // wanting to go vegan
    regex( "^(eu)? ?(" + adverbsRegexSet + ")? ?(" + wantingVerbsRegexSet + ") (" + beingRegexSet +") #?vegan(a|o)?" ),

    // thinking about going vegan
    regex( "^(eu)? ?(" + amRegexSet + ")? ?(" + thinkingRegexSet + ") (" + aboutRegexSet + ")? (" + beingRegexSet +") #?vegan(a|o)?" ),

    // considering turning vegan
    regex( "^(eu)? ?(" + amRegexSet + ")? ?(" + thinkingRegexSet + ") (" + aboutRegexSet + ")? (" + adoptVerbsRegexSet +") #?vegan(a|o)?" ),

    // help going vegan
    regex( "^(eu)? ?(" + wantingVerbsRegexSet + ")? ?(" + helpRegexSet + ") (a|para|pra) ("+beingRegexSet+") #?vegan(a|o)?" ),
    regex( "^(eu)? ?(" + needRegexSet + ")? (de)? ?(" + helpRegexSet + ") (a|para|pra) ("+beingRegexSet+") #?vegan(a|o)?" ),
    regex( "^(me)? ?(" + helpRegexSet + ")? (a|para|pra) ("+beingRegexSet+") #?vegan(a|o)?" ),

    // wanting to adopt veganism
    regex( "^(eu)? ?(" + adverbsRegexSet + ")? ?(" + wantingVerbsRegexSet + ") ("+adoptVerbsRegexSet+") (o|ao)? ?#?vegan(ismo)?" ),

    // thinking to adopt veganism
    regex( "^(eu)? ?(" + amRegexSet + ")? ?(" + thinkingRegexSet + ") (" + aboutRegexSet + ")? ("+adoptVerbsRegexSet+") (o|ao)? ?#?vegan(ismo)?" ),

    // help adopt veganism
    regex( "^(eu)? ?(" + wantingVerbsRegexSet + ")? ?(" + helpRegexSet + ") (a|para|pra) ("+adoptVerbsRegexSet+") (o|ao)? ?#?vegan(ismo)?" ),
    regex( "^(eu)? ?(" + needRegexSet + ")? (de)? ?(" + helpRegexSet + ") (a|para|pra) ("+adoptVerbsRegexSet+") (o|ao)? ?#?vegan(ismo)?" ),
    regex( "^(me)? ?(" + helpRegexSet + ")? (a|para|pra) ("+adoptVerbsRegexSet+") (o|ao)? ?#?vegan(ismo)?" ),
];
