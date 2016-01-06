var shared = require('./lib/shared');
var TweetFilter = require('../lib/filter')
var filter = new TweetFilter(TweetFilter.getFiltersFromFiles("filters/portuguese"))

var matches = [
    'me ajude a aderir ao vegan',
    'ajude-me a aderir ao vegan',
    'quero aderir ao vegan',
    'gostaria de me aderir ao vegan',

    'me ajude a aderir ao veganismo',
    'me ajude-me a aderir ao veganismo',
    'quero aderir ao veganismo',
    'gostaria de me aderir ao veganismo',

    'me ajude a adotar o veganismo',
    'me ajude-me a adotar o veganismo',
    'quero adotar o veganismo',
    'gostaria de adotar o veganismo',

    'me ajude a me tornar vegan',
    'me ajude a me tornar vegano',
    'me ajude a me tornar vegana',
    'me ajude a tornar vegan',
    'me ajude a tornar vegana',
    'me ajude a tornar vegano',

    'ajude-me a me tornar vegan',
    'ajude-me a tornar vegano',
    'ajude-me a tornar vegana',
    'ajude-me a tornar vegan',
    'ajude-me a tornar vegana',
    'ajude-me a tornar vegano',

    'me ajuda a me tornar vegan',
    'me ajuda a me tornar vegano',
    'me ajuda a me tornar vegana',
    'me ajuda a tornar vegan',
    'me ajuda a tornar vegana',
    'me ajuda a tornar vegano',

    'quero ajuda para tornar vegan',
    'quero ajuda para tornar vegano',
    'quero ajuda para tornar vegana',
    'quero ajuda para me tornar vegan',
    'quero ajuda para me tornar vegano',
    'quero ajuda para me tornar vegana',

    'preciso de ajuda para tornar vegan',
    'preciso de ajuda para tornar vegano',
    'preciso de ajuda para tornar vegana',
    'preciso de ajuda para me tornar vegan',
    'preciso de ajuda para me tornar vegano',
    'preciso de ajuda para me tornar vegana',

    'quero ajuda a tornar vegan',
    'quero ajuda a tornar vegana',
    'quero ajuda a tornar vegano',
    'quero ajuda para ser vegan',
    'quero ajuda para ser vegana',
    'quero ajuda para ser vegano',

    'estou pensando em aderir ao veganismo',
    'estou pensando em me tornar vegan',
    'estou pensando em me tornar vegano',
    'estou pensando em me tornar vegana',

    'estou considerando em aderir ao veganismo',
    'estou considerando em me tornar vegan',
    'estou considerando em me tornar vegano',
    'estou considerando em me tornar vegana',

    'quero ser vegan',
    'quero ser vegano',
    'quero ser vegana',
    'gostaria de ser vegan',
    'gostaria de ser vegano',
    'gostaria de ser vegana',

    'definitivamente quero ser vegan',
    'definitivamente quero ser vegano',
    'definitivamente quero ser vegana',
    'definitivamente gostaria de ser vegan',
    'definitivamente gostaria de ser vegano',
    'definitivamente gostaria de ser vegana',
    'realmente quero ser vegan',
    'realmente quero ser vegano',
    'realmente quero ser vegana',
    'realmente gostaria de ser vegan',
    'realmente gostaria de ser vegano',

    'quero um conselho para adotar veganismo',
    'preciso de conselho para me tornar vegano',
];

var falsePositives = [
	"nao quero ser vegan",
    "nao quero ser vegana",
    "nao quero ser vegano",

	"não quero ser vegan",
    "não quero ser vegana",
    "não quero ser vegano",

    "nem quero ser vegan",
    "nem quero ser vegana",
    "nem quero ser vegano",

    "nao gostaria de ser vegan",
    "nao gostaria de ser vegana",
    "nao gostaria de ser vegano",

    "não gostaria de ser vegan",
    "não gostaria de ser vegana",
    "não gostaria de ser vegano",

    "nem gostaria de ser vegan",
    "nem gostaria de ser vegana",
    "nem gostaria de ser vegano",

	"nao gostaria de tornar-me vegan", // I would not want to become vegan
    "nao gostaria de tornar-me vegana", // I would not want to become vegan
    "nao gostaria de tornar-me vegano", // I would not want to become vegan

    "não gostaria de tornar-me vegan", // I would not want to become vegan
    "não gostaria de tornar-me vegana", // I would not want to become vegan
    "não gostaria de tornar-me vegano", // I would not want to become vegan

    "nem gostaria de tornar-me vegan", // I would not want to become vegan
    "nem gostaria de tornar-me vegana", // I would not want to become vegan
    "nem gostaria de tornar-me vegano", // I would not want to become vegan

	"de jeito nenhum gostaria de tornar-me vegan", // no way I would become vegan
    "de jeito nenhum gostaria de tornar-me vegana", // no way I would become vegan
    "de jeito nenhum gostaria de tornar-me vegano", // no way I would become vegan

    "de jeito nenhum gostaria de me tornar vegan", // no way I would become vegan
    "de jeito nenhum gostaria de me tornar vegana", // no way I would become vegan
    "de jeito nenhum gostaria de me tornar vegano", // no way I would become vegan

    "nunca serei vegan",
    "nunca serei vegana",
    "nunca serei vegano",

    "odeio veganismo", //hate veganism
];

exports.matches = function(test) {
    shared.testMatches(test, matches, filter);
    test.done();
}

exports.falsePositives = function(test) {
    shared.testFalsePositives(test, falsePositives, filter);
    test.done();
}
