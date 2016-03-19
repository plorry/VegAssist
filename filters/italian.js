var util = require("../lib/util");
var regex = util.regex;
var track = util.track;
var excludeBefore = util.excludeBefore;

track("vegan", "vegano", "vegana");

var negations = ["non"]

module.exports = [
  excludeBefore(regex( "(voglio|vorrei|dovrei|penso .*|pensando .*) (diventare|essere) ?(un|una)? vegan(a|o)?" ), negations),
];