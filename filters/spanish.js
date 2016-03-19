var util = require("../lib/util");
var track = util.track;
var regex = util.regex;
var excludeBefore = util.excludeBefore;

track("vegano", "vegana");

var negations = ["no"]

module.exports = [
  excludeBefore(regex( "(quisiera|quiero|debería|debe|pensando .*) (ser|hacerme|hacerse|convertirse en) ?(un|una)? vegan(a|o|os)" ), negations),
  // "Ya no quiero comer animales"
];
