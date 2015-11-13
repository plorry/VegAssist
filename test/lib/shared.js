exports.testMatches = function(test, matches, filter) {
    matches.forEach(function(match) {
        test.ok(filter.matches(match), "'" + match + "' should match");    
    })
}

exports.testFalsePositives = function(test, falsePositives, filter) {
    falsePositives.forEach(function(falsePositive) {
        test.ok(!filter.matches(falsePositive), "'" + falsePositive + "' should not match");
    })
}
