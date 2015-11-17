var TweetFilter = require('../lib/filter.js')
var filter = new TweetFilter({test: ['test']}, ['excludeme'])

exports.retweetedByMe = function(test) {
    var retweetedTweet = {retweeted: true, text: "test", user: {description: "", name: "", screen_name: ""}};
    test.ok(!filter.matches(retweetedTweet), "Filter should not match tweets that have been retweeted by the authed user");
    retweetedTweet.retweeted = false;
    test.ok(filter.matches(retweetedTweet), "Filter should match tweets that haven't been retweeted by the authed user");
    test.done();
}

exports.retweet = function(test) {
    var retweetTweet = {retweeted: false, retweeted_status: {}, text: "test", user: {description: "", name: "", screen_name: ""}};
    test.ok(!filter.matches(retweetTweet), "Filter should not match tweets that are retweets");
    delete retweetTweet.retweeted_status;
    test.ok(filter.matches(retweetTweet), "Filter should match tweets that aren't retweets");
    test.done();
}

exports.reply = function(test) {
    var replyTweet = {retweeted: false, text: "@someone test", user: {description: "", name: "", screen_name: ""}};
    test.ok(!filter.matches(replyTweet), "Filter should not match @reply tweets");
    replyTweet.text = "test";
    test.ok(filter.matches(replyTweet), "Filter should match tweets that aren't @replies");
    test.done();
}

exports.excludedTerms = function(test) {
    var unexcludedTweet = {retweeted: false, text: "test", user: {description: "", name: "", screen_name: ""}};
    test.ok(filter.matches(unexcludedTweet), "Filter should match tweets that don't have any excluded terms in their bio/name/username");

    var excludedBioTweet = {retweeted: false, text: "test", user: {description: "Something and excludeme", name: "", screen_name: ""}};
    var excludedNameTweet = {retweeted: false, text: "test", user: {description: "", name: "EXCLUDEME", screen_name: ""}};
    var excludedScreenNameTweet = {retweeted: false, text: "test", user: {description: "", name: "", screen_name: "excludeme"}};

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

exports.exclusionFilters = function(test) {
	var excludeBefore = ["match", /no $/i];
	test.equal(TweetFilter.getAllMatches("no before match after", excludeBefore).length, 1)
	test.equal(TweetFilter.getAllMatches("before no match after", excludeBefore).length, 0)

	var excludeBeforeOrAfter = ["match", /no $/i, /^ nope/i];
	test.equal(TweetFilter.getAllMatches("no before match after nope", excludeBeforeOrAfter).length, 1)
	test.equal(TweetFilter.getAllMatches("before no match after", excludeBeforeOrAfter).length, 0)
	test.equal(TweetFilter.getAllMatches("before match nope after", excludeBeforeOrAfter).length, 0)

	var excludeAfter = ["match", null, /^ nope/i];
	test.equal(TweetFilter.getAllMatches("no before match after nope", excludeAfter).length, 1)
	test.equal(TweetFilter.getAllMatches("before no match after", excludeAfter).length, 1)
	test.equal(TweetFilter.getAllMatches("before match nope after", excludeAfter).length, 0)

	var excludeFunction = ["match", function(phrase, beforePhrase, afterPhrase, startIndex, fullText) {
		var shouldBeExcluded = beforePhrase.length !== 0 || afterPhrase.length !== 5;
		return shouldBeExcluded;
	}]
	test.equal(TweetFilter.getAllMatches("match five", excludeFunction).length, 1)
	test.equal(TweetFilter.getAllMatches("match after", excludeFunction).length, 0)
	test.equal(TweetFilter.getAllMatches("before match five", excludeFunction).length, 0)

	test.done();
}
