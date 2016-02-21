var shared = require('./lib/shared');
var TweetFilter = require('../lib/filter')
var filter = new TweetFilter(TweetFilter.getFiltersFromFiles("filters/english"))

var matches = [
    'help me go vegan',
    'help me become vegan',
    'help me be vegan',
    'i want to go vegan',
    'i want to become vegan',
    'i want to be vegan',
    'i wanna go vegan',
    'i wanna be vegan',
    "I would like to go vegan",
    "I want to be a vegan",
    "I wanna become vegan",
    "I wanna be a vegan",
    "I really wanna be vegan",
    "I should go vegan",
    "I probably should go vegan",
    "I need help going vegan",
    "I want help going vegan",
    "I really need help staying vegan",
    "I think that i want to go vegan",
    "I think i should go vegan",
    "i will need help going vegan",
    "i do need help going vegan",
    "i definitely want to go vegan",
    "i definately want to go vegan",
    "i honestly would like to go vegan",
    "i truly want to try going vegan",
    "i wanna try becoming a vegan",
    "i'm thinking about going vegan",
    "i'm thinking of going vegan",
    "im thinking about becoming vegan",
    "i am considering being a vegan",
    "i'm mulling over becoming vegan",
    "i want to go #vegan",
    "i. want. to. go. vegan.",
    "i.. want  to go ... vegan",
    "i wish i was vegan",
    "i wish i were vegan",
    "i can see myself becoming a vegan someday",
    "i could definitely picture myself going vegan",
    "\"i like to quote\" but i want to go vegan and \"stuff\"",
    "i'm planning on going vegan",
    "i'm totally thinking about becoming a vegan",
];

var falsePositives = [
    "I do not want to go vegan",
    "I should be a vegan", // this phrasing more than likely isn't about going vegan long-term (e.g. I should be a vegan for Halloween)
    "Don't tell me I should go vegan",
    "\"I want to go vegan\"",
    "\"stuff\" \"I want to go vegan\" \"stuff\"",
    "\"stuff\" \" I want to go vegan \" \"stuff\"",
    "\"unbalanced\"\" but i want to go vegan and \"quotes\"",
];

exports.matches = function(test) {
    shared.testMatches(test, matches, filter);
    test.done();
}

exports.falsePositives = function(test) {
    shared.testFalsePositives(test, falsePositives, filter);
    // matching phrases with the word 'vegetarian' subbed for 'vegan' should not match
    matches.forEach(function(match) {
        var falsePositive = match.replace(/vegan/g, 'vegetarian');
        test.ok(!filter.matches(falsePositive), "'" + falsePositive + "' should not match");
    })
    test.done();
}
