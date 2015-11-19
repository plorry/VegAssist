var shared = require('./lib/shared');
var TweetFilter = require('../lib/filter')
var filter = new TweetFilter(TweetFilter.getFiltersFromFiles("filters/portuguese"))

var matches = [
    "hey look at this, como me torno vegan",
    "Gostava de ser vegan is what I gotta tell you",
    "Como me posso tornar vegan",
    "tell me gostaria de Me tornar vegan or what?",
];

var falsePositives = [
	"nao quero ser vegan",
	"não quero ser vegan",
	"no quero ser vegan",
	"nao gostaria de tornar-me vegan", // I would not want to become vegan
	"de jeito nenhum gostaria de tornar-me vegan", // no way I would become vegan
];

exports.matches = function(test) {
    shared.testMatches(test, matches, filter);
    test.done();
}

exports.falsePositives = function(test) {
    shared.testFalsePositives(test, falsePositives, filter);
    test.done();
}
