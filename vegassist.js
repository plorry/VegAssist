var Twit = require('twit');
var settings = require('./settings.js');
var TweetFilter = require('./lib/filter');

// Declare your own Twitter app credentials here, if duplicating
var T = new Twit(settings.CREDS);
// Whenever the Twitter stream notifies us of a new Tweet with the term 'vegan', we handle it!
var stream = T.stream('statuses/filter', { track: 'vegan' });
// Load filters from all files in the filters directory
var filter = new TweetFilter('filters', settings.FILTERED_TERMS);

stream.on('tweet', function(tweet) {
    if (filter.matches(tweet)) {
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