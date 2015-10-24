var adverbs = [
    'really', 'totally', 'probably', 'defin[ia]tely', 'absolutely', 'actually',
    'certainly', 'literally', 'legitimately', 'genuinely', 'honestly', 'truly',
    'undoubtedly', 'unquestionably'
];
var adverbsRegexSet = adverbs.join('|');

var robustRegex = function(regexStr, flags) {
    flags = flags || 'i';

    // replace all spaces with a pattern that matches any combination of whitespace and/or periods
    regexStr = regexStr.replace(/ /g, '([\\s.]+)');

    return new RegExp(regexStr, flags);
}

module.exports = [
    robustRegex( "help me (be( a)?|become( a)?|go) #?vegan" ),
    robustRegex( "i (" + adverbsRegexSet + ")? ?(want to|wanna|would like to|should) (be( a)?|become( a)?|go) #?vegan" ),
    robustRegex( "i (" + adverbsRegexSet + ")? ?(will|do)? ?(need|want) help (going|becoming( a)?|being( a)?|staying( a)?) #?vegan" ),
    robustRegex( "i (" + adverbsRegexSet + ")? ?(want to|wanna|would like to|should) (try) (going|becoming( a)?|being( a)?) #?vegan" ),
    robustRegex( "i('| a)?m (considering|thinking (about|of)|mulling over) (going|becoming( a)?|being( a)?) #?vegan" ),
]