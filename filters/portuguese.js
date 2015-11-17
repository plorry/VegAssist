var util = require("../lib/util");
var track = util.track;
var excludeBefore = util.excludeBefore;

track("vegan");

var negations = ["não", "nao", "no", "not", "non", "nay", "nope", "nenhum(a)?"]

module.exports = [
    excludeBefore(/quero (tornar\-me|ser) vegan/gi, negations),
    /como (me torno|me posso tornar|posso tornar\-me) vegan/gi,
    excludeBefore(/gosta(va|ria) de (ser|me tornar|tornar\-me) vegan/gi, negations),
];
