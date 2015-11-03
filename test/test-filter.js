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
    "I really wanna be vegan",
    "I should go vegan",
    "I probably should go vegan",
    "I need help going vegan",
    "I want help going vegan",
    "I really need help staying vegan",
    "I think that i want to go vegan",
    "I think i should go vegan",
    "i will need help going vegan",
    "i do need help going vegan",
    "i definitely want to go vegan",
    "i definately want to go vegan",
    "i honestly would like to go vegan",
    "i truly want to try going vegan",
    "i wanna try becoming a vegan",
    "i'm thinking about going vegan",
    "i'm thinking of going vegan",
    "im thinking about becoming vegan",
    "i am considering being a vegan",
    "i'm mulling over becoming vegan",
    "i want to go #vegan",
    "i. want. to. go. vegan.",
    "i.. want  to go ... vegan",
    "i wish i was vegan",
    "i wish i were vegan",
    "i can see myself becoming a vegan someday",
    "i could definitely picture myself going vegan"
];

var falsePositives = [
    "I do not want to go vegan",
    "I should be a vegan", // this phrasing more than likely isn't about going vegan long-term (e.g. I should be a vegan for Halloween)
    "Don't tell me I should go vegan",
];

exports.matches = function(test) {
    matches.forEach(function(match) {
        test.ok(filter.matches(match), "'" + match + "' should match");
    })
    test.done();
};

exports.falsePositives = function(test) {
    falsePositives.forEach(function(falsePositive) {
        test.ok(!filter.matches(falsePositive), "'" + falsePositive + "' should not match");
    })
    // matching phrases with the word 'vegetarian' subbed for 'vegan' should not match
    matches.forEach(function(match) {
        var falsePositive = match.replace(/vegan/g, 'vegetarian');
        test.ok(!filter.matches(falsePositive), "'" + falsePositive + "' should not match");
    })
    test.done();
};

exports.retweetedByMe = function(test) {
    var retweetedTweet = {retweeted: true, text: "I want to go vegan", user: {description: "", name: "", screen_name: ""}};
    test.ok(!filter.matches(retweetedTweet), "Filter should not match tweets that have been retweeted by the authed user");
    retweetedTweet.retweeted = false;
    test.ok(filter.matches(retweetedTweet), "Filter should match tweets that haven't been retweeted by the authed user");
    test.done();
}

exports.retweet = function(test) {
    var retweetTweet = {retweeted: false, retweeted_status: {}, text: "I want to go vegan", user: {description: "", name: "", screen_name: ""}};
    test.ok(!filter.matches(retweetTweet), "Filter should not match tweets that are retweets");
    delete retweetTweet.retweeted_status;
    test.ok(filter.matches(retweetTweet), "Filter should match tweets that aren't retweets");
    test.done();
}

exports.reply = function(test) {
    var replyTweet = {retweeted: false, text: "@someone I want to go vegan", user: {description: "", name: "", screen_name: ""}};
    test.ok(!filter.matches(replyTweet), "Filter should not match @reply tweets");
    replyTweet.text = "I want to go vegan";
    test.ok(filter.matches(replyTweet), "Filter should match tweets that aren't @replies");
    test.done();
}

exports.excludedTerms = function(test) {
    var unexcludedTweet = {retweeted: false, text: "I want to go vegan", user: {description: "", name: "", screen_name: ""}};
    test.ok(filter.matches(unexcludedTweet), "Filter should match tweets that don't have any excluded terms in their bio/name/username");

    var excludedBioTweet = {retweeted: false, text: "I want to go vegan", user: {description: "Something and excludeme", name: "", screen_name: ""}};
    var excludedNameTweet = {retweeted: false, text: "I want to go vegan", user: {description: "", name: "EXCLUDEME", screen_name: ""}};
    var excludedScreenNameTweet = {retweeted: false, text: "I want to go vegan", user: {description: "", name: "", screen_name: "excludeme"}};

    test.ok(!filter.matches(excludedBioTweet), "Filter should not match tweets from users with excluded terms in their bio");
    test.ok(!filter.matches(excludedNameTweet), "Filter should not match tweets from users with excluded terms in their name");
    test.ok(!filter.matches(excludedScreenNameTweet), "Filter should not match tweets from users with excluded terms in their screen name");
    test.done();
}
