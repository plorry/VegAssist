var Twit = require('twit');
var settings = require('./settings.js');

// Declare your own Twitter app credentials here, if duplicating
var T = new Twit(settings.CREDS);

var phrases = [
	'help me go vegan',
	'help me become vegan',
	'help me be vegan',
	'i want to go vegan',
	'i want to become vegan',
	'i want to be vegan',
	'i wanna go vegan',
	'i wanna be vegan'
];

var inspectTweet = function(tweet) {
	if (tweet.text[0] == '@'){
		// This is an @ mention, don't retweet
		return false;
	}

	var text = tweet.text.toLowerCase();
	phrases.forEach(function(phrase) {
		// Iterate over our phrases to look for an exact match
		if (text.indexOf(phrase) > -1) {
			// positive match; let's retweet!
			T.post('statuses/retweet/:id', {id: tweet.id_str}, function(err, data, response) {
				if (err) {
					console.log(err);
					return false;
				}
				console.log('Retweeted: ' + tweet.id_str);	
			});
		}
	});
};

var stream = T.stream('statuses/filter', { track: 'vegan' });

stream.on('tweet', function(tweet) {
	// Whenever the Twitter stream notifies us of a new Tweet with the term 'vegan', we handle it!
	console.log(tweet);
	inspectTweet(tweet);
});

