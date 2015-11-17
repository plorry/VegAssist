var util = require("../lib/util");
var track = util.track;
var excludeBefore = util.excludeBefore;

track("vegana");

var negations = ["no", "not", "nay"]

module.exports = [
  excludeBefore("quisiera ser vegana", negations),
  excludeBefore("quiero ser vegana", negations),
  excludeBefore("quisiera hacerme vegana", negations),
  excludeBefore("quiero hacerme vegana", negations),
  // "Ya no quiero comer animales"
];
