var util = require("../lib/util");
var track = util.track;

track("vegan");

module.exports = [
    /quero (tornar\-me|ser) vegan/gi,
    /como (me torno|me posso tornar|posso tornar\-me) vegan/gi,
    /gosta(va|ria) de (ser|me tornar|tornar\-me) vegan/gi,
];
