var fs = require('fs');
var path = require('path');

var TweetFilter = function(filters_or_dirpath, excluded_terms, filters) {
    if (typeof filters_or_dirpath === "string") {
        this.filters = TweetFilter.getFiltersFromDirectory(filters_or_dirpath, filters);
    } else {
        this.filters = filters_or_dirpath;
    }
    this.excluded_terms = excluded_terms || [];
}

// load all files from a directory and use their exports as filters
// the files should export arrays of strings/regex expressions
TweetFilter.getFiltersFromDirectory = function(dir, filters) {
    dir = path.resolve(dir);
    var filter_files = fs.readdirSync(dir);
    var joined_files = [];

    if( filters.length == 0 ) {
        // add all filters from directory
        filter_files.forEach(function(file) {
            joined_files.push(path.join(dir, file));
        });
    }
    else {
        // add filters from settings that exist in directory
        filters.forEach(function(filter) {
            var filterFound = false;

            // look for individual filter in directory
            filter_files.forEach(function(file) {
                if( filter+'.js' ==  file) {
                    joined_files.push(path.join(dir, file));
                    filterFound = true;
                }
            });

            // show warning if filter cannot be found in the directory
            if( !filterFound )
                console.warn("Unable to find filter: " + filter);
        });
    }
    return TweetFilter.getFiltersFromFiles.apply(this, joined_files);
}

// load the file(s) and use its/their exports as filters
// the file should export arrays of strings/regex expressions
TweetFilter.getFiltersFromFiles = function() {
    var filters = {};
    for (var i = 0; i < arguments.length; i++) {
        var filter_file = path.resolve(arguments[i]);
        var filter_name = path.basename(filter_file, path.extname(filter_file));
        filters[filter_name] = require(filter_file);
    }
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
        var indexStart = text.toLowerCase().indexOf(filter.toLowerCase(), lastIndex);
        if (indexStart > -1) {
            return { 0: text.substring(indexStart, indexStart + filter.length), index: indexStart }
        }
    }
    else if (filter instanceof RegExp) {
        return filter.exec(text)
    }
    return null;
}

// returns an array of matches (see getMatch)
// adds a 'filter' property to each match containing
// the string/regex filter
TweetFilter.getAllMatches = function(text, filter) {
    var matches = [];
    if (typeof filter == "string") {
        var nextIndex = 0;
        var match;
        while (match = TweetFilter.getMatch(text, filter, nextIndex)) {
            nextIndex = match.index + match[0].length;
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
    else if (Array.isArray(filter)) {
        var matchingFilter = filter[0];
        matches = TweetFilter.getAllMatches(text, matchingFilter);
        if (filter[1] instanceof RegExp || filter[2] instanceof RegExp) {
            var beforeExclusionFilter = filter[1] || null;
            var afterExclusionFilter = filter[2] || null;
            matches = matches.filter(function(match) {
                var phrase = match[0];
                var beforePhrase = text.substring(0, match.index);
                var afterPhrase = text.substring(match.index + phrase.length);
                var isExcluded = (beforeExclusionFilter && beforeExclusionFilter.test(beforePhrase)) || (afterExclusionFilter && afterExclusionFilter.test(afterPhrase));
                return !isExcluded;
            })
        } else if (typeof filter[1] === "function") {
            var isExcludedFunction = filter[1];
            matches = matches.filter(function(match) {
                var phrase = match[0];
                var beforePhrase = text.substring(0, match.index);
                var afterPhrase = text.substring(match.index + phrase.length);
                return !isExcludedFunction(phrase, beforePhrase, afterPhrase, match.index, text);
            })
        }
    }
    return matches.map(function(match) {
        match.filter = filter;
        return match;
    });
}

// returns an array of matches that were matched by any filter in the filter list
// adds a 'filterList' property to each match containing the filter list used
TweetFilter.prototype.getMatchesForFilterList = function(text, filter_name) {
    var matches = [];
    this.filters[filter_name].forEach(function(filter) {
        matches = matches.concat(TweetFilter.getAllMatches(text, filter));
    });
    return matches.map(function(match) {
        match.filterList = filter_name;
        return match;
    });
}

// returns an array of matches that were matched by any filter
TweetFilter.prototype.getMatchesForAllFilters = function(text) {
    var allFilterMatches = []
    for (var filter_name in this.filters) {
        var filterMatches = this.getMatchesForFilterList(text, filter_name);
        allFilterMatches = allFilterMatches.concat(filterMatches);
    }
    return allFilterMatches;
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

// returns an array containing all matches found or false if none were found
TweetFilter.prototype.matches = function(tweet_or_text) {
    var isTweet = typeof tweet_or_text !== 'string'

    if (isTweet && !this.tweetIsEligable(tweet_or_text))
        return false;

    var text = !isTweet ? tweet_or_text : tweet_or_text.text;
    var matches = this.getMatchesForAllFilters(text).filter(function(match) {
        var isQuoted = TweetFilter.isPhraseQuoted(match[0], match.index, text);
        return !isQuoted;
    });

    return matches.length > 0 ? matches : false;
}

module.exports = TweetFilter;
