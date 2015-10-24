var Twit = require('twit');
var settings = require('./settings.js');
var TweetFilter = require('./lib/filter');

// Declare your own Twitter app credentials here, if duplicating
var T = new Twit(settings.CREDS);
// Whenever the Twitter stream notifies us of a new Tweet with the term 'vegan', we handle it!
var stream = T.stream('statuses/filter', { track: 'vegan' });
// Load filters from all files in the filters directory
var filter = new TweetFilter('filters', settings.FILTERED_TERMS);
// Run with option '--dry-run' to disable retweeting and instead log matches to console
var isDryRun = process.argv[2] === '--dry-run';

stream.on('connected', function (response) {
    console.log("Connected to Twitter" + (isDryRun ? " (dry run, will not retweet matches)" : ", looking for matching tweets..."))
})
stream.on('tweet', function(tweet) {
    if (filter.matches(tweet)) {
        if (isDryRun) {
            console.log(tweet.id_str + ' : ' + tweet.user.screen_name + ' : ' + tweet.text)
            return;
        }
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