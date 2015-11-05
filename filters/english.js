var adverbs = [
    'really', 'totally', 'probably', 'defin[ia]tely', 'absolutely', 'actually',
    'certainly', 'literally', 'legitimately', 'genuinely', 'honestly', 'truly',
    'undoubtedly', 'unquestionably'
];
var adverbsRegexSet = adverbs.join('|');

var robustRegex = function(regexStr, flags) {
    flags = flags || 'gi';

    // replace all spaces with a pattern that matches any combination of whitespace and/or periods
    regexStr = regexStr.replace(/ /g, '([\\s.]+)');

    return new RegExp(regexStr, flags);
}

module.exports = [
    robustRegex( "help me (be( a)?|become( a)?|go) #?vegan" ),
    robustRegex( "i (" + adverbsRegexSet + ")? ?(want to|wanna|would like to) (be( a)?|become( a)?|go) #?vegan" ),
    // forcing this to be at the start of the tweet is a simple hack for excluding things like "don't tell me I should go vegan"
    robustRegex( "^(i think)? ?i (" + adverbsRegexSet + ")? ?(should) (go|be) #?vegan" ),
    robustRegex( "i (" + adverbsRegexSet + ")? ?(will|do)? ?(need|want) help (going|becoming( a)?|being( a)?|staying( a)?) #?vegan" ),
    robustRegex( "i (" + adverbsRegexSet + ")? ?(want to|wanna|would like to|should) (try) (going|becoming( a)?|being( a)?) #?vegan" ),
    robustRegex( "i('| a)?m (considering|thinking (about|of)|mulling over) (going|becoming( a)?|being( a)?) #?vegan" ),
    robustRegex( "i (" + adverbsRegexSet + ")? ?(wish) i (was|were) #?vegan" ),
    robustRegex( "i (can|could) (" + adverbsRegexSet + ")? ?(see|picture|imagine)( myself)? (going|being( a)?|becoming( a)?) #?vegan")
]
