var TweetFilter = require('../lib/filter.js')
var filter = new TweetFilter('filters', ['excludeme'])

var matches = [
    'help me go vegan',
    'help me become vegan',
    'help me be vegan',
    'i want to go vegan',
    'i want to become vegan',
    'i want to be vegan',
    'i wanna go vegan',
    'i wanna be vegan',
    "I would like to go vegan",
    "I want to be a vegan",
    "I wanna become vegan",
    "I wanna be a vegan",
];

var falsePositives = [
    "I do not want to go vegan",
];

exports.testMatches = function(test) {
    matches.forEach(function(match) {
        test.ok(filter.matches(match), "'" + match + "' should match");
    })
    test.done();
};

exports.falsePositives = function(test) {
    falsePositives.forEach(function(falsePositive) {
        test.ok(!filter.matches(falsePositive), "'" + falsePositive + "' should not match");
    })
    test.done();
};

exports.testRetweeted = function(test) {
    var retweetedTweet = {retweeted: true, text: "", user: {description: "", name: "", screen_name: ""}};
    test.ok(!filter.matches(retweetedTweet), "Filter should not match retweeted tweets");
    test.done();
}

exports.testReply = function(test) {
    var replyTweet = {retweeted: false, text: "@someone I want to go vegan", user: {description: "", name: "", screen_name: ""}};
    test.ok(!filter.matches(replyTweet), "Filter should not match @reply tweets");
    test.done();
}

exports.testExcludedTerms = function(test) {
    var excludedBioTweet = {retweeted: false, text: "I want to go vegan", user: {description: "Something and excludeme", name: "", screen_name: ""}};
    var excludedNameTweet = {retweeted: false, text: "I want to go vegan", user: {description: "", name: "EXCLUDEME", screen_name: ""}};
    var excludedScreenNameTweet = {retweeted: false, text: "I want to go vegan", user: {description: "", name: "", screen_name: "excludeme"}};

    test.ok(!filter.matches(excludedBioTweet), "Filter should not match tweets from users with excluded terms in their bio");
    test.ok(!filter.matches(excludedNameTweet), "Filter should not match tweets from users with excluded terms in their name");
    test.ok(!filter.matches(excludedScreenNameTweet), "Filter should not match tweets from users with excluded terms in their screen name");
    test.done();
}