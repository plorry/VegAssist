var fs = require('fs');
var path = require('path');

var TweetFilter = function(filter_dir, excluded_terms) {
    this.filters = this.loadFilters(filter_dir);
    this.excluded_terms = excluded_terms || [];
}

// load all files from a directory and use their exports as filters
// the files should export arrays of strings/regex expressions
TweetFilter.prototype.loadFilters = function(dir) {
    dir = path.resolve(dir);
    var filters = {};
    var filter_files = fs.readdirSync(dir);
    filter_files.forEach(function(filter_file) {
        var filter_name = path.basename(filter_file, path.extname(filter_file));
        var filter = require(path.join(dir, filter_file));
        filters[filter_name] = filter;
    });
    return filters;
}

// static because it doesn't use any instance variables
TweetFilter.textMatchesFilter = function(text, filter) {
    if (typeof filter === "string") {
        return text.toLowerCase().indexOf(filter) > -1
    }
    else if (filter instanceof RegExp) {
        return filter.test(text)
    }
    return false;
}

TweetFilter.prototype.textMatchesFilterList = function(text, filter_name) {
    return this.filters[filter_name].some(function(filter) {
        return TweetFilter.textMatchesFilter(text, filter);
    });
}

TweetFilter.prototype.textMatchesAnyFilters = function(text) {
    for (var filter_name in this.filters) {
        if (this.textMatchesFilterList(text, filter_name)) {
            return true;
        }
    }
    return false;
}

TweetFilter.prototype.tweetIsARetweet = function(tweet) {
    return tweet.hasOwnProperty('retweeted_status');
}

TweetFilter.prototype.tweetWasRetweetedByMe = function(tweet) {
    return tweet.retweeted === true;
}

TweetFilter.prototype.tweetContainsExcludedTerms = function(tweet) {
    return (this.excluded_terms.some( function(term) {
        var bio = tweet.user.description ? tweet.user.description.toLowerCase() : '';
        return (tweet.user.name.toLowerCase().indexOf(term) > -1 || tweet.user.screen_name.toLowerCase().indexOf(term) > -1 || bio.indexOf(term) > -1);
    }));
}

TweetFilter.prototype.tweetIsPrivateConvo = function(tweet) {
    return tweet.text[0] === '@';
}

TweetFilter.prototype.tweetIsEligable = function(tweet) {
    return !this.tweetWasRetweetedByMe(tweet) && !this.tweetIsARetweet(tweet) && !this.tweetContainsExcludedTerms(tweet) && !this.tweetIsPrivateConvo(tweet);
}

TweetFilter.prototype.matches = function(tweet_or_text) {
    var isTweet = typeof tweet_or_text !== 'string'
    var text = !isTweet ? tweet_or_text : tweet_or_text.text;

    return this.textMatchesAnyFilters(text) && (!isTweet || this.tweetIsEligable(tweet_or_text));
}

module.exports = TweetFilter;
