var adverbs = [
	'really', 'totally', 'probably', 'defin[ia]tely', 'absolutely', 'actually',
	'certainly', 'literally', 'legitimately', 'genuinely', 'honestly', 'truly',
	'undoubtedly', 'unquestionably'
];
var adverbsRegexSet = adverbs.join('|');

module.exports = [
    /help me (be( a)?|become( a)?|go) veg(etari)?an/i,
    new RegExp("i (" + adverbsRegexSet + ")? ?(want to|wanna|would like to|should) (be( a)?|become( a)?|go) #?vegan", "i"),
    new RegExp("i (" + adverbsRegexSet + ")? ?(will|do)? ?(need|want) help (going|becoming( a)?|being( a)?|staying( a)?) #?vegan", "i"),
    new RegExp("i (" + adverbsRegexSet + ")? ?(want to|wanna|would like to|should)? ?(try) (going|becoming( a)?|being( a)?) #?vegan", "i"),
    /i('| a)?m (considering|thinking (about|of)|mulling over) (going|becoming( a)?|being( a)?) #?vegan/i
]