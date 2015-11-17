const util = exports

util.regex = function(regexStr, flags) {
    flags = flags || 'gi';

    // replace all spaces with a pattern that matches any combination of whitespace and/or periods
    regexStr = regexStr.replace(/ /g, '([\\s.]+)');

    return new RegExp(regexStr, flags);
}

// helper function to create a filter that does a basic exclusion 
// based a set of phrases before/after the matching phrase
util.excludeBeforeOrAfter = function(filter, before, after) {
    if (Array.isArray(before)) { before = before.join("|"); }
    if (Array.isArray(after)) { after = after.join("|"); }
    var beforeRegex = before ? new RegExp("(" + before + ") *$", "i") : null;
    var afterRegex = after ? new RegExp("^ *(" + after + ")", "i") : null;
    return [filter, beforeRegex, afterRegex];
}

util.excludeBefore = function(filter, exclusions) {
    return util.excludeBeforeOrAfter(filter, exclusions, null);
}

util.excludeAfter = function(filter, exclusions) {
    return util.excludeBeforeOrAfter(filter, null, exclusions);
}

util.trackedTerms = [];
var trackedTerms = util.trackedTerms;

var isInArray = function(array, element) {
    return array.indexOf(element) > -1;
}

util.track = function() {
    for (var i = 0; i < arguments.length; i++) {
        var phrase = arguments[i].toLowerCase();
        if (!isInArray(trackedTerms, phrase)) {
            trackedTerms.push(phrase);
        }
    }
}

util.untrack = function() {
    for (var i = 0; i < arguments.length; i++) {
        var phrase = arguments[i].toLowerCase();
        var index = trackedTerms.indexOf(phrase);
        if (index > -1) {
            trackedTerms.splice(index);
        }
    }
}

util.untrackAll = function() {
    trackedTerms.length = 0;
}