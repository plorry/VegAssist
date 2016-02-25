var util = require("../lib/util");
var regex = util.regex;
var track = util.track;

track("végétalien", "végétalienne", "vegan", "végane");

module.exports = [
    regex( "je deviens (végétalien|végétalienne|vegan|végane)" ),
    regex( "je vais (devenir|être) (végétalien|végétalienne|vegan|végane)" ),
    regex( "je veux( bien)? (devenir|être) (végétalien|végétalienne|vegan|végane)" ),
    regex( "je veux (devenir|être)( totalement)? (végétalien|végétalienne|vegan|végane)" ),
    regex( "je suis( vraiment)? motivé à (devenir|être) (végétalien|végétalienne|vegan|végane)" ),
    regex( "j'aimerais (devenir|être) (végétalien|végétalienne|vegan|végane)" ),
    regex( "j'hésite( de plus en plus)? à devenir (végétalien|végétalienne|vegan|végane)" ),
    regex( "je crois que je vais (devenir|être) (végétalien|végétalienne|vegan|végane)" )
]
