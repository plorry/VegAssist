var util = require('../lib/util.js')

exports.regexSpaces = function(test) {
    // set the flags without global so that lastIndex does not get moved on each RegExp.test call
    var testRegex = util.regex("a b c", "i");
    test.ok(testRegex.test("a b c"), "Should match the exact string");
    test.ok(testRegex.test("a  b  \t c"), "Spaces should match any whitespace");
    test.ok(testRegex.test("a . b ... \t c"), "Spaces should match any combination of whitespace and periods");
    test.done();
}

exports.tracking = function(test) {
    util.untrackAll();
    test.deepEqual([], util.trackedTerms, "Should start with an empty array");
    util.track("test");
    test.deepEqual(["test"], util.trackedTerms, "track should add the phrase");
    util.untrack("test");
    test.deepEqual([], util.trackedTerms, "untrack should remove the phrase");
    util.track("test");
    util.track("test");
    test.deepEqual(["test"], util.trackedTerms, "Duplicates should be discarded");
    util.track("TEst");
    test.deepEqual(["test"], util.trackedTerms, "Duplicates should be case insensitive");
    util.track("other");
    test.deepEqual(["test", "other"], util.trackedTerms, "Should support multiple phrases");
    util.track("other", "another", "third");
    test.deepEqual(["test", "other", "another", "third"], util.trackedTerms, "track should support multiple parameters");
    util.untrack("other", "another", "third");
    test.deepEqual(["test"], util.trackedTerms, "untrack should support multiple parameters");
    util.untrackAll();
    test.deepEqual([], util.trackedTerms, "untrackAll should empty the array");
    test.done();
}
