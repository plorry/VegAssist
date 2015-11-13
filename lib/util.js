const util = exports

util.regex = function(regexStr, flags) {
    flags = flags || 'gi';

    // replace all spaces with a pattern that matches any combination of whitespace and/or periods
    regexStr = regexStr.replace(/ /g, '([\\s.]+)');

    return new RegExp(regexStr, flags);
}