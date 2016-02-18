var util = require("../lib/util");
var regex = util.regex;
var track = util.track;

track("vegan");

module.exports = [
    regex ( "ich (will|möchte|sollte) mich vegan ernähren" ),
    regex ( "ich (will|möchte)( endlich| auch| gerne| bald)? vegan (werden|sein|leben|essen)" ),
    regex ( "ich (will|möchte) wieder vegan (sein|werden|leben|essen)" ),
    regex ( "ich überlege( auch)? vegan zu werden" ),
    regex ( "ich wäre( liebend)? gerne vegan" ),
    regex ( "ich würde( ja)? gerne vegan (werden|sein|leben|essen)" ),
    regex ( "ich hab voll bock vegan zu werden" ),
    regex ( "ich versuche( jetzt)? auch vegan zu werden" ),
    regex ( "ich versuche( auch)? gerade vegan zu werden" ),
    regex ( "ich würde mich( eigentlich)? gerne vegan ernähren" )
]
