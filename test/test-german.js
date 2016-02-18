var shared = require('./lib/shared');
var TweetFilter = require('../lib/filter')
var filter = new TweetFilter(TweetFilter.getFiltersFromFiles("filters/german"))

var matches = [
    "ich will mich vegan ernähren",
    "ich möchte mich vegan ernähren",
    "ich sollte mich vegan ernähren",
    "ich möchte vegan werden",
    "ich will vegan werden",
    "ich möchte vegan sein",
    "ich will vegan sein",
    "ich möchte vegan leben",
    "ich will vegan leben",
    "ich möchte vegan essen",
    "ich will vegan essen",
    "ich möchte endlich vegan werden",
    "ich will endlich vegan werden",
    "ich möchte endlich vegan sein",
    "ich will endlich vegan sein",
    "ich möchte endlich vegan leben",
    "ich will endlich vegan leben",
    "ich möchte endlich vegan essen",
    "ich will endlich vegan essen",
    "ich möchte auch vegan werden",
    "ich will auch vegan werden",
    "ich möchte auch vegan sein",
    "ich will auch vegan sein",
    "ich möchte auch vegan leben",
    "ich will auch vegan leben",
    "ich möchte auch vegan essen",
    "ich will auch vegan essen",
    "ich möchte gerne vegan werden",
    "ich will gerne vegan werden",
    "ich möchte gerne vegan sein",
    "ich will gerne vegan sein",
    "ich möchte gerne vegan leben",
    "ich will gerne vegan leben",
    "ich möchte gerne vegan essen",
    "ich will gerne vegan essen",
    "ich möchte bald vegan werden",
    "ich will bald vegan werden",
    "ich möchte bald vegan sein",
    "ich will bald vegan sein",
    "ich möchte bald vegan leben",
    "ich will bald vegan leben",
    "ich möchte bald vegan essen",
    "ich will bald vegan essen",
    "ich will wieder vegan sein",
    "ich will wieder vegan werden",
    "ich will wieder vegan leben",
    "ich will wieder vegan essen",
    "ich möchte wieder vegan sein",
    "ich möchte wieder vegan werden",
    "ich möchte wieder vegan leben",
    "ich möchte wieder vegan essen",
    "ich überlege vegan zu werden",
    "ich überlege auch vegan zu werden",
    "ich möchte bald vegan werden",
    "ich wäre gerne vegan",
    "ich wäre liebend gerne vegan",
    "ich würde gerne vegan werden",
    "ich würde ja gerne vegan werden",
    "ich hab voll bock vegan zu werden",
    "ich versuche auch vegan zu werden",
    "ich versuche jetzt auch vegan zu werden",
    "ich versuche gerade vegan zu werden",
    "ich versuche auch gerade vegan zu werden",
    "ich würde mich gerne vegan ernähren",
    "ich würde mich eigentlich gerne vegan ernähren"
];

var falsePositives = [
];

exports.matches = function(test) {
    shared.testMatches(test, matches, filter);
    test.done();
}

exports.falsePositives = function(test) {
    shared.testFalsePositives(test, falsePositives, filter);
    // matching phrases with the word 'vegetarian' subbed for 'vegan' should not match
    matches.forEach(function(match) {
        var falsePositive = match.replace(/vegan/g, 'vegetarian');
        test.ok(!filter.matches(falsePositive), "'" + falsePositive + "' should not match");
    })
    test.done();
}
