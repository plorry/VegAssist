var shared = require('./lib/shared');
var TweetFilter = require('../lib/filter')
var filter = new TweetFilter(TweetFilter.getFiltersFromFiles("filters/french"))

var matches = [
    "Je deviens végétalien",
    "Je deviens vegan",
    "je vais devenir végétalien",
    "je vais devenir vegan",
    "je vais être végétalien",
    "je vais être vegan",
    "je veux devenir végétalien",
    "je veux bien devenir végétalien",
    "je veux devenir vegan",
    "je veux bien devenir vegan",
    "je veux être végétalien",
    "je veux bien être végétalien",
    "je veux être vegan",
    "je veux bien être vegan",
    "je veux devenir totalement végétalien",
    "je veux être totalement végétalien",
    "je veux devenir totalement vegan",
    "je veux être totalement vegan",
    "je suis motivé à devenir végétalien",
    "je suis motivé à devenir vegan",
    "je suis motivé à être végétalien",
    "je suis motivé à être vegan",
    "je suis vraiment motivé à devenir végétalien",
    "je suis vraiment motivé à devenir vegan",
    "je suis vraiment motivé à être végétalien",
    "je suis vraiment motivé à être vegan",
    "J'aimerais devenir végétalien",
    "J'aimerais devenir vegan",
    "J'aimerais être végétalien",
    "J'aimerais être vegan"
];

var falsePositives = [
];

exports.matches = function(test) {
    shared.testMatches(test, matches, filter);
    test.done();
}

exports.falsePositives = function(test) {
    shared.testFalsePositives(test, falsePositives, filter);
    test.done();
}
