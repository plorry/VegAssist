var TweetFilter = require('../lib/filter.js')
var filter = new TweetFilter('filters', ['excludeme'])

var matchesEng = [
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
    "i could definitely picture myself going vegan",
    "\"i like to quote\" but i want to go vegan and \"stuff\"",
];

var falsePositivesEng = [
    "I do not want to go vegan",
    "I should be a vegan", // this phrasing more than likely isn't about going vegan long-term (e.g. I should be a vegan for Halloween)
    "Don't tell me I should go vegan",
    "\"I want to go vegan\"",
    "\"stuff\" \"I want to go vegan\" \"stuff\"",
    "\"stuff\" \" I want to go vegan \" \"stuff\"",
    "\"unbalanced\"\" but i want to go vegan and \"quotes\"",
];

var matchesDut = [
    "something Dutch ik wil veganist worden something else",
    "\"Dutch slogan\" ik wil veganist zijn",
    "help me veganist te worden"
];

var matchesSpa = [
    "hi i am spanish and Quisiera Ser Vegana",
    "quisiera hacerme vegana they tell me",
    "i also think that quiero hacerme vegana is something else I say"
];

var matchesPor = [
    "hey look at this, como me torno vegan",
    "Gostava de ser vegan is what I gotta tell you",
    "Como me posso tornar vegan",
    "tell me gostaria de Me tornar vegan or what?"
];

var matchTest = function(matchList, test) {
    matchList.forEach(function(match) {
        test.ok(filter.matches(match), "'" + match + "' should match");    
    })
};

exports.matchesEng = function(test) {
    matchTest(matchesEng, test);
    test.done();
}

exports.falsePositivesEng = function(test) {
    falsePositivesEng.forEach(function(falsePositive) {
        test.ok(!filter.matches(falsePositive), "'" + falsePositive + "' should not match");
    })
    // matching phrases with the word 'vegetarian' subbed for 'vegan' should not match
    matchesEng.forEach(function(match) {
        var falsePositive = match.replace(/vegan/g, 'vegetarian');
        test.ok(!filter.matches(falsePositive), "'" + falsePositive + "' should not match");
    })
    test.done();
}

exports.matchesDut = function(test) {
    matchTest(matchesDut, test);
    test.done();  
}

exports.matchesSpa = function(test) {
    matchTest(matchesSpa, test);
    test.done();
}

exports.matchesPor = function(test) {
    matchTest(matchesPor, test);
    test.done();
}

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

exports.numMatches = function(test) {
    test.equal(TweetFilter.getAllMatches("testtesttest", "test").length, 3, "Plain string matching matches all instances of the pattern");
    test.equal(TweetFilter.getAllMatches("testtestTEST", "Test").length, 3, "Plain string matching is case sensitive");
    test.equal(TweetFilter.getAllMatches("testtestTEST", /test/i).length, 1, "Regex without the global flag only matches the first match");
    test.equal(TweetFilter.getAllMatches("testtestTEST", /test/gi).length, 3, "Regex with the global flag matches all instances of the pattern");
    test.done();
}
