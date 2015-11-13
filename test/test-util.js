var util = require('../lib/util.js')

exports.regexSpaces = function(test) {
    // set the flags without global so that lastIndex does not get moved on each RegExp.test call
    var testRegex = util.regex("a b c", "i");
    test.ok(testRegex.test("a b c"), "Should match the exact string");
    test.ok(testRegex.test("a  b  \t c"), "Spaces should match any whitespace");
    test.ok(testRegex.test("a . b ... \t c"), "Spaces should match any combination of whitespace and periods");
    test.done();
}