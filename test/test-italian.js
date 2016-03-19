var shared = require('./lib/shared');
var TweetFilter = require('../lib/filter')
var filter = new TweetFilter(TweetFilter.getFiltersFromFiles("filters/italian"))

var matches = [
    "voglio diventare un vegano",
    "penso che farò fatica a diventare vegana",
    "pensando di diventare vegan",
    "vorrei essere vegana, ma purtroppo mi piace",
];

var falsePositives = [
    "non voglio diventare vegan",
];

exports.matches = function(test) {
    shared.testMatches(test, matches, filter);
    test.done();
}

exports.falsePositives = function(test) {
    shared.testFalsePositives(test, falsePositives, filter);
    test.done();
}
