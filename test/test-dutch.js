var shared = require('./lib/shared');
var TweetFilter = require('../lib/filter')
var filter = new TweetFilter(TweetFilter.getFiltersFromFiles("filters/dutch"))

var matches = [
    "something Dutch ik wil veganist worden something else",
    "\"Dutch slogan\" ik wil veganist zijn",
    "help me veganist te worden",
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
