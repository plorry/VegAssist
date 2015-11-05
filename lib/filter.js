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

TweetFilter.isPhraseQuoted = function(phrase, startIndex, fullText) {
    var beforePhrase = fullText.substring(0, startIndex);
    var afterPhrase = fullText.substring(startIndex + phrase.length);
    var numQuotesBefore = (beforePhrase.match(/"/g) || []).length;
    var numQuotesAfter = (afterPhrase.match(/"/g) || []).length;
    // we can be fairly certain the phrase is quoted
    // if the quote number is odd on either side
    // as this implies either unbalanced quotes
    // or the phrase being quoted
    return numQuotesBefore % 2 !== 0 || numQuotesAfter % 2 !== 0;
}

// returns an object with the matching string at obj[0]
// and the starting index of the match at obj.index
// if no match is found, returns null
TweetFilter.getMatch = function(text, filter, lastIndex) {
    lastIndex = lastIndex || 0;
    if (typeof filter == "string") {
        var indexStart = text.toLowerCase().indexOf(filter, lastIndex);
        if (indexStart > -1) {
            return { [0]: text.substring(indexStart, indexStart + text.length), index: indexStart }
        }
    }
    else if (filter instanceof RegExp) {
        return filter.exec(text)
    }
    return null;
}

// returns an array of matches (see getMatch)
TweetFilter.getAllMatches = function(text, filter) {
    var matches = [];
    if (typeof filter == "string") {
        var nextIndex = 0;
        var match;
        while (match = TweetFilter.getMatch(text, filter, nextIndex)) {
            nextIndex = match.index + match[0].length + 1;
            matches.push(match);
        }
    }
    else if (filter instanceof RegExp) {
        var match
        if (filter.global) {
            while (match = TweetFilter.getMatch(text, filter)) {
                matches.push(match);
            }
        } else {
            if (match = TweetFilter.getMatch(text, filter)) {
                matches.push(match);
            }
        }
    }
    return matches;
}

// returns an array of matches that were matched by any filter in the filter list
TweetFilter.prototype.getMatchesForFilterList = function(text, filter_name) {
    var matches = [];
    this.filters[filter_name].forEach(function(filter) {
        matches = matches.concat(TweetFilter.getAllMatches(text, filter));
    });
    return matches;
}

// returns an associative array of filter_name => [matches] pairs
// filters without matches will not have a key defined
TweetFilter.prototype.getMatchesForAllFilters = function(text) {
    var allFilterMatches = {}
    for (var filter_name in this.filters) {
        var filterMatches = this.getMatchesForFilterList(text, filter_name);
        if (filterMatches.length > 0) {
            allFilterMatches[filter_name] = filterMatches;
        }
    }
    return allFilterMatches;
}

// static because it doesn't use any instance variables
TweetFilter.textMatchesFilter = function(text, filter) {
    return TweetFilter.getMatch(text, filter) !== null;
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

    if (isTweet && !this.tweetIsEligable(tweet_or_text))
        return false;

    var text = !isTweet ? tweet_or_text : tweet_or_text.text;
    var matches = this.getMatchesForAllFilters(text);

    for (var filter_name in matches) {
        var filterMatches = matches[filter_name];
        return filterMatches.some(function(match) {
            var isQuoted = TweetFilter.isPhraseQuoted(match[0], match.index, text);
            return !isQuoted;
        });
    }

    return false;
}

module.exports = TweetFilter;
