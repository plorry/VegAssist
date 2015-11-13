const util = exports

util.regex = function(regexStr, flags) {
    flags = flags || 'gi';

    // replace all spaces with a pattern that matches any combination of whitespace and/or periods
    regexStr = regexStr.replace(/ /g, '([\\s.]+)');

    return new RegExp(regexStr, flags);
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