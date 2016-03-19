var shared = require('./lib/shared');
var TweetFilter = require('../lib/filter')
var filter = new TweetFilter(TweetFilter.getFiltersFromFiles("filters/spanish"))

var matches = [
    "hi i am spanish and Quisiera Ser Vegana",
    "quisiera hacerme vegana they tell me",
    "i also think that quiero hacerme vegana is something else I say",
    "pensando en convertirse en vegano",
];

var falsePositives = [
    "no quiero ser vegana",
    "no quisiera hacerme vegana",
];

exports.matches = function(test) {
    shared.testMatches(test, matches, filter);
    test.done();
}

exports.falsePositives = function(test) {
    shared.testFalsePositives(test, falsePositives, filter);
    test.done();
}
